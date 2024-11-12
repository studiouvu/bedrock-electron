const { contextBridge, ipcRenderer } = require('electron');
const Store = require('electron-store');
const { v4: uuidv4 } = require('uuid');

try {
  console.log('Preload script loaded');

  // Initialize store
  const store = new Store();

  // Get or generate deviceId
  let deviceId = store.get('deviceId');
  if (!deviceId) {
    deviceId = uuidv4();
    store.set('deviceId', deviceId);
    console.log('Generated new deviceId:', deviceId);
  } else {
    console.log('Retrieved existing deviceId:', deviceId);
  }

  // Expose APIs to the renderer process
  contextBridge.exposeInMainWorld('api', {
    getDeviceId: () => deviceId,
    windowControl: (action) => ipcRenderer.send('window-control', action)
  });

  console.log('API exposed to renderer process');
} catch (error) {
  console.error('Error in preload.js:', error);
}