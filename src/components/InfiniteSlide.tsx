'use client';

/**
 * 로고 무한 롤링 슬라이드. (원본 infiniteslide.js v2 이식)
 * 원본과 동일하게 로고 목록을 여러 벌 복제한 뒤 CSS 애니메이션으로 왼쪽으로 흘려보냅니다.
 * 마우스를 올리면 일시정지됩니다. 속도(speed)는 px/초 단위입니다.
 */

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/basePath';

export default function InfiniteSlide({
  logos,
  speed = 50,
  clone = 6,
}: {
  logos: string[];
  speed?: number;
  clone?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 첫 번째 세트(원본 로고들)의 총 너비만큼 이동해야 끊김 없이 이어집니다.
    const update = () => {
      const firstSet = Array.from(track.children).filter(
        (el): el is HTMLElement => el instanceof HTMLElement && el.dataset.set === '0',
      );
      let width = 0;
      firstSet.forEach((el) => {
        const cs = getComputedStyle(el);
        width += el.offsetWidth + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
      });
      if (!width) return;
      track.style.setProperty('--slide-distance', `-${width}px`);
      track.style.animationDuration = `${width / speed}s`;
    };

    update();
    const imgs = Array.from(track.querySelectorAll('img'));
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', update);
    });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      imgs.forEach((img) => img.removeEventListener('load', update));
    };
  }, [logos, speed]);

  return (
    <div className="infiniteslide_wrap" style={{ overflow: 'hidden' }}>
      <div ref={trackRef} className="infiniteSlide tf-marquee-track">
        {Array.from({ length: clone + 1 }).map((_, setIndex) =>
          logos.map((src, i) => (
            <div key={`${setIndex}-${i}`} data-set={setIndex} className="image-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(src)} alt="Partner" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
