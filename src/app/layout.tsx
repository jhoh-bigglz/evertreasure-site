import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteConfig } from '@content/site.config';
import { I18nProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';
import { ToastProvider } from '@/lib/toast';
import { asset } from '@/lib/basePath';
import './globals.css';

/** 사이트 제목/설명/공유 이미지는 content/site.config.ts 에서 수정하세요. */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: siteConfig.title,
  description: siteConfig.description,
  authors: [{ name: 'EverTreasure Co., Ltd.' }],
  openGraph: {
    locale: 'ko_KR',
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    type: 'website',
    images: [{ url: asset(siteConfig.ogImage), width: 1200, height: 630 }],
  },
  icons: {
    shortcut: asset('/assets/images/logo/logo_icon.webp'),
    apple: asset('/assets/images/logo/logo-black.webp'),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

/** 페인트 전에 저장된 다크모드를 적용해 화면 깜빡임을 방지하는 스크립트 */
const darkModeInitScript = `(function(){try{if(localStorage.getItem('darkMode')==='enabled'){document.body.classList.add('dark-mode');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 원본 사이트의 스타일시트를 그대로 사용합니다 (public/assets/) */}
        <link rel="stylesheet" href={asset('/assets/fonts/fonts.css')} />
        <link rel="stylesheet" href={asset('/assets/icon/icomoon/style.css')} />
        <link rel="stylesheet" href={asset('/assets/css/bootstrap.min.css')} />
        <link rel="stylesheet" href={asset('/assets/css/animate.css')} />
        <link rel="stylesheet" href={asset('/assets/css/styles.css')} />
      </head>
      <body className="counter-scroll" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: darkModeInitScript }} />
        <I18nProvider>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </I18nProvider>
        {/* 마우스 휠 스무스 스크롤 (site.config.ts 의 smoothScroll 로 켜고 끔) */}
        {siteConfig.smoothScroll && <Script src={asset('/assets/js/ScrollSmooth.js')} strategy="afterInteractive" />}
      </body>
    </html>
  );
}
