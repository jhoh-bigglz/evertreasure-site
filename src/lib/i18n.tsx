'use client';

/**
 * 다국어(KO/EN) 컨텍스트.
 * 문구는 content/translations/ko.json, en.json 에서 관리합니다.
 * - t(key)    : 번역 문자열 반환 (일반 텍스트용)
 * - html(key) : HTML이 포함된 번역을 dangerouslySetInnerHTML로 넘길 때 사용
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import ko from '@content/translations/ko.json';
import en from '@content/translations/en.json';

export type Lang = 'ko' | 'en';

const dictionaries: Record<Lang, Record<string, string>> = { ko, en };

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  html: (key: string) => { __html: string };
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // 서버 렌더링 기본값은 한국어. 마운트 후 저장값/브라우저 언어를 반영합니다. (원본과 동일한 동작)
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    const browserLang = navigator.language?.startsWith('ko') ? 'ko' : 'en';
    const initial = saved === 'ko' || saved === 'en' ? saved : browserLang;
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.body.classList.remove('lang-ko', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem('language', next);
  }, []);

  const t = useCallback(
    (key: string) => dictionaries[lang][key] ?? dictionaries.ko[key] ?? key,
    [lang],
  );

  const html = useCallback((key: string) => ({ __html: dictionaries[lang][key] ?? dictionaries.ko[key] ?? key }), [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t, html }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
