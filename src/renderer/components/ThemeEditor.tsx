import React, { useState } from 'react';
import { Theme, ThemeColors } from '../types';
import ColorPicker from './ColorPicker';
import { themePresets } from '../utils/themePresets';

interface ThemeEditorProps {
  theme: Theme;
  themes: Theme[];
  onSave: (theme: Theme, saveToList?: boolean) => void;
  onSwitch: (theme: Theme) => void;
  onDelete: (themeId: string) => void;
  onClose: () => void;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ 
  theme, 
  themes,
  onSave, 
  onSwitch,
  onDelete,
  onClose 
}) => {
  const [editingTheme, setEditingTheme] = useState<Theme>(JSON.parse(JSON.stringify(theme)));
  const [showSaveAsModal, setShowSaveAsModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setEditingTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(editingTheme, true);
    onClose();
  };

  const handleSaveAs = () => {
    if (!newThemeName.trim()) {
      alert('请输入主题名称');
      return;
    }

    const newTheme: Theme = {
      ...editingTheme,
      id: `custom-${Date.now()}`,
      name: newThemeName.trim(),
    };

    onSave(newTheme, true);
    setShowSaveAsModal(false);
    setNewThemeName('');
    onClose();
  };

  const handleSwitchTheme = (selectedTheme: Theme) => {
    setEditingTheme(JSON.parse(JSON.stringify(selectedTheme)));
    onSwitch(selectedTheme);
  };

  const handleDeleteTheme = (themeId: string) => {
    if (confirm('确定要删除这个主题吗？')) {
      onDelete(themeId);
    }
  };

  const isPresetTheme = (themeId: string) => {
    return themePresets.some(t => t.id === themeId);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="theme-editor-modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="theme-editor-header">
          <h2>🎨 主题编辑器</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="theme-editor-content">
          {/* 主题选择器 */}
          <div className="theme-selector-section">
            <h3>选择主题</h3>
            <div className="theme-list">
              {themes.map((t) => (
                <div
                  key={t.id}
                  className={`theme-item ${editingTheme.id === t.id ? 'active' : ''}`}
                  onClick={() => handleSwitchTheme(t)}
                >
                  <div className="theme-item-header">
                    <div className="theme-item-name">
                      {t.name}
                      {isPresetTheme(t.id) && <span className="preset-badge">预设</span>}
                    </div>
                    {!isPresetTheme(t.id) && (
                      <button
                        className="btn-delete-theme"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTheme(t.id);
                        }}
                        title="删除主题"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="theme-colors-preview">
                    <div className="color-dot" style={{ backgroundColor: t.colors.primary }} />
                    <div className="color-dot" style={{ backgroundColor: t.colors.gray800 }} />
                    <div className="color-dot" style={{ backgroundColor: t.colors.gray50 }} />
                    <div className="color-dot" style={{ backgroundColor: t.colors.success }} />
                    <div className="color-dot" style={{ backgroundColor: t.colors.error }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 当前主题编辑 */}
          <div className="theme-name-section">
            <label>当前编辑：{editingTheme.name}</label>
          </div>

          {/* 主题色 */}
          <div className="color-section">
            <h3>🎯 主题色</h3>
            <p className="section-description">控制按钮、链接、激活状态等主要交互元素的颜色</p>
            <div className="color-grid">
              <ColorPicker
                label="主色调"
                description="按钮、链接、标签页激活状态"
                color={editingTheme.colors.primary}
                onChange={(value) => updateColor('primary', value)}
              />
              <ColorPicker
                label="深色主题"
                description="按钮悬停、深色变体"
                color={editingTheme.colors.primaryDark}
                onChange={(value) => updateColor('primaryDark', value)}
              />
              <ColorPicker
                label="浅色主题"
                description="高亮背景、选中状态背景"
                color={editingTheme.colors.primaryLight}
                onChange={(value) => updateColor('primaryLight', value)}
              />
            </div>
          </div>

          {/* 背景和表面 */}
          <div className="color-section">
            <h3>🖼️ 背景和表面</h3>
            <p className="section-description">控制各种背景色、面板色、卡片色</p>
            <div className="color-grid">
              <ColorPicker
                label="纯白背景"
                description="主要内容区域背景、卡片背景"
                color={editingTheme.colors.white}
                onChange={(value) => updateColor('white', value)}
              />
              <ColorPicker
                label="浅色表面"
                description="侧边栏、输入框、下拉框背景"
                color={editingTheme.colors.gray50}
                onChange={(value) => updateColor('gray50', value)}
              />
              <ColorPicker
                label="悬停背景"
                description="列表项悬停、按钮悬停背景"
                color={editingTheme.colors.gray100}
                onChange={(value) => updateColor('gray100', value)}
              />
              <ColorPicker
                label="深色背景"
                description="区域背景、集合卡片背景"
                color={editingTheme.colors.gray900}
                onChange={(value) => updateColor('gray900', value)}
              />
            </div>
          </div>

          {/* 边框和分隔线 */}
          <div className="color-section">
            <h3>📏 边框和分隔线</h3>
            <p className="section-description">控制各种边框、分隔线的颜色</p>
            <div className="color-grid">
              <ColorPicker
                label="主要边框"
                description="输入框、卡片、面板的边框"
                color={editingTheme.colors.gray200}
                onChange={(value) => updateColor('gray200', value)}
              />
              <ColorPicker
                label="次要边框"
                description="禁用状态、虚线边框"
                color={editingTheme.colors.gray300}
                onChange={(value) => updateColor('gray300', value)}
              />
            </div>
          </div>

          {/* 文本颜色 */}
          <div className="color-section">
            <h3>✍️ 文本颜色</h3>
            <p className="section-description">控制各种文本、图标、提示的颜色</p>
            <div className="color-grid">
              <ColorPicker
                label="主要文本"
                description="标题、正文、重要信息"
                color={editingTheme.colors.gray800}
                onChange={(value) => updateColor('gray800', value)}
              />
              <ColorPicker
                label="次要文本"
                description="说明文字、标签、辅助信息"
                color={editingTheme.colors.gray500}
                onChange={(value) => updateColor('gray500', value)}
              />
              <ColorPicker
                label="占位符文本"
                description="输入框占位符、禁用文字"
                color={editingTheme.colors.gray400}
                onChange={(value) => updateColor('gray400', value)}
              />
              <ColorPicker
                label="浅色文本"
                description="更浅的辅助文字"
                color={editingTheme.colors.gray300}
                onChange={(value) => updateColor('gray300', value)}
              />
            </div>
          </div>

          {/* 状态提示 */}
          <div className="color-section">
            <h3>💡 状态提示</h3>
            <p className="section-description">控制成功、错误、警告等状态的颜色</p>
            <div className="color-grid">
              <ColorPicker
                label="成功色"
                description="成功提示、确认按钮"
                color={editingTheme.colors.success}
                onChange={(value) => updateColor('success', value)}
              />
              <ColorPicker
                label="成功背景"
                description="成功提示的背景色"
                color={editingTheme.colors.successLight}
                onChange={(value) => updateColor('successLight', value)}
              />
              <ColorPicker
                label="错误色"
                description="错误提示、删除按钮、危险操作"
                color={editingTheme.colors.error}
                onChange={(value) => updateColor('error', value)}
              />
              <ColorPicker
                label="错误背景"
                description="错误提示的背景色"
                color={editingTheme.colors.errorLight}
                onChange={(value) => updateColor('errorLight', value)}
              />
              <ColorPicker
                label="警告色"
                description="警告提示、注意事项"
                color={editingTheme.colors.warning}
                onChange={(value) => updateColor('warning', value)}
              />
              <ColorPicker
                label="警告背景"
                description="警告提示的背景色"
                color={editingTheme.colors.warningLight}
                onChange={(value) => updateColor('warningLight', value)}
              />
              <ColorPicker
                label="信息色"
                description="信息提示、帮助说明"
                color={editingTheme.colors.info}
                onChange={(value) => updateColor('info', value)}
              />
            </div>
          </div>

          {/* 高级颜色 */}
          <div className="color-section">
            <h3>🔧 高级颜色</h3>
            <p className="section-description">用于特殊场景的颜色</p>
            <div className="color-grid">
              <ColorPicker
                label="深色背景"
                description="特殊区域的深色背景"
                color={editingTheme.colors.gray700}
                onChange={(value) => updateColor('gray700', value)}
              />
              <ColorPicker
                label="中性灰色"
                description="图标、装饰元素"
                color={editingTheme.colors.gray600}
                onChange={(value) => updateColor('gray600', value)}
              />
              <ColorPicker
                label="紫色"
                description="特殊状态、PATCH 方法标签"
                color={editingTheme.colors.purple}
                onChange={(value) => updateColor('purple', value)}
              />
              <ColorPicker
                label="浅灰图标"
                description="禁用图标、占位图标"
                color={editingTheme.colors.zinc400}
                onChange={(value) => updateColor('zinc400', value)}
              />
              <ColorPicker
                label="深灰图标"
                description="辅助图标、次要图标"
                color={editingTheme.colors.zinc500}
                onChange={(value) => updateColor('zinc500', value)}
              />
            </div>
          </div>
        </div>

        <div className="theme-editor-footer">
          <div className="footer-left-actions">
            <button className="btn-secondary" onClick={() => setShowSaveAsModal(true)}>
              💾 另存为
            </button>
          </div>
          <div className="theme-editor-actions">
            <button className="btn-secondary" onClick={onClose}>
              取消
            </button>
            <button className="btn-primary" onClick={handleSave}>
              ✓ 保存并应用
            </button>
          </div>
        </div>
      </div>

      {/* 另存为模态框 */}
      {showSaveAsModal && (
        <div className="modal-overlay" onClick={() => setShowSaveAsModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>另存为新主题</h3>
            <input
              type="text"
              className="modal-input"
              placeholder="输入新主题名称"
              value={newThemeName}
              onChange={(e) => setNewThemeName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveAs()}
              autoFocus
            />
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowSaveAsModal(false)}>
                取消
              </button>
              <button className="btn-primary" onClick={handleSaveAs}>
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeEditor;
