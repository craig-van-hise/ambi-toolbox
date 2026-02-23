import log from 'electron-log/renderer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

Object.assign(console, log.functions);
log.errorHandler.startCatching();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Use contextBridge
// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })
