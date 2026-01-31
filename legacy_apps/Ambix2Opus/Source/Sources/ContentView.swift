import SwiftUI
import UniformTypeIdentifiers
import Foundation

// MARK: - Logic (Converter)

enum QualityLevel: Int, CaseIterable {
    case low = 32
    case medium = 64
    case high = 96
    case highest = 128
    
    var description: String {
        switch self {
        case .low: return "Low (32k/ch)"
        case .medium: return "Medium (64k/ch)"
        case .high: return "High (96k/ch)"
        case .highest: return "Highest (128k/ch)"
        }
    }
}

@MainActor
class Converter: ObservableObject {
    @Published var files: [FileItem] = []
    @Published var isProcessing = false
    @Published var quality: QualityLevel = .medium {
        didSet {
            UserDefaults.standard.set(quality.rawValue, forKey: "quality")
        }
    }
    
    // Tools paths
    let ffmpegPath: String
    let ffprobePath: String
    
    init() {
        // Init paths first
        if let path = Bundle.main.path(forResource: "ffmpeg", ofType: nil) {
            self.ffmpegPath = path
        } else {
            self.ffmpegPath = FileManager.default.currentDirectoryPath + "/ffmpeg"
        }
        
        if let path = Bundle.main.path(forResource: "ffprobe", ofType: nil) {
            self.ffprobePath = path
        } else {
             self.ffprobePath = FileManager.default.currentDirectoryPath + "/ffprobe"
        }

        // Then properties relying on self (though here we just init basic types)
        // Then properties relying on self (though here we just init basic types)
        let savedQuality = UserDefaults.standard.integer(forKey: "quality")
        if let q = QualityLevel(rawValue: savedQuality) {
            self.quality = q
        } else {
            self.quality = .medium
        }
    }
    
    func addPaths(_ urls: [URL]) {
        self.files.removeAll()
        self.isProcessing = true
        
        // Capture values needed for background task
        let ffmpeg = self.ffmpegPath
        let ffprobe = self.ffprobePath
        let currentQuality = self.quality
        
        Task.detached(priority: .userInitiated) {
            var allFiles: [URL] = []
            
            // Scan
            for url in urls {
                // accessing file system is fine in background
                var isDir: ObjCBool = false
                if FileManager.default.fileExists(atPath: url.path, isDirectory: &isDir), isDir.boolValue {
                     allFiles.append(contentsOf: Converter.scanDirectory(url))
                } else {
                    let ext = url.pathExtension.lowercased()
                    if ["wav", "caf", "amb"].contains(ext) {
                        allFiles.append(url)
                    }
                }
            }
            
            let fileItems = allFiles.map { FileItem(url: $0) }
            
            // Update UI
            await MainActor.run {
                self.files = fileItems
            }
            
            // Process
            await Converter.convertFiles(items: fileItems, ffmpegPath: ffmpeg, ffprobePath: ffprobe, quality: currentQuality) { id, status, progress in
                await MainActor.run {
                    if let idx = self.files.firstIndex(where: { $0.id == id }) {
                        self.files[idx].status = status
                        self.files[idx].progress = progress
                    }
                }
            }
            
            await MainActor.run {
                self.isProcessing = false
            }
        }
    }
    
    nonisolated private static func scanDirectory(_ url: URL) -> [URL] {
        var results: [URL] = []
        if let enumerator = FileManager.default.enumerator(at: url, includingPropertiesForKeys: nil) {
            for case let fileURL as URL in enumerator {
                let ext = fileURL.pathExtension.lowercased()
                 if ["wav", "caf", "amb"].contains(ext) {
                    results.append(fileURL)
                }
            }
        }
        return results
    }
    
    nonisolated private static func convertFiles(items: [FileItem], ffmpegPath: String, ffprobePath: String, quality: QualityLevel, update: @escaping (UUID, FileItem.Status, Double) async -> Void) async {
        for item in items {
            await update(item.id, .converting, 0.0)
            
            // Analyze
            let channels = getChannelCount(item.url, ffprobePath: ffprobePath)
            
            // Check if channels corresponds to an Ambisonics order: (n+1)^2
            // 4 (1st), 9 (2nd), 16 (3rd), 25 (4th), 36 (5th), 49 (6th), 64 (7th)...
            let sqrtChannels = sqrt(Double(channels))
            let isAmbisonics = (sqrtChannels == floor(sqrtChannels)) && (channels >= 4)
            
            // STRICTLY force Family 2 for any Ambisonics count.
            // Fallback to 255 only for non-Ambisonics channel layouts (e.g. stereo, 5.1, etc)
            let mappingFamily = isAmbisonics ? 2 : 255
            
             // Calculate Dynamic Bitrate: Channels * QualityConstant
            // Example: 16 channels * 96 kbps (High) = 1536k
            let totalBitrate = channels * quality.rawValue
            
            // Get duration for progress
            let duration = getDuration(item.url, ffprobePath: ffprobePath)
            
            let outputURL = item.url.deletingPathExtension().appendingPathExtension("opus")
            
            let args = [
                "-y",
                "-i", item.url.path,
                "-c:a", "libopus",
                "-b:a", "\(totalBitrate)k",
                "-mapping_family", "\(mappingFamily)",
                outputURL.path
            ]
            
            let task = Process()
            task.executableURL = URL(fileURLWithPath: ffmpegPath)
            task.arguments = args
            
            let pipe = Pipe()
            task.standardError = pipe
            
            do {
                try task.run()
                
                // Read stderr for progress
                let handle = pipe.fileHandleForReading
                for try await line in handle.bytes.lines {
                    // Line format: size=... time=00:00:05.12 bitrate=...
                    if let range = line.range(of: "time=") {
                        let substring = line[range.upperBound...]
                        let timeString = substring.prefix { $0 != " " }
                        let components = timeString.split(separator: ":").compactMap { Double($0) }
                        if components.count == 3 {
                            let seconds = components[0]*3600 + components[1]*60 + components[2]
                            let p = duration > 0 ? seconds / duration : 0
                            await update(item.id, .converting, min(max(p, 0.0), 1.0))
                        }
                    }
                }
                
                task.waitUntilExit()
                let success = task.terminationStatus == 0
                await update(item.id, success ? .done : .error, success ? 1.0 : 0.0)
            } catch {
                await update(item.id, .error, 0.0)
            }
        }
    }
    
    nonisolated private static func getChannelCount(_ url: URL, ffprobePath: String) -> Int {
        let task = Process()
        task.executableURL = URL(fileURLWithPath: ffprobePath)
        task.arguments = [
            "-v", "error",
            "-select_streams", "a:0",
            "-show_entries", "stream=channels",
            "-of", "csv=p=0",
            url.path
        ]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        try? task.run()
        task.waitUntilExit()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        if let output = String(data: data, encoding: .utf8) {
            return Int(output.trimmingCharacters(in: .whitespacesAndNewlines)) ?? 0
        }
        return 0
    }
    
    nonisolated private static func getDuration(_ url: URL, ffprobePath: String) -> Double {
        let task = Process()
        task.executableURL = URL(fileURLWithPath: ffprobePath)
        task.arguments = [
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            url.path
        ]
        
        let pipe = Pipe()
        task.standardOutput = pipe
        try? task.run()
        task.waitUntilExit()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        if let output = String(data: data, encoding: .utf8) {
            return Double(output.trimmingCharacters(in: .whitespacesAndNewlines)) ?? 0.0
        }
        return 0.0
    }
}

struct FileItem: Identifiable {
    let id = UUID()
    let url: URL
    var status: Status = .pending
    var progress: Double = 0.0
    
    var name: String { url.lastPathComponent }
    
    enum Status {
        case pending, converting, done, error
    }
}

// MARK: - Views

struct ContentView: View {
    @StateObject var converter = Converter()
    @State private var isDropTarget = false
    
    var body: some View {
        VStack(spacing: 0) {
            // Header
            VStack {
                Text("Ambix2Opus")
                    .font(.system(size: 24, weight: .bold))
                    .foregroundStyle(LinearGradient(colors: [.blue, .purple], startPoint: .topLeading, endPoint: .bottomTrailing))
                Text("Ambisonics Converter")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color(NSColor.windowBackgroundColor))
            
            // Drop Zone / List
            ZStack {
                if converter.files.isEmpty {
                    VStack {
                        Image(systemName: "folder")
                            .font(.system(size: 48))
                            .foregroundStyle(.tertiary)
                        Text("Drag & Drop Files or Folders")
                            .font(.headline)
                            .foregroundStyle(.secondary)
                    }
                } else {
                    List {
                        ForEach(converter.files) { file in
                            HStack {
                                VStack(alignment: .leading) {
                                    Text(file.name)
                                        .lineLimit(1)
                                        .truncationMode(.middle)
                                    Text(statusText(file.status))
                                        .font(.caption)
                                        .foregroundStyle(statusColor(file.status))
                                }
                                Spacer()
                                if file.status == .converting {
                                    ProgressView(value: file.progress)
                                        .progressViewStyle(.linear)
                                        .frame(width: 100)
                                } else if file.status == .done {
                                    Image(systemName: "checkmark.circle.fill")
                                        .symbolRenderingMode(.multicolor)
                                }
                            }
                        }
                    }
                    .scrollContentBackground(.hidden)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(NSColor.controlBackgroundColor))
            .overlay {
                if isDropTarget {
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.purple, lineWidth: 3)
                        .padding(2)
                }
            }
            .onDrop(of: [.fileURL], isTargeted: $isDropTarget) { providers in
                var urls: [URL] = []
                let dispatchGroup = DispatchGroup()
                
                let lock = NSLock()
                for provider in providers {
                    dispatchGroup.enter()
                    _ = provider.loadObject(ofClass: URL.self) { url, _ in
                        if let url = url {
                            lock.lock()
                            urls.append(url)
                            lock.unlock()
                        }
                        dispatchGroup.leave()
                    }
                }
                
                dispatchGroup.notify(queue: .main) {
                    if !urls.isEmpty {
                        converter.addPaths(urls)
                    }
                }
                return true
            }
            
            // Footer
            HStack {
                Text("Quality:")
                Picker("", selection: $converter.quality) {
                    ForEach(QualityLevel.allCases, id: \.self) { level in
                        Text(level.description).tag(level)
                    }
                }
                .frame(width: 150)
                
                Spacer()
                
                if converter.isProcessing {
                    Text("Processing...")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            .padding()
            .background(Color(NSColor.windowBackgroundColor))
            
            // Attribution
            Text("Powered by the Opus Codec")
                .font(.system(size: 10))
                .foregroundStyle(.tertiary)
                .padding(.bottom, 4)
                .frame(maxWidth: .infinity)
                .background(Color(NSColor.windowBackgroundColor))
        }
        .frame(minWidth: 500, minHeight: 320)
        .onOpenURL { url in
            // Handle file open from Dock / Finder
            converter.addPaths([url])
        }
    }
    
    func statusText(_ status: FileItem.Status) -> String {
        switch status {
        case .pending: return "Pending"
        case .converting: return "Converting..."
        case .done: return "Done"
        case .error: return "Error"
        }
    }
    
    func statusColor(_ status: FileItem.Status) -> Color {
        switch status {
        case .error: return .red
        case .done: return .green
        default: return .secondary
        }
    }
}
