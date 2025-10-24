import React, { useState } from 'react';
import { RequestConfig, HttpMethod, Collection, Environment } from '../types';
import KeyValueEditor from './KeyValueEditor';
import CodeGenerator from './CodeGenerator';
import VariableAutocomplete from './VariableAutocomplete';

interface RequestPanelProps {
  request: RequestConfig;
  onUpdateRequest: (updates: Partial<RequestConfig>) => void;
  onSendRequest: () => void;
  loading: boolean;
  collections: Collection[];
  onSaveToCollection: (collectionId: string) => void;
  onCloneRequest: () => void;
  environments: Environment[];
  activeEnvironmentId: string | null;
}

const HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

const RequestPanel: React.FC<RequestPanelProps> = React.memo(({
  request,
  onUpdateRequest,
  onSendRequest,
  loading,
  collections,
  onSaveToCollection,
  onCloneRequest,
  environments,
  activeEnvironmentId,
}) => {
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'auth'>('params');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);

  const handleSaveToCollection = (collectionId: string) => {
    onSaveToCollection(collectionId);
    setShowSaveModal(false);
  };

  return (
    <div className="request-panel">
      {/* 主要请求控件 - 上方 */}
      <div className="request-main">
        <div className="request-line">
          <select
            className="method-select"
            value={request.method}
            onChange={(e) => onUpdateRequest({ method: e.target.value as HttpMethod })}
          >
            {HTTP_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>

          <VariableAutocomplete
            className="url-input"
            placeholder="输入请求URL (输入 { 触发变量补全)"
            value={request.url}
            onChange={(url) => onUpdateRequest({ url })}
            environments={environments}
            activeEnvironmentId={activeEnvironmentId}
            onKeyDown={(e) => e.key === 'Enter' && !loading && onSendRequest()}
          />

          <button
            className="btn-send"
            onClick={onSendRequest}
            disabled={loading || !request.url}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      {/* 辅助功能栏 - 下方 */}
      <div className="request-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="toolbar-left">
          <input
            type="text"
            className="display-name-input"
            placeholder="请求别名（可选）"
            value={request.displayName || ''}
            onChange={(e) => onUpdateRequest({ displayName: e.target.value })}
            title="为这个请求设置一个显示名称/别名"
            style={{ padding: '6px 12px', background: 'transparent', border: 'none', borderRadius: '4px', fontSize: '12px', color: '#6b7280', outline: 'none' }}
          />
        </div>
        <div className="toolbar-actions">
          <button
            className="btn-toolbar"
            onClick={onCloneRequest}
            disabled={!request.url}
            title="Duplicate this request"
          >
            Duplicate
          </button>

          <button
            className="btn-toolbar"
            onClick={() => setShowCodeGenerator(true)}
            disabled={!request.url}
            title="Generate code"
          >
            Code
          </button>

          <button
            className="btn-toolbar"
            onClick={() => setShowSaveModal(true)}
            disabled={!request.url}
            title="Save to collection"
          >
            Save
          </button>
        </div>
      </div>

      <div className="request-tabs">
        <button
          className={`tab ${activeTab === 'params' ? 'active' : ''}`}
          onClick={() => setActiveTab('params')}
        >
          Params
          {request.params.filter((p) => p.enabled).length > 0 && (
            <span className="tab-count">{request.params.filter((p) => p.enabled).length}</span>
          )}
        </button>
        <button
          className={`tab ${activeTab === 'headers' ? 'active' : ''}`}
          onClick={() => setActiveTab('headers')}
        >
          Headers
          {request.headers.filter((h) => h.enabled).length > 0 && (
            <span className="tab-count">{request.headers.filter((h) => h.enabled).length}</span>
          )}
        </button>
        <button
          className={`tab ${activeTab === 'body' ? 'active' : ''}`}
          onClick={() => setActiveTab('body')}
        >
          Body
        </button>
        <button
          className={`tab ${activeTab === 'auth' ? 'active' : ''}`}
          onClick={() => setActiveTab('auth')}
        >
          Auth
        </button>
      </div>

      <div className="request-content">
        {activeTab === 'params' && (
          <KeyValueEditor
            items={request.params}
            onChange={(params) => onUpdateRequest({ params })}
            placeholder={{ key: '参数名', value: '参数值' }}
            environments={environments}
            activeEnvironmentId={activeEnvironmentId}
          />
        )}

        {activeTab === 'headers' && (
          <KeyValueEditor
            items={request.headers}
            onChange={(headers) => onUpdateRequest({ headers })}
            placeholder={{ key: '请求头名称', value: '请求头值' }}
            environments={environments}
            activeEnvironmentId={activeEnvironmentId}
          />
        )}

        {activeTab === 'body' && (
          <div className="body-editor">
            <div className="body-type-selector">
              <label>
                <input
                  type="radio"
                  value="none"
                  checked={request.body.type === 'none'}
                  onChange={(e) =>
                    onUpdateRequest({ body: { ...request.body, type: 'none' } })
                  }
                />
                None
              </label>
              <label>
                <input
                  type="radio"
                  value="json"
                  checked={request.body.type === 'json'}
                  onChange={(e) =>
                    onUpdateRequest({ body: { ...request.body, type: 'json' } })
                  }
                />
                JSON
              </label>
              <label>
                <input
                  type="radio"
                  value="form-data"
                  checked={request.body.type === 'form-data'}
                  onChange={(e) =>
                    onUpdateRequest({
                      body: { ...request.body, type: 'form-data', formData: [] },
                    })
                  }
                />
                Form Data
              </label>
              <label>
                <input
                  type="radio"
                  value="x-www-form-urlencoded"
                  checked={request.body.type === 'x-www-form-urlencoded'}
                  onChange={(e) =>
                    onUpdateRequest({
                      body: { ...request.body, type: 'x-www-form-urlencoded', formData: [] },
                    })
                  }
                />
                URL Encoded
              </label>
              <label>
                <input
                  type="radio"
                  value="raw"
                  checked={request.body.type === 'raw'}
                  onChange={(e) =>
                    onUpdateRequest({ body: { ...request.body, type: 'raw' } })
                  }
                />
                Raw
              </label>
            </div>

            {request.body.type === 'json' && (
              <textarea
                className="body-textarea"
                placeholder='{"key": "value"}'
                value={request.body.content}
                onChange={(e) =>
                  onUpdateRequest({ body: { ...request.body, content: e.target.value } })
                }
              />
            )}

            {request.body.type === 'raw' && (
              <textarea
                className="body-textarea"
                placeholder="原始数据"
                value={request.body.content}
                onChange={(e) =>
                  onUpdateRequest({ body: { ...request.body, content: e.target.value } })
                }
              />
            )}

            {(request.body.type === 'form-data' ||
              request.body.type === 'x-www-form-urlencoded') && (
              <KeyValueEditor
                items={request.body.formData || []}
                onChange={(formData) =>
                  onUpdateRequest({ body: { ...request.body, formData } })
                }
                placeholder={{ key: '字段名', value: '字段值' }}
                environments={environments}
                activeEnvironmentId={activeEnvironmentId}
              />
            )}
          </div>
        )}

        {activeTab === 'auth' && (
          <div className="auth-editor">
            <div className="auth-type-selector">
              <label>
                <input
                  type="radio"
                  value="none"
                  checked={!request.auth || request.auth.type === 'none'}
                  onChange={() => onUpdateRequest({ auth: { type: 'none' } })}
                />
                None
              </label>
              <label>
                <input
                  type="radio"
                  value="bearer"
                  checked={request.auth?.type === 'bearer'}
                  onChange={() => onUpdateRequest({ auth: { type: 'bearer', token: '' } })}
                />
                Bearer Token
              </label>
              <label>
                <input
                  type="radio"
                  value="basic"
                  checked={request.auth?.type === 'basic'}
                  onChange={() =>
                    onUpdateRequest({ auth: { type: 'basic', username: '', password: '' } })
                  }
                />
                Basic Auth
              </label>
              <label>
                <input
                  type="radio"
                  value="api-key"
                  checked={request.auth?.type === 'api-key'}
                  onChange={() =>
                    onUpdateRequest({ auth: { type: 'api-key', key: '', value: '' } })
                  }
                />
                API Key
              </label>
            </div>

            {request.auth?.type === 'bearer' && (
              <div className="auth-form">
                <label>Token:</label>
                <VariableAutocomplete
                  className="input"
                  placeholder="输入 Bearer Token (输入 { 触发变量补全)"
                  value={request.auth.token || ''}
                  onChange={(token) =>
                    onUpdateRequest({ auth: { ...request.auth!, token } })
                  }
                  environments={environments}
                  activeEnvironmentId={activeEnvironmentId}
                />
              </div>
            )}

            {request.auth?.type === 'basic' && (
              <div className="auth-form">
                <label>用户名:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="用户名"
                  value={request.auth.username || ''}
                  onChange={(e) =>
                    onUpdateRequest({ auth: { ...request.auth!, username: e.target.value } })
                  }
                />
                <label>密码:</label>
                <input
                  type="password"
                  className="input"
                  placeholder="密码"
                  value={request.auth.password || ''}
                  onChange={(e) =>
                    onUpdateRequest({ auth: { ...request.auth!, password: e.target.value } })
                  }
                />
              </div>
            )}

            {request.auth?.type === 'api-key' && (
              <div className="auth-form">
                <label>Key:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="如: X-API-Key"
                  value={request.auth.key || ''}
                  onChange={(e) =>
                    onUpdateRequest({ auth: { ...request.auth!, key: e.target.value } })
                  }
                />
                <label>Value:</label>
                <VariableAutocomplete
                  className="input"
                  placeholder="API Key 值 (输入 { 触发变量补全)"
                  value={request.auth.value || ''}
                  onChange={(value) =>
                    onUpdateRequest({ auth: { ...request.auth!, value } })
                  }
                  environments={environments}
                  activeEnvironmentId={activeEnvironmentId}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>保存请求到集合</h3>
            <div className="save-options">
              {collections.length === 0 ? (
                <div className="empty-state">暂无集合，请先创建一个集合</div>
              ) : (
                collections.map((collection) => (
                  <button
                    key={collection.id}
                    className="collection-option"
                    onClick={() => handleSaveToCollection(collection.id)}
                  >
                    📁 {collection.name}
                  </button>
                ))
              )}
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSaveModal(false)}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {showCodeGenerator && (
        <CodeGenerator request={request} onClose={() => setShowCodeGenerator(false)} />
      )}
    </div>
  );
});

RequestPanel.displayName = 'RequestPanel';

export default RequestPanel;

