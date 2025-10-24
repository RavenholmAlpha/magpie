import { KeyValuePair } from '../types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function createKeyValuePair(key = '', value = '', enabled = true): KeyValuePair {
  return {
    id: generateId(),
    key,
    value,
    enabled,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatTime(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

export function formatJson(json: any): string {
  try {
    return JSON.stringify(json, null, 2);
  } catch {
    return String(json);
  }
}

export function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return '#10b981'; // 绿色
  if (status >= 300 && status < 400) return '#3b82f6'; // 蓝色
  if (status >= 400 && status < 500) return '#f59e0b'; // 橙色
  if (status >= 500) return '#ef4444'; // 红色
  return '#6b7280'; // 灰色
}

export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('保存数据失败:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('加载数据失败:', error);
    return defaultValue;
  }
}

