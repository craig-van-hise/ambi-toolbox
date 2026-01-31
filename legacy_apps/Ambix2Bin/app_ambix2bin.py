import sys
import os
import subprocess
import shlex
import glob
import qtawesome as qta
from PyQt6.QtWidgets import QApplication, QPushButton, QHBoxLayout, QButtonGroup, QWidget, QMessageBox, QFrame, QLabel, QVBoxLayout, QCheckBox, QProgressBar, QListWidget, QListWidgetItem, QComboBox, QSizePolicy, QDialog
from PyQt6.QtCore import Qt, QTimer, QThread, pyqtSignal, QUrl, QProcess, QSettings
from PyQt6.QtGui import QDesktopServices

# Add 'src' to sys.path so we can import common_ui
current_dir = os.path.dirname(os.path.abspath(__file__))
src_dir = os.path.join(current_dir, "..", "..", "src")
sys.path.append(src_dir)

from common_ui import AmbiToolboxApp, AssetManager, SettingsOverlay
try:
    from saf_wrapper import SAFRenderer
    SAF_AVAILABLE = True
except ImportError as e:
    print(f"SAF Import Error: {e}")
    SAF_AVAILABLE = False
except Exception as e:
    print(f"SAF Init Error: {e}")
    SAF_AVAILABLE = False

class FileListWidget(QListWidget):
    """Custom ListWidget that handles Delete/Backspace keys."""
    def keyPressEvent(self, event):
        if event.key() in (Qt.Key.Key_Delete, Qt.Key.Key_Backspace):
            for item in self.selectedItems():
                self.takeItem(self.row(item))
                # Also need to remove from app.file_queue? 
                # Ideally the app monitors the model or we treat the list as source of truth.
                # For simplicity, we'll emit a signal or let app handle sync. 
                # But here we just remove visual item. 
                # The App needs to sync its queue in run_conversion or process logic.
                pass
        else:
            super().keyPressEvent(event)

class FileRowWidget(QWidget):
    """Custom Row with Progress Bar."""
    def __init__(self, text, parent=None):
        super().__init__(parent)
        layout = QHBoxLayout(self)
        layout.setContentsMargins(5, 5, 5, 5)
        layout.setSpacing(10)
        
        self.icon = QLabel()
        pm = AssetManager.get_pixmap("ic_music.svg", color="#888888", size=24)
        if pm.isNull(): # Fallback if ic_music.svg not in AssetManager set yet
            self.icon.setPixmap(qta.icon('mdi.music-circle', color='#888').pixmap(24, 24))
        else:
            self.icon.setPixmap(pm)
        layout.addWidget(self.icon)
        
        self.lbl_name = QLabel(text)
        self.lbl_name.setStyleSheet("background: transparent; border: none; font-size: 13px; color: #DDD;")
        layout.addWidget(self.lbl_name)
        
        layout.addStretch()
        
        self.progress = QProgressBar()
        self.progress.setFixedSize(140, 10) # Wider
        self.progress.setTextVisible(False)
        # Ensure it's always visible on top
        self.progress.raise_()
        self.progress.setStyleSheet("""
            QProgressBar {
                border: 1px solid #666;
                border-radius: 5px;
                background-color: #222;
                z-index: 10;
            }
            QProgressBar::chunk { background-color: #2ecc71; border-radius: 4px; }
        """)
        self.progress.hide()
        layout.addWidget(self.progress)
        
    def set_progress(self, val):
        self.progress.setValue(val)
        if val >= 0 and not self.progress.isVisible():
            self.progress.show()
    
    def set_icon(self, filename, color):
        pm = AssetManager.get_pixmap(filename, color=color, size=24)
        if not pm.isNull():
            self.icon.setPixmap(pm)


class Ambix2Bin(AmbiToolboxApp):
    def __init__(self):
        super().__init__(app_name="Ambix2Bin", accent_color="#2ecc71")
        
        self.ffmpeg_path = self.get_ffmpeg_path()
        print(f"Using FFmpeg: {self.ffmpeg_path}")

        # --- Pre-Flight Check ---
        if not self.check_ffmpeg_capabilities():
            # If check fails, we disable the main interface or warn
            # The check itself shows the MessageBox.
            self.status.setText("Critical: FFmpeg missing required libraries.")
            self.btn_process.setEnabled(False)
        
        self.file_queue = [] # List of tuples: (input_path, item_widget)
        self.is_processing = False
        self.mode = "Binaural" # Default
        
        self.saf_renderer = None
        if SAF_AVAILABLE:
            try:
                self.saf_renderer = SAFRenderer()
            except Exception as e:
                print(f"Failed to load SAF library: {e}")

        # --- UI Construction ---
        self.settings = QSettings("AmbiToolbox", "Ambix2Bin") # Persistent Settings
        
        # 0. List Widget for Files
        self.file_list_widget = FileListWidget() # Custom subclass
        self.file_list_widget.setSelectionMode(QListWidget.SelectionMode.ExtendedSelection)
        self.file_list_widget.setStyleSheet("""
            QListWidget {
                background-color: transparent;
                border: none;
                color: #DDD;
                font-size: 13px;
                outline: none;
            }
            QListWidget::item {
                padding: 0px;
                border-bottom: 1px solid #444;
            }
            QListWidget::item:selected {
                background-color: #333;
                border: 1px solid #2ecc71;
                border-radius: 4px;
            }
        """)
        self.drop_area.layout().addWidget(self.file_list_widget)
        self.file_list_widget.hide()
        
        self.batch_complete = False # Flag for auto-clear behavior
        
        self.batch_complete = False # Flag for auto-clear behavior
        
        # 1. Mode Toggle
        toggle_layout = QHBoxLayout()
        toggle_layout.setSpacing(10)
        
        self.btn_binaural = QPushButton("Binaural (SOFA)")
        self.btn_stereo = QPushButton("Stereo (Matrix)")
        
        # Icons
        self.btn_binaural.setIcon(qta.icon('mdi.headphones', color='#E0E0E0'))
        self.btn_stereo.setIcon(qta.icon('mdi.speaker', color='#E0E0E0'))
        
        # Checkable behavior for toggle effect
        self.btn_binaural.setCheckable(True)
        self.btn_stereo.setCheckable(True)
        self.btn_binaural.setChecked(True) # Default
        
        # Group to ensure exclusivity
        self.mode_group = QButtonGroup(self)
        self.mode_group.addButton(self.btn_binaural)
        self.mode_group.addButton(self.btn_stereo)
        
        # Styling for toggles
        toggle_style = """
            QPushButton {
                background-color: #333; 
                border: 1px solid #555; 
                padding: 10px; 
                border-radius: 5px;
                color: #AAA;
            }
            QPushButton:checked {
                background-color: #2ecc71; 
                color: #000;
                border: 1px solid #2ecc71;
            }
            QPushButton:hover {
                border: 1px solid #777;
            }
        """
        self.btn_binaural.setStyleSheet(toggle_style)
        self.btn_stereo.setStyleSheet(toggle_style)
        
        # Connect signals
        self.mode_group.buttonClicked.connect(self.on_mode_changed)
        
        toggle_layout.addStretch()                 # Left Spacer
        toggle_layout.addWidget(self.btn_binaural) 
        toggle_layout.addSpacing(20)               # Fixed Gap
        toggle_layout.addWidget(self.btn_stereo)   
        toggle_layout.addStretch()                 # Right Spacer
        
        self.options_area.addLayout(toggle_layout)
        
        # --- SETTINGS SETUP (Hidden from Main View) ---
        # 1. HRTF Selection (Moved to Settings)
        self.hrtf_container = QWidget()
        hrtf_layout = QHBoxLayout(self.hrtf_container)
        # Symmetry Fix: Add Right Margin (50px) to balance Left Label ("HRTF:")
        hrtf_layout.setContentsMargins(0, 5, 50, 5)

        self.lbl_hrtf = QLabel("HRTF:")
        self.lbl_hrtf.setStyleSheet("color: #AAA; font-size: 12px; font-weight: bold;")
        hrtf_layout.addWidget(self.lbl_hrtf)

        self.hrtf_combo = QComboBox()
        self.hrtf_combo.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Fixed) # Force Expand
        self.hrtf_combo.setMinimumContentsLength(20) # Ensure minimal width trigger
        self.hrtf_combo.setStyleSheet("""
            QComboBox {
                background-color: #EEE; /* High Contrast Background */
                color: #000;            /* High Contrast Text */
                border: 1px solid #555;
                border-radius: 4px;
                padding: 4px;
            }
            QComboBox::drop-down {
                border: none;
                background: transparent;
            }
            QComboBox QAbstractItemView {
                background-color: #EEE;
                color: #000;
                selection-background-color: #2ecc71;
            }
        """)
        self.hrtf_combo.setSizeAdjustPolicy(QComboBox.SizeAdjustPolicy.AdjustToContents)
        
        # Populate
        self.populate_hrtf_combo()
        
        hrtf_layout.addWidget(self.hrtf_combo)
        
        # 2. Auto-Play (Moved to Settings)
        self.auto_play_cb = QCheckBox("Auto-Play Result")
        is_checked = self.settings.value("auto_play", False, type=bool)
        self.auto_play_cb.setChecked(is_checked)
        self.auto_play_cb.setStyleSheet("color: #AAA; margin-top: 10px;")
        self.auto_play_cb.toggled.connect(self.on_autoplay_toggled)
        
        # 3. Initialize Settings Overlay and add widgets immediately
        self.settings_overlay = SettingsOverlay(self, self.is_dark)
        self.settings_overlay.add_widget_row(self.hrtf_container)
        self.settings_overlay.add_widget_row(self.auto_play_cb)
        self.settings_overlay.hide() # Ensure hidden initially

        if hasattr(self, 'title_bar') and hasattr(self.title_bar, 'btn_settings'):
            self.title_bar.btn_settings.clicked.connect(self.open_settings)

        # 2. Process Button
        self.btn_process = QPushButton("CONVERT & LISTEN")
        self.btn_process.setFixedHeight(50)
        self.btn_process.setEnabled(False) # Start disabled
        self.btn_process.clicked.connect(self.run_conversion_batch)
        
        # Store default style for enable/disable updates
        self.process_btn_style = f"""
            QPushButton {{
                background-color: {self.accent_color};
                color: #000;
                font-weight: bold;
                font-size: 14px;
                border-radius: 5px;
            }}
            QPushButton:disabled {{
                background-color: #444;
                color: #777;
            }}
            QPushButton:hover:!disabled {{
                background-color: #27ae60;
            }}
        """
        self.btn_process.setStyleSheet(self.process_btn_style)
        
        self.options_area.addWidget(self.btn_process)
        
        self.update_process_button_text() # Init text
        self.update_hrtf_visibility() # Init state

    # Settings Overlay Logic
    def open_settings(self):
         # Match current window size
         self.settings_overlay.setGeometry(0, 0, self.width(), self.height())
         self.settings_overlay.show()
         self.settings_overlay.raise_()

    def populate_hrtf_combo(self):
        self.hrtf_combo.clear()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        hrtf_dir = os.path.join(base_dir, "assets", "hrtf")
        
        if not os.path.exists(hrtf_dir):
            self.hrtf_combo.addItem("No HRTF Folder Found")
            self.hrtf_combo.setEnabled(False)
            return

        sofa_files = glob.glob(os.path.join(hrtf_dir, "*.sofa"))
        if not sofa_files:
            self.hrtf_combo.addItem("No .sofa files found")
            self.hrtf_combo.setEnabled(False)
            return

        # Sort for consistency
        sofa_files.sort()
        
        default_index = 0
        for i, fpath in enumerate(sofa_files):
            fname = os.path.basename(fpath)
            self.hrtf_combo.addItem(fname, fpath) # Store full path in UserData
            if fname == "HRIR_L2702.sofa":
                default_index = i
        
        self.hrtf_combo.setCurrentIndex(default_index)

    def update_hrtf_visibility(self):
        is_binaural = self.btn_binaural.isChecked()
        self.hrtf_container.setVisible(is_binaural)

    def on_autoplay_toggled(self, state):
        self.settings.setValue("auto_play", bool(state))
        self.update_process_button_text()


    def update_process_button_text(self):
        if self.auto_play_cb.isChecked():
            self.btn_process.setText("CONVERT && LISTEN")
        else:
            self.btn_process.setText("CONVERT")

    def get_ffmpeg_path(self):
        """
        Checks for bundled ffmpeg in assets/bin_evermeet/ffmpeg
        Falls back to system 'ffmpeg'.
        """
        # Try local bundled binary first (Evermeet build)
        bundled_path = AssetManager.get_path("bin_evermeet/ffmpeg")
        if os.path.exists(bundled_path) and os.access(bundled_path, os.X_OK):
            return bundled_path
        
        # Try generic bin/ffmpeg (OSXExperts build - if we kept it)
        bundled_path_generic = AssetManager.get_path("bin/ffmpeg")
        if os.path.exists(bundled_path_generic) and os.access(bundled_path_generic, os.X_OK):
            return bundled_path_generic

        return "ffmpeg"

    def check_ffmpeg_capabilities(self):
        """Checks if installed FFmpeg has 'libmysofa' support via 'sofalizer' filter."""
        print(f"Running Pre-Flight FFmpeg Check using: {self.ffmpeg_path}")
        try:
            # Run 'ffmpeg -filters'
            result = subprocess.run([self.ffmpeg_path, '-filters'], capture_output=True, text=True)
            if result.returncode != 0:
                print("Error running ffmpeg -filters")
                return False
            
            if "sofalizer" in result.stdout:
                print("Success: 'sofalizer' filter found.")
                return True
            else:
                print("Failure: 'sofalizer' filter NOT found.")
                QMessageBox.critical(self, "Critical Error",
                    "Your FFmpeg is missing the 'libmysofa' library required for HRTF.\n\n"
                    "The text app tried to use a bundled version but it may be missing.\n"
                    "Please install FFmpeg with libmysofa manualy if issues persist.")
                return False
                
        except FileNotFoundError:
            print("Error: FFmpeg binary not found.")
            QMessageBox.critical(self, "FFmpeg Not Found",
                "FFmpeg is not installed or not in PATH.\n"
                "Please install FFmpeg.")
            return False

    def on_mode_changed(self, btn):
        if self.btn_binaural.isChecked():
            self.mode = "Binaural"
        else:
            self.mode = "Stereo"
        # Optional: Update status or logs if needed
        # self.status.setText(f"Mode set to: {self.mode}")
        self.update_hrtf_visibility()

    def process_file(self, dropped_files):
        """Handle File Drop (List of files)"""
        # Auto-Clear logic if batch finished
        if self.batch_complete:
            self.file_list_widget.clear()
            self.batch_complete = False
            # Restore dropzone instructions
            self.drop_area.icon_lbl.show()
            self.drop_area.label.show()

        # 1. Recursive Scan
        valid_extensions = {'.wav', '.amb', '.opus', '.caf'}
        found_files = []
        
        for path in dropped_files:
            if os.path.isdir(path):
                # Recurse
                for root, dirs, files in os.walk(path):
                    for f in files:
                        if os.path.splitext(f)[1].lower() in valid_extensions:
                            found_files.append(os.path.join(root, f))
            else:
                if os.path.splitext(path)[1].lower() in valid_extensions:
                    found_files.append(path)
                    
        if not found_files:
            self.status.setText("No valid audio files found.")
            return

        # 2. Update UI
        self.drop_area.icon_lbl.hide()
        self.drop_area.label.hide()
        self.file_list_widget.show()
        
        for fpath in found_files:
            # Check duplicates? Let's allow.
            item = QListWidgetItem(self.file_list_widget)
            # Use Custom Widget
            row_widget = FileRowWidget(os.path.basename(fpath))
            item.setSizeHint(row_widget.sizeHint())
            
            self.file_list_widget.addItem(item)
            self.file_list_widget.setItemWidget(item, row_widget)
            item.setData(Qt.ItemDataRole.UserRole, fpath)
            # No queue append here. We build queue at runtime.
            
        self.status.setText(f"Ready to convert {self.file_list_widget.count()} files.")
        self.btn_process.setEnabled(True)
        self.btn_process.setStyleSheet(self.process_btn_style)

    def run_conversion_batch(self):
        if self.is_processing: return
        self.is_processing = True
        
        # Build Queue from List Items (handling deletions)
        self.file_queue = []
        count = self.file_list_widget.count()
        if count == 0:
            self.is_processing = False
            return
            
        for i in range(count):
            item = self.file_list_widget.item(i)
            fpath = item.data(Qt.ItemDataRole.UserRole)
            self.file_queue.append((fpath, item))
        
        print(f"[DEBUG] Batch Start. Queue size: {len(self.file_queue)}")
        self.btn_process.setEnabled(False)
        self.drop_area.setEnabled(False) # Block drops
        
        self.process_next_in_queue()

    def process_next_in_queue(self):
        print("[DEBUG] process_next_in_queue started")
        # Find next pending item
        next_job = None
        for fpath, item in self.file_queue:
            status = item.data(Qt.ItemDataRole.UserRole + 1)
            if status != "DONE": 
                next_job = (fpath, item)
                break
        
        if not next_job:
            self.on_batch_finished()
            return
            
        fpath, item = next_job
        self.current_job_item = item
        self.current_row_widget = self.file_list_widget.itemWidget(item) # Store ref to widget
        
        self.run_conversion_single(fpath)

    def on_batch_finished(self):
        self.is_processing = False
        self.status.setText("Batch Processing Complete!")
        self.btn_process.setEnabled(False) 
        self.drop_area.setEnabled(True)
        self.batch_complete = True # Flag to clear list on next drop
        
        # Auto-play logic handled per-file or simplified to last file
        # User requirement implies "Auto play result". Usually best to play LAST file if batch.
        if self.auto_play_cb.isChecked() and self.file_queue:
             # Just notification in status bar is enough if no popup desired for batch
             pass

    def get_unique_output_path(self, base_path, suffix):
        """Appends _v2, _v3 etc if file exists."""
        output_path = f"{base_path}{suffix}"
        if not os.path.exists(output_path):
            return output_path
            
        counter = 2
        while True:
            output_path = f"{base_path}{suffix[:-4]}_v{counter}{suffix[-4:]}" # Insert before extension
            if not os.path.exists(output_path):
                return output_path
            counter += 1

    def run_conversion_single(self, input_path):
        base, ext = os.path.splitext(input_path)
        
        # NOTE: User requested NO spinner icon during processing. 
        # Keeping existing 'music' icon (set during add) and only changing to checkmark on done.
        
        # Update Row Widget Icon (Optional: Could set to 'play' or something, but kept static per request)
        if self.current_row_widget:
            # self.current_row_widget.set_icon('mdi.loading', '#E67E22') # REMOVED SPINNER
            self.file_list_widget.scrollToItem(self.current_job_item)
        
        # Determine Output Path with Versioning
        if self.mode == "Binaural":
            suffix = "_binaural.wav"
            output_path = self.get_unique_output_path(base, suffix)
            self.run_saf_process(input_path, output_path)
        else:
            suffix = "_stereo.wav"
            output_path = self.get_unique_output_path(base, suffix)
            
            filter_str = "pan=stereo|c0=0.5*c0+0.5*c1|c1=0.5*c0-0.5*c1"
            cmd = [self.ffmpeg_path, '-y', '-i', input_path, '-af', filter_str, output_path]
            
            self.status.setText(f"Converting {os.path.basename(input_path)}...")
            QApplication.processEvents()
            
            try:
                # Blocking call for Stereo (Fast enough usually)
                result = subprocess.run(cmd, capture_output=True, text=True)
                if result.returncode == 0:
                    self.on_worker_finished(0, QProcess.ExitStatus.NormalExit, output_path)
                else:
                    print(f"FFMPEG Error: {result.stderr}")
                    self.on_worker_finished(1, QProcess.ExitStatus.NormalExit, output_path) 
            except Exception as e:
                print(e)
                self.on_worker_finished(1, QProcess.ExitStatus.NormalExit, output_path)

    def run_conversion(self):
        pass # Deprecated by batch
    # --- ISOLATED PROCESS LOGIC ---
    def run_saf_process(self, input_path, output_path):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        # 1. Find SOFA
        sofa_path = self.hrtf_combo.currentData()
        
        if not sofa_path or not os.path.exists(sofa_path):
            QMessageBox.critical(self, "Missing HRTF File", f"Selected SOFA file not found or invalid.")
            return
        
        # 2. Prepare Worker Process
        self.saf_process = QProcess(self)
        script_path = os.path.join(base_dir, "saf_wrapper.py")
        
        args = [
            script_path,
            "--input", input_path,
            "--output", output_path,
            "--sofa", sofa_path
        ]
        
        print(f"Launching Worker: {sys.executable} {args}")
        self.status.setText("Initializing SAF Worker...")
        
        self.saf_process.readyReadStandardOutput.connect(self.handle_worker_stdout)
        self.saf_process.readyReadStandardError.connect(self.handle_worker_stderr)
        self.saf_process.finished.connect(lambda code, stat: self.on_worker_finished(code, stat, output_path))
        
        print("[DEBUG] Calling saf_process.start()")
        self.saf_process.start(sys.executable, args)
        print("[DEBUG] saf_process.start() called")

    def handle_worker_stdout(self):
        data = self.saf_process.readAllStandardOutput().data().decode()
        for line in data.splitlines():
             # print(f"[Worker] {line}")
             if line.startswith("PROGRESS:"):
                 try:
                     val = float(line.split(":")[1])
                     pct = int(val * 100)
                     self.status.setText(f"Rendering: {pct}%")
                     # Update Row Widget Progress (Live)
                     if self.current_row_widget:
                         self.current_row_widget.set_progress(pct)
                 except: pass

    def handle_worker_stderr(self):
        data = self.saf_process.readAllStandardError().data().decode()
        if data.strip(): print(f"[Worker Debug] {data}")

    def on_worker_finished(self, exit_code, exit_status, output_path):
        # Update Item UI
        if exit_code == 0 and exit_status == QProcess.ExitStatus.NormalExit:
            if self.current_row_widget:
                self.current_row_widget.set_icon('ic_check.svg', '#2ecc71')
                self.current_row_widget.set_progress(100)
            
            self.current_job_item.setData(Qt.ItemDataRole.UserRole + 1, "DONE")
            
            # Auto play ONE file (if only one, or just the last one logic?)
            # Logic: If AutoPlay is ON, we generally expect to hear the result.
            # Implemented: Play each file as it finishes? Or wait? 
            # User said "Auto-play result". For batch, playing 50 files is chaos.
            # Safe bet: Play if it's the ONLY file. 
            if len(self.file_queue) == 1 and self.auto_play_cb.isChecked():
                self.reset_and_play(output_path)
        else:
            if self.current_row_widget:
                self.current_row_widget.set_icon('ic_error.svg', '#e74c3c')
                
            self.current_job_item.setData(Qt.ItemDataRole.UserRole + 1, "DONE") # Skip retry
            
        # Trigger Next (No Popups!)
        QTimer.singleShot(0, self.process_next_in_queue)
        
 


    def reset_and_play(self, output_path):
        self.status.setText(f"Done! Playing {os.path.basename(output_path)}")
        self.open_file_external(output_path)

    def open_file_external(self, output_path):
        """Helper to open file in default OS player using detached subprocess."""
        try:
            if sys.platform == 'darwin':
                subprocess.Popen(['open', output_path])
            elif sys.platform == 'win32':
                os.startfile(output_path)
            else:
                subprocess.Popen(['xdg-open', output_path])
        except Exception as e:
            print(f"Auto-Play Error: {e}")
            self.status.setText(f"Auto-Play Failed: {e}")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    
    # Load Font (Optional but good for completeness based on boilerplate)
    # Common UI handles basic styling, but specific fonts might be system dependent.
    # We rely on system fonts falling back if 'Montserrat'/'Jost' aren't installed.
    
    window = Ambix2Bin()
    window.show()
    sys.exit(app.exec())
