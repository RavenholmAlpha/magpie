import React, { useState } from 'react';
import { RequestConfig } from '../types';
import { generateAllCode } from '../utils/codeGenerator';

interface CodeGeneratorProps {
  request: RequestConfig;
  onClose: () => void;
}

type Language = 'curl' | 'javascript' | 'python' | 'nodejs';

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ request, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('curl');
  const codes = generateAllCode(request);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codes[selectedLanguage]);
    alert('代码已复制到剪贴板！');
  };

  const languageLabels: Record<Language, string> = {
    curl: 'cURL',
    javascript: 'JavaScript (Fetch)',
    python: 'Python (requests)',
    nodejs: 'Node.js (Axios)',
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large code-generator-modal" onClick={(e) => e.stopPropagation()}>
        <div className="code-generator-header">
          <h3>生成代码</h3>
          <button className="btn-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="code-lang-tabs">
          {(Object.keys(languageLabels) as Language[]).map((lang) => (
            <button
              key={lang}
              className={`code-lang-tab ${selectedLanguage === lang ? 'active' : ''}`}
              onClick={() => setSelectedLanguage(lang)}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>

        <div className="code-preview">
          <pre className="code-block">
            <code>{codes[selectedLanguage]}</code>
          </pre>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            关闭
          </button>
          <button className="btn-primary" onClick={copyToClipboard}>
            📋 复制代码
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;

