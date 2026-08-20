'use client';

/**
 * 가치 탐사대 섹션: 스크롤에 따라 순서대로 고정(sticky)되는 캐릭터 카드.
 * 카드 목록은 content/sections.ts 의 hunterCards 에서 수정하세요.
 */

import { hunterCards } from '@content/sections';
import { useI18n } from '@/lib/i18n';
import { asset } from '@/lib/basePath';

export default function WorkSection() {
  const { t } = useI18n();

  return (
    <div id="work" className="section-work">
      <div className="overflow-hidden">
        <div className="sect-tag text-caption fw-medium effectFade fadeUp">
          <i className="icon icon-high-light"></i>
          <p>{t('MENU_VALUE_HUNTERS')}</p>
        </div>
      </div>

      <div className="work-subsection">
        <div className="subsection-header">
          <div className="overflow-hidden">
            <h3
              className="subsection-title letter-space--2 text-black-72 effectFade fadeUp"
              style={{ fontSize: 'clamp(26px, 3vw + 4px, 40px)', color: 'var(--black-56)', fontWeight: 800 }}
            >
              {t('VALUE_HUNTERS_TAGLINE')}
            </h3>
          </div>
          <div className="overflow-hidden">
            <p className="subsection-desc text-black-56 text-body-3 effectFade fadeUp">{t('VALUE_HUNTERS_DESC')}</p>
          </div>
        </div>
        <div className="work-list element-sticky">
          {hunterCards.map((card) => (
            <div key={card.nameKey} className="sticky-item">
              <div className="wg-work wg-work--with-content">
                <div className="work-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" width={700} height={427} src={asset(card.image)} alt="Image" />
                </div>
                <div className="wrap">
                  <div className="work-content">
                    <div className="w-image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" width={468} height={856} src={asset(card.image)} alt="Image" />
                    </div>
                    <div className="content">
                      <div className="content-top">
                        <div className="w-logo">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img loading="lazy" width={40} height={40} src={asset('/assets/images/logo/logo-white.webp')} alt="Image" />
                        </div>
                        <h4
                          className="w-title letter-space--2 text-white-72"
                          style={{ fontSize: 'clamp(18px, 2vw + 2px, 24px)', fontWeight: 800, marginBottom: 4 }}
                        >
                          {t(card.nameKey)}
                        </h4>
                        <p className="w-desc text-white-56 text-body-3">{t(card.descKey)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
