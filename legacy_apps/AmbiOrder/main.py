import sys
import os
import soundfile as sf
import math
import time
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QTableWidget, QTableWidgetItem, QHeaderView, 
                             QPushButton, QComboBox, QMessageBox, QProgressBar, QLabel)
from PyQt6.QtCore import Qt, QMimeData, QThread, pyqtSignal
from PyQt6.QtGui import QDragEnterEvent, QDropEvent

class Worker(QThread):
    progress_update = pyqtSignal(int, str) # percent, status message
    finished = pyqtSignal(str) # Summary message
    error = pyqtSignal(str) # Error message

    def __init__(self, files_data):
        super().__init__()
        self.files_data = files_data
        self.is_running = True

    def run(self):
        count = 0
        total_files = len(self.files_data)
        
        for index, data in enumerate(self.files_data):
            if not self.is_running:
                break
                
            input_path = data['path']
            target_order = data['target_order'] # Extracted beforehand
            
            if target_order is None:
                continue

            try:
                # Setup paths
                dir_name = os.path.dirname(input_path)
                filename = os.path.basename(input_path)
                name, ext = os.path.splitext(filename)
                
                order_name = f"{target_order}th"
                if target_order == 1: order_name = "1st"
                elif target_order == 2: order_name = "2nd"
                elif target_order == 3: order_name = "3rd"
                
                output_name = f"{name}_{order_name}Order{ext}"
                output_path = os.path.join(dir_name, output_name)
                
                target_channels = (target_order + 1) ** 2
                
                self.progress_update.emit(int((index / total_files) * 100), f"Processing: {filename}")
                
                # Streaming Processing (Vectorized Block Slicing)
                # Using 1MB blocks for good balance of I/O and UI updates
                BLOCK_SIZE = 256 * 1024 
                
                with sf.SoundFile(input_path) as infile:
                    if infile.channels < target_channels:
                        print(f"Skipping {input_path}: Not enough channels.")
                        continue
                        
                    total_frames = infile.frames
                    processed_frames = 0
                    
                    with sf.SoundFile(output_path, 'w', samplerate=infile.samplerate, channels=target_channels, subtype=infile.subtype, format=infile.format) as outfile:
                        for block in infile.blocks(blocksize=BLOCK_SIZE):
                            if not self.is_running:
                                break
                                
                            # Vectorized Slicing on the block
                            trimmed_block = block[:, :target_channels]
                            outfile.write(trimmed_block)
                            
                            processed_frames += len(block)
                            
                            # Calculate file-specific progress to smooth the bar
                            file_progress = processed_frames / total_frames
                            total_progress = (index + file_progress) / total_files * 100
                            self.progress_update.emit(int(total_progress), f"Processing: {filename}")

                count += 1
                print(f"Processed: {output_path}")

            except Exception as e:
                import traceback
                traceback.print_exc()
                self.error.emit(f"Failed to process {os.path.basename(input_path)}\n{str(e)}")
                return # Stop on error? Or continue? Let's stop to be safe.

        self.progress_update.emit(100, "Done!")
        self.finished.emit(f"Processed {count} files successfully.")

    def stop(self):
        self.is_running = False

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("AmbiTrim - Ambisonic Trimming Utility")
        self.resize(900, 650)
        
        # Apply Modern Dark Theme
        self.setStyleSheet("""
            QMainWindow {
                background-color: #2b2b2b;
            }
            QWidget {
                color: #e0e0e0;
                font-family: -apple-system, "Segoe UI", sans-serif;
                font-size: 13px;
            }
            QTableWidget {
                background-color: #323232;
                gridline-color: #444;
                border: 1px solid #444;
                border-radius: 4px;
                selection-background-color: #4a90e2;
            }
            QHeaderView::section {
                background-color: #404040;
                padding: 6px;
                border: none;
                font-weight: bold;
            }
            QPushButton {
                background-color: #4a90e2;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #357abd;
            }
            QPushButton:pressed {
                background-color: #2a629c;
            }
            QPushButton:disabled {
                background-color: #555;
                color: #888;
            }
            QComboBox {
                background-color: #404040;
                border: 1px solid #555;
                border-radius: 3px;
                padding: 4px;
            }
            QComboBox::drop-down {
                border: none;
            }
            QProgressBar {
                border: 1px solid #444;
                border-radius: 4px;
                text-align: center;
                background-color: #323232;
            }
            QProgressBar::chunk {
                background-color: #4a90e2;
                border-radius: 3px;
            }
            QLabel {
                font-weight: bold;
                margin-top: 5px;
            }
        """)
        
        # Central Widget
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        
        # Layout
        self.layout = QVBoxLayout(central_widget)
        self.layout.setContentsMargins(20, 20, 20, 20)
        self.layout.setSpacing(15)
        
        # Header Label
        header = QLabel("Drop Ambisonic WAV Files Here")
        header.setStyleSheet("font-size: 16px; color: #aaa; margin-bottom: 5px;")
        header.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.layout.addWidget(header)
        
        # File List Table
        self.table = QTableWidget()
        self.table.setColumnCount(4)
        self.table.setHorizontalHeaderLabels(["Filename", "Detected Order", "Target Order", "Actions"])
        self.table.horizontalHeader().setSectionResizeMode(0, QHeaderView.ResizeMode.Stretch)
        self.table.horizontalHeader().setSectionResizeMode(1, QHeaderView.ResizeMode.ResizeToContents)
        self.table.horizontalHeader().setSectionResizeMode(2, QHeaderView.ResizeMode.ResizeToContents)
        self.table.horizontalHeader().setSectionResizeMode(3, QHeaderView.ResizeMode.ResizeToContents)
        self.table.verticalHeader().setVisible(False) # Hide row numbers for cleaner look
        self.table.setAlternatingRowColors(True)
        self.table.setShowGrid(False) # Cleaner look
        
        # Enable Drag & Drop
        self.setAcceptDrops(True)
        self.table.setAcceptDrops(True)
        
        self.layout.addWidget(self.table)
        
        # Progress UI
        self.status_label = QLabel("Ready")
        self.status_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.layout.addWidget(self.status_label)
        
        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        self.progress_bar.setFixedHeight(20)
        self.layout.addWidget(self.progress_bar)
        
        # Process Button
        self.process_btn = QPushButton("PROCESS FILES")
        self.process_btn.clicked.connect(self.process_files)
        self.process_btn.setFixedHeight(50)
        self.process_btn.setCursor(Qt.CursorShape.PointingHandCursor)
        self.layout.addWidget(self.process_btn)
        
        # Data storage
        self.files_data = [] # List of dicts
        self.worker = None

    def dragEnterEvent(self, event: QDragEnterEvent):
        if event.mimeData().hasUrls():
            event.accept()
        else:
            event.ignore()

    def dropEvent(self, event: QDropEvent):
        files = [u.toLocalFile() for u in event.mimeData().urls()]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in ['.wav', '.opus', '.caf']:
                self.add_file(f)

    def get_ambisonic_order(self, channels):
        root = math.sqrt(channels)
        if root.is_integer() and root > 0:
            return int(root - 1)
        return None

    def add_file(self, filepath):
        for f in self.files_data:
            if f['path'] == filepath:
                return

        try:
            info = sf.info(filepath)
            channels = info.channels
            order = self.get_ambisonic_order(channels)
            
            if order is None:
                return 
            
            filename = os.path.basename(filepath)
            
            row = self.table.rowCount()
            self.table.insertRow(row)
            
            self.table.setItem(row, 0, QTableWidgetItem(filename))
            
            order_str = f"{order}th Order ({channels}ch)"
            if order == 1: order_str = f"1st Order ({channels}ch)"
            elif order == 2: order_str = f"2nd Order ({channels}ch)"
            elif order == 3: order_str = f"3rd Order ({channels}ch)"
            self.table.setItem(row, 1, QTableWidgetItem(order_str))
            
            combo = QComboBox()
            valid_targets = []
            for i in range(order - 1, 0, -1):
                label = f"{i}th Order"
                if i == 1: label = "1st Order"
                elif i == 2: label = "2nd Order"
                elif i == 3: label = "3rd Order"
                combo.addItem(label, i)
                valid_targets.append(i)
            
            if not valid_targets:
                combo.addItem("No lower order", None)
                combo.setEnabled(False)
            
            self.table.setCellWidget(row, 2, combo)
            
            remove_btn = QPushButton("Remove")
            remove_btn.clicked.connect(lambda _, r=row: self.remove_row(r))
            self.table.setCellWidget(row, 3, remove_btn)
            
            self.files_data.append({
                'path': filepath,
                'channels': channels,
                'source_order': order,
                'combo': combo
            })
            
            self.refresh_remove_buttons()

        except Exception as e:
            print(f"Error loading {filepath}: {e}")

    def refresh_remove_buttons(self):
        for row in range(self.table.rowCount()):
            btn = self.table.cellWidget(row, 3)
            try: btn.clicked.disconnect()
            except: pass
            btn.clicked.connect(lambda checked, r=row: self.remove_row(r))

    def remove_row(self, row_index):
        if row_index < 0 or row_index >= self.table.rowCount():
            return
        self.table.removeRow(row_index)
        del self.files_data[row_index]
        self.refresh_remove_buttons()

    def process_files(self):
        if not self.files_data:
            QMessageBox.information(self, "Info", "No files to process.")
            return

        # Prepare data for worker (extract from UI elements)
        worker_data = []
        for data in self.files_data:
            combo = data['combo']
            target = combo.currentData()
            worker_data.append({
                'path': data['path'],
                'target_order': target
            })
            
        # UI State
        self.process_btn.setEnabled(False)
        self.process_btn.setText("Processing...")
        self.table.setEnabled(False)
        self.progress_bar.setValue(0)
        self.progress_bar.setVisible(True)
        
        # Start Worker
        self.worker = Worker(worker_data)
        self.worker.progress_update.connect(self.on_progress)
        self.worker.finished.connect(self.on_finished)
        self.worker.error.connect(self.on_error)
        self.worker.start()

    def on_progress(self, percent, msg):
        self.progress_bar.setValue(percent)
        self.status_label.setText(msg)

    def on_finished(self, msg):
        self.reset_ui()
        QMessageBox.information(self, "Success", msg)

    def on_error(self, msg):
        self.reset_ui()
        QMessageBox.critical(self, "Error", msg)

    def reset_ui(self):
        self.process_btn.setEnabled(True)
        self.process_btn.setText("PROCESS FILES")
        self.table.setEnabled(True)
        self.progress_bar.setVisible(False)
        self.status_label.setText("Ready")
        self.worker = None

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
