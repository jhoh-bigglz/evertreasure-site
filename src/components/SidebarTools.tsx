'use client';

/**
 * 우측 툴 사이드바: 언어(KO/EN) 전환, 다크모드 토글, 섹션 내비게이션, 맨 위로 버튼.
 * (원본 Tool Sidebar + languageSwitcher + switchMode 이식)
 */

import { useEffect, useState, Fragment } from 'react';
import { navItems } from '@content/sections';
import { useI18n, type Lang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function SidebarTools() {
  const { lang, setLang, t } = useI18n();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = useScrollSpy(navItems.map((item) => item.href));

  // 드롭다운 밖을 클릭하면 닫기 (원본과 동일)
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [dropdownOpen]);

  const selectLang = (next: Lang) => {
    setLang(next);
    setDropdownOpen(false);
  };

  return (
    <div className="sidebar-tools pst-v1">
      <div className="nav-top">
        <div className={`language-switcher ${dropdownOpen ? 'open' : ''}`}>
          <button
            className="lang-current"
            id="langCurrent"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
          >
            <span className="lang-text">{t('lang.display')}</span>
          </button>
          <div className="lang-dropdown" id="langDropdown">
            {(['ko', 'en'] as Lang[]).map((code) => (
              <button
                key={code}
                className={`lang-option ${lang === code ? 'active' : ''}`}
                data-lang={code}
                onClick={(e) => {
                  e.stopPropagation();
                  selectLang(code);
                }}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className={`tf-btn-icon toggle-switch-mode ${isDark ? 'active' : ''}`} onClick={toggleTheme}>
          <i className="icon icon-light"></i>
        </div>
      </div>
      <ul className="nav-list">
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
      <div className="nav-bottom">
        <a
          href="#home"
          className="tf-btn-icon go-top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <i className="icon icon-arrow-top"></i>
        </a>
      </div>
    </div>
  );
}
