import { RequestConfig, KeyValuePair } from '../types';

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

// 生成cURL命令
export function generateCurl(request: RequestConfig): string {
  let curl = `curl --location --request ${request.method} '${request.url}`;

  // 添加查询参数
  const params = keyValuePairsToObject(request.params);
  if (Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    curl += `?${queryString}`;
  }
  curl += `'`;

  // 添加请求头
  request.headers.forEach((header) => {
    if (header.enabled && header.key) {
      curl += ` \\\\\n  --header '${header.key}: ${header.value}'`;
    }
  });

  // 添加认证
  if (request.auth && request.auth.type !== 'none') {
    switch (request.auth.type) {
      case 'bearer':
        curl += ` \\\\\n  --header 'Authorization: Bearer ${request.auth.token}'`;
        break;
      case 'basic':
        curl += ` \\\\\n  --user '${request.auth.username}:${request.auth.password}'`;
        break;
      case 'api-key':
        if (request.auth.key) {
          curl += ` \\\\\n  --header '${request.auth.key}: ${request.auth.value}'`;
        }
        break;
    }
  }

  // 添加请求体
  if (request.body.type !== 'none' && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    if (request.body.type === 'json') {
      const jsonData = request.body.content.replace(/'/g, "\\'");
      curl += ` \\\\\n  --header 'Content-Type: application/json' \\\\\n  --data-raw '${jsonData}'`;
    } else if (request.body.type === 'raw') {
      curl += ` \\\\\n  --data-raw '${request.body.content}'`;
    } else if (request.body.type === 'x-www-form-urlencoded') {
      const formData = keyValuePairsToObject(request.body.formData || []);
      const formString = new URLSearchParams(formData).toString();
      curl += ` \\\\\n  --header 'Content-Type: application/x-www-form-urlencoded' \\\\\n  --data-urlencode '${formString}'`;
    } else if (request.body.type === 'form-data') {
      request.body.formData?.forEach((item) => {
        if (item.enabled && item.key) {
          curl += ` \\\\\n  --form '${item.key}=${item.value}'`;
        }
      });
    }
  }

  return curl;
}

// 生成JavaScript (Fetch API) 代码
export function generateJavaScript(request: RequestConfig): string {
  const params = keyValuePairsToObject(request.params);
  let url = request.url;
  if (Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((header) => {
    if (header.enabled && header.key) {
      headers[header.key] = header.value;
    }
  });

  // 添加认证头
  if (request.auth && request.auth.type !== 'none') {
    switch (request.auth.type) {
      case 'bearer':
        headers['Authorization'] = `Bearer ${request.auth.token}`;
        break;
      case 'basic':
        headers['Authorization'] = `Basic ${btoa(`${request.auth.username}:${request.auth.password}`)}`;
        break;
      case 'api-key':
        if (request.auth.key) {
          headers[request.auth.key] = request.auth.value || '';
        }
        break;
    }
  }

  let body = 'undefined';
  if (request.body.type !== 'none' && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    if (request.body.type === 'json') {
      body = request.body.content;
      headers['Content-Type'] = 'application/json';
    } else if (request.body.type === 'raw') {
      body = `"${request.body.content.replace(/"/g, '\\"')}"`;
    } else if (request.body.type === 'x-www-form-urlencoded') {
      const formData = keyValuePairsToObject(request.body.formData || []);
      body = `new URLSearchParams(${JSON.stringify(formData)})`;
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
  }

  let code = `const url = "${url}";\n\n`;
  code += `const options = {\n`;
  code += `  method: "${request.method}",\n`;
  code += `  headers: ${JSON.stringify(headers, null, 2)}`;
  
  if (body !== 'undefined') {
    code += `,\n  body: ${body}`;
  }
  
  code += `\n};\n\n`;
  code += `fetch(url, options)\n`;
  code += `  .then(response => response.json())\n`;
  code += `  .then(data => console.log(data))\n`;
  code += `  .catch(error => console.error('Error:', error));`;

  return code;
}

// 生成Python (requests) 代码
export function generatePython(request: RequestConfig): string {
  let code = `import requests\n\n`;
  
  const params = keyValuePairsToObject(request.params);
  let url = request.url;
  
  code += `url = "${url}"\n\n`;

  // 添加查询参数
  if (Object.keys(params).length > 0) {
    code += `params = ${JSON.stringify(params, null, 2).replace(/"/g, "'")}\n\n`;
  }

  // 添加请求头
  const headers: Record<string, string> = {};
  request.headers.forEach((header) => {
    if (header.enabled && header.key) {
      headers[header.key] = header.value;
    }
  });

  // 添加认证头
  if (request.auth && request.auth.type !== 'none') {
    switch (request.auth.type) {
      case 'bearer':
        headers['Authorization'] = `Bearer ${request.auth.token}`;
        break;
      case 'basic':
        code += `auth = ("${request.auth.username}", "${request.auth.password}")\n\n`;
        break;
      case 'api-key':
        if (request.auth.key) {
          headers[request.auth.key] = request.auth.value || '';
        }
        break;
    }
  }

  if (Object.keys(headers).length > 0) {
    code += `headers = ${JSON.stringify(headers, null, 2).replace(/"/g, "'")}\n\n`;
  }

  // 添加请求体
  let bodyParam = '';
  if (request.body.type !== 'none' && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    if (request.body.type === 'json') {
      try {
        const jsonData = JSON.parse(request.body.content);
        code += `data = ${JSON.stringify(jsonData, null, 2).replace(/"/g, "'")}\n\n`;
        bodyParam = ', json=data';
      } catch {
        code += `data = '''${request.body.content}'''\n\n`;
        bodyParam = ', data=data';
      }
    } else if (request.body.type === 'raw') {
      code += `data = '''${request.body.content}'''\n\n`;
      bodyParam = ', data=data';
    } else if (request.body.type === 'x-www-form-urlencoded') {
      const formData = keyValuePairsToObject(request.body.formData || []);
      code += `data = ${JSON.stringify(formData, null, 2).replace(/"/g, "'")}\n\n`;
      bodyParam = ', data=data';
    }
  }

  // 生成请求调用
  code += `response = requests.${request.method.toLowerCase()}(url`;
  
  if (Object.keys(params).length > 0) {
    code += ', params=params';
  }
  if (Object.keys(headers).length > 0) {
    code += ', headers=headers';
  }
  if (request.auth && request.auth.type === 'basic') {
    code += ', auth=auth';
  }
  if (bodyParam) {
    code += bodyParam;
  }
  
  code += `)\n\n`;
  code += `print(response.status_code)\n`;
  code += `print(response.json())`;

  return code;
}

// 生成Node.js (Axios) 代码
export function generateNodeAxios(request: RequestConfig): string {
  let code = `const axios = require('axios');\n\n`;

  const params = keyValuePairsToObject(request.params);
  let url = request.url;

  const headers: Record<string, string> = {};
  request.headers.forEach((header) => {
    if (header.enabled && header.key) {
      headers[header.key] = header.value;
    }
  });

  // 添加认证头
  if (request.auth && request.auth.type !== 'none') {
    switch (request.auth.type) {
      case 'bearer':
        headers['Authorization'] = `Bearer ${request.auth.token}`;
        break;
      case 'basic':
        headers['Authorization'] = `Basic ${Buffer.from(`${request.auth.username}:${request.auth.password}`).toString('base64')}`;
        break;
      case 'api-key':
        if (request.auth.key) {
          headers[request.auth.key] = request.auth.value || '';
        }
        break;
    }
  }

  code += `const config = {\n`;
  code += `  method: '${request.method.toLowerCase()}',\n`;
  code += `  url: '${url}',\n`;
  
  if (Object.keys(headers).length > 0) {
    code += `  headers: ${JSON.stringify(headers, null, 4)},\n`;
  }
  
  if (Object.keys(params).length > 0) {
    code += `  params: ${JSON.stringify(params, null, 4)},\n`;
  }

  // 添加请求体
  if (request.body.type !== 'none' && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    if (request.body.type === 'json') {
      try {
        const jsonData = JSON.parse(request.body.content);
        code += `  data: ${JSON.stringify(jsonData, null, 4)},\n`;
      } catch {
        code += `  data: ${request.body.content},\n`;
      }
    } else if (request.body.type === 'raw') {
      code += `  data: "${request.body.content.replace(/"/g, '\\"')}",\n`;
    }
  }

  code += `};\n\n`;
  code += `axios(config)\n`;
  code += `  .then(response => {\n`;
  code += `    console.log(JSON.stringify(response.data));\n`;
  code += `  })\n`;
  code += `  .catch(error => {\n`;
  code += `    console.log(error);\n`;
  code += `  });`;

  return code;
}

// 生成所有语言的代码
export function generateAllCode(request: RequestConfig) {
  return {
    curl: generateCurl(request),
    javascript: generateJavaScript(request),
    python: generatePython(request),
    nodejs: generateNodeAxios(request),
  };
}

