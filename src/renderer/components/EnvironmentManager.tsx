import React, { useState } from 'react';
import { Environment, KeyValuePair } from '../types';
import KeyValueEditor from './KeyValueEditor';

interface EnvironmentManagerProps {
  environments: Environment[];
  activeEnvironmentId: string | null;
  onAddEnvironment: (env: Environment) => void;
  onUpdateEnvironment: (id: string, updates: Partial<Environment>) => void;
  onDeleteEnvironment: (id: string) => void;
  onSetActiveEnvironment: (id: string | null) => void;
  onClose: () => void;
}

const EnvironmentManager: React.FC<EnvironmentManagerProps> = ({
  environments,
  activeEnvironmentId,
  onAddEnvironment,
  onUpdateEnvironment,
  onDeleteEnvironment,
  onSetActiveEnvironment,
  onClose,
}) => {
  const [selectedEnvId, setSelectedEnvId] = useState<string | null>(
    environments.length > 0 ? environments[0].id : null
  );
  const [newEnvName, setNewEnvName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const selectedEnv = environments.find(env => env.id === selectedEnvId);

  const handleAddEnvironment = () => {
    if (newEnvName.trim()) {
      const newEnv: Environment = {
        id: Date.now().toString(),
        name: newEnvName.trim(),
        variables: [],
      };
      onAddEnvironment(newEnv);
      setSelectedEnvId(newEnv.id);
      setNewEnvName('');
      setShowAddForm(false);
    }
  };

  const handleUpdateVariables = (variables: KeyValuePair[]) => {
    if (selectedEnvId) {
      onUpdateEnvironment(selectedEnvId, { variables });
    }
  };

  const handleDeleteEnvironment = (id: string) => {
    if (window.confirm('确定要删除这个环境吗？')) {
      onDeleteEnvironment(id);
      if (selectedEnvId === id) {
        setSelectedEnvId(environments.length > 1 ? environments[0].id : null);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="env-manager-modal" onClick={(e) => e.stopPropagation()}>
        <div className="env-manager-header">
          <h2>环境管理</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="env-manager-body">
          {/* 左侧：环境列表 */}
          <div className="env-list-panel">
            <div className="env-list-header">
              <h3>环境列表</h3>
              <button 
                className="btn-add-env"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? '取消' : '新建'}
              </button>
            </div>

            {showAddForm && (
              <div className="env-add-form">
                <input
                  type="text"
                  className="env-name-input"
                  placeholder="环境名称"
                  value={newEnvName}
                  onChange={(e) => setNewEnvName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddEnvironment()}
                  autoFocus
                />
                <button className="btn-confirm-add" onClick={handleAddEnvironment}>
                  确认
                </button>
              </div>
            )}

            <div className="env-list">
              {environments.length === 0 ? (
                <div className="empty-hint">暂无环境</div>
              ) : (
                environments.map(env => (
                  <div
                    key={env.id}
                    className={`env-item ${selectedEnvId === env.id ? 'active' : ''}`}
                    onClick={() => setSelectedEnvId(env.id)}
                  >
                    <div className="env-item-content">
                      <span className="env-name">{env.name}</span>
                      {activeEnvironmentId === env.id && (
                        <span className="env-active-badge">激活中</span>
                      )}
                    </div>
                    <div className="env-item-actions">
                      <button
                        className="btn-activate-env"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSetActiveEnvironment(env.id === activeEnvironmentId ? null : env.id);
                        }}
                        title={env.id === activeEnvironmentId ? "取消激活" : "激活环境"}
                      >
                        {env.id === activeEnvironmentId ? '√' : '○'}
                      </button>
                      <button
                        className="btn-delete-env"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEnvironment(env.id);
                        }}
                        title="删除环境"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 右侧：环境变量编辑 */}
          <div className="env-editor-panel">
            {selectedEnv ? (
              <>
                <div className="env-editor-header">
                  <h3>{selectedEnv.name}</h3>
                  <div className="env-info">
                    <span className="env-var-count">
                      {selectedEnv.variables.filter(v => v.enabled).length} 个变量
                    </span>
                  </div>
                </div>
                <div className="env-editor-content">
                  <div className="env-usage-hint">
                    <p><strong>如何使用环境变量：</strong></p>
                    <p>在URL、Headers、Body中使用 <code>{'{{变量名}}'}</code> 来引用变量</p>
                    <p>例如：<code>{'{{baseUrl}}/api/users'}</code></p>
                  </div>
                  <KeyValueEditor
                    items={selectedEnv.variables}
                    onChange={handleUpdateVariables}
                    placeholder={{ key: '变量名', value: '变量值' }}
                  />
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>请选择一个环境或创建新环境</p>
              </div>
            )}
          </div>
        </div>

        <div className="env-manager-footer">
          <button className="btn-primary" onClick={onClose}>
            完成
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentManager;
