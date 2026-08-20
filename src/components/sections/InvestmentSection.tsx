'use client';

/**
 * 투자 성과 섹션: 펀딩 완료 작품 카드 그리드.
 * 카드 목록은 content/sections.ts 의 investmentItems 에서 수정하세요.
 */

import { investmentItems } from '@content/sections';
import { useI18n } from '@/lib/i18n';
import { asset } from '@/lib/basePath';

export default function InvestmentSection() {
  const { t } = useI18n();

  return (
    <div id="investmentResult" className="section-contact flat-spacing" style={{ marginTop: 40 }}>
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send"></i>
        <p>{t('MENU_INVESTMENT_RESULTS')}</p>
      </div>
      <div className="overflow-hidden">
        <div className="investment-results-grid effectFade fadeUp">
          {investmentItems.map((item) => (
            <div key={item.image} className="result-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="result-card-img" src={asset(item.image)} alt="Investment" loading="lazy" />
              <p className="item-name" style={{ fontWeight: 'bold' }}>
                {t(item.nameKey)}
              </p>
              <p className="funding-status">{t(item.statusKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
