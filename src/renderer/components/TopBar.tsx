import React, { useState } from 'react';
import { Environment } from '../types';
import { generateId } from '../utils/helpers';

interface TopBarProps {
  environments: Environment[];
  activeEnvironment: string | null;
  onAddEnvironment: (env: Environment) => void;
  onSetActiveEnvironment: (envId: string | null) => void;
  onUpdateEnvironment: (envId: string, updates: Partial<Environment>) => void;
  onDeleteEnvironment: (envId: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({
  environments,
  activeEnvironment,
  onAddEnvironment,
  onSetActiveEnvironment,
  onUpdateEnvironment,
  onDeleteEnvironment,
}) => {
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [showManageEnv, setShowManageEnv] = useState(false);
  const [newEnvName, setNewEnvName] = useState('');
  const [editingEnv, setEditingEnv] = useState<Environment | null>(null);

  const handleAddEnvironment = () => {
    if (newEnvName.trim()) {
      const newEnv: Environment = {
        id: generateId(),
        name: newEnvName,
        variables: [],
      };
      onAddEnvironment(newEnv);
      setNewEnvName('');
      setShowEnvModal(false);
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h1 className="app-title">Magpie</h1>
        <span className="app-subtitle">API Testing</span>
      </div>

      <div className="top-bar-right">
        <select
          className="env-selector"
          value={activeEnvironment || ''}
          onChange={(e) => onSetActiveEnvironment(e.target.value || null)}
        >
          <option value="">无环境</option>
          {environments.map((env) => (
            <option key={env.id} value={env.id}>
              {env.name}
            </option>
          ))}
        </select>

        <button className="btn-secondary" onClick={() => setShowEnvModal(true)}>
          新建环境
        </button>
        
        {environments.length > 0 && (
          <button className="btn-secondary" onClick={() => setShowManageEnv(true)}>
            管理环境
          </button>
        )}
      </div>

      {showEnvModal && (
        <div className="modal-overlay" onClick={() => setShowEnvModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>创建新环境</h3>
            <input
              type="text"
              className="input"
              placeholder="环境名称"
              value={newEnvName}
              onChange={(e) => setNewEnvName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddEnvironment()}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowEnvModal(false)}>
                取消
              </button>
              <button className="btn-primary" onClick={handleAddEnvironment}>
                创建
              </button>
            </div>
          </div>
        </div>
      )}

      {showManageEnv && (
        <div className="modal-overlay" onClick={() => setShowManageEnv(false)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <h3>管理环境</h3>
            <div className="env-list">
              {environments.map((env) => (
                <div key={env.id} className="env-item">
                  <div className="env-item-header">
                    <strong>{env.name}</strong>
                    <div className="env-item-actions">
                      <button
                        className="btn-icon-small"
                        onClick={() => setEditingEnv(env)}
                        title="编辑变量"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon-small"
                        onClick={() => {
                          if (confirm(`确定要删除环境"${env.name}"吗？`)) {
                            onDeleteEnvironment(env.id);
                          }
                        }}
                        title="删除环境"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="env-vars-count">
                    {env.variables.length} 个变量
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowManageEnv(false)}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {editingEnv && (
        <div className="modal-overlay" onClick={() => setEditingEnv(null)}>
          <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
            <h3>编辑环境: {editingEnv.name}</h3>
            <div className="env-variables">
              {editingEnv.variables.map((variable, index) => (
                <div key={variable.id} className="env-var-row">
                  <input
                    type="checkbox"
                    checked={variable.enabled}
                    onChange={(e) => {
                      const newVars = [...editingEnv.variables];
                      newVars[index].enabled = e.target.checked;
                      setEditingEnv({ ...editingEnv, variables: newVars });
                    }}
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="变量名"
                    value={variable.key}
                    onChange={(e) => {
                      const newVars = [...editingEnv.variables];
                      newVars[index].key = e.target.value;
                      setEditingEnv({ ...editingEnv, variables: newVars });
                    }}
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="变量值"
                    value={variable.value}
                    onChange={(e) => {
                      const newVars = [...editingEnv.variables];
                      newVars[index].value = e.target.value;
                      setEditingEnv({ ...editingEnv, variables: newVars });
                    }}
                  />
                  <button
                    className="btn-icon"
                    onClick={() => {
                      const newVars = editingEnv.variables.filter((_, i) => i !== index);
                      setEditingEnv({ ...editingEnv, variables: newVars });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                className="btn-add-var"
                onClick={() => {
                  const newVars = [
                    ...editingEnv.variables,
                    { id: Date.now().toString(), key: '', value: '', enabled: true },
                  ];
                  setEditingEnv({ ...editingEnv, variables: newVars });
                }}
              >
                + 添加变量
              </button>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setEditingEnv(null)}>
                取消
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  onUpdateEnvironment(editingEnv.id, { variables: editingEnv.variables });
                  setEditingEnv(null);
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;

