import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
function getBinaryPath(name) {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "bin", name);
  }
  return path.join(process.cwd(), "assets", "bin", name);
}
function getFfmpegPath() {
  return getBinaryPath("ffmpeg");
}
function getFfprobePath() {
  return getBinaryPath("ffprobe");
}
function probeAudio(filePath) {
  return new Promise((resolve, reject) => {
    const ffprobePath = getFfprobePath();
    const args = [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_streams",
      "-show_format",
      "-select_streams",
      "a:0",
      // only audio
      filePath
    ];
    console.log(`[Probe] Spawning: ${ffprobePath} ${args.join(" ")}`);
    const process2 = spawn(ffprobePath, args);
    let stdout = "";
    let stderr = "";
    process2.stdout.on("data", (d) => stdout += d.toString());
    process2.stderr.on("data", (d) => stderr += d.toString());
    process2.on("close", (code) => {
      var _a;
      if (code !== 0) {
        return reject(new Error(`FFprobe failed (code ${code}): ${stderr}`));
      }
      try {
        const data = JSON.parse(stdout);
        const stream = (_a = data.streams) == null ? void 0 : _a[0];
        const format = data.format;
        if (!stream) throw new Error("No audio stream found");
        const channels = parseInt(stream.channels);
        const sampleRate = parseInt(stream.sample_rate);
        const duration = parseFloat(format.duration || stream.duration || "0");
        if (isNaN(channels)) throw new Error("Invalid channel count");
        console.log(`[Probe] Success: ${channels}ch, ${sampleRate}Hz, ${duration}s`);
        resolve({ duration, channels, sampleRate });
      } catch (e) {
        reject(new Error(`Failed to parse FFprobe JSON: ${e.message}
Raw: ${stdout.substring(0, 200)}`));
      }
    });
    process2.on("error", (err) => {
      reject(new Error(`Failed to spawn ffprobe: ${err.message}`));
    });
  });
}
async function handleAmbix2Opus(event, options) {
  const { inputPath, bitrate } = options;
  try {
    const match = bitrate.match(/(\d+)kbps/);
    const kbpsPerCh = match ? parseInt(match[1]) : 64;
    const info = await probeAudio(inputPath);
    if (info.channels === 0) throw new Error("Could not detect channel count.");
    const totalBitrate = info.channels * kbpsPerCh;
    const sqrtCh = Math.sqrt(info.channels);
    const isAmbisonics = Number.isInteger(sqrtCh) && info.channels >= 4;
    const mappingFamily = isAmbisonics ? "2" : "255";
    const outputPath = inputPath.replace(/\.[^/.]+$/, "") + ".opus";
    const ffmpegPath = getFfmpegPath();
    const args = [
      "-y",
      "-i",
      inputPath,
      "-c:a",
      "libopus",
      "-b:a",
      `${totalBitrate}k`,
      "-mapping_family",
      mappingFamily,
      outputPath
    ];
    console.log(`[Ambix2Opus] Spawning: ${ffmpegPath} ${args.join(" ")}`);
    return new Promise((resolve) => {
      const child = spawn(ffmpegPath, args);
      let stderr = "";
      child.stderr.on("data", (d) => {
        const line = d.toString();
        stderr += line;
        const timeMatch = line.match(/time=(\d{2}):(\d{2}):(\d{2}\.\d{2})/);
        if (timeMatch && info.duration > 0) {
          const h = parseFloat(timeMatch[1]);
          const m = parseFloat(timeMatch[2]);
          const s = parseFloat(timeMatch[3]);
          const currentSeconds = h * 3600 + m * 60 + s;
          const progress = Math.min(Math.max(currentSeconds / info.duration, 0), 1);
          event.sender.send("task-progress", progress);
        }
      });
      child.on("close", (code) => {
        if (code === 0) {
          event.sender.send("task-progress", 1);
          resolve({ success: true, data: { outputPath } });
        } else {
          resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr.substring(stderr.length - 500)}` });
        }
      });
      child.on("error", (err) => {
        resolve({ success: false, error: err.message });
      });
    });
  } catch (e) {
    return { success: false, error: e.message };
  }
}
function getScriptPath(scriptName) {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "scripts", scriptName);
  }
  return path.join(process.cwd(), "electron", "handlers", "scripts", scriptName);
}
function getSofaPath(filename) {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "sofa", filename);
  }
  return path.join(process.cwd(), "assets", "sofa", filename);
}
async function handleAmbix2Bin(event, options) {
  const { inputPath, hrtfProfile, customSofaPath } = options;
  try {
    let sofaPath = "";
    console.log(`[Ambix2Bin] Profile requested: ${hrtfProfile}`);
    if (hrtfProfile.includes("Neumann")) {
      sofaPath = getSofaPath("HRIR_L2702.sofa");
    } else if (hrtfProfile.includes("Kemar")) {
      sofaPath = getSofaPath("mit_kemar_normal_pinna.sofa");
    } else if (hrtfProfile.includes("Custom")) {
      if (customSofaPath && fs.existsSync(customSofaPath)) {
        sofaPath = customSofaPath;
      } else {
        throw new Error("Custom SOFA path not provided.");
      }
    } else {
      sofaPath = getSofaPath("HRIR_L2702.sofa");
    }
    if (!fs.existsSync(sofaPath)) {
      throw new Error(`SOFA file not found at: ${sofaPath}`);
    }
    const outputPath = inputPath.replace(/\.[^/.]+$/, "") + "_binaural.wav";
    const scriptPath = getScriptPath("saf_wrapper.py");
    const pythonArgs = [
      scriptPath,
      "--input",
      inputPath,
      "--output",
      outputPath,
      "--sofa",
      sofaPath
    ];
    console.log(`[Ambix2Bin] Spawning python3 ${pythonArgs.join(" ")}`);
    return new Promise((resolve) => {
      const child = spawn("python3", pythonArgs);
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (d) => stdout += d.toString());
      child.stderr.on("data", (d) => stderr += d.toString());
      child.on("close", (code) => {
        if (code === 0) {
          event.sender.send("task-progress", 1);
          resolve({ success: true, data: { outputPath } });
        } else {
          console.error("[Ambix2Bin] Python Error:", stderr);
          resolve({ success: false, error: `Python script failed (code ${code}). Error: ${stderr}` });
        }
      });
      child.on("error", (err) => {
        resolve({ success: false, error: `Failed to spawn python3: ${err.message}` });
      });
    });
  } catch (e) {
    return { success: false, error: e.message };
  }
}
function generateIamfConfig(wavFilename, durationSamples, sampleRate = 48e3, qualityKbps = 96) {
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
    (id) => `{ channel_id: ${id} channel_label: CHANNEL_LABEL_A_${id} }`
  ).join(",\n    ");
  return `
test_vector_metadata {
  human_readable_description: "3rd Order Ambisonics IAMF (16 ch)"
  file_name_prefix: "output"
  is_valid: true
  is_valid_to_decode: true
}

ia_sequence_header_metadata {
  primary_profile: PROFILE_VERSION_SIMPLE
  additional_profile: PROFILE_VERSION_SIMPLE
}

codec_config_metadata {
  codec_config_id: 200
  codec_config {
    codec_id: CODEC_ID_OPUS
    num_samples_per_frame: ${frameSize}
    audio_roll_distance: -4
    decoder_config_opus {
      version: 1
      pre_skip: ${preSkip}
      input_sample_rate: ${sampleRate}
      mapping_family: 0
      # Family 0 for mono substreams
      opus_encoder_metadata {
        target_bitrate_per_channel: ${targetBitratePerChannel}
        application: APPLICATION_AUDIO
      }
    }
  }
}

audio_element_metadata {
  audio_element_id: 300
  audio_element_type: AUDIO_ELEMENT_SCENE_BASED
  codec_config_id: 200
  audio_substream_ids: [${substreamIds.join(", ")}]
  ambisonics_config {
    ambisonics_mode: AMBISONICS_MODE_MONO
    ambisonics_mono_config {
      output_channel_count: ${numChannels}
      substream_count: ${numChannels}
      channel_mapping: [${channelMapping.join(", ")}]
    }
  }
}

mix_presentation_metadata {
  mix_presentation_id: 42
  annotations_language: ["en-us"]
  localized_presentation_annotations: ["Ambisonic Mix"]
  sub_mixes {
    audio_elements {
      audio_element_id: 300
      localized_element_annotations: ["Ambisonics"]
      rendering_config {
        headphones_rendering_mode: HEADPHONES_RENDERING_MODE_STEREO
      }
      element_mix_gain {
        param_definition {
          parameter_id: 100
          parameter_rate: ${sampleRate}
          param_definition_mode: 1
          reserved: 0
        }
        default_mix_gain: 0
      }
    }
    output_mix_gain {
      param_definition {
        parameter_id: 100
        parameter_rate: ${sampleRate}
        param_definition_mode: 1
        reserved: 0
      }
      default_mix_gain: 0
    }
    layouts {
      loudness_layout {
         layout_type: LAYOUT_TYPE_LOUDSPEAKERS_SS_CONVENTION
         ss_layout { sound_system: SOUND_SYSTEM_A_0_2_0 }
      }
    }
  }
}

audio_frame_metadata {
  wav_filename: "${wavFilename}"
  samples_to_trim_at_end: ${samplesToTrimAtEnd}
  samples_to_trim_at_start: ${preSkip}
  audio_element_id: 300
  channel_metadatas: [
    ${channelMetadatas}
  ]
}

parameter_block_metadata {
  parameter_id: 100
  start_timestamp: 0
  duration: ${paddedDuration}
  constant_subblock_duration: ${paddedDuration}
  subblocks: [
    {
      mix_gain_parameter_data {
        animation_type: ANIMATE_STEP
        param_data {
          step { start_point_value: 0 }
        }
      }
    }
  ]
}
`;
}
function getIamfEncPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "bin", "iamf-enc");
  }
  return path.join(process.cwd(), "assets", "bin", "iamf-enc");
}
async function handleAmbix2IAMF(event, options) {
  const { inputPath, bitrate } = options;
  try {
    const iamfEncPath = getIamfEncPath();
    if (!fs.existsSync(iamfEncPath)) {
      throw new Error("iamf-enc binary not found.");
    }
    const info = await probeAudio(inputPath);
    const durationSamples = Math.floor(info.duration * info.sampleRate);
    let qualityKbps = 96;
    if (bitrate) {
      const match = bitrate.match(/(\d+)kbps/);
      if (match) qualityKbps = parseInt(match[1]);
    }
    const inputDir = path.dirname(inputPath);
    const inputBasename = path.basename(inputPath);
    const outputDir = path.dirname(inputPath);
    const configContent = generateIamfConfig(inputBasename, durationSamples, info.sampleRate, qualityKbps);
    const configPath = path.join(os.tmpdir(), `iamf_config_${Date.now()}.textproto`);
    await fs.promises.writeFile(configPath, configContent);
    const args = [
      `--user_metadata_filename=${configPath}`,
      `--input_wav_directory=${inputDir}`,
      `--output_iamf_directory=${outputDir}`
    ];
    console.log(`[Ambix2IAMF] Spawning: ${iamfEncPath} ${args.join(" ")}`);
    return new Promise((resolve) => {
      const child = spawn(iamfEncPath, args);
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (d) => stdout += d.toString());
      child.stderr.on("data", (d) => stderr += d.toString());
      child.on("close", async (code) => {
        try {
          await fs.promises.unlink(configPath);
        } catch {
        }
        if (code === 0) {
          const generatedFile = path.join(outputDir, "output.iamf");
          const targetFile = inputPath.replace(/\.[^/.]+$/, "") + ".iamf";
          if (fs.existsSync(generatedFile)) {
            await fs.promises.rename(generatedFile, targetFile);
            event.sender.send("task-progress", 1);
            resolve({ success: true, data: { outputPath: targetFile } });
          } else {
            resolve({ success: false, error: "IAMF file was not created at expected location." });
          }
        } else {
          console.error("[Ambix2IAMF] Error:", stderr);
          resolve({ success: false, error: `iamf-enc failed (code ${code}). Log: ${stderr}` });
        }
      });
      child.on("error", (err) => {
        resolve({ success: false, error: `Failed to spawn iamf-enc: ${err.message}` });
      });
    });
  } catch (e) {
    return { success: false, error: e.message };
  }
}
async function handleAmbix2CAF(event, options) {
  const { inputPath, layout, bitDepth } = options;
  try {
    const outputPath = inputPath.replace(/\.[^/.]+$/, "") + ".caf";
    let codec = "pcm_s24le";
    if (bitDepth === "32") codec = "pcm_f32le";
    if (bitDepth === "16") codec = "pcm_s16le";
    const ffmpegPath = getFfmpegPath();
    const args = [
      "-y",
      "-i",
      inputPath,
      "-c:a",
      codec,
      "-f",
      "caf"
      // explicitly set format to Core Audio Format
    ];
    if (layout === "discrete") {
    }
    if (layout === "hoa") {
      console.warn("[Ambix2CAF] HOA metadata tagging requested but FFmpeg support is limited. Proceeding with discrete mapping.");
    }
    args.push(outputPath);
    console.log(`[Ambix2CAF] Spawning: ${ffmpegPath} ${args.join(" ")}`);
    return new Promise((resolve) => {
      const child = spawn(ffmpegPath, args);
      let stderr = "";
      child.stderr.on("data", (d) => stderr += d.toString());
      child.on("close", (code) => {
        if (code === 0) {
          event.sender.send("task-progress", 1);
          resolve({ success: true, data: { outputPath } });
        } else {
          resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr}` });
        }
      });
      child.on("error", (err) => {
        resolve({ success: false, error: err.message });
      });
    });
  } catch (e) {
    return { success: false, error: e.message };
  }
}
async function handleAmbiOrder(event, options) {
  const { inputPath, targetOrder } = options;
  try {
    const cleanOrder = targetOrder.replace(/\s+/g, "_").replace(/_Order$/, "");
    const outputPath = inputPath.replace(/\.[^/.]+$/, "") + `_${cleanOrder}_Order.wav`;
    let targetChannels = 4;
    if (targetOrder.includes("1st")) targetChannels = 4;
    else if (targetOrder.includes("2nd")) targetChannels = 9;
    else if (targetOrder.includes("3rd")) targetChannels = 16;
    else if (targetOrder.includes("0th") || targetOrder.includes("Zero")) targetChannels = 1;
    else if (targetOrder.includes("4th")) targetChannels = 25;
    else if (targetOrder.includes("5th")) targetChannels = 36;
    else if (targetOrder.includes("6th")) targetChannels = 49;
    else if (targetOrder.includes("7th")) targetChannels = 64;
    let mapStr = "";
    const limit = targetChannels;
    for (let i = 0; i < limit; i++) {
      mapStr += `${i}`;
      if (i < limit - 1) mapStr += "|";
    }
    const ffmpegPath = getFfmpegPath();
    const args = [
      "-y",
      "-i",
      inputPath,
      "-filter_complex",
      `channelmap=${mapStr}`,
      outputPath
    ];
    console.log(`[AmbiOrder] Spawning: ${ffmpegPath} ${args.join(" ")}`);
    return new Promise((resolve) => {
      const child = spawn(ffmpegPath, args);
      let stderr = "";
      child.stderr.on("data", (d) => stderr += d.toString());
      child.on("close", (code) => {
        if (code === 0) {
          event.sender.send("task-progress", 1);
          resolve({ success: true, data: { outputPath } });
        } else {
          resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr}` });
        }
      });
      child.on("error", (err) => {
        resolve({ success: false, error: err.message });
      });
    });
  } catch (e) {
    return { success: false, error: e.message };
  }
}
async function handleAmbiSwap(event, options) {
  const { inputPath, direction } = options;
  try {
    const stats = await probeAudio(inputPath);
    const channels = stats.channels;
    if (direction === "AmbixToFuMa" && channels > 16) {
      return {
        success: false,
        error: "FuMa format supports a maximum of 3rd Order (16 channels)."
      };
    }
    const gainToFuMa = "0.70710678";
    const gainToAmbiX = "1.41421356";
    let filter = "";
    if (channels === 4) {
      if (direction === "AmbixToFuMa") {
        filter = `pan=4c|c0=${gainToFuMa}*c0|c1=c3|c2=c1|c3=c2`;
      } else {
        filter = `pan=4c|c0=${gainToAmbiX}*c0|c1=c2|c2=c3|c3=c1`;
        filter = `pan=4c|c0=${gainToAmbiX}*c0|c1=c2|c2=c3|c3=c1`;
      }
    } else if (channels === 9 || channels === 16) {
      const ambixToFuMaIndices = [0, 3, 1, 2, 6, 7, 5, 8, 4, 12, 13, 11, 14, 10, 15, 9];
      const fuMaToAmbixIndices = [0, 2, 3, 1, 8, 6, 4, 5, 7, 15, 13, 11, 9, 10, 12, 14];
      const mapIndices = direction === "AmbixToFuMa" ? ambixToFuMaIndices : fuMaToAmbixIndices;
      const gain = direction === "AmbixToFuMa" ? gainToFuMa : gainToAmbiX;
      let parts = [`c0=${gain}*c${mapIndices[0]}`];
      for (let i = 1; i < channels; i++) {
        parts.push(`c${i}=c${mapIndices[i]}`);
      }
      filter = `pan=${channels}c|${parts.join("|")}`;
    } else {
      return { success: false, error: `Unsupported channel count: ${channels}. Only 4, 9, or 16 channels supported for AmbiSwap.` };
    }
    const suffix = direction === "AmbixToFuMa" ? "_FuMa" : "_AmbiX";
    const outputPath = inputPath.replace(/\.[^/.]+$/, "") + `${suffix}.wav`;
    const ffmpegPath = getFfmpegPath();
    const args = [
      "-y",
      "-i",
      inputPath,
      "-c:a",
      "pcm_s24le",
      "-filter_complex",
      filter,
      outputPath
    ];
    console.log(`[AmbiSwap] Spawning: ${ffmpegPath} ${args.join(" ")}`);
    return new Promise((resolve) => {
      const child = spawn(ffmpegPath, args);
      let stderr = "";
      child.stderr.on("data", (d) => stderr += d.toString());
      child.on("close", (code) => {
        if (code === 0) {
          event.sender.send("task-progress", 1);
          resolve({ success: true, data: { outputPath } });
        } else {
          resolve({ success: false, error: `FFmpeg exited with code ${code}. Log: ${stderr}` });
        }
      });
      child.on("error", (err) => {
        resolve({ success: false, error: err.message });
      });
    });
  } catch (e) {
    return { success: false, error: e.message };
  }
}
const handlers = {};
handlers["ambix2opus"] = handleAmbix2Opus;
handlers["ambix2bin"] = handleAmbix2Bin;
handlers["ambix2iamf"] = handleAmbix2IAMF;
handlers["ambix2caf"] = handleAmbix2CAF;
handlers["ambiorder"] = handleAmbiOrder;
handlers["ambiswap"] = handleAmbiSwap;
async function dispatchTask(event, toolId, options) {
  const handler = handlers[toolId];
  if (!handler) {
    console.warn(`[Dispatcher] No handler found for toolId: ${toolId}`);
    return { success: false, error: `Tool ${toolId} not implemented yet.` };
  }
  try {
    console.log(`[Dispatcher] Dispatching ${toolId} task...`);
    return await handler(event, options);
  } catch (err) {
    console.error(`[Dispatcher] Error in ${toolId}:`, err);
    return { success: false, error: err.message };
  }
}
createRequire(import.meta.url);
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  ipcMain.handle("run-task", async (event, toolId, options) => {
    return await dispatchTask(event, toolId, options);
  });
  ipcMain.handle("inspect-file", async (event, path2) => {
    try {
      const info = await probeAudio(path2);
      return { success: true, data: info };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
