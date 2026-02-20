# Repository Map


### `./tailwind.config.js`
```
```

### `./make_repo_map.py`
```
def generate_repo_map(output_file='repo-map.md'):
```

### `./test_iamf_parser.py`
```
def calculate_ambisonic_order(channels):
def deduplicate_obu_sequence(parsed_obus):
def get_raw_duration(file_path):
def run_tests():
```

### `./vite.config.ts`
```
```

### `./vitest.config.ts`
```
```

### `./postcss.config.js`
```
```

### `./py/ambi_rotate.py`
```
def get_rotation_matrix_1st_order(yaw, pitch, roll):
def process_file(input_path, yaw, pitch, roll):
```

### `./py/ambi_data_heuristics.py`
```
def analyze_signal(file_path: str, duration: float = 5.0) -> dict:
def main():
```

### `./dist-electron/AmbiData-SIgAvv-r.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-cTCplues.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-DOoyWz8b.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-Dy1QgHZg.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-CeQprPkP.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-B_EbXidt.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-3_urDKGX.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=0x3FFFFFF|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-BGhHFD04.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
const devPath = path$1.resolve(__dirname, "../../src/cpp/build/obr_stream");
function createObrPipeline(inputPath, channels, profile) {
const ffmpegPath2 = getFfmpegPath();
const obrPath = getObrStreamPath();
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const killAll = () => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const channels = parseInt(url2.searchParams.get("channels") || "0", 10);
const profile = url2.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-CArDGrKe.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile, start = 0) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-CopsjzT8.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-B6L-478x.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-DmDJLj_e.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-BkFFiiM0.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-C4ZTPhw6.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-CYjI0vCh.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}c|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-Dhs8x7Fb.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-DX7VxvTs.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let maxAbsSum = 0;
const rawMatrix = [];
const activeNodeCount = 14;
const node = nodes[s];
const az = node.az * (Math.PI / 180);
const el = node.el * (Math.PI / 180);
const sinAz = Math.sin(az), cosAz = Math.cos(az);
const sinEl = Math.sin(el), cosEl = Math.cos(el);
const sin2Az = Math.sin(2 * az), cos2Az = Math.cos(2 * az);
const sin3Az = Math.sin(3 * az), cos3Az = Math.cos(3 * az);
const sin2El = Math.sin(2 * el);
const cosEl2 = cosEl * cosEl;
const cosEl3 = cosEl2 * cosEl;
const sinEl2 = sinEl * sinEl;
const Y = [];
let absSum = 0;
const weights = [];
const limit2 = (order + 1) ** 2;
const rawGain = Y[i] * node.w;
const scaleFactor = maxAbsSum > 1 ? maxAbsSum + 1e-3 : 1;
let filterParts = [];
const limit = (order + 1) ** 2;
const chName = channels[s];
const weights = rawMatrix[s];
let panStringForNode = "";
const scaledGain = weights[i] / scaleFactor;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':gain=12:speakers=${speakerPos}`;
const fullFilter = `${panFilter} [virt]; [virt] ${sofalizer}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info2 = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const info = await probeAudio(filePath).catch((err) => {
const channels = (info == null ? void 0 : info.channels) || 16;
let layoutFlag = "16c";
let matrixOrder = 3;
const ffmpegPath2 = getFfmpegPath();
const args = [
const HRTF_COMPENSATION_GAIN = 5.6;
const totalGain = scaleFactor * HRTF_COMPENSATION_GAIN;
const startFilter = filter;
const finalFilter = `${startFilter}[binaural];[binaural]volume=${totalGain}[out]`;
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-CvcdYHUw.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile, start = 0) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const start = parseFloat(url.searchParams.get("start") || "0");
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-scpOe3xr.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-Cs2doRHD.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile, start = 0) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-PzoUONjM.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-DfAHRmC7.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-DAqeWk-s.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}c|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer((req, res) => {
var _a;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-oTlA7VD0.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-DbUGpAsf.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-Ch4RlWGK.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-CTiMpSv2.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let maxAbsSum = 0;
const rawMatrix = [];
const activeNodeCount = 14;
const node = nodes[s];
const az = node.az * (Math.PI / 180);
const el = node.el * (Math.PI / 180);
const sinAz = Math.sin(az), cosAz = Math.cos(az);
const sinEl = Math.sin(el), cosEl = Math.cos(el);
const sin2Az = Math.sin(2 * az), cos2Az = Math.cos(2 * az);
const sin3Az = Math.sin(3 * az), cos3Az = Math.cos(3 * az);
const sin2El = Math.sin(2 * el);
const cosEl2 = cosEl * cosEl;
const cosEl3 = cosEl2 * cosEl;
const sinEl2 = sinEl * sinEl;
const Y = [];
let absSum = 0;
const weights = [];
const rawGain = Y[i] * node.w;
const scaleFactor = maxAbsSum > 1 ? maxAbsSum + 1e-3 : 1;
let filterParts = [];
const chName = channels[s];
const weights = rawMatrix[s];
let panStringForNode = "";
const scaledGain = weights[i] / scaleFactor;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':gain=12:speakers=${speakerPos}`;
const fullFilter = `${panFilter} [virt]; [virt] ${sofalizer}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const startFilter = filter;
const finalFilter = `${startFilter}[binaural];[binaural]volume=${scaleFactor * 2.5}[out]`;
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-OD4JmJrq.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const __filename$1 = fileURLToPath(import.meta.url);
const __dirname$2 = path$1.dirname(__filename$1);
function getObrStreamPath() {
const devPath = path$1.resolve(__dirname$2, "../../src/cpp/build/obr_stream");
function createObrPipeline(inputPath, channels, profile) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath$1(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-DSosieQL.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-D5zN--Ar.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-D9MGMXxM.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-BOaM0lcr.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-CiJzc1LG.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-CLVW3rFr.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile) {
let ffmpegPath2, obrPath;
const tStart = Date.now();
const decoder = spawn$1(ffmpegPath2, [
const tObr = Date.now();
const obr = spawn$1(obrPath, [
const tEnc = Date.now();
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
let activeObrPipeline = null;
const killActiveObrPipeline = () => {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const pipeline = createObrPipeline(filePath, channels, profile);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-CU2z-vQJ.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-BetSxV6G.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main.js`
```
```

### `./dist-electron/main-DZ9XZL-I.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let filterParts = [];
const node = nodes[s];
const chName = channels[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-BltZ8htr.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-ct64PlLy.js`
```
let electronApp;
const electron = require("electron");
const app = electronApp;
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
function createObrPipeline(inputPath, channels, profile, start = 0) {
let ffmpegPath2, obrPath;
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const logStderr = (prefix, stream) => {
const killAll = () => {
const handleError = (procName, err) => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = (_c = req.url) == null ? void 0 : _c.startsWith("/stream");
const isObrStream = (_d = req.url) == null ? void 0 : _d.startsWith("/obr-stream");
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const channels = parseInt(url.searchParams.get("channels") || "0", 10);
const profile = url.searchParams.get("profile") || "ambient";
const start = parseFloat(url.searchParams.get("start") || "0");
const win2 = BrowserWindow.getAllWindows()[0];
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-BKfUTWVT.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
const devPath = path$1.resolve(__dirname, "../../src/cpp/build/obr_stream");
function createObrPipeline(inputPath, channels, profile) {
const ffmpegPath2 = getFfmpegPath();
const obrPath = getObrStreamPath();
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const killAll = () => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const channels = parseInt(url2.searchParams.get("channels") || "0", 10);
const profile = url2.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-DXhONloA.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes.slice(0, 16);
let filterParts = [];
const node = nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-SxClTI48.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
function getObrStreamPath() {
const devPath = path$1.resolve(__dirname, "../../src/cpp/build/obr_stream");
function createObrPipeline(inputPath, channels, profile) {
const ffmpegPath2 = getFfmpegPath();
const obrPath = getObrStreamPath();
const decoder = spawn$1(ffmpegPath2, [
const obr = spawn$1(obrPath, [
const encoder = spawn$1(ffmpegPath2, [
const killAll = () => {
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b, _c, _d, _e;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const ffmpeg = spawn$1(ffmpegPath2, args);
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const channels = parseInt(url2.searchParams.get("channels") || "0", 10);
const profile = url2.searchParams.get("profile") || "ambient";
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-NpcRh16f.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=0x3FFFFFF|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => {
let az = n.az;
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-Dfbwa2-z.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-DqjeTQgL.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let filterParts = [];
const node = nodes[s];
const chName = channels[s];
const az = node.az * (Math.PI / 180);
const el = node.el * (Math.PI / 180);
const sinAz = Math.sin(az), cosAz = Math.cos(az);
const sinEl = Math.sin(el), cosEl = Math.cos(el);
const sin2Az = Math.sin(2 * az), cos2Az = Math.cos(2 * az);
const sin3Az = Math.sin(3 * az), cos3Az = Math.cos(3 * az);
const sin2El = Math.sin(2 * el);
const cosEl2 = cosEl * cosEl;
const cosEl3 = cosEl2 * cosEl;
const sinEl2 = sinEl * sinEl;
const Y = [];
let panStringForNode = "";
const gain = Y[i] * node.w;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':gain=12:speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main--BDs4p7N.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}c|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer((req, res) => {
var _a;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
const sofaPath = url.searchParams.get("sofaPath");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-CZi_4PAw.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-Cvd6lWyj.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}c|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer((req, res) => {
var _a;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/main-RU00J_zh.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let filterParts = [];
const node = nodes[s];
const chName = channels[s];
const az = node.az * (Math.PI / 180);
const el = node.el * (Math.PI / 180);
const sinAz = Math.sin(az), cosAz = Math.cos(az);
const sinEl = Math.sin(el), cosEl = Math.cos(el);
const sin2Az = Math.sin(2 * az), cos2Az = Math.cos(2 * az);
const sin3Az = Math.sin(3 * az), cos3Az = Math.cos(3 * az);
const sin2El = Math.sin(2 * el);
const cosEl2 = cosEl * cosEl;
const cosEl3 = cosEl2 * cosEl;
const sinEl2 = sinEl * sinEl;
const Y = [];
let panStringForNode = "";
const gain = Y[i] * node.w;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-ItUvEIUM.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-CL-K-VE5.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main--vZzyJcg.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-BqIwHh7e.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-C64E7AE2.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-Bdy_aicc.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}c|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer((req, res) => {
var _a;
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
const sofaPath = url.searchParams.get("sofaPath");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-J_ejipAe.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-CAHtGAet.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let filterParts = [];
const node = nodes[s];
const chName = channels[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-DT5Upgzs.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-Cp0daNHA.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes;
const channels = grid.channels;
let filterParts = [];
const node = nodes[s];
const chName = channels[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = nodes.map((n, i) => {
let az = n.az;
const chName = channels[i];
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-BAjP9j8q.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-DB5y6oIj.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-BZIvd6HD.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-4j_xsJzI.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-iTk2ln9q.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-D5Sji-dY.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
const nodes = grid.nodes.slice(0, 16);
let filterParts = [];
const node = nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=hexadecagonal|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => {
let az = n.az;
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers=${speakerPos}`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./dist-electron/AmbiData-3Vz3M1zU.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/AmbiData-B0IrjMWS.js`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString("ascii", fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = "PCM";
const fileHandle = await fs.open(filePath, "r");
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024));
const iamfData = {
let offset = 0;
const rawAudioElementObus = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer, offset) {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id) {
function getPythonScriptPath(scriptName) {
var _a, _b, _c, _d, _e, _f, _g;
const streamIndex = (options == null ? void 0 : options.streamIndex) ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData = {
let channelCount2 = Number(fastAudioData.channels);
let ambisonicOrder2 = -1;
let probeData = {};
let audioStreams = [];
let videoStream = void 0;
let iamfData = void 0;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1;
let durationStr = formatDuration(parseFloat(((_c = probeData.format) == null ? void 0 : _c.duration) || "0"));
const result = {
let sChannels = Number(s.channels);
const firstElement = (_g = iamfData.audioElements) == null ? void 0 : _g[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args;
const child = spawn(ffmpegPath, args);
let stderr = "";
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = "";
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath("ambi_data_heuristics.py");
const child = spawn("python3", [scriptPath, filePath]);
let stdout = "";
let stderr = "";
function formatFileSize(bytes) {
function formatDuration(seconds) {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor(seconds % 3600 / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr) {
const parts = rateStr.split("/");
```

### `./dist-electron/main-DdoRLvvQ.js`
```
function getBinaryPath(name) {
function getFfmpegPath() {
function getFfprobePath() {
function getSofaAssetPath(filename) {
function determineOutputPath(inputPath, settings, formatName, extension) {
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath);
let outputDir = settings && settings.outputDir ? settings.outputDir : inputDir;
function probeAudio(filePath) {
const ffprobePath = getFfprobePath();
const args = [
const process2 = spawn(ffprobePath, args);
let stdout = "";
let stderr = "";
var _a;
const data = JSON.parse(stdout);
const stream = (_a = data.streams) == null ? void 0 : _a[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Opus", ".opus");
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath$1(scriptName) {
function getSofaPath(filename) {
let sofaPath = "";
const scriptPath = getScriptPath$1("saf_wrapper.py");
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Binaural", "_Binaural.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stderr = "";
const lines = d.toString().split("\n");
const p = parseFloat(line.split(":")[1]);
const totalProgress = (i + p) / files.length;
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96, outputPrefix = "output") {
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1e3;
const numFrames = Math.ceil(durationSamples / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(
const iamfEncPath = getBinaryPath("iamf-enc");
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, "IAMF", "_IAMF.iamf");
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ["ignore", "pipe", "pipe"] });
let stdout = "";
let stderr = "";
let lastP = 0;
const updateP = (fileP) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5;
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1e3;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? "Signal Killed" : code;
const results = [];
const ffmpegPath2 = getFfmpegPath();
let codec = "pcm_s24le";
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "CAF", ".caf");
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const orderMap = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, "Order_Converter", suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join("|");
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`];
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
function getScriptPath(scriptName) {
const scriptName = "rotator.py";
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, "Rotated", "_Rotated.wav");
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn("python3", pythonArgs);
let stdout = "";
let stderr = "";
const str = d.toString();
const lines = str.split("\n");
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100;
const overall = (i + fileFraction) / files.length;
const sender = event.sender;
let bitrateVal = 96e3;
const isDev2 = !app.isPackaged;
const binPath2 = isDev2 ? path$1.join(process.cwd(), "assets", "bin", "apac-enc") : path$1.join(process.resourcesPath, "assets", "bin", "apac-enc");
const fs2 = await import("fs");
const file = files[i];
const fileName = path$1.basename(file);
const outFile = determineOutputPath(file, settings, "APAC", "_apac.mp4");
const child = spawn$1(binPath2, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64;
const results = [];
const ffmpegPath2 = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === ".opus" || ext === ".ogg";
const progressBase = i / files.length;
const progressScale = 1 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? "2" : "255";
const outputPath = determineOutputPath(inputPath, settings, "Ogg", ".ogg");
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? "Remux" : "Encode"})`;
const child = spawn(ffmpegPath2, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + fileProgress * progressScale;
const handlers = {};
const handler = handlers[toolId];
const byteToHex = [];
function unsafeStringify(arr, offset = 0) {
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
const native = { randomUUID };
function _v4(options, buf, offset) {
var _a;
const rnds = options.random ?? ((_a = options.rng) == null ? void 0 : _a.call(options)) ?? rng();
function v4(options, buf, offset) {
const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const binPath = isDev ? path$1.join(process.cwd(), "assets/bin") : path$1.join(process.resourcesPath, "assets/bin");
const ffmpegPath = path$1.join(binPath, "ffmpeg");
const tempDir = app.getPath("temp");
const proxyId = v4();
const outputPath = path$1.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const fileBuffer = fs$1.readFileSync(outputPath);
const fileName = path$1.basename(filePath, path$1.extname(filePath));
const ext = path$1.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1e3)}${ext}`;
const outputPath = path$1.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn$1(ffmpegPath, args);
const VirtualSpeakerGrids = {
function factorial(n) {
let res = 1;
function getP_lm(l, m, x) {
let pmm = 1;
const somx2 = Math.sqrt((1 - x) * (1 + x));
let fact = 1;
let pmmp1 = x * (2 * m + 1) * pmm;
let pll = 0;
function getACN(l, m, azRad, elRad) {
const x = Math.sin(elRad);
const abs_k = Math.abs(m);
const P = getP_lm(l, abs_k, x);
const delta = m === 0 ? 1 : 0;
const fact_diff = factorial(l - abs_k);
const fact_sum = factorial(l + abs_k);
const norm = Math.sqrt((2 - delta) * fact_diff / fact_sum);
let Y = norm * P;
function getPanFilter(order, sofaPath) {
const grid = VirtualSpeakerGrids.order3;
let filterParts = [];
const node = grid.nodes[s];
const azRad = node.az * Math.PI / 180;
const elRad = node.el * Math.PI / 180;
let sumParts = [];
let acnIndex = 0;
const Y = getACN(l, m, azRad, elRad);
const gain = Y * node.w * 4 * Math.PI;
const panFilter = `pan=${grid.speakerCount}c|${filterParts.join("|")}`;
const speakerPos = grid.nodes.map((n) => `${n.az} ${n.el}`).join("|");
const sofalizer = `sofalizer=sofa='${sofaPath}':speakers='${speakerPos}'`;
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
let win;
function createWindow() {
const server = http.createServer(async (req, res) => {
var _a, _b;
const url2 = new URL(req.url, `http://${req.headers.host}`);
const filePath2 = url2.searchParams.get("file");
const info = await probeAudio(filePath2).catch(() => null);
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get("file");
const binaural = url.searchParams.get("binaural") === "true";
let sofaPath = url.searchParams.get("sofaPath");
const hrtfProfile = url.searchParams.get("hrtfProfile");
const ffmpegPath2 = getFfmpegPath();
const args = [
const filterComplex = getPanFilter(3, sofaPath);
const ffmpeg = spawn$1(ffmpegPath2, args);
const filePath = request.url.replace("media://", "");
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path2);
const buffer = await import("node:fs/promises").then((fs2) => fs2.readFile(filePath));
const stats = await import("node:fs/promises").then((fs2) => fs2.stat(filePath));
const fs2 = await import("node:fs/promises");
const fileHandle = await fs2.open(filePath, "r");
const buffer = Buffer.alloc(length);
const defaultProps = ["openFile", "multiSelections"];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs2 = await import("node:fs/promises");
const path2 = await import("node:path");
const entries = await fs2.readdir(dir, { withFileTypes: true });
const files = [];
const fullPath = path2.join(dir, entry.name);
const allFiles = [];
const stats = await fs2.stat(p);
const scriptPath = path.join(__dirname$1, "../py/ambi_rotate.py");
const python = spawn$1("python3", [
let output = "";
let errorOutput = "";
```

### `./resources/scripts/rotator.py`
```
def compute_sh_matrix(N, points):
def get_rotation_matrix_for_order(order, R_mat_3x3):
def main():
```

### `./tests/transport_sm.test.ts`
```
function createTransportSM(initialState: Partial<TransportState> = {}) {
let state: TransportState = {
let ipcSeekCallCount = 0;
const ipcSeekArgs: number[] = [];
let failsafeTriggered = false;
let failsafeTimerId: ReturnType<typeof setTimeout> | null = null;
let onUnlockCallback: (() => void) | null = null;
const enterRebuildLock = (wasPlaying: boolean) => {
const seek = (time: number) => {
const commitSeek = (time: number, wasPlaying: boolean) => {
const simulateNativeUnlock = () => {
const advanceTimerBy = (ms: number): Promise<void> => {
const sm = createTransportSM({ isPlaying: true });
const sm = createTransportSM({ isPlaying: true });
const sm = createTransportSM({ isPlaying: true });
const sm = createTransportSM({ isPlaying: true });
const sm = createTransportSM({ isPlaying: false });
const sm = createTransportSM({ isPlaying: true });
const sm = createTransportSM({ isPlaying: true });
```

### `./tests/handlers.test.ts`
```
const actual = await vi.importActual<any>('node:fs');
let mockEvent: IpcMainInvokeEvent;
let spawnMock: any;
const result = await handleAmbix2Opus(mockEvent, {
const common = await import('../electron/handlers/common');
const call = spawnMock.mock.calls[0];
const cmd = call[0];
const args = call[1];
const call = spawnMock.mock.calls.find((c: any) => c[0].includes('iamf-enc'));
const args = call[1];
const result = await handleAmbiOrder(mockEvent, {
const call = spawnMock.mock.calls.find((c: any) => c[1].includes('-filter_complex'));
const args = call[1];
const filter = args[args.indexOf('-filter_complex') + 1];
const result = await handleAmbiOrder(mockEvent, {
const call = spawnMock.mock.calls.find((c: any) => c[1].some((arg: string) => arg.includes('channelmap=0|1|2|3')));
const result = await handleAmbix2CAF(mockEvent, {
const call = spawnMock.mock.calls.find((c: any) => c[1].includes('caf'));
const args = call[1];
const call = spawnMock.mock.calls.find((c: any) => c[1].includes('pcm_f32le'));
const common = await import('../electron/handlers/common');
const result = await handleAmbiSwap(mockEvent, {
const call = spawnMock.mock.calls.find((c: any) => c[1].includes('-filter_complex'));
const filter = call[1][call[1].indexOf('-filter_complex') + 1];
const common = await import('../electron/handlers/common');
const result = await handleAmbiSwap(mockEvent, {
const call = spawnMock.mock.calls.find((c: any) => c[1].includes('-filter_complex'));
const filter = call[1][call[1].indexOf('-filter_complex') + 1];
const common = await import('../electron/handlers/common');
const result = await handleAmbiSwap(mockEvent, {
```

### `./tests/debug_rotation_sweep.py`
```
def run_sweep(sofa_path):
def encode_ambi(order, azi, ele, sig_chunk):
```

### `./tests/gen_test_signal.py`
```
def generate_test_signal():
```

### `./tests/check_hrtf_delay.py`
```
def check_delays(sofa_path):
```

### `./tests/check_hrtf_energy.py`
```
def check_energy(sofa_path):
def get_energy(h):
```

### `./tests/test_coords.py`
```
def check_sofa_coords(sofa_path):
def check_sh_math():
```

### `./tests/test_saf.py`
```
def test_saf():
```

### `./tests/check_netcdf_clean.py`
```
def check_sofa_netcdf(sofa_path):
```

### `./tests/trim.test.ts`
```
const TEST_DIR = path.join(__dirname, '../test_output/trim_tests');
const INPUT_FILE = path.join(__dirname, '../test_4ch.wav'); // Assuming this exists from file listing
const OUTPUT_DIR = path.join(TEST_DIR, 'output');
const proxyPath = await generateProxy(INPUT_FILE);
const stats = fs.statSync(proxyPath);
const startTime = 1.0;
const endTime = 3.0; // 2 seconds duration
const outputPath = await executeTrim(INPUT_FILE, startTime, endTime, OUTPUT_DIR);
const originalStats = fs.statSync(INPUT_FILE); // 10s file approx?
const trimmedStats = fs.statSync(outputPath);
```

### `./tests/test_math.py`
```
def test_sh_generation():
```

### `./public/ambisonics.js`
```
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var binDecoder = function () {
function binDecoder(audioCtx, order) {
var n = Math.floor(Math.sqrt(i));
var m = i - n * n - n;
var cardGains = new Array(this.nCh);
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var binDecoder2D = function () {
function binDecoder2D(audioCtx, order) {
var cardGains = new Array(this.nCh);
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var wxyz2acn = exports.wxyz2acn = function wxyz2acn(audioCtx) {
var acn2wxyz = exports.acn2wxyz = function acn2wxyz(audioCtx) {
var sn3d2n3d = exports.sn3d2n3d = function sn3d2n3d(audioCtx, order) {
var n = Math.floor(Math.sqrt(i));
var n3d2sn3d = exports.n3d2sn3d = function n3d2sn3d(audioCtx, order) {
var n = Math.floor(Math.sqrt(i));
var fuma2acn = exports.fuma2acn = function fuma2acn(audioCtx, order) {
var gains_fuma2n3d = [Math.sqrt(2), // W
var o = 0;
var m;
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var convolver = function () {
function convolver(audioCtx, order) {
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var utils = require("./utils.js");
var decoder = function () {
function decoder(audioCtx, order) {
var g = this.ctx.createGain();
var spkSphPosArray = [];
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var intensityAnalyser = function () {
function intensityAnalyser(audioCtx) {
var iX = 0;
var iY = 0;
var iZ = 0;
var WW = 0;
var XX = 0;
var YY = 0;
var ZZ = 0;
var I, I_norm, E, Psi, azim, elev;
var params = [azim, elev, Psi, E];
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var intensityAnalyser2D = function () {
function intensityAnalyser2D(audioCtx) {
var iX = 0;
var iY = 0;
var WW = 0;
var XX = 0;
var YY = 0;
var I, I_norm, E, Psi, azim, elev;
var params = [azim, elev, Psi, E];
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
var _sphericalHarmonicTransform = require('spherical-harmonic-transform');
var jshlib = _interopRequireWildcard(_sphericalHarmonicTransform);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var monoEncoder = function () {
function monoEncoder(audioCtx, order) {
var N = this.order;
var g_enc = jshlib.computeRealSH(N, [[this.azim * Math.PI / 180, this.elev * Math.PI / 180]]);
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var utils = require("./utils.js");
var monoEncoder2D = function () {
function monoEncoder2D(audioCtx, order) {
var N = this.order;
var g_enc = utils.getCircHarmonics(N, [this.azim]);
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var orderLimiter = function () {
function orderLimiter(audioCtx, orderIn, orderOut) {
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var orderLimiter2D = function () {
function orderLimiter2D(audioCtx, orderIn, orderOut) {
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
var _sphericalHarmonicTransform = require('spherical-harmonic-transform');
var jshlib = _interopRequireWildcard(_sphericalHarmonicTransform);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var orderWeight = function () {
function orderWeight(audioCtx, order) {
var n;
var N = this.order;
var leg_n_minus1 = 0;
var leg_n_minus2 = 0;
var leg_n = 0;
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
var _numeric = require('numeric');
var numeric = _interopRequireWildcard(_numeric);
var _sphericalHarmonicTransform = require('spherical-harmonic-transform');
var jshlib = _interopRequireWildcard(_sphericalHarmonicTransform);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var utils = require('./utils.js'); ////////////////////////////////////////////////////////////////////
var powermapAnalyser = function () {
function powermapAnalyser(audioCtx, order, mode) {
var td_dirs_deg = utils.getTdesign(4 * order);
var nDirs = this.td_dirs_rad.length;
var data = numeric.dot(numeric.transpose(this.SHmtx), this.analBuffers);
var powerValues = new Array(nDirs);
var tmp_pwr = 0;
var tmp_pwr = tmp_pwr / this.fftSize;
var powerCoeffs = jshlib.forwardSHT(2 * this.order, powerValues);
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var rmsAnalyser = function () {
function rmsAnalyser(audioCtx, order) {
var rms_values = new Array(this.nCh);
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var sceneMirror = function () {
function sceneMirror(audioCtx, order) {
var q;
var q;
var q;
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var sceneMirror2D = function () {
function sceneMirror2D(audioCtx, order) {
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
var _sphericalHarmonicTransform = require('spherical-harmonic-transform');
var jshlib = _interopRequireWildcard(_sphericalHarmonicTransform);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var sceneRotator = function () {
function sceneRotator(audioCtx, order) {
var gains_n = new Array(2 * n + 1);
var band_idx = 1;
var yaw = this.yaw * Math.PI / 180;
var pitch = this.pitch * Math.PI / 180;
var roll = this.roll * Math.PI / 180;
var band_idx = 1;
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var sceneRotator2D = function () {
function sceneRotator2D(audioCtx, order) {
var tempGainArr = new Array(2);
var tempGainArr2 = new Array(2);
var azim = this.yaw * Math.PI / 180;
var j = 1;
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
var _sphericalHarmonicTransform = require("spherical-harmonic-transform");
var jshlib = _interopRequireWildcard(_sphericalHarmonicTransform);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var virtualMic = function () {
function virtualMic(audioCtx, order) {
function computeCardioidCoeffs(N) {
var coeffs = new Array(N + 1);
function computeHypercardCoeffs(N) {
var coeffs = new Array(N + 1);
var nSH = (N + 1) * (N + 1);
function computeSupercardCoeffs(N) {
var coeffs = [0.3660, 0.2113];
var coeffs = [0.2362, 0.1562, 0.0590];
var coeffs = [0.1768, 0.1281, 0.0633, 0.0175];
var coeffs = [0.1414, 0.1087, 0.0623, 0.0247, 0.0054];
function computeMaxRECoeffs(N) {
var coeffs = new Array(N + 1);
var leg_n_minus1 = 0;
var leg_n_minus2 = 0;
var leg_n = 0;
var norm = 0;
var azim = this.azim * Math.PI / 180;
var elev = this.elev * Math.PI / 180;
var tempSH = jshlib.computeRealSH(this.order, [[azim, elev]]);
var q;
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var HOAloader = function () {
function HOAloader(context, order, url, callback) {
var fileExt = url.slice(url.length - 3, url.length);
function pad(num, size) {
var request = new XMLHttpRequest();
var scope = this;
var nCh = this.nCh;
var nChGroups = this.nChGroups;
var length = this.buffers[0].length;
var srate = this.buffers[0].sampleRate;
var remap8ChanFile = [1, 2, 3, 4, 5, 6, 7, 8];
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var utils = require("./utils.js");
var HRIRloader2D_local = function () {
function HRIRloader2D_local(context, order, callback) {
var self = this;
var requestHrir = new XMLHttpRequest();
var nearestIdx = utils.findNearest(self.vls_dirs_deg, self.nearestLookup, self.nearestLookupRes);
var self = this;
var left = new Float64Array(element[0]);
var right = new Float64Array(element[1]);
var nDirs = nearestIdx.length;
var nearest_dirs_deg = [];
var nDirs = nearestIdx.length;
var nearest_hrirs = [];
var a_n = [];
var diagA = numeric.diag(a_n);
var hoaBuffer = this.context.createBuffer(nCh, nSamples, sampleRate);
var concatBufferArrayLeft = new Float32Array(nSamples);
var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require('babel-runtime/helpers/createClass');
var _createClass3 = _interopRequireDefault(_createClass2);
var _serveSofaHrir = require('serve-sofa-hrir');
var serveSofaHrir = _interopRequireWildcard(_serveSofaHrir);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var utils = require("./utils.js"); ////////////////////////////////////////////////////////////////////
var HRIRloader_ircam = function () {
function HRIRloader_ircam(context, order, callback) {
var _this = this;
var grantedFilterPos = [];
var angularDistDeg = 0;
var hrirBufferLength = this.hrirBuffer[0].length; // assuming they all have the same
var hrirBufferSampleRate = this.hrirBuffer[0].sampleRate; // same
var hoaBuffer = this.context.createBuffer(this.nCh, hrirBufferLength, hrirBufferSampleRate);
var concatBufferArrayLeft = new Float32Array(hrirBufferLength);
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
var _createClass2 = require("babel-runtime/helpers/createClass");
var _createClass3 = _interopRequireDefault(_createClass2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var utils = require("./utils.js");
var HRIRloader_local = function () {
function HRIRloader_local(context, order, callback) {
var self = this;
var requestHrir = new XMLHttpRequest();
var nearestIdx = utils.findNearest(self.vls_dirs_deg, self.nearestLookup, self.nearestLookupRes);
var self = this;
var left = new Float64Array(element[0]);
var right = new Float64Array(element[1]);
var nDirs = nearestIdx.length;
var nearest_dirs_deg = [];
var nDirs = nearestIdx.length;
var nearest_hrirs = [];
var hoaBuffer = this.context.createBuffer(nCh, nSamples, sampleRate);
var concatBufferArrayLeft = new Float32Array(nSamples);
var _ambiMonoEncoder = require('./ambi-monoEncoder');
var _ambiMonoEncoder2D = require('./ambi-monoEncoder2D');
var _ambiOrderLimiter = require('./ambi-orderLimiter');
var _ambiOrderLimiter2D = require('./ambi-orderLimiter2D');
var _ambiOrderWeight = require('./ambi-orderWeight');
var _ambiSceneRotator = require('./ambi-sceneRotator');
var _ambiSceneRotator2D = require('./ambi-sceneRotator2D');
var _ambiSceneMirror = require('./ambi-sceneMirror');
var _ambiSceneMirror2D = require('./ambi-sceneMirror2D');
var _ambiBinauralDecoder = require('./ambi-binauralDecoder');
var _ambiBinauralDecoder2D = require('./ambi-binauralDecoder2D');
var _ambiDecoder = require('./ambi-decoder');
var _ambiConvolver = require('./ambi-convolver');
var _ambiVirtualMic = require('./ambi-virtualMic');
var _ambiRmsAnalyser = require('./ambi-rmsAnalyser');
var _ambiPowermapAnalyser = require('./ambi-powermapAnalyser');
var _ambiIntensityAnalyser = require('./ambi-intensityAnalyser');
var _ambiIntensityAnalyser2D = require('./ambi-intensityAnalyser2D');
var _hoaLoader = require('./hoa-loader');
var _hrirLoader_local = require('./hrir-loader_local');
var _hrirLoader2D_local = require('./hrir-loader2D_local');
var _hrirLoader_ircam = require('./hrir-loader_ircam');
var _ambiConverters = require('./ambi-converters');
var _converters = _interopRequireWildcard(_ambiConverters);
var _utils2 = require('./utils');
var _utils = _interopRequireWildcard(_utils2);
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var converters = exports.converters = _converters;
var utils = exports.utils = _utils;
var numeric = require('numeric');
var jshlib = require('spherical-harmonic-transform');
var convexhull = require('convex-hull');
function deg2rad(aedArrayIn) {
var aedArrayOut = [];
var PI_180 = Math.PI / 180.0;
function rad2deg(aedArrayIn) {
var aedArrayOut = [];
var PI_180 = 180.0 / Math.PI;
function getColumn(anArray, columnNumber) {
function sampleCircle(numPoints) {
var speakerAngles = [];
var deltaAngle = 360 / numPoints;
var currentAngle = 0;
function getCircHarmonics(order, phis) {
var N = order;
var numCircHarm = 2 * N + 1;
var Ndirs = phis.length;
var Y_N = new Array(numCircHarm);
var cosmphis, sinmphis;
var arr1 = new Array(Ndirs);
function getAmbisonicDecMtx(hrtf_dirs_deg, order) {
var hrtf_dirs_rad = deg2rad(hrtf_dirs_deg);
var vertices = jshlib.convertSph2Cart(hrtf_dirs_rad);
var triplets = convexhull(vertices);
var nTri = triplets.length;
var nHRTFs = hrtf_dirs_rad.length;
var layoutInvMtx = new Array(nTri);
var tempGroup = new Array(3);
var tempInvMtx = numeric.inv(tempGroup);
var tempInvVec = []; //vectorize matrix by stacking columns
var t = 2 * order + 1;
var td_dirs_deg = getTdesign(2 * order);
var td_dirs_rad = deg2rad(td_dirs_deg);
var G_td = vbap3(td_dirs_rad, triplets, layoutInvMtx, nHRTFs);
var Y_td = jshlib.computeRealSH(order, td_dirs_rad);
var nTD = td_dirs_rad.length;
var M_dec = numeric.dotMMsmall(G_td, Y_td);
var vbap3 = function vbap3(dirs_rad, triplets, ls_invMtx, ls_num) {
var nDirs = dirs_rad.length;
var nLS = ls_num;
var nTri = triplets.length;
function getMinOfArray(numArray) {
var gainMtx = new Array(nDirs);
var U = jshlib.convertSph2Cart(dirs_rad);
var u = U[ns];
var gains = new Array(nLS);
var g_tmp = [];
var v_tmp = [ls_invMtx[i][0], ls_invMtx[i][1], ls_invMtx[i][2]];
var norm_g_tmp = Math.sqrt(numeric.sum(numeric.pow(g_tmp, 2))); // normalize gains
var g_tmp_normed = numeric.div(g_tmp, norm_g_tmp);
var norm_gains = Math.sqrt(numeric.sum(numeric.pow(gains, 2))); // normalize gains
var gains_normed = numeric.div(gains, norm_gains);
function createNearestLookup(dirs_deg, ang_res) {
var nDirs = dirs_deg.length;
var dirs_xyz = jshlib.convertSph2Cart(deg2rad(dirs_deg));
var nAzi = Math.round(360 / ang_res[0]) + 1;
var nEle = Math.round(180 / ang_res[1]) + 1;
var azi = new Array(nAzi);
var nGrid = nAzi * nEle;
var nearestLookup = new Array(nGrid);
var grid_deg = [[_i2 % nAzi * ang_res[0] - 180, Math.floor(_i2 / nAzi) * ang_res[1] - 90]];
var grid_xyz = jshlib.convertSph2Cart(deg2rad(grid_deg));
var minVal = 1000;
var newMinVal = numeric.sum(numeric.pow(numeric.sub(grid_xyz[0], dirs_xyz[j]), 2));
function findNearest(dirs_deg, nearestLookup, ang_res) {
var nDirs = dirs_deg.length;
var azim = [];
var elev = [];
var nAzi = Math.round(360 / ang_res[0]) + 1;
var aziIndex = numeric.round(numeric.div(numeric.mod(azim, 360), ang_res[0]));
var elevIndex = numeric.round(numeric.div(elev, ang_res[1]));
var gridIndex = numeric.add(numeric.mul(elevIndex, nAzi), aziIndex, 1);
var nearestIndex = [];
function getTdesign(degree) {
var speakerPos = [[[0.00, 0.00, 1.00], [180.00, 0.00, 1.00]], [[45.00, 35.26, 1.00], [-45.00, -35.26, 1.00], [135.00, -35.26, 1.00], [-135.00, 35.26, 1.00]], [[0.00, 0.00, 1.00], [180.00, 0.00, 1.00], [90.00, 0.00, 1.00], [-90.00, 0.00, 1.00], [0.00, 90.00, 1.00], [0.00, -90.00, 1.00]], [[0.00, -31.72, 1.00], [-58.28, 0.00, 1.00], [-90.00, 58.28, 1.00], [0.00, 31.72, 1.00], [-121.72, 0.00, 1.00], [90.00, -58.28, 1.00], [180.00, -31.72, 1.00], [121.72, 0.00, 1.00], [90.00, 58.28, 1.00], [180.00, 31.72, 1.00], [58.28, 0.00, 1.00], [-90.00, -58.28, 1.00]], [[0.00, -31.72, 1.00], [-58.28, 0.00, 1.00], [-90.00, 58.28, 1.00], [0.00, 31.72, 1.00], [-121.72, 0.00, 1.00], [90.00, -58.28, 1.00], [180.00, -31.72, 1.00], [121.72, 0.00, 1.00], [90.00, 58.28, 1.00], [180.00, 31.72, 1.00], [58.28, 0.00, 1.00], [-90.00, -58.28, 1.00]], [[26.00, 15.46, 1.00], [-26.00, -15.46, 1.00], [17.11, -24.99, 1.00], [-17.11, 24.99, 1.00], [154.00, -15.46, 1.00], [-154.00, 15.46, 1.00], [162.89, 24.99, 1.00], [-162.89, -24.99, 1.00], [72.89, 24.99, 1.00], [107.11, -24.99, 1.00], [116.00, 15.46, 1.00], [64.00, -15.46, 1.00], [-107.11, 24.99, 1.00], [-72.89, -24.99, 1.00], [-64.00, 15.46, 1.00], [-116.00, -15.46, 1.00], [32.25, 60.03, 1.00], [-147.75, 60.03, 1.00], [-57.75, 60.03, 1.00], [122.25, 60.03, 1.00], [-32.25, -60.03, 1.00], [147.75, -60.03, 1.00], [57.75, -60.03, 1.00], [-122.25, -60.03, 1.00]], [[26.00, 15.46, 1.00], [-26.00, -15.46, 1.00], [17.11, -24.99, 1.00], [-17.11, 24.99, 1.00], [154.00, -15.46, 1.00], [-154.00, 15.46, 1.00], [162.89, 24.99, 1.00], [-162.89, -24.99, 1.00], [72.89, 24.99, 1.00], [107.11, -24.99, 1.00], [116.00, 15.46, 1.00], [64.00, -15.46, 1.00], [-107.11, 24.99, 1.00], [-72.89, -24.99, 1.00], [-64.00, 15.46, 1.00], [-116.00, -15.46, 1.00], [32.25, 60.03, 1.00], [-147.75, 60.03, 1.00], [-57.75, 60.03, 1.00], [122.25, 60.03, 1.00], [-32.25, -60.03, 1.00], [147.75, -60.03, 1.00], [57.75, -60.03, 1.00], [-122.25, -60.03, 1.00]], [[-31.11, 53.65, 1.00], [110.82, 30.50, 1.00], [148.89, 53.65, 1.00], [32.21, -17.83, 1.00], [69.18, -30.50, 1.00], [-32.21, 17.83, 1.00], [-69.18, 30.50, 1.00], [-147.79, -17.83, 1.00], [-110.82, -30.50, 1.00], [147.79, 17.83, 1.00], [31.11, -53.65, 1.00], [-148.89, -53.65, 1.00], [-21.25, -47.78, 1.00], [-108.20, 38.78, 1.00], [158.75, -47.78, 1.00], [139.77, -14.09, 1.00], [-71.80, -38.78, 1.00], [-139.77, 14.09, 1.00], [71.80, 38.78, 1.00], [-40.23, -14.09, 1.00], [108.20, -38.78, 1.00], [40.23, 14.09, 1.00], [21.25, 47.78, 1.00], [-158.75, 47.78, 1.00], [106.65, -2.55, 1.00], [-2.66, -16.63, 1.00], [-73.35, -2.55, 1.00], [-98.84, 73.16, 1.00], [-177.34, 16.63, 1.00], [98.84, -73.16, 1.00], [177.34, -16.63, 1.00], [81.16, 73.16, 1.00], [2.66, 16.63, 1.00], [-81.16, -73.16, 1.00], [-106.65, 2.55, 1.00], [73.35, 2.55, 1.00]], [[20.75, -3.55, 1.00], [-20.75, 3.55, 1.00], [-3.80, -20.70, 1.00], [3.80, 20.70, 1.00], [159.25, 3.55, 1.00], [-159.25, -3.55, 1.00], [-176.20, 20.70, 1.00], [176.20, -20.70, 1.00], [93.80, 20.70, 1.00], [86.20, -20.70, 1.00], [110.75, -3.55, 1.00], [69.25, 3.55, 1.00], [-86.20, 20.70, 1.00], [-93.80, -20.70, 1.00], [-69.25, -3.55, 1.00], [-110.75, 3.55, 1.00], [-9.94, 68.97, 1.00], [170.06, 68.97, 1.00], [-99.94, 68.97, 1.00], [80.06, 68.97, 1.00], [9.94, -68.97, 1.00], [-170.06, -68.97, 1.00], [99.94, -68.97, 1.00], [-80.06, -68.97, 1.00], [42.15, 17.57, 1.00], [-42.15, -17.57, 1.00], [23.12, -39.77, 1.00], [-23.12, 39.77, 1.00], [137.85, -17.57, 1.00], [-137.85, 17.57, 1.00], [156.88, 39.77, 1.00], [-156.88, -39.77, 1.00], [66.88, 39.77, 1.00], [113.12, -39.77, 1.00], [132.15, 17.57, 1.00], [47.85, -17.57, 1.00], [-113.12, 39.77, 1.00], [-66.88, -39.77, 1.00], [-47.85, 17.57, 1.00], [-132.15, -17.57, 1.00], [25.26, 44.98, 1.00], [-154.74, 44.98, 1.00], [-64.74, 44.98, 1.00], [115.26, 44.98, 1.00], [-25.26, -44.98, 1.00], [154.74, -44.98, 1.00], [64.74, -44.98, 1.00], [-115.26, -44.98, 1.00]], [[144.09, -21.45, 1.00], [-33.81, -48.92, 1.00], [-35.91, -21.45, 1.00], [-115.87, 33.09, 1.00], [-146.19, 48.92, 1.00], [115.87, -33.09, 1.00], [146.19, -48.92, 1.00], [64.13, 33.09, 1.00], [33.81, 48.92, 1.00], [-64.13, -33.09, 1.00], [-144.09, 21.45, 1.00], [35.91, 21.45, 1.00], [-45.53, 1.95, 1.00], [177.26, 44.44, 1.00], [134.47, 1.95, 1.00], [87.21, -45.49, 1.00], [2.74, -44.44, 1.00], [-87.21, 45.49, 1.00], [-2.74, 44.44, 1.00], [-92.79, -45.49, 1.00], [-177.26, -44.44, 1.00], [92.79, 45.49, 1.00], [45.53, -1.95, 1.00], [-134.47, -1.95, 1.00], [15.59, -73.34, 1.00], [-85.40, 16.04, 1.00], [-164.41, -73.34, 1.00], [163.92, 4.42, 1.00], [-94.60, -16.04, 1.00], [-163.92, -4.42, 1.00], [94.60, 16.04, 1.00], [-16.08, 4.42, 1.00], [85.40, -16.04, 1.00], [16.08, -4.42, 1.00], [-15.59, 73.34, 1.00], [164.41, 73.34, 1.00], [-60.02, 25.27, 1.00], [151.41, 26.86, 1.00], [119.98, 25.27, 1.00], [46.63, -51.57, 1.00], [28.59, -26.86, 1.00], [-46.63, 51.57, 1.00], [-28.59, 26.86, 1.00], [-133.37, -51.57, 1.00], [-151.41, -26.86, 1.00], [133.37, 51.57, 1.00], [60.02, -25.27, 1.00], [-119.98, -25.27, 1.00], [-109.94, 6.91, 1.00], [172.65, -19.79, 1.00], [70.06, 6.91, 1.00], [-70.44, -68.94, 1.00], [7.35, 19.79, 1.00], [70.44, 68.94, 1.00], [-7.35, -19.79, 1.00], [109.56, -68.94, 1.00], [-172.65, 19.79, 1.00], [-109.56, 68.94, 1.00], [109.94, -6.91, 1.00], [-70.06, -6.91, 1.00]], [[132.93, 7.69, 1.00], [-83.93, -23.73, 1.00], [8.47, 23.51, 1.00], [-113.34, 70.42, 1.00], [-103.27, -9.90, 1.00], [-33.24, -70.75, 1.00], [21.86, -26.46, 1.00], [-156.54, 47.78, 1.00], [-64.26, -7.72, 1.00], [165.78, 44.53, 1.00], [-25.20, 26.39, 1.00], [-97.00, -44.66, 1.00], [27.85, 9.77, 1.00], [153.21, -47.71, 1.00], [-155.06, 7.45, 1.00], [-11.84, -23.59, 1.00], [80.54, 23.72, 1.00], [-42.06, 70.44, 1.00], [-31.22, -9.84, 1.00], [38.84, -70.50, 1.00], [93.76, -26.29, 1.00], [-84.76, 47.61, 1.00], [7.76, -7.52, 1.00], [-122.28, 44.29, 1.00], [46.80, 26.64, 1.00], [-24.77, -44.57, 1.00], [99.89, 9.91, 1.00], [-134.78, -47.96, 1.00], [-83.09, 7.30, 1.00], [60.13, -23.34, 1.00], [152.64, 23.64, 1.00], [29.76, 70.68, 1.00], [40.78, -9.58, 1.00], [110.18, -70.39, 1.00], [165.65, -26.43, 1.00], [-12.99, 47.75, 1.00], [79.74, -7.31, 1.00], [-50.52, 44.26, 1.00], [118.92, 26.71, 1.00], [47.22, -44.31, 1.00], [171.93, 9.76, 1.00], [-62.51, -48.04, 1.00], [-11.12, 7.44, 1.00], [132.02, -23.33, 1.00], [-135.36, 23.39, 1.00], [102.37, 70.82, 1.00], [112.74, -9.49, 1.00], [-178.30, -70.58, 1.00], [-122.32, -26.67, 1.00], [59.08, 48.00, 1.00], [151.70, -7.38, 1.00], [21.38, 44.50, 1.00], [-169.01, 26.50, 1.00], [118.98, -44.25, 1.00], [-116.09, 9.52, 1.00], [9.65, -47.83, 1.00], [60.89, 7.68, 1.00], [-156.02, -23.57, 1.00], [-63.46, 23.31, 1.00], [174.93, 70.66, 1.00], [-175.29, -9.68, 1.00], [-105.95, -70.80, 1.00], [-50.19, -26.70, 1.00], [131.36, 48.01, 1.00], [-136.30, -7.64, 1.00], [93.56, 44.67, 1.00], [-97.08, 26.30, 1.00], [-169.16, -44.46, 1.00], [-44.13, 9.52, 1.00], [81.48, -47.62, 1.00]], [[-154.47, 7.90, 1.00], [162.15, -63.36, 1.00], [25.53, 7.90, 1.00], [-81.26, -25.27, 1.00], [17.85, 63.36, 1.00], [81.26, 25.27, 1.00], [-17.85, -63.36, 1.00], [98.74, -25.27, 1.00], [-162.15, 63.36, 1.00], [-98.74, 25.27, 1.00], [154.47, -7.90, 1.00], [-25.53, -7.90, 1.00], [1.30, -10.47, 1.00], [-83.01, 79.45, 1.00], [-178.70, -10.47, 1.00], [100.48, 1.28, 1.00], [-96.99, -79.45, 1.00], [-100.48, -1.28, 1.00], [96.99, 79.45, 1.00], [-79.52, 1.28, 1.00], [83.01, -79.45, 1.00], [79.52, -1.28, 1.00], [-1.30, 10.47, 1.00], [178.70, 10.47, 1.00], [157.24, 13.15, 1.00], [31.14, -63.89, 1.00], [-22.76, 13.15, 1.00], [-75.78, 22.13, 1.00], [148.86, 63.89, 1.00], [75.78, -22.13, 1.00], [-148.86, -63.89, 1.00], [104.22, 22.13, 1.00], [-31.14, 63.89, 1.00], [-104.22, -22.13, 1.00], [-157.24, -13.15, 1.00], [22.76, -13.15, 1.00], [110.44, -60.62, 1.00], [-62.18, -9.87, 1.00], [-69.56, -60.62, 1.00], [-168.88, 27.37, 1.00], [-117.82, 9.87, 1.00], [168.88, -27.37, 1.00], [117.82, -9.87, 1.00], [11.12, 27.37, 1.00], [62.18, 9.87, 1.00], [-11.12, -27.37, 1.00], [-110.44, 60.62, 1.00], [69.56, 60.62, 1.00], [-125.93, -47.40, 1.00], [-126.67, -23.40, 1.00], [54.07, -47.40, 1.00], [-151.65, -33.24, 1.00], [-53.33, 23.40, 1.00], [151.65, 33.24, 1.00], [53.33, -23.40, 1.00], [28.35, -33.24, 1.00], [126.67, 23.40, 1.00], [-28.35, 33.24, 1.00], [125.93, 47.40, 1.00], [-54.07, 47.40, 1.00], [61.41, 37.54, 1.00], [41.19, 22.30, 1.00], [-118.59, 37.54, 1.00], [31.92, 44.13, 1.00], [138.81, -22.30, 1.00], [-31.92, -44.13, 1.00], [-138.81, 22.30, 1.00], [-148.08, 44.13, 1.00], [-41.19, -22.30, 1.00], [148.08, -44.13, 1.00], [-61.41, -37.54, 1.00], [118.59, -37.54, 1.00], [132.92, 4.73, 1.00], [6.45, -42.74, 1.00], [-47.08, 4.73, 1.00], [-83.07, 46.87, 1.00], [173.55, 42.74, 1.00], [83.07, -46.87, 1.00], [-173.55, -42.74, 1.00], [96.93, 46.87, 1.00], [-6.45, 42.74, 1.00], [-96.93, -46.87, 1.00], [-132.92, -4.73, 1.00], [47.08, -4.73, 1.00]], [[-40.36, 68.70, 1.00], [61.12, 65.68, 1.00], [141.73, 70.75, 1.00], [-131.25, 72.32, 1.00], [-154.88, -12.62, 1.00], [-66.20, -9.78, 1.00], [26.36, -11.97, 1.00], [114.95, -12.58, 1.00], [37.02, 51.13, 1.00], [129.77, 51.95, 1.00], [-140.63, 50.15, 1.00], [-56.50, 47.88, 1.00], [-65.05, 12.58, 1.00], [25.12, 12.62, 1.00], [113.80, 9.78, 1.00], [-153.64, 11.97, 1.00], [-134.51, -9.73, 1.00], [-46.23, -8.37, 1.00], [47.91, -9.73, 1.00], [141.51, -8.73, 1.00], [-17.84, -44.10, 1.00], [69.37, -43.27, 1.00], [151.22, -42.67, 1.00], [-106.78, -40.18, 1.00], [-50.23, -51.95, 1.00], [39.37, -50.15, 1.00], [123.50, -47.88, 1.00], [-142.98, -51.13, 1.00], [-179.19, -60.75, 1.00], [-84.57, -54.07, 1.00], [5.39, -58.05, 1.00], [89.50, -60.75, 1.00], [-145.98, 31.02, 1.00], [-54.39, 26.43, 1.00], [28.92, 32.51, 1.00], [125.34, 30.94, 1.00], [168.71, -7.06, 1.00], [-112.49, -10.38, 1.00], [-21.96, -9.60, 1.00], [73.11, -8.31, 1.00], [95.68, 0.04, 1.00], [-170.71, 2.32, 1.00], [-84.32, -0.04, 1.00], [9.29, -2.32, 1.00], [9.19, -34.33, 1.00], [98.21, -37.31, 1.00], [-179.20, -40.48, 1.00], [-77.81, -31.60, 1.00], [-177.08, -21.74, 1.00], [-93.77, -18.83, 1.00], [-2.72, -19.80, 1.00], [90.51, -20.91, 1.00], [-106.89, 8.31, 1.00], [-11.29, 7.06, 1.00], [67.51, 10.38, 1.00], [158.04, 9.60, 1.00], [-118.88, -65.68, 1.00], [-38.27, -70.75, 1.00], [48.75, -72.32, 1.00], [139.64, -68.70, 1.00], [-54.66, -30.94, 1.00], [34.02, -31.02, 1.00], [125.61, -26.43, 1.00], [-151.08, -32.51, 1.00], [-170.81, 34.33, 1.00], [-81.79, 37.31, 1.00], [0.80, 40.48, 1.00], [102.19, 31.60, 1.00], [-28.78, 42.67, 1.00], [73.22, 40.18, 1.00], [162.16, 44.10, 1.00], [-110.63, 43.27, 1.00], [-89.49, 20.91, 1.00], [2.92, 21.74, 1.00], [86.23, 18.83, 1.00], [177.28, 19.80, 1.00], [133.77, 8.37, 1.00], [-132.09, 9.73, 1.00], [-38.49, 8.73, 1.00], [45.49, 9.73, 1.00], [-25.60, 24.04, 1.00], [55.12, 30.23, 1.00], [149.30, 28.05, 1.00], [-118.71, 26.06, 1.00], [0.81, 60.75, 1.00], [95.43, 54.07, 1.00], [-174.61, 58.05, 1.00], [-90.50, 60.75, 1.00], [-124.88, -30.23, 1.00], [-30.70, -28.05, 1.00], [61.29, -26.06, 1.00], [154.40, -24.04, 1.00], [-132.92, -85.60, 1.00], [47.08, 85.60, 1.00]], [[-129.19, 8.11, 1.00], [169.58, -38.73, 1.00], [50.81, 8.12, 1.00], [-77.27, -50.11, 1.00], [10.42, 38.73, 1.00], [77.30, 50.12, 1.00], [-10.41, -38.72, 1.00], [102.71, -50.11, 1.00], [-169.57, 38.72, 1.00], [-102.71, 50.11, 1.00], [129.19, -8.11, 1.00], [-50.80, -8.11, 1.00], [-4.59, -56.01, 1.00], [-93.10, 33.85, 1.00], [175.39, -56.03, 1.00], [146.11, -2.57, 1.00], [-86.89, -33.86, 1.00], [-146.10, 2.56, 1.00], [86.91, 33.86, 1.00], [-33.89, -2.57, 1.00], [93.10, -33.85, 1.00], [33.90, 2.58, 1.00], [4.60, 56.03, 1.00], [-175.38, 56.01, 1.00], [106.57, 26.10, 1.00], [27.07, -14.82, 1.00], [-73.44, 26.09, 1.00], [-30.20, 59.41, 1.00], [152.94, 14.83, 1.00], [30.20, -59.40, 1.00], [-152.93, -14.84, 1.00], [149.82, 59.41, 1.00], [-27.06, 14.83, 1.00], [-149.80, -59.42, 1.00], [-106.55, -26.10, 1.00], [73.44, -26.09, 1.00], [-171.42, 77.45, 1.00], [91.90, -12.40, 1.00], [8.54, 77.46, 1.00], [-12.40, -1.85, 1.00], [88.11, 12.41, 1.00], [12.41, 1.86, 1.00], [-88.10, -12.41, 1.00], [167.60, -1.86, 1.00], [-91.89, 12.40, 1.00], [-167.59, 1.84, 1.00], [171.43, -77.46, 1.00], [-8.52, -77.45, 1.00], [-122.73, -10.44, 1.00], [-167.65, -32.13, 1.00], [57.27, -10.43, 1.00], [-108.80, -55.83, 1.00], [-12.35, 32.13, 1.00], [108.83, 55.83, 1.00], [12.36, -32.12, 1.00], [71.19, -55.82, 1.00], [167.66, 32.12, 1.00], [-71.19, 55.82, 1.00], [122.74, 10.44, 1.00], [-57.27, 10.44, 1.00], [-135.84, -23.05, 1.00], [-148.58, -41.32, 1.00], [44.16, -23.04, 1.00], [-120.66, -39.88, 1.00], [-31.41, 41.31, 1.00], [120.68, 39.87, 1.00], [31.42, -41.30, 1.00], [59.33, -39.86, 1.00], [148.60, 41.31, 1.00], [-59.33, 39.87, 1.00], [135.85, 23.05, 1.00], [-44.16, 23.05, 1.00], [-161.55, 20.62, 1.00], [130.04, -62.60, 1.00], [18.45, 20.64, 1.00], [-68.35, -17.23, 1.00], [49.96, 62.61, 1.00], [68.36, 17.23, 1.00], [-49.93, -62.60, 1.00], [111.65, -17.22, 1.00], [-130.05, 62.59, 1.00], [-111.64, 17.22, 1.00], [161.56, -20.63, 1.00], [-18.44, -20.62, 1.00], [-105.23, -3.38, 1.00], [-176.50, -15.21, 1.00], [74.77, -3.37, 1.00], [-102.64, -74.41, 1.00], [-3.50, 15.21, 1.00], [102.69, 74.41, 1.00], [3.51, -15.20, 1.00], [77.33, -74.40, 1.00], [176.51, 15.20, 1.00], [-77.36, 74.40, 1.00], [105.24, 3.38, 1.00], [-74.76, 3.37, 1.00], [-142.39, 25.42, 1.00], [142.08, -45.69, 1.00], [37.61, 25.43, 1.00], [-59.02, -33.44, 1.00], [37.92, 45.69, 1.00], [59.04, 33.45, 1.00], [-37.91, -45.68, 1.00], [120.97, -33.44, 1.00], [-142.07, 45.68, 1.00], [-120.96, 33.44, 1.00], [142.40, -25.43, 1.00], [-37.60, -25.42, 1.00]], [[-30.60, 6.94, 1.00], [166.56, 58.69, 1.00], [149.40, 6.96, 1.00], [81.95, -30.36, 1.00], [13.48, -58.69, 1.00], [-81.93, 30.36, 1.00], [-13.46, 58.68, 1.00], [-98.06, -30.37, 1.00], [-166.54, -58.68, 1.00], [98.07, 30.37, 1.00], [30.62, -6.95, 1.00], [-149.38, -6.95, 1.00], [106.69, -22.68, 1.00], [-23.57, -15.36, 1.00], [-73.31, -22.69, 1.00], [-145.50, 62.10, 1.00], [-156.41, 15.36, 1.00], [145.53, -62.10, 1.00], [156.43, -15.35, 1.00], [34.47, 62.11, 1.00], [23.58, 15.36, 1.00], [-34.46, -62.11, 1.00], [-106.67, 22.68, 1.00], [73.33, 22.69, 1.00], [166.82, 1.39, 1.00], [6.09, -76.74, 1.00], [-13.19, 1.38, 1.00], [-88.57, 13.18, 1.00], [173.99, 76.74, 1.00], [88.59, -13.18, 1.00], [-173.97, -76.73, 1.00], [91.43, 13.20, 1.00], [-6.07, 76.73, 1.00], [-91.42, -13.20, 1.00], [-166.80, -1.38, 1.00], [13.20, -1.39, 1.00], [-74.67, 48.11, 1.00], [130.86, 10.16, 1.00], [105.32, 48.13, 1.00], [13.34, -40.08, 1.00], [49.16, -10.15, 1.00], [-13.32, 40.07, 1.00], [-49.14, 10.15, 1.00], [-166.67, -40.08, 1.00], [-130.84, -10.16, 1.00], [166.69, 40.08, 1.00], [74.70, -48.11, 1.00], [-105.31, -48.13, 1.00], [-126.99, 26.55, 1.00], [147.96, -32.57, 1.00], [53.00, 26.56, 1.00], [-50.28, -45.59, 1.00], [32.05, 32.58, 1.00], [50.30, 45.59, 1.00], [-32.03, -32.58, 1.00], [129.71, -45.58, 1.00], [-147.94, 32.57, 1.00], [-129.69, 45.58, 1.00], [127.02, -26.55, 1.00], [-52.98, -26.56, 1.00], [-171.93, 30.37, 1.00], [103.47, -58.68, 1.00], [8.07, 30.36, 1.00], [-59.38, -6.96, 1.00], [76.54, 58.69, 1.00], [59.40, 6.95, 1.00], [-76.53, -58.69, 1.00], [120.62, -6.94, 1.00], [-103.44, 58.68, 1.00], [-120.60, 6.95, 1.00], [171.94, -30.36, 1.00], [-8.05, -30.37, 1.00], [40.86, 10.16, 1.00], [15.32, 48.12, 1.00], [-139.14, 10.16, 1.00], [76.68, 40.09, 1.00], [164.69, -48.12, 1.00], [-76.67, -40.09, 1.00], [-164.67, 48.12, 1.00], [-103.31, 40.07, 1.00], [-15.30, -48.13, 1.00], [103.34, -40.07, 1.00], [-40.84, -10.16, 1.00], [139.16, -10.15, 1.00], [103.20, -1.38, 1.00], [-1.41, -13.19, 1.00], [-76.80, -1.39, 1.00], [-96.02, 76.73, 1.00], [-178.57, 13.19, 1.00], [96.07, -76.73, 1.00], [178.58, -13.19, 1.00], [83.94, 76.74, 1.00], [1.43, 13.19, 1.00], [-83.95, -76.74, 1.00], [-103.18, 1.38, 1.00], [76.81, 1.39, 1.00], [37.02, -26.56, 1.00], [-39.70, 45.58, 1.00], [-142.99, -26.56, 1.00], [122.05, 32.58, 1.00], [-140.29, -45.59, 1.00], [-122.04, -32.58, 1.00], [140.31, 45.59, 1.00], [-57.95, 32.57, 1.00], [39.72, -45.58, 1.00], [57.97, -32.57, 1.00], [-37.00, 26.55, 1.00], [143.00, 26.56, 1.00], [163.33, 22.69, 1.00], [55.55, -62.10, 1.00], [-16.67, 22.68, 1.00], [-66.41, 15.35, 1.00], [124.49, 62.11, 1.00], [66.43, -15.35, 1.00], [-124.48, -62.11, 1.00], [113.58, 15.36, 1.00], [-55.52, 62.10, 1.00], [-113.57, -15.36, 1.00], [-163.31, -22.68, 1.00], [16.69, -22.69, 1.00]], [[-10.57, -17.35, 1.00], [-120.42, 69.76, 1.00], [169.43, -17.35, 1.00], [107.63, -10.08, 1.00], [-59.57, -69.78, 1.00], [-107.63, 10.08, 1.00], [59.57, 69.78, 1.00], [-72.37, -10.09, 1.00], [120.42, -69.76, 1.00], [72.37, 10.09, 1.00], [10.57, 17.35, 1.00], [-169.43, 17.35, 1.00], [-30.77, 68.25, 1.00], [101.53, 18.57, 1.00], [149.25, 68.26, 1.00], [18.92, -10.92, 1.00], [78.47, -18.56, 1.00], [-18.92, 10.92, 1.00], [-78.47, 18.56, 1.00], [-161.09, -10.92, 1.00], [-101.53, -18.56, 1.00], [161.09, 10.92, 1.00], [30.78, -68.26, 1.00], [-149.26, -68.26, 1.00], [56.46, 41.26, 1.00], [46.46, 24.54, 1.00], [-123.53, 41.26, 1.00], [32.19, 38.80, 1.00], [133.53, -24.53, 1.00], [-32.19, -38.80, 1.00], [-133.53, 24.53, 1.00], [-147.80, 38.80, 1.00], [-46.46, -24.54, 1.00], [147.80, -38.80, 1.00], [-56.46, -41.27, 1.00], [123.53, -41.26, 1.00], [84.74, 27.31, 1.00], [27.41, 4.68, 1.00], [-95.26, 27.30, 1.00], [10.06, 62.23, 1.00], [152.59, -4.67, 1.00], [-10.06, -62.23, 1.00], [-152.59, 4.67, 1.00], [-169.92, 62.23, 1.00], [-27.40, -4.68, 1.00], [169.92, -62.22, 1.00], [-84.74, -27.31, 1.00], [95.26, -27.30, 1.00], [136.27, -0.73, 1.00], [-1.05, -46.27, 1.00], [-43.73, -0.74, 1.00], [-91.01, 43.72, 1.00], [-178.94, 46.27, 1.00], [91.01, -43.72, 1.00], [178.94, -46.27, 1.00], [88.99, 43.73, 1.00], [1.05, 46.27, 1.00], [-88.99, -43.73, 1.00], [-136.27, 0.73, 1.00], [43.73, 0.73, 1.00], [55.23, 10.82, 1.00], [13.09, 34.07, 1.00], [-124.77, 10.81, 1.00], [71.48, 53.80, 1.00], [166.91, -34.06, 1.00], [-71.48, -53.80, 1.00], [-166.90, 34.06, 1.00], [-108.52, 53.79, 1.00], [-13.09, -34.06, 1.00], [108.52, -53.79, 1.00], [-55.23, -10.82, 1.00], [124.77, -10.81, 1.00], [-105.49, -68.13, 1.00], [-111.15, -5.71, 1.00], [74.52, -68.12, 1.00], [-173.89, -21.04, 1.00], [-68.85, 5.70, 1.00], [173.89, 21.04, 1.00], [68.85, -5.70, 1.00], [6.12, -21.04, 1.00], [111.15, 5.71, 1.00], [-6.12, 21.04, 1.00], [105.49, 68.13, 1.00], [-74.52, 68.12, 1.00], [35.28, -15.18, 1.00], [-25.17, 51.98, 1.00], [-144.72, -15.19, 1.00], [108.39, 33.88, 1.00], [-154.84, -51.99, 1.00], [-108.39, -33.88, 1.00], [154.84, 51.99, 1.00], [-71.61, 33.87, 1.00], [25.17, -51.98, 1.00], [71.61, -33.87, 1.00], [-35.28, 15.18, 1.00], [144.72, 15.19, 1.00], [-125.28, -28.56, 1.00], [-146.32, -30.49, 1.00], [54.72, -28.55, 1.00], [-133.29, -45.82, 1.00], [-33.69, 30.48, 1.00], [133.30, 45.82, 1.00], [33.68, -30.48, 1.00], [46.71, -45.81, 1.00], [146.32, 30.49, 1.00], [-46.71, 45.81, 1.00], [125.28, 28.56, 1.00], [-54.72, 28.54, 1.00], [-144.40, 54.71, 1.00], [112.38, -28.01, 1.00], [35.58, 54.72, 1.00], [-29.92, -19.65, 1.00], [67.62, 28.02, 1.00], [29.92, 19.65, 1.00], [-67.62, -28.02, 1.00], [150.08, -19.64, 1.00], [-112.38, 28.01, 1.00], [-150.08, 19.64, 1.00], [144.40, -54.71, 1.00], [-35.58, -54.72, 1.00], [68.53, -52.85, 1.00], [-54.82, 12.76, 1.00], [-111.46, -52.87, 1.00], [164.51, 34.19, 1.00], [-125.18, -12.77, 1.00], [-164.51, -34.19, 1.00], [125.18, 12.77, 1.00], [-15.50, 34.19, 1.00], [54.82, -12.76, 1.00], [15.49, -34.19, 1.00], [-68.53, 52.85, 1.00], [111.47, 52.86, 1.00], [91.48, -7.37, 1.00], [-7.38, -1.47, 1.00], [-88.52, -7.38, 1.00], [-168.69, 82.47, 1.00], [-172.62, 1.47, 1.00], [168.69, -82.47, 1.00], [172.62, -1.46, 1.00], [11.22, 82.48, 1.00], [7.38, 1.47, 1.00], [-11.21, -82.48, 1.00], [-91.48, 7.37, 1.00], [88.52, 7.38, 1.00]], [[-110.97, -81.34, 1.00], [-98.09, -3.09, 1.00], [69.03, -81.34, 1.00], [-176.88, -8.08, 1.00], [-81.91, 3.09, 1.00], [176.88, 8.08, 1.00], [81.91, -3.09, 1.00], [3.12, -8.08, 1.00], [98.09, 3.09, 1.00], [-3.12, 8.08, 1.00], [110.97, 81.34, 1.00], [-69.03, 81.34, 1.00], [145.76, 30.52, 1.00], [46.33, -45.41, 1.00], [-34.24, 30.52, 1.00], [-54.51, 28.99, 1.00], [133.67, 45.41, 1.00], [54.51, -28.99, 1.00], [-133.67, -45.41, 1.00], [125.49, 28.99, 1.00], [-46.33, 45.41, 1.00], [-125.49, -28.99, 1.00], [-145.76, -30.52, 1.00], [34.24, -30.52, 1.00], [159.58, 41.40, 1.00], [68.40, -44.67, 1.00], [-20.42, 41.40, 1.00], [-46.75, 15.18, 1.00], [111.60, 44.67, 1.00], [46.75, -15.18, 1.00], [-111.60, -44.67, 1.00], [133.25, 15.18, 1.00], [-68.40, 44.67, 1.00], [-133.25, -15.18, 1.00], [-159.58, -41.40, 1.00], [20.42, -41.40, 1.00], [85.43, -37.93, 1.00], [-38.02, 3.60, 1.00], [-94.57, -37.93, 1.00], [174.17, 51.83, 1.00], [-141.98, -3.60, 1.00], [-174.17, -51.83, 1.00], [141.98, 3.60, 1.00], [-5.83, 51.83, 1.00], [38.02, -3.60, 1.00], [5.83, -51.83, 1.00], [-85.43, 37.93, 1.00], [94.57, 37.93, 1.00], [21.18, 27.17, 1.00], [54.86, 56.05, 1.00], [-158.82, 27.17, 1.00], [61.17, 18.75, 1.00], [125.14, -56.05, 1.00], [-61.17, -18.75, 1.00], [-125.14, 56.05, 1.00], [-118.83, 18.75, 1.00], [-54.86, -56.05, 1.00], [118.83, -18.75, 1.00], [-21.18, -27.17, 1.00], [158.82, -27.17, 1.00], [104.66, -9.56, 1.00], [-9.88, -14.45, 1.00], [-75.34, -9.56, 1.00], [-123.65, 72.56, 1.00], [-170.12, 14.45, 1.00], [123.65, -72.56, 1.00], [170.12, -14.45, 1.00], [56.35, 72.56, 1.00], [9.88, 14.45, 1.00], [-56.35, -72.56, 1.00], [-104.66, 9.56, 1.00], [75.34, 9.56, 1.00], [25.94, -16.83, 1.00], [-34.66, 59.40, 1.00], [-154.06, -16.83, 1.00], [108.59, 24.75, 1.00], [-145.34, -59.41, 1.00], [-108.59, -24.75, 1.00], [145.34, 59.41, 1.00], [-71.41, 24.75, 1.00], [34.66, -59.41, 1.00], [71.41, -24.75, 1.00], [-25.94, 16.83, 1.00], [154.06, 16.83, 1.00], [-100.89, 26.49, 1.00], [153.10, -9.74, 1.00], [79.11, 26.49, 1.00], [-20.77, -61.51, 1.00], [26.90, 9.74, 1.00], [20.77, 61.51, 1.00], [-26.90, -9.74, 1.00], [159.23, -61.51, 1.00], [-153.10, 9.74, 1.00], [-159.23, 61.51, 1.00], [100.89, -26.49, 1.00], [-79.11, -26.49, 1.00], [44.31, 12.28, 1.00], [17.30, 44.36, 1.00], [-135.69, 12.28, 1.00], [73.08, 43.05, 1.00], [162.70, -44.36, 1.00], [-73.08, -43.05, 1.00], [-162.70, 44.36, 1.00], [-106.92, 43.05, 1.00], [-17.30, -44.36, 1.00], [106.92, -43.05, 1.00], [-44.31, -12.28, 1.00], [135.69, -12.28, 1.00], [-169.08, -24.53, 1.00], [-112.54, -63.29, 1.00], [10.92, -24.53, 1.00], [-114.93, -9.92, 1.00], [-67.46, 63.28, 1.00], [114.93, 9.92, 1.00], [67.46, -63.29, 1.00], [65.07, -9.92, 1.00], [112.54, 63.29, 1.00], [-65.07, 9.92, 1.00], [169.08, 24.53, 1.00], [-10.92, 24.53, 1.00], [93.20, -57.39, 1.00], [-57.43, -1.73, 1.00], [-86.80, -57.39, 1.00], [-177.95, 32.55, 1.00], [-122.57, 1.73, 1.00], [177.95, -32.55, 1.00], [122.57, -1.73, 1.00], [2.05, 32.55, 1.00], [57.43, 1.73, 1.00], [-2.05, -32.55, 1.00], [-93.20, 57.39, 1.00], [86.80, 57.39, 1.00], [-17.59, 3.04, 1.00], [170.04, 72.16, 1.00], [162.41, 3.04, 1.00], [86.81, -17.56, 1.00], [9.96, -72.16, 1.00], [-86.81, 17.56, 1.00], [-9.96, 72.16, 1.00], [-93.19, -17.56, 1.00], [-170.04, -72.16, 1.00], [93.19, 17.56, 1.00], [17.59, -3.04, 1.00], [-162.41, -3.04, 1.00], [39.38, 44.26, 1.00], [56.93, 33.61, 1.00], [-140.62, 44.26, 1.00], [38.42, 27.03, 1.00], [123.07, -33.61, 1.00], [-38.42, -27.03, 1.00], [-123.07, 33.61, 1.00], [-141.58, 27.03, 1.00], [-56.93, -33.61, 1.00], [141.58, -27.03, 1.00], [-39.38, -44.26, 1.00], [140.62, -44.26, 1.00]], [[165.52, 26.52, 1.00], [63.39, -60.04, 1.00], [-14.48, 26.52, 1.00], [-62.74, 12.93, 1.00], [116.61, 60.04, 1.00], [62.74, -12.93, 1.00], [-116.61, -60.04, 1.00], [117.26, 12.93, 1.00], [-63.39, 60.04, 1.00], [-117.26, -12.93, 1.00], [-165.52, -26.52, 1.00], [14.48, -26.52, 1.00], [-150.22, -21.62, 1.00], [-141.41, -53.79, 1.00], [29.78, -21.62, 1.00], [-114.55, -27.50, 1.00], [-38.59, 53.79, 1.00], [114.55, 27.50, 1.00], [38.59, -53.79, 1.00], [65.45, -27.50, 1.00], [141.41, 53.79, 1.00], [-65.45, 27.50, 1.00], [150.22, 21.62, 1.00], [-29.78, 21.62, 1.00], [-163.47, 81.91, 1.00], [92.31, -7.75, 1.00], [16.53, 81.91, 1.00], [-7.76, -2.29, 1.00], [87.69, 7.75, 1.00], [7.76, 2.29, 1.00], [-87.69, -7.75, 1.00], [172.24, -2.29, 1.00], [-92.31, 7.75, 1.00], [-172.24, 2.29, 1.00], [163.47, -81.91, 1.00], [-16.53, -81.91, 1.00], [-79.91, -73.49, 1.00], [-106.27, 2.85, 1.00], [100.09, -73.49, 1.00], [177.03, -16.24, 1.00], [-73.73, -2.85, 1.00], [-177.03, 16.24, 1.00], [73.73, 2.85, 1.00], [-2.97, -16.24, 1.00], [106.27, -2.85, 1.00], [2.97, 16.24, 1.00], [79.91, 73.49, 1.00], [-100.09, 73.49, 1.00], [-43.19, 73.63, 1.00], [101.37, 11.86, 1.00], [136.81, 73.63, 1.00], [12.09, -11.12, 1.00], [78.63, -11.86, 1.00], [-12.09, 11.12, 1.00], [-78.63, 11.86, 1.00], [-167.91, -11.12, 1.00], [-101.37, -11.86, 1.00], [167.91, 11.12, 1.00], [43.19, -73.63, 1.00], [-136.81, -73.63, 1.00], [109.86, -34.83, 1.00], [-36.50, -16.19, 1.00], [-70.14, -34.83, 1.00], [-153.97, 50.53, 1.00], [-143.50, 16.19, 1.00], [153.97, -50.53, 1.00], [143.50, -16.19, 1.00], [26.03, 50.53, 1.00], [36.50, 16.19, 1.00], [-26.03, -50.53, 1.00], [-109.86, 34.83, 1.00], [70.14, 34.83, 1.00], [-23.31, -6.54, 1.00], [-163.84, 65.83, 1.00], [156.69, -6.54, 1.00], [97.12, -23.15, 1.00], [-16.16, -65.83, 1.00], [-97.12, 23.15, 1.00], [16.16, 65.83, 1.00], [-82.88, -23.15, 1.00], [163.84, -65.83, 1.00], [82.88, 23.15, 1.00], [23.31, 6.54, 1.00], [-156.69, 6.54, 1.00], [-0.87, -31.92, 1.00], [-91.40, 58.07, 1.00], [179.13, -31.92, 1.00], [121.93, -0.74, 1.00], [-88.60, -58.07, 1.00], [-121.93, 0.74, 1.00], [88.60, 58.07, 1.00], [-58.07, -0.74, 1.00], [91.40, -58.07, 1.00], [58.07, 0.74, 1.00], [0.87, 31.92, 1.00], [-179.13, 31.92, 1.00], [163.12, 43.35, 1.00], [72.90, -44.10, 1.00], [-16.88, 43.35, 1.00], [-45.39, 12.19, 1.00], [107.10, 44.10, 1.00], [45.39, -12.19, 1.00], [-107.10, -44.10, 1.00], [134.61, 12.19, 1.00], [-72.90, 44.10, 1.00], [-134.61, -12.19, 1.00], [-163.12, -43.35, 1.00], [16.88, -43.35, 1.00], [-114.23, 50.37, 1.00], [127.06, -15.17, 1.00], [65.77, 50.37, 1.00], [-18.77, -35.57, 1.00], [52.94, 15.17, 1.00], [18.77, 35.57, 1.00], [-52.94, -15.17, 1.00], [161.23, -35.57, 1.00], [-127.06, 15.17, 1.00], [-161.23, 35.57, 1.00], [114.23, -50.37, 1.00], [-65.77, -50.37, 1.00], [54.17, 30.16, 1.00], [35.63, 30.41, 1.00], [-125.83, 30.16, 1.00], [45.21, 44.51, 1.00], [144.37, -30.41, 1.00], [-45.21, -44.51, 1.00], [-144.37, 30.41, 1.00], [-134.79, 44.51, 1.00], [-35.63, -30.41, 1.00], [134.79, -44.51, 1.00], [-54.17, -30.16, 1.00], [125.83, -30.16, 1.00], [126.20, 41.73, 1.00], [47.86, -26.15, 1.00], [-53.80, 41.73, 1.00], [-33.51, 37.03, 1.00], [132.14, 26.15, 1.00], [33.51, -37.03, 1.00], [-132.14, -26.15, 1.00], [146.49, 37.03, 1.00], [-47.86, 26.15, 1.00], [-146.49, -37.03, 1.00], [-126.20, -41.73, 1.00], [53.80, -41.73, 1.00], [-161.75, 20.38, 1.00], [130.12, -62.91, 1.00], [18.25, 20.38, 1.00], [-68.63, -17.07, 1.00], [49.88, 62.91, 1.00], [68.63, 17.07, 1.00], [-49.88, -62.91, 1.00], [111.37, -17.07, 1.00], [-130.12, 62.91, 1.00], [-111.37, 17.07, 1.00], [161.75, -20.38, 1.00], [-18.25, -20.38, 1.00], [2.71, 48.49, 1.00], [87.60, 41.45, 1.00], [-177.29, 48.49, 1.00], [41.48, 1.80, 1.00], [92.40, -41.45, 1.00], [-41.48, -1.80, 1.00], [-92.40, 41.45, 1.00], [-138.52, 1.80, 1.00], [-87.60, -41.45, 1.00], [138.52, -1.80, 1.00], [-2.71, -48.49, 1.00], [177.29, -48.49, 1.00], [-98.15, -27.54, 1.00], [-152.22, -7.22, 1.00], [81.85, -27.54, 1.00], [-164.79, -61.37, 1.00], [-27.78, 7.22, 1.00], [164.79, 61.37, 1.00], [27.78, -7.22, 1.00], [15.21, -61.37, 1.00], [152.22, 7.22, 1.00], [-15.21, 61.37, 1.00], [98.15, 27.54, 1.00], [-81.85, 27.54, 1.00]], [[-40.48, 43.36, 1.00], [124.51, 33.58, 1.00], [139.52, 43.36, 1.00], [38.85, -28.17, 1.00], [55.49, -33.58, 1.00], [-38.85, 28.17, 1.00], [-55.49, 33.58, 1.00], [-141.15, -28.17, 1.00], [-124.51, -33.58, 1.00], [141.15, 28.17, 1.00], [40.48, -43.36, 1.00], [-139.52, -43.36, 1.00], [56.01, 17.18, 1.00], [20.46, 32.29, 1.00], [-123.99, 17.18, 1.00], [61.05, 52.38, 1.00], [159.54, -32.29, 1.00], [-61.05, -52.38, 1.00], [-159.54, 32.29, 1.00], [-118.95, 52.38, 1.00], [-20.46, -32.29, 1.00], [118.95, -52.38, 1.00], [-56.01, -17.18, 1.00], [123.99, -17.18, 1.00], [-179.51, -8.95, 1.00], [-93.08, -81.04, 1.00], [0.49, -8.95, 1.00], [-98.95, -0.48, 1.00], [-86.92, 81.04, 1.00], [98.95, 0.48, 1.00], [86.92, -81.04, 1.00], [81.05, -0.48, 1.00], [93.08, 81.04, 1.00], [-81.05, 0.48, 1.00], [179.51, 8.95, 1.00], [-0.49, 8.95, 1.00], [12.04, -13.56, 1.00], [-49.15, 71.95, 1.00], [-167.96, -13.56, 1.00], [103.85, 11.70, 1.00], [-130.85, -71.95, 1.00], [-103.85, -11.70, 1.00], [130.85, 71.95, 1.00], [-76.15, 11.70, 1.00], [49.15, -71.95, 1.00], [76.15, -11.70, 1.00], [-12.04, 13.56, 1.00], [167.96, 13.56, 1.00], [-13.62, -58.20, 1.00], [-98.30, 30.80, 1.00], [166.38, -58.20, 1.00], [148.93, -7.13, 1.00], [-81.70, -30.80, 1.00], [-148.93, 7.13, 1.00], [81.70, 30.80, 1.00], [-31.07, -7.13, 1.00], [98.30, -30.80, 1.00], [31.07, 7.13, 1.00], [13.62, 58.20, 1.00], [-166.38, 58.20, 1.00], [65.26, -20.55, 1.00], [-22.43, 23.07, 1.00], [-114.74, -20.55, 1.00], [131.85, 58.26, 1.00], [-157.57, -23.07, 1.00], [-131.85, -58.26, 1.00], [157.57, 23.07, 1.00], [-48.15, 58.26, 1.00], [22.43, -23.07, 1.00], [48.15, -58.26, 1.00], [-65.26, 20.55, 1.00], [114.74, 20.55, 1.00], [-135.39, 26.50, 1.00], [144.63, -39.58, 1.00], [44.61, 26.50, 1.00], [-55.00, -38.94, 1.00], [35.37, 39.58, 1.00], [55.00, 38.94, 1.00], [-35.37, -39.58, 1.00], [125.00, -38.94, 1.00], [-144.63, 39.58, 1.00], [-125.00, 38.94, 1.00], [135.39, -26.50, 1.00], [-44.61, -26.50, 1.00], [114.95, -4.75, 1.00], [-5.23, -24.86, 1.00], [-65.05, -4.75, 1.00], [-101.14, 64.63, 1.00], [-174.77, 24.86, 1.00], [101.14, -64.63, 1.00], [174.77, -24.86, 1.00], [78.86, 64.63, 1.00], [5.23, 24.86, 1.00], [-78.86, -64.63, 1.00], [-114.95, 4.75, 1.00], [65.05, 4.75, 1.00], [35.85, 52.64, 1.00], [65.91, 29.46, 1.00], [-144.15, 52.64, 1.00], [31.75, 20.82, 1.00], [114.09, -29.46, 1.00], [-31.75, -20.82, 1.00], [-114.09, 29.46, 1.00], [-148.25, 20.82, 1.00], [-65.91, -29.46, 1.00], [148.25, -20.82, 1.00], [-35.85, -52.64, 1.00], [144.15, -52.64, 1.00], [86.45, 11.52, 1.00], [11.54, 3.48, 1.00], [-93.55, 11.52, 1.00], [16.90, 77.95, 1.00], [168.46, -3.48, 1.00], [-16.90, -77.95, 1.00], [-168.46, 3.48, 1.00], [-163.10, 77.95, 1.00], [-11.54, -3.48, 1.00], [163.10, -77.95, 1.00], [-86.45, -11.52, 1.00], [93.55, -11.52, 1.00], [135.24, 4.02, 1.00], [5.69, -45.10, 1.00], [-44.76, 4.02, 1.00], [-84.35, 44.62, 1.00], [174.31, 45.10, 1.00], [84.35, -44.62, 1.00], [-174.31, -45.10, 1.00], [95.65, 44.62, 1.00], [-5.69, 45.10, 1.00], [-95.65, -44.62, 1.00], [-135.24, -4.02, 1.00], [44.76, -4.02, 1.00], [-129.84, -18.16, 1.00], [-156.86, -37.50, 1.00], [50.16, -18.16, 1.00], [-117.12, -46.85, 1.00], [-23.14, 37.50, 1.00], [117.12, 46.85, 1.00], [23.14, -37.50, 1.00], [62.88, -46.85, 1.00], [156.86, 37.50, 1.00], [-62.88, 46.85, 1.00], [129.84, 18.16, 1.00], [-50.16, 18.16, 1.00], [-74.10, 32.87, 1.00], [146.10, 13.30, 1.00], [105.90, 32.87, 1.00], [22.97, -53.88, 1.00], [33.90, -13.30, 1.00], [-22.97, 53.88, 1.00], [-33.90, 13.30, 1.00], [-157.03, -53.88, 1.00], [-146.10, -13.30, 1.00], [157.03, 53.88, 1.00], [74.10, -32.87, 1.00], [-105.90, -32.87, 1.00], [-119.92, -5.64, 1.00], [-173.50, -29.76, 1.00], [60.08, -5.64, 1.00], [-101.20, -59.60, 1.00], [-6.50, 29.76, 1.00], [101.20, 59.60, 1.00], [6.50, -29.76, 1.00], [78.80, -59.60, 1.00], [173.50, 29.76, 1.00], [-78.80, 59.60, 1.00], [119.92, 5.64, 1.00], [-60.08, 5.64, 1.00], [73.14, 16.13, 1.00], [16.82, 16.18, 1.00], [-106.86, 16.13, 1.00], [45.09, 66.83, 1.00], [163.18, -16.18, 1.00], [-45.09, -66.83, 1.00], [-163.18, 16.18, 1.00], [-134.91, 66.83, 1.00], [-16.82, -16.18, 1.00], [134.91, -66.83, 1.00], [-73.14, -16.13, 1.00], [106.86, -16.13, 1.00], [-11.70, -43.38, 1.00], [-102.11, 45.38, 1.00], [168.30, -43.38, 1.00], [133.98, -8.47, 1.00], [-77.89, -45.38, 1.00], [-133.98, 8.47, 1.00], [77.89, 45.38, 1.00], [-46.02, -8.47, 1.00], [102.11, -45.38, 1.00], [46.02, 8.47, 1.00], [11.70, 43.38, 1.00], [-168.30, 43.38, 1.00], [-24.11, 3.73, 1.00], [170.94, 65.63, 1.00], [155.89, 3.73, 1.00], [85.92, -24.05, 1.00], [9.06, -65.63, 1.00], [-85.92, 24.05, 1.00], [-9.06, 65.63, 1.00], [-94.08, -24.05, 1.00], [-170.94, -65.63, 1.00], [94.08, 24.05, 1.00], [24.11, -3.73, 1.00], [-155.89, -3.73, 1.00]], [[104.60, -3.68, 1.00], [-3.81, -14.57, 1.00], [-75.40, -3.68, 1.00], [-104.32, 74.95, 1.00], [-176.19, 14.57, 1.00], [104.32, -74.95, 1.00], [176.19, -14.57, 1.00], [75.68, 74.95, 1.00], [3.81, 14.57, 1.00], [-75.68, -74.95, 1.00], [-104.60, 3.68, 1.00], [75.40, 3.68, 1.00], [153.77, -30.33, 1.00], [-52.93, -50.74, 1.00], [-26.23, -30.33, 1.00], [-123.11, 22.43, 1.00], [-127.07, 50.74, 1.00], [123.11, -22.43, 1.00], [127.07, -50.74, 1.00], [56.89, 22.43, 1.00], [52.93, 50.74, 1.00], [-56.89, -22.43, 1.00], [-153.77, 30.33, 1.00], [26.23, 30.33, 1.00], [35.99, -39.77, 1.00], [-54.77, 38.45, 1.00], [-144.01, -39.77, 1.00], [135.81, 26.85, 1.00], [-125.23, -38.45, 1.00], [-135.81, -26.85, 1.00], [125.23, 38.45, 1.00], [-44.19, 26.85, 1.00], [54.77, -38.45, 1.00], [44.19, -26.85, 1.00], [-35.99, 39.77, 1.00], [144.01, 39.77, 1.00], [71.82, -25.43, 1.00], [-26.58, 16.37, 1.00], [-108.18, -25.43, 1.00], [146.72, 59.10, 1.00], [-153.42, -16.37, 1.00], [-146.72, -59.10, 1.00], [153.42, 16.37, 1.00], [-33.28, 59.10, 1.00], [26.58, -16.37, 1.00], [33.28, -59.10, 1.00], [-71.82, 25.43, 1.00], [108.18, 25.43, 1.00], [-136.55, 26.52, 1.00], [144.03, -40.51, 1.00], [43.45, 26.52, 1.00], [-55.50, -37.97, 1.00], [35.97, 40.51, 1.00], [55.50, 37.97, 1.00], [-35.97, -40.51, 1.00], [124.50, -37.97, 1.00], [-144.03, 40.51, 1.00], [-124.50, 37.97, 1.00], [136.55, -26.52, 1.00], [-43.45, -26.52, 1.00], [-6.52, -1.08, 1.00], [-170.58, 83.40, 1.00], [173.48, -1.08, 1.00], [91.09, -6.52, 1.00], [-9.42, -83.40, 1.00], [-91.09, 6.52, 1.00], [9.42, 83.40, 1.00], [-88.91, -6.52, 1.00], [170.58, -83.40, 1.00], [88.91, 6.52, 1.00], [6.52, 1.08, 1.00], [-173.48, 1.08, 1.00], [-71.13, 40.38, 1.00], [138.05, 14.26, 1.00], [108.87, 40.38, 1.00], [20.82, -46.12, 1.00], [41.95, -14.26, 1.00], [-20.82, 46.12, 1.00], [-41.95, 14.26, 1.00], [-159.18, -46.12, 1.00], [-138.05, -14.26, 1.00], [159.18, 46.12, 1.00], [71.13, -40.38, 1.00], [-108.87, -40.38, 1.00], [-153.97, -27.97, 1.00], [-129.57, -52.52, 1.00], [26.03, -27.97, 1.00], [-120.59, -22.81, 1.00], [-50.43, 52.52, 1.00], [120.59, 22.81, 1.00], [50.43, -52.52, 1.00], [59.41, -22.81, 1.00], [129.57, 52.52, 1.00], [-59.41, 22.81, 1.00], [153.97, 27.97, 1.00], [-26.03, 27.97, 1.00], [-80.23, 13.48, 1.00], [166.33, 9.49, 1.00], [99.77, 13.48, 1.00], [35.29, -73.41, 1.00], [13.67, -9.49, 1.00], [-35.29, 73.41, 1.00], [-13.67, 9.49, 1.00], [-144.71, -73.41, 1.00], [-166.33, -9.49, 1.00], [144.71, 73.41, 1.00], [80.23, -13.48, 1.00], [-99.77, -13.48, 1.00], [55.43, -9.00, 1.00], [-10.89, 34.09, 1.00], [-124.57, -9.00, 1.00], [105.60, 54.41, 1.00], [-169.11, -34.09, 1.00], [-105.60, -54.41, 1.00], [169.11, 34.09, 1.00], [-74.40, 54.41, 1.00], [10.89, -34.09, 1.00], [74.40, -54.41, 1.00], [-55.43, 9.00, 1.00], [124.57, 9.00, 1.00], [68.32, -7.14, 1.00], [-7.68, 21.51, 1.00], [-111.68, -7.14, 1.00], [108.74, 67.22, 1.00], [-172.32, -21.51, 1.00], [-108.74, -67.22, 1.00], [172.32, 21.51, 1.00], [-71.26, 67.22, 1.00], [7.68, -21.51, 1.00], [71.26, -67.22, 1.00], [-68.32, 7.14, 1.00], [111.68, 7.14, 1.00], [-174.97, 36.12, 1.00], [96.85, -53.58, 1.00], [5.03, 36.12, 1.00], [-53.77, -4.06, 1.00], [83.15, 53.58, 1.00], [53.77, 4.06, 1.00], [-83.15, -53.58, 1.00], [126.23, -4.06, 1.00], [-96.85, 53.58, 1.00], [-126.23, 4.06, 1.00], [174.97, -36.12, 1.00], [-5.03, -36.12, 1.00], [-149.91, 16.26, 1.00], [149.81, -56.16, 1.00], [30.09, 16.26, 1.00], [-71.37, -28.77, 1.00], [30.19, 56.16, 1.00], [71.37, 28.77, 1.00], [-30.19, -56.16, 1.00], [108.63, -28.77, 1.00], [-149.81, 56.16, 1.00], [-108.63, 28.77, 1.00], [149.91, -16.26, 1.00], [-30.09, -16.26, 1.00], [2.52, -51.45, 1.00], [-87.99, 38.50, 1.00], [-177.48, -51.45, 1.00], [141.48, 1.57, 1.00], [-92.01, -38.50, 1.00], [-141.48, -1.57, 1.00], [92.01, 38.50, 1.00], [-38.52, 1.57, 1.00], [87.99, -38.50, 1.00], [38.52, -1.57, 1.00], [-2.52, 51.45, 1.00], [177.48, 51.45, 1.00], [161.12, -9.98, 1.00], [-28.54, -68.73, 1.00], [-18.88, -9.98, 1.00], [-100.54, 18.59, 1.00], [-151.46, 68.73, 1.00], [100.54, -18.59, 1.00], [151.46, -68.73, 1.00], [79.46, 18.59, 1.00], [28.54, 68.73, 1.00], [-79.46, -18.59, 1.00], [-161.12, 9.98, 1.00], [18.88, 9.98, 1.00], [12.84, 24.97, 1.00], [64.49, 62.11, 1.00], [-167.16, 24.97, 1.00], [64.47, 11.62, 1.00], [115.51, -62.11, 1.00], [-64.47, -11.62, 1.00], [-115.51, 62.11, 1.00], [-115.53, 11.62, 1.00], [-64.49, -62.11, 1.00], [115.53, -11.62, 1.00], [-12.84, -24.97, 1.00], [167.16, -24.97, 1.00], [74.13, 41.65, 1.00], [42.76, 11.79, 1.00], [-105.87, 41.65, 1.00], [17.09, 45.95, 1.00], [137.24, -11.79, 1.00], [-17.09, -45.95, 1.00], [-137.24, 11.79, 1.00], [-162.91, 45.95, 1.00], [-42.76, -11.79, 1.00], [162.91, -45.95, 1.00], [-74.13, -41.65, 1.00], [105.87, -41.65, 1.00], [154.04, 1.27, 1.00], [2.90, -64.01, 1.00], [-25.96, 1.27, 1.00], [-88.59, 25.96, 1.00], [177.10, 64.01, 1.00], [88.59, -25.96, 1.00], [-177.10, -64.01, 1.00], [91.41, 25.96, 1.00], [-2.90, 64.01, 1.00], [-91.41, -25.96, 1.00], [-154.04, -1.27, 1.00], [25.96, -1.27, 1.00]], [[24.80, -10.46, 1.00], [-23.76, 63.21, 1.00], [-155.20, -10.46, 1.00], [101.50, 24.36, 1.00], [-156.24, -63.21, 1.00], [-101.50, -24.36, 1.00], [156.24, 63.21, 1.00], [-78.50, 24.36, 1.00], [23.76, -63.21, 1.00], [78.50, -24.36, 1.00], [-24.80, 10.46, 1.00], [155.20, 10.46, 1.00], [-134.64, 65.44, 1.00], [108.01, -16.98, 1.00], [45.36, 65.44, 1.00], [-17.80, -17.20, 1.00], [71.99, 16.98, 1.00], [17.80, 17.20, 1.00], [-71.99, -16.98, 1.00], [162.20, -17.20, 1.00], [-108.01, 16.98, 1.00], [-162.20, 17.20, 1.00], [134.64, -65.44, 1.00], [-45.36, -65.44, 1.00], [177.60, 54.85, 1.00], [88.31, -35.12, 1.00], [-2.40, 54.85, 1.00], [-35.13, 1.38, 1.00], [91.69, 35.12, 1.00], [35.13, -1.38, 1.00], [-91.69, -35.12, 1.00], [144.87, 1.38, 1.00], [-88.31, 35.12, 1.00], [-144.87, -1.38, 1.00], [-177.60, -54.85, 1.00], [2.40, -54.85, 1.00], [157.93, 82.01, 1.00], [86.98, -7.40, 1.00], [-22.07, 82.01, 1.00], [-7.41, 2.99, 1.00], [93.02, 7.40, 1.00], [7.41, -2.99, 1.00], [-93.02, -7.40, 1.00], [172.59, 2.99, 1.00], [-86.98, 7.40, 1.00], [-172.59, -2.99, 1.00], [-157.93, -82.01, 1.00], [22.07, -82.01, 1.00], [42.48, -13.21, 1.00], [-19.17, 45.89, 1.00], [-137.52, -13.21, 1.00], [107.66, 41.11, 1.00], [-160.83, -45.89, 1.00], [-107.66, -41.11, 1.00], [160.83, 45.89, 1.00], [-72.34, 41.11, 1.00], [19.17, -45.89, 1.00], [72.34, -41.11, 1.00], [-42.48, 13.21, 1.00], [137.52, 13.21, 1.00], [28.48, 10.90, 1.00], [21.99, 59.68, 1.00], [-151.52, 10.90, 1.00], [77.65, 27.92, 1.00], [158.01, -59.68, 1.00], [-77.65, -27.92, 1.00], [-158.01, 59.68, 1.00], [-102.35, 27.92, 1.00], [-21.99, -59.68, 1.00], [102.35, -27.92, 1.00], [-28.48, -10.90, 1.00], [151.52, -10.90, 1.00], [-33.79, 21.61, 1.00], [144.53, 50.59, 1.00], [146.21, 21.61, 1.00], [64.51, -31.14, 1.00], [35.47, -50.59, 1.00], [-64.51, 31.14, 1.00], [-35.47, 50.59, 1.00], [-115.49, -31.14, 1.00], [-144.53, -50.59, 1.00], [115.49, 31.14, 1.00], [33.79, -21.61, 1.00], [-146.21, -21.61, 1.00], [-175.53, -31.74, 1.00], [-97.19, -57.98, 1.00], [4.47, -31.74, 1.00], [-121.82, -3.80, 1.00], [-82.81, 57.98, 1.00], [121.82, 3.80, 1.00], [82.81, -57.98, 1.00], [58.18, -3.80, 1.00], [97.19, 57.98, 1.00], [-58.18, 3.80, 1.00], [175.53, 31.74, 1.00], [-4.47, 31.74, 1.00], [89.40, 19.43, 1.00], [19.43, 0.56, 1.00], [-90.60, 19.43, 1.00], [1.69, 70.56, 1.00], [160.57, -0.56, 1.00], [-1.69, -70.56, 1.00], [-160.57, 0.56, 1.00], [-178.31, 70.56, 1.00], [-19.43, -0.56, 1.00], [178.31, -70.56, 1.00], [-89.40, -19.43, 1.00], [90.60, -19.43, 1.00], [-27.28, -27.88, 1.00], [-130.91, 51.78, 1.00], [152.72, -27.88, 1.00], [120.76, -23.90, 1.00], [-49.09, -51.78, 1.00], [-120.76, 23.90, 1.00], [49.09, 51.78, 1.00], [-59.24, -23.90, 1.00], [130.91, -51.78, 1.00], [59.24, 23.90, 1.00], [27.28, 27.88, 1.00], [-152.72, 27.88, 1.00], [139.90, -15.44, 1.00], [-23.21, -47.50, 1.00], [-40.10, -15.44, 1.00], [-109.85, 38.38, 1.00], [-156.79, 47.50, 1.00], [109.85, -38.38, 1.00], [156.79, -47.50, 1.00], [70.15, 38.38, 1.00], [23.21, 47.50, 1.00], [-70.15, -38.38, 1.00], [-139.90, 15.44, 1.00], [40.10, 15.44, 1.00], [-2.17, -43.33, 1.00], [-92.29, 46.62, 1.00], [177.83, -43.33, 1.00], [133.35, -1.58, 1.00], [-87.71, -46.62, 1.00], [-133.35, 1.58, 1.00], [87.71, 46.62, 1.00], [-46.65, -1.58, 1.00], [92.29, -46.62, 1.00], [46.65, 1.58, 1.00], [2.17, 43.33, 1.00], [-177.83, 43.33, 1.00], [41.12, 27.96, 1.00], [38.91, 41.71, 1.00], [-138.88, 27.96, 1.00], [54.83, 35.51, 1.00], [141.09, -41.71, 1.00], [-54.83, -35.51, 1.00], [-141.09, 41.71, 1.00], [-125.17, 35.51, 1.00], [-38.91, -41.71, 1.00], [125.17, -35.51, 1.00], [-41.12, -27.96, 1.00], [138.88, -27.96, 1.00], [-126.67, 13.75, 1.00], [163.04, -35.46, 1.00], [53.33, 13.75, 1.00], [-67.73, -51.18, 1.00], [16.96, 35.46, 1.00], [67.73, 51.18, 1.00], [-16.96, -35.46, 1.00], [112.27, -51.18, 1.00], [-163.04, 35.46, 1.00], [-112.27, 51.18, 1.00], [126.67, -13.75, 1.00], [-53.33, -13.75, 1.00], [6.02, -15.42, 1.00], [-69.18, 73.47, 1.00], [-173.98, -15.42, 1.00], [105.51, 5.80, 1.00], [-110.82, -73.47, 1.00], [-105.51, -5.80, 1.00], [110.82, 73.47, 1.00], [-74.49, 5.80, 1.00], [69.18, -73.47, 1.00], [74.49, -5.80, 1.00], [-6.02, 15.42, 1.00], [173.98, 15.42, 1.00], [160.08, 33.45, 1.00], [62.71, -51.67, 1.00], [-19.92, 33.45, 1.00], [-54.90, 16.52, 1.00], [117.29, 51.67, 1.00], [54.90, -16.52, 1.00], [-117.29, -51.67, 1.00], [125.10, 16.52, 1.00], [-62.71, 51.67, 1.00], [-125.10, -16.52, 1.00], [-160.08, -33.45, 1.00], [19.92, -33.45, 1.00], [80.34, 6.51, 1.00], [6.61, 9.59, 1.00], [-99.66, 6.51, 1.00], [55.76, 78.37, 1.00], [173.39, -9.59, 1.00], [-55.76, -78.37, 1.00], [-173.39, 9.59, 1.00], [-124.24, 78.37, 1.00], [-6.61, -9.59, 1.00], [124.24, -78.37, 1.00], [-80.34, -6.51, 1.00], [99.66, -6.51, 1.00], [6.25, 24.64, 1.00], [76.64, 64.63, 1.00], [-173.75, 24.64, 1.00], [65.23, 5.68, 1.00], [103.36, -64.63, 1.00], [-65.23, -5.68, 1.00], [-103.36, 64.63, 1.00], [-114.77, 5.68, 1.00], [-76.64, -64.63, 1.00], [114.77, -5.68, 1.00], [-6.25, -24.64, 1.00], [173.75, -24.64, 1.00], [51.41, -63.45, 1.00], [-68.67, 16.19, 1.00], [-128.59, -63.45, 1.00], [162.69, 20.45, 1.00], [-111.33, -16.19, 1.00], [-162.69, -20.45, 1.00], [111.33, 16.19, 1.00], [-17.31, 20.45, 1.00], [68.67, -16.19, 1.00], [17.31, -20.45, 1.00], [-51.41, 63.45, 1.00], [128.59, 63.45, 1.00], [-50.60, 28.85, 1.00], [144.51, 33.77, 1.00], [129.40, 28.85, 1.00], [49.04, -42.60, 1.00], [35.49, -33.77, 1.00], [-49.04, 42.60, 1.00], [-35.49, 33.77, 1.00], [-130.96, -42.60, 1.00], [-144.51, -33.77, 1.00], [130.96, 42.60, 1.00], [50.60, -28.85, 1.00], [-129.40, -28.85, 1.00]]];
var dirs = speakerPos[degree - 1];
var orient = require('robust-orientation')
function linearlyIndependent(points, d) {
var nhull = new Array(d+1)
var x = new Array(d)
var o = orient.apply(void 0, nhull)
function affineHull(points) {
var n = points.length
var d = points[0].length
var frame = [ points[0] ]
var index = [ 0 ]
var _defineProperty = require("../core-js/object/define-property");
var _defineProperty2 = _interopRequireDefault(_defineProperty);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function defineProperties(target, props) {
var descriptor = props[i];
var INT_BITS = 32;
var mask = v >> (INT_BITS-1);
var r, shift;
function countTrailingZeros(v) {
var c = 32;
var REVERSE_TABLE = new Array(256);
var v = i, r = i, s = 7;
var t = v | (v - 1);
var convexHull1d = require('./lib/ch1d')
var convexHull2d = require('./lib/ch2d')
var convexHullnd = require('./lib/chnd')
function convexHull(points) {
var n = points.length
var d = points[0].length
function convexHull1d(points) {
var lo = 0
var hi = 0
var monotoneHull = require('monotone-convex-hull-2d')
function convexHull2D(points) {
var hull = monotoneHull(points)
var h = hull.length
var edges = new Array(h)
var a = hull[h-1]
var b = hull[i]
var ich = require('incremental-convex-hull')
var aff = require('affine-hull')
function permute(points, front) {
var n = points.length
var npoints = new Array(n)
var ptr = front.length
function invPermute(cells, front) {
var nc = cells.length
var nf = front.length
var c = cells[i]
var x = c[j]
function convexHullnD(points, d) {
var ah = aff(points)
var npoints = permute(points, ah)
var nhull   = ich(npoints, true)
var isObject = require('./_is-object');
var core = module.exports = { version: '2.6.10' };
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var document = require('./_global').document;
var is = isObject(document) && isObject(document.createElement);
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';
var IS_FORCED = type & $export.F;
var IS_GLOBAL = type & $export.G;
var IS_STATIC = type & $export.S;
var IS_PROTO = type & $export.P;
var IS_BIND = type & $export.B;
var IS_WRAP = type & $export.W;
var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
var expProto = exports[PROTOTYPE];
var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
var key, own, out;
var F = function (a, b, c) {
var global = module.exports = typeof window != 'undefined' && window.Math == Math
var hasOwnProperty = {}.hasOwnProperty;
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;
var isObject = require('./_is-object');
var fn, val;
var _createClass = require("babel-runtime/helpers/create-class")["default"];
var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];
var FractionalDelay = (function () {
function FractionalDelay(sampleRate, optMaxDelayTime) {
var samplesDelay = delayTime * this.sampleRate;
var outputBuffer = new Float32Array(inputBuffer.length);
var pos = this.intDelay - this.posWrite;
var outputBuffer = new Float32Array(inputBuffer.length);
var x, y;
var xi1 = this.fracXi1;
var yi1 = this.fracYi1;
var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];
function defineProperties(target, props) {
var descriptor = props[i];
var uint8 = new Uint8Array(2048);
var orient = require("robust-orientation")
var compareCell = require("simplicial-complex").compareCells
function compareInt(a, b) {
function Simplex(vertices, adjacent, boundary) {
var t = this.vertices[0]
var u = this.adjacent[0]
function GlueFacet(vertices, cell, index) {
function compareGlue(a, b) {
function bakeOrient(d) {
var code = ["function orient(){var tuple=this.tuple;return test("]
var proc = new Function("test", code.join(""))
var test = orient[d+1]
var BAKED = []
function Triangulation(dimension, vertices, simplices) {
var o = BAKED[dimension]
var proto = Triangulation.prototype
var d = this.dimension
var n = this.vertices.length - 1
var tuple = this.tuple
var verts = this.vertices
var toVisit = [ cell ]
var cellVerts = cell.vertices
var cellAdj = cell.adjacent
var neighbor = cellAdj[i]
var nv = neighbor.vertices
var vv = nv[j]
var o = this.orient()
var n = this.vertices.length - 1
var d = this.dimension
var verts = this.vertices
var tuple = this.tuple
var initIndex = random ? (this.interior.length * Math.random())|0 : (this.interior.length-1)
var cell = this.interior[ initIndex ]
var cellVerts = cell.vertices
var cellAdj = cell.adjacent
var neighbor = cellAdj[i]
var prev = tuple[i]
var o = this.orient()
var n = this.vertices.length - 1
var d = this.dimension
var verts = this.vertices
var tuple = this.tuple
var interior = this.interior
var simplices = this.simplices
var tovisit = [ cell ]
var glueFacets = []
var cell = tovisit.pop()
var cellVerts = cell.vertices
var cellAdj = cell.adjacent
var indexOfN = cellVerts.indexOf(n)
var neighbor = cellAdj[i]
var nv = neighbor.vertices
var indexOfNeg1 = 0
var o = this.orient()
var na = neighbor.adjacent
var vverts = cellVerts.slice()
var vadj = cellAdj.slice()
var ncell = new Simplex(vverts, vadj, true)
var opposite = na.indexOf(cell)
var uu = vverts[j]
var nface = new Array(d-1)
var nptr = 0
var vv = vverts[k]
var a = glueFacets[i]
var b = glueFacets[i+1]
var ai = a.index
var bi = b.index
var verts = this.vertices
var cell = this.walk(point, random)
var d = this.dimension
var tuple = this.tuple
var vv = cell.vertices[i]
var o = this.orient(tuple)
var d = this.dimension
var boundary = []
var cells = this.simplices
var nc = cells.length
var c = cells[i]
var bcell = new Array(d)
var cv = c.vertices
var ptr = 0
var parity = 0
var t = bcell[0]
function incrementalConvexHull(points, randomSearch) {
var n = points.length
var d = points[0].length
var initialSimplex = points.slice(0, d+1)
var o = orient.apply(void 0, initialSimplex)
var initialCoords = new Array(d+1)
var initialCell = new Simplex(initialCoords, new Array(d+1), false)
var boundary = initialCell.adjacent
var list = new Array(d+2)
var verts = initialCoords.slice()
var t = verts[0]
var cell = new Simplex(verts, new Array(d+1), true)
var verts = boundary[i].vertices
var adj = boundary[i].adjacent
var v = verts[j]
var triangles = new Triangulation(d, initialSimplex, list)
var useRandom = !!randomSearch
function Node(obj, dimension, parent) {
function KdTree(points, metric, dimensions) {
var self = this;
function buildTree(points, depth, parent) {
var dim = depth % dimensions.length,
function innerSearch(node, parent) {
var dimension = dimensions[node.dimension];
var insertPosition = innerSearch(this.root, null),
var node;
function nodeSearch(node) {
var dimension = dimensions[node.dimension];
function removeNode(node) {
var nextNode,
function findMax(node, dim) {
var dimension,
function findMin(node, dim) {
var dimension,
var i,
function nearestSearch(node) {
var bestChild,
function saveNode(node, distance) {
function height(node) {
function count(node) {
function BinaryHeap(scoreFunction){
var result = this.content[0];
var end = this.content.pop();
var len = this.content.length;
var end = this.content.pop();
var element = this.content[n];
var parentN = Math.floor((n + 1) / 2) - 1,
var length = this.content.length,
var child2N = (n + 1) * 2, child1N = child2N - 1;
var swap = null;
var child1 = this.content[child1N],
var child2 = this.content[child2N],
var orient = require('robust-orientation')[3]
function monotoneConvexHull2D(points) {
var n = points.length
var result = new Array(n)
var sorted = new Array(n)
var d = points[a][0]-points[b][0]
var lower = [sorted[0], sorted[1]]
var upper = [sorted[0], sorted[1]]
var idx = sorted[i]
var p   = points[idx]
var m = lower.length
var result = new Array(upper.length + lower.length - 2)
var ptr    = 0
var numeric = (typeof exports === "undefined")?(function numeric() {}):(exports);
var t1,t2,n,i;
var n = this.length,k;
function fmtnum(x) {
var scale = Math.floor(Math.log(x) / Math.log(10));
var normalized = x / Math.pow(10,scale);
var basic = normalized.toPrecision(numeric.precision);
var ret = [];
function foo(x) {
var k;
var a = fmtnum(x);
var b = x.toPrecision(numeric.precision);
var c = parseFloat(x.toString()).toString();
var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
var flag = false;
var flag = false;
var flag = false;
function foo(d) {
var ret = [],k;
function foo(d) {
var ret = [],k;
var foo = t.split('\n');
var j,k;
var ret = [];
var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
var stripper = function(n) { return n.substr(0,n.length-1); }
var count = 0;
var bar = (foo[k]+",").match(pat),baz;
var s = numeric.dim(A);
var i,j,m,n,row,ret;
var client = new XMLHttpRequest();
function base64(A) {
var n = A.length, i,x,y,z,p,q,r,s;
var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var ret = "";
function crc32Array (a,from,to) {
var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
var crc = -1, y = 0, n = a.length,i;
var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
var stream = [
var ret = [];
var y,z;
var i,n;
var n = s[k], ret = Array(n), i;
var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
var n = A.length, i;
var gc = numeric._getCol, p = y.length, v = Array(p);
var m = x.length, n = y[0].length, A = new Array(m), xj;
var VV = numeric.dotVV;
var i,j,k,z;
var p = x.length, q = y.length,i;
var ret = Array(p), dotVV = numeric.dotVV;
var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
var i,n=x.length,i1,ret = x[n-1]*y[n-1];
var d = numeric.dim;
var i,i1,j,n = d.length, A = Array(n), Ai;
var n = Math.min(A.length,A[0].length),i,ret = Array(n);
var fun = [];
var k;
var avec = /\[i\]$/,p,thevec = '';
var haveret = false;
var fun = [];
var k;
var avec = /\[i\]$/,p,thevec = '';
var haveret = false;
var i,n=s[k];
var i,n=s[k],ret = Array(n);
var i,n=s[k];
var i,n=s[k], ret = Array(n);
var i,o;
var code, codeeq, setup = '';
var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
var A = numeric.clone(x), Ai, Aj;
var I = numeric.identity(m), Ii, Ij;
var i,j,k,x;
var i0 = -1;
var v0 = -1;
var s = numeric.dim(x);
var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
var i,n=s[k],ret=Array(n), rnd;
var i,ret = Array(n);
var s = numeric.dim(x);
function foo(x,k) {
var i,a = from[k], n = to[k]-a, ret = Array(n);
var s = numeric.dim(x);
function foo(x,y,k) {
var i,a = from[k], n = to[k]-a;
var m = I.length, n = J.length;
var i,j;
var B = Array(m), Bi, AI;
var s = numeric.dim(X);
var m=s[0],n=s[1],M,N,i,j,Xij;
var Z = Array(M);
var I=0,J,ZI,k,l,Xijk;
var s1 = numeric.dim(x), s2 = numeric.dim(y);
var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
var io = numeric.indexOf;
var k;
var mul = numeric.mul, div = numeric.div;
var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
var div = numeric.div;
var t = numeric.transpose, x = this.x, y = this.y;
var t = numeric.transpose, x = this.x, y = this.y;
var A = this;
var n = A.x.length, i, j, k;
var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
var i,j,k,d,d1,ax,ay,bx,by,temp;
var x = this.x, y = this.y, k = 0, ik, n = i.length;
var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
var n = i1-i0+1, j;
var rx = Array(n), ry, x = this.x, y = this.y;
var j;
var rx = this.x, ry = this.y, x = A.x, y = A.y;
var x = this.x, y = this.y;
var rx = this.x, ry = this.y, x = v.x, y = v.y;
var x = this.x, y = this.y, b = numeric.getBlock;
var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
var T = numeric.T;
var x = v.x, y = v.y, r = numeric.rep;
var x = d.x, y = d.y, diag = numeric.diag;
var n = numeric;
var x = this.x, y = this.y;
var v = numeric.clone(x);
var s = x[0] >= 0 ? 1 : -1;
var alpha = s*numeric.norm2(x);
var foo = numeric.norm2(v);
var s = numeric.dim(me);
var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
var H0 = numeric.clone(H);
var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
var epsilon = numeric.epsilon;
var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
var s1,s2;
var J;
var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
var QH = numeric.toUpperHessenberg(A);
var QB = numeric.QRFrancis(QH.H,maxiter);
var T = numeric.T;
var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
var m = B.length,j;
var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
var sqrt = Math.sqrt;
var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
var Rk = R.get([k,k]), Rj = R.get([j,j]);
var m = A.length,n,foo, i,j, counts = [];
var n = counts.length;
var Ai = Array(n+1);
var Aj = Array(Ai[n]), Av = Array(Ai[n]);
var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
var B = numeric.rep([m,n],0);
var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
function dfs(j) {
var k;
var i,j,j0,j1,k,l,l0,l1,a;
var m = 0,foo,n=xj.length;
var k = this.k, k1 = this.k1, j = this.j,km,k11;
var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
var Bi = B[0], Bj = B[1], Bv = B[2];
var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
var m = A[0].length-1;
var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
var x = numeric.rep([m],0), xj = numeric.rep([m],0);
var i,j,k,j0,j1,a,e,c,d,K;
var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
var dfs = new numeric.ccsDFS(m);
var m = 0,foo,n=xj.length;
var k = this.k, k1 = this.k1, j = this.j,km,k11;
var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
var Bi = B[0], Bj = B[1], Bv = B[2];
var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
var m = A[0].length-1;
var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
var y = numeric.rep([m],0), xj = numeric.rep([m],0);
var i,j,k,j0,j1,a,e,c,d,K;
var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
var dfs = new numeric.ccsDFS0(m);
var s = numeric.ccsDim(A),m=s[0],n=s[1];
var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
var Ai = A[0], Aj = A[1], Av = A[2];
var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
var q0 = Ai[jq];
var q1 = Ai[jq+1];
var Ai = A[0], Aj = A[1], Av = A[2];
var Bi = B[0], Bj = B[1], Bv = B[2];
var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
var m = sA[0], n = sA[1], o = sB[1];
var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
var i,j,k,j0,j1,i0,i1,l,p,a,b;
var L = LUP.L, U = LUP.U, P = LUP.P;
var Bi = B[0];
var flag = false;
var Bj = B[1], Bv = B[2];
var n = L[0].length-1, m = Bi.length-1;
var x = numeric.rep([n],0), xj = Array(n);
var b = numeric.rep([n],0), bj = Array(n);
var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
var sol = numeric.ccsTSolve;
var i,j,j0,j1,k,J,N=0;
var k,A,B,C;
var Ai = A[0], Aj = A[1], Av = A[2];
var n = numeric.sup(Aj)+1,m=Ai.length;
var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
var counts = numeric.rep([n],0),i;
var ptr = Ri.slice(0),k,Aii;
var Ai = A[0], Aj = A[1], Av = A[2];
var n = Ai.length-1,m = Aj.length;
var Ri = Array(m), Rj = Array(m), Rv = Array(m);
var i,j,j0,j1,p;
var i;
var i,ret = Array(A.length);
var n = d.length,i,ret = Array(n),i1,i2,i3;
var ret = [], n = A.length, i,j,Ai;
var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
var i,j,k,accum;
var ret = Array(p),reti;
var p = A.length, Ai, i,j;
var ret = Array(p), accum;
var i,j,Ai,alpha;
var ret = [], accum;
var i,ret=0;
var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
var k = m*1000+n;
var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
var n,i,Ai;
var I = A[0], J = A[1], V = A[2];
var p = I.length, m=0, i,j,k,a,b,c;
var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
var Ui, Uj,alpha;
var countL = 0, countU = 0;
var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
var p,q,foo;
var L = lu.L, U = lu.U, ret = numeric.clone(b);
var Li = L[0], Lj = L[1], Lv = L[2];
var Ui = U[0], Uj = U[1], Uv = U[2];
var p = Ui.length, q = Li.length;
var m = ret.length,i,j,k;
var ret = numeric.rep(n,-1);
var i,j,count;
var dir = [[-1,0],[0,-1],[0,1],[1,0]];
var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
var Li = [], Lj = [], Lv = [];
var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
var x = this.x;
var yl = this.yl;
var yr = this.yr;
var kl = this.kl;
var kr = this.kr;
var x1,a,b,t;
var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
var s = t*(1-t);
var x = this.x;
var n = x.length;
var p,q,mid,floor = Math.floor,a,b,t;
var n = x0.length, i, ret = Array(n);
var x = this.x;
var yl = this.yl;
var yr = this.yr;
var kl = this.kl;
var kr = this.kr;
var n = yl.length;
var i,dx,dy;
var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
function sqr(x) { return x*x; }
function heval(y0,y1,k0,k1,x) {
var A = k0*2-(y1-y0);
var B = -k1*2+(y1-y0);
var t = (x+1)*0.5;
var s = t*(1-t);
var ret = [];
var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
var m = yl.length,n=x.length-1,i,j,k,y,s,t;
var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
var sqrt = Math.sqrt;
var side = 0;
var n = x.length, b = [], dx = [], dy = [];
var i;
var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
var T = [[],[],[]];
var k = Array(b.length);
var n = x.length;
var cos = Math.cos, sin = Math.sin, i,j;
var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
var n = x.length;
var cos = Math.cos, sin = Math.sin, i,j;
var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
var i,n = ax.length,axi,bxi,ayi,byi;
var x = this.x, y = this.y;
var n = x.length, log = Math.log, log2 = log(2),
var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
var x = this.x, y = this.y;
var n = x.length, log = Math.log, log2 = log(2),
var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
var n = x.length;
var f0 = f(x);
var max = Math.max;
var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
var t0,t1,t2,it=0,d1,d2,N;
var h = max(1e-6*f0,1e-8);
var grad = numeric.gradient;
var n = x0.length;
var f0 = f(x0),f1,df0;
var max = Math.max, norm2 = numeric.norm2;
var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
var msg = "";
function sqr(x) { return x*x; }
var sol = this;
var xs = sol.x;
var ys = sol.y;
var k1 = sol.f;
var ymid = sol.ymid;
var n = xs.length;
var x0,x1,xh,y0,y1,yh,xi;
var floor = Math.floor,h;
var c = 0.5;
var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
var i,j,k,floor = Math.floor;
var n = x.length, ret = Array(n);
var x0 = this.x;
var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
var A2 = 1/5;
var A3 = [3/40,9/40];
var A4 = [44/45,-56/15,32/9];
var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
var bm = [0.5*6025192743/30085553152,
var c = [1/5,3/10,4/5,8/9,1,1];
var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
var i = 0,er,j;
var h = (x1-x0)/10;
var it = 0;
var add = numeric.add, mul = numeric.mul, y1,erinf;
var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
var e0, e1, ev;
var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
var yi,xl = x0,xr = x0+0.5*h,xi;
var xc, yc, en,ei;
var side=0, sl = 1.0, sr = 1.0;
var abs = Math.abs;
var i, j, k, absAjk, Akk, Ak, Pk, Ai;
var max;
var n = A.length, n1 = n-1;
var P = new Array(n);
var i, j;
var LU = LUP.LU;
var n   = LU.length;
var x = numeric.clone(b);
var P   = LUP.P;
var Pi, LUi, LUii, tmp;
var s = numeric.dim(A), m = s[0], n = s[1];
var I = numeric.identity(m);
var P = Array(m);
var i,j,k,l,Ai,Ii,Z,a;
var abs = Math.abs;
var diveq = numeric.diveq;
var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
var m = c.length, n = b.length,y;
var unbounded = false, cb,i0=0;
var alpha = 1.0;
var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
var muleq = numeric.muleq;
var norm = numeric.norminf, any = numeric.any,min = Math.min;
var all = numeric.all, gt = numeric.gt;
var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
var solve = numeric.solve, z = sub(b,dot(A,x)),count;
var dotcc = dot(c,c);
var g;
var i,j,d;
var A1 = transpose(A0);
var a1 = 100*sqrt(dotcc/dot(p,p));
var t0 = div(z,dot(A,d));
var t = 1.0;
var s = dot(c,g), Ag = dot(A,g);
var m = c.length, n = b.length,y;
var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
var c0 = numeric.rep([m],0).concat([1]);
var J = numeric.rep([n,1],-1);
var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
var b0 = b;
var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
var x = numeric.clone(x0.solution);
var foo = numeric.inf(sub(b,dot(A,x)));
var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
var m = Aeq.length, n = Aeq[0].length, o = A.length;
var B = numeric.echelonize(Aeq);
var flags = numeric.rep([n],0);
var P = B.P;
var Q = [];
var i;
var g = numeric.getRange;
var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
var A3 = dot(A1,B.I);
var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
var c1 = Array(P.length), c2 = Array(Q.length);
var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
var S = numeric._solveLP(c4,A4,b4,tol,maxit);
var x2 = S.solution;
var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
var x = Array(c.length);
var state = 0;
var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
var n = MPS.length;
var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
var name;
var c = [], A = [], b = [];
function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
var w0 = z.match(/\S*/g);
var w = [];
var p = vars[w[0]];
var q = rows[w[j]];
var key = [];
var arc4;
var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
var d = startdenom;                 //   and denominator d = 2 ^ 48.
var x = 0;                          //   and no 'extra last byte'.
function ARC4(key) {
var t, u, me = this, keylen = key.length;
var i = 0, j = me.i = me.j = me.m = 0;
var s = me.S;
var i = lowbits(me.i + 1); var t = s[i];
var j = lowbits(me.j + t); var u = s[j];
var r = s[lowbits(t + u)];
function flatten(obj, depth, result, prop, typ) {
function mixkey(seed, key, smear, j) {
function lowbits(n) { return n & (width - 1); }
function base0to1(A) {
var ret = [], i,n=A.length;
function base1to0(A) {
var ret = [], i,n=A.length;
function dpori(a, lda, n) {
var i, j, k, kp1, t;
function dposl(a, lda, n, b) {
var i, k, kb, t;
function dpofa(a, lda, n, info) {
var i, j, jm1, k, t, s;
function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
function fn_goto_50() {
function fn_goto_55() {
function fn_goto_797() {
function fn_goto_798() {
function fn_goto_799() {
function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
var i, n, q,
var temp;
var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
var tolerance= 1.e-64/prec;
var itmax= 50;
var c=0;
var i=0;
var j=0;
var k=0;
var l=0;
var u= numeric.clone(A);
var m= u.length;
var n= u[0].length;
var e = new Array(n);
var q = new Array(n);
var v = numeric.rep([n,n],0);
function pythag(a,b)
var f= 0.0;
var g= 0.0;
var h= 0.0;
var x= 0.0;
var y= 0.0;
var z= 0.0;
var s= 0.0;
var test_convergence = false
var l1= l-1
var twoProduct = require("two-product")
var robustSum = require("robust-sum")
var robustScale = require("robust-scale")
var robustSubtract = require("robust-subtract")
var NUM_EXPAND = 5
var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
var ERRBOUND4   = (7.0 + 56.0 * EPSILON) * EPSILON
function cofactor(m, c) {
var result = new Array(m.length-1)
var r = result[i-1] = new Array(m.length-1)
function matrix(n) {
var result = new Array(n)
function sign(n) {
function generateSum(expr) {
var m = expr.length>>1
function determinant(m) {
var expr = []
function orientation(n) {
var pos = []
var neg = []
var m = matrix(n)
var args = []
var posExpr = generateSum(pos)
var negExpr = generateSum(neg)
var funcName = "orientation" + n + "Exact"
var code = ["function ", funcName, "(", args.join(), "){var p=", posExpr, ",n=", negExpr, ",d=sub(p,n);\
var proc = new Function("sum", "prod", "scale", "sub", code)
var orientation3Exact = orientation(3)
var orientation4Exact = orientation(4)
var CACHED = [
function orientation0() { return 0 },
function orientation1() { return 0 },
function orientation2(a, b) {
function orientation3(a, b, c) {
var l = (a[1] - c[1]) * (b[0] - c[0])
var r = (a[0] - c[0]) * (b[1] - c[1])
var det = l - r
var s
var tol = ERRBOUND3 * s
function orientation4(a,b,c,d) {
var adx = a[0] - d[0]
var bdx = b[0] - d[0]
var cdx = c[0] - d[0]
var ady = a[1] - d[1]
var bdy = b[1] - d[1]
var cdy = c[1] - d[1]
var adz = a[2] - d[2]
var bdz = b[2] - d[2]
var cdz = c[2] - d[2]
var bdxcdy = bdx * cdy
var cdxbdy = cdx * bdy
var cdxady = cdx * ady
var adxcdy = adx * cdy
var adxbdy = adx * bdy
var bdxady = bdx * ady
var det = adz * (bdxcdy - cdxbdy)
var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz)
var tol = ERRBOUND4 * permanent
function slowOrient(args) {
var proc = CACHED[args.length]
function generateOrientationProc() {
var args = []
var procArgs = ["slow"]
var code = [
var proc = Function.apply(undefined, procArgs)
var twoProduct = require("two-product")
var twoSum = require("two-sum")
function scaleLinearExpansion(e, scale) {
var n = e.length
var ts = twoProduct(e[0], scale)
var g = new Array(2 * n)
var q = [0.1, 0.1]
var t = [0.1, 0.1]
var count = 0
var pq = q[1]
var a = t[1]
var b = q[1]
var x = a + b
var bv = x - a
var y = b - bv
function scalarScalar(a, b) {
var x = a + b
var bv = x - a
var av = x - bv
var br = b - bv
var ar = a - av
var y = ar + br
function robustSubtract(e, f) {
var ne = e.length|0
var nf = f.length|0
var n = ne + nf
var g = new Array(n)
var count = 0
var eptr = 0
var fptr = 0
var abs = Math.abs
var ei = e[eptr]
var ea = abs(ei)
var fi = -f[fptr]
var fa = abs(fi)
var a, b
var x = a + b
var bv = x - a
var y = b - bv
var q0 = y
var q1 = x
var _x, _bv, _av, _br, _ar
function scalarScalar(a, b) {
var x = a + b
var bv = x - a
var av = x - bv
var br = b - bv
var ar = a - av
var y = ar + br
function linearExpansionSum(e, f) {
var ne = e.length|0
var nf = f.length|0
var n = ne + nf
var g = new Array(n)
var count = 0
var eptr = 0
var fptr = 0
var abs = Math.abs
var ei = e[eptr]
var ea = abs(ei)
var fi = f[fptr]
var fa = abs(fi)
var a, b
var x = a + b
var bv = x - a
var y = b - bv
var q0 = y
var q1 = x
var _x, _bv, _av, _br, _ar
var _fractionalDelay = require('fractional-delay');
var _fractionalDelay2 = _interopRequireDefault(_fractionalDelay);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function resampleFloat32Array() {
var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
var promise = new Promise(function (resolve, reject) {
var inputSamples = options.inputSamples;
var inputSampleRate = options.inputSampleRate;
var inputDelay = typeof options.inputDelay !== 'undefined' ? options.inputDelay : 0;
var outputSampleRate = typeof options.outputSampleRate !== 'undefined' ? options.outputSampleRate : inputSampleRate;
var outputSamplesNb = Math.ceil(inputSamples.length * outputSampleRate / inputSampleRate);
var context = new window.OfflineAudioContext(1, outputSamplesNb, outputSampleRate);
var inputBuffer = context.createBuffer(1, inputSamples.length, inputSampleRate);
var maxDelay = 1.0;
var fractionalDelay = new _fractionalDelay2.default(inputSampleRate, maxDelay);
var source = context.createBufferSource();
var outputSamples = event.renderedBuffer.getChannelData(0);
var _kd = require('kd.tree');
var _kd2 = _interopRequireDefault(_kd);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function distanceSquared(a, b) {
var x = b.x - a.x;
var y = b.y - a.y;
var z = b.z - a.z;
function distance(a, b) {
var _degree = require('./degree');
var _degree2 = _interopRequireDefault(_degree);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function sofaCartesianToGl(out, a) {
var x = a[0];
var y = a[1];
var z = a[2];
function glToSofaCartesian(out, a) {
var x = a[0];
var y = a[1];
var z = a[2];
function sofaCartesianToSofaSpherical(out, a) {
var x = a[0];
var y = a[1];
var z = a[2];
var x2y2 = x * x + y * y;
function sofaSphericalToSofaCartesian(out, a) {
var azimuth = a[0];
var elevation = a[1];
var distance = a[2];
var cosE = _degree2.default.cos(elevation);
function sofaSphericalToGl(out, a) {
var azimuth = a[0];
var elevation = a[1];
var distance = a[2];
var cosE = _degree2.default.cos(elevation);
function glToSofaSpherical(out, a) {
var x = 0 - a[2]; // -openGL.z
var y = 0 - a[0]; // -openGL.x
var z = a[1]; // openGL.y
var x2y2 = x * x + y * y;
function sofaToSofaCartesian(out, a, system) {
function spat4CartesianToGl(out, a) {
var x = a[0];
var y = a[1];
var z = a[2];
function glToSpat4Cartesian(out, a) {
var x = a[0];
var y = a[1];
var z = a[2];
function spat4CartesianToSpat4Spherical(out, a) {
var x = a[0];
var y = a[1];
var z = a[2];
var x2y2 = x * x + y * y;
function spat4SphericalToSpat4Cartesian(out, a) {
var azimuth = a[0];
var elevation = a[1];
var distance = a[2];
var cosE = _degree2.default.cos(elevation);
function spat4SphericalToGl(out, a) {
var azimuth = a[0];
var elevation = a[1];
var distance = a[2];
var cosE = _degree2.default.cos(elevation);
function glToSpat4Spherical(out, a) {
var x = a[0]; // openGL.x
var y = 0 - a[2]; // -openGL.z
var z = a[1]; // openGL.y
var x2y2 = x * x + y * y;
function systemType(system) {
var type = void 0;
function systemToGl(out, a, system) {
function glToSystem(out, a, system) {
var toRadianFactor = exports.toRadianFactor = Math.PI / 180;
var fromRadianFactor = exports.fromRadianFactor = 1 / toRadianFactor;
function toRadian(angle) {
function fromRadian(angle) {
function cos(angle) {
function sin(angle) {
function atan2(y, x) {
var _HrtfSet = require('./sofa/HrtfSet');
var _HrtfSet2 = _interopRequireDefault(_HrtfSet);
var _ServerDataBase = require('./sofa/ServerDataBase');
var _ServerDataBase2 = _interopRequireDefault(_ServerDataBase);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _package = require('../package.json');
var _package2 = _interopRequireDefault(_package);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var description = _package2.default.description;
var license = _package2.default.license;
var name = _package2.default.name;
var version = _package2.default.version;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
var _glMatrix = require('gl-matrix');
var glMatrix = _interopRequireWildcard(_glMatrix);
var _info = require('../info');
var _info2 = _interopRequireDefault(_info);
var _parseDataSet = require('./parseDataSet');
var _parseSofa = require('./parseSofa');
var _coordinates = require('../geometry/coordinates');
var _coordinates2 = _interopRequireDefault(_coordinates);
var _KdTree = require('../geometry/KdTree');
var _KdTree2 = _interopRequireDefault(_KdTree);
var _utilities = require('../audio/utilities');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var HrtfSet = exports.HrtfSet = function () {
function HrtfSet() {
var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
var _this = this;
var filteredPositions = this._filterPositions.map(function (current) {
var _this2 = this;
var extension = sourceUrl.split('.').pop();
var url = extension === 'sofa' ? sourceUrl + '.json' : sourceUrl;
var promise = void 0;
var preFilter = typeof this._filterPositions !== 'undefined' && !this.filterAfterLoad && extension === 'sofa';
var indices = indicesAndDataSet[0];
var dataSet = indicesAndDataSet[1];
var _this3 = this;
var SourcePosition = void 0;
var SourcePositionType = _coordinates2.default.systemType(this.filterCoordinateSystem);
var DataIR = this._sofaSourcePosition.map(function (position) {
var fir = _this3._kdt.nearest({ x: position[0], y: position[1], z: position[2] }, 1).pop()[0].fir; // nearest data
var ir = [];
var position = _coordinates2.default.systemToGl([], positionRequest, this.coordinateSystem);
var nearest = this._kdt.nearest({
var data = nearest[0];
var _this4 = this;
var positions = indicesPositionsFirs.map(function (value) {
var impulseResponses = value[2];
var fir = _this4._audioContext.createBuffer(impulseResponses.length, impulseResponses[0].length, _this4._audioContext.sampleRate);
var _this5 = this;
var sofaFirsPromises = firs.map(function (sofaFirChannels, index) {
var channelCount = sofaFirChannels.length;
var inputDelays = typeof delays[index] !== 'undefined' ? delays[index] : delays[0];
var sofaFirsChannelsPromises = sofaFirChannels.map(function (fir, index2) {
var promise = new Promise(function (resolve, reject) {
var ddsUrl = sourceUrl + '.dds';
var request = new window.XMLHttpRequest();
var dds = (0, _parseDataSet.parseDataSet)(request.response);
var _this6 = this;
var promise = new Promise(function (resolve, reject) {
var positionsUrl = sourceUrl + '.json?' + 'ListenerPosition,ListenerUp,ListenerView,SourcePosition,' + 'Data.Delay,Data.SamplingRate,' + 'EmitterPosition,ReceiverPosition,RoomVolume'; // meta
var request = new window.XMLHttpRequest();
var data = (0, _parseSofa.parseSofa)(request.response);
var sourcePositions = _this6._sourcePositionsToGl(data);
var hrtfPositions = sourcePositions.map(function (position, index) {
var kdt = _KdTree2.default.tree.createKdTree(hrtfPositions, _KdTree2.default.distanceSquared, ['x', 'y', 'z']);
var nearestIndices = _this6._filterPositions.map(function (current) {
var _this7 = this;
var promise = new Promise(function (resolve, reject) {
var request = new window.XMLHttpRequest();
var data = (0, _parseSofa.parseSofa)(request.response);
var sourcePositions = _this7._sourcePositionsToGl(data);
var _this8 = this;
var urlPromises = indices.map(function (index) {
var urlPromise = new Promise(function (resolve, reject) {
var positionUrl = sourceUrl + '.json?' + ('SourcePosition[' + index + '][0:1:' + (dataSet.SourcePosition.C - 1) + '],') + ('Data.IR[' + index + '][0:1:' + (dataSet['Data.IR'].R - 1) + ']') + ('[0:1:' + (dataSet['Data.IR'].N - 1) + ']');
var request = new window.XMLHttpRequest();
var data = (0, _parseSofa.parseSofa)(request.response);
var sourcePositions = _this8._sourcePositionsToGl(data);
var dateString = new Date().toISOString();
var listenerPosition = _coordinates2.default.sofaToSofaCartesian([], data.ListenerPosition.data[0], (0, _parseSofa.conformSofaCoordinateSystem)(data.ListenerPosition.Type || 'cartesian'));
var listenerView = _coordinates2.default.sofaToSofaCartesian([], data.ListenerView.data[0], (0, _parseSofa.conformSofaCoordinateSystem)(data.ListenerView.Type || 'cartesian'));
var listenerUp = _coordinates2.default.sofaToSofaCartesian([], data.ListenerUp.data[0], (0, _parseSofa.conformSofaCoordinateSystem)(data.ListenerUp.Type || 'cartesian'));
var _this9 = this;
var sourcePositions = data.SourcePosition.data; // reference
var sourceCoordinateSystem = typeof data.SourcePosition.Type !== 'undefined' ? data.SourcePosition.Type : 'spherical'; // default (SOFA Table D.4C)
var positions = void 0;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
var _parseXml = require('./parseXml');
var _parseXml2 = _interopRequireDefault(_parseXml);
var _parseDataSet = require('./parseDataSet');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var ServerDataBase = exports.ServerDataBase = function () {
function ServerDataBase() {
var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
var protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
var _this = this;
var sourceUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._server + '/catalog.xml';
var destination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._catalogue;
var promise = new Promise(function (resolve, reject) {
var request = new window.XMLHttpRequest();
var xml = (0, _parseXml2.default)(request.response);
var dataSet = xml.querySelector('dataset');
var catalogueReferences = xml.querySelectorAll('dataset > catalogRef');
var urls = xml.querySelectorAll('dataset > dataset');
var url = _this._server + dataSet.getAttribute('name') + '/' + urls[ref].getAttribute('name');
var promises = [];
var name = catalogueReferences[_ref].getAttribute('name');
var recursiveUrl = _this._server + dataSet.getAttribute('name') + '/' + catalogueReferences[_ref].getAttribute('xlink:href');
var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
var filters = [options.convention, options.dataBase, options.equalisation, options.sampleRate, options.sosOrder];
var freePattern = typeof options.freePattern === 'number' ? options.freePattern.toString() : options.freePattern;
var pattern = filters.reduce(function (global, local) {
var regExp = new RegExp(pattern, 'i');
var urls = this._urls.filter(function (url) {
var patterns = freePattern.split(/\s+/);
var promise = new Promise(function (resolve, reject) {
var url = sourceUrl + '.dds';
var request = new window.XMLHttpRequest();
var promise = new Promise(function (resolve, reject) {
var url = sourceUrl + '.json?SourcePosition';
var request = new window.XMLHttpRequest();
var response = JSON.parse(request.response);
var _dimensionPattern = '\\[\\s*(\\w+)\\s*=\\s*(\\d+)\\s*\\]';
var _dimensionMatch = new RegExp(_dimensionPattern, 'g');
var _dimensionSplit = new RegExp(_dimensionPattern);
var _definitionPattern = '\\s*(\\w+)\\s*([\\w.]+)\\s*' + '((?:\\[[^\\]]+\\]\\s*)+)' + ';\\s*';
var _definitionMatch = new RegExp(_definitionPattern, 'g');
var _definitionSplit = new RegExp(_definitionPattern);
var _dataSetPattern = '\\s*Dataset\\s*\\{\\s*' + '((?:[^;]+;\\s*)*)' + '\\s*\\}\\s*[\\w.]+\\s*;\\s*';
var _dataSetSplit = new RegExp(_dataSetPattern);
function _parseDimension(input) {
var parse = [];
var inputs = input.match(_dimensionMatch);
var parts = _dimensionSplit.exec(inputSingle);
function _parseDefinition(input) {
var parse = [];
var inputs = input.match(_definitionMatch);
var parts = _definitionSplit.exec(inputSingle);
var current = [];
function parseDataSet(input) {
var parse = {};
var definitions = _dataSetSplit.exec(input);
function parseSofa(sofaString) {
var sofa = JSON.parse(sofaString);
var sofaSet = {};
var metaData = sofa.attributes.find(function (e) {
var data = sofa.leaves;
function stringifySofa(sofaSet) {
var sofa = {};
var ncGlobal = {
var type = 'Float64';
var attributes = void 0;
var listenerAttributeName = listenerAttributeAndType[0];
var listenerAttribute = sofaSet[listenerAttributeName];
var listenerType = sofaSet[listenerAttributeAndType[1]];
function conformSofaCoordinateSystem(system) {
var type = void 0;
var parseXml = exports.parseXml = void 0;
var xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
var bits      = require("bit-twiddle")
function dimension(cells) {
var d = 0
function countVertices(cells) {
var vc = -1
var c = cells[i]
function cloneCells(cells) {
var ncells = new Array(cells.length)
function compareCells(a, b) {
var n = a.length
var d = a[0]+a[1]-b[0]-b[1]
var l1 = a[0]+a[1]
var l0 = min(a[0], a[1])
var as = a.slice(0)
var bs = b.slice(0)
function compareZipped(a, b) {
function normalize(cells, attr) {
var len = cells.length
var zipped = new Array(len)
function unique(cells) {
var ptr = 1
var a = cells[i]
function findCell(cells, c) {
var lo = 0
var mid = (lo + hi) >> 1
function incidence(from_cells, to_cells) {
var index = new Array(from_cells.length)
var b = []
var c = to_cells[i]
var cl = c.length
var l = 0
var idx=findCell(from_cells, b)
function dual(cells, vertex_count) {
var res = new Array(vertex_count)
var c = cells[i]
function explode(cells) {
var result = []
var c = cells[i]
var b = []
function skeleton(cells, n) {
var result = []
var c = cells[i]
var b = new Array(n+1)
function boundary(cells) {
var res = []
var c = cells[i]
var b = new Array(c.length-1)
function connectedComponents_dense(cells, vertex_count) {
var labels = new UnionFind(vertex_count)
var c = cells[i]
var components = []
var l = labels.find(cells[i][0])
function connectedComponents_sparse(cells) {
var vertices  = unique(normalize(skeleton(cells, 0)))
var c = cells[i]
var vj = findCell(vertices, [c[j]])
var components        = []
var l = labels.find(findCell(vertices, [cells[i][0]]));
function connectedComponents(cells, vertex_count) {
var numeric = require('numeric');
var forwardSHT = function (N, data, CART_OR_SPH, DIRECT_OR_PINV) {
var Ndirs = data.length, Nsh = (N+1)*(N+1);
var invY_N;
var mag = [,];
var coeffs = numeric.dotMV(invY_N, mag);
var inverseSHT = function (coeffs, aziElev) {
var aziElevR = aziElev;
var N = Math.sqrt(coeffs.length)-1;
var Y_N = computeRealSH(N, aziElev);
var data = numeric.dotVM(coeffs, Y_N);
var print2Darray = function (array2D) {
var convertCart2Sph = function (xyz, OMIT_MAG) {
var azi, elev, r;
var aziElevR = new Array(xyz.length);
var convertSph2Cart = function (aziElevR) {
var x,y,z;
var xyz = new Array(aziElevR.length);
var computeRealSH = function (N, data) {
var azi = new Array(data.length);
var elev = new Array(data.length);
var factorials = new Array(2*N+1);
var Ndirs = azi.length;
var Nsh = (N+1)*(N+1);
var leg_n_minus1 = 0;
var leg_n_minus2 = 0;
var leg_n;
var sinel = numeric.sin(elev);
var index_n = 0;
var Y_N = new Array(Nsh);
var Nn0, Nnm;
var cosmazi, sinmazi;
var temp0 = new Array(azi.length);
var factorial = function (n) {
var recurseLegendrePoly = function (n, x, Pnm_minus1, Pnm_minus2) {
var Pnm = new Array(n+1);
var x2 = numeric.mul(x,x);
var P10 = x;
var P11 = numeric.sqrt(numeric.sub(1,x2));
var x2 = numeric.mul(x,x);
var P20 = numeric.mul(3,x2);
var P21 = numeric.sub(1,x2);
var P22 = numeric.sub(1,x2);
var x2 = numeric.mul(x,x);
var one_min_x2 = numeric.sub(1,x2);
var k = 2*n-1;
var dfact_k = 1;
var temp1 = numeric.mul( 2*n-1, numeric.mul(x, Pnm_minus1[m]) );
var temp2 = numeric.mul( n+m-1, Pnm_minus2[m] );
var pinv_svd = function (A) {
var z = numeric.svd(A), foo = z.S[0];
var U = z.U, S = z.S, V = z.V;
var m = A.length, n = A[0].length, tol = Math.max(m,n)*numeric.epsilon*foo,M = S.length;
var Sinv = new Array(M);
var pinv_direct = function (A) {
var AT = numeric.transpose(A);
var getSHrotMtx = function (Rxyz, L) {
var Nsh = (L+1)*(L+1);
var R = numeric.rep([Nsh,Nsh],0);
var R_1 = numeric.rep([3,3],0);
var R_lm1 = R_1;
var band_idx = 3;
var R_l = numeric.rep([(2*l+1),(2*l+1)],0);
var d, denom, u, v, w;
function U(l,m,n,R_1,R_lm1) {
function V(l,m,n,R_1,R_lm1) {
var p0, p1, ret, d;
function W(l,m,n,R_1,R_lm1) {
var p0, p1, ret;
function P(i,l,a,b,R_1,R_lm1) {
var ri1, rim1, ri0, ret;
var yawPitchRoll2Rzyx = function (yaw, pitch, roll) {
var Rx, Ry, Rz;
var R = numeric.dotMMsmall(Ry,Rz);
var SPLITTER = +(Math.pow(2, 27) + 1.0)
function twoProduct(a, b, result) {
var x = a * b
var c = SPLITTER * a
var abig = c - a
var ahi = c - abig
var alo = a - ahi
var d = SPLITTER * b
var bbig = d - b
var bhi = d - bbig
var blo = b - bhi
var err1 = x - (ahi * bhi)
var err2 = err1 - (alo * bhi)
var err3 = err2 - (ahi * blo)
var y = alo * blo - err3
function fastTwoSum(a, b, result) {
var x = a + b
var bv = x - a
var av = x - bv
var br = b - bv
var ar = a - av
function UnionFind(count) {
var proto = UnionFind.prototype
var n = this.roots.length;
var x0 = x
var roots = this.roots;
var y = roots[x0]
var xr = this.find(x)
var ranks = this.ranks
```

### `./public/js/JSAmbisonics.min.js`
```
var i=numeric.dim(e);return n(e,0)},numeric.setBlock=function(e,t,r,n){function i(e,n,o){var s,u=t[o],c=r[o]-u;if(o===a.length-1)for(s=c;s>=0;s--)e[s+u]=n[s];for(s=c;s>=0;s--)i(e[s+u],n[s],o+1)}var a=numeric.dim(e);return i(e,n,0),e},numeric.getRange=function(e,t,r){var n,i,a,o,s=t.length,u=r.length,c=Array(s);for(n=s-1;-1!==n;--n)for(c[n]=Array(u),a=c[n],o=e[t[n]],i=u-1;-1!==i;--i)a[i]=o[r[i]];return c},numeric.blockMatrix=function(e){var t=numeric.dim(e);if(t.length<4)return numeric.blockMatrix([e]);var r,n,i,a,o,s=t[0],u=t[1];for(r=0,n=0,i=0;i<s;++i)r+=e[i][0].length;for(a=0;a<u;++a)n+=e[0][a][0].length;var c=Array(r);for(i=0;i<r;++i)c[i]=Array(n);var f,h,l,d,m,p=0;for(i=0;i<s;++i){for(f=n,a=u-1;-1!==a;--a)for(o=e[i][a],f-=o[0].length,l=o.length-1;-1!==l;--l)for(m=o[l],h=c[p+l],d=m.length-1;-1!==d;--d)h[f+d]=m[d];p+=e[i][0].length}return c},numeric.tensor=function(e,t){if("number"==typeof e||"number"==typeof t)return numeric.mul(e,t);var r=numeric.dim(e),n=numeric.dim(t);if(1!==r.length||1!==n.length)throw new Error("numeric: tensor product is only defined for vectors");var i,a,o,s,u=r[0],c=n[0],f=Array(u);for(a=u-1;a>=0;a--){for(i=Array(c),s=e[a],o=c-1;o>=3;--o)i[o]=s*t[o],--o,i[o]=s*t[o],--o,i[o]=s*t[o],--o,i[o]=s*t[o];for(;o>=0;)i[o]=s*t[o],--o;f[a]=i}return f},numeric.T=function(e,t){this.x=e,this.y=t},numeric.t=function(e,t){return new numeric.T(e,t)},numeric.Tbinop=function(e,t,r,n,i){numeric.indexOf;if("string"!=typeof i){var a;i="";for(a in numeric)numeric.hasOwnProperty(a)&&(e.indexOf(a)>=0||t.indexOf(a)>=0||r.indexOf(a)>=0||n.indexOf(a)>=0)&&a.length>1&&(i+="var "+a+" = numeric."+a+";\n")}return Function(["y"],"var x = this;\nif(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n"+i+"\nif(x.y) {  if(y.y) {    return new numeric.T("+n+");\n  }\n  return new numeric.T("+r+");\n}\nif(y.y) {\n  return new numeric.T("+t+");\n}\nreturn new numeric.T("+e+");\n")},numeric.T.prototype.add=numeric.Tbinop("add(x.x,y.x)","add(x.x,y.x),y.y","add(x.x,y.x),x.y","add(x.x,y.x),add(x.y,y.y)"),numeric.T.prototype.sub=numeric.Tbinop("sub(x.x,y.x)","sub(x.x,y.x),neg(y.y)","sub(x.x,y.x),x.y","sub(x.x,y.x),sub(x.y,y.y)"),numeric.T.prototype.mul=numeric.Tbinop("mul(x.x,y.x)","mul(x.x,y.x),mul(x.x,y.y)","mul(x.x,y.x),mul(x.y,y.x)","sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))"),numeric.T.prototype.reciprocal=function(){var e=numeric.mul,t=numeric.div;if(this.y){var r=numeric.add(e(this.x,this.x),e(this.y,this.y));return new numeric.T(t(this.x,r),t(numeric.neg(this.y),r))}return new T(t(1,this.x))},numeric.T.prototype.div=function(e){if(e instanceof numeric.T||(e=new numeric.T(e)),e.y)return this.mul(e.reciprocal());var t=numeric.div;return this.y?new numeric.T(t(this.x,e.x),t(this.y,e.x)):new numeric.T(t(this.x,e.x))},numeric.T.prototype.dot=numeric.Tbinop("dot(x.x,y.x)","dot(x.x,y.x),dot(x.x,y.y)","dot(x.x,y.x),dot(x.y,y.x)","sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))"),numeric.T.prototype.transpose=function(){var e=numeric.transpose,t=this.x,r=this.y;return r?new numeric.T(e(t),e(r)):new numeric.T(e(t))},numeric.T.prototype.transjugate=function(){var e=numeric.transpose,t=this.x,r=this.y;return r?new numeric.T(e(t),numeric.negtranspose(r)):new numeric.T(e(t))},numeric.Tunop=function(e,t,r){return"string"!=typeof r&&(r=""),Function("var x = this;\n"+r+"\nif(x.y) {  "+t+";\n}\n"+e+";\n")},numeric.T.prototype.exp=numeric.Tunop("return new numeric.T(ex)","return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))","var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;"),numeric.T.prototype.conj=numeric.Tunop("return new numeric.T(x.x);","return new numeric.T(x.x,numeric.neg(x.y));"),numeric.T.prototype.neg=numeric.Tunop("return new numeric.T(neg(x.x));","return new numeric.T(neg(x.x),neg(x.y));","var neg = numeric.neg;"),numeric.T.prototype.sin=numeric.Tunop("return new numeric.T(numeric.sin(x.x))","return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));"),numeric.T.prototype.cos=numeric.Tunop("return new numeric.T(numeric.cos(x.x))","return x.exp().add(x.neg().exp()).div(2);"),numeric.T.prototype.abs=numeric.Tunop("return new numeric.T(numeric.abs(x.x));","return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));","var mul = numeric.mul;"),numeric.T.prototype.log=numeric.Tunop("return new numeric.T(numeric.log(x.x));","var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\nreturn new numeric.T(numeric.log(r.x),theta.x);"),numeric.T.prototype.norm2=numeric.Tunop("return numeric.norm2(x.x);","var f = numeric.norm2Squared;\nreturn Math.sqrt(f(x.x)+f(x.y));"),numeric.T.prototype.inv=function(){var e=this;if(void 0===e.y)return new numeric.T(numeric.inv(e.x));var t,r,n,i,a,o,s,u,c,f,h,t,r,n,l,d,m,p,v,g,y,b=e.x.length,M=numeric.identity(b),x=numeric.rep([b,b],0),w=numeric.clone(e.x),_=numeric.clone(e.y);for(t=0;t<b;t++){for(m=w[t][t],p=_[t][t],l=m*m+p*p,n=t,r=t+1;r<b;r++)m=w[r][t],p=_[r][t],(d=m*m+p*p)>l&&(n=r,l=d);for(n!==t&&(y=w[t],w[t]=w[n],w[n]=y,y=_[t],_[t]=_[n],_[n]=y,y=M[t],M[t]=M[n],M[n]=y,y=x[t],x[t]=x[n],x[n]=y),i=w[t],a=_[t],u=M[t],c=x[t],m=i[t],p=a[t],r=t+1;r<b;r++)v=i[r],g=a[r],i[r]=(v*m+g*p)/l,a[r]=(g*m-v*p)/l;for(r=0;r<b;r++)v=u[r],g=c[r],u[r]=(v*m+g*p)/l,c[r]=(g*m-v*p)/l;for(r=t+1;r<b;r++){for(o=w[r],s=_[r],f=M[r],h=x[r],m=o[t],p=s[t],n=t+1;n<b;n++)v=i[n],g=a[n],o[n]-=v*m-g*p,s[n]-=g*m+v*p;for(n=0;n<b;n++)v=u[n],g=c[n],f[n]-=v*m-g*p,h[n]-=g*m+v*p}}for(t=b-1;t>0;t--)for(u=M[t],c=x[t],r=t-1;r>=0;r--)for(f=M[r],h=x[r],m=w[r][t],p=_[r][t],n=b-1;n>=0;n--)v=u[n],g=c[n],f[n]-=m*v-p*g,h[n]-=m*g+p*v;return new numeric.T(M,x)},numeric.T.prototype.get=function(e){var t,r=this.x,n=this.y,i=0,a=e.length;if(n){for(;i<a;)t=e[i],r=r[t],n=n[t],i++;return new numeric.T(r,n)}for(;i<a;)t=e[i],r=r[t],i++;return new numeric.T(r)},numeric.T.prototype.set=function(e,t){var r,n=this.x,i=this.y,a=0,o=e.length,s=t.x,u=t.y;if(0===o)return u?this.y=u:i&&(this.y=void 0),this.x=n,this;if(u){for(i||(i=numeric.rep(numeric.dim(n),0),this.y=i);a<o-1;)r=e[a],n=n[r],i=i[r],a++;return r=e[a],n[r]=s,i[r]=u,this}if(i){for(;a<o-1;)r=e[a],n=n[r],i=i[r],a++;return r=e[a],n[r]=s,s instanceof Array?i[r]=numeric.rep(numeric.dim(s),0):i[r]=0,this}for(;a<o-1;)r=e[a],n=n[r],a++;return r=e[a],n[r]=s,this},numeric.T.prototype.getRows=function(e,t){var r,n,i=t-e+1,a=Array(i),o=this.x,s=this.y;for(r=e;r<=t;r++)a[r-e]=o[r];if(s){for(n=Array(i),r=e;r<=t;r++)n[r-e]=s[r];return new numeric.T(a,n)}return new numeric.T(a)},numeric.T.prototype.setRows=function(e,t,r){var n,i=this.x,a=this.y,o=r.x,s=r.y;for(n=e;n<=t;n++)i[n]=o[n-e];if(s)for(a||(a=numeric.rep(numeric.dim(i),0),this.y=a),n=e;n<=t;n++)a[n]=s[n-e];else if(a)for(n=e;n<=t;n++)a[n]=numeric.rep([o[n-e].length],0);return this},numeric.T.prototype.getRow=function(e){var t=this.x,r=this.y;return r?new numeric.T(t[e],r[e]):new numeric.T(t[e])},numeric.T.prototype.setRow=function(e,t){var r=this.x,n=this.y,i=t.x,a=t.y;return r[e]=i,a?(n||(n=numeric.rep(numeric.dim(r),0),this.y=n),n[e]=a):n&&(n=numeric.rep([i.length],0)),this},numeric.T.prototype.getBlock=function(e,t){var r=this.x,n=this.y,i=numeric.getBlock;return n?new numeric.T(i(r,e,t),i(n,e,t)):new numeric.T(i(r,e,t))},numeric.T.prototype.setBlock=function(e,t,r){r instanceof numeric.T||(r=new numeric.T(r));var n=this.x,i=this.y,a=numeric.setBlock,o=r.x,s=r.y;if(s)return i||(this.y=numeric.rep(numeric.dim(this),0),i=this.y),a(n,e,t,o),a(i,e,t,s),this;a(n,e,t,o),i&&a(i,e,t,numeric.rep(numeric.dim(o),0))},numeric.T.rep=function(e,t){var r=numeric.T;t instanceof r||(t=new r(t));var n=t.x,i=t.y,a=numeric.rep;return i?new r(a(e,n),a(e,i)):new r(a(e,n))},numeric.T.diag=function(e){e instanceof numeric.T||(e=new numeric.T(e));var t=e.x,r=e.y,n=numeric.diag;return r?new numeric.T(n(t),n(r)):new numeric.T(n(t))},numeric.T.eig=function(){if(this.y)throw new Error("eig: not implemented for complex matrices.");return numeric.eig(this.x)},numeric.T.identity=function(e){return new numeric.T(numeric.identity(e))},numeric.T.prototype.getDiag=function(){var e=numeric,t=this.x,r=this.y;return r?new e.T(e.getDiag(t),e.getDiag(r)):new e.T(e.getDiag(t))},numeric.house=function(e){var t=numeric.clone(e),r=e[0]>=0?1:-1,n=r*numeric.norm2(e);t[0]+=n;var i=numeric.norm2(t);if(0===i)throw new Error("eig: internal error");return numeric.div(t,i)},numeric.toUpperHessenberg=function(e){var t=numeric.dim(e);if(2!==t.length||t[0]!==t[1])throw new Error("numeric: toUpperHessenberg() only works on square matrices");var r,n,i,a,o,s,u,c,f,h,l=t[0],d=numeric.clone(e),m=numeric.identity(l);for(n=0;n<l-2;n++){for(a=Array(l-n-1),r=n+1;r<l;r++)a[r-n-1]=d[r][n];if(numeric.norm2(a)>0){for(o=numeric.house(a),s=numeric.getBlock(d,[n+1,n],[l-1,l-1]),u=numeric.tensor(o,numeric.dot(o,s)),r=n+1;r<l;r++)for(c=d[r],f=u[r-n-1],i=n;i<l;i++)c[i]-=2*f[i-n];for(s=numeric.getBlock(d,[0,n+1],[l-1,l-1]),u=numeric.tensor(numeric.dot(s,o),o),r=0;r<l;r++)for(c=d[r],f=u[r],i=n+1;i<l;i++)c[i]-=2*f[i-n-1];for(s=Array(l-n-1),r=n+1;r<l;r++)s[r-n-1]=m[r];for(u=numeric.tensor(o,numeric.dot(o,s)),r=n+1;r<l;r++)for(h=m[r],f=u[r-n-1],i=0;i<l;i++)h[i]-=2*f[i]}}return{H:d,Q:m}},numeric.epsilon=2.220446049250313e-16,numeric.QRFrancis=function(e,t){void 0===t&&(t=1e4),e=numeric.clone(e);var r,n,i,a,o,s,u,c,f,h,l,d,m,p,v,g,y,b,M=(numeric.clone(e),numeric.dim(e)),x=M[0],w=numeric.identity(x);if(x<3)return{Q:w,B:[[0,x-1]]};var _=numeric.epsilon;for(b=0;b<t;b++){for(g=0;g<x-1;g++)if(Math.abs(e[g+1][g])<_*(Math.abs(e[g][g])+Math.abs(e[g+1][g+1]))){var S=numeric.QRFrancis(numeric.getBlock(e,[0,0],[g,g]),t),C=numeric.QRFrancis(numeric.getBlock(e,[g+1,g+1],[x-1,x-1]),t);for(d=Array(g+1),v=0;v<=g;v++)d[v]=w[v];for(m=numeric.dot(S.Q,d),v=0;v<=g;v++)w[v]=m[v];for(d=Array(x-g-1),v=g+1;v<x;v++)d[v-g-1]=w[v];for(m=numeric.dot(C.Q,d),v=g+1;v<x;v++)w[v]=m[v-g-1];return{Q:w,B:S.B.concat(numeric.add(C.B,g+1))}}if(i=e[x-2][x-2],a=e[x-2][x-1],o=e[x-1][x-2],s=e[x-1][x-1],c=i+s,u=i*s-a*o,f=numeric.getBlock(e,[0,0],[2,2]),c*c>=4*u){var P,A;P=.5*(c+Math.sqrt(c*c-4*u)),A=.5*(c-Math.sqrt(c*c-4*u)),f=numeric.add(numeric.sub(numeric.dot(f,f),numeric.mul(f,P+A)),numeric.diag(numeric.rep([3],P*A)))}else f=numeric.add(numeric.sub(numeric.dot(f,f),numeric.mul(f,c)),numeric.diag(numeric.rep([3],u)));for(r=[f[0][0],f[1][0],f[2][0]],n=numeric.house(r),d=[e[0],e[1],e[2]],m=numeric.tensor(n,numeric.dot(n,d)),v=0;v<3;v++)for(l=e[v],p=m[v],y=0;y<x;y++)l[y]-=2*p[y];for(d=numeric.getBlock(e,[0,0],[x-1,2]),m=numeric.tensor(numeric.dot(d,n),n),v=0;v<x;v++)for(l=e[v],p=m[v],y=0;y<3;y++)l[y]-=2*p[y];for(d=[w[0],w[1],w[2]],m=numeric.tensor(n,numeric.dot(n,d)),v=0;v<3;v++)for(h=w[v],p=m[v],y=0;y<x;y++)h[y]-=2*p[y];var k;for(g=0;g<x-2;g++){for(y=g;y<=g+1;y++)if(Math.abs(e[y+1][y])<_*(Math.abs(e[y][y])+Math.abs(e[y+1][y+1]))){var S=numeric.QRFrancis(numeric.getBlock(e,[0,0],[y,y]),t),C=numeric.QRFrancis(numeric.getBlock(e,[y+1,y+1],[x-1,x-1]),t);for(d=Array(y+1),v=0;v<=y;v++)d[v]=w[v];for(m=numeric.dot(S.Q,d),v=0;v<=y;v++)w[v]=m[v];for(d=Array(x-y-1),v=y+1;v<x;v++)d[v-y-1]=w[v];for(m=numeric.dot(C.Q,d),v=y+1;v<x;v++)w[v]=m[v-y-1];return{Q:w,B:S.B.concat(numeric.add(C.B,y+1))}}for(k=Math.min(x-1,g+3),r=Array(k-g),v=g+1;v<=k;v++)r[v-g-1]=e[v][g];for(n=numeric.house(r),d=numeric.getBlock(e,[g+1,g],[k,x-1]),m=numeric.tensor(n,numeric.dot(n,d)),v=g+1;v<=k;v++)for(l=e[v],p=m[v-g-1],y=g;y<x;y++)l[y]-=2*p[y-g];for(d=numeric.getBlock(e,[0,g+1],[x-1,k]),m=numeric.tensor(numeric.dot(d,n),n),v=0;v<x;v++)for(l=e[v],p=m[v],y=g+1;y<=k;y++)l[y]-=2*p[y-g-1];for(d=Array(k-g),v=g+1;v<=k;v++)d[v-g-1]=w[v];for(m=numeric.tensor(n,numeric.dot(n,d)),v=g+1;v<=k;v++)for(h=w[v],p=m[v-g-1],y=0;y<x;y++)h[y]-=2*p[y]}}throw new Error("numeric: eigenvalue iteration does not converge -- increase maxiter?")},numeric.eig=function(e,t){var r,n,i,a,o,s,u,c,f,h,l,d,m,p,v,g,y,b=numeric.toUpperHessenberg(e),M=numeric.QRFrancis(b.H,t),x=numeric.T,w=e.length,_=M.B,S=numeric.dot(M.Q,numeric.dot(b.H,numeric.transpose(M.Q))),C=new x(numeric.dot(M.Q,b.Q)),P=_.length,A=Math.sqrt;for(n=0;n<P;n++)if((r=_[n][0])===_[n][1]);else{if(a=r+1,o=S[r][r],s=S[r][a],u=S[a][r],c=S[a][a],0===s&&0===u)continue;f=-o-c,h=o*c-s*u,l=f*f-4*h,l>=0?(d=f<0?-.5*(f-A(l)):-.5*(f+A(l)),g=(o-d)*(o-d)+s*s,y=u*u+(c-d)*(c-d),g>y?(g=A(g),p=(o-d)/g,v=s/g):(y=A(y),p=u/y,v=(c-d)/y),i=new x([[v,-p],[p,v]]),C.setRows(r,a,i.dot(C.getRows(r,a)))):(d=-.5*f,m=.5*A(-l),g=(o-d)*(o-d)+s*s,y=u*u+(c-d)*(c-d),g>y?(g=A(g+m*m),p=(o-d)/g,v=s/g,d=0,m/=g):(y=A(y+m*m),p=u/y,v=(c-d)/y,d=m/y,m=0),i=new x([[v,-p],[p,v]],[[d,m],[m,-d]]),C.setRows(r,a,i.dot(C.getRows(r,a))))}var k=C.dot(e).dot(C.transjugate()),w=e.length,j=numeric.T.identity(w);for(a=0;a<w;a++)if(a>0)for(n=a-1;n>=0;n--){var T=k.get([n,n]),O=k.get([a,a]);numeric.neq(T.x,O.x)||numeric.neq(T.y,O.y)?(d=k.getRow(n).getBlock([n],[a-1]),m=j.getRow(a).getBlock([n],[a-1]),j.set([a,n],k.get([n,a]).neg().sub(d.dot(m)).div(T.sub(O)))):j.setRow(a,j.getRow(n))}for(a=0;a<w;a++)d=j.getRow(a),j.setRow(a,d.div(d.norm2()));return j=j.transpose(),j=C.transjugate().dot(j),{lambda:k.getDiag(),E:j}},numeric.ccsSparse=function(e){var t,r,n,i,a=e.length,o=[];for(n=a-1;-1!==n;--n){r=e[n];for(i in r){for(i=parseInt(i);i>=o.length;)o[o.length]=0;0!==r[i]&&o[i]++}}var t=o.length,s=Array(t+1);for(s[0]=0,n=0;n<t;++n)s[n+1]=s[n]+o[n];var u=Array(s[t]),c=Array(s[t]);for(n=a-1;-1!==n;--n){r=e[n];for(i in r)0!==r[i]&&(o[i]--,u[s[i]+o[i]]=n,c[s[i]+o[i]]=r[i])}return[s,u,c]},numeric.ccsFull=function(e){var t,r,n,i,a=e[0],o=e[1],s=e[2],u=numeric.ccsDim(e),c=u[0],f=u[1],h=numeric.rep([c,f],0);for(t=0;t<f;t++)for(n=a[t],i=a[t+1],r=n;r<i;++r)h[o[r]][t]=s[r];return h},numeric.ccsTSolve=function(e,t,r,n,i){function a(e){var t;if(0===r[e]){for(r[e]=1,t=o[e];t<o[e+1];++t)a(s[t]);i[h]=e,++h}}var o=e[0],s=e[1],u=e[2],c=o.length-1,f=Math.max,h=0;void 0===n&&(r=numeric.rep([c],0)),void 0===n&&(n=numeric.linspace(0,r.length-1)),void 0===i&&(i=[]);var l,d,m,p,v,g,y;for(l=n.length-1;-1!==l;--l)a(n[l]);for(i.length=h,l=i.length-1;-1!==l;--l)r[i[l]]=0;for(l=n.length-1;-1!==l;--l)d=n[l],r[d]=t[d];for(l=i.length-1;-1!==l;--l){for(d=i[l],m=o[d],p=f(o[d+1],m),v=m;v!==p;++v)if(s[v]===d){r[d]/=u[v];break}for(y=r[d],v=m;v!==p;++v)(g=s[v])!==d&&(r[g]-=y*u[v])}return r},numeric.ccsDFS=function(e){this.k=Array(e),this.k1=Array(e),this.j=Array(e)},numeric.ccsDFS.prototype.dfs=function(e,t,r,n,i,a){var o,s,u,c=0,f=i.length,h=this.k,l=this.k1,d=this.j;if(0===n[e])for(n[e]=1,d[0]=e,h[0]=s=t[e],l[0]=u=t[e+1];;)if(s>=u){if(i[f]=d[c],0===c)return;++f,--c,s=h[c],u=l[c]}else o=a[r[s]],0===n[o]?(n[o]=1,h[c]=s,++c,d[c]=o,s=t[o],l[c]=u=t[o+1]):++s},numeric.ccsLPSolve=function(e,t,r,n,i,a,o){var s,u,c,f,h,l,d,m,p,v=e[0],g=e[1],y=e[2],b=(v.length,t[0]),M=t[1],x=t[2];for(u=b[i],c=b[i+1],n.length=0,s=u;s<c;++s)o.dfs(a[M[s]],v,g,r,n,a);for(s=n.length-1;-1!==s;--s)r[n[s]]=0;for(s=u;s!==c;++s)f=a[M[s]],r[f]=x[s];for(s=n.length-1;-1!==s;--s){for(f=n[s],h=v[f],l=v[f+1],d=h;d<l;++d)if(a[g[d]]===f){r[f]/=y[d];break}for(p=r[f],d=h;d<l;++d)(m=a[g[d]])!==f&&(r[m]-=p*y[d])}return r},numeric.ccsLUP1=function(e,t){var r,n,i,a,o,s,u,c=e[0].length-1,f=[numeric.rep([c+1],0),[],[]],h=[numeric.rep([c+1],0),[],[]],l=f[0],d=f[1],m=f[2],p=h[0],v=h[1],g=h[2],y=numeric.rep([c],0),b=numeric.rep([c],0),M=numeric.ccsLPSolve,x=(Math.max,Math.abs),w=numeric.linspace(0,c-1),_=numeric.linspace(0,c-1),S=new numeric.ccsDFS(c);for(void 0===t&&(t=1),r=0;r<c;++r){for(M(f,e,y,b,r,_,S),a=-1,o=-1,n=b.length-1;-1!==n;--n)(i=b[n])<=r||(s=x(y[i]))>a&&(o=i,a=s);for(x(y[r])<t*a&&(n=w[r],a=w[o],w[r]=a,_[a]=r,w[o]=n,_[n]=o,a=y[r],y[r]=y[o],y[o]=a),a=l[r],o=p[r],u=y[r],d[a]=w[r],m[a]=1,++a,n=b.length-1;-1!==n;--n)i=b[n],s=y[i],b[n]=0,y[i]=0,i<=r?(v[o]=i,g[o]=s,++o):(d[a]=w[i],m[a]=s/u,++a);l[r+1]=a,p[r+1]=o}for(n=d.length-1;-1!==n;--n)d[n]=_[d[n]];return{L:f,U:h,P:w,Pinv:_}},numeric.ccsDFS0=function(e){this.k=Array(e),this.k1=Array(e),this.j=Array(e)},numeric.ccsDFS0.prototype.dfs=function(e,t,r,n,i,a,o){var s,u,c,f=0,h=i.length,l=this.k,d=this.k1,m=this.j;if(0===n[e])for(n[e]=1,m[0]=e,l[0]=u=t[a[e]],d[0]=c=t[a[e]+1];;){if(isNaN(u))throw new Error("Ow!");if(u>=c){if(i[h]=a[m[f]],0===f)return;++h,--f,u=l[f],c=d[f]}else s=r[u],0===n[s]?(n[s]=1,l[f]=u,++f,m[f]=s,s=a[s],u=t[s],d[f]=c=t[s+1]):++u}},numeric.ccsLPSolve0=function(e,t,r,n,i,a,o,s){var u,c,f,h,l,d,m,p,v,g=e[0],y=e[1],b=e[2],M=(g.length,t[0]),x=t[1],w=t[2];for(c=M[i],f=M[i+1],n.length=0,u=c;u<f;++u)s.dfs(x[u],g,y,r,n,a,o);for(u=n.length-1;-1!==u;--u)h=n[u],r[o[h]]=0;for(u=c;u!==f;++u)h=x[u],r[h]=w[u];for(u=n.length-1;-1!==u;--u){for(h=n[u],p=o[h],l=g[h],d=g[h+1],m=l;m<d;++m)if(y[m]===p){r[p]/=b[m];break}for(v=r[p],m=l;m<d;++m)r[y[m]]-=v*b[m];r[p]=v}},numeric.ccsLUP0=function(e,t){var r,n,i,a,o,s,u,c=e[0].length-1,f=[numeric.rep([c+1],0),[],[]],h=[numeric.rep([c+1],0),[],[]],l=f[0],d=f[1],m=f[2],p=h[0],v=h[1],g=h[2],y=numeric.rep([c],0),b=numeric.rep([c],0),M=numeric.ccsLPSolve0,x=(Math.max,Math.abs),w=numeric.linspace(0,c-1),_=numeric.linspace(0,c-1),S=new numeric.ccsDFS0(c);for(void 0===t&&(t=1),r=0;r<c;++r){for(M(f,e,y,b,r,_,w,S),a=-1,o=-1,n=b.length-1;-1!==n;--n)(i=b[n])<=r||(s=x(y[w[i]]))>a&&(o=i,a=s);for(x(y[w[r]])<t*a&&(n=w[r],a=w[o],w[r]=a,_[a]=r,w[o]=n,_[n]=o),a=l[r],o=p[r],u=y[w[r]],d[a]=w[r],m[a]=1,++a,n=b.length-1;-1!==n;--n)i=b[n],s=y[w[i]],b[n]=0,y[w[i]]=0,i<=r?(v[o]=i,g[o]=s,++o):(d[a]=w[i],m[a]=s/u,++a);l[r+1]=a,p[r+1]=o}for(n=d.length-1;-1!==n;--n)d[n]=_[d[n]];return{L:f,U:h,P:w,Pinv:_}},numeric.ccsLUP=numeric.ccsLUP0,numeric.ccsDim=function(e){return[numeric.sup(e[1])+1,e[0].length-1]},numeric.ccsGetBlock=function(e,t,r){var n=numeric.ccsDim(e),i=n[0],a=n[1];void 0===t?t=numeric.linspace(0,i-1):"number"==typeof t&&(t=[t]),void 0===r?r=numeric.linspace(0,a-1):"number"==typeof r&&(r=[r]);var o,s,u,c,f,h=t.length,l=r.length,d=numeric.rep([a],0),m=[],p=[],v=[d,m,p],g=e[0],y=e[1],b=e[2],M=numeric.rep([i],0),x=0,w=numeric.rep([i],0);for(s=0;s<l;++s){c=r[s];var _=g[c],S=g[c+1];for(o=_;o<S;++o)u=y[o],w[u]=1,M[u]=b[o];for(o=0;o<h;++o)f=t[o],w[f]&&(m[x]=o,p[x]=M[t[o]],++x);for(o=_;o<S;++o)u=y[o],w[u]=0;d[s+1]=x}return v},numeric.ccsDot=function(e,t){var r,n,i,a,o,s,u,c,f,h,l,d=e[0],m=e[1],p=e[2],v=t[0],g=t[1],y=t[2],b=numeric.ccsDim(e),M=numeric.ccsDim(t),x=b[0],w=(b[1],M[1]),_=numeric.rep([x],0),S=numeric.rep([x],0),C=Array(x),P=numeric.rep([w],0),A=[],k=[],j=[P,A,k];for(i=0;i!==w;++i){for(a=v[i],o=v[i+1],f=0,n=a;n<o;++n)for(h=g[n],l=y[n],s=d[h],u=d[h+1],r=s;r<u;++r)c=m[r],0===S[c]&&(C[f]=c,S[c]=1,f+=1),_[c]=_[c]+p[r]*l;for(a=P[i],o=a+f,P[i+1]=o,n=f-1;-1!==n;--n)l=a+n,r=C[n],A[l]=r,k[l]=_[r],S[r]=0,_[r]=0;P[i+1]=P[i]+f}return j},numeric.ccsLUPSolve=function(e,t){var r=e.L,n=e.U,i=(e.P,t[0]),a=!1;"object"!=typeof i&&(t=[[0,t.length],numeric.linspace(0,t.length-1),t],i=t[0],a=!0);var o,s,u,c,f,h,l=t[1],d=t[2],m=r[0].length-1,p=i.length-1,v=numeric.rep([m],0),g=Array(m),y=numeric.rep([m],0),b=Array(m),M=numeric.rep([p+1],0),x=[],w=[],_=numeric.ccsTSolve,S=0;for(o=0;o<p;++o){for(f=0,u=i[o],c=i[o+1],s=u;s<c;++s)h=e.Pinv[l[s]],b[f]=h,y[h]=d[s],++f;for(b.length=f,_(r,y,v,b,g),s=b.length-1;-1!==s;--s)y[b[s]]=0;if(_(n,v,y,g,b),a)return y;for(s=g.length-1;-1!==s;--s)v[g[s]]=0;for(s=b.length-1;-1!==s;--s)h=b[s],x[S]=h,w[S]=y[h],y[h]=0,++S;M[o+1]=S}return[M,x,w]},numeric.ccsbinop=function(e,t){return void 0===t&&(t=""),Function("X","Y","var Xi = X[0], Xj = X[1], Xv = X[2];\nvar Yi = Y[0], Yj = Y[1], Yv = Y[2];\nvar n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\nvar Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\nvar x = numeric.rep([m],0),y = numeric.rep([m],0);\nvar xk,yk,zk;\nvar i,j,j0,j1,k,p=0;\n"+t+"for(i=0;i<n;++i) {\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Xj[j];\n    x[k] = 1;\n    Zj[p] = k;\n    ++p;\n  }\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Yj[j];\n    y[k] = Yv[j];\n    if(x[k] === 0) {\n      Zj[p] = k;\n      ++p;\n    }\n  }\n  Zi[i+1] = p;\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n  j0 = Zi[i]; j1 = Zi[i+1];\n  for(j=j0;j!==j1;++j) {\n    k = Zj[j];\n    xk = x[k];\n    yk = y[k];\n"+e+"\n    Zv[j] = zk;\n  }\n  j0 = Xi[i]; j1 = Xi[i+1];\n  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n  j0 = Yi[i]; j1 = Yi[i+1];\n  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n}\nreturn [Zi,Zj,Zv];")},function(){var k,A,B,C;for(k in numeric.ops2)A=isFinite(eval("1"+numeric.ops2[k]+"0"))?"[Y[0],Y[1],numeric."+k+"(X,Y[2])]":"NaN",B=isFinite(eval("0"+numeric.ops2[k]+"1"))?"[X[0],X[1],numeric."+k+"(X[2],Y)]":"NaN",C=isFinite(eval("1"+numeric.ops2[k]+"0"))&&isFinite(eval("0"+numeric.ops2[k]+"1"))?"numeric.ccs"+k+"MM(X,Y)":"NaN",numeric["ccs"+k+"MM"]=numeric.ccsbinop("zk = xk "+numeric.ops2[k]+"yk;"),numeric["ccs"+k]=Function("X","Y",'if(typeof X === "number") return '+A+';\nif(typeof Y === "number") return '+B+";\nreturn "+C+";\n")}(),numeric.ccsScatter=function(e){var t,r=e[0],n=e[1],i=e[2],a=numeric.sup(n)+1,o=r.length,s=numeric.rep([a],0),u=Array(o),c=Array(o),f=numeric.rep([a],0);for(t=0;t<o;++t)f[n[t]]++;for(t=0;t<a;++t)s[t+1]=s[t]+f[t];var h,l,d=s.slice(0);for(t=0;t<o;++t)l=n[t],h=d[l],u[h]=r[t],c[h]=i[t],d[l]=d[l]+1;return[s,u,c]},numeric.ccsGather=function(e){var t,r,n,i,a,o=e[0],s=e[1],u=e[2],c=o.length-1,f=s.length,h=Array(f),l=Array(f),d=Array(f);for(a=0,t=0;t<c;++t)for(n=o[t],i=o[t+1],r=n;r!==i;++r)l[a]=t,h[a]=s[r],d[a]=u[r],++a;return[h,l,d]},numeric.sdim=function e(t,r,n){if(void 0===r&&(r=[]),"object"!=typeof t)return r;void 0===n&&(n=0),n in r||(r[n]=0),t.length>r[n]&&(r[n]=t.length);var i;for(i in t)t.hasOwnProperty(i)&&e(t[i],r,n+1);return r},numeric.sclone=function e(t,r,n){void 0===r&&(r=0),void 0===n&&(n=numeric.sdim(t).length);var i,a=Array(t.length);if(r===n-1){for(i in t)t.hasOwnProperty(i)&&(a[i]=t[i]);return a}for(i in t)t.hasOwnProperty(i)&&(a[i]=e(t[i],r+1,n));return a},numeric.sdiag=function(e){var t,r,n=e.length,i=Array(n);for(t=n-1;t>=1;t-=2)r=t-1,i[t]=[],i[t][t]=e[t],i[r]=[],i[r][r]=e[r];return 0===t&&(i[0]=[],i[0][0]=e[t]),i},numeric.sidentity=function(e){return numeric.sdiag(numeric.rep([e],1))},numeric.stranspose=function(e){var t,r,n,i=[];e.length;for(t in e)if(e.hasOwnProperty(t)){n=e[t];for(r in n)n.hasOwnProperty(r)&&("object"!=typeof i[r]&&(i[r]=[]),i[r][t]=n[r])}return i},numeric.sLUP=function(e,t){throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.")},numeric.sdotMM=function(e,t){var r,n,i,a,o,s,u,c=e.length,f=(t.length,numeric.stranspose(t)),h=f.length,l=Array(c);for(i=c-1;i>=0;i--){for(u=[],r=e[i],o=h-1;o>=0;o--){s=0,n=f[o];for(a in r)r.hasOwnProperty(a)&&a in n&&(s+=r[a]*n[a]);s&&(u[o]=s)}l[i]=u}return l},numeric.sdotMV=function(e,t){var r,n,i,a,o=e.length,s=Array(o);for(n=o-1;n>=0;n--){r=e[n],a=0;for(i in r)r.hasOwnProperty(i)&&t[i]&&(a+=r[i]*t[i]);a&&(s[n]=a)}return s},numeric.sdotVM=function(e,t){var r,n,i,a,o=[];for(r in e)if(e.hasOwnProperty(r)){i=t[r],a=e[r];for(n in i)i.hasOwnProperty(n)&&(o[n]||(o[n]=0),o[n]+=a*i[n])}return o},numeric.sdotVV=function(e,t){var r,n=0;for(r in e)e[r]&&t[r]&&(n+=e[r]*t[r]);return n},numeric.sdot=function(e,t){var r=numeric.sdim(e).length,n=numeric.sdim(t).length;switch(1e3*r+n){case 0:return e*t;case 1001:return numeric.sdotVV(e,t);case 2001:return numeric.sdotMV(e,t);case 1002:return numeric.sdotVM(e,t);case 2002:return numeric.sdotMM(e,t);default:throw new Error("numeric.sdot not implemented for tensors of order "+r+" and "+n)}},numeric.sscatter=function(e){var t,r,n,i,a=e[0].length,o=e.length,s=[];for(r=a-1;r>=0;--r)if(e[o-1][r]){for(i=s,n=0;n<o-2;n++)t=e[n][r],i[t]||(i[t]=[]),i=i[t];i[e[n][r]]=e[n+1][r]}return s},numeric.sgather=function e(t,r,n){void 0===r&&(r=[]),void 0===n&&(n=[]);var i,a,o;i=n.length;for(a in t)if(t.hasOwnProperty(a))if(n[i]=parseInt(a),"number"==typeof(o=t[a])){if(o){if(0===r.length)for(a=i+1;a>=0;--a)r[a]=[];for(a=i;a>=0;--a)r[a].push(n[a]);r[i+1].push(o)}}else e(o,r,n);return n.length>i&&n.pop(),r},numeric.cLU=function(e){var t,r,n,i,a,o,s=e[0],u=e[1],c=e[2],f=s.length,h=0;for(t=0;t<f;t++)s[t]>h&&(h=s[t]);h++;var l,d,m,p=Array(h),v=Array(h),g=numeric.rep([h],1/0),y=numeric.rep([h],-1/0);for(n=0;n<f;n++)t=s[n],r=u[n],r<g[t]&&(g[t]=r),r>y[t]&&(y[t]=r);for(t=0;t<h-1;t++)y[t]>y[t+1]&&(y[t+1]=y[t]);for(t=h-1;t>=1;t--)g[t]<g[t-1]&&(g[t-1]=g[t]);var b=0,M=0;for(t=0;t<h;t++)v[t]=numeric.rep([y[t]-g[t]+1],0),p[t]=numeric.rep([t-g[t]],0),b+=t-g[t]+1,M+=y[t]-t+1;for(n=0;n<f;n++)t=s[n],v[t][u[n]-g[t]]=c[n];for(t=0;t<h-1;t++)for(i=t-g[t],l=v[t],r=t+1;g[r]<=t&&r<h;r++)if(a=t-g[r],o=y[t]-t,d=v[r],m=d[a]/l[i]){for(n=1;n<=o;n++)d[n+a]-=m*l[n+i];p[r][t-g[r]]=m}var f,x,w,l=[],d=[],_=[],S=[],C=[],P=[];for(f=0,x=0,t=0;t<h;t++){for(i=g[t],a=y[t],w=v[t],r=t;r<=a;r++)w[r-i]&&(l[f]=t,d[f]=r,_[f]=w[r-i],f++);for(w=p[t],r=i;r<t;r++)w[r-i]&&(S[x]=t,C[x]=r,P[x]=w[r-i],x++);S[x]=t,C[x]=t,P[x]=1,x++}return{U:[l,d,_],L:[S,C,P]}},numeric.cLUsolve=function(e,t){var r,n,i=e.L,a=e.U,o=numeric.clone(t),s=i[0],u=i[1],c=i[2],f=a[0],h=a[1],l=a[2],d=f.length,m=(s.length,o.length);for(n=0,r=0;r<m;r++){for(;u[n]<r;)o[r]-=c[n]*o[u[n]],n++;n++}for(n=d-1,r=m-1;r>=0;r--){for(;h[n]>r;)o[r]-=l[n]*o[h[n]],n--;o[r]/=l[n],n--}return o},numeric.cgrid=function(e,t){"number"==typeof e&&(e=[e,e]);var r,n,i,a=numeric.rep(e,-1);if("function"!=typeof t)switch(t){case"L":t=function(t,r){return t>=e[0]/2||r<e[1]/2};break;default:t=function(e,t){return!0}}for(i=0,r=1;r<e[0]-1;r++)for(n=1;n<e[1]-1;n++)t(r,n)&&(a[r][n]=i,i++);return a},numeric.cdelsq=function(e){var t,r,n,i,a,o=[[-1,0],[0,-1],[0,1],[1,0]],s=numeric.dim(e),u=s[0],c=s[1],f=[],h=[],l=[];for(t=1;t<u-1;t++)for(r=1;r<c-1;r++)if(!(e[t][r]<0)){for(n=0;n<4;n++)i=t+o[n][0],a=r+o[n][1],e[i][a]<0||(f.push(e[t][r]),h.push(e[i][a]),l.push(-1));f.push(e[t][r]),h.push(e[t][r]),l.push(4)}return[f,h,l]},numeric.cdotMV=function(e,t){var r,n,i,a=e[0],o=e[1],s=e[2],u=a.length;for(i=0,n=0;n<u;n++)a[n]>i&&(i=a[n]);for(i++,r=numeric.rep([i],0),n=0;n<u;n++)r[a[n]]+=s[n]*t[o[n]];return r},numeric.Spline=function(e,t,r,n,i){this.x=e,this.yl=t,this.yr=r,this.kl=n,this.kr=i},numeric.Spline.prototype._at=function(e,t){var e,r,n,i,a=this.x,o=this.yl,s=this.yr,u=this.kl,c=this.kr,f=numeric.add,h=numeric.sub,l=numeric.mul;r=h(l(u[t],a[t+1]-a[t]),h(s[t+1],o[t])),n=f(l(c[t+1],a[t]-a[t+1]),h(s[t+1],o[t])),i=(e-a[t])/(a[t+1]-a[t]);var d=i*(1-i);return f(f(f(l(1-i,o[t]),l(i,s[t+1])),l(r,d*(1-i))),l(n,d*i))},numeric.Spline.prototype.at=function(e){if("number"==typeof e){var t,r,n,i=this.x,a=i.length,o=Math.floor;for(t=0,r=a-1;r-t>1;)n=o((t+r)/2),i[n]<=e?t=n:r=n;return this._at(e,t)}var s,a=e.length,u=Array(a);for(s=a-1;-1!==s;--s)u[s]=this.at(e[s]);return u},numeric.Spline.prototype.diff=function(){var e,t,r,n=this.x,i=this.yl,a=this.yr,o=this.kl,s=this.kr,u=i.length,c=o,f=s,h=Array(u),l=Array(u),d=numeric.add,m=numeric.mul,p=numeric.div,v=numeric.sub;for(e=u-1;-1!==e;--e)t=n[e+1]-n[e],r=v(a[e+1],i[e]),h[e]=p(d(m(r,6),m(o[e],-4*t),m(s[e+1],-2*t)),t*t),l[e+1]=p(d(m(r,-6),m(o[e],2*t),m(s[e+1],4*t)),t*t);return new numeric.Spline(n,c,f,h,l)},numeric.Spline.prototype.roots=function(){var e=[],t=this.x,r=this.yl,n=this.yr,i=this.kl,a=this.kr;"number"==typeof r[0]&&(r=[r],n=[n],i=[i],a=[a]);var o,s,u,c,f,h,l,d,m,p,v,g,y,b,M,x,w,_,S,C,P,A,k,j=r.length,T=t.length-1,e=Array(j),O=Math.sqrt;for(o=0;o!==j;++o){for(c=r[o],f=n[o],h=i[o],l=a[o],d=[],s=0;s!==T;s++){for(s>0&&f[s]*c[s]<0&&d.push(t[s]),x=t[s+1]-t[s],t[s],v=c[s],g=f[s+1],m=h[s]/x,p=l[s+1]/x,M=function(e){return e*e}(m-p+3*(v-g))+12*p*v,y=p+3*v+2*m-3*g,b=3*(p+m+2*(v-g)),M<=0?(_=y/b,w=_>t[s]&&_<t[s+1]?[t[s],_,t[s+1]]:[t[s],t[s+1]]):(_=(y-O(M))/b,S=(y+O(M))/b,w=[t[s]],_>t[s]&&_<t[s+1]&&w.push(_),S>t[s]&&S<t[s+1]&&w.push(S),w.push(t[s+1])),P=w[0],_=this._at(P,s),u=0;u<w.length-1;u++)if(A=w[u+1],S=this._at(A,s),0!==_)if(0===S||_*S>0)P=A,_=S;else{for(var D=0;;){if((k=(_*A-S*P)/(_-S))<=P||k>=A)break;if((C=this._at(k,s))*S>0)A=k,S=C,-1===D&&(_*=.5),D=-1;else{if(!(C*_>0))break;P=k,_=C,1===D&&(S*=.5),D=1}}d.push(k),P=w[u+1],_=this._at(P,s)}else d.push(P),P=A,_=S;0===S&&d.push(A)}e[o]=d}return"number"==typeof this.yl[0]?e[0]:e},numeric.spline=function(e,t,r,n){var i,a=e.length,o=[],s=[],u=[],c=numeric.sub,f=numeric.mul,h=numeric.add;for(i=a-2;i>=0;i--)s[i]=e[i+1]-e[i],u[i]=c(t[i+1],t[i]);"string"!=typeof r&&"string"!=typeof n||(r=n="periodic");var l=[[],[],[]];switch(typeof r){case"undefined":o[0]=f(3/(s[0]*s[0]),u[0]),l[0].push(0,0),l[1].push(0,1),l[2].push(2/s[0],1/s[0]);break;case"string":o[0]=h(f(3/(s[a-2]*s[a-2]),u[a-2]),f(3/(s[0]*s[0]),u[0])),l[0].push(0,0,0),l[1].push(a-2,0,1),l[2].push(1/s[a-2],2/s[a-2]+2/s[0],1/s[0]);break;default:o[0]=r,l[0].push(0),l[1].push(0),l[2].push(1)}for(i=1;i<a-1;i++)o[i]=h(f(3/(s[i-1]*s[i-1]),u[i-1]),f(3/(s[i]*s[i]),u[i])),l[0].push(i,i,i),l[1].push(i-1,i,i+1),l[2].push(1/s[i-1],2/s[i-1]+2/s[i],1/s[i]);switch(typeof n){case"undefined":o[a-1]=f(3/(s[a-2]*s[a-2]),u[a-2]),l[0].push(a-1,a-1),l[1].push(a-2,a-1),l[2].push(1/s[a-2],2/s[a-2]);break;case"string":l[1][l[1].length-1]=0;break;default:o[a-1]=n,l[0].push(a-1),l[1].push(a-1),l[2].push(1)}o="number"!=typeof o[0]?numeric.transpose(o):[o];var d=Array(o.length);if("string"==typeof r)for(i=d.length-1;-1!==i;--i)d[i]=numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(l)),o[i]),d[i][a-1]=d[i][0];else for(i=d.length-1;-1!==i;--i)d[i]=numeric.cLUsolve(numeric.cLU(l),o[i]);return d="number"==typeof t[0]?d[0]:numeric.transpose(d),new numeric.Spline(e,t,t,d,d)},numeric.fftpow2=function e(t,r){var n=t.length;if(1!==n){var i,a,o=Math.cos,s=Math.sin,u=Array(n/2),c=Array(n/2),f=Array(n/2),h=Array(n/2);for(a=n/2,i=n-1;-1!==i;--i)--a,f[a]=t[i],h[a]=r[i],--i,u[a]=t[i],c[a]=r[i];e(u,c),e(f,h),a=n/2;var l,d,m,p=-6.283185307179586/n;for(i=n-1;-1!==i;--i)--a,-1===a&&(a=n/2-1),l=p*i,d=o(l),m=s(l),t[i]=u[a]+d*f[a]-m*h[a],r[i]=c[a]+d*h[a]+m*f[a]}},numeric._ifftpow2=function e(t,r){var n=t.length;if(1!==n){var i,a,o=Math.cos,s=Math.sin,u=Array(n/2),c=Array(n/2),f=Array(n/2),h=Array(n/2);for(a=n/2,i=n-1;-1!==i;--i)--a,f[a]=t[i],h[a]=r[i],--i,u[a]=t[i],c[a]=r[i];e(u,c),e(f,h),a=n/2;var l,d,m,p=6.283185307179586/n;for(i=n-1;-1!==i;--i)--a,-1===a&&(a=n/2-1),l=p*i,d=o(l),m=s(l),t[i]=u[a]+d*f[a]-m*h[a],r[i]=c[a]+d*h[a]+m*f[a]}},numeric.ifftpow2=function(e,t){numeric._ifftpow2(e,t),numeric.diveq(e,e.length),numeric.diveq(t,t.length)},numeric.convpow2=function(e,t,r,n){numeric.fftpow2(e,t),numeric.fftpow2(r,n);var i,a,o,s,u,c=e.length;for(i=c-1;-1!==i;--i)a=e[i],s=t[i],o=r[i],u=n[i],e[i]=a*o-s*u,t[i]=a*u+s*o;numeric.ifftpow2(e,t)},numeric.T.prototype.fft=function(){var e,t,r=this.x,n=this.y,i=r.length,a=Math.log,o=a(2),s=Math.ceil(a(2*i-1)/o),u=Math.pow(2,s),c=numeric.rep([u],0),f=numeric.rep([u],0),h=Math.cos,l=Math.sin,d=-3.141592653589793/i,m=numeric.rep([u],0),p=numeric.rep([u],0);Math.floor(i/2);for(e=0;e<i;e++)m[e]=r[e];if(void 0!==n)for(e=0;e<i;e++)p[e]=n[e];for(c[0]=1,e=1;e<=u/2;e++)t=d*e*e,c[e]=h(t),f[e]=l(t),c[u-e]=h(t),f[u-e]=l(t);var v=new numeric.T(m,p),g=new numeric.T(c,f);return v=v.mul(g),numeric.convpow2(v.x,v.y,numeric.clone(g.x),numeric.neg(g.y)),v=v.mul(g),v.x.length=i,v.y.length=i,v},numeric.T.prototype.ifft=function(){var e,t,r=this.x,n=this.y,i=r.length,a=Math.log,o=a(2),s=Math.ceil(a(2*i-1)/o),u=Math.pow(2,s),c=numeric.rep([u],0),f=numeric.rep([u],0),h=Math.cos,l=Math.sin,d=3.141592653589793/i,m=numeric.rep([u],0),p=numeric.rep([u],0);Math.floor(i/2);for(e=0;e<i;e++)m[e]=r[e];if(void 0!==n)for(e=0;e<i;e++)p[e]=n[e];for(c[0]=1,e=1;e<=u/2;e++)t=d*e*e,c[e]=h(t),f[e]=l(t),c[u-e]=h(t),f[u-e]=l(t);var v=new numeric.T(m,p),g=new numeric.T(c,f);return v=v.mul(g),numeric.convpow2(v.x,v.y,numeric.clone(g.x),numeric.neg(g.y)),v=v.mul(g),v.x.length=i,v.y.length=i,v.div(i)},numeric.gradient=function(e,t){var r=t.length,n=e(t);if(isNaN(n))throw new Error("gradient: f(x) is a NaN!");var i,a,o,s,u,c,f,h,l,d=Math.max,m=numeric.clone(t),p=Array(r),d=(numeric.div,numeric.sub,Math.max),v=Math.abs,g=Math.min,y=0;for(i=0;i<r;i++)for(var b=d(1e-6*n,1e-8);;){if(++y>20)throw new Error("Numerical gradient fails");if(m[i]=t[i]+b,a=e(m),m[i]=t[i]-b,o=e(m),m[i]=t[i],isNaN(a)||isNaN(o))b/=16;else{if(p[i]=(a-o)/(2*b),s=t[i]-b,u=t[i],c=t[i]+b,f=(a-n)/b,
```

### `./scripts/test-queue-click.ts`
```
class MockAudio {
const audio = new MockAudio();
const onTrackDoubleClick = (newFile: string) => {
const startTime = Date.now();
```

### `./scripts/test-binary-paths.ts`
```
const ffmpeg = getFfmpegPath();
const obr = getObrStreamPath();
const oldPath = path.resolve(process.cwd(), 'src/cpp/build/obr_stream');
```

### `./scripts/test-obr-pipeline.js`
```
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_FILE = path.resolve(__dirname, '../test_obr_output.webm');
const OBR_BINARY = path.resolve(__dirname, '../src/cpp/build/obr_stream');
const FFMPEG = 'ffmpeg'; // Ensure this is in your PATH
function runTest() {
const decoderArgs = [
const decoder = spawn(FFMPEG, decoderArgs);
const obrArgs = [
const obr = spawn(OBR_BINARY, obrArgs);
const encoderArgs = [
const encoder = spawn(FFMPEG, encoderArgs);
const stats = fs.statSync(OUTPUT_FILE);
```

### `./scripts/test-auto-resume.ts`
```
class MockAudio {
class MockPlaybackContext {
const context = new MockPlaybackContext();
const contextB = new MockPlaybackContext();
```

### `./scripts/test-server.ts`
```
const PORT = 45455;
const server = http.createServer(async (req, res) => {
const parsedUrl = url.parse(req.url || '', true);
const pathname = parsedUrl.pathname;
const filePath = parsedUrl.query.file as string;
const meta = await probeAudio(filePath);
const filePath = parsedUrl.query.file as string;
const channels = parseInt(parsedUrl.query.channels as string) || 0;
const profile = (parsedUrl.query.profile as string) || 'ambient';
const pipeline = createObrPipeline(filePath, channels, profile);
const finalStream = encoder.stdout;
```

### `./scripts/test-seek-debounce.ts`
```
class MockPlaybackContext {
const context = new MockPlaybackContext();
const count = context.getFetchCount();
```

### `./scripts/test-seek-accuracy.ts`
```
const PORT = 45455;
const HOST = '127.0.0.1';
const absPath = path.resolve(file);
const url = `http://${HOST}:${PORT}/obr-stream?file=${encodeURIComponent(absPath)}&start=${startSec}&channels=16&profile=ambient`;
const chunks: Buffer[] = [];
let totalSize = 0;
const req = http.get(url, (res) => {
const timer = setTimeout(() => {
const testFile = './tests/3rd Order Ambi Clock Test.wav';
const SEEK_TIME = 10;
const data = await captureStream(testFile, SEEK_TIME);
const EBML_HEADER = Buffer.from([0x1A, 0x45, 0xDF, 0xA3]);
const actualHeader = data.subarray(0, 4);
const dumpPath = './temp_seek_test.webm';
```

### `./scripts/verify-stream-endpoint.js`
```
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEST_FILE_PATH = path.resolve(__dirname, '../test_input.wav');
const EXISTING_FILE = path.resolve(__dirname, '../test_000007.iamf');
const PORT = 45455;
const FILE_PARAM = encodeURIComponent(EXISTING_FILE);
const URL = `http://127.0.0.1:${PORT}/obr-stream?file=${FILE_PARAM}&channels=4&profile=ambient`;
const req = http.get(URL, (res) => {
let data = Buffer.alloc(0);
const MAX_BYTES = 100;
```

### `./scripts/test-stream-start.ts`
```
const PORT = 45455;
const HOST = '127.0.0.1';
const absPath = path.resolve(file);
const url = `http://${HOST}:${PORT}/obr-stream?file=${encodeURIComponent(absPath)}&channels=16&profile=ambient`;
const chunks: Buffer[] = [];
let totalSize = 0;
const req = http.get(url, (res) => {
const timer = setTimeout(() => {
const fileA = './tests/3rd Order Ambi Clock Test.wav';
const fileB = './tests/test_16ch.wav';
const startA = Date.now();
const dataA = await captureStream(fileA, 1500);
const startB = Date.now();
const dataB = await captureStream(fileB, 1500);
const EBML_HEADER = Buffer.from([0x1A, 0x45, 0xDF, 0xA3]);
const actualHeader = dataB.subarray(0, 4);
```

### `./scripts/test-hard-swap.ts`
```
class MockAudio {
const audio = new MockAudio();
let isPlayingState = true;
const hardSwap = async (newFile: string) => {
const startTime = Date.now();
const swapPromise = hardSwap('new-track.wav');
const duration = Date.now() - startTime;
```

### `./scripts/test-binaural.js`
```
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FFMPEG_PATH = path.join(__dirname, '../assets/bin/ffmpeg');
const INPUT_FILE = path.join(__dirname, '../tests/test_16ch.wav');
const OUTPUT_FILE = '/tmp/test-output.webm';
const SOFA_FILE = path.join(__dirname, '../assets/hrtf/Neumann_KU100_48k.sofa');
const HexadecagonalGrid = {
function generateFilterGraph() {
const grid = HexadecagonalGrid;
let panParts = [];
const chName = grid.channels[i];
const panFilter = `pan=hexadecagonal|${panParts.join('|')}`;
const speakerDefs = grid.nodes.map((n, i) => {
const chName = grid.channels[i];
const filterComplex = generateFilterGraph();
const args = [
const ffmpeg = spawn(FFMPEG_PATH, args);
let stderrBuffer = '';
let success = false;
const chunk = data.toString();
```

### `./scripts/test-frontend-url.ts`
```
let state = {
const MOCK_PROBE_RESPONSE = {
const PORT = 45455;
const server = http.createServer((req, res) => {
let url = generateUrl(state);
const data = await fetchProbe(state.currentFile);
function generateUrl(currentState: typeof state) {
const params = new URLSearchParams();
const res = await fetch(`http://127.0.0.1:${PORT}/probe-metadata?file=${encodeURIComponent(file)}`);
```

### `./scripts/test-file-switch-autoplay.ts`
```
class MockAudio {
class MockPlaybackContext {
const context = new MockPlaybackContext();
```

### `./xCleanup/legacy_apps/Ambix2IAMF/iamf-tools/gh_pages/web_demo/app_bundle.js`
```
function ba(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var d=a[b];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");}var w=ba(this);function x(a,b){if(b)a:{var d=w;a=a.split(".");for(var g=0;g<a.length-1;g++){var k=a[g];if(!(k in d))break a;d=d[k]}a=a[a.length-1];g=d[a];b=b(g);b!=g&&b!=null&&v(d,a,{configurable:!0,writable:!0,value:b})}}
function y(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:aa(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function da(a){for(var b,d=[];!(b=a.next()).done;)d.push(b.value);return d}function ea(a){return fa(a,a)}function fa(a,b){a.raw=b;Object.freeze&&(Object.freeze(a),Object.freeze(b));return a}function z(){this.l=!1;this.h=null;this.i=void 0;this.g=1;this.u=0;this.j=null}
function A(a){if(a.l)throw new TypeError("Generator is already running");a.l=!0}z.prototype.m=function(a){this.i=a};function B(a,b){a.j={ja:b,la:!0};a.g=a.u}z.prototype.return=function(a){this.j={return:a};this.g=this.u};function C(a,b,d){a.g=d;return{value:b}}function ha(a){this.g=new z;this.h=a}function ia(a,b){A(a.g);var d=a.g.h;if(d)return D(a,"return"in d?d["return"]:function(g){return{value:g,done:!0}},b,a.g.return);a.g.return(b);return I(a)}
function D(a,b,d,g){try{var k=b.call(a.g.h,d);if(!(k instanceof Object))throw new TypeError("Iterator result "+k+" is not an object");if(!k.done)return a.g.l=!1,k;var l=k.value}catch(f){return a.g.h=null,B(a.g,f),I(a)}a.g.h=null;g.call(a.g,l);return I(a)}function I(a){for(;a.g.g;)try{var b=a.h(a.g);if(b)return a.g.l=!1,{value:b.value,done:!1}}catch(d){a.g.i=void 0,B(a.g,d)}a.g.l=!1;if(a.g.j){b=a.g.j;a.g.j=null;if(b.la)throw b.ja;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function ja(a){this.next=function(b){A(a.g);a.g.h?b=D(a,a.g.h.next,b,a.g.m):(a.g.m(b),b=I(a));return b};this.throw=function(b){A(a.g);a.g.h?b=D(a,a.g.h["throw"],b,a.g.m):(B(a.g,b),b=I(a));return b};this.return=function(b){return ia(a,b)};this[Symbol.iterator]=function(){return this}}function ka(a){function b(g){return a.next(g)}function d(g){return a.throw(g)}return new Promise(function(g,k){function l(f){f.done?g(f.value):Promise.resolve(f.value).then(b,d).then(l,k)}l(a.next())})}
function J(a){return ka(new ja(new ha(a)))}function la(){for(var a=Number(this),b=[],d=a;d<arguments.length;d++)b[d-a]=arguments[d];return b}x("globalThis",function(a){return a||w});
function K(a,b){return Object.prototype.hasOwnProperty.call(a,b)}var ma=typeof Object.assign=="function"?Object.assign:function(a,b){for(var d=1;d<arguments.length;d++){var g=arguments[d];if(g)for(var k in g)K(g,k)&&(a[k]=g[k])}return a};x("Object.assign",function(a){return a||ma});
function oa(a){O=a;N=L=!1;O.B.addEventListener("click",pa);O.I.addEventListener("click",function(){N=!1;P();Q();O.timeline.redraw()});O.G.addEventListener("click",function(){N=!0;P();Q();O.timeline.redraw()});O.o.addEventListener("ended",qa);O.v.addEventListener("ended",qa);O.timeline.setIsBinauralGetter(function(){return N});O.timeline.setTimeControlGetter(ra);O.timeline.setTimeControlSetter(sa);O.B.textContent="\u23f5";P();Q()}
function pa(){L?ta():(L=!0,O.o.play(),O.v.play(),O.timeline.play(),O.video.hidden||O.video.play(),O.B.textContent="\u23f8")}function ra(){return O.o.currentTime/O.o.duration}function sa(a){a*=O.o.duration;O.o.currentTime=a;O.v.currentTime=a;O.video.currentTime=a}function ta(){L=!1;O.o.pause();O.v.pause();O.timeline.pause();O.video.hidden||O.video.pause();O.B.textContent="\u23f5"}function P(){O.o.muted=N;O.v.muted=!N}
function Q(){N?(O.I.classList.remove("activeButton"),O.G.classList.add("activeButton")):(O.I.classList.add("activeButton"),O.G.classList.remove("activeButton"))}function qa(){L=!1;O.timeline.pause();O.B.textContent="\u23f5"};function ua(a,b){var d=va(b);if(d%2!==0)throw Error("Number of samples, "+d+" is not a multiple of 2");return Aa(a,d/2,Ba.bind(null,b))}
function Aa(a,b,d){function g(h,m){e.setUint32(h,m,!0);return h+4}function k(h,m){e.setUint16(h,m,!0);return h+2}function l(h,m){for(var q=0;q<m.length;++q)e.setUint8(h+q,m.charCodeAt(q));return h+m.length}if(a<1||b<1)throw Error("Invalid arguments to createInt16WavFile");var f=b*2*2;b=new ArrayBuffer(44+f);var e=new DataView(b);var c=l(0,"RIFF");c=g(c,36+f);c=l(c,"WAVE");c=l(c,"fmt ");c=g(c,16);c=k(c,1);c=k(c,2);c=g(c,a);c=g(c,a*2*2);c=k(c,4);c=k(c,16);c=l(c,"data");c=g(c,f);if(c!==44)throw Error("We should have written exactly 44 bytes at this point.");
function R(a){return a.offset>=a.g.byteLength?(console.error("Trying to read offset "+a.offset+", outside of DataView range."),null):a.g.getUint8(a.offset++)}
function S(a){a:{var b=a.g;for(var d=a.offset,g=d,k=0,l=0;;){var f=b,e=d;try{var c=f.getUint8(e)}catch(h){h instanceof RangeError?console.error("RangeError in LEB128 parsing at offset "+e+"."):console.error("Error in LEB128 parsing at offset "+e+": "+h),c=null}f=c;if(f===null){b={value:null,V:0};break a}if(l>28||l===28&&(f&240)!==0){console.error("More than 32 bits in LEB128 parsing at offset "+d+".");b={value:null,V:d-g+1};break a}k+=(f&127)<<l>>>0;if((f&128)===0)break;l+=7;++d}b={value:k,V:d-g+
function Ga(a){var b=R(a);if(!b)return null;var d=(b&248)>>>3,g=!!(b&4),k=!!(b&2);b=!!(b&1);var l=S(a);if(!l)return null;var f=0,e=0;if(k){f=S(a);if(!f)return null;e=S(a);if(!e)return null}var c=null;if(b){c=S(a);if(!c)return null;if(a.offset+c>a.g.byteLength)console.error("Trying to read offset "+a.offset+", outside of DataView range."),c=null;else{var h=new Uint8Array(a.g.buffer,a.offset,c);a.offset+=c;c=h}if(!c)return null}return{aa:d,Ea:g,Ga:k,Da:b,Fa:l,Ba:f,Ca:e,za:c}};function Ha(a,b){if(a.endsWith(".mp4"))return console.log("Filename ends with .mp4, assuming it is an MP4 file."),!1;a=Ea(b);if(!a)return console.log("Failed to parse as a standalone IAMF file, assuming it is an MP4 file."),!1;console.log("Successfully parsed beginning of the file. ia_code: "+a.Z+", primary_profile: "+(a.qa+", additional_profile: ")+(a.ea+"."));if(a.Z===1767992678)return console.log("ia_code is 'iamf', so assuming it is a standalone IAMF file."),!0;console.log("ia_code does not match expected 'iamf', so assuming it is an MP4 file.");
function Ja(a){var b,d,g,k,l,f,e;return J(function(c){if(c.g==1){b=Ia.get(a);if(!b)return c.return(Promise.reject(Error("Demo file does not exist.")));console.log("Attempting to fetch IAMF file: "+b);d="application/octet-stream";g=performance.now();return C(c,fetch(b,{headers:{Accept:d}}),2)}if(c.g!=3){k=c.i;l=((performance.now()-g)/1E3).toFixed(3);if(!k.ok)return c.return(Promise.reject(Error("Could not load specified IAMF file: "+k.statusText)));f=k.headers.get("content-type");f!==d&&console.warn("Received content-type: "+
var l=document.getElementById("showAudioElementsCheckbox");if(!l)throw Error("No show audio elements checkbox could be found.");var f=document.getElementById("fileDrop");if(!f)throw Error("No file drop div could be found.");var e=document.getElementById("playPauseButton");if(!e)throw Error("No play/pause button could be found.");var c=document.getElementById("stereoButton");if(!c)throw Error("No stereo button could be found.");var h=document.getElementById("stereoPlayback");if(!h)throw Error("No stereo audio element found.");
var m=document.getElementById("binauralButton");if(!m)throw Error("No binaural button could be found.");var q=document.getElementById("binauralPlayback");if(!q)throw Error("No binaural audio element found.");var r=document.getElementById("videoPlayback");if(!r)throw Error("No video element found.");var t=document.getElementById("timelineCanvas");if(!t)throw Error("No timeline element found.");return{ma:a,D:b,T:d,ga:g,fa:k,ua:l,S:f,B:e,I:c,o:h,G:m,v:q,ca:r,wa:t}};var U=void 0,V=void 0;function Ma(a,b){U=a;V=b}
function Na(a,b,d,g,k,l,f,e){var c,h,m;J(function(q){c=!1;if(!U||U.byteLength===0)return e(c),f(),q.return();V||(console.error("No filename set for current IAMF bytes, setting to iamf_audio."),V="iamf_audio");h=new DataView(U);m=a(V,h);return m?C(q,Promise.all([Oa(d,b,k),Oa(g,b,l)]).then(function(r){var t=y(r);r=t.next().value;c=t.next().value||r}).catch(function(r){console.error("Error during decoding: ",r.message);f()}).finally(function(){e(c)}),0):(console.error("Only standalone IAMF files are supported at this point."),
var Pa=globalThis.trustedTypes,W;function Qa(){var a=null;if(!Pa)return a;try{var b=function(d){return d};a=Pa.createPolicy("goog#html",{createHTML:b,createScript:b,createScriptURL:b})}catch(d){}return a};function Ra(a){this.g=a}Ra.prototype.toString=function(){return this.g+""};function Sa(a){var b;W===void 0&&(W=Qa());a=(b=W)?b.createScriptURL(a):a;return new Ra(a)};function X(a){this.g=a}X.prototype.toString=function(){return this.g};function Ta(a){if(a instanceof X)return a.g;throw Error("");};function Ua(a){var b=window;if(typeof MediaSource!=="undefined"&&a instanceof MediaSource||typeof b.ManagedMediaSource!=="undefined"&&a instanceof b.ManagedMediaSource)return a=URL.createObjectURL(a),new X(a);b=a.type;b.toLowerCase()==="application/octet-stream"?b=!0:(b=b.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i),b=(b==null?void 0:b.length)===2&&(/^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif|avif|x-ms-bmp)$/i.test(b[1])||/^video\/(?:3gpp|avi|mpeg|mpg|mp4|ogg|webm|x-flv|x-matroska|quicktime|x-ms-wmv)$/i.test(b[1])||
function Ya(a){var b=b===void 0?{}:b;this.g=a;this.K=void 0;this.j=this.l=!0;this.m=!1;this.F=0;this.L=function(){return!1};this.O=function(){return-1};this.P=function(){};this.i=this.u=null;this.config=Object.assign({},Xa,b);this.h=this.g.getContext("2d",{willReadFrequently:!0});this.g.addEventListener("mousedown",this.na.bind(this));this.g.addEventListener("mousemove",this.oa.bind(this));this.g.addEventListener("mouseup",this.pa.bind(this));this.N=new ImageData(this.g.width,this.g.height);this.M=
function Za(a){a.K?a.h.putImageData(a.K,0,0):(a.h.clearRect(0,0,a.g.width,a.g.height),a.h.fillStyle=a.config.ba,a.h.font="24px Google Sans",a.h.fillText("Decoding...",10,30),a.K=a.h.getImageData(0,0,a.g.width,a.g.height))}
function Y(a){a.h.clearRect(0,0,a.g.width,a.g.height);a.L()?a.h.putImageData(a.M,0,0):a.h.putImageData(a.N,0,0);a.i&&(a.h.fillStyle=a.config.ta,a.h.fillRect(a.i.U,a.config.J,a.i.Y-a.i.U,a.g.height-2*a.config.J));var b=cb(a);a.h.fillStyle=a.config.ra;a.h.fillRect(b,a.config.J,a.config.sa,a.g.height-2*a.config.J)}function cb(a){var b=a.O();return!b||b<0?a.config.A:a.config.A+b*(a.g.width-2*a.config.A)};function db(a,b){a.checked=!1;a.addEventListener("change",function(){b.hidden=!a.checked})}function eb(a,b){return{ya:a.value,H:Number(b.value)}};var fb=new Map([["Animated demo (3rd-order ambisonics)","./data/videos/Animated_demo_720_silent.mp4"],["Animated demo (3rd-order ambisonics + stereo)","./data/videos/Animated_demo_720_silent.mp4"]]);
function gb(a,b){var d,g,k,l;J(function(f){if(f.g==1){d=fb.get(a);if(!d)return b.src="",b.hidden=!0,f.return();console.log("Video file: "+d);return C(f,fetch(d),2)}if(f.g!=3)return g=f.i,g.ok?C(f,g.arrayBuffer(),3):(b.src="",b.hidden=!0,console.warn("Failed to load video file: "+d),f.return());k=f.i;l=new Blob([k],{type:"video/mp4"});b.src=Ta(Ua(l));b.hidden=!1;f.g=0})};function hb(a){var b=Worker;if(a instanceof Ra)a=a.g;else throw Error("");return new b(a,void 0)};var ib=ea(["./decoder_worker_bundle.js"]);function Z(a,b){var d=this;this.binaural=a;this.j=b;this.g=a?"Binaural":"Stereo";a=Va(ib);this.i=hb(a);this.i.addEventListener("message",this.m.bind(this));this.i.addEventListener("error",function(g){console.log("Error from "+d.g+" worker: "+g.message)});this.i.addEventListener("messageerror",function(g){console.log("Message error from "+d.g+" worker: "+g)});this.i.postMessage({eventType:"CREATE_DECODER"})}
function Oa(a,b,d){var g=U,k=V;return J(function(l){if(l.g==1){if(a.j)throw Error("Worker is not ready, wait for workerReadyCallback.");console.log("Starting "+a.g+" decoding.");return C(l,new Promise(a.l.bind(a,g,k,b,d)),2)}return l.return(l.i)})}
function jb(a,b){if(a.h){var d=a.h,g=!1;console.log(a.g+" decoding took approximately "+((performance.now()-d.start)/1E3).toFixed(1)+" seconds.");if(b&&b.length>0){g=!0;var k=(b.reduce(function(l,f){return l+f.length},0)/d.H/2).toFixed(3);console.log(a.g+" audio output is "+k+" seconds long.");k=d.ka+"_"+(a.binaural?"binaural":"loudspeakers_A")+"_"+d.H+"Hz.wav";b=ua(d.H,b);d.ia(b,k)}a.h.resolve(g);a.h=void 0}else console.log("{this.layoutString} decoder reporting done without decodingRunState present.")}
```

### `./xCleanup/legacy_apps/Ambix2IAMF/iamf-tools/gh_pages/web_demo/decoder_worker_bundle.js`
```
function t(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var d=a[b];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");}var u=t(this);function v(a,b){if(b)a:{var d=u;a=a.split(".");for(var f=0;f<a.length-1;f++){var k=a[f];if(!(k in d))break a;d=d[k]}a=a[a.length-1];f=d[a];b=b(f);b!=f&&b!=null&&r(d,a,{configurable:!0,writable:!0,value:b})}}
function x(a){var b=typeof Symbol!="undefined"&&Symbol.iterator&&a[Symbol.iterator];if(b)return b.call(a);if(typeof a.length=="number")return{next:n(a)};throw Error(String(a)+" is not an iterable or ArrayLike");}function y(a){if(!(a instanceof Array)){a=x(a);for(var b,d=[];!(b=a.next()).done;)d.push(b.value);a=d}return a}function z(a){return A(a,a)}function A(a,b){a.raw=b;Object.freeze&&(Object.freeze(a),Object.freeze(b));return a}
function E(){this.j=!1;this.h=null;this.m=void 0;this.g=1;this.o=0;this.i=null}function F(a){if(a.j)throw new TypeError("Generator is already running");a.j=!0}E.prototype.l=function(a){this.m=a};function G(a,b){a.i={H:b,I:!0};a.g=a.o}E.prototype.return=function(a){this.i={return:a};this.g=this.o};function H(a,b,d){a.g=d;return{value:b}}function I(a){this.g=new E;this.h=a}
function J(a,b){F(a.g);var d=a.g.h;if(d)return K(a,"return"in d?d["return"]:function(f){return{value:f,done:!0}},b,a.g.return);a.g.return(b);return L(a)}function K(a,b,d,f){try{var k=b.call(a.g.h,d);if(!(k instanceof Object))throw new TypeError("Iterator result "+k+" is not an object");if(!k.done)return a.g.j=!1,k;var l=k.value}catch(c){return a.g.h=null,G(a.g,c),L(a)}a.g.h=null;f.call(a.g,l);return L(a)}
function L(a){for(;a.g.g;)try{var b=a.h(a.g);if(b)return a.g.j=!1,{value:b.value,done:!1}}catch(d){a.g.m=void 0,G(a.g,d)}a.g.j=!1;if(a.g.i){b=a.g.i;a.g.i=null;if(b.I)throw b.H;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function M(a){this.next=function(b){F(a.g);a.g.h?b=K(a,a.g.h.next,b,a.g.l):(a.g.l(b),b=L(a));return b};this.throw=function(b){F(a.g);a.g.h?b=K(a,a.g.h["throw"],b,a.g.l):(G(a.g,b),b=L(a));return b};this.return=function(b){return J(a,b)};this[Symbol.iterator]=function(){return this}}function N(a){function b(f){return a.next(f)}function d(f){return a.throw(f)}return new Promise(function(f,k){function l(c){c.done?f(c.value):Promise.resolve(c.value).then(b,d).then(l,k)}l(a.next())})}
function O(){for(var a=Number(this),b=[],d=a;d<arguments.length;d++)b[d-a]=arguments[d];return b}v("globalThis",function(a){return a||u});
var P=globalThis.trustedTypes,Q;function R(){var a=null;if(!P)return a;try{var b=function(d){return d};a=P.createPolicy("goog#html",{createHTML:b,createScript:b,createScriptURL:b})}catch(d){}return a};function S(a){this.g=a}S.prototype.toString=function(){return this.g+""};function T(a){var b;Q===void 0&&(Q=R());a=(b=Q)?b.createScriptURL(a):a;return new S(a)};function U(a){a.importScripts.apply(a,y(O.apply(1,arguments).map(function(b){if(b instanceof S)b=b.g;else throw Error("");return b})))};function V(a){var b=O.apply(1,arguments);if(b.length===0)return T(a[0]);for(var d=a[0],f=0;f<b.length;f++)d+=encodeURIComponent(b[f])+a[f+1];return T(d)};var W=z(["./decoder/wasm/wrapper.js"]),X=!1,Y;self.addEventListener("message",function(a){return N(new M(new I(function(b){if(b.g==1){switch(a.data.eventType){case "CREATE_DECODER":b.g=2;return;case "DECODE_STANDALONE_IAMF":aa(a.data.eventData);break;default:Z("Worker received unhandled message: "+JSON.stringify(a,["type","data","message"]))}b.g=0}else return b.g!=4?b=H(b,ba().then(function(){X=!0}).catch(function(d){X=!1;Z(d.message)}),4):(b.g=0,b=void 0),b})))});
function Z(a){postMessage({eventType:"ERROR",message:a})}function ba(){var a;return N(new M(new I(function(b){if(b.g==1)return U(self,V(W)),H(b,loadWasmModule({locateFile:function(d){return"./decoder/wasm/"+d}}),2);Y=b.m;a={eventType:"DECODER_CREATED",outputBuffers:void 0};postMessage(a);b.g=0})))}
function aa(a){if(X){var b=new Y.DecoderWrapper;if(a=b.SetupStandaloneIamfDecoder(a.iamfBytes,a.sampleRate,a.binaural))Z("Failed to configure decoding with the provided IAMF bytes.  This is likely due to invalid IAMF content. Decoder status: "+a),b.delete();else{for(a=[];;){var d=b.Decode();if(!d)break;if(typeof d==="string"){Z(d);return}a.push(d.slice())}b.delete();postMessage({eventType:"DECODE_DONE",outputBuffers:a})}}else Z("Decoding attempted before worker is ready.")};
```

### `./xCleanup/legacy_apps/Ambix2IAMF/iamf-tools/gh_pages/web_demo/decoder/wasm/wrapper.js`
```
var loadWasmModule = (() => {
var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
var moduleRtn;
var Module=moduleArg;var readyPromiseResolve,readyPromiseReject;var readyPromise=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject});var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=true;var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptName){scriptDirectory=_scriptName}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.slice(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=async url=>{var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];var wasmBinary=Module["wasmBinary"];var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAP64,HEAPU64,HEAPF64;var runtimeInitialized=false;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b);Module["HEAP64"]=HEAP64=new BigInt64Array(b);Module["HEAPU64"]=HEAPU64=new BigUint64Array(b)}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(onPreRuns)}function initRuntime(){runtimeInitialized=true;if(!Module["noFSInit"]&&!FS.initialized)FS.init();TTY.init();wasmExports["K"]();FS.ignorePermissions=false}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(onPostRuns)}var runDependencies=0;var dependenciesFulfilled=null;function getUniqueRunDependency(id){return id}function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var wasmBinaryFile;function findWasmBinary(){return locateFile("wrapper.wasm")}function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(!wasmBinary){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"){try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){return{a:wasmImports}}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmExports=applySignatureConversions(wasmExports);wasmMemory=wasmExports["J"];updateMemoryViews();wasmTable=wasmExports["L"];removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){return receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){return new Promise((resolve,reject)=>{Module["instantiateWasm"](info,(mod,inst)=>{receiveInstance(mod,inst);resolve(mod.exports)})})}wasmBinaryFile??=findWasmBinary();try{var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);var exports=receiveInstantiationResult(result);return exports}catch(e){readyPromiseReject(e);return Promise.reject(e)}}var ASM_CONSTS={1768924:()=>{debugger},1768937:()=>typeof wasmOffsetConverter!=="undefined"};function em_severity_log(severity,severityName,message){if(typeof globalThis==="object"&&typeof globalThis["Module"]==="object"&&typeof globalThis["Module"]["log"]==="function"){globalThis["Module"]["log"](severity,UTF8ToString(severityName),UTF8ToString(message))}else{var loggers=[console.log,console.warn,console.error];loggers[severity].call(console,UTF8ToString(severityName)+" "+UTF8ToString(message)+"\n")}}function HaveOffsetConverter(){return typeof wasmOffsetConverter!=="undefined"}class ExitStatus{constructor(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var onPostRuns=[];var addOnPostRun=cb=>onPostRuns.unshift(cb);var onPreRuns=[];var addOnPreRun=cb=>onPreRuns.unshift(cb);var noExitRuntime=Module["noExitRuntime"]||true;class ExceptionInfo{constructor(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24}set_type(type){HEAPU32[this.ptr+4>>>2>>>0]=type}get_type(){return HEAPU32[this.ptr+4>>>2>>>0]}set_destructor(destructor){HEAPU32[this.ptr+8>>>2>>>0]=destructor}get_destructor(){return HEAPU32[this.ptr+8>>>2>>>0]}set_caught(caught){caught=caught?1:0;HEAP8[this.ptr+12>>>0]=caught}get_caught(){return HEAP8[this.ptr+12>>>0]!=0}set_rethrown(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13>>>0]=rethrown}get_rethrown(){return HEAP8[this.ptr+13>>>0]!=0}init(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor)}set_adjusted_ptr(adjustedPtr){HEAPU32[this.ptr+16>>>2>>>0]=adjustedPtr}get_adjusted_ptr(){return HEAPU32[this.ptr+16>>>2>>>0]}}var exceptionLast=0;var uncaughtExceptionCount=0;var INT53_MAX=9007199254740992;var INT53_MIN=-9007199254740992;var bigintToI53Checked=num=>num<INT53_MIN||num>INT53_MAX?NaN:Number(num);function ___cxa_throw(ptr,type,destructor){ptr>>>=0;type>>>=0;destructor>>>=0;var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw exceptionLast}var __abort_js=()=>abort("");var embindRepr=v=>{if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}};var embind_init_charCodes=()=>{var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes};var embind_charCodes;var readLatin1String=ptr=>{var ret="";var c=ptr;while(HEAPU8[c>>>0]){ret+=embind_charCodes[HEAPU8[c++>>>0]]}return ret};var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var BindingError;var throwBindingError=message=>{throw new BindingError(message)};var InternalError;var throwInternalError=message=>{throw new InternalError(message)};var whenDependentTypesAreResolved=(myTypes,dependentTypes,getTypeConverters)=>{myTypes.forEach(type=>typeDependencies[type]=dependentTypes);function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach((dt,i)=>{if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(()=>{typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}});if(0===unregisteredTypes.length){onComplete(typeConverters)}};function sharedRegisterType(rawType,registeredInstance,options={}){var name=registeredInstance.name;if(!rawType){throwBindingError(`type "${name}" must have a positive integer typeid pointer`)}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError(`Cannot register type '${name}' twice`)}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(cb=>cb())}}function registerType(rawType,registeredInstance,options={}){return sharedRegisterType(rawType,registeredInstance,options)}var integerReadValueFromPointer=(name,width,signed)=>{switch(width){case 1:return signed?pointer=>HEAP8[pointer>>>0]:pointer=>HEAPU8[pointer>>>0];case 2:return signed?pointer=>HEAP16[pointer>>>1>>>0]:pointer=>HEAPU16[pointer>>>1>>>0];case 4:return signed?pointer=>HEAP32[pointer>>>2>>>0]:pointer=>HEAPU32[pointer>>>2>>>0];case 8:return signed?pointer=>HEAP64[pointer>>>3]:pointer=>HEAPU64[pointer>>>3];default:throw new TypeError(`invalid integer width (${width}): ${name}`)}};function __embind_register_bigint(primitiveType,name,size,minRange,maxRange){primitiveType>>>=0;name>>>=0;size>>>=0;name=readLatin1String(name);var isUnsignedType=name.indexOf("u")!=-1;if(isUnsignedType){maxRange=(1n<<64n)-1n}registerType(primitiveType,{name,fromWireType:value=>value,toWireType:function(destructors,value){if(typeof value!="bigint"&&typeof value!="number"){throw new TypeError(`Cannot convert "${embindRepr(value)}" to ${this.name}`)}if(typeof value=="number"){value=BigInt(value)}return value},argPackAdvance:GenericWireTypeSize,readValueFromPointer:integerReadValueFromPointer(name,size,!isUnsignedType),destructorFunction:null})}var GenericWireTypeSize=8;function __embind_register_bool(rawType,name,trueValue,falseValue){rawType>>>=0;name>>>=0;name=readLatin1String(name);registerType(rawType,{name,fromWireType:function(wt){return!!wt},toWireType:function(destructors,o){return o?trueValue:falseValue},argPackAdvance:GenericWireTypeSize,readValueFromPointer:function(pointer){return this["fromWireType"](HEAPU8[pointer>>>0])},destructorFunction:null})}var shallowCopyInternalPointer=o=>({count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType});var throwInstanceAlreadyDeleted=obj=>{function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted")};var finalizationRegistry=false;var detachFinalizer=handle=>{};var runDestructor=$$=>{if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr)}else{$$.ptrType.registeredClass.rawDestructor($$.ptr)}};var releaseClassHandle=$$=>{$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete){runDestructor($$)}};var downcastPointer=(ptr,ptrClass,desiredClass)=>{if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)};var registeredPointers={};var registeredInstances={};var getBasestPointer=(class_,ptr)=>{if(ptr===undefined){throwBindingError("ptr should not be undefined")}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass}return ptr};var getInheritedInstance=(class_,ptr)=>{ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]};var makeClassHandle=(prototype,record)=>{if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType")}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified")}record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record,writable:true}}))};function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType}else{toType=registeredPointerRecord.pointerType}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}var attachFinalizer=handle=>{if("undefined"===typeof FinalizationRegistry){attachFinalizer=handle=>handle;return handle}finalizationRegistry=new FinalizationRegistry(info=>{releaseClassHandle(info.$$)});attachFinalizer=handle=>{var $$=handle.$$;var hasSmartPtr=!!$$.smartPtr;if(hasSmartPtr){var info={$$};finalizationRegistry.register(handle,info,handle)}return handle};detachFinalizer=handle=>finalizationRegistry.unregister(handle);return attachFinalizer(handle)};var deletionQueue=[];var flushPendingDeletes=()=>{while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]()}};var delayFunction;var init_ClassHandle=()=>{Object.assign(ClassHandle.prototype,{isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;other.$$=other.$$;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass}return leftClass===rightClass&&left===right},clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else{var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}},delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined}},isDeleted(){return!this.$$.ptr},deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes)}this.$$.deleteScheduled=true;return this}})};function ClassHandle(){}var createNamedFunction=(name,func)=>Object.defineProperty(func,"name",{value:name});var ensureOverloadTable=(proto,methodName,humanName)=>{if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(...args){if(!proto[methodName].overloadTable.hasOwnProperty(args.length)){throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`)}return proto[methodName].overloadTable[args.length].apply(this,args)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}};var exposePublicSymbol=(name,value,numArguments)=>{if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError(`Cannot register public name '${name}' twice`)}ensureOverloadTable(Module,name,name);if(Module[name].overloadTable.hasOwnProperty(numArguments)){throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`)}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}};var char_0=48;var char_9=57;var makeLegalFunctionName=name=>{name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return`_${name}`}return name};function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[]}var upcastPointer=(ptr,ptrClass,desiredClass)=>{while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`)}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass}return ptr};function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}return 0}if(!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr)}return ptr}else{return 0}}if(!handle||!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal")}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`)}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,Emval.toHandle(()=>clonedHandle["delete"]()));if(destructors!==null){destructors.push(this.rawDestructor,ptr)}}break;default:throwBindingError("Unsupporting sharing policy")}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}return 0}if(!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}if(handle.$$.ptrType.isConst){throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function readPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>>2>>>0])}var init_RegisteredPointer=()=>{Object.assign(RegisteredPointer.prototype,{getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr)}return ptr},destructor(ptr){this.rawDestructor?.(ptr)},argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,fromWireType:RegisteredPointer_fromWireType})};function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null}}else{this["toWireType"]=genericPointerToWireType}}var replacePublicSymbol=(name,value,numArguments)=>{if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistent public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}};var wasmTableMirror=[];var wasmTable;var getWasmTableEntry=funcPtr=>{var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func};var dynCall=(sig,ptr,args=[])=>{var rtn=getWasmTableEntry(ptr)(...args);return sig[0]=="p"?rtn>>>0:rtn};var getDynCaller=(sig,ptr)=>(...args)=>dynCall(sig,ptr,args);var embind__requireFunction=(signature,rawFunction)=>{signature=readLatin1String(signature);function makeDynCaller(){if(signature.includes("p")){return getDynCaller(signature,rawFunction)}return getWasmTableEntry(rawFunction)}var fp=makeDynCaller();if(typeof fp!="function"){throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`)}return fp};var extendError=(baseErrorType,errorName)=>{var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else{return`${this.name}: ${this.message}`}};return errorClass};var UnboundTypeError;var getTypeName=type=>{var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv};var throwUnboundTypeError=(message,types)=>{var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(`${message}: `+unboundTypes.map(getTypeName).join([", "]))};function __embind_register_class(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor){rawType>>>=0;rawPointerType>>>=0;rawConstPointerType>>>=0;baseClassRawType>>>=0;getActualTypeSignature>>>=0;getActualType>>>=0;upcastSignature>>>=0;upcast>>>=0;downcastSignature>>>=0;downcast>>>=0;name>>>=0;destructorSignature>>>=0;rawDestructor>>>=0;name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);upcast&&=embind__requireFunction(upcastSignature,upcast);downcast&&=embind__requireFunction(downcastSignature,downcast);rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError(`Cannot construct ${name} due to unbound types`,[baseClassRawType])});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],base=>{base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype}else{basePrototype=ClassHandle.prototype}var constructor=createNamedFunction(name,function(...args){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[args.length];if(undefined===body){throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`)}return body.apply(this,args)});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);if(registeredClass.baseClass){registeredClass.baseClass.__derivedClasses??=[];registeredClass.baseClass.__derivedClasses.push(registeredClass)}var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter]})}var heap32VectorToArray=(count,firstElement)=>{var array=[];for(var i=0;i<count;i++){array.push(HEAPU32[firstElement+i*4>>>2>>>0])}return array};var runDestructors=destructors=>{while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}};function usesDestructorStack(argTypes){for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){return true}}return false}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc,isAsync){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=usesDestructorStack(argTypes);var returns=argTypes[0].name!=="void";var expectedArgCount=argCount-2;var argsWired=new Array(expectedArgCount);var invokerFuncArgs=[];var destructors=[];var invokerFn=function(...args){destructors.length=0;var thisWired;invokerFuncArgs.length=isClassMethodFunc?2:1;invokerFuncArgs[0]=cppTargetFunc;if(isClassMethodFunc){thisWired=argTypes[1]["toWireType"](destructors,this);invokerFuncArgs[1]=thisWired}for(var i=0;i<expectedArgCount;++i){argsWired[i]=argTypes[i+2]["toWireType"](destructors,args[i]);invokerFuncArgs.push(argsWired[i])}var rv=cppInvokerFunc(...invokerFuncArgs);function onDone(rv){if(needsDestructorStack){runDestructors(destructors)}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;i++){var param=i===1?thisWired:argsWired[i-2];if(argTypes[i].destructorFunction!==null){argTypes[i].destructorFunction(param)}}}if(returns){return argTypes[0]["fromWireType"](rv)}}return onDone(rv)};return createNamedFunction(humanName,invokerFn)}var __embind_register_class_constructor=function(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor){rawClassType>>>=0;rawArgTypesAddr>>>=0;invokerSignature>>>=0;invoker>>>=0;rawConstructor>>>=0;var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`constructor ${classType.name}`;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[]}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount-1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`)}classType.registeredClass.constructor_body[argCount-1]=()=>{throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`,rawArgTypes)};whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{argTypes.splice(1,0,null);classType.registeredClass.constructor_body[argCount-1]=craftInvokerFunction(humanName,argTypes,null,invoker,rawConstructor);return[]});return[]})};var getFunctionName=signature=>{signature=signature.trim();const argsIndex=signature.indexOf("(");if(argsIndex===-1)return signature;return signature.slice(0,argsIndex)};var __embind_register_class_function=function(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual,isAsync,isNonnullReturn){rawClassType>>>=0;methodName>>>=0;rawArgTypesAddr>>>=0;invokerSignature>>>=0;rawInvoker>>>=0;context>>>=0;var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);methodName=getFunctionName(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`${classType.name}.${methodName}`;if(methodName.startsWith("@@")){methodName=Symbol[methodName.substring(2)]}if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName)}function unboundTypesHandler(){throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`,rawArgTypes)}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler}whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context,isAsync);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction}else{proto[methodName].overloadTable[argCount-2]=memberFunction}return[]});return[]})};var emval_freelist=[];var emval_handles=[];function __emval_decref(handle){handle>>>=0;if(handle>9&&0===--emval_handles[handle+1]){emval_handles[handle]=undefined;emval_freelist.push(handle)}}var count_emval_handles=()=>emval_handles.length/2-5-emval_freelist.length;var init_emval=()=>{emval_handles.push(0,1,undefined,1,null,1,true,1,false,1);Module["count_emval_handles"]=count_emval_handles};var Emval={toValue:handle=>{if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle)}return emval_handles[handle]},toHandle:value=>{switch(value){case undefined:return 2;case null:return 4;case true:return 6;case false:return 8;default:{const handle=emval_freelist.pop()||emval_handles.length;emval_handles[handle]=value;emval_handles[handle+1]=1;return handle}}}};var EmValType={name:"emscripten::val",fromWireType:handle=>{var rv=Emval.toValue(handle);__emval_decref(handle);return rv},toWireType:(destructors,value)=>Emval.toHandle(value),argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,destructorFunction:null};function __embind_register_emval(rawType){rawType>>>=0;return registerType(rawType,EmValType)}var floatReadValueFromPointer=(name,width)=>{switch(width){case 4:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>>2>>>0])};case 8:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>>3>>>0])};default:throw new TypeError(`invalid float width (${width}): ${name}`)}};var __embind_register_float=function(rawType,name,size){rawType>>>=0;name>>>=0;size>>>=0;name=readLatin1String(name);registerType(rawType,{name,fromWireType:value=>value,toWireType:(destructors,value)=>value,argPackAdvance:GenericWireTypeSize,readValueFromPointer:floatReadValueFromPointer(name,size),destructorFunction:null})};function __embind_register_integer(primitiveType,name,size,minRange,maxRange){primitiveType>>>=0;name>>>=0;size>>>=0;name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var fromWireType=value=>value;if(minRange===0){var bitshift=32-8*size;fromWireType=value=>value<<bitshift>>>bitshift}var isUnsignedType=name.includes("unsigned");var checkAssertions=(value,toTypeName)=>{};var toWireType;if(isUnsignedType){toWireType=function(destructors,value){checkAssertions(value,this.name);return value>>>0}}else{toWireType=function(destructors,value){checkAssertions(value,this.name);return value}}registerType(primitiveType,{name,fromWireType,toWireType,argPackAdvance:GenericWireTypeSize,readValueFromPointer:integerReadValueFromPointer(name,size,minRange!==0),destructorFunction:null})}function __embind_register_memory_view(rawType,dataTypeIndex,name){rawType>>>=0;name>>>=0;var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){var size=HEAPU32[handle>>>2>>>0];var data=HEAPU32[handle+4>>>2>>>0];return new TA(HEAP8.buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name,fromWireType:decodeMemoryView,argPackAdvance:GenericWireTypeSize,readValueFromPointer:decodeMemoryView},{ignoreDuplicateRegistrations:true})}var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{outIdx>>>=0;if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++>>>0]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++>>>0]=192|u>>6;heap[outIdx++>>>0]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++>>>0]=224|u>>12;heap[outIdx++>>>0]=128|u>>6&63;heap[outIdx++>>>0]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++>>>0]=240|u>>18;heap[outIdx++>>>0]=128|u>>12&63;heap[outIdx++>>>0]=128|u>>6&63;heap[outIdx++>>>0]=128|u&63}}heap[outIdx>>>0]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var UTF8Decoder=new TextDecoder;var UTF8ToString=(ptr,maxBytesToRead)=>{ptr>>>=0;if(!ptr)return"";var maxPtr=ptr+maxBytesToRead;for(var end=ptr;!(end>=maxPtr)&&HEAPU8[end>>>0];)++end;return UTF8Decoder.decode(HEAPU8.subarray(ptr>>>0,end>>>0))};function __embind_register_std_string(rawType,name){rawType>>>=0;name>>>=0;name=readLatin1String(name);var stdStringIsUTF8=true;registerType(rawType,{name,fromWireType(value){var length=HEAPU32[value>>>2>>>0];var payload=value+4;var str;if(stdStringIsUTF8){var decodeStartPtr=payload;for(var i=0;i<=length;++i){var currentBytePtr=payload+i;if(i==length||HEAPU8[currentBytePtr>>>0]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+1}}}else{var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[payload+i>>>0])}str=a.join("")}_free(value);return str},toWireType(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}var length;var valueIsOfTypeString=typeof value=="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string")}if(stdStringIsUTF8&&valueIsOfTypeString){length=lengthBytesUTF8(value)}else{length=value.length}var base=_malloc(4+length+1);var ptr=base+4;HEAPU32[base>>>2>>>0]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr,length+1)}else{if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(base);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+i>>>0]=charCode}}else{for(var i=0;i<length;++i){HEAPU8[ptr+i>>>0]=value[i]}}}if(destructors!==null){destructors.push(_free,base)}return base},argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr)}})}var UTF16Decoder=new TextDecoder("utf-16le");var UTF16ToString=(ptr,maxBytesToRead)=>{var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx>>>0])++idx;endPtr=idx<<1;return UTF16Decoder.decode(HEAPU8.subarray(ptr>>>0,endPtr>>>0))};var stringToUTF16=(str,outPtr,maxBytesToWrite)=>{maxBytesToWrite??=2147483647;if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>>1>>>0]=codeUnit;outPtr+=2}HEAP16[outPtr>>>1>>>0]=0;return outPtr-startPtr};var lengthBytesUTF16=str=>str.length*2;var UTF32ToString=(ptr,maxBytesToRead)=>{var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>>2>>>0];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}return str};var stringToUTF32=(str,outPtr,maxBytesToWrite)=>{outPtr>>>=0;maxBytesToWrite??=2147483647;if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>>2>>>0]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>>2>>>0]=0;return outPtr-startPtr};var lengthBytesUTF32=str=>{var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len};var __embind_register_std_wstring=function(rawType,charSize,name){rawType>>>=0;charSize>>>=0;name>>>=0;name=readLatin1String(name);var decodeString,encodeString,readCharAt,lengthBytesUTF;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;readCharAt=pointer=>HEAPU16[pointer>>>1>>>0]}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;readCharAt=pointer=>HEAPU32[pointer>>>2>>>0]}registerType(rawType,{name,fromWireType:value=>{var length=HEAPU32[value>>>2>>>0];var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||readCharAt(currentBytePtr)==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+charSize}}_free(value);return str},toWireType:(destructors,value)=>{if(!(typeof value=="string")){throwBindingError(`Cannot pass non-string to C++ string type ${name}`)}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>>2>>>0]=length/charSize;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr)}return ptr},argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr)}})};var __embind_register_void=function(rawType,name){rawType>>>=0;name>>>=0;name=readLatin1String(name);registerType(rawType,{isVoid:true,name,argPackAdvance:0,fromWireType:()=>undefined,toWireType:(destructors,o)=>undefined})};function __emval_new_u8string(v){v>>>=0;return Emval.toHandle(UTF8ToString(v))}var requireRegisteredType=(rawType,humanName)=>{var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`)}return impl};function __emval_take_value(type,arg){type>>>=0;arg>>>=0;type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](arg);return Emval.toHandle(v)}var PATH={isAbs:path=>path.charAt(0)==="/",splitPath:filename=>{var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return splitPathRe.exec(filename).slice(1)},normalizeArray:(parts,allowAboveRoot)=>{var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up;up--){parts.unshift("..")}}return parts},normalize:path=>{var isAbsolute=PATH.isAbs(path),trailingSlash=path.slice(-1)==="/";path=PATH.normalizeArray(path.split("/").filter(p=>!!p),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path},dirname:path=>{var result=PATH.splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.slice(0,-1)}return root+dir},basename:path=>path&&path.match(/([^\/]+|\/)\/*$/)[1],join:(...paths)=>PATH.normalize(paths.join("/")),join2:(l,r)=>PATH.normalize(l+"/"+r)};var initRandomFill=()=>view=>crypto.getRandomValues(view);var randomFill=view=>{(randomFill=initRandomFill())(view)};var PATH_FS={resolve:(...args)=>{var resolvedPath="",resolvedAbsolute=false;for(var i=args.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?args[i]:FS.cwd();if(typeof path!="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){return""}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=PATH.isAbs(path)}resolvedPath=PATH.normalizeArray(resolvedPath.split("/").filter(p=>!!p),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."},relative:(from,to)=>{from=PATH_FS.resolve(from).slice(1);to=PATH_FS.resolve(to).slice(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")}};var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead=NaN)=>{idx>>>=0;var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;return UTF8Decoder.decode(heapOrArray.buffer?heapOrArray.subarray(idx,endPtr):new Uint8Array(heapOrArray.slice(idx,endPtr)))};var FS_stdin_getChar_buffer=[];var intArrayFromString=(stringy,dontAddNull,length)=>{var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array};var FS_stdin_getChar=()=>{if(!FS_stdin_getChar_buffer.length){var result=null;{}if(!result){return null}FS_stdin_getChar_buffer=intArrayFromString(result,true)}return FS_stdin_getChar_buffer.shift()};var TTY={ttys:[],init(){},shutdown(){},register(dev,ops){TTY.ttys[dev]={input:[],output:[],ops};FS.registerDevice(dev,TTY.stream_ops)},stream_ops:{open(stream){var tty=TTY.ttys[stream.node.rdev];if(!tty){throw new FS.ErrnoError(43)}stream.tty=tty;stream.seekable=false},close(stream){stream.tty.ops.fsync(stream.tty)},fsync(stream){stream.tty.ops.fsync(stream.tty)},read(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.get_char){throw new FS.ErrnoError(60)}var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=stream.tty.ops.get_char(stream.tty)}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.atime=Date.now()}return bytesRead},write(stream,buffer,offset,length,pos){if(!stream.tty||!stream.tty.ops.put_char){throw new FS.ErrnoError(60)}try{for(var i=0;i<length;i++){stream.tty.ops.put_char(stream.tty,buffer[offset+i])}}catch(e){throw new FS.ErrnoError(29)}if(length){stream.node.mtime=stream.node.ctime=Date.now()}return i}},default_tty_ops:{get_char(tty){return FS_stdin_getChar()},put_char(tty,val){if(val===null||val===10){out(UTF8ArrayToString(tty.output));tty.output=[]}else{if(val!=0)tty.output.push(val)}},fsync(tty){if(tty.output?.length>0){out(UTF8ArrayToString(tty.output));tty.output=[]}},ioctl_tcgets(tty){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},ioctl_tcsets(tty,optional_actions,data){return 0},ioctl_tiocgwinsz(tty){return[24,80]}},default_tty1_ops:{put_char(tty,val){if(val===null||val===10){err(UTF8ArrayToString(tty.output));tty.output=[]}else{if(val!=0)tty.output.push(val)}},fsync(tty){if(tty.output?.length>0){err(UTF8ArrayToString(tty.output));tty.output=[]}}}};var zeroMemory=(address,size)=>{HEAPU8.fill(0,address,address+size)};var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var mmapAlloc=size=>{size=alignMemory(size,65536);var ptr=_emscripten_builtin_memalign(65536,size);if(ptr)zeroMemory(ptr,size);return ptr};var MEMFS={ops_table:null,mount(mount){return MEMFS.createNode(null,"/",16895,0)},createNode(parent,name,mode,dev){if(FS.isBlkdev(mode)||FS.isFIFO(mode)){throw new FS.ErrnoError(63)}MEMFS.ops_table||={dir:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,lookup:MEMFS.node_ops.lookup,mknod:MEMFS.node_ops.mknod,rename:MEMFS.node_ops.rename,unlink:MEMFS.node_ops.unlink,rmdir:MEMFS.node_ops.rmdir,readdir:MEMFS.node_ops.readdir,symlink:MEMFS.node_ops.symlink},stream:{llseek:MEMFS.stream_ops.llseek}},file:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:{llseek:MEMFS.stream_ops.llseek,read:MEMFS.stream_ops.read,write:MEMFS.stream_ops.write,allocate:MEMFS.stream_ops.allocate,mmap:MEMFS.stream_ops.mmap,msync:MEMFS.stream_ops.msync}},link:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr,readlink:MEMFS.node_ops.readlink},stream:{}},chrdev:{node:{getattr:MEMFS.node_ops.getattr,setattr:MEMFS.node_ops.setattr},stream:FS.chrdev_stream_ops}};var node=FS.createNode(parent,name,mode,dev);if(FS.isDir(node.mode)){node.node_ops=MEMFS.ops_table.dir.node;node.stream_ops=MEMFS.ops_table.dir.stream;node.contents={}}else if(FS.isFile(node.mode)){node.node_ops=MEMFS.ops_table.file.node;node.stream_ops=MEMFS.ops_table.file.stream;node.usedBytes=0;node.contents=null}else if(FS.isLink(node.mode)){node.node_ops=MEMFS.ops_table.link.node;node.stream_ops=MEMFS.ops_table.link.stream}else if(FS.isChrdev(node.mode)){node.node_ops=MEMFS.ops_table.chrdev.node;node.stream_ops=MEMFS.ops_table.chrdev.stream}node.atime=node.mtime=node.ctime=Date.now();if(parent){parent.contents[name]=node;parent.atime=parent.mtime=parent.ctime=node.atime}return node},getFileDataAsTypedArray(node){if(!node.contents)return new Uint8Array(0);if(node.contents.subarray)return node.contents.subarray(0,node.usedBytes);return new Uint8Array(node.contents)},expandFileStorage(node,newCapacity){var prevCapacity=node.contents?node.contents.length:0;if(prevCapacity>=newCapacity)return;var CAPACITY_DOUBLING_MAX=1024*1024;newCapacity=Math.max(newCapacity,prevCapacity*(prevCapacity<CAPACITY_DOUBLING_MAX?2:1.125)>>>0);if(prevCapacity!=0)newCapacity=Math.max(newCapacity,256);var oldContents=node.contents;node.contents=new Uint8Array(newCapacity);if(node.usedBytes>0)node.contents.set(oldContents.subarray(0,node.usedBytes),0)},resizeFileStorage(node,newSize){if(node.usedBytes==newSize)return;if(newSize==0){node.contents=null;node.usedBytes=0}else{var oldContents=node.contents;node.contents=new Uint8Array(newSize);if(oldContents){node.contents.set(oldContents.subarray(0,Math.min(newSize,node.usedBytes)))}node.usedBytes=newSize}},node_ops:{getattr(node){var attr={};attr.dev=FS.isChrdev(node.mode)?node.id:1;attr.ino=node.id;attr.mode=node.mode;attr.nlink=1;attr.uid=0;attr.gid=0;attr.rdev=node.rdev;if(FS.isDir(node.mode)){attr.size=4096}else if(FS.isFile(node.mode)){attr.size=node.usedBytes}else if(FS.isLink(node.mode)){attr.size=node.link.length}else{attr.size=0}attr.atime=new Date(node.atime);attr.mtime=new Date(node.mtime);attr.ctime=new Date(node.ctime);attr.blksize=4096;attr.blocks=Math.ceil(attr.size/attr.blksize);return attr},setattr(node,attr){for(const key of["mode","atime","mtime","ctime"]){if(attr[key]!=null){node[key]=attr[key]}}if(attr.size!==undefined){MEMFS.resizeFileStorage(node,attr.size)}},lookup(parent,name){throw MEMFS.doesNotExistError},mknod(parent,name,mode,dev){return MEMFS.createNode(parent,name,mode,dev)},rename(old_node,new_dir,new_name){var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(new_node){if(FS.isDir(old_node.mode)){for(var i in new_node.contents){throw new FS.ErrnoError(55)}}FS.hashRemoveNode(new_node)}delete old_node.parent.contents[old_node.name];new_dir.contents[new_name]=old_node;old_node.name=new_name;new_dir.ctime=new_dir.mtime=old_node.parent.ctime=old_node.parent.mtime=Date.now()},unlink(parent,name){delete parent.contents[name];parent.ctime=parent.mtime=Date.now()},rmdir(parent,name){var node=FS.lookupNode(parent,name);for(var i in node.contents){throw new FS.ErrnoError(55)}delete parent.contents[name];parent.ctime=parent.mtime=Date.now()},readdir(node){return[".","..",...Object.keys(node.contents)]},symlink(parent,newname,oldpath){var node=MEMFS.createNode(parent,newname,511|40960,0);node.link=oldpath;return node},readlink(node){if(!FS.isLink(node.mode)){throw new FS.ErrnoError(28)}return node.link}},stream_ops:{read(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=stream.node.usedBytes)return 0;var size=Math.min(stream.node.usedBytes-position,length);if(size>8&&contents.subarray){buffer.set(contents.subarray(position,position+size),offset)}else{for(var i=0;i<size;i++)buffer[offset+i]=contents[position+i]}return size},write(stream,buffer,offset,length,position,canOwn){if(buffer.buffer===HEAP8.buffer){canOwn=false}if(!length)return 0;var node=stream.node;node.mtime=node.ctime=Date.now();if(buffer.subarray&&(!node.contents||node.contents.subarray)){if(canOwn){node.contents=buffer.subarray(offset,offset+length);node.usedBytes=length;return length}else if(node.usedBytes===0&&position===0){node.contents=buffer.slice(offset,offset+length);node.usedBytes=length;return length}else if(position+length<=node.usedBytes){node.contents.set(buffer.subarray(offset,offset+length),position);return length}}MEMFS.expandFileStorage(node,position+length);if(node.contents.subarray&&buffer.subarray){node.contents.set(buffer.subarray(offset,offset+length),position)}else{for(var i=0;i<length;i++){node.contents[position+i]=buffer[offset+i]}}node.usedBytes=Math.max(node.usedBytes,position+length);return length},llseek(stream,offset,whence){var position=offset;if(whence===1){position+=stream.position}else if(whence===2){if(FS.isFile(stream.node.mode)){position+=stream.node.usedBytes}}if(position<0){throw new FS.ErrnoError(28)}return position},allocate(stream,offset,length){MEMFS.expandFileStorage(stream.node,offset+length);stream.node.usedBytes=Math.max(stream.node.usedBytes,offset+length)},mmap(stream,length,position,prot,flags){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}var ptr;var allocated;var contents=stream.node.contents;if(!(flags&2)&&contents&&contents.buffer===HEAP8.buffer){allocated=false;ptr=contents.byteOffset}else{allocated=true;ptr=mmapAlloc(length);if(!ptr){throw new FS.ErrnoError(48)}if(contents){if(position>0||position+length<contents.length){if(contents.subarray){contents=contents.subarray(position,position+length)}else{contents=Array.prototype.slice.call(contents,position,position+length)}}HEAP8.set(contents,ptr>>>0)}}return{ptr,allocated}},msync(stream,buffer,offset,length,mmapFlags){MEMFS.stream_ops.write(stream,buffer,0,length,offset,false);return 0}}};var asyncLoad=async url=>{var arrayBuffer=await readAsync(url);return new Uint8Array(arrayBuffer)};var FS_createDataFile=(parent,name,fileData,canRead,canWrite,canOwn)=>{FS.createDataFile(parent,name,fileData,canRead,canWrite,canOwn)};var preloadPlugins=Module["preloadPlugins"]||[];var FS_handledByPreloadPlugin=(byteArray,fullname,finish,onerror)=>{if(typeof Browser!="undefined")Browser.init();var handled=false;preloadPlugins.forEach(plugin=>{if(handled)return;if(plugin["canHandle"](fullname)){plugin["handle"](byteArray,fullname,finish,onerror);handled=true}});return handled};var FS_createPreloadedFile=(parent,name,url,canRead,canWrite,onload,onerror,dontCreateFile,canOwn,preFinish)=>{var fullname=name?PATH_FS.resolve(PATH.join2(parent,name)):parent;var dep=getUniqueRunDependency(`cp ${fullname}`);function processData(byteArray){function finish(byteArray){preFinish?.();if(!dontCreateFile){FS_createDataFile(parent,name,byteArray,canRead,canWrite,canOwn)}onload?.();removeRunDependency(dep)}if(FS_handledByPreloadPlugin(byteArray,fullname,finish,()=>{onerror?.();removeRunDependency(dep)})){return}finish(byteArray)}addRunDependency(dep);if(typeof url=="string"){asyncLoad(url).then(processData,onerror)}else{processData(url)}};var FS_modeStringToFlags=str=>{var flagModes={r:0,"r+":2,w:512|64|1,"w+":512|64|2,a:1024|64|1,"a+":1024|64|2};var flags=flagModes[str];if(typeof flags=="undefined"){throw new Error(`Unknown file open mode: ${str}`)}return flags};var FS_getMode=(canRead,canWrite)=>{var mode=0;if(canRead)mode|=292|73;if(canWrite)mode|=146;return mode};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,filesystems:null,syncFSRequests:0,readFiles:{},ErrnoError:class{constructor(errno){this.name="ErrnoError";this.errno=errno}},FSStream:class{constructor(){this.shared={}}get object(){return this.node}set object(val){this.node=val}get isRead(){return(this.flags&2097155)!==1}get isWrite(){return(this.flags&2097155)!==0}get isAppend(){return this.flags&1024}get flags(){return this.shared.flags}set flags(val){this.shared.flags=val}get position(){return this.shared.position}set position(val){this.shared.position=val}},FSNode:class{constructor(parent,name,mode,rdev){this.node_ops={};this.stream_ops={};this.readMode=292|73;this.writeMode=146;this.mounted=null;if(!parent){parent=this}this.parent=parent;this.mount=parent.mount;this.id=FS.nextInode++;this.name=name;this.mode=mode;this.rdev=rdev;this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&this.readMode)===this.readMode}set read(val){val?this.mode|=this.readMode:this.mode&=~this.readMode}get write(){return(this.mode&this.writeMode)===this.writeMode}set write(val){val?this.mode|=this.writeMode:this.mode&=~this.writeMode}get isFolder(){return FS.isDir(this.mode)}get isDevice(){return FS.isChrdev(this.mode)}},lookupPath(path,opts={}){if(!path){throw new FS.ErrnoError(44)}opts.follow_mount??=true;if(!PATH.isAbs(path)){path=FS.cwd()+"/"+path}linkloop:for(var nlinks=0;nlinks<40;nlinks++){var parts=path.split("/").filter(p=>!!p);var current=FS.root;var current_path="/";for(var i=0;i<parts.length;i++){var islast=i===parts.length-1;if(islast&&opts.parent){break}if(parts[i]==="."){continue}if(parts[i]===".."){current_path=PATH.dirname(current_path);current=current.parent;continue}current_path=PATH.join2(current_path,parts[i]);try{current=FS.lookupNode(current,parts[i])}catch(e){if(e?.errno===44&&islast&&opts.noent_okay){return{path:current_path}}throw e}if(FS.isMountpoint(current)&&(!islast||opts.follow_mount)){current=current.mounted.root}if(FS.isLink(current.mode)&&(!islast||opts.follow)){if(!current.node_ops.readlink){throw new FS.ErrnoError(52)}var link=current.node_ops.readlink(current);if(!PATH.isAbs(link)){link=PATH.dirname(current_path)+"/"+link}path=link+"/"+parts.slice(i+1).join("/");continue linkloop}}return{path:current_path,node:current}}throw new FS.ErrnoError(32)},getPath(node){var path;while(true){if(FS.isRoot(node)){var mount=node.mount.mountpoint;if(!path)return mount;return mount[mount.length-1]!=="/"?`${mount}/${path}`:mount+path}path=path?`${node.name}/${path}`:node.name;node=node.parent}},hashName(parentid,name){var hash=0;for(var i=0;i<name.length;i++){hash=(hash<<5)-hash+name.charCodeAt(i)|0}return(parentid+hash>>>0)%FS.nameTable.length},hashAddNode(node){var hash=FS.hashName(node.parent.id,node.name);node.name_next=FS.nameTable[hash];FS.nameTable[hash]=node},hashRemoveNode(node){var hash=FS.hashName(node.parent.id,node.name);if(FS.nameTable[hash]===node){FS.nameTable[hash]=node.name_next}else{var current=FS.nameTable[hash];while(current){if(current.name_next===node){current.name_next=node.name_next;break}current=current.name_next}}},lookupNode(parent,name){var errCode=FS.mayLookup(parent);if(errCode){throw new FS.ErrnoError(errCode)}var hash=FS.hashName(parent.id,name);for(var node=FS.nameTable[hash];node;node=node.name_next){var nodeName=node.name;if(node.parent.id===parent.id&&nodeName===name){return node}}return FS.lookup(parent,name)},createNode(parent,name,mode,rdev){var node=new FS.FSNode(parent,name,mode,rdev);FS.hashAddNode(node);return node},destroyNode(node){FS.hashRemoveNode(node)},isRoot(node){return node===node.parent},isMountpoint(node){return!!node.mounted},isFile(mode){return(mode&61440)===32768},isDir(mode){return(mode&61440)===16384},isLink(mode){return(mode&61440)===40960},isChrdev(mode){return(mode&61440)===8192},isBlkdev(mode){return(mode&61440)===24576},isFIFO(mode){return(mode&61440)===4096},isSocket(mode){return(mode&49152)===49152},flagsToPermissionString(flag){var perms=["r","w","rw"][flag&3];if(flag&512){perms+="w"}return perms},nodePermissions(node,perms){if(FS.ignorePermissions){return 0}if(perms.includes("r")&&!(node.mode&292)){return 2}else if(perms.includes("w")&&!(node.mode&146)){return 2}else if(perms.includes("x")&&!(node.mode&73)){return 2}return 0},mayLookup(dir){if(!FS.isDir(dir.mode))return 54;var errCode=FS.nodePermissions(dir,"x");if(errCode)return errCode;if(!dir.node_ops.lookup)return 2;return 0},mayCreate(dir,name){if(!FS.isDir(dir.mode)){return 54}try{var node=FS.lookupNode(dir,name);return 20}catch(e){}return FS.nodePermissions(dir,"wx")},mayDelete(dir,name,isdir){var node;try{node=FS.lookupNode(dir,name)}catch(e){return e.errno}var errCode=FS.nodePermissions(dir,"wx");if(errCode){return errCode}if(isdir){if(!FS.isDir(node.mode)){return 54}if(FS.isRoot(node)||FS.getPath(node)===FS.cwd()){return 10}}else{if(FS.isDir(node.mode)){return 31}}return 0},mayOpen(node,flags){if(!node){return 44}if(FS.isLink(node.mode)){return 32}else if(FS.isDir(node.mode)){if(FS.flagsToPermissionString(flags)!=="r"||flags&(512|64)){return 31}}return FS.nodePermissions(node,FS.flagsToPermissionString(flags))},checkOpExists(op,err){if(!op){throw new FS.ErrnoError(err)}return op},MAX_OPEN_FDS:4096,nextfd(){for(var fd=0;fd<=FS.MAX_OPEN_FDS;fd++){if(!FS.streams[fd]){return fd}}throw new FS.ErrnoError(33)},getStreamChecked(fd){var stream=FS.getStream(fd);if(!stream){throw new FS.ErrnoError(8)}return stream},getStream:fd=>FS.streams[fd],createStream(stream,fd=-1){stream=Object.assign(new FS.FSStream,stream);if(fd==-1){fd=FS.nextfd()}stream.fd=fd;FS.streams[fd]=stream;return stream},closeStream(fd){FS.streams[fd]=null},dupStream(origStream,fd=-1){var stream=FS.createStream(origStream,fd);stream.stream_ops?.dup?.(stream);return stream},doSetAttr(stream,node,attr){var setattr=stream?.stream_ops.setattr;var arg=setattr?stream:node;setattr??=node.node_ops.setattr;FS.checkOpExists(setattr,63);setattr(arg,attr)},chrdev_stream_ops:{open(stream){var device=FS.getDevice(stream.node.rdev);stream.stream_ops=device.stream_ops;stream.stream_ops.open?.(stream)},llseek(){throw new FS.ErrnoError(70)}},major:dev=>dev>>8,minor:dev=>dev&255,makedev:(ma,mi)=>ma<<8|mi,registerDevice(dev,ops){FS.devices[dev]={stream_ops:ops}},getDevice:dev=>FS.devices[dev],getMounts(mount){var mounts=[];var check=[mount];while(check.length){var m=check.pop();mounts.push(m);check.push(...m.mounts)}return mounts},syncfs(populate,callback){if(typeof populate=="function"){callback=populate;populate=false}FS.syncFSRequests++;if(FS.syncFSRequests>1){err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`)}var mounts=FS.getMounts(FS.root.mount);var completed=0;function doCallback(errCode){FS.syncFSRequests--;return callback(errCode)}function done(errCode){if(errCode){if(!done.errored){done.errored=true;return doCallback(errCode)}return}if(++completed>=mounts.length){doCallback(null)}}mounts.forEach(mount=>{if(!mount.type.syncfs){return done(null)}mount.type.syncfs(mount,populate,done)})},mount(type,opts,mountpoint){var root=mountpoint==="/";var pseudo=!mountpoint;var node;if(root&&FS.root){throw new FS.ErrnoError(10)}else if(!root&&!pseudo){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});mountpoint=lookup.path;node=lookup.node;if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}if(!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}}var mount={type,opts,mountpoint,mounts:[]};var mountRoot=type.mount(mount);mountRoot.mount=mount;mount.root=mountRoot;if(root){FS.root=mountRoot}else if(node){node.mounted=mount;if(node.mount){node.mount.mounts.push(mount)}}return mountRoot},unmount(mountpoint){var lookup=FS.lookupPath(mountpoint,{follow_mount:false});if(!FS.isMountpoint(lookup.node)){throw new FS.ErrnoError(28)}var node=lookup.node;var mount=node.mounted;var mounts=FS.getMounts(mount);Object.keys(FS.nameTable).forEach(hash=>{var current=FS.nameTable[hash];while(current){var next=current.name_next;if(mounts.includes(current.mount)){FS.destroyNode(current)}current=next}});node.mounted=null;var idx=node.mount.mounts.indexOf(mount);node.mount.mounts.splice(idx,1)},lookup(parent,name){return parent.node_ops.lookup(parent,name)},mknod(path,mode,dev){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);if(!name){throw new FS.ErrnoError(28)}if(name==="."||name===".."){throw new FS.ErrnoError(20)}var errCode=FS.mayCreate(parent,name);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.mknod){throw new FS.ErrnoError(63)}return parent.node_ops.mknod(parent,name,mode,dev)},statfs(path){return FS.statfsNode(FS.lookupPath(path,{follow:true}).node)},statfsStream(stream){return FS.statfsNode(stream.node)},statfsNode(node){var rtn={bsize:4096,frsize:4096,blocks:1e6,bfree:5e5,bavail:5e5,files:FS.nextInode,ffree:FS.nextInode-1,fsid:42,flags:2,namelen:255};if(node.node_ops.statfs){Object.assign(rtn,node.node_ops.statfs(node.mount.opts.root))}return rtn},create(path,mode=438){mode&=4095;mode|=32768;return FS.mknod(path,mode,0)},mkdir(path,mode=511){mode&=511|512;mode|=16384;return FS.mknod(path,mode,0)},mkdirTree(path,mode){var dirs=path.split("/");var d="";for(var i=0;i<dirs.length;++i){if(!dirs[i])continue;d+="/"+dirs[i];try{FS.mkdir(d,mode)}catch(e){if(e.errno!=20)throw e}}},mkdev(path,mode,dev){if(typeof dev=="undefined"){dev=mode;mode=438}mode|=8192;return FS.mknod(path,mode,dev)},symlink(oldpath,newpath){if(!PATH_FS.resolve(oldpath)){throw new FS.ErrnoError(44)}var lookup=FS.lookupPath(newpath,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var newname=PATH.basename(newpath);var errCode=FS.mayCreate(parent,newname);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.symlink){throw new FS.ErrnoError(63)}return parent.node_ops.symlink(parent,newname,oldpath)},rename(old_path,new_path){var old_dirname=PATH.dirname(old_path);var new_dirname=PATH.dirname(new_path);var old_name=PATH.basename(old_path);var new_name=PATH.basename(new_path);var lookup,old_dir,new_dir;lookup=FS.lookupPath(old_path,{parent:true});old_dir=lookup.node;lookup=FS.lookupPath(new_path,{parent:true});new_dir=lookup.node;if(!old_dir||!new_dir)throw new FS.ErrnoError(44);if(old_dir.mount!==new_dir.mount){throw new FS.ErrnoError(75)}var old_node=FS.lookupNode(old_dir,old_name);var relative=PATH_FS.relative(old_path,new_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(28)}relative=PATH_FS.relative(new_path,old_dirname);if(relative.charAt(0)!=="."){throw new FS.ErrnoError(55)}var new_node;try{new_node=FS.lookupNode(new_dir,new_name)}catch(e){}if(old_node===new_node){return}var isdir=FS.isDir(old_node.mode);var errCode=FS.mayDelete(old_dir,old_name,isdir);if(errCode){throw new FS.ErrnoError(errCode)}errCode=new_node?FS.mayDelete(new_dir,new_name,isdir):FS.mayCreate(new_dir,new_name);if(errCode){throw new FS.ErrnoError(errCode)}if(!old_dir.node_ops.rename){throw new FS.ErrnoError(63)}if(FS.isMountpoint(old_node)||new_node&&FS.isMountpoint(new_node)){throw new FS.ErrnoError(10)}if(new_dir!==old_dir){errCode=FS.nodePermissions(old_dir,"w");if(errCode){throw new FS.ErrnoError(errCode)}}FS.hashRemoveNode(old_node);try{old_dir.node_ops.rename(old_node,new_dir,new_name);old_node.parent=new_dir}catch(e){throw e}finally{FS.hashAddNode(old_node)}},rmdir(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,true);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.rmdir){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.rmdir(parent,name);FS.destroyNode(node)},readdir(path){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;var readdir=FS.checkOpExists(node.node_ops.readdir,54);return readdir(node)},unlink(path){var lookup=FS.lookupPath(path,{parent:true});var parent=lookup.node;if(!parent){throw new FS.ErrnoError(44)}var name=PATH.basename(path);var node=FS.lookupNode(parent,name);var errCode=FS.mayDelete(parent,name,false);if(errCode){throw new FS.ErrnoError(errCode)}if(!parent.node_ops.unlink){throw new FS.ErrnoError(63)}if(FS.isMountpoint(node)){throw new FS.ErrnoError(10)}parent.node_ops.unlink(parent,name);FS.destroyNode(node)},readlink(path){var lookup=FS.lookupPath(path);var link=lookup.node;if(!link){throw new FS.ErrnoError(44)}if(!link.node_ops.readlink){throw new FS.ErrnoError(28)}return link.node_ops.readlink(link)},stat(path,dontFollow){var lookup=FS.lookupPath(path,{follow:!dontFollow});var node=lookup.node;var getattr=FS.checkOpExists(node.node_ops.getattr,63);return getattr(node)},fstat(fd){var stream=FS.getStreamChecked(fd);var node=stream.node;var getattr=stream.stream_ops.getattr;var arg=getattr?stream:node;getattr??=node.node_ops.getattr;FS.checkOpExists(getattr,63);return getattr(arg)},lstat(path){return FS.stat(path,true)},doChmod(stream,node,mode,dontFollow){FS.doSetAttr(stream,node,{mode:mode&4095|node.mode&~4095,ctime:Date.now(),dontFollow})},chmod(path,mode,dontFollow){var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}FS.doChmod(null,node,mode,dontFollow)},lchmod(path,mode){FS.chmod(path,mode,true)},fchmod(fd,mode){var stream=FS.getStreamChecked(fd);FS.doChmod(stream,stream.node,mode,false)},doChown(stream,node,dontFollow){FS.doSetAttr(stream,node,{timestamp:Date.now(),dontFollow})},chown(path,uid,gid,dontFollow){var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:!dontFollow});node=lookup.node}else{node=path}FS.doChown(null,node,dontFollow)},lchown(path,uid,gid){FS.chown(path,uid,gid,true)},fchown(fd,uid,gid){var stream=FS.getStreamChecked(fd);FS.doChown(stream,stream.node,false)},doTruncate(stream,node,len){if(FS.isDir(node.mode)){throw new FS.ErrnoError(31)}if(!FS.isFile(node.mode)){throw new FS.ErrnoError(28)}var errCode=FS.nodePermissions(node,"w");if(errCode){throw new FS.ErrnoError(errCode)}FS.doSetAttr(stream,node,{size:len,timestamp:Date.now()})},truncate(path,len){if(len<0){throw new FS.ErrnoError(28)}var node;if(typeof path=="string"){var lookup=FS.lookupPath(path,{follow:true});node=lookup.node}else{node=path}FS.doTruncate(null,node,len)},ftruncate(fd,len){var stream=FS.getStreamChecked(fd);if(len<0||(stream.flags&2097155)===0){throw new FS.ErrnoError(28)}FS.doTruncate(stream,stream.node,len)},utime(path,atime,mtime){var lookup=FS.lookupPath(path,{follow:true});var node=lookup.node;var setattr=FS.checkOpExists(node.node_ops.setattr,63);setattr(node,{atime,mtime})},open(path,flags,mode=438){if(path===""){throw new FS.ErrnoError(44)}flags=typeof flags=="string"?FS_modeStringToFlags(flags):flags;if(flags&64){mode=mode&4095|32768}else{mode=0}var node;var isDirPath;if(typeof path=="object"){node=path}else{isDirPath=path.endsWith("/");var lookup=FS.lookupPath(path,{follow:!(flags&131072),noent_okay:true});node=lookup.node;path=lookup.path}var created=false;if(flags&64){if(node){if(flags&128){throw new FS.ErrnoError(20)}}else if(isDirPath){throw new FS.ErrnoError(31)}else{node=FS.mknod(path,mode|511,0);created=true}}if(!node){throw new FS.ErrnoError(44)}if(FS.isChrdev(node.mode)){flags&=~512}if(flags&65536&&!FS.isDir(node.mode)){throw new FS.ErrnoError(54)}if(!created){var errCode=FS.mayOpen(node,flags);if(errCode){throw new FS.ErrnoError(errCode)}}if(flags&512&&!created){FS.truncate(node,0)}flags&=~(128|512|131072);var stream=FS.createStream({node,path:FS.getPath(node),flags,seekable:true,position:0,stream_ops:node.stream_ops,ungotten:[],error:false});if(stream.stream_ops.open){stream.stream_ops.open(stream)}if(created){FS.chmod(node,mode&511)}if(Module["logReadFiles"]&&!(flags&1)){if(!(path in FS.readFiles)){FS.readFiles[path]=1}}return stream},close(stream){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(stream.getdents)stream.getdents=null;try{if(stream.stream_ops.close){stream.stream_ops.close(stream)}}catch(e){throw e}finally{FS.closeStream(stream.fd)}stream.fd=null},isClosed(stream){return stream.fd===null},llseek(stream,offset,whence){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(!stream.seekable||!stream.stream_ops.llseek){throw new FS.ErrnoError(70)}if(whence!=0&&whence!=1&&whence!=2){throw new FS.ErrnoError(28)}stream.position=stream.stream_ops.llseek(stream,offset,whence);stream.ungotten=[];return stream.position},read(stream,buffer,offset,length,position){if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.read){throw new FS.ErrnoError(28)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesRead=stream.stream_ops.read(stream,buffer,offset,length,position);if(!seeking)stream.position+=bytesRead;return bytesRead},write(stream,buffer,offset,length,position,canOwn){if(length<0||position<0){throw new FS.ErrnoError(28)}if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(FS.isDir(stream.node.mode)){throw new FS.ErrnoError(31)}if(!stream.stream_ops.write){throw new FS.ErrnoError(28)}if(stream.seekable&&stream.flags&1024){FS.llseek(stream,0,2)}var seeking=typeof position!="undefined";if(!seeking){position=stream.position}else if(!stream.seekable){throw new FS.ErrnoError(70)}var bytesWritten=stream.stream_ops.write(stream,buffer,offset,length,position,canOwn);if(!seeking)stream.position+=bytesWritten;return bytesWritten},allocate(stream,offset,length){if(FS.isClosed(stream)){throw new FS.ErrnoError(8)}if(offset<0||length<=0){throw new FS.ErrnoError(28)}if((stream.flags&2097155)===0){throw new FS.ErrnoError(8)}if(!FS.isFile(stream.node.mode)&&!FS.isDir(stream.node.mode)){throw new FS.ErrnoError(43)}if(!stream.stream_ops.allocate){throw new FS.ErrnoError(138)}stream.stream_ops.allocate(stream,offset,length)},mmap(stream,length,position,prot,flags){if((prot&2)!==0&&(flags&2)===0&&(stream.flags&2097155)!==2){throw new FS.ErrnoError(2)}if((stream.flags&2097155)===1){throw new FS.ErrnoError(2)}if(!stream.stream_ops.mmap){throw new FS.ErrnoError(43)}if(!length){throw new FS.ErrnoError(28)}return stream.stream_ops.mmap(stream,length,position,prot,flags)},msync(stream,buffer,offset,length,mmapFlags){if(!stream.stream_ops.msync){return 0}return stream.stream_ops.msync(stream,buffer,offset,length,mmapFlags)},ioctl(stream,cmd,arg){if(!stream.stream_ops.ioctl){throw new FS.ErrnoError(59)}return stream.stream_ops.ioctl(stream,cmd,arg)},readFile(path,opts={}){opts.flags=opts.flags||0;opts.encoding=opts.encoding||"binary";if(opts.encoding!=="utf8"&&opts.encoding!=="binary"){throw new Error(`Invalid encoding type "${opts.encoding}"`)}var ret;var stream=FS.open(path,opts.flags);var stat=FS.stat(path);var length=stat.size;var buf=new Uint8Array(length);FS.read(stream,buf,0,length,0);if(opts.encoding==="utf8"){ret=UTF8ArrayToString(buf)}else if(opts.encoding==="binary"){ret=buf}FS.close(stream);return ret},writeFile(path,data,opts={}){opts.flags=opts.flags||577;var stream=FS.open(path,opts.flags,opts.mode);if(typeof data=="string"){var buf=new Uint8Array(lengthBytesUTF8(data)+1);var actualNumBytes=stringToUTF8Array(data,buf,0,buf.length);FS.write(stream,buf,0,actualNumBytes,undefined,opts.canOwn)}else if(ArrayBuffer.isView(data)){FS.write(stream,data,0,data.byteLength,undefined,opts.canOwn)}else{throw new Error("Unsupported data type")}FS.close(stream)},cwd:()=>FS.currentPath,chdir(path){var lookup=FS.lookupPath(path,{follow:true});if(lookup.node===null){throw new FS.ErrnoError(44)}if(!FS.isDir(lookup.node.mode)){throw new FS.ErrnoError(54)}var errCode=FS.nodePermissions(lookup.node,"x");if(errCode){throw new FS.ErrnoError(errCode)}FS.currentPath=lookup.path},createDefaultDirectories(){FS.mkdir("/tmp");FS.mkdir("/home");FS.mkdir("/home/web_user")},createDefaultDevices(){FS.mkdir("/dev");FS.registerDevice(FS.makedev(1,3),{read:()=>0,write:(stream,buffer,offset,length,pos)=>length,llseek:()=>0});FS.mkdev("/dev/null",FS.makedev(1,3));TTY.register(FS.makedev(5,0),TTY.default_tty_ops);TTY.register(FS.makedev(6,0),TTY.default_tty1_ops);FS.mkdev("/dev/tty",FS.makedev(5,0));FS.mkdev("/dev/tty1",FS.makedev(6,0));var randomBuffer=new Uint8Array(1024),randomLeft=0;var randomByte=()=>{if(randomLeft===0){randomFill(randomBuffer);randomLeft=randomBuffer.byteLength}return randomBuffer[--randomLeft]};FS.createDevice("/dev","random",randomByte);FS.createDevice("/dev","urandom",randomByte);FS.mkdir("/dev/shm");FS.mkdir("/dev/shm/tmp")},createSpecialDirectories(){FS.mkdir("/proc");var proc_self=FS.mkdir("/proc/self");FS.mkdir("/proc/self/fd");FS.mount({mount(){var node=FS.createNode(proc_self,"fd",16895,73);node.stream_ops={llseek:MEMFS.stream_ops.llseek};node.node_ops={lookup(parent,name){var fd=+name;var stream=FS.getStreamChecked(fd);var ret={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:()=>stream.path},id:fd+1};ret.parent=ret;return ret},readdir(){return Array.from(FS.streams.entries()).filter(([k,v])=>v).map(([k,v])=>k.toString())}};return node}},{},"/proc/self/fd")},createStandardStreams(input,output,error){if(input){FS.createDevice("/dev","stdin",input)}else{FS.symlink("/dev/tty","/dev/stdin")}if(output){FS.createDevice("/dev","stdout",null,output)}else{FS.symlink("/dev/tty","/dev/stdout")}if(error){FS.createDevice("/dev","stderr",null,error)}else{FS.symlink("/dev/tty1","/dev/stderr")}var stdin=FS.open("/dev/stdin",0);var stdout=FS.open("/dev/stdout",1);var stderr=FS.open("/dev/stderr",1)},staticInit(){FS.nameTable=new Array(4096);FS.mount(MEMFS,{},"/");FS.createDefaultDirectories();FS.createDefaultDevices();FS.createSpecialDirectories();FS.filesystems={MEMFS}},init(input,output,error){FS.initialized=true;input??=Module["stdin"];output??=Module["stdout"];error??=Module["stderr"];FS.createStandardStreams(input,output,error)},quit(){FS.initialized=false;for(var i=0;i<FS.streams.length;i++){var stream=FS.streams[i];if(!stream){continue}FS.close(stream)}},findObject(path,dontResolveLastLink){var ret=FS.analyzePath(path,dontResolveLastLink);if(!ret.exists){return null}return ret.object},analyzePath(path,dontResolveLastLink){try{var lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});path=lookup.path}catch(e){}var ret={isRoot:false,exists:false,error:0,name:null,path:null,object:null,parentExists:false,parentPath:null,parentObject:null};try{var lookup=FS.lookupPath(path,{parent:true});ret.parentExists=true;ret.parentPath=lookup.path;ret.parentObject=lookup.node;ret.name=PATH.basename(path);lookup=FS.lookupPath(path,{follow:!dontResolveLastLink});ret.exists=true;ret.path=lookup.path;ret.object=lookup.node;ret.name=lookup.node.name;ret.isRoot=lookup.path==="/"}catch(e){ret.error=e.errno}return ret},createPath(parent,path,canRead,canWrite){parent=typeof parent=="string"?parent:FS.getPath(parent);var parts=path.split("/").reverse();while(parts.length){var part=parts.pop();if(!part)continue;var current=PATH.join2(parent,part);try{FS.mkdir(current)}catch(e){if(e.errno!=20)throw e}parent=current}return current},createFile(parent,name,properties,canRead,canWrite){var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS_getMode(canRead,canWrite);return FS.create(path,mode)},createDataFile(parent,name,data,canRead,canWrite,canOwn){var path=name;if(parent){parent=typeof parent=="string"?parent:FS.getPath(parent);path=name?PATH.join2(parent,name):parent}var mode=FS_getMode(canRead,canWrite);var node=FS.create(path,mode);if(data){if(typeof data=="string"){var arr=new Array(data.length);for(var i=0,len=data.length;i<len;++i)arr[i]=data.charCodeAt(i);data=arr}FS.chmod(node,mode|146);var stream=FS.open(node,577);FS.write(stream,data,0,data.length,0,canOwn);FS.close(stream);FS.chmod(node,mode)}},createDevice(parent,name,input,output){var path=PATH.join2(typeof parent=="string"?parent:FS.getPath(parent),name);var mode=FS_getMode(!!input,!!output);FS.createDevice.major??=64;var dev=FS.makedev(FS.createDevice.major++,0);FS.registerDevice(dev,{open(stream){stream.seekable=false},close(stream){if(output?.buffer?.length){output(10)}},read(stream,buffer,offset,length,pos){var bytesRead=0;for(var i=0;i<length;i++){var result;try{result=input()}catch(e){throw new FS.ErrnoError(29)}if(result===undefined&&bytesRead===0){throw new FS.ErrnoError(6)}if(result===null||result===undefined)break;bytesRead++;buffer[offset+i]=result}if(bytesRead){stream.node.atime=Date.now()}return bytesRead},write(stream,buffer,offset,length,pos){for(var i=0;i<length;i++){try{output(buffer[offset+i])}catch(e){throw new FS.ErrnoError(29)}}if(length){stream.node.mtime=stream.node.ctime=Date.now()}return i}});return FS.mkdev(path,mode,dev)},forceLoadFile(obj){if(obj.isDevice||obj.isFolder||obj.link||obj.contents)return true;if(typeof XMLHttpRequest!="undefined"){throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.")}else{try{obj.contents=readBinary(obj.url);obj.usedBytes=obj.contents.length}catch(e){throw new FS.ErrnoError(29)}}},createLazyFile(parent,name,url,canRead,canWrite){class LazyUint8Array{constructor(){this.lengthKnown=false;this.chunks=[]}get(idx){if(idx>this.length-1||idx<0){return undefined}var chunkOffset=idx%this.chunkSize;var chunkNum=idx/this.chunkSize|0;return this.getter(chunkNum)[chunkOffset]}setDataGetter(getter){this.getter=getter}cacheLength(){var xhr=new XMLHttpRequest;xhr.open("HEAD",url,false);xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);var datalength=Number(xhr.getResponseHeader("Content-length"));var header;var hasByteServing=(header=xhr.getResponseHeader("Accept-Ranges"))&&header==="bytes";var usesGzip=(header=xhr.getResponseHeader("Content-Encoding"))&&header==="gzip";var chunkSize=1024*1024;if(!hasByteServing)chunkSize=datalength;var doXHR=(from,to)=>{if(from>to)throw new Error("invalid range ("+from+", "+to+") or no bytes requested!");if(to>datalength-1)throw new Error("only "+datalength+" bytes available! programmer error!");var xhr=new XMLHttpRequest;xhr.open("GET",url,false);if(datalength!==chunkSize)xhr.setRequestHeader("Range","bytes="+from+"-"+to);xhr.responseType="arraybuffer";if(xhr.overrideMimeType){xhr.overrideMimeType("text/plain; charset=x-user-defined")}xhr.send(null);if(!(xhr.status>=200&&xhr.status<300||xhr.status===304))throw new Error("Couldn't load "+url+". Status: "+xhr.status);if(xhr.response!==undefined){return new Uint8Array(xhr.response||[])}return intArrayFromString(xhr.responseText||"",true)};var lazyArray=this;lazyArray.setDataGetter(chunkNum=>{var start=chunkNum*chunkSize;var end=(chunkNum+1)*chunkSize-1;end=Math.min(end,datalength-1);if(typeof lazyArray.chunks[chunkNum]=="undefined"){lazyArray.chunks[chunkNum]=doXHR(start,end)}if(typeof lazyArray.chunks[chunkNum]=="undefined")throw new Error("doXHR failed!");return lazyArray.chunks[chunkNum]});if(usesGzip||!datalength){chunkSize=datalength=1;datalength=this.getter(0).length;chunkSize=datalength;out("LazyFiles on gzip forces download of the whole file when length is accessed")}this._length=datalength;this._chunkSize=chunkSize;this.lengthKnown=true}get length(){if(!this.lengthKnown){this.cacheLength()}return this._length}get chunkSize(){if(!this.lengthKnown){this.cacheLength()}return this._chunkSize}}if(typeof XMLHttpRequest!="undefined"){if(!ENVIRONMENT_IS_WORKER)throw"Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";var lazyArray=new LazyUint8Array;var properties={isDevice:false,contents:lazyArray}}else{var properties={isDevice:false,url}}var node=FS.createFile(parent,name,properties,canRead,canWrite);if(properties.contents){node.contents=properties.contents}else if(properties.url){node.contents=null;node.url=properties.url}Object.defineProperties(node,{usedBytes:{get:function(){return this.contents.length}}});var stream_ops={};var keys=Object.keys(node.stream_ops);keys.forEach(key=>{var fn=node.stream_ops[key];stream_ops[key]=(...args)=>{FS.forceLoadFile(node);return fn(...args)}});function writeChunks(stream,buffer,offset,length,position){var contents=stream.node.contents;if(position>=contents.length)return 0;var size=Math.min(contents.length-position,length);if(contents.slice){for(var i=0;i<size;i++){buffer[offset+i]=contents[position+i]}}else{for(var i=0;i<size;i++){buffer[offset+i]=contents.get(position+i)}}return size}stream_ops.read=(stream,buffer,offset,length,position)=>{FS.forceLoadFile(node);return writeChunks(stream,buffer,offset,length,position)};stream_ops.mmap=(stream,length,position,prot,flags)=>{FS.forceLoadFile(node);var ptr=mmapAlloc(length);if(!ptr){throw new FS.ErrnoError(48)}writeChunks(stream,HEAP8,ptr,length,position);return{ptr,allocated:true}};node.stream_ops=stream_ops;return node}};var SYSCALLS={DEFAULT_POLLMASK:5,calculateAt(dirfd,path,allowEmpty){if(PATH.isAbs(path)){return path}var dir;if(dirfd===-100){dir=FS.cwd()}else{var dirstream=SYSCALLS.getStreamFromFD(dirfd);dir=dirstream.path}if(path.length==0){if(!allowEmpty){throw new FS.ErrnoError(44)}return dir}return dir+"/"+path},writeStat(buf,stat){HEAP32[buf>>>2>>>0]=stat.dev;HEAP32[buf+4>>>2>>>0]=stat.mode;HEAPU32[buf+8>>>2>>>0]=stat.nlink;HEAP32[buf+12>>>2>>>0]=stat.uid;HEAP32[buf+16>>>2>>>0]=stat.gid;HEAP32[buf+20>>>2>>>0]=stat.rdev;HEAP64[buf+24>>>3]=BigInt(stat.size);HEAP32[buf+32>>>2>>>0]=4096;HEAP32[buf+36>>>2>>>0]=stat.blocks;var atime=stat.atime.getTime();var mtime=stat.mtime.getTime();var ctime=stat.ctime.getTime();HEAP64[buf+40>>>3]=BigInt(Math.floor(atime/1e3));HEAPU32[buf+48>>>2>>>0]=atime%1e3*1e3*1e3;HEAP64[buf+56>>>3]=BigInt(Math.floor(mtime/1e3));HEAPU32[buf+64>>>2>>>0]=mtime%1e3*1e3*1e3;HEAP64[buf+72>>>3]=BigInt(Math.floor(ctime/1e3));HEAPU32[buf+80>>>2>>>0]=ctime%1e3*1e3*1e3;HEAP64[buf+88>>>3]=BigInt(stat.ino);return 0},writeStatFs(buf,stats){HEAP32[buf+4>>>2>>>0]=stats.bsize;HEAP32[buf+40>>>2>>>0]=stats.bsize;HEAP32[buf+8>>>2>>>0]=stats.blocks;HEAP32[buf+12>>>2>>>0]=stats.bfree;HEAP32[buf+16>>>2>>>0]=stats.bavail;HEAP32[buf+20>>>2>>>0]=stats.files;HEAP32[buf+24>>>2>>>0]=stats.ffree;HEAP32[buf+28>>>2>>>0]=stats.fsid;HEAP32[buf+44>>>2>>>0]=stats.flags;HEAP32[buf+36>>>2>>>0]=stats.namelen},doMsync(addr,stream,len,flags,offset){if(!FS.isFile(stream.node.mode)){throw new FS.ErrnoError(43)}if(flags&2){return 0}var buffer=HEAPU8.slice(addr,addr+len);FS.msync(stream,buffer,offset,len,flags)},getStreamFromFD(fd){var stream=FS.getStreamChecked(fd);return stream},varargs:undefined,getStr(ptr){var ret=UTF8ToString(ptr);return ret}};var __tzset_js=function(timezone,daylight,std_name,dst_name){timezone>>>=0;daylight>>>=0;std_name>>>=0;dst_name>>>=0;var currentYear=(new Date).getFullYear();var winter=new Date(currentYear,0,1);var summer=new Date(currentYear,6,1);var winterOffset=winter.getTimezoneOffset();var summerOffset=summer.getTimezoneOffset();var stdTimezoneOffset=Math.max(winterOffset,summerOffset);HEAPU32[timezone>>>2>>>0]=stdTimezoneOffset*60;HEAP32[daylight>>>2>>>0]=Number(winterOffset!=summerOffset);var extractZone=timezoneOffset=>{var sign=timezoneOffset>=0?"-":"+";var absOffset=Math.abs(timezoneOffset);var hours=String(Math.floor(absOffset/60)).padStart(2,"0");var minutes=String(absOffset%60).padStart(2,"0");return`UTC${sign}${hours}${minutes}`};var winterName=extractZone(winterOffset);var summerName=extractZone(summerOffset);if(summerOffset<winterOffset){stringToUTF8(winterName,std_name,17);stringToUTF8(summerName,dst_name,17)}else{stringToUTF8(winterName,dst_name,17);stringToUTF8(summerName,std_name,17)}};var _emscripten_get_now=()=>performance.now();var _emscripten_date_now=()=>Date.now();var nowIsMonotonic=1;var checkWasiClock=clock_id=>clock_id>=0&&clock_id<=3;function _clock_time_get(clk_id,ignored_precision,ptime){ignored_precision=bigintToI53Checked(ignored_precision);ptime>>>=0;if(!checkWasiClock(clk_id)){return 28}var now;if(clk_id===0){now=_emscripten_date_now()}else if(nowIsMonotonic){now=_emscripten_get_now()}else{return 52}var nsec=Math.round(now*1e3*1e3);HEAP64[ptime>>>3]=BigInt(nsec);return 0}var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++>>>0]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>>2>>>0]:ch==106?HEAP64[buf>>>3]:ch==105?HEAP32[buf>>>2>>>0]:HEAPF64[buf>>>3>>>0]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};function _emscripten_asm_const_int(code,sigPtr,argbuf){code>>>=0;sigPtr>>>=0;argbuf>>>=0;return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_errn(str,len){str>>>=0;len>>>=0;return err(UTF8ToString(str,len))}var getHeapMax=()=>3221225472;function _emscripten_get_heap_max(){return getHeapMax()}function _emscripten_pc_get_function(pc){pc>>>=0;abort("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER");return 0}var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};function _emscripten_resize_heap(requestedSize){requestedSize>>>=0;var oldSize=HEAPU8.length;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false}var convertFrameToPC=frame=>{abort("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER");return 0};var UNWIND_CACHE={};var saveInUnwindCache=callstack=>{callstack.forEach(frame=>{var pc=convertFrameToPC(frame);if(pc){UNWIND_CACHE[pc]=frame}})};var jsStackTrace=()=>(new Error).stack.toString();function _emscripten_stack_snapshot(){var callstack=jsStackTrace().split("\n");if(callstack[0]=="Error"){callstack.shift()}saveInUnwindCache(callstack);UNWIND_CACHE.last_addr=convertFrameToPC(callstack[3]);UNWIND_CACHE.last_stack=callstack;return UNWIND_CACHE.last_addr}function _emscripten_stack_unwind_buffer(addr,buffer,count){addr>>>=0;buffer>>>=0;var stack;if(UNWIND_CACHE.last_addr==addr){stack=UNWIND_CACHE.last_stack}else{stack=jsStackTrace().split("\n");if(stack[0]=="Error"){stack.shift()}saveInUnwindCache(stack)}var offset=3;while(stack[offset]&&convertFrameToPC(stack[offset])!=addr){++offset}for(var i=0;i<count&&stack[i+offset];++i){HEAP32[buffer+i*4>>>2>>>0]=convertFrameToPC(stack[i+offset])}return i}var ENV={};var getExecutableName=()=>thisProgram||"./this.program";var getEnvStrings=()=>{if(!getEnvStrings.strings){var lang=(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8";var env={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:lang,_:getExecutableName()};for(var x in ENV){if(ENV[x]===undefined)delete env[x];else env[x]=ENV[x]}var strings=[];for(var x in env){strings.push(`${x}=${env[x]}`)}getEnvStrings.strings=strings}return getEnvStrings.strings};var stringToAscii=(str,buffer)=>{for(var i=0;i<str.length;++i){HEAP8[buffer++>>>0]=str.charCodeAt(i)}HEAP8[buffer>>>0]=0};var _environ_get=function(__environ,environ_buf){__environ>>>=0;environ_buf>>>=0;var bufSize=0;getEnvStrings().forEach((string,i)=>{var ptr=environ_buf+bufSize;HEAPU32[__environ+i*4>>>2>>>0]=ptr;stringToAscii(string,ptr);bufSize+=string.length+1});return 0};var _environ_sizes_get=function(penviron_count,penviron_buf_size){penviron_count>>>=0;penviron_buf_size>>>=0;var strings=getEnvStrings();HEAPU32[penviron_count>>>2>>>0]=strings.length;var bufSize=0;strings.forEach(string=>bufSize+=string.length+1);HEAPU32[penviron_buf_size>>>2>>>0]=bufSize;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var _exit=exitJS;function _fd_close(fd){try{var stream=SYSCALLS.getStreamFromFD(fd);FS.close(stream);return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}var doReadv=(stream,iov,iovcnt,offset)=>{var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>>2>>>0];var len=HEAPU32[iov+4>>>2>>>0];iov+=8;var curr=FS.read(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len)break;if(typeof offset!="undefined"){offset+=curr}}return ret};function _fd_read(fd,iov,iovcnt,pnum){iov>>>=0;iovcnt>>>=0;pnum>>>=0;try{var stream=SYSCALLS.getStreamFromFD(fd);var num=doReadv(stream,iov,iovcnt);HEAPU32[pnum>>>2>>>0]=num;return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}function _fd_seek(fd,offset,whence,newOffset){offset=bigintToI53Checked(offset);newOffset>>>=0;try{if(isNaN(offset))return 61;var stream=SYSCALLS.getStreamFromFD(fd);FS.llseek(stream,offset,whence);HEAP64[newOffset>>>3]=BigInt(stream.position);if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}var doWritev=(stream,iov,iovcnt,offset)=>{var ret=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>>2>>>0];var len=HEAPU32[iov+4>>>2>>>0];iov+=8;var curr=FS.write(stream,HEAP8,ptr,len,offset);if(curr<0)return-1;ret+=curr;if(curr<len){break}if(typeof offset!="undefined"){offset+=curr}}return ret};function _fd_write(fd,iov,iovcnt,pnum){iov>>>=0;iovcnt>>>=0;pnum>>>=0;try{var stream=SYSCALLS.getStreamFromFD(fd);var num=doWritev(stream,iov,iovcnt);HEAPU32[pnum>>>2>>>0]=num;return 0}catch(e){if(typeof FS=="undefined"||!(e.name==="ErrnoError"))throw e;return e.errno}}var FS_createPath=FS.createPath;var FS_unlink=path=>FS.unlink(path);var FS_createLazyFile=FS.createLazyFile;var FS_createDevice=FS.createDevice;embind_init_charCodes();BindingError=Module["BindingError"]=class BindingError extends Error{constructor(message){super(message);this.name="BindingError"}};InternalError=Module["InternalError"]=class InternalError extends Error{constructor(message){super(message);this.name="InternalError"}};init_ClassHandle();init_RegisteredPointer();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_emval();FS.createPreloadedFile=FS_createPreloadedFile;FS.staticInit();Module["FS_createPath"]=FS.createPath;Module["FS_createDataFile"]=FS.createDataFile;Module["FS_createPreloadedFile"]=FS.createPreloadedFile;Module["FS_unlink"]=FS.unlink;Module["FS_createLazyFile"]=FS.createLazyFile;Module["FS_createDevice"]=FS.createDevice;MEMFS.doesNotExistError=new FS.ErrnoError(44);MEMFS.doesNotExistError.stack="<generic error, no stack>";var wasmImports={m:HaveOffsetConverter,a:___cxa_throw,x:__abort_js,l:__embind_register_bigint,C:__embind_register_bool,I:__embind_register_class,H:__embind_register_class_constructor,j:__embind_register_class_function,A:__embind_register_emval,k:__embind_register_float,c:__embind_register_integer,b:__embind_register_memory_view,B:__embind_register_std_string,g:__embind_register_std_wstring,D:__embind_register_void,f:__emval_new_u8string,p:__emval_take_value,u:__tzset_js,t:_clock_time_get,o:em_severity_log,h:_emscripten_asm_const_int,E:_emscripten_errn,q:_emscripten_get_heap_max,d:_emscripten_get_now,F:_emscripten_pc_get_function,r:_emscripten_resize_heap,n:_emscripten_stack_snapshot,G:_emscripten_stack_unwind_buffer,y:_environ_get,z:_environ_sizes_get,e:_exit,v:_fd_close,w:_fd_read,s:_fd_seek,i:_fd_write};var wasmExports=await createWasm();var ___wasm_call_ctors=wasmExports["K"];var _free=wasmExports["M"];var _malloc=wasmExports["N"];var ___getTypeName=wasmExports["O"];var _emscripten_builtin_memalign=wasmExports["P"];var _kVersionStampBuildChangelistStr=Module["_kVersionStampBuildChangelistStr"]=39280;var _kVersionStampCitcSnapshotStr=Module["_kVersionStampCitcSnapshotStr"]=39312;var _kVersionStampCitcWorkspaceIdStr=Module["_kVersionStampCitcWorkspaceIdStr"]=39344;var _kVersionStampSourceUriStr=Module["_kVersionStampSourceUriStr"]=39856;var _kVersionStampBuildClientStr=Module["_kVersionStampBuildClientStr"]=40368;var _kVersionStampBuildClientMintStatusStr=Module["_kVersionStampBuildClientMintStatusStr"]=40880;var _kVersionStampBuildCompilerStr=Module["_kVersionStampBuildCompilerStr"]=40912;var _kVersionStampBuildDateTimePstStr=Module["_kVersionStampBuildDateTimePstStr"]=41424;var _kVersionStampBuildDepotPathStr=Module["_kVersionStampBuildDepotPathStr"]=41456;var _kVersionStampBuildIdStr=Module["_kVersionStampBuildIdStr"]=41968;var _kVersionStampBuildInfoStr=Module["_kVersionStampBuildInfoStr"]=42480;var _kVersionStampBuildLabelStr=Module["_kVersionStampBuildLabelStr"]=42992;var _kVersionStampBuildTargetStr=Module["_kVersionStampBuildTargetStr"]=43504;var _kVersionStampBuildTimestampStr=Module["_kVersionStampBuildTimestampStr"]=44016;var _kVersionStampBuildToolStr=Module["_kVersionStampBuildToolStr"]=44048;var _kVersionStampG3BuildTargetStr=Module["_kVersionStampG3BuildTargetStr"]=44560;var _kVersionStampVerifiableStr=Module["_kVersionStampVerifiableStr"]=45072;var _kVersionStampBuildFdoTypeStr=Module["_kVersionStampBuildFdoTypeStr"]=45104;var _kVersionStampBuildBaselineChangelistStr=Module["_kVersionStampBuildBaselineChangelistStr"]=45136;var _kVersionStampBuildLtoTypeStr=Module["_kVersionStampBuildLtoTypeStr"]=45168;var _kVersionStampBuildPropellerTypeStr=Module["_kVersionStampBuildPropellerTypeStr"]=45200;var _kVersionStampBuildPghoTypeStr=Module["_kVersionStampBuildPghoTypeStr"]=45232;var _kVersionStampBuildUsernameStr=Module["_kVersionStampBuildUsernameStr"]=45264;var _kVersionStampBuildHostnameStr=Module["_kVersionStampBuildHostnameStr"]=45776;var _kVersionStampBuildDirectoryStr=Module["_kVersionStampBuildDirectoryStr"]=46288;var _kVersionStampBuildChangelistInt=Module["_kVersionStampBuildChangelistInt"]=46800;var _kVersionStampCitcSnapshotInt=Module["_kVersionStampCitcSnapshotInt"]=46808;var _kVersionStampBuildClientMintStatusInt=Module["_kVersionStampBuildClientMintStatusInt"]=46812;var _kVersionStampBuildTimestampInt=Module["_kVersionStampBuildTimestampInt"]=46816;var _kVersionStampVerifiableInt=Module["_kVersionStampVerifiableInt"]=46824;var _kVersionStampBuildCoverageEnabledInt=Module["_kVersionStampBuildCoverageEnabledInt"]=46828;var _kVersionStampBuildBaselineChangelistInt=Module["_kVersionStampBuildBaselineChangelistInt"]=46832;var _kVersionStampPrecookedTimestampStr=Module["_kVersionStampPrecookedTimestampStr"]=46848;var _kVersionStampPrecookedClientInfoStr=Module["_kVersionStampPrecookedClientInfoStr"]=47360;function applySignatureConversions(wasmExports){wasmExports=Object.assign({},wasmExports);var makeWrapper_pp=f=>a0=>f(a0)>>>0;var makeWrapper_ppp=f=>(a0,a1)=>f(a0,a1)>>>0;var makeWrapper_p=f=>()=>f()>>>0;wasmExports["N"]=makeWrapper_pp(wasmExports["N"]);wasmExports["O"]=makeWrapper_pp(wasmExports["O"]);wasmExports["P"]=makeWrapper_ppp(wasmExports["P"]);wasmExports["_emscripten_stack_alloc"]=makeWrapper_pp(wasmExports["_emscripten_stack_alloc"]);wasmExports["emscripten_stack_get_current"]=makeWrapper_p(wasmExports["emscripten_stack_get_current"]);wasmExports["__cxa_get_exception_ptr"]=makeWrapper_pp(wasmExports["__cxa_get_exception_ptr"]);return wasmExports}Module["addRunDependency"]=addRunDependency;Module["removeRunDependency"]=removeRunDependency;Module["FS_createPreloadedFile"]=FS_createPreloadedFile;Module["FS_unlink"]=FS_unlink;Module["FS_createPath"]=FS_createPath;Module["FS_createDevice"]=FS_createDevice;Module["FS_createDataFile"]=FS_createDataFile;Module["FS_createLazyFile"]=FS_createLazyFile;function run(){if(runDependencies>0){dependenciesFulfilled=run;return}preRun();if(runDependencies>0){dependenciesFulfilled=run;return}function doRun(){Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);Module["onRuntimeInitialized"]?.();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();moduleRtn=readyPromise;
```

### `./xCleanup/legacy_apps/Ambix2IAMF/iamf-tools/iamf/cli/testdata/generate_test_suite.py`
```
def _run_encoder(
def main(_) -> None:
```

### `./xCleanup/legacy_apps/Ambix2IAMF/iamf-tools/iamf/cli/testdata/generate_test_summary.py`
```
def pretty_print(string) -> str:
def main(argv: Sequence[str]) -> None:
```

### `./xCleanup/legacy_libs/Spatial_Audio_Framework/docs/doxygen/doxygen-awesome/doxygen-awesome-tabs.js`
```
class DoxygenAwesomeTabs {
let tabLinkList = []
let header = tab.querySelector(".tab-title")
let tabLink = document.createElement("button")
let tabsOverview = document.createElement("div")
let tabsOverviewContainer = document.createElement("div")
function resize() {
let maxTabHeight = 0
let visibility = tab.style.display
```

### `./xCleanup/legacy_libs/Spatial_Audio_Framework/docs/doxygen/doxygen-awesome/doxygen-awesome-paragraph-link.js`
```
class DoxygenAwesomeParagraphLink {
let anchorlink = document.createElement("a")
```

### `./xCleanup/legacy_libs/Spatial_Audio_Framework/docs/doxygen/doxygen-awesome/doxygen-awesome-interactive-toc.js`
```
class DoxygenAwesomeInteractiveToc {
let toc = document.querySelector(".contents > .toc")
let id = node.getAttribute("href").substring(1)
let active = DoxygenAwesomeInteractiveToc.headers[0]?.node
let position = header.headerNode.getBoundingClientRect().top
let lastCall = 0;
const now = new Date().getTime();
```

### `./xCleanup/legacy_libs/Spatial_Audio_Framework/docs/doxygen/doxygen-awesome/doxygen-awesome-fragment-copy-button.js`
```
class DoxygenAwesomeFragmentCopyButton extends HTMLElement {
const fragments = document.getElementsByClassName("fragment")
const fragmentWrapper = document.createElement("div")
const fragmentCopyButton = document.createElement("doxygen-awesome-fragment-copy-button")
const content = this.previousSibling.cloneNode(true)
let textContent = content.textContent
let numberOfTrailingNewlines = 0
```

### `./xCleanup/legacy_libs/Spatial_Audio_Framework/docs/doxygen/doxygen-awesome/doxygen-awesome-darkmode-toggle.js`
```
class DoxygenAwesomeDarkModeToggle extends HTMLElement {
const toggleButton = document.createElement('doxygen-awesome-dark-mode-toggle')
```

### `./electron/shim.ts`
```
let electronApp: any;
const electron = require('electron');
export const app = electronApp;
```

### `./electron/main.ts`
```
const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
let win: BrowserWindow | null
function createWindow() {
const server = http.createServer(async (req, res) => {
const url = new URL(req.url, `http://${req.headers.host}`);
const filePath = url.searchParams.get('file');
const info = await probeAudio(filePath).catch(() => null);
const isLegacyStream = req.url?.startsWith('/stream');
const isObrStream = req.url?.startsWith('/obr-stream');
const url = new URL(req.url!, `http://${req.headers.host}`);
const filePath = url.searchParams.get('file');
const binaural = url.searchParams.get('binaural') === 'true';
let sofaPath = url.searchParams.get('sofaPath');
const hrtfProfile = url.searchParams.get('hrtfProfile');
const ffmpegPath = getFfmpegPath();
const args: string[] = [
const ffmpeg = spawn(ffmpegPath, args);
const url = new URL(req.url!, `http://${req.headers.host}`);
const filePath = url.searchParams.get('file');
const channels = parseInt(url.searchParams.get('channels') || '0', 10);
const profile = url.searchParams.get('profile') || 'ambient';
const start = parseFloat(url.searchParams.get('start') || '0');
const filePath = request.url.replace('media://', '');
const decodedPath = decodeURIComponent(filePath);
const info = await probeAudio(path);
const buffer = await import('node:fs/promises').then(fs => fs.readFile(filePath));
const stats = await import('node:fs/promises').then(fs => fs.stat(filePath));
const fs = await import('node:fs/promises');
const fileHandle = await fs.open(filePath, 'r');
const buffer = Buffer.alloc(length);
const defaultProps: any[] = ['openFile', 'multiSelections'];
const result = await dialog.showOpenDialog({
const result = await dialog.showOpenDialog({
const fs = await import('node:fs/promises');
const path = await import('node:path');
const entries = await fs.readdir(dir, { withFileTypes: true });
const files: string[] = [];
const fullPath = path.join(dir, entry.name);
const allFiles: string[] = [];
const stats = await fs.stat(p);
const scriptPath = path.join(__dirname, '../py/ambi_rotate.py');
const python = spawn('python3', [
let output = '';
let errorOutput = '';
```

### `./electron/electron-env.d.ts`
```
```

### `./electron/preload.ts`
```
const sub = (_: any, msg: string) => callback(_, msg);
const subscription = (_: any, data: any) => callback(data);
const sub = (_: any, data: any) => callback(data);
```

### `./electron/handlers/iamf-config-generator.ts`
```
export function generateIamfConfig(
const frameSize = 960;
const preSkip = 312;
const targetBitratePerChannel = qualityKbps * 1000;
const numFrames = Math.ceil((durationSamples) / frameSize);
const paddedDuration = numFrames * frameSize;
const samplesToTrimAtEnd = paddedDuration - durationSamples;
const numChannels = 16;
const substreamIds = Array.from({ length: numChannels }, (_, i) => i);
const channelMapping = Array.from({ length: numChannels }, (_, i) => i);
const channelMetadatas = substreamIds.map(id =>
```

### `./electron/handlers/AmbiData.ts`
```
function getPythonScriptPath(scriptName: string): string {
const streamIndex = options?.streamIndex ?? 0;
const stat = await fs.stat(filePath);
const extension = path.extname(filePath);
const nameWithoutExt = path.basename(filePath, extension);
const sizeFormatted = formatFileSize(stat.size);
const fastAudioData = await parseWavHeader(filePath);
let basicData: any = {
let channelCount = Number(fastAudioData.channels);
let ambisonicOrder = -1;
let probeData: any = {};
let audioStreams: any[] = [];
let videoStream: any = undefined;
let iamfData = undefined;
const activeStream = audioStreams[streamIndex] || audioStreams[0];
let channelCount = Number(activeStream.channels);
let ambisonicOrder = -1; // Default to -1 (N/A)
let durationStr = formatDuration(parseFloat(probeData.format?.duration || '0'));
const result: any = {
let sChannels = Number(s.channels);
const firstElement = iamfData.audioElements?.[0];
const spatialMetadata = await extractSpatialMetadata();
const loudnessData = await analyzeLoudness(filePath, channelCount, streamIndex);
const healthData = await analyzeSignalHealth(filePath, streamIndex);
const ffprobePath = getFfprobePath();
const args = [
const child = spawn(ffprobePath, args);
let stdout = '';
let stderr = '';
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
let args: string[];
const child = spawn(ffmpegPath, args);
let stderr = '';
const summaryMatch = stderr.match(/Summary:([\s\S]*)/);
const summaryText = summaryMatch ? summaryMatch[1] : stderr;
const integratedMatch = summaryText.match(/I:\s+(-?\d+\.?\d*)\s+LUFS/);
const rangeMatch = summaryText.match(/LRA:\s+(\d+\.?\d*)\s+LU/);
const truePeakMatch = summaryText.match(/Peak:\s+(-?\d+\.?\d*|-inf)\s+dBFS/);
const integrated = integratedMatch ? parseFloat(integratedMatch[1]) : 0;
const range = rangeMatch ? parseFloat(rangeMatch[1]) : 0;
let truePeak = 0;
const peakStr = truePeakMatch[1];
const ffmpegPath = getFfmpegPath();
const mapArg = `0:a:${streamIndex}`;
const args = [
const child = spawn(ffmpegPath, args);
let stderr = '';
let clippingCount = 0;
let dcOffsetWarning = false;
const emptyStreamWarning = false;
const peakMatches = stderr.matchAll(/Peak level dB:\s+(-?\d+\.?\d*)/g);
const dcMatches = stderr.matchAll(/DC offset:\s+(-?\d+\.?\d*)/g);
const scriptPath = getPythonScriptPath('ambi_data_heuristics.py');
const child = spawn('python3', [scriptPath, filePath]);
let stdout = '';
let stderr = '';
function formatFileSize(bytes: number): string {
function formatDuration(seconds: number): string {
const hours = Math.floor(seconds / 3600);
const mins = Math.floor((seconds % 3600) / 60);
const secs = Math.floor(seconds % 60);
function parseFrameRate(rateStr: string): number {
const parts = rateStr.split('/');
```

### `./electron/handlers/ObrHandler.ts`
```
export function getObrStreamPath(): string {
export function createObrPipeline(
let ffmpegPath, obrPath;
const decoder = spawn(ffmpegPath, [
const obr = spawn(obrPath, [
const encoder = spawn(ffmpegPath, [
const logStderr = (prefix: string, stream: NodeJS.ReadableStream | null) => {
const killAll = () => {
const handleError = (procName: string, err: Error) => {
```

### `./electron/handlers/common.ts`
```
export function getBinaryPath(name: string): string {
export function getFfmpegPath() { return getBinaryPath('ffmpeg'); }
export function getFfprobePath() { return getBinaryPath('ffprobe'); }
export function getSofaAssetPath(filename: string): string {
export function determineOutputPath(
const inputDir = path.dirname(inputPath);
const fileName = path.basename(inputPath, path.extname(inputPath));
const ext = extension || path.extname(inputPath); // Use provided extension or keep original
let outputDir = (settings && settings.outputDir) ? settings.outputDir : inputDir;
export function probeAudio(filePath: string): Promise<AudioProbeResult> {
const ffprobePath = getFfprobePath();
const args = [
const process = spawn(ffprobePath, args);
let stdout = '';
let stderr = '';
const data = JSON.parse(stdout);
const stream = data.streams?.[0];
const format = data.format;
const channels = parseInt(stream.channels);
const sampleRate = parseInt(stream.sample_rate);
const duration = parseFloat(format.duration || stream.duration || "0");
```

### `./electron/handlers/WaveParser.ts`
```
let fileHandle;
const buffer = Buffer.alloc(128);
let fmtOffset = 12;
const chunkId = buffer.toString('ascii', fmtOffset, fmtOffset + 4);
const chunkSize = buffer.readUInt32LE(fmtOffset + 4);
const audioFormat = buffer.readUInt16LE(fmtOffset + 8);
const channels = buffer.readUInt16LE(fmtOffset + 10);
const sampleRate = buffer.readUInt32LE(fmtOffset + 12);
const bitDepth = buffer.readUInt16LE(fmtOffset + 22);
let codec = 'PCM';
```

### `./electron/handlers/Ambix2IAMF.ts`
```
const iamfEncPath = getBinaryPath('iamf-enc');
const results = [];
let qualityKbps = 96;
const match = bitrate.match(/(\d+)kbps/);
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const outputPath = determineOutputPath(inputPath, settings, 'IAMF', '_IAMF.iamf');
const info = await probeAudio(inputPath);
const durationSamples = Math.floor(info.duration * info.sampleRate);
const inputDir = path.dirname(inputPath);
const inputBasename = path.basename(inputPath);
const targetDir = path.dirname(outputPath);
const tempPrefix = `_tmp_processing_${Date.now()}_${i}`;
const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps, tempPrefix);
const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}_${i}.textproto`);
const generatedFile = path.join(targetDir, `${tempPrefix}.iamf`);
const args = [
const child = spawn(iamfEncPath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
let stdout = '';
let stderr = '';
let lastP = 0;
const updateP = (fileP: number) => {
const totalP = (i + fileP) / files.length;
const durationSec = durationSamples / info.sampleRate;
const estimatedProcessingTime = durationSec * 0.5; // optimistic
const startTime = Date.now();
const progressTimer = setInterval(() => {
const elapsed = (Date.now() - startTime) / 1000;
let estimatedP = Math.min(elapsed / estimatedProcessingTime, 0.95);
const exitCode = code === null ? 'Signal Killed' : code;
```

### `./electron/handlers/trim.ts`
```
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const binPath = isDev
const ffmpegPath = path.join(binPath, 'ffmpeg');
const tempDir = app.getPath('temp');
const proxyId = uuidv4();
const outputPath = path.join(tempDir, `ambitrim_proxy_${proxyId}.mp3`);
const args = [
const ffmpeg = spawn(ffmpegPath, args);
const fileBuffer = fs.readFileSync(outputPath);
const fileName = path.basename(filePath, path.extname(filePath));
const ext = path.extname(filePath);
const outputFileName = `${fileName}_trimmed_${Math.floor(Date.now() / 1000)}${ext}`;
const outputPath = path.join(outputDir, outputFileName);
const duration = endTime - startTime;
const args = [
const ffmpeg = spawn(ffmpegPath, args);
```

### `./electron/handlers/Ambix2Opus.ts`
```
const match = bitrate.match(/(\d+)kbps/);
const kbpsPerCh = match ? parseInt(match[1]) : 64; // default medium
const results = [];
const ffmpegPath = getFfmpegPath();
const inputPath = files[i];
const progressBase = i / files.length;
const progressScale = 1.0 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? '2' : '255';
const outputPath = determineOutputPath(inputPath, settings, 'Opus', '.opus');
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const child = spawn(ffmpegPath, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + (fileProgress * progressScale);
```

### `./electron/handlers/AmbiOrder.ts`
```
const results = [];
const ffmpegPath = getFfmpegPath();
const orderMap: Record<string, number> = {
const targetChannels = orderMap[targetOrder];
const inputPath = files[i];
const suffix = `_${targetOrder.replace(" ", "_")}.wav`;
const outputPath = determineOutputPath(inputPath, settings, 'Order_Converter', suffix);
const indices = Array.from({ length: targetChannels }, (_, k) => k).join('|');
const filterStr = `channelmap=map=${indices}`;
const args = [
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
let info;
const progressBase = i / files.length;
const progressScale = 1.0 / files.length;
const child = spawn(ffmpegPath, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + (fileProgress * progressScale);
```

### `./electron/handlers/AmbiRotate.ts`
```
function getScriptPath(scriptName: string): string {
const scriptName = 'rotator.py';
const scriptPath = getScriptPath(scriptName);
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, 'Rotated', '_Rotated.wav');
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn('python3', pythonArgs);
let stdout = '';
let stderr = '';
const str = d.toString();
const lines = str.split('\n');
const match = line.match(/PROGRESS:\s*(\d+)/);
const percent = parseInt(match[1], 10);
const fileFraction = percent / 100.0;
const overall = (i + fileFraction) / files.length;
```

### `./electron/handlers/AmbiSwap.ts`
```
const results = [];
const ffmpegPath = getFfmpegPath();
const gainToFuMa = "0.70710678";
const gainToAmbiX = "1.41421356";
const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
const mapIndices = direction === "AmbiX -> FuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
const gain = direction === "AmbiX -> FuMa" ? gainToFuMa : gainToAmbiX;
const inputPath = files[i];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const stats = await probeAudio(inputPath);
const channels = stats.channels;
const progressBase = i / files.length;
const progressScale = 1.0 / files.length;
let filter = "";
let parts = [`c0=${gain}*c${mapIndices[0]}`]; // W channel gain
const suffix = direction === "AmbixToFuMa" ? "_FuMa.wav" : "_AmbiX.wav";
const formatName = direction === "AmbixToFuMa" ? "FuMa" : "AmbiX";
const outputPath = determineOutputPath(inputPath, settings, formatName, suffix);
const args = [
const child = spawn(ffmpegPath, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / stats.duration, 0), 1);
const totalProgress = progressBase + (fileProgress * progressScale);
```

### `./electron/handlers/Ambix2Bin.ts`
```
function getScriptPath(scriptName: string): string {
function getSofaPath(filename: string): string {
let sofaPath = '';
const scriptPath = getScriptPath('saf_wrapper.py');
const results = [];
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, 'Binaural', '_Binaural.wav');
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const pythonArgs = [
const child = spawn('python3', pythonArgs);
let stderr = '';
const lines = d.toString().split('\n');
const p = parseFloat(line.split(':')[1]);
const totalProgress = (i + p) / files.length;
```

### `./electron/handlers/IamfParser.ts`
```
const fileHandle = await fs.open(filePath, 'r');
const stats = await fileHandle.stat();
const size = stats.size;
const buffer = Buffer.alloc(Math.min(size, 64 * 1024)); // Read first 64KB
const iamfData: any = {
let offset = 0;
const rawAudioElementObus: any[] = [];
const payloadOffset = offset;
const nextObuOffset = offset + obuSize;
const profileId = buffer[payloadOffset];
const additionalProfileId = buffer[payloadOffset + 1];
const extractId = readLeb128(buffer, payloadOffset);
const elementId = extractId.value;
let currentObuOffset = payloadOffset + extractId.bytes;
const elementTypeByte = buffer[currentObuOffset];
const elementType = elementTypeByte >> 5;
let outputChannelCount = 0;
const ambisonicsModeRes = readLeb128(buffer, currentObuOffset);
const ambisonicsMode = ambisonicsModeRes.value;
const outChannelsRes = readLeb128(buffer, currentObuOffset);
const numSubstreamsRes = readLeb128(buffer, currentObuOffset);
const uniqueAudioElements = Array.from(
function readLeb128(buffer: Buffer, offset: number): { value: number, bytes: number } {
let result = 0;
let shift = 0;
let currentByte;
let bytesRead = 0;
function getProfileName(id: number): string {
```

### `./electron/handlers/index.ts`
```
const handlers: Record<string, TaskHandler> = {};
export function registerHandler(toolId: string, handler: TaskHandler) {
const handler = handlers[toolId];
```

### `./electron/handlers/Ambix2Ogg.ts`
```
const match = bitrate ? bitrate.match(/(\d+)kbps/) : null;
const kbpsPerCh = match ? parseInt(match[1]) : 64; // default medium
const results = [];
const ffmpegPath = getFfmpegPath();
const inputPath = files[i];
const ext = path.extname(inputPath).toLowerCase();
const isOpusInput = ext === '.opus' || ext === '.ogg';
const progressBase = i / files.length;
const progressScale = 1.0 / files.length;
const info = await probeAudio(inputPath);
const totalBitrate = info.channels * kbpsPerCh;
const sqrtCh = Math.sqrt(info.channels);
const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
const mappingFamily = isAmbisonics ? '2' : '255';
const outputPath = determineOutputPath(inputPath, settings, 'Ogg', '.ogg');
const outputDir = path.dirname(outputPath);
const testFile = path.join(outputDir, `.perm_test_${Date.now()}`);
let args: string[] = [];
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)} (${isOpusInput ? 'Remux' : 'Encode'})`;
const child = spawn(ffmpegPath, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + (fileProgress * progressScale);
```

### `./electron/handlers/Ambix2CAF.ts`
```
const results = [];
const ffmpegPath = getFfmpegPath();
let codec = 'pcm_s24le';
const inputPath = files[i];
const outputPath = determineOutputPath(inputPath, settings, 'CAF', '.caf');
const info = await probeAudio(inputPath);
const progressBase = i / files.length;
const progressScale = 1.0 / files.length;
const statusMsg = `Processing ${i + 1}/${files.length}: ${path.basename(inputPath)}`;
const args = [
const child = spawn(ffmpegPath, args);
const line = d.toString();
const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
const h = parseFloat(timeMatch[1]);
const m = parseFloat(timeMatch[2]);
const s = parseFloat(timeMatch[3]);
const currentSeconds = h * 3600 + m * 60 + s;
const fileProgress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
const totalProgress = progressBase + (fileProgress * progressScale);
```

### `./electron/handlers/Ambix2APAC.ts`
```
const sender = event.sender;
let bitrateVal = 96000; // Default Medium
const isDev = !app.isPackaged;
const binPath = isDev
const fs = await import('fs');
const file = files[i];
const fileName = path.basename(file);
const outFile = determineOutputPath(file, settings, 'APAC', '_apac.mp4');
const child = spawn(binPath, [file, outFile, bitrateVal.toString()]);
const str = d.toString();
const match = str.match(/Progress:\s*(\d+)%/);
const progress = parseInt(match[1], 10);
```

### `./electron/handlers/scripts/saf_wrapper.py`
```
class SAFRenderer:
def __init__(self):
def load_sofa(self, sofa_path):
def _compute_sn3d_sh(self, order, azi_rad, ele_rad):
def _get_max_re_weights(self, order):
def prepare(self, order):
def render(self, input_path, output_path, block_size=4096):
```

### `./src/types.ts`
```
```

### `./src/vite-env.d.ts`
```
```

### `./src/constants.ts`
```
export const TOOLS: ToolDefinition[] = [
export const BITRATE_OPTIONS = [
```

### `./src/tools/AmbiData/types.ts`
```
```

### `./src/tools/AmbiRotate/NativeRotator.ts`
```
export class NativeRotator {
const coreIndices = [1, 2, 3];
const g = this.ctx.createGain();
const l = Math.floor(Math.sqrt(i));
const m = i - (l * l) - l;
const partnerIdx = (l * l) + l - m;
const g = this.ctx.createGain();
const g_pp = this.ctx.createGain();
const g_np = this.ctx.createGain();
const g_pn = this.ctx.createGain();
const g_nn = this.ctx.createGain();
const inv = this.ctx.createGain(); inv.gain.value = -1;
const d2r = Math.PI / 180;
const yawRad = yaw * d2r;
const m = (g as any)._m;
const type = (g as any)._type;
const angle = yawRad * m;
const a = yaw * d2r;   // alpha (Z)
const b = pitch * d2r; // beta (Y)
const g = roll * d2r;  // gamma (X)
const ca = Math.cos(a), sa = Math.sin(a);
const cb = Math.cos(b), sb = Math.sin(b);
const cg = Math.cos(g), sg = Math.sin(g);
const r00 = ca * cb;
const r01 = ca * sb * sg - sa * cg;
const r02 = ca * sb * cg + sa * sg;
const r10 = sa * cb;
const r11 = sa * sb * sg + ca * cg;
const r12 = sa * sb * cg - ca * sg;
const r20 = -sb;
const r21 = cb * sg;
const r22 = cb * cg;
const map: any = {
const r = (g as any)._matrixRow; // Output Channel
const c = (g as any)._matrixCol; // Input Channel
const key = `${r}-${c}`;
```

### `./src/utils/time-formatters.ts`
```
export const formatTime = (seconds: number): string => {
const mins = Math.floor(seconds / 60);
const secs = Math.floor(seconds % 60);
```

### `./src/utils/WavDecoder.ts`
```
export class WavDecoder {
const view = new DataView(buffer);
const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
const wave = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
let offset = 12;
const chunkId = String.fromCharCode(view.getUint8(offset), view.getUint8(offset + 1), view.getUint8(offset + 2), view.getUint8(offset + 3));
const chunkSize = view.getUint32(offset + 4, true);
const channels = view.getUint16(offset + 10, true);
const sampleRate = view.getUint32(offset + 12, true);
const bitDepth = view.getUint16(offset + 22, true);
let dataOffset = offset + 8 + chunkSize;
const dId = String.fromCharCode(view.getUint8(dataOffset), view.getUint8(dataOffset + 1), view.getUint8(dataOffset + 2), view.getUint8(dataOffset + 3));
const dSize = view.getUint32(dataOffset + 4, true);
const frameCount = length / ((bitDepth / 8) * channels);
const audioBuffer = ctx.createBuffer(channels, frameCount, sampleRate);
const channelData = audioBuffer.getChannelData(ch);
let readIndex = offset + (ch * (bitDepth / 8)); // Interleaved offset
const step = (bitDepth / 8) * channels;
let sample = 0;
const int16 = view.getInt16(readIndex, true);
const byte1 = view.getUint8(readIndex);
const byte2 = view.getUint8(readIndex + 1);
const byte3 = view.getUint8(readIndex + 2);
let val = (byte3 << 16) | (byte2 << 8) | byte1;
```
