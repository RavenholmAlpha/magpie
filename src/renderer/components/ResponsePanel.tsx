import React, { useState } from 'react';
import { ResponseData } from '../types';
import { formatBytes, formatTime, formatJson, getStatusColor } from '../utils/helpers';

interface ResponsePanelProps {
  response: ResponseData;
}

const ResponsePanel: React.FC<ResponsePanelProps> = React.memo(({ response }) => {
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body');
  const [bodyView, setBodyView] = useState<'pretty' | 'raw'>('pretty');

  const copyResponseToClipboard = () => {
    const text = typeof response.data === 'object' 
      ? JSON.stringify(response.data, null, 2)
      : String(response.data);
    navigator.clipboard.writeText(text);
    alert('Response copied!');
  };

  const renderBody = () => {
    if (!response.data) return <div className="empty-response">无响应数据</div>;

    if (bodyView === 'pretty') {
      try {
        const formatted = typeof response.data === 'object' 
          ? formatJson(response.data)
          : response.data;
        
        return <pre className="response-body-pretty">{formatted}</pre>;
      } catch {
        return <pre className="response-body-raw">{String(response.data)}</pre>;
      }
    } else {
      return <pre className="response-body-raw">{JSON.stringify(response.data)}</pre>;
    }
  };

  return (
    <div className="response-panel">
      <div className="response-header">
        <div className="response-status">
          <span 
            className="status-badge" 
            style={{ backgroundColor: getStatusColor(response.status) }}
          >
            {response.status} {response.statusText}
          </span>
          <span className="response-meta">
            {formatTime(response.time)}
          </span>
          <span className="response-meta">
            {formatBytes(response.size)}
          </span>
        </div>

        <div className="response-tabs">
          <button
            className={`tab ${activeTab === 'body' ? 'active' : ''}`}
            onClick={() => setActiveTab('body')}
          >
            Body
          </button>
          <button
            className={`tab ${activeTab === 'headers' ? 'active' : ''}`}
            onClick={() => setActiveTab('headers')}
          >
            Headers
            <span className="tab-count">{Object.keys(response.headers).length}</span>
          </button>
        </div>
      </div>

      <div className="response-content">
        {activeTab === 'body' ? (
          <div className="response-body">
            <div className="response-body-toolbar">
              <div className="toolbar-left">
                <button
                  className={`btn-view ${bodyView === 'pretty' ? 'active' : ''}`}
                  onClick={() => setBodyView('pretty')}
                >
                  Pretty
                </button>
                <button
                  className={`btn-view ${bodyView === 'raw' ? 'active' : ''}`}
                  onClick={() => setBodyView('raw')}
                >
                  Raw
                </button>
              </div>
              <button className="btn-copy-text" onClick={copyResponseToClipboard}>
                Copy
              </button>
            </div>
            {renderBody()}
          </div>
        ) : (
          <div className="response-headers">
            <table className="headers-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>值</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(response.headers).map(([key, value]) => (
                  <tr key={key}>
                    <td className="header-key">{key}</td>
                    <td className="header-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
});

ResponsePanel.displayName = 'ResponsePanel';

export default ResponsePanel;

