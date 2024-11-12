const { app, BrowserWindow, shell, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('lang', 'en-US'); // 예: 영어(미국)로 설정

let mainWindow; // 전역 변수로 창 참조 유지

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false, // 프레임리스 창
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // __dirname을 사용하여 preload 스크립트의 절대 경로 설정
      contextIsolation: true,
      enableRemoteModule: true, // 필요한 경우
      nodeIntegration: true     // 필요한 경우
    }
  });

  // 로컬 index.html 로드
  mainWindow.loadFile('index.html');

  // 개발자 도구 자동 열기
  // if (process.env.NODE_ENV === 'development') {
  mainWindow.webContents.openDevTools();
  // }

  // 메뉴 바 제거
  Menu.setApplicationMenu(null);

  // 외부 링크를 기본 브라우저에서 열기
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  ipcMain.on('window-control', (event, action) => {
    switch (action) {
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'maximize':
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
        break;
      case 'close':
        mainWindow.close();
        break;
    }
  });

  // 창이 닫힐 때 참조 해제
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});