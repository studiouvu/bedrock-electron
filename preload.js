const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  windowControl: (action) => ipcRenderer.send('window-control', action), // 창 제어 이벤트를 메인 프로세스로 전송
  getDeviceId: () => {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = generateUUID();
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  }
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}