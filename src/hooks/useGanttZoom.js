import { useState, useCallback } from 'react';

export const useGanttZoom = (initialZoom = 1) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const pan = useCallback((deltaX, deltaY) => {
    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
  }, []);

  return {
    zoom,
    panOffset,
    zoomIn,
    zoomOut,
    resetZoom,
    pan,
    setZoom,
    setPanOffset
  };
};

export default useGanttZoom;