import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RequestConfig, ResponseData, Environment, KeyValuePair } from '../types';

// 替换环境变量
function replaceVariables(text: string, environments: Environment[], activeEnvId: string | null): string {
  console.log('🔄 开始替换变量:', { text, activeEnvId, environmentsCount: environments.length });
  
  if (!activeEnvId) {
    console.log('❌ 没有激活的环境');
    return text;
  }
  
  const activeEnv = environments.find(env => env.id === activeEnvId);
  if (!activeEnv) {
    console.log('❌ 找不到激活的环境:', activeEnvId);
    return text;
  }

  console.log('✅ 找到激活环境:', activeEnv.name, '变量数量:', activeEnv.variables.length);
  
  let result = text;
  activeEnv.variables.forEach((variable) => {
    if (variable.enabled) {
      const regex = new RegExp(`{{\\s*${variable.key}\\s*}}`, 'g');
      const oldResult = result;
      result = result.replace(regex, variable.value);
      if (oldResult !== result) {
        console.log(`✅ 替换变量: {{${variable.key}}} → ${variable.value}`);
      }
    }
  });

  console.log('🎯 替换后结果:', result);
  return result;
}

// 将KeyValuePair数组转换为对象
function keyValuePairsToObject(pairs: KeyValuePair[]): Record<string, string> {
  const result: Record<string, string> = {};
  pairs.forEach((pair) => {
    if (pair.enabled && pair.key) {
      result[pair.key] = pair.value;
    }
  });
  return result;
}

export async function sendHttpRequest(
  request: RequestConfig,
  environments: Environment[],
  activeEnvId: string | null
): Promise<ResponseData> {
  const startTime = performance.now();

  try {
    // 处理URL和替换变量
    let url = replaceVariables(request.url, environments, activeEnvId);

    // 添加查询参数
    const params = keyValuePairsToObject(request.params);
    if (Object.keys(params).length > 0) {
      const urlObj = new URL(url.startsWith('http') ? url : `http://${url}`);
      Object.entries(params).forEach(([key, value]) => {
        urlObj.searchParams.append(key, replaceVariables(value, environments, activeEnvId));
      });
      url = urlObj.toString();
    }

    // 处理请求头
    const headers: Record<string, string> = {};
    request.headers.forEach((header) => {
      if (header.enabled && header.key) {
        headers[header.key] = replaceVariables(header.value, environments, activeEnvId);
      }
    });

    // 处理认证
    if (request.auth && request.auth.type !== 'none') {
      switch (request.auth.type) {
        case 'bearer':
          headers['Authorization'] = `Bearer ${replaceVariables(request.auth.token || '', environments, activeEnvId)}`;
          break;
        case 'basic':
          const basicAuth = btoa(`${request.auth.username}:${request.auth.password}`);
          headers['Authorization'] = `Basic ${basicAuth}`;
          break;
        case 'api-key':
          if (request.auth.key) {
            headers[request.auth.key] = replaceVariables(request.auth.value || '', environments, activeEnvId);
          }
          break;
      }
    }

    // 处理请求体
    let data: any = undefined;
    if (request.body.type !== 'none' && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
      switch (request.body.type) {
        case 'json':
          try {
            const jsonContent = replaceVariables(request.body.content, environments, activeEnvId);
            data = JSON.parse(jsonContent);
            headers['Content-Type'] = 'application/json';
          } catch (e) {
            throw new Error('无效的JSON格式');
          }
          break;
        case 'form-data':
          const formData = new FormData();
          request.body.formData?.forEach((item) => {
            if (item.enabled && item.key) {
              formData.append(item.key, replaceVariables(item.value, environments, activeEnvId));
            }
          });
          data = formData;
          break;
        case 'x-www-form-urlencoded':
          const urlencoded = new URLSearchParams();
          request.body.formData?.forEach((item) => {
            if (item.enabled && item.key) {
              urlencoded.append(item.key, replaceVariables(item.value, environments, activeEnvId));
            }
          });
          data = urlencoded;
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
          break;
        case 'raw':
          data = replaceVariables(request.body.content, environments, activeEnvId);
          break;
      }
    }

    const config: AxiosRequestConfig = {
      method: request.method,
      url,
      headers,
      data,
      validateStatus: () => true, // 不抛出状态码错误
    };

    const response: AxiosResponse = await axios(config);
    const endTime = performance.now();

    // 计算响应大小
    const responseSize = new Blob([JSON.stringify(response.data)]).size;

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
      data: response.data,
      time: Math.round(endTime - startTime),
      size: responseSize,
    };
  } catch (error: any) {
    const endTime = performance.now();
    
    throw {
      message: error.message || '请求失败',
      time: Math.round(endTime - startTime),
    };
  }
}

