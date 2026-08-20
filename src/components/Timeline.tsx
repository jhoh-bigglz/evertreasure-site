'use client';

/**
 * 에버트레져 연혁 타임라인 (접기/펼치기 + 스크롤 진행선).
 * 연혁 데이터는 content/sections.ts 의 timelineItems 에서 수정하세요.
 */

import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineItems } from '@content/sections';
import { useI18n } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const { t, html } = useI18n();
  const [collapsed, setCollapsed] = useState(true); // 원본과 동일하게 접힌 상태로 시작

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (next) gsap.set('.prg-line', { height: '0%' });
    // 높이 변경을 ScrollTrigger에 반영 (원본과 동일)
    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  return (
    <div className="timeline-wrapper" style={{ marginTop: 40 }}>
      <h3
        className="letter-space--2 text-black-72 split-text effectFade fadeUp"
        style={{
          fontSize: 'clamp(26px, 3vw + 4px, 40px)',
          color: 'var(--black-56)',
          fontWeight: 800,
          lineHeight: '130%',
          marginBottom: 20,
        }}
        dangerouslySetInnerHTML={html('HISTORY_SECTION_TITLE')}
      />
      <button className={`timeline-toggle-btn ${collapsed ? '' : 'expanded'}`} onClick={toggle}>
        <svg className="toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="icon-plus" d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path className="icon-minus" d="M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="toggle-text">{t('ABOUT_HISTORY_TITLE')}</span>
      </button>
      <div className={`timeline scroll-down ${collapsed ? 'collapsed' : ''}`}>
        <div className="timeline-line">
          <div className="prg-line"></div>
        </div>
        {timelineItems.map((item) => (
          <div key={item.year} className="timeline-item effectFade fadeUp no-div">
            <p className="timeline-date text-black-56">{item.year}</p>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <ul className="timeline-list">
                {item.entryKeys.map((key) => (
                  <li key={key} dangerouslySetInnerHTML={html(key)} />
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
