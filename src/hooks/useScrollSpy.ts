'use client';

/**
 * 스크롤 위치에 따라 현재 보고 있는 섹션을 계산하는 훅. (원본 main.js scrollLink 이식)
 * 뷰포트 상단 1/3 지점과 각 섹션 중앙 사이의 거리가 가장 가까운 섹션을 활성으로 판단합니다.
 */

import { useEffect, useState } from 'react';

export function useScrollSpy(hrefs: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 3;
      let closest: string | null = null;
      let closestDistance = Infinity;

      hrefs.forEach((href) => {
        if (!href || href === '#') return;
        const el = document.querySelector<HTMLElement>(href);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + window.scrollY + rect.height / 2;
        const distance = Math.abs(viewportCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = href;
        }
      });

      setActive(closest);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hrefs]);

  return active;
}
