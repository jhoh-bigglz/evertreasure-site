'use client';

/** 모바일 플로팅 메뉴 버튼 + 내비게이션 목록 + 화면 오버레이. (원본 Menu Mobile 이식) */

import { Fragment, useState } from 'react';
import { navItems } from '@content/sections';
import { useI18n } from '@/lib/i18n';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function MobileMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navItems.map((item) => item.href));

  const toggle = () => {
    setOpen((prev) => {
      document.body.classList.toggle('overflow-hidden', !prev);
      return !prev;
    });
  };

  return (
    <>
      <div className="action-open-mobile d-lg-none" onClick={toggle}>
        <div className="tf-btn-icon style-2">
          <div className={`btn-mobile-menu ${open ? 'close' : ''}`}>
            <span></span>
          </div>
        </div>
        <div className={`nav-mobile-list ${open ? 'open' : ''}`}>
          <ul className="nav-mobile-item">
            {navItems.map((item) => (
              <Fragment key={item.href}>
                <li className="nav-item">
                  <a href={item.href} className={`item-link scroll-link ${active === item.href ? 'active' : ''}`}>
                    <i className={`icon ${item.icon}`}></i>
                    <p className="tool-tip text-caption">{t(item.labelKey)}</p>
                  </a>
                </li>
                {item.dividerAfter && <li className="br-line"></li>}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      <div className={`overlay-pop ${open ? 'open' : ''}`} onClick={toggle}></div>
    </>
  );
}
