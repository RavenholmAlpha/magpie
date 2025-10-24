import { Theme } from '../types';

// 默认浅色主题
export const defaultLightTheme: Theme = {
  id: 'light',
  name: '默认浅色',
  colors: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#eff6ff',
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#71717a',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#fafafa',
    success: '#10b981',
    successLight: '#d1fae5',
    error: '#ef4444',
    errorLight: '#fef2f2',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    info: '#3b82f6',
    purple: '#8b5cf6',
    zinc400: '#a1a1aa',
    zinc500: '#71717a',
  }
};

// 深色主题
export const darkTheme: Theme = {
  id: 'dark',
  name: '深色模式',
  colors: {
    primary: '#60a5fa',
    primaryDark: '#3b82f6',
    primaryLight: '#1e3a8a',
    white: '#1f2937',
    gray50: '#111827',
    gray100: '#1f2937',
    gray200: '#374151',
    gray300: '#4b5563',
    gray400: '#6b7280',
    gray500: '#9ca3af',
    gray600: '#d1d5db',
    gray700: '#e5e7eb',
    gray800: '#f9fafb',
    gray900: '#0f172a',
    success: '#34d399',
    successLight: '#064e3b',
    error: '#f87171',
    errorLight: '#7f1d1d',
    warning: '#fbbf24',
    warningLight: '#78350f',
    info: '#60a5fa',
    purple: '#a78bfa',
    zinc400: '#71717a',
    zinc500: '#a1a1aa',
  }
};

// 护眼主题（绿色系）
export const eyeCareTheme: Theme = {
  id: 'eyecare',
  name: '护眼模式',
  colors: {
    primary: '#10b981',
    primaryDark: '#059669',
    primaryLight: '#d1fae5',
    white: '#f0fdf4',
    gray50: '#ecfdf5',
    gray100: '#d1fae5',
    gray200: '#a7f3d0',
    gray300: '#6ee7b7',
    gray400: '#34d399',
    gray500: '#10b981',
    gray600: '#059669',
    gray700: '#047857',
    gray800: '#065f46',
    gray900: '#e8f5e9',
    success: '#10b981',
    successLight: '#d1fae5',
    error: '#ef4444',
    errorLight: '#fee2e2',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    info: '#10b981',
    purple: '#8b5cf6',
    zinc400: '#86efac',
    zinc500: '#4ade80',
  }
};

// 高对比主题
export const highContrastTheme: Theme = {
  id: 'highcontrast',
  name: '高对比',
  colors: {
    primary: '#0000ff',
    primaryDark: '#0000cc',
    primaryLight: '#e0e0ff',
    white: '#ffffff',
    gray50: '#f5f5f5',
    gray100: '#e0e0e0',
    gray200: '#cccccc',
    gray300: '#999999',
    gray400: '#666666',
    gray500: '#333333',
    gray600: '#1a1a1a',
    gray700: '#0d0d0d',
    gray800: '#000000',
    gray900: '#eeeeee',
    success: '#00ff00',
    successLight: '#e0ffe0',
    error: '#ff0000',
    errorLight: '#ffe0e0',
    warning: '#ffaa00',
    warningLight: '#fff5e0',
    info: '#0000ff',
    purple: '#ff00ff',
    zinc400: '#888888',
    zinc500: '#444444',
  }
};

// 紫色主题
export const purpleTheme: Theme = {
  id: 'purple',
  name: '紫色主题',
  colors: {
    primary: '#8b5cf6',
    primaryDark: '#7c3aed',
    primaryLight: '#ede9fe',
    white: '#ffffff',
    gray50: '#faf5ff',
    gray100: '#f3e8ff',
    gray200: '#e9d5ff',
    gray300: '#d8b4fe',
    gray400: '#c084fc',
    gray500: '#a855f7',
    gray600: '#9333ea',
    gray700: '#7e22ce',
    gray800: '#6b21a8',
    gray900: '#f5f3ff',
    success: '#10b981',
    successLight: '#d1fae5',
    error: '#ef4444',
    errorLight: '#fef2f2',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    info: '#8b5cf6',
    purple: '#8b5cf6',
    zinc400: '#c4b5fd',
    zinc500: '#a78bfa',
  }
};

// 蓝绿主题
export const oceanTheme: Theme = {
  id: 'ocean',
  name: '海洋主题',
  colors: {
    primary: '#06b6d4',
    primaryDark: '#0891b2',
    primaryLight: '#cffafe',
    white: '#ffffff',
    gray50: '#f0fdfa',
    gray100: '#ccfbf1',
    gray200: '#99f6e4',
    gray300: '#5eead4',
    gray400: '#2dd4bf',
    gray500: '#14b8a6',
    gray600: '#0d9488',
    gray700: '#0f766e',
    gray800: '#115e59',
    gray900: '#e0f2fe',
    success: '#10b981',
    successLight: '#d1fae5',
    error: '#ef4444',
    errorLight: '#fef2f2',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    info: '#06b6d4',
    purple: '#8b5cf6',
    zinc400: '#67e8f9',
    zinc500: '#22d3ee',
  }
};

// 所有预设主题
export const themePresets: Theme[] = [
  defaultLightTheme,
  darkTheme,
  eyeCareTheme,
  highContrastTheme,
  purpleTheme,
  oceanTheme,
];

// 根据 ID 获取主题
export const getThemeById = (id: string): Theme | undefined => {
  return themePresets.find(theme => theme.id === id);
};

// 创建新主题（基于现有主题）
export const createThemeFromExisting = (baseTheme: Theme, name: string): Theme => {
  return {
    ...baseTheme,
    id: `custom-${Date.now()}`,
    name,
  };
};

