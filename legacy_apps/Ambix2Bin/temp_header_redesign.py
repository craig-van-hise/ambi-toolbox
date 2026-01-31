import sys
import os
import webbrowser
import requests
import qtawesome as qta
from PyQt6.QtWidgets import (QApplication, QMainWindow, QLabel, QVBoxLayout, 
                             QWidget, QPushButton, QFrame, QHBoxLayout, 
                             QGraphicsDropShadowEffect, QMessageBox)
from PyQt6.QtCore import Qt, QMimeData, QPoint, QSize, QUrl
from PyQt6.QtGui import (QDragEnterEvent, QDropEvent, QFont, QPixmap, QCursor, 
                         QFontDatabase, QColor, QIcon, QPainter, QImage, 
                         QResizeEvent, QDesktopServices)
from PyQt6.QtSvg import QSvgRenderer

APP_LINE = "AmbiToolbox"
URL_LINK = "https://www.virtualvirgin.net/"

# --- ASSET MANAGER (Auto-Downloader) ---
class AssetManager:
    """
    Manages auto-downloading of necessary assets (Fonts, etc.)
    Running ensure_assets() is mandatory before GUI launch.
    """
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    ASSET_DIR = os.path.normpath(os.path.join(BASE_DIR, "..", "assets"))
    
    FONTS = {
        "Jost-700-Bold.ttf": "https://raw.githubusercontent.com/jayakornk/Jost-Web-Font/master/Jost-700-Bold.ttf",
        "Montserrat-Variable.ttf": "https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf",
        "Roboto-Regular.ttf": "https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Regular.ttf",
    }
    
    SVGS = {
       "ic_settings.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/settings.svg",
       "ic_folder_open.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/folder_open.svg",
       "ic_light_mode.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/light_mode.svg",
       "ic_dark_mode.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/dark_mode.svg",
       "ic_music.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/music_note.svg",
       "ic_check.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/check_circle.svg",
       "ic_error.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/error.svg",
       "ic_folder_upload.svg": "https://raw.githubusercontent.com/marella/material-design-icons/main/svg/filled/drive_folder_upload.svg"
    }
    
    FONT_FAMILIES = {}

    @classmethod
    def ensure_assets(cls):
        if not os.path.exists(cls.ASSET_DIR):
            os.makedirs(cls.ASSET_DIR)
        
        for filename, url in cls.FONTS.items():
            path = os.path.join(cls.ASSET_DIR, filename)
            if not os.path.exists(path):
                try:
                    r = requests.get(url, timeout=10)
                    r.raise_for_status()
                    with open(path, 'wb') as f: f.write(r.content)
                except: pass

        for filename, url in cls.SVGS.items():
            path = os.path.join(cls.ASSET_DIR, filename)
            if not os.path.exists(path):
                try:
                    r = requests.get(url, timeout=10)
                    r.raise_for_status()
                    with open(path, 'wb') as f: f.write(r.content)
                except: pass

        cls.load_fonts()

    @classmethod
    def get_pixmap(cls, filename, color=None, size=None):
        path = cls.get_path(filename)
        if not os.path.exists(path): return QPixmap()
        
        dpr = 2.0 # Retina
        
        if filename.endswith(".svg"):
            renderer = QSvgRenderer(path)
            if not renderer.isValid(): return QPixmap()
            if size:
                if isinstance(size, (tuple, list)): w, h = size
                else: w, h = size, size
            else:
                sz = renderer.defaultSize()
                w, h = sz.width(), sz.height()

            # Create High-DPI QImage for crisp rendering
            img = QImage(int(w * dpr), int(h * dpr), QImage.Format.Format_ARGB32)
            img.fill(Qt.GlobalColor.transparent)
            
            p = QPainter(img)
            # Important: Adjust viewport for dpr
            renderer.render(p)
            p.end()
            img.setDevicePixelRatio(dpr)
        else:
            # PNG
            img = QImage(path)
            if size:
                if isinstance(size, (tuple, list)): w, h = size
                else: w, h = size, size
                img = img.scaled(int(w * dpr), int(h * dpr), Qt.AspectRatioMode.KeepAspectRatio, Qt.TransformationMode.SmoothTransformation)
                img.setDevicePixelRatio(dpr)

        if color:
            color_obj = QColor(color)
            painter = QPainter(img)
            painter.setCompositionMode(QPainter.CompositionMode.CompositionMode_SourceIn)
            painter.fillRect(img.rect(), color_obj)
            painter.end()
            
        return QPixmap.fromImage(img)

    @classmethod
    def get_icon(cls, filename, color=None):
        return QIcon(cls.get_pixmap(filename, color=color, size=64))

    @classmethod
    def load_fonts(cls):
        cls.FONT_FAMILIES = {}
        for filename in cls.FONTS.keys():
            path = os.path.join(cls.ASSET_DIR, filename)
            if os.path.exists(path):
                id = QFontDatabase.addApplicationFont(path)
                if id != -1:
                    family = QFontDatabase.applicationFontFamilies(id)[0]
                    cls.FONT_FAMILIES[filename] = family
            else: pass

    @classmethod
    def get_path(cls, filename):
        return os.path.join(cls.ASSET_DIR, filename)

LOGO_PATH = AssetManager.get_path("vv_logo.png")

class Theme:
    DARK = {"bg": "#1E1E1E", "fg": "#E0E0E0", "panel": "#2D2D2D", "border": "#444444", "accent_text": "#FFFFFF"}
    LIGHT = {"bg": "#F5F5F5", "fg": "#333333", "panel": "#FFFFFF", "border": "#CCCCCC", "accent_text": "#000000"}

class TrafficLightBtn(QPushButton):
    def __init__(self, color, hover_color, parent=None):
        super().__init__(parent)
        self.setFixedSize(12, 12)
        self.setStyleSheet(f"""
            QPushButton {{ background-color: {color}; border-radius: 6px; border: none; }}
            QPushButton:hover {{ background-color: {hover_color}; }}
        """)

class TitleBar(QFrame):
    def __init__(self, parent_widget, window_controller):
        super().__init__(parent_widget)
        self.window = window_controller
        self.setObjectName("TitleBar")
        self.setFixedHeight(60)

        # Enforce exact symmetry with FIXED-WIDTH side containers (160px each)
        SIDE_WIDTH = 160 

        self.main_layout = QHBoxLayout(self)
        self.main_layout.setContentsMargins(15, 0, 15, 0)
        self.main_layout.setSpacing(0)

        # --- LEFT GROUP (Fixed Width) ---
        self.left_group = QWidget()
        self.left_group.setFixedWidth(SIDE_WIDTH)
        left_layout = QHBoxLayout(self.left_group)
        left_layout.setContentsMargins(0, 0, 0, 0)
        left_layout.setSpacing(10)

        # Traffic Lights
        lights_container = QHBoxLayout()
        lights_container.setSpacing(8)
        self.btn_close = TrafficLightBtn("#FF5F56", "#FF7972", parent=self) 
        self.btn_close.clicked.connect(class_method_shim(self.window.close)) 
        self.btn_min = TrafficLightBtn("#FFBD2E", "#FFD368", parent=self) 
        self.btn_min.clicked.connect(self.window.showMinimized)
        self.btn_max = TrafficLightBtn("#27C93F", "#3ADF53", parent=self) 
        lights_container.addWidget(self.btn_close)
        lights_container.addWidget(self.btn_min)
        lights_container.addWidget(self.btn_max)
        left_layout.addLayout(lights_container)
        
        left_layout.addSpacing(15) # Gap between lights and logo
        
        # Logo
        self.logo_lbl = QLabel()
        pm = AssetManager.get_pixmap("vv_logo.png", size=60) # Increased to 60
        self.logo_lbl.setPixmap(pm)
        self.logo_lbl.setFixedSize(60, 60) # Ensure label matches pixmap exactly
        self.logo_lbl.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.logo_lbl.setCursor(QCursor(Qt.CursorShape.PointingHandCursor))
        self.logo_lbl.mousePressEvent = self.on_logo_click
        left_layout.addWidget(self.logo_lbl)
        left_layout.addStretch()
        
        self.main_layout.addWidget(self.left_group)

        # --- CENTER GROUP ---
        self.main_layout.addStretch()

        self.center_widget = QWidget()
        center_layout = QVBoxLayout(self.center_widget)
        center_layout.setContentsMargins(0, 8, 0, 8)
        center_layout.setSpacing(0)
        center_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

        f_p = AssetManager.FONT_FAMILIES.get("Montserrat-Variable.ttf", "Montserrat")
        f_t = AssetManager.FONT_FAMILIES.get("Jost-700-Bold.ttf", "Jost")
        
        self.lbl_product = QLabel(APP_LINE)
        self.lbl_product.setStyleSheet(f"color: #888; font-size: 11px; font-weight: 500; font-family: '{f_p}'; border: none; background: transparent;")
        self.lbl_product.setAlignment(Qt.AlignmentFlag.AlignCenter)
        center_layout.addWidget(self.lbl_product)

        self.lbl_title = QLabel(self.window.app_name)
        # Use a hardcoded green matching the user's expected 'accent' from previous turns
        self.lbl_title.setStyleSheet(f"color: #2ecc71; font-size: 24px; font-weight: bold; font-family: '{f_t}'; border: none; background: transparent;")
        self.lbl_title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        center_layout.addWidget(self.lbl_title)

        self.main_layout.addWidget(self.center_widget)

        self.main_layout.addStretch()

        # --- RIGHT GROUP (Matches Left Width) ---
        self.right_group = QWidget()
        self.right_group.setFixedWidth(SIDE_WIDTH)
        right_layout = QHBoxLayout(self.right_group)
        right_layout.setContentsMargins(0, 0, 0, 0)
        right_layout.setSpacing(10)
        
        right_layout.addStretch()
        
        self.btn_settings = QPushButton()
        self.btn_theme = QPushButton()
        for b in [self.btn_settings, self.btn_theme]:
            b.setFixedSize(36, 36)
            b.setCursor(QCursor(Qt.CursorShape.PointingHandCursor))
            b.setStyleSheet("background: transparent; border: none; border-radius: 6px;")
            right_layout.addWidget(b)
        
        # Right balance spacer (To offset the 80px traffic lights)
        right_layout.addSpacing(10) 
        
        self.main_layout.addWidget(self.right_group)

        self.btn_theme.clicked.connect(self.window.toggle_theme)
        if hasattr(self.window, 'show_settings'):
            self.btn_settings.clicked.connect(self.window.show_settings)

        self.setup_icons()

    def setup_icons(self):
        self.btn_settings.setIcon(AssetManager.get_icon("ic_settings.svg", color="#E0E0E0"))
        self.update_theme_icon()

    def update_theme_icon(self):
        ic = "ic_light_mode.svg" if self.window.is_dark else "ic_dark_mode.svg"
        color = "#E0E0E0" if self.window.is_dark else "#333333"
        self.btn_theme.setIcon(AssetManager.get_icon(ic, color=color))

    def on_logo_click(self, event):
        QDesktopServices.openUrl(QUrl(URL_LINK))

    def mousePressEvent(self, event):
        if event.button() == Qt.MouseButton.LeftButton:
            self.window.old_pos = event.globalPosition().toPoint()
            event.accept()

    def mouseMoveEvent(self, event):
        if hasattr(self.window, 'old_pos'):
            delta = QPoint(event.globalPosition().toPoint() - self.window.old_pos)
            self.window.move(self.window.x() + delta.x(), self.window.y() + delta.y())
            self.window.old_pos = event.globalPosition().toPoint()
            event.accept()

def class_method_shim(method): return method

class DragDropArea(QFrame):
    def __init__(self, callback, accent):
        super().__init__()
        self.setAcceptDrops(True)
        self.callback = callback
        self.accent = accent
        self.setObjectName("DropZone")
        
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(10)
        layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        # Folder Icon (High-Res Upload Folder)
        self.icon_lbl = QLabel()
        pm = AssetManager.get_pixmap("ic_folder_upload.svg", color="#2ecc71", size=100) # Slightly larger
        if not pm.isNull():
            self.icon_lbl.setPixmap(pm)
            self.icon_lbl.setFixedSize(100, 100)
        self.icon_lbl.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        # Center the icon label horizontally in the layout
        layout.addWidget(self.icon_lbl, 0, Qt.AlignmentFlag.AlignCenter)
        
        self.label = QLabel("DROP FILES OR FOLDERS HERE")
        self.label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        font_fam = AssetManager.FONT_FAMILIES.get("Roboto-Regular.ttf", "Roboto")
        self.label.setFont(QFont(font_fam, 12, QFont.Weight.Bold)) 
        self.label.setStyleSheet("color: #666;")
        layout.addWidget(self.label, 0, Qt.AlignmentFlag.AlignCenter)

    def dragEnterEvent(self, event):
        if event.mimeData().hasUrls():
            event.accept()
            self.setStyleSheet(f"QFrame#DropZone {{ border: 2px solid {self.accent}; background-color: #333; }}")
            self.label.setText("RELEASE TO LOAD")
            self.label.setStyleSheet(f"color: {self.accent};")
        else: event.ignore()

    def dragLeaveEvent(self, event):
        if hasattr(self.window(), 'apply_styles'): self.window().apply_styles()
        self.label.setText("DROP FILES OR FOLDERS HERE")
        self.label.setStyleSheet("color: #888;")

    def dropEvent(self, event):
        files = [u.toLocalFile() for u in event.mimeData().urls()]
        if files: self.callback(files)


class SettingsOverlay(QFrame):
    def __init__(self, parent_widget, dark_mode=True):
        super().__init__(parent_widget)
        self.dark_mode = dark_mode
        self.setObjectName("SettingsOverlay")
        self.setStyleSheet("background-color: rgba(0, 0, 0, 0.85);")
        
        outer_layout = QVBoxLayout(self)
        outer_layout.setAlignment(Qt.AlignmentFlag.AlignCenter)
        
        self.box = QFrame()
        self.box.setFixedSize(500, 400)
        bg = "#2D2D2D" if self.dark_mode else "#F5F5F5"
        fg = "#E0E0E0" if self.dark_mode else "#333"
        self.box.setStyleSheet(f"QFrame {{ background-color: {bg}; color: {fg}; border-radius: 10px; border: 1px solid #555; }} QLabel {{ color: {fg}; }}")
        
        box_layout = QVBoxLayout(self.box)
        box_layout.setContentsMargins(30,30,30,30)
        box_layout.setSpacing(20)
        
        lbl = QLabel("Settings")
        lbl.setStyleSheet(f"font-size: 24px; font-weight: bold; border: none;")
        box_layout.addWidget(lbl)
        
        self.content_area = QVBoxLayout()
        box_layout.addLayout(self.content_area)
        box_layout.addStretch()
        
        btn_done = QPushButton("Done")
        btn_done.setFixedSize(120, 40)
        btn_done.setStyleSheet("QPushButton { background-color: #2ecc71; color: white; border: none; border-radius: 5px; font-weight: bold; } QPushButton:hover { background-color: #27ae60; }")
        btn_done.clicked.connect(self.hide)
        
        r_box = QHBoxLayout()
        r_box.addStretch()
        r_box.addWidget(btn_done)
        box_layout.addLayout(r_box)
        
        outer_layout.addWidget(self.box)

    def add_widget_row(self, widget): self.content_area.addWidget(widget)
    def mousePressEvent(self, event): pass

class AmbiToolboxApp(QMainWindow):
    def __init__(self, app_name, accent_color):
        super().__init__()
        AssetManager.ensure_assets() 
        self.app_name = app_name
        self.accent_color = accent_color
        
        font_roboto = AssetManager.FONT_FAMILIES.get("Roboto-Regular.ttf", "Roboto")
        self.setFont(QFont(font_roboto, 12))
        
        self.setWindowFlags(Qt.WindowType.FramelessWindowHint)
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.setGeometry(100, 100, 600, 600)
        self.is_dark = True

        self.container = QWidget()
        self.container.setObjectName("MainContainer")
        self.setCentralWidget(self.container)
        
        shadow = QGraphicsDropShadowEffect(self)
        shadow.setBlurRadius(20)
        shadow.setColor(QColor(0, 0, 0, 150))
        shadow.setOffset(0, 5)
        self.container.setGraphicsEffect(shadow)

        self.layout = QVBoxLayout(self.container)
        self.layout.setContentsMargins(0, 0, 0, 0)
        self.layout.setSpacing(0)

        self.title_bar = TitleBar(self.container, self)
        self.layout.addWidget(self.title_bar)

        content = QWidget()
        self.content_layout = QVBoxLayout(content)
        self.content_layout.setContentsMargins(30, 10, 30, 30)
        self.content_layout.setSpacing(20)
        
        self.drop_area = DragDropArea(self.process_file, accent_color)
        self.content_layout.addWidget(self.drop_area, stretch=1)
        
        self.options_area = QVBoxLayout()
        self.content_layout.addLayout(self.options_area)
        
        self.status = QLabel("Ready")
        self.status.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.status.setStyleSheet("color: #666; font-size: 11px;")
        self.content_layout.addWidget(self.status)
        self.layout.addWidget(content)
        
        self.apply_styles()

    def toggle_theme(self):
        self.is_dark = not self.is_dark
        self.title_bar.update_theme_icon()
        self.apply_styles()

    def apply_styles(self):
        t = Theme.DARK if self.is_dark else Theme.LIGHT
        
        # 1. Main Window Styles
        self.setStyleSheet(f"""
            QWidget#MainContainer {{ background-color: {t['bg']}; border: 1px solid {t['border']}; border-radius: 15px; }}
            QLabel {{ color: {t['fg']}; }}
            QFrame#DropZone {{ background-color: {t['panel']}; border: 2px dashed {t['border']}; border-radius: 10px; }}
            
            /* TitleBar Specifics */
            QFrame#TitleBar {{
                background-color: {t['panel']};
                border-bottom: 1px solid {t['border']};
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
            }}
        """)
        
        # 2. Update Icons to match theme
        icon_color = "#E0E0E0" if self.is_dark else "#333333"
        self.title_bar.btn_settings.setIcon(AssetManager.get_icon("ic_settings.svg", color=icon_color))
        self.title_bar.update_theme_icon()
        
        # 3. Update Title Colors
        title_color = "#2ecc71" # Constant brand color
        sub_color = "#888888"
        self.title_bar.lbl_title.setStyleSheet(f"color: {title_color}; font-size: 24px; font-weight: bold; border: none; background: transparent;")
        self.title_bar.lbl_product.setStyleSheet(f"color: {sub_color}; font-size: 11px; font-weight: 500; border: none; background: transparent;")

    def resizeEvent(self, event):
        super().resizeEvent(event)
        if hasattr(self, 'settings_overlay') and self.settings_overlay.isVisible():
            self.settings_overlay.setGeometry(0, 0, self.width(), self.height())

    def process_file(self, file_paths): pass