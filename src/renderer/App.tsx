import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Sidebar from './components/Sidebar';
import RequestPanel from './components/RequestPanel';
import ResponsePanel from './components/ResponsePanel';
import HistoryList from './components/HistoryList';
import CollectionBlock from './components/CollectionBlock';
import InputModal from './components/InputModal';
import TitleBar from './components/TitleBar';
import ThemeEditor from './components/ThemeEditor';
import EnvironmentManager from './components/EnvironmentManager';
import { AppState, RequestConfig, ResponseData, HttpMethod, Collection, Environment, HistoryItem, Theme, ThemeColors } from './types';
import { sendHttpRequest } from './utils/httpClient';
import { useResizable } from './hooks/useResizable';
import { defaultLightTheme, themePresets } from './utils/themePresets';

// 默认主题使用预设的浅色主题
const defaultTheme: Theme = defaultLightTheme;

const App: React.FC = () => {
  const leftSidebar = useResizable(280, 200, 400);
  const requestSection = useResizable(600, 400, 1200);
  const [state, setState] = useState<AppState>({
    currentRequest: {
      id: 'default',
      name: '新请求',
      method: 'GET',
      url: '',
      params: [],
      headers: [],
      body: {
        type: 'none',
        content: '',
      },
    },
    response: null,
    collections: [],
    environments: [],
    activeEnvironment: null,
    history: [],
    loading: false,
  });

  // 从持久化存储加载数据
  useEffect(() => {
    const loadData = async () => {
      if (window.electronAPI) {
        try {
          const [collections, environments, history, settings, lastRequest] = await Promise.all([
            window.electronAPI.getCollections(),
            window.electronAPI.getEnvironments(),
            window.electronAPI.getHistory(),
            window.electronAPI.getSettings(),
            window.electronAPI.getLastRequest(),
          ]);

          setState((prev) => ({
            ...prev,
            collections,
            environments,
            history,
            activeEnvironment: settings.activeEnvironment,
            currentRequest: lastRequest || prev.currentRequest,
          }));
        } catch (error) {
          console.error('加载数据失败:', error);
        }
      }
    };

    loadData();
  }, []);

  // 清理防抖定时器
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleSendRequest = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    
    // 调试日志
    console.log('📤 准备发送请求:', {
      url: state.currentRequest.url,
      activeEnvironment: state.activeEnvironment,
      environmentsCount: state.environments.length,
      activeEnvName: state.environments.find(e => e.id === state.activeEnvironment)?.name || '无'
    });
    
    try {
      const response = await sendHttpRequest(state.currentRequest, state.environments, state.activeEnvironment);
      
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        request: { ...state.currentRequest },
        response,
        timestamp: Date.now(),
      };

      // 保存到持久化存储
      if (window.electronAPI) {
        const newHistory = await window.electronAPI.addHistory(historyItem);
        setState((prev) => ({
          ...prev,
          response,
          loading: false,
          history: newHistory,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          response,
          loading: false,
          history: [historyItem, ...prev.history.slice(0, 99)],
        }));
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        response: {
          status: 0,
          statusText: 'Error',
          headers: {},
          data: error.message || '请求失败',
          time: 0,
          size: 0,
        },
      }));
    }
  };

  const updateRequest = useCallback((updates: Partial<RequestConfig>) => {
    setState((prev) => {
      const newRequest = { ...prev.currentRequest, ...updates };
      
      // 保存最后请求（异步）
      if (window.electronAPI) {
        window.electronAPI.setLastRequest(newRequest).catch(console.error);
      }
      
      return {
        ...prev,
        currentRequest: newRequest,
      };
    });
  }, []);

  const addCollection = async (collection: Collection) => {
    if (window.electronAPI) {
      const newCollections = await window.electronAPI.addCollection(collection);
      setState((prev) => ({
        ...prev,
        collections: newCollections,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        collections: [...prev.collections, collection],
      }));
    }
  };

  const addEnvironment = async (environment: Environment) => {
    if (window.electronAPI) {
      const newEnvironments = await window.electronAPI.addEnvironment(environment);
      setState((prev) => ({
        ...prev,
        environments: newEnvironments,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        environments: [...prev.environments, environment],
      }));
    }
  };

  const setActiveEnvironment = async (envId: string | null) => {
    setState((prev) => ({
      ...prev,
      activeEnvironment: envId,
    }));
    
    // 保存活动环境
    if (window.electronAPI) {
      await window.electronAPI.updateSettings({ activeEnvironment: envId });
    }
  };

  const loadRequest = (request: RequestConfig, response?: ResponseData) => {
    setState((prev) => ({
      ...prev,
      currentRequest: { ...request },
      response: response || null,
    }));
    
    // 保存为最后请求
    if (window.electronAPI) {
      window.electronAPI.setLastRequest(request);
    }
  };

  // 使用 ref 来存储防抖定时器
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const loadHistoryItem = useCallback((item: HistoryItem) => {
    // 清除之前的防抖定时器
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 立即更新UI状态，不等待
    setState((prev) => ({
      ...prev,
      currentRequest: { ...item.request },
      response: item.response,
      loading: false,
    }));
    
    // 防抖保存为最后请求，避免频繁的异步操作
    debounceRef.current = setTimeout(() => {
      if (window.electronAPI) {
        window.electronAPI.setLastRequest(item.request).catch(console.error);
      }
    }, 100); // 100ms 防抖
  }, []);

  const saveRequestToCollection = async (collectionId: string) => {
    if (!window.electronAPI) return;
    
    const collection = state.collections.find((c) => c.id === collectionId);
    if (!collection) return;

    const newRequest = { ...state.currentRequest, id: Date.now().toString() };
    const updatedRequests = [...collection.requests, newRequest];
    
    const newCollections = await window.electronAPI.updateCollection(collectionId, {
      requests: updatedRequests,
    });
    
    setState((prev) => ({
      ...prev,
      collections: newCollections,
    }));
  };

  const deleteCollection = async (collectionId: string) => {
    if (!window.electronAPI) return;
    
    const newCollections = await window.electronAPI.deleteCollection(collectionId);
    setState((prev) => ({
      ...prev,
      collections: newCollections,
    }));
  };

  const deleteRequestFromCollection = async (collectionId: string, requestId: string) => {
    if (!window.electronAPI) return;
    
    const collection = state.collections.find((c) => c.id === collectionId);
    if (!collection) return;

    const updatedRequests = collection.requests.filter((r) => r.id !== requestId);
    
    const newCollections = await window.electronAPI.updateCollection(collectionId, {
      requests: updatedRequests,
    });
    
    setState((prev) => ({
      ...prev,
      collections: newCollections,
    }));
  };

  const updateEnvironment = async (envId: string, updates: Partial<Environment>) => {
    if (!window.electronAPI) return;
    
    const newEnvironments = await window.electronAPI.updateEnvironment(envId, updates);
    setState((prev) => ({
      ...prev,
      environments: newEnvironments,
    }));
  };

  const deleteEnvironment = async (envId: string) => {
    if (!window.electronAPI) return;
    
    const newEnvironments = await window.electronAPI.deleteEnvironment(envId);
    setState((prev) => ({
      ...prev,
      environments: newEnvironments,
      activeEnvironment: prev.activeEnvironment === envId ? null : prev.activeEnvironment,
    }));
  };

  const clearHistory = async () => {
    if (!window.electronAPI) return;
    
    await window.electronAPI.clearHistory();
    setState((prev) => ({
      ...prev,
      history: [],
    }));
  };

  const cloneRequest = () => {
    const clonedRequest: RequestConfig = {
      ...state.currentRequest,
      id: Date.now().toString(),
      name: `${state.currentRequest.name} (副本)`,
    };
    
    setState((prev) => ({
      ...prev,
      currentRequest: clonedRequest,
    }));

    // 保存为最后请求
    if (window.electronAPI) {
      window.electronAPI.setLastRequest(clonedRequest);
    }
  };

  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showThemeEditor, setShowThemeEditor] = useState(false);
  const [showEnvManager, setShowEnvManager] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  const [savedThemes, setSavedThemes] = useState<Theme[]>([...themePresets]);
  
  // 应用主题到页面
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  // 保存主题
  const saveTheme = async (theme: Theme, saveToList: boolean = true) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    
    // 如果是自定义主题，添加到主题列表
    if (saveToList) {
      setSavedThemes(prev => {
        // 检查是否已存在
        const existingIndex = prev.findIndex(t => t.id === theme.id);
        if (existingIndex >= 0) {
          // 更新现有主题
          const newThemes = [...prev];
          newThemes[existingIndex] = theme;
          localStorage.setItem('magpie-themes', JSON.stringify(newThemes));
          return newThemes;
        } else {
          // 添加新主题
          const newThemes = [...prev, theme];
          localStorage.setItem('magpie-themes', JSON.stringify(newThemes));
          return newThemes;
        }
      });
    }
    
    // 保存当前激活的主题
    localStorage.setItem('magpie-theme', JSON.stringify(theme));
    
    // 保存到electron store
    if (window.electronAPI) {
      try {
        await window.electronAPI.updateSettings({ theme });
      } catch (error) {
        console.error('保存主题失败:', error);
      }
    }
  };

  // 切换主题
  const switchTheme = (theme: Theme) => {
    saveTheme(theme, false); // 切换时不添加到列表
  };

  // 删除主题
  const deleteTheme = (themeId: string) => {
    // 不能删除预设主题
    const isPreset = themePresets.some(t => t.id === themeId);
    if (isPreset) {
      alert('不能删除预设主题');
      return;
    }

    setSavedThemes(prev => {
      const newThemes = prev.filter(t => t.id !== themeId);
      localStorage.setItem('magpie-themes', JSON.stringify(newThemes));
      return newThemes;
    });

    // 如果删除的是当前主题，切换到默认主题
    if (currentTheme.id === themeId) {
      switchTheme(defaultTheme);
    }
  };

  // 加载主题
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // 加载保存的主题列表
        const savedThemesList = localStorage.getItem('magpie-themes');
        if (savedThemesList) {
          const themes = JSON.parse(savedThemesList);
          setSavedThemes(themes);
        }

        // 加载当前激活的主题
        const savedTheme = localStorage.getItem('magpie-theme');
        if (savedTheme) {
          const theme = JSON.parse(savedTheme);
          setCurrentTheme(theme);
          applyTheme(theme);
        } else {
          applyTheme(defaultTheme);
        }
      } catch (error) {
        console.error('加载主题失败:', error);
        applyTheme(defaultTheme);
      }
    };
    loadTheme();
  }, []);
  
  const createNewRequest = () => {
    const newRequest: RequestConfig = {
      id: Date.now().toString(),
      name: 'New Request',
      method: 'GET',
      url: '',
      params: [],
      headers: [],
      body: {
        type: 'none',
        content: '',
      },
    };
    
    setState((prev) => ({
      ...prev,
      currentRequest: newRequest,
      response: null,
    }));
    
    if (window.electronAPI) {
      window.electronAPI.setLastRequest(newRequest);
    }
  };

  return (
    <div className="app">
      {/* 自定义标题栏 */}
      <TitleBar onThemeClick={() => setShowThemeEditor(true)} />
      
      <div className="main-layout">
        {/* 左侧栏 */}
        <div className="left-sidebar" style={{ width: `${leftSidebar.width}px` }}>
          {/* 环境选择器 */}
          <div className="environment-selector">
            <div className="env-selector-wrapper">
              <label className="env-label">环境:</label>
              <select 
                className="env-select"
                value={state.activeEnvironment || ''}
                onChange={(e) => {
                  const newEnvId = e.target.value || null;
                  console.log('🔄 切换环境:', newEnvId);
                  setActiveEnvironment(newEnvId);
                }}
              >
                <option value="">无环境（不使用变量）</option>
                {state.environments.map(env => (
                  <option key={env.id} value={env.id}>
                    {env.name} ({env.variables.filter(v => v.enabled).length} 个变量)
                  </option>
                ))}
              </select>
            </div>
            <button 
              className="btn-env-manage"
              onClick={() => setShowEnvManager(true)}
              title="环境管理"
            >
              管理
            </button>
          </div>
          
          {/* 集合区域 */}
          <div className="sidebar-section">
            <div className="section-header">
              <h4>Collections</h4>
            </div>
            <div className="collections-area">
              {state.collections.length === 0 ? (
                <div className="empty-hint">No collections</div>
              ) : (
                state.collections.map((collection) => (
                  <CollectionBlock
                    key={collection.id}
                    collection={collection}
                    isActive={activeCollection === collection.id}
                    onToggle={() => setActiveCollection(activeCollection === collection.id ? null : collection.id)}
                    onDelete={() => {
                      if (confirm(`Delete "${collection.name}"?`)) {
                        deleteCollection(collection.id);
                      }
                    }}
                    onLoadRequest={loadRequest}
                    onDeleteRequest={(reqId) => deleteRequestFromCollection(collection.id, reqId)}
                  />
                ))
              )}
              <button 
                className="btn-new-collection" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('New Collection button clicked');
                  setShowCollectionModal(true);
                }}
              >
                New Collection
              </button>
            </div>
          </div>

          {/* 历史区域 */}
          <div className="sidebar-section history-section">
            <div className="section-header">
              <h4>History</h4>
              <div className="header-actions">
                <button className="btn-new" onClick={createNewRequest} title="New Request">
                  New
                </button>
                {state.history.length > 0 && (
                  <button className="btn-text-small" onClick={clearHistory}>
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="history-area">
              <HistoryList history={state.history} onLoadHistoryItem={loadHistoryItem} />
            </div>
          </div>
        </div>

        {/* 分隔条1 */}
        <div className="resize-handle" onMouseDown={leftSidebar.handleMouseDown}></div>

        {/* 中间请求区域 */}
        <div className="request-section" style={{ width: `${requestSection.width}px` }}>
          <RequestPanel 
            request={state.currentRequest}
            onUpdateRequest={updateRequest}
            onSendRequest={handleSendRequest}
            loading={state.loading}
            collections={state.collections}
            onSaveToCollection={saveRequestToCollection}
            onCloneRequest={cloneRequest}
            environments={state.environments}
            activeEnvironmentId={state.activeEnvironment}
          />
        </div>

        {/* 分隔条2 */}
        <div className="resize-handle" onMouseDown={requestSection.handleMouseDown}></div>
        
        {/* 右侧响应区域 */}
        <div className="response-section" style={{ flex: 1 }}>
          {state.response ? (
            <ResponsePanel response={state.response} />
          ) : (
            <div className="empty-response-state">
              <h3>Ready</h3>
              <p>Enter a URL and send request to test API</p>
            </div>
          )}
        </div>
      </div>

      {/* 新建Collection模态框 */}
      <InputModal
        isOpen={showCollectionModal}
        title="新建Collection"
        placeholder="输入Collection名称"
        onConfirm={async (name) => {
          try {
            console.log('Adding collection:', name);
            await addCollection({
              id: Date.now().toString(),
              name,
              requests: [],
            });
            console.log('Collection added successfully');
            setShowCollectionModal(false);
          } catch (error) {
            console.error('Error adding collection:', error);
            alert('Error adding collection: ' + error);
          }
        }}
        onCancel={() => setShowCollectionModal(false)}
      />

      {/* 主题编辑器 */}
      {showThemeEditor && (
        <ThemeEditor
          theme={currentTheme}
          themes={savedThemes}
          onSave={saveTheme}
          onSwitch={switchTheme}
          onDelete={deleteTheme}
          onClose={() => setShowThemeEditor(false)}
        />
      )}

      {/* 环境管理器 */}
      {showEnvManager && (
        <EnvironmentManager
          environments={state.environments}
          activeEnvironmentId={state.activeEnvironment}
          onAddEnvironment={addEnvironment}
          onUpdateEnvironment={updateEnvironment}
          onDeleteEnvironment={deleteEnvironment}
          onSetActiveEnvironment={setActiveEnvironment}
          onClose={() => setShowEnvManager(false)}
        />
      )}
    </div>
  );
};

export default App;

