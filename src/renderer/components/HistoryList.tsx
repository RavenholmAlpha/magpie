import React, { memo, useCallback, useMemo } from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onLoadHistoryItem: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = memo(({ history, onLoadHistoryItem }) => {
  // 使用 useMemo 缓存历史记录切片
  const displayHistory = useMemo(() => history.slice(0, 20), [history]);

  // 使用 useCallback 优化点击处理
  const handleItemClick = useCallback((item: HistoryItem) => {
    // 立即执行，不等待
    onLoadHistoryItem(item);
  }, [onLoadHistoryItem]);

  if (history.length === 0) {
    return <div className="empty-hint">No history</div>;
  }

  return (
    <>
      {displayHistory.map((item) => (
        <div
          key={item.id}
          className="history-line-item"
          onClick={() => handleItemClick(item)}
        >
          <span className="req-method-label">{item.request.method}</span>
          <span className="history-url-label">{item.request.url}</span>
        </div>
      ))}
    </>
  );
});

HistoryList.displayName = 'HistoryList';

export default HistoryList;

