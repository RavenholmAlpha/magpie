import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { storeAPI } from './store';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    frame: false, // 无边框窗口
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/preload.js'),
    },
    title: 'Magpie - HTTP API 测试工具',
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, '../renderer/magpie.png'),
  });

  // 开发环境加载Vite开发服务器
  const isDev = !app.isPackaged;
  if (isDev) {
    // 简化的端口检测
    const loadDevServer = async () => {
      if (!mainWindow) return;
      
      const ports = [5173, 5174, 5175, 3000, 8080];
      let loaded = false;
      
      for (const port of ports) {
        try {
          console.log(`🔍 Trying port ${port}...`);
          
          // 使用fetch检测端口
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          
          const response = await fetch(`http://localhost:${port}`, {
            method: 'HEAD',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            await mainWindow.loadURL(`http://localhost:${port}`);
            mainWindow.webContents.openDevTools();
            console.log(`✅ Successfully loaded dev server on port ${port}`);
            loaded = true;
            break;
          }
        } catch (err) {
          console.log(`❌ Port ${port} not available: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
      
      if (!loaded) {
        console.error('❌ No available port found');
        showErrorPage();
      }
    };
    
    const showErrorPage = () => {
      if (!mainWindow) return;
      mainWindow.loadURL(`data:text/html,
        <html>
          <body style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
            <h2>🚫 开发服务器连接失败</h2>
            <p>无法连接到Vite开发服务器，请检查：</p>
            <ul>
              <li>确保运行了 <code>npm run dev</code></li>
              <li>检查端口 5173, 5174, 5175 是否被占用</li>
              <li>重启开发服务器</li>
            </ul>
            <p>尝试的端口: 5173, 5174, 5175, 3000, 8080, 4000, 5000</p>
            <button onclick="location.reload()" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
              重新检测
            </button>
          </body>
        </html>
      `);
    };
    
    // 延迟加载，给Vite服务器启动时间
    setTimeout(loadDevServer, 1000);
  } else {
    // 生产环境加载构建后的文件
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 添加键盘快捷键支持
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // F12 键打开/关闭开发者工具
    if (input.key === 'F12' && input.type === 'keyDown') {
      mainWindow?.webContents.toggleDevTools();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC通信处理 - 集合管理
ipcMain.handle('store:getCollections', async () => {
  return storeAPI.getCollections();
});

ipcMain.handle('store:addCollection', async (_, collection) => {
  return storeAPI.addCollection(collection);
});

ipcMain.handle('store:updateCollection', async (_, id, updates) => {
  return storeAPI.updateCollection(id, updates);
});

ipcMain.handle('store:deleteCollection', async (_, id) => {
  return storeAPI.deleteCollection(id);
});

// 环境管理
ipcMain.handle('store:getEnvironments', async () => {
  return storeAPI.getEnvironments();
});

ipcMain.handle('store:addEnvironment', async (_, environment) => {
  return storeAPI.addEnvironment(environment);
});

ipcMain.handle('store:updateEnvironment', async (_, id, updates) => {
  return storeAPI.updateEnvironment(id, updates);
});

ipcMain.handle('store:deleteEnvironment', async (_, id) => {
  return storeAPI.deleteEnvironment(id);
});

// 历史记录管理
ipcMain.handle('store:getHistory', async () => {
  return storeAPI.getHistory();
});

ipcMain.handle('store:addHistory', async (_, item) => {
  return storeAPI.addHistory(item);
});

ipcMain.handle('store:clearHistory', async () => {
  return storeAPI.clearHistory();
});

// 设置管理
ipcMain.handle('store:getSettings', async () => {
  return storeAPI.getSettings();
});

ipcMain.handle('store:updateSettings', async (_, updates) => {
  return storeAPI.updateSettings(updates);
});

// 最后请求
ipcMain.handle('store:getLastRequest', async () => {
  return storeAPI.getLastRequest();
});

ipcMain.handle('store:setLastRequest', async (_, request) => {
  return storeAPI.setLastRequest(request);
});

// 窗口控制
ipcMain.on('window:minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('window:maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window:close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.on('window:toggleDevTools', () => {
  if (mainWindow) {
    mainWindow.webContents.toggleDevTools();
  }
});

