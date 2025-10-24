import { Collection, Environment } from '../types';

// 导出集合为JSON文件
export function exportCollection(collection: Collection) {
  const dataStr = JSON.stringify(collection, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${collection.name}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 导出所有集合
export function exportAllCollections(collections: Collection[]) {
  const dataStr = JSON.stringify({ collections }, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `magpie-collections-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 导出环境
export function exportEnvironment(environment: Environment) {
  const dataStr = JSON.stringify(environment, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${environment.name}-env.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 导出所有环境
export function exportAllEnvironments(environments: Environment[]) {
  const dataStr = JSON.stringify({ environments }, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `magpie-environments-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// 导入集合
export function importCollection(file: File): Promise<Collection | Collection[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // 检查是否是单个集合
        if (data.id && data.name && data.requests) {
          resolve(data as Collection);
        }
        // 检查是否是多个集合
        else if (data.collections && Array.isArray(data.collections)) {
          resolve(data.collections as Collection[]);
        }
        else {
          reject(new Error('无效的集合文件格式'));
        }
      } catch (error) {
        reject(new Error('JSON解析失败'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    
    reader.readAsText(file);
  });
}

// 导入环境
export function importEnvironment(file: File): Promise<Environment | Environment[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // 检查是否是单个环境
        if (data.id && data.name && data.variables) {
          resolve(data as Environment);
        }
        // 检查是否是多个环境
        else if (data.environments && Array.isArray(data.environments)) {
          resolve(data.environments as Environment[]);
        }
        else {
          reject(new Error('无效的环境文件格式'));
        }
      } catch (error) {
        reject(new Error('JSON解析失败'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    
    reader.readAsText(file);
  });
}

// 导出完整数据（集合+环境）
export function exportAllData(collections: Collection[], environments: Environment[]) {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    collections,
    environments,
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `magpie-backup-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

