'use client';

/** 페이지 로드 시 스피너를 보여주고 서서히 사라지는 프리로더. (원본 loaderV2 이식) */

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 100);
    const removeTimer = setTimeout(() => setRemoved(true), 1000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className="preload preload-container"
      id="preload"
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: fading ? 'none' : 'auto' }}
    >
      <div className="preload-logo">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
