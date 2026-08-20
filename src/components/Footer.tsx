'use client';

/** 푸터: 저작권 문구는 content/translations/ 의 FOOTER_COPYRIGHT 키에서 수정하세요. */

import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { html } = useI18n();

  return (
    <div id="footer" className="tf-footer flat-spacing" style={{ paddingTop: 0 }}>
      <div className="block-quote effectFade fadeUp no-div"></div>
      <div className="br-line"></div>
      <div className="foot-bottom">
        <p className="text-nocopy text-black-56 effectFade fadeUp no-div" dangerouslySetInnerHTML={html('FOOTER_COPYRIGHT')} />
      </div>
    </div>
  );
}
