import { contextBridge, ipcRenderer } from 'electron';

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 集合管理
  getCollections: () => ipcRenderer.invoke('store:getCollections'),
  addCollection: (collection: any) => ipcRenderer.invoke('store:addCollection', collection),
  updateCollection: (id: string, updates: any) => ipcRenderer.invoke('store:updateCollection', id, updates),
  deleteCollection: (id: string) => ipcRenderer.invoke('store:deleteCollection', id),
  
  // 环境管理
  getEnvironments: () => ipcRenderer.invoke('store:getEnvironments'),
  addEnvironment: (environment: any) => ipcRenderer.invoke('store:addEnvironment', environment),
  updateEnvironment: (id: string, updates: any) => ipcRenderer.invoke('store:updateEnvironment', id, updates),
  deleteEnvironment: (id: string) => ipcRenderer.invoke('store:deleteEnvironment', id),
  
  // 历史记录
  getHistory: () => ipcRenderer.invoke('store:getHistory'),
  addHistory: (item: any) => ipcRenderer.invoke('store:addHistory', item),
  clearHistory: () => ipcRenderer.invoke('store:clearHistory'),
  
  // 设置
  getSettings: () => ipcRenderer.invoke('store:getSettings'),
  updateSettings: (updates: any) => ipcRenderer.invoke('store:updateSettings', updates),
  
  // 最后请求
  getLastRequest: () => ipcRenderer.invoke('store:getLastRequest'),
  setLastRequest: (request: any) => ipcRenderer.invoke('store:setLastRequest', request),
  
  // 窗口控制
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  toggleDevTools: () => ipcRenderer.send('window:toggleDevTools'),
});

// 类型定义（供TypeScript使用）
export interface ElectronAPI {
  // 集合管理
  getCollections: () => Promise<any[]>;
  addCollection: (collection: any) => Promise<any[]>;
  updateCollection: (id: string, updates: any) => Promise<any[]>;
  deleteCollection: (id: string) => Promise<any[]>;
  
  // 环境管理
  getEnvironments: () => Promise<any[]>;
  addEnvironment: (environment: any) => Promise<any[]>;
  updateEnvironment: (id: string, updates: any) => Promise<any[]>;
  deleteEnvironment: (id: string) => Promise<any[]>;
  
  // 历史记录
  getHistory: () => Promise<any[]>;
  addHistory: (item: any) => Promise<any[]>;
  clearHistory: () => Promise<any[]>;
  
  // 设置
  getSettings: () => Promise<any>;
  updateSettings: (updates: any) => Promise<any>;
  
  // 最后请求
  getLastRequest: () => Promise<any>;
  setLastRequest: (request: any) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

