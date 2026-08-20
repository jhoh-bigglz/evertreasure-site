'use client';

/**
 * 회사소개 섹션: 비전/미션, 해시태그, 핵심기술·플랫폼 아코디언, 연혁 타임라인.
 * 문구는 content/translations/, 목록 데이터는 content/sections.ts 에서 수정하세요.
 */

import { hashtagKeys, coreTechItems, platformItems } from '@content/sections';
import { useI18n } from '@/lib/i18n';
import { asset } from '@/lib/basePath';
import Accordion from '@/components/Accordion';
import Timeline from '@/components/Timeline';

export default function AboutSection() {
  const { t, html } = useI18n();

  return (
    <>
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-user-circle"></i>
        <p>{t('MENU_ABOUT')}</p>
      </div>

      <div className="intro-author" style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={asset('/assets/images/logo/logo-black.webp')} alt="Logo" style={{ height: 30, width: 'auto' }} />
        <h3
          className="letter-space--2 text-black-72"
          style={{ color: 'var(--black-56)', fontWeight: 800, marginLeft: 10 }}
        >
          EVERTREASURE
        </h3>
      </div>

      <div className="overflow-hidden">
        <h3
          className="s-title letter-space--2 text-black-72 split-text effectFade fadeUp"
          style={{ fontSize: 'clamp(26px, 3vw + 4px, 40px)', color: 'var(--black-56)', fontWeight: 800, lineHeight: '130%' }}
          dangerouslySetInnerHTML={html('VISION')}
        />
      </div>
      <div className="overflow-hidden">
        <p className="s-desc text-black-56 effectFade fadeUp" dangerouslySetInnerHTML={html('MISSION')} />
      </div>

      <div className="section-intro type-3">
        <div className="intro-hashtags">
          {hashtagKeys.map((key) => (
            <span key={key} className="hashtag">
              {t(key)}
            </span>
          ))}
        </div>
      </div>

      <div className="section-service flat-spacing">
        <div className="overflow-hidden">
          <h3
            className="letter-space--2 text-black-72 split-text effectFade fadeUp"
            style={{ fontSize: 'clamp(26px, 3vw + 4px, 40px)', color: 'var(--black-56)', fontWeight: 800, lineHeight: '130%' }}
          >
            {t('CORE_TECH_TITLE')}
          </h3>
        </div>
        <Accordion items={coreTechItems} panelMarginBottom={18} />

        <div className="section-service flat-spacing">
          <div className="overflow-hidden">
            <h3
              className="letter-space--2 text-black-72 split-text effectFade fadeUp"
              style={{ fontSize: 'clamp(26px, 3vw + 4px, 40px)', color: 'var(--black-56)', fontWeight: 800, lineHeight: '130%' }}
            >
              {t('PLATFORM_TITLE')}
            </h3>
          </div>
          <Accordion items={platformItems} variant="platform" />

          <Timeline />
        </div>
      </div>
    </>
  );
}
