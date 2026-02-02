"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  runTask: (toolId, options) => electron.ipcRenderer.invoke("run-task", toolId, options),
  onProgress: (callback) => {
    const subscription = (_event, progress) => callback(progress);
    electron.ipcRenderer.on("task-progress", subscription);
    return () => electron.ipcRenderer.removeListener("task-progress", subscription);
  },
  onStatus: (callback) => {
    const subscription = (_event, message) => callback(message);
    electron.ipcRenderer.on("task-status", subscription);
    return () => electron.ipcRenderer.removeListener("task-status", subscription);
  },
  onError: (callback) => {
    const subscription = (_event, error) => callback(error);
    electron.ipcRenderer.on("task-error", subscription);
    return () => electron.ipcRenderer.removeListener("task-error", subscription);
  },
  inspectFile: (path) => electron.ipcRenderer.invoke("inspect-file", path),
  readFile: (path) => electron.ipcRenderer.invoke("read-file", path),
  getFileSize: (path) => electron.ipcRenderer.invoke("get-file-size", path),
  readChunk: (path, offset, size) => electron.ipcRenderer.invoke("read-chunk", path, offset, size)
});
