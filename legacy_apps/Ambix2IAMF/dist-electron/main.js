import { app, BrowserWindow, ipcMain } from "electron";
import require$$0$2 from "child_process";
import require$$0$1 from "path";
import require$$0 from "fs";
import path$3 from "node:path";
import fs$1 from "node:fs";
import os from "node:os";
import { fileURLToPath } from "node:url";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var crossSpawn = { exports: {} };
var windows;
var hasRequiredWindows;
function requireWindows() {
  if (hasRequiredWindows) return windows;
  hasRequiredWindows = 1;
  windows = isexe2;
  isexe2.sync = sync2;
  var fs2 = require$$0;
  function checkPathExt(path2, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path2.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path2, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path2, options);
  }
  function isexe2(path2, options, cb) {
    fs2.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path2, options));
    });
  }
  function sync2(path2, options) {
    return checkStat(fs2.statSync(path2), path2, options);
  }
  return windows;
}
var mode;
var hasRequiredMode;
function requireMode() {
  if (hasRequiredMode) return mode;
  hasRequiredMode = 1;
  mode = isexe2;
  isexe2.sync = sync2;
  var fs2 = require$$0;
  function isexe2(path2, options, cb) {
    fs2.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync2(path2, options) {
    return checkStat(fs2.statSync(path2), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
  return mode;
}
var core;
if (process.platform === "win32" || commonjsGlobal.TESTING_WINDOWS) {
  core = requireWindows();
} else {
  core = requireMode();
}
var isexe_1 = isexe$1;
isexe$1.sync = sync;
function isexe$1(path2, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  if (!cb) {
    if (typeof Promise !== "function") {
      throw new TypeError("callback not provided");
    }
    return new Promise(function(resolve, reject) {
      isexe$1(path2, options || {}, function(er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    });
  }
  core(path2, options || {}, function(er, is) {
    if (er) {
      if (er.code === "EACCES" || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}
function sync(path2, options) {
  try {
    return core.sync(path2, options || {});
  } catch (er) {
    if (options && options.ignoreErrors || er.code === "EACCES") {
      return false;
    } else {
      throw er;
    }
  }
}
const isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
const path$2 = require$$0$1;
const COLON = isWindows ? ";" : ":";
const isexe = isexe_1;
const getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON;
  const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...isWindows ? [process.cwd()] : [],
    ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(colon)
  ];
  const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
  const pathExt = isWindows ? pathExtExe.split(colon) : [""];
  if (isWindows) {
    if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
      pathExt.unshift("");
  }
  return {
    pathEnv,
    pathExt,
    pathExtExe
  };
};
const which$1 = (cmd, opt, cb) => {
  if (typeof opt === "function") {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  const step = (i) => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$2.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    resolve(subStep(p, i, 0));
  });
  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1));
    const ext = pathExt[ii];
    isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext);
        else
          return resolve(p + ext);
      }
      return resolve(subStep(p, i, ii + 1));
    });
  });
  return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
};
const whichSync = (cmd, opt) => {
  opt = opt || {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (let i = 0; i < pathEnv.length; i++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$2.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    for (let j = 0; j < pathExt.length; j++) {
      const cur = p + pathExt[j];
      try {
        const is = isexe.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur;
        }
      } catch (ex) {
      }
    }
  }
  if (opt.all && found.length)
    return found;
  if (opt.nothrow)
    return null;
  throw getNotFoundError(cmd);
};
var which_1 = which$1;
which$1.sync = whichSync;
var pathKey$1 = { exports: {} };
const pathKey = (options = {}) => {
  const environment = options.env || process.env;
  const platform = options.platform || process.platform;
  if (platform !== "win32") {
    return "PATH";
  }
  return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
};
pathKey$1.exports = pathKey;
pathKey$1.exports.default = pathKey;
var pathKeyExports = pathKey$1.exports;
const path$1 = require$$0$1;
const which = which_1;
const getPathKey = pathKeyExports;
function resolveCommandAttempt(parsed, withoutPathExt) {
  const env = parsed.options.env || process.env;
  const cwd = process.cwd();
  const hasCustomCwd = parsed.options.cwd != null;
  const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
  if (shouldSwitchCwd) {
    try {
      process.chdir(parsed.options.cwd);
    } catch (err) {
    }
  }
  let resolved;
  try {
    resolved = which.sync(parsed.command, {
      path: env[getPathKey({ env })],
      pathExt: withoutPathExt ? path$1.delimiter : void 0
    });
  } catch (e) {
  } finally {
    if (shouldSwitchCwd) {
      process.chdir(cwd);
    }
  }
  if (resolved) {
    resolved = path$1.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
  }
  return resolved;
}
function resolveCommand$1(parsed) {
  return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
var resolveCommand_1 = resolveCommand$1;
var _escape = {};
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function escapeCommand(arg) {
  arg = arg.replace(metaCharsRegExp, "^$1");
  return arg;
}
function escapeArgument(arg, doubleEscapeMetaChars) {
  arg = `${arg}`;
  arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
  arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
  arg = `"${arg}"`;
  arg = arg.replace(metaCharsRegExp, "^$1");
  if (doubleEscapeMetaChars) {
    arg = arg.replace(metaCharsRegExp, "^$1");
  }
  return arg;
}
_escape.command = escapeCommand;
_escape.argument = escapeArgument;
var shebangRegex$1 = /^#!(.*)/;
const shebangRegex = shebangRegex$1;
var shebangCommand$1 = (string = "") => {
  const match = string.match(shebangRegex);
  if (!match) {
    return null;
  }
  const [path2, argument] = match[0].replace(/#! ?/, "").split(" ");
  const binary = path2.split("/").pop();
  if (binary === "env") {
    return argument;
  }
  return argument ? `${binary} ${argument}` : binary;
};
const fs = require$$0;
const shebangCommand = shebangCommand$1;
function readShebang$1(command) {
  const size = 150;
  const buffer = Buffer.alloc(size);
  let fd;
  try {
    fd = fs.openSync(command, "r");
    fs.readSync(fd, buffer, 0, size, 0);
    fs.closeSync(fd);
  } catch (e) {
  }
  return shebangCommand(buffer.toString());
}
var readShebang_1 = readShebang$1;
const path = require$$0$1;
const resolveCommand = resolveCommand_1;
const escape = _escape;
const readShebang = readShebang_1;
const isWin$1 = process.platform === "win32";
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function detectShebang(parsed) {
  parsed.file = resolveCommand(parsed);
  const shebang = parsed.file && readShebang(parsed.file);
  if (shebang) {
    parsed.args.unshift(parsed.file);
    parsed.command = shebang;
    return resolveCommand(parsed);
  }
  return parsed.file;
}
function parseNonShell(parsed) {
  if (!isWin$1) {
    return parsed;
  }
  const commandFile = detectShebang(parsed);
  const needsShell = !isExecutableRegExp.test(commandFile);
  if (parsed.options.forceShell || needsShell) {
    const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
    parsed.command = path.normalize(parsed.command);
    parsed.command = escape.command(parsed.command);
    parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
    const shellCommand = [parsed.command].concat(parsed.args).join(" ");
    parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
    parsed.command = process.env.comspec || "cmd.exe";
    parsed.options.windowsVerbatimArguments = true;
  }
  return parsed;
}
function parse$1(command, args, options) {
  if (args && !Array.isArray(args)) {
    options = args;
    args = null;
  }
  args = args ? args.slice(0) : [];
  options = Object.assign({}, options);
  const parsed = {
    command,
    args,
    options,
    file: void 0,
    original: {
      command,
      args
    }
  };
  return options.shell ? parsed : parseNonShell(parsed);
}
var parse_1 = parse$1;
const isWin = process.platform === "win32";
function notFoundError(original, syscall) {
  return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${syscall} ${original.command}`,
    path: original.command,
    spawnargs: original.args
  });
}
function hookChildProcess(cp2, parsed) {
  if (!isWin) {
    return;
  }
  const originalEmit = cp2.emit;
  cp2.emit = function(name, arg1) {
    if (name === "exit") {
      const err = verifyENOENT(arg1, parsed);
      if (err) {
        return originalEmit.call(cp2, "error", err);
      }
    }
    return originalEmit.apply(cp2, arguments);
  };
}
function verifyENOENT(status, parsed) {
  if (isWin && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawn");
  }
  return null;
}
function verifyENOENTSync(status, parsed) {
  if (isWin && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawnSync");
  }
  return null;
}
var enoent$1 = {
  hookChildProcess,
  verifyENOENT,
  verifyENOENTSync,
  notFoundError
};
const cp = require$$0$2;
const parse = parse_1;
const enoent = enoent$1;
function spawn(command, args, options) {
  const parsed = parse(command, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  enoent.hookChildProcess(spawned, parsed);
  return spawned;
}
function spawnSync(command, args, options) {
  const parsed = parse(command, args, options);
  const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}
crossSpawn.exports = spawn;
var spawn_1 = crossSpawn.exports.spawn = spawn;
crossSpawn.exports.sync = spawnSync;
crossSpawn.exports._parse = parse;
crossSpawn.exports._enoent = enoent;
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
function getBinaryPath(name, customPath) {
  if (customPath) return customPath;
  if (app.isPackaged) {
    return path$3.join(process.resourcesPath, "bin", name);
  }
  return path$3.join(process.cwd(), "resources", "bin", name);
}
function getFfmpegPath(customPath) {
  return getBinaryPath("ffmpeg", customPath);
}
function getIamfEncPath() {
  return getBinaryPath("iamf-enc");
}
function probeAudio(filePath, ffmpegPath) {
  return new Promise((resolve, reject) => {
    const args = ["-i", filePath, "-hide_banner"];
    console.log(`Probing audio: ${ffmpegPath} ${args.join(" ")}`);
    const ffmpeg = spawn_1(ffmpegPath, args);
    let stderr = "";
    ffmpeg.stderr.on("data", (d) => stderr += d);
    ffmpeg.on("error", (err) => {
      console.error("Probing failed to start:", err);
      reject(new Error(`FFmpeg failed to start: ${err.message}`));
    });
    ffmpeg.on("close", (code) => {
      const durationMatch = stderr.match(/Duration: (\d{2}):(\d{2}):(\d{2}\.\d{2})/);
      const rateMatch = stderr.match(/(\d+) Hz/);
      if (durationMatch && rateMatch) {
        const hours = parseFloat(durationMatch[1]);
        const minutes = parseFloat(durationMatch[2]);
        const seconds = parseFloat(durationMatch[3]);
        const rate = parseInt(rateMatch[1], 10);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        const durationSamples = Math.floor(totalSeconds * rate);
        console.log(`Probe success: ${durationSamples} samples, ${rate} Hz`);
        resolve({ durationSamples, sampleRate: rate });
      } else {
        console.error("Probe failed. Stderr output:\n", stderr);
        reject(new Error(`Could not probe audio file duration/rate. Code: ${code}. Output: ${stderr.substring(0, 500)}...`));
      }
    });
  });
}
function convertFileWithFFmpeg(filePath, customFfmpegPath, qualityKbps) {
  const output = filePath.replace(/\.[^/.]+$/, "") + ".iamf";
  if (output.endsWith(".iamf")) {
    return convertToIamf(filePath, output, qualityKbps, customFfmpegPath);
  }
  return convertToGeneric(filePath, output, customFfmpegPath);
}
async function convertToIamf(inputFile, outputFile, qualityKbps = 96, customFfmpegPath) {
  const ffmpegPath = getFfmpegPath(customFfmpegPath);
  const iamfEncPath = getIamfEncPath();
  const { durationSamples, sampleRate } = await probeAudio(inputFile, ffmpegPath);
  const inputDir = path$3.dirname(inputFile);
  const inputBasename = path$3.basename(inputFile);
  const configContent = generateIamfConfig(inputBasename, durationSamples, sampleRate, qualityKbps);
  const configPath = path$3.join(os.tmpdir(), `iamf_config_${Date.now()}.textproto`);
  await fs$1.promises.writeFile(configPath, configContent);
  return new Promise((resolve, reject) => {
    const outputDir = path$3.dirname(outputFile);
    const args = [
      `--user_metadata_filename=${configPath}`,
      `--input_wav_directory=${inputDir}`,
      `--output_iamf_directory=${outputDir}`
    ];
    console.log(`Spawning iamf-enc: ${iamfEncPath}`, args);
    const process2 = spawn_1(iamfEncPath, args);
    let stdout = "";
    let stderr = "";
    process2.stdout.on("data", (d) => stdout += d);
    process2.stderr.on("data", (d) => stderr += d);
    process2.on("close", async (code) => {
      if (code === 0) {
        const generatedFile = path$3.join(outputDir, "output.iamf");
        if (generatedFile !== outputFile) {
          try {
            await fs$1.promises.rename(generatedFile, outputFile);
          } catch (e) {
            console.error("Rename failed", e);
          }
        }
        resolve(outputFile);
      } else {
        reject(new Error(`iamf-enc failed with code ${code}
Stdout: ${stdout}
Stderr: ${stderr}`));
      }
    });
  });
}
function convertToGeneric(filePath, output, customFfmpegPath) {
  return new Promise((resolve, reject) => {
    const ffmpegPath = getFfmpegPath(customFfmpegPath);
    const args = [
      "-y",
      "-i",
      filePath,
      "-mapping_family",
      "2",
      "-c:a",
      "libopus",
      "-b:a",
      "2560k",
      output
    ];
    console.log(`Spawning FFmpeg: ${ffmpegPath} with args:`, args);
    const ffmpeg = spawn_1(ffmpegPath, args);
    let stderrData = "";
    ffmpeg.stderr.on("data", (data) => {
      stderrData += data.toString();
      console.error(`FFmpeg stderr: ${data}`);
    });
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`FFmpeg process exited with code ${code}. Error: ${stderrData}`));
      }
    });
    ffmpeg.on("error", (err) => {
      reject(err);
    });
  });
}
const __dirname$1 = path$3.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$3.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$3.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$3.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$3.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path$3.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$3.join(__dirname$1, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$3.join(RENDERER_DIST, "index.html"));
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
  ipcMain.handle("convert-file", async (_event, filePath, customFfmpegPath, qualityKbps) => {
    return convertFileWithFFmpeg(filePath, customFfmpegPath, qualityKbps);
  });
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
