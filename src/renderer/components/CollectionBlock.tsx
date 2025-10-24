import React, { memo } from 'react';
import { Collection, RequestConfig } from '../types';

interface CollectionBlockProps {
  collection: Collection;
  isActive: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onLoadRequest: (request: RequestConfig) => void;
  onDeleteRequest: (requestId: string) => void;
}

const CollectionBlock: React.FC<CollectionBlockProps> = memo(({
  collection,
  isActive,
  onToggle,
  onDelete,
  onLoadRequest,
  onDeleteRequest,
}) => {
  return (
    <div className="collection-block">
      <div className="collection-title-bar">
        <span
          className={`collection-title ${isActive ? 'active' : ''}`}
          onClick={onToggle}
        >
          {collection.name}
        </span>
        <button
          className="btn-text-delete"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      {isActive && (
        <div className="collection-requests-list">
          {collection.requests.map((req) => (
            <div
              key={req.id}
              className="request-line-item"
              onClick={() => onLoadRequest(req)}
            >
              <span className="req-method-label">{req.method}</span>
              <span className="req-name-label" title={req.displayName ? `别名: ${req.displayName}` : req.name}>
                {req.displayName || req.name}
              </span>
              <button
                className="btn-mini-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRequest(req.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

CollectionBlock.displayName = 'CollectionBlock';

export default CollectionBlock;

