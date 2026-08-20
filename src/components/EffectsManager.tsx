'use client';

/**
 * 원본 gsapAnimation.js의 스크롤 연출을 GSAP로 그대로 재현하는 컴포넌트.
 * 페이지 마운트 후 1회 실행되며 다음을 담당합니다.
 *  1) .split-text 요소 표시 (CSS 기본값 opacity:0 해제)
 *  2) .effectFade(fadeUp/fadeDown/fadeLeft/fadeRight/fadeZoom/fadeRotateX) 등장 효과
 *  3) 연혁 타임라인 진행선(.prg-line) 스크럽 + 항목 활성화
 *  4) 가치탐사대 스티키 카드 활성화 + 캐릭터 사이드바(.sidebar-user) 활성 토글
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EffectsManager() {
  useEffect(() => {
    let isClickScrolling = false;
    let clickScrollTimer: ReturnType<typeof setTimeout> | null = null;

    const ctx = gsap.context(() => {
      /* 1) split-text 표시 (CSS 기본값 opacity:0 해제)
         원본은 SplitText로 글자를 쪼개지만, 곧바로 i18n이 innerHTML을 덮어써
         최종 렌더링은 "분할 없는 일반 텍스트"이므로 표시 처리만 하면 동일합니다. */
      gsap.set('.split-text', { opacity: 1, perspective: 400 });

      /* 2) effectFade 계열 등장 효과 (원본 scrollEffectFade 이식) */
      document.querySelectorAll<HTMLElement>('.effectFade').forEach((el) => {
        const fromVars: gsap.TweenVars = { autoAlpha: 0 };
        const toVars: gsap.TweenVars = { autoAlpha: 1, duration: 1, ease: 'power3.out' };
        let startPush = 'top 96%';
        toVars.delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;

        if (el.classList.contains('fadeUp')) {
          fromVars.y = 50;
          toVars.y = 0;
        } else if (el.classList.contains('fadeDown')) {
          fromVars.y = -50;
          toVars.y = 0;
        } else if (el.classList.contains('fadeLeft')) {
          fromVars.x = -50;
          toVars.x = 0;
        } else if (el.classList.contains('fadeRight')) {
          fromVars.x = 50;
          toVars.x = 0;
        } else if (el.classList.contains('fadeRotateX')) {
          fromVars.rotationX = 45;
          fromVars.yPercent = 100;
          fromVars.transformOrigin = 'top center -50';
          toVars.rotationX = 0;
          toVars.yPercent = 0;
          toVars.transformOrigin = 'top center -50';
          const wrapper = el.parentElement;
          if (wrapper?.classList.contains('overflow-hidden')) wrapper.style.perspective = '400px';
        } else if (el.classList.contains('fadeZoom')) {
          fromVars.scale = 0.8;
          toVars.scale = 1;
        }

        if (el.classList.contains('view-visible')) startPush = 'top 101%';

        gsap.set(el, fromVars);
        gsap.to(el, {
          ...toVars,
          scrollTrigger: { trigger: el, start: startPush, toggleActions: 'play none none none' },
        });
      });

      /* 3) 연혁 타임라인 진행선 + 항목 활성화 (원본 scrollLine 이식) */
      if (document.querySelector('.scroll-down')) {
        gsap.set('.prg-line', { height: '0%' });

        const items = document.querySelectorAll<HTMLElement>('.scroll-down .timeline-item');
        if (items.length) {
          gsap.to('.prg-line', {
            height: '100%',
            duration: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: items[0],
              endTrigger: items[items.length - 1],
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          items.forEach((item) => {
            ScrollTrigger.create({
              trigger: item,
              start: 'top 30%',
              onEnter: () => item.classList.add('active'),
              onLeaveBack: () => item.classList.remove('active'),
              invalidateOnRefresh: true,
            });
          });
        }
      }

      /* 4) 가치탐사대 스티키 카드 + 캐릭터 사이드바 활성 토글 (원본 service 이식) */
      const sidebar = document.querySelector('.sidebar-user');
      const works = document.querySelectorAll<HTMLElement>('.sticky-item');

      if (sidebar && works.length) {
        ScrollTrigger.create({
          trigger: works[0],
          start: 'top 132px',
          endTrigger: works[works.length - 1],
          end: 'bottom 68px',
          onEnter: () => !isClickScrolling && sidebar.classList.add('active'),
          onLeave: () => !isClickScrolling && sidebar.classList.remove('active'),
          onEnterBack: () => !isClickScrolling && sidebar.classList.add('active'),
          onLeaveBack: () => !isClickScrolling && sidebar.classList.remove('active'),
          invalidateOnRefresh: true,
        });

        works.forEach((work) => {
          const wrap = work.querySelector('.wrap');
          if (!wrap) return;
          const activateOnly = () => {
            if (isClickScrolling) return;
            document.querySelectorAll('.sticky-item .wrap').forEach((el) => el.classList.remove('active'));
            wrap.classList.add('active');
          };
          ScrollTrigger.create({
            trigger: work,
            start: 'top 132px',
            end: 'bottom 68px',
            onEnter: activateOnly,
            onEnterBack: activateOnly,
            onLeave: () => !isClickScrolling && wrap.classList.remove('active'),
            onLeaveBack: () => !isClickScrolling && wrap.classList.remove('active'),
            invalidateOnRefresh: true,
          });
        });
      }

    });

    // 앵커 클릭으로 스크롤 중일 때는 활성 토글을 잠시 멈춥니다. (원본과 동일)
    const onAnchorClick = () => {
      isClickScrolling = true;
      if (clickScrollTimer) clearTimeout(clickScrollTimer);
      clickScrollTimer = setTimeout(() => {
        isClickScrolling = false;
      }, 800);
    };
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchors.forEach((a) => a.addEventListener('click', onAnchorClick));

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      anchors.forEach((a) => a.removeEventListener('click', onAnchorClick));
      if (clickScrollTimer) clearTimeout(clickScrollTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
