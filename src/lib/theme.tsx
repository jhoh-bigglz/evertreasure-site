'use client';

/**
 * 다크/라이트 모드 컨텍스트.
 * body에 .dark-mode 클래스를 토글하고 localStorage('darkMode')에 저장합니다.
 * 로고처럼 모드에 따라 이미지가 달라지는 곳은 <ThemeImage light={..} dark={..} />를 사용하세요.
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { asset } from '@/lib/basePath';

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // layout.tsx의 인라인 스크립트가 페인트 전에 body 클래스를 먼저 적용해 두므로
    // 여기서는 그 결과를 React 상태로 동기화합니다.
    setIsDark(document.body.classList.contains('dark-mode'));
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.body.classList.toggle('dark-mode', next);
      localStorage.setItem('darkMode', next ? 'enabled' : 'disabled');
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

/** 라이트/다크 모드에 따라 다른 이미지를 보여주는 <img> 래퍼 */
export function ThemeImage({
  light,
  dark,
  alt = 'Image',
  ...rest
}: { light: string; dark: string; alt?: string } & Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt'
>) {
  const { isDark } = useTheme();
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={asset(isDark ? dark : light)} alt={alt} {...rest} />;
}
