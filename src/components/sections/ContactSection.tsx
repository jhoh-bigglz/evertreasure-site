'use client';

/**
 * 문의(Contact) 섹션.
 * 폼 제출 시 Web3Forms(https://web3forms.com)를 통해 이메일이 발송됩니다.
 *  - 액세스 키는 .env.local 의 NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY 에 설정하세요.
 *  - 수신 이메일 주소는 Web3Forms에서 키를 발급받을 때 입력한 주소입니다.
 *  - 원본과 동일하게 같은 브라우저에서 하루 1회만 전송을 허용합니다. (site.config.ts에서 변경 가능)
 */

import { useState, type FormEvent } from 'react';
import { siteConfig } from '@content/site.config';
import { useI18n } from '@/lib/i18n';
import { useToast } from '@/lib/toast';

const STORAGE_KEY = 'evertreasure_contact_sent';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function getTodayString() {
  const today = new Date();
  return (
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0')
  );
}

export default function ContactSection() {
  const { t, html } = useI18n();
  const { showToast } = useToast();
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // 오늘 이미 전송한 경우
    if (siteConfig.contact.limitOncePerDay && localStorage.getItem(STORAGE_KEY) === getTodayString()) {
      showToast(t('CONTACT_TOAST_ALREADY_SENT'), 'warning');
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const botcheck = String(formData.get('botcheck') ?? ''); // 스팸봇 함정 필드

    if (!name || !email || !message) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast(t('CONTACT_TOAST_INVALID_EMAIL'), 'error');
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey.startsWith('여기에')) {
      console.warn('[Contact] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY가 설정되지 않았습니다. .env.local을 확인하세요.');
      showToast(t('CONTACT_TOAST_ERROR'), 'error');
      return;
    }

    setSending(true);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Website Contact] ${name}`,
          name,
          email,
          message,
          botcheck,
        }),
      });
      const result = await response.json();
      if (result.success) {
        if (siteConfig.contact.limitOncePerDay) localStorage.setItem(STORAGE_KEY, getTodayString());
        showToast(t('CONTACT_TOAST_SUCCESS'), 'success');
        form.reset();
      } else {
        throw new Error(result.message || 'Web3Forms error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showToast(t('CONTACT_TOAST_ERROR'), 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="contact" className="section-contact flat-spacing">
      <div className="sect-tag text-caption fw-medium effectFade fadeUp no-div">
        <i className="icon icon-send"></i>
        <p>{t('MENU_CONTACT')}</p>
      </div>
      <div className="overflow-hidden">
        {/* data-i18n 속성은 styles.css의 행간 보정 규칙(h4[data-i18n=...])이 참조하므로 유지해야 합니다 */}
        <h4
          className="s-title letter-space--2 split-text effectFade fadeUp"
          data-i18n="CONTACT_DESCRIPTION"
          style={{ fontWeight: 700, color: 'var(--black-56)', lineHeight: '32px', marginBottom: 60 }}
          dangerouslySetInnerHTML={html('CONTACT_DESCRIPTION')}
        />
      </div>
      <form className="form-contact" id="contactform" onSubmit={onSubmit} noValidate>
        <div className="form-content effectFade fadeUp no-div">
          <fieldset className="field-ip">
            <input type="text" name="name" id="name" placeholder="Name *" required />
          </fieldset>
          <fieldset className="field-ip">
            <input type="email" name="email" id="email" placeholder="Email *" required />
          </fieldset>
          <fieldset className="field-ip">
            <input type="text" name="message" id="message" placeholder="Message *" required />
          </fieldset>
          {/* 스팸봇 함정 필드 (사람 눈에는 보이지 않음) */}
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
        </div>
        <div className="form-action effectFade fadeUp no-div">
          <div className="send-wrap" style={{ width: '100%' }}>
            <button type="submit" className="tf-btn animate-btn animate-dark" style={{ width: '100%' }} disabled={sending}>
              <span className="text-body-3" style={{ marginBottom: 2, fontSize: 18, fontWeight: 700 }}>
                {sending ? t('CONTACT_BTN_SENDING') : t('CONTACT_BTN_SEND')}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
