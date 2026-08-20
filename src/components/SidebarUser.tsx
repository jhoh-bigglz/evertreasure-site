'use client';

/**
 * 좌측 캐릭터 사이드바: 프로필 이미지 ↔ 모션 비디오 자동 교차 재생, SNS 링크, 인사말.
 * (원본 User Sidebar + profileVideoToggle 이식)
 * 캐릭터 변경은 content/site.config.ts 의 character 값을 수정하세요.
 */

import { useEffect, useRef } from 'react';
import { siteConfig, characters } from '@content/site.config';
import { useI18n } from '@/lib/i18n';
import { ThemeImage } from '@/lib/theme';
import { asset } from '@/lib/basePath';
import AnimatedGreeting from '@/components/AnimatedGreeting';

const IMAGE_HOLD_MS = 2000; // 이미지가 표시되는 시간

export default function SidebarUser() {
  const { t, html } = useI18n();
  const character = characters[siteConfig.character];
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const imageWrap = imageWrapRef.current;
    if (!video || !imageWrap) return;

    let cycleStarted = false;
    let disposed = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    // iOS Safari에서 비디오 로드를 위한 설정 (원본과 동일)
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (isIOS) {
      video.muted = true;
      video.load();
    }

    const playVideo = () => {
      if (disposed) return;
      video.classList.add('active');
      imageWrap.classList.add('video-playing');
      video.currentTime = 0;
      video.play().catch(() => hideVideo());
    };

    const hideVideo = () => {
      if (disposed) return;
      video.classList.remove('active');
      imageWrap.classList.remove('video-playing');
      video.pause();
      later(playVideo, IMAGE_HOLD_MS);
    };

    const startCycle = () => {
      if (cycleStarted || disposed) return;
      cycleStarted = true;
      later(playVideo, IMAGE_HOLD_MS);
    };

    video.addEventListener('canplaythrough', startCycle);
    video.addEventListener('loadeddata', startCycle);
    video.addEventListener('ended', hideVideo);
    // 3초 후에도 시작되지 않으면 강제 시작 (iOS fallback, 원본과 동일)
    later(startCycle, 3000);

    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      video.removeEventListener('canplaythrough', startCycle);
      video.removeEventListener('loadeddata', startCycle);
      video.removeEventListener('ended', hideVideo);
    };
  }, []);

  return (
    <div className="sidebar-user">
      <div className="wrap">
        <div className="user-image">
          <div className="image" ref={imageWrapRef}>
            <picture>
              <source srcSet={asset(character.image)} type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="user-profile-img" width={468} height={624} src={asset(character.image)} alt="Image" />
            </picture>
            <video
              ref={videoRef}
              className="user-profile-video"
              muted
              playsInline
              preload="metadata"
              width={468}
              height={624}
            >
              <source src={asset(character.video)} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="user-logo d-none d-lg-block">
          <ThemeImage
            className="image-switch"
            light="/assets/images/logo/logo-black.webp"
            dark="/assets/images/logo/logo-white.webp"
            loading="lazy"
            width={40}
            height={40}
          />
        </div>
        <ul className="tf-social-icon-2 user-social d-grid">
          <li>
            <a href={t('LINK_INSTAGRAM')} target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset('/assets/images/logo/insta.svg')} alt="Instagram" className="icon" />
            </a>
          </li>
          {siteConfig.social.linkedin && (
            <li>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
                <i className="icon icon-linkin"></i>
              </a>
            </li>
          )}
          {siteConfig.social.youtube && (
            <li>
              <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset('/assets/images/logo/youtube.svg')} alt="YouTube" className="icon" />
              </a>
            </li>
          )}
        </ul>
        <div className="user-info">
          <p className="avaiable-dot text-body-3 fw-medium d-sm-none">
            <span className="dot"></span>
            <span>{t(character.titleKey)}</span>
          </p>
          <AnimatedGreeting helloKeys={character.helloKeys} />
          <p
            className="introduce text-white-56 letter-space--05 text-body-3"
            style={{ marginBottom: 10 }}
            dangerouslySetInnerHTML={html(character.greetingKey)}
          />
        </div>
      </div>
    </div>
  );
}
