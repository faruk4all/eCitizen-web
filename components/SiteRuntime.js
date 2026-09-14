'use client';

import { useEffect } from 'react';

export default function SiteRuntime() {
  useEffect(() => {
    const menuHandlers = [];
    document.querySelectorAll('.menu').forEach((button) => {
      const handler = () => {
        const nav = button.closest('.nav');
        if (!nav) return;
        const open = nav.classList.toggle('open');
        button.setAttribute('aria-expanded', String(open));
      };
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', handler);
      menuHandlers.push([button, handler]);
    });

    const formHandlers = [];
    document.querySelectorAll('form').forEach((form) => {
      const handler = async (event) => {
        event.preventDefault();
        const success = form.querySelector('.success');
        const submit = form.querySelector('[type="submit"]');
        const data = Object.fromEntries(new FormData(form).entries());

        if (data.website) return; // honeypot

        if (submit) {
          submit.disabled = true;
          submit.dataset.originalText = submit.textContent;
          submit.textContent = 'পাঠানো হচ্ছে…';
        }

        try {
          const response = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, source: window.location.pathname }),
          });

          if (!response.ok) throw new Error('lead submission failed');

          if (success) {
            success.hidden = false;
            success.textContent =
              'ধন্যবাদ। আপনার request সফলভাবে গ্রহণ করা হয়েছে। আমরা দ্রুত যোগাযোগ করব।';
          }
          form.reset();
        } catch {
          if (success) {
            success.hidden = false;
            success.textContent =
              'অনুরোধটি এখনই পাঠানো যায়নি। সরাসরি WhatsApp-এ যোগাযোগ করুন: 01313886828';
          }
        } finally {
          if (submit) {
            submit.disabled = false;
            submit.textContent = submit.dataset.originalText || 'Submit';
          }
        }
      };

      form.addEventListener('submit', handler);
      formHandlers.push([form, handler]);
    });

    const cookie = document.getElementById('cookie');
    if (cookie && window.localStorage.getItem('ec_cookie') === '1') cookie.remove();

    if (cookie) {
      const accept = cookie.querySelector('button');
      if (accept) {
        const handler = () => {
          window.localStorage.setItem('ec_cookie', '1');
          cookie.remove();
        };
        accept.addEventListener('click', handler);
        formHandlers.push([accept, handler]);
      }
    }

    return () => {
      menuHandlers.forEach(([el, fn]) => el.removeEventListener('click', fn));
      formHandlers.forEach(([el, fn]) => {
        el.removeEventListener('submit', fn);
        el.removeEventListener('click', fn);
      });
    };
  }, []);

  return null;
}
