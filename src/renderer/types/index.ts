export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
  description?: string;
}

export interface RequestConfig {
  id: string;
  name: string;
  displayName?: string; // 显示名/别名
  method: HttpMethod;
  url: string;
  params: KeyValuePair[];
  headers: KeyValuePair[];
  body: {
    type: 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded' | 'raw' | 'binary';
    content: string;
    formData?: KeyValuePair[];
  };
  auth?: {
    type: 'none' | 'bearer' | 'basic' | 'api-key';
    token?: string;
    username?: string;
    password?: string;
    key?: string;
    value?: string;
  };
}

export interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
  size: number;
}

export interface Collection {
  id: string;
  name: string;
  requests: RequestConfig[];
  folders?: Folder[];
}

export interface Folder {
  id: string;
  name: string;
  requests: RequestConfig[];
}

export interface Environment {
  id: string;
  name: string;
  variables: KeyValuePair[];
}

export interface HistoryItem {
  id: string;
  request: RequestConfig;
  response: ResponseData;
  timestamp: number;
}

export interface AppState {
  currentRequest: RequestConfig;
  response: ResponseData | null;
  collections: Collection[];
  environments: Environment[];
  activeEnvironment: string | null;
  history: HistoryItem[];
  loading: boolean;
  theme?: Theme;
}

// 主题系统
export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

export interface ThemeColors {
  // 主要颜色
  primary: string;          // 主色调 (#3b82f6)
  primaryDark: string;      // 深主色 (#2563eb)
  primaryLight: string;     // 浅主色 (#eff6ff)
  
  // 中性色（灰度）
  white: string;            // 白色 (#ffffff)
  gray50: string;           // 极浅灰 (#f9fafb)
  gray100: string;          // 浅灰 (#f3f4f6)
  gray200: string;          // 边框灰 (#e5e7eb)
  gray300: string;          // 中浅灰 (#d1d5db)
  gray400: string;          // 中灰 (#9ca3af)
  gray500: string;          // 次要色 (#6b7280)
  gray600: string;          // 深灰 (#71717a)
  gray700: string;          // 更深灰 (#374151)
  gray800: string;          // 文本灰 (#1f2937)
  gray900: string;          // 背景深灰 (#fafafa)
  
  // 状态颜色
  success: string;          // 成功色 (#10b981)
  successLight: string;     // 浅成功色 (#d1fae5)
  error: string;            // 错误色 (#ef4444)
  errorLight: string;       // 浅错误色 (#fef2f2)
  warning: string;          // 警告色 (#f59e0b)
  warningLight: string;     // 浅警告色 (#fef3c7)
  info: string;             // 信息色 (#3b82f6)
  
  // 特殊颜色
  purple: string;           // 紫色 (#8b5cf6)
  zinc400: string;          // 锌色 (#a1a1aa)
  zinc500: string;          // 深锌色 (#71717a)
}

