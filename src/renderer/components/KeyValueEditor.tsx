import React from 'react';
import { KeyValuePair, Environment } from '../types';
import { createKeyValuePair } from '../utils/helpers';
import VariableAutocomplete from './VariableAutocomplete';

interface KeyValueEditorProps {
  items: KeyValuePair[];
  onChange: (items: KeyValuePair[]) => void;
  placeholder?: { key: string; value: string };
  environments?: Environment[];
  activeEnvironmentId?: string | null;
}

const KeyValueEditor: React.FC<KeyValueEditorProps> = ({ items, onChange, placeholder, environments = [], activeEnvironmentId = null }) => {
  const handleAdd = () => {
    onChange([...items, createKeyValuePair()]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdate = (id: string, field: keyof KeyValuePair, value: any) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="key-value-editor">
      <div className="kv-header">
        <div className="kv-col-checkbox"></div>
        <div className="kv-col-key">KEY</div>
        <div className="kv-col-value">VALUE</div>
        <div className="kv-col-actions"></div>
      </div>

      <div className="kv-rows">
        {items.map((item) => (
          <div key={item.id} className="kv-row">
            <div className="kv-col-checkbox">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={(e) => handleUpdate(item.id, 'enabled', e.target.checked)}
              />
            </div>
            <div className="kv-col-key">
              <input
                type="text"
                className="kv-input"
                placeholder={placeholder?.key || '键'}
                value={item.key}
                onChange={(e) => handleUpdate(item.id, 'key', e.target.value)}
              />
            </div>
            <div className="kv-col-value" style={{ position: 'relative' }}>
              <VariableAutocomplete
                className="kv-input"
                placeholder={placeholder?.value || '值'}
                value={item.value}
                onChange={(value) => handleUpdate(item.id, 'value', value)}
                environments={environments}
                activeEnvironmentId={activeEnvironmentId}
              />
            </div>
            <div className="kv-col-actions">
              <button className="btn-icon" onClick={() => handleRemove(item.id)}>
                ×
              </button>
            </div>
          </div>
        ))}

        <div className="kv-row">
          <div className="kv-col-checkbox"></div>
          <div className="kv-col-key">
            <button className="btn-add-row" onClick={handleAdd}>
              Add New
            </button>
          </div>
          <div className="kv-col-value"></div>
          <div className="kv-col-actions"></div>
        </div>
      </div>
    </div>
  );
};

export default KeyValueEditor;

