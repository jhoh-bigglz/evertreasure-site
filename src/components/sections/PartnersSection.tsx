'use client';

/**
 * 글로벌 파트너 섹션: 그룹별 로고 무한 롤링 슬라이드.
 * 로고 추가/삭제는 content/sections.ts 의 partnerGroups 에서 하세요.
 */

import { partnerGroups } from '@content/sections';
import { useI18n } from '@/lib/i18n';
import InfiniteSlide from '@/components/InfiniteSlide';

export default function PartnersSection() {
  const { t } = useI18n();

  return (
    <div id="partners" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send"></i>
        <p>{t('MENU_PARTNERS')}</p>
      </div>

      <div className="overflow-hidden">
        <div className="partners-container effectFade fadeUp">
          {partnerGroups.map((group) => (
            <div key={group.titleKey} className="partner-section">
              <h6 className="partner-section-title">{t(group.titleKey)}</h6>
              <div className="infiniteSlide-brand">
                <InfiniteSlide logos={group.logos} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
