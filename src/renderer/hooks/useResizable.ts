import { useState, useCallback, useEffect, useRef } from 'react';

export function useResizable(initialWidth: number, minWidth: number = 200, maxWidth: number = 600) {
  const [width, setWidth] = useState(initialWidth);
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(initialWidth);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isResizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = width;
    e.preventDefault();
  }, [width]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;

      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidthRef.current + delta));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [minWidth, maxWidth]);

  return { width, handleMouseDown };
}

