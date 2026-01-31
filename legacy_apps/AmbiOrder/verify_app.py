import sys
import os
import soundfile as sf
from PyQt6.QtWidgets import QApplication, QMessageBox
# Add current directory to path to allow import
sys.path.append(os.getcwd())
from main import MainWindow

def test_app():
    # Patch QMessageBox to prevent blocking
    original_info = QMessageBox.information
    original_crit = QMessageBox.critical
    
    def mock_info(parent, title, msg):
        print(f"[MessageBox Information] {title}: {msg}")
    
    def mock_crit(parent, title, msg):
        print(f"[MessageBox Critical] {title}: {msg}")
        
    QMessageBox.information = mock_info
    QMessageBox.critical = mock_crit

    try:
        app = QApplication(sys.argv)
        window = MainWindow()
        
        # Test file
        test_file = os.path.abspath("A Furiosa (Maxixe) in TOA dry - 0018 - Group - TOA master.wav")
        if not os.path.exists(test_file):
            print(f"Test file not found: {test_file}. Creating dummy.")
            import numpy as np
            test_file = os.path.abspath("test_3rd_order.wav")
            data = np.zeros((44100, 16))
            sf.write(test_file, data, 44100)

        print("Adding file...")
        window.add_file(test_file)
        
        if window.table.rowCount() != 1:
            print("Error: Row not added.")
            return

        combo = window.table.cellWidget(0, 2)
        if combo.count() == 0:
            print("Error: No target options.")
            return

        combo.setCurrentIndex(0)
        target_order = combo.currentData()
        print(f"Selected target order: {target_order}")
        
        expected_channels = (target_order + 1) ** 2
        
        # Async Processing Setup
        from PyQt6.QtCore import QEventLoop
        loop = QEventLoop()
        
        def on_finished(msg):
            print(f"Worker Finished: {msg}")
            loop.quit()
            
        def on_error(msg):
            print(f"Worker Error: {msg}")
            loop.quit()

        print("Starting processing...")
        window.process_files()
        
        # Connect signals AFTER process_files creates the worker
        if window.worker:
            window.worker.finished.connect(on_finished)
            window.worker.error.connect(on_error)
            print("Waiting for worker...")
            loop.exec()
        else:
            print("Error: Worker not started.")
            return
        
        # Check output
        base_name = os.path.splitext(os.path.basename(test_file))[0]
        order_name = f"{target_order}th"
        if target_order == 1: order_name = "1st"
        elif target_order == 2: order_name = "2nd"
        elif target_order == 3: order_name = "3rd"
        
        output_file = os.path.join(os.path.dirname(test_file), f"{base_name}_{order_name}Order.wav")
        
        if os.path.exists(output_file):
            print(f"Success: {output_file} created.")
            info = sf.info(output_file)
            print(f"Output Channels: {info.channels}")
            
            if info.channels == expected_channels:
                print("Verification PASSED.")
                if "test_3rd_order.wav" in test_file:
                    os.remove(test_file)
                    os.remove(output_file)
            else:
                print(f"Verification FAILED: Expected {expected_channels} channels, got {info.channels}.")
        else:
            print(f"Verification FAILED: Output file {output_file} not created.")
            
    except Exception as e:
        print(f"Test crashed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_app()
