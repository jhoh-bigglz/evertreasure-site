'use client';

/**
 * 상단 헤더: 모바일 로고 + (옵션) 현재 날짜/시계.
 * 시계 표시 여부는 content/site.config.ts 의 showClock 으로 제어합니다. (원본 기본값: 꺼짐)
 */

import { useEffect, useState } from 'react';
import { siteConfig } from '@content/site.config';
import { ThemeImage } from '@/lib/theme';

export default function HeaderBar() {
  const [time, setTime] = useState({ date: '', clock: '' });

  useEffect(() => {
    if (!siteConfig.showClock) return;
    const update = () => {
      const now = new Date();
      setTime({
        date: now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        clock: now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="tf-header-wrap">
      <a href="#home" className="logo-site d-lg-none">
        <ThemeImage
          className="image-switch"
          light="/assets/images/logo/logo-gray.webp"
          dark="/assets/images/logo/logo-white.webp"
          loading="lazy"
          width={40}
          height={40}
        />
      </a>
      <div className="left">
        <div className="time-local text-body-3">
          <p className="date">{time.date}</p>
          <p className="clock">{time.clock}</p>
        </div>
      </div>
    </div>
  );
}
