import React from 'react';
import logoImage from '/magpie.png';

interface TitleBarProps {
  onThemeClick: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ onThemeClick }) => {
  const handleMinimize = () => {
    if (window.electronAPI && (window.electronAPI as any).minimizeWindow) {
      (window.electronAPI as any).minimizeWindow();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI && (window.electronAPI as any).maximizeWindow) {
      (window.electronAPI as any).maximizeWindow();
    }
  };

  const handleClose = () => {
    if (window.electronAPI && (window.electronAPI as any).closeWindow) {
      (window.electronAPI as any).closeWindow();
    }
  };

  const handleToggleDevTools = () => {
    if (window.electronAPI && (window.electronAPI as any).toggleDevTools) {
      (window.electronAPI as any).toggleDevTools();
    } else {
      // 如果Electron API不可用，使用浏览器的方式
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // 开发环境，直接打开开发者工具
        console.log('开发者工具已打开（请按F12查看）');
      } else {
        // 生产环境，提示用户
        alert('开发者工具功能仅在开发环境中可用');
      }
    }
  };

  return (
    <div className="custom-title-bar">
      <div className="title-bar-left">
        <img src={logoImage} alt="Magpie" className="title-bar-logo" />
        <span className="title-bar-title">Magpie</span>
      </div>
      <div className="title-bar-center">
        <span className="title-bar-subtitle">HTTP API 测试工具</span>
      </div>
      <div className="title-bar-right">
        <button className="title-bar-btn" onClick={onThemeClick} title="主题设置">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1 8a7 7 0 0 1 7-7v14a7 7 0 0 1-7-7z"/>
          </svg>
        </button>
        <button className="title-bar-btn" onClick={handleToggleDevTools} title="开发者工具">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2h12v12H2V2zm1 1v10h10V3H3zm2 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"/>
          </svg>
        </button>
        <button className="title-bar-btn" onClick={handleMinimize} title="最小化">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="0" y="5" width="12" height="2"/>
          </svg>
        </button>
        <button className="title-bar-btn" onClick={handleMaximize} title="最大化">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="0.5" y="0.5" width="11" height="11" fill="none" stroke="currentColor"/>
          </svg>
        </button>
        <button className="title-bar-btn btn-close" onClick={handleClose} title="关闭">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
