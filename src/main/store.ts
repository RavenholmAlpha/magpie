import Store from 'electron-store';
import { Collection, Environment, HistoryItem, RequestConfig } from '../renderer/types';

interface StoreSchema {
  collections: Collection[];
  environments: Environment[];
  history: HistoryItem[];
  settings: {
    theme: 'dark' | 'light';
    fontSize: number;
    activeEnvironment: string | null;
  };
  lastRequest: RequestConfig | null;
}

// 创建持久化存储实例
const store = new Store<StoreSchema>({
  defaults: {
    collections: [],
    environments: [],
    history: [],
    settings: {
      theme: 'dark',
      fontSize: 14,
      activeEnvironment: null,
    },
    lastRequest: null,
  },
});

// 导出存储操作函数
export const storeAPI = {
  // 集合操作
  getCollections: (): Collection[] => store.get('collections', []),
  setCollections: (collections: Collection[]) => store.set('collections', collections),
  addCollection: (collection: Collection) => {
    const collections = store.get('collections', []);
    collections.push(collection);
    store.set('collections', collections);
    return collections;
  },
  updateCollection: (id: string, updates: Partial<Collection>) => {
    const collections = store.get('collections', []);
    const index = collections.findIndex((c) => c.id === id);
    if (index !== -1) {
      collections[index] = { ...collections[index], ...updates };
      store.set('collections', collections);
    }
    return collections;
  },
  deleteCollection: (id: string) => {
    const collections = store.get('collections', []).filter((c) => c.id !== id);
    store.set('collections', collections);
    return collections;
  },

  // 环境操作
  getEnvironments: (): Environment[] => store.get('environments', []),
  setEnvironments: (environments: Environment[]) => store.set('environments', environments),
  addEnvironment: (environment: Environment) => {
    const environments = store.get('environments', []);
    environments.push(environment);
    store.set('environments', environments);
    return environments;
  },
  updateEnvironment: (id: string, updates: Partial<Environment>) => {
    const environments = store.get('environments', []);
    const index = environments.findIndex((e) => e.id === id);
    if (index !== -1) {
      environments[index] = { ...environments[index], ...updates };
      store.set('environments', environments);
    }
    return environments;
  },
  deleteEnvironment: (id: string) => {
    const environments = store.get('environments', []).filter((e) => e.id !== id);
    store.set('environments', environments);
    return environments;
  },

  // 历史记录操作
  getHistory: (): HistoryItem[] => store.get('history', []),
  setHistory: (history: HistoryItem[]) => store.set('history', history),
  addHistory: (item: HistoryItem) => {
    const history = store.get('history', []);
    history.unshift(item); // 添加到开头
    // 只保留最近1000条
    if (history.length > 1000) {
      history.splice(1000);
    }
    store.set('history', history);
    return history;
  },
  clearHistory: () => {
    store.set('history', []);
    return [];
  },

  // 设置操作
  getSettings: () => store.get('settings'),
  updateSettings: (updates: Partial<StoreSchema['settings']>) => {
    const settings = store.get('settings');
    const newSettings = { ...settings, ...updates };
    store.set('settings', newSettings);
    return newSettings;
  },

  // 最后请求
  getLastRequest: (): RequestConfig | null => store.get('lastRequest', null),
  setLastRequest: (request: RequestConfig | null) => store.set('lastRequest', request),

  // 清除所有数据
  clearAll: () => {
    store.clear();
  },
};

export default store;

