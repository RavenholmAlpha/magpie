import React, { useState, useRef } from 'react';
import { Collection, HistoryItem, RequestConfig } from '../types';
import { generateId } from '../utils/helpers';
import { exportAllCollections, importCollection } from '../utils/importExport';

interface SidebarProps {
  collections: Collection[];
  history: HistoryItem[];
  onAddCollection: (collection: Collection) => void;
  onLoadRequest: (request: RequestConfig) => void;
  onDeleteCollection: (collectionId: string) => void;
  onDeleteRequest: (collectionId: string, requestId: string) => void;
  onClearHistory: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collections,
  history,
  onAddCollection,
  onLoadRequest,
  onDeleteCollection,
  onDeleteRequest,
  onClearHistory,
}) => {
  const [activeTab, setActiveTab] = useState<'collections' | 'history'>('history');
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      const newCollection: Collection = {
        id: generateId(),
        name: newCollectionName,
        requests: [],
      };
      onAddCollection(newCollection);
      setNewCollectionName('');
      setShowNewCollection(false);
    }
  };

  const handleExportCollections = () => {
    if (collections.length === 0) {
      alert('暂无集合可导出');
      return;
    }
    exportAllCollections(collections);
  };

  const handleImportCollections = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await importCollection(file);
      if (Array.isArray(result)) {
        result.forEach((collection) => {
          collection.id = generateId(); // 重新生成ID避免冲突
          onAddCollection(collection);
        });
        alert(`成功导入 ${result.length} 个集合`);
      } else {
        result.id = generateId();
        onAddCollection(result);
        alert('集合导入成功！');
      }
    } catch (error: any) {
      alert(`导入失败: ${error.message}`);
    }

    // 重置input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 过滤历史记录
  const filteredHistory = searchTerm
    ? history.filter((item) =>
        item.request.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.request.method.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : history;

  // 过滤集合
  const filteredCollections = searchTerm
    ? collections.filter((collection) =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        collection.requests.some(
          (req) =>
            req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.url.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : collections;

  return (
    <div className="sidebar">
      <div className="sidebar-content-only">
        <div className="collections-list">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="🔍 搜索集合..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="collection-actions">
              <button className="btn-add-collection" onClick={() => setShowNewCollection(true)}>
                New Collection
              </button>
              <div className="collection-import-export">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={handleImportCollections}
                />
                <button 
                  className="btn-import" 
                  onClick={() => fileInputRef.current?.click()}
                  title="Import collections"
                >
                  Import
                </button>
                <button 
                  className="btn-export" 
                  onClick={handleExportCollections}
                  title="Export all collections"
                >
                  Export
                </button>
              </div>
            </div>

            {showNewCollection && (
              <div className="new-collection-form">
                <input
                  type="text"
                  className="input"
                  placeholder="集合名称"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
                  autoFocus
                />
                <div className="form-actions">
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => setShowNewCollection(false)}
                  >
                    取消
                  </button>
                  <button className="btn-primary btn-sm" onClick={handleCreateCollection}>
                    创建
                  </button>
                </div>
              </div>
            )}

            {filteredCollections.length === 0 ? (
              <div className="empty-state">
                {searchTerm ? '未找到匹配的集合' : '暂无集合'}
              </div>
            ) : (
              filteredCollections.map((collection) => (
                <div key={collection.id} className="collection-item">
                  <div className="collection-header">
                    <div className="collection-name">{collection.name}</div>
                    <button
                      className="btn-delete-text"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete collection "${collection.name}"?`)) {
                          onDeleteCollection(collection.id);
                        }
                      }}
                      title="Delete collection"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="collection-requests">
                    {collection.requests.length === 0 ? (
                      <div className="collection-empty">暂无请求</div>
                    ) : (
                      collection.requests.map((request) => (
                        <div key={request.id} className="collection-request-wrapper">
                          <div
                            className="collection-request"
                            onClick={() => onLoadRequest(request)}
                          >
                            <span className={`method-badge method-${request.method.toLowerCase()}`}>
                              {request.method}
                            </span>
                            <span className="request-name">{request.name}</span>
                          </div>
                          <button
                            className="btn-icon-tiny"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`确定要删除请求"${request.name}"吗？`)) {
                                onDeleteRequest(collection.id, request.id);
                              }
                            }}
                            title="删除请求"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
      </div>
    </div>
  );
};

export default Sidebar;

