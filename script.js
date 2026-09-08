(() => {
  const c = (typeof NCRW_CONFIG !== "undefined") ? NCRW_CONFIG : window.NCRW_CONFIG;
  if (!c) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  document.title = `${c.companyName} | ${c.tagline}`;

  $$('[data-address]').forEach(el => el.textContent = c.address);

  // Main/header WhatsApp actions use the company's primary WhatsApp number.
  const waUrl = `https://wa.me/${c.primaryWhatsApp}`;
  $$('[data-whatsapp]').forEach(el => {
    el.href = `${waUrl}?text=${encodeURIComponent('Hello New Capital Roadways, I need a transport/vehicle requirement.')}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Main/header Call action uses the company's primary phone number.
  $$('[data-phone]').forEach(el => {
    el.href = `tel:+91${c.primaryPhone}`;
  });

  // Google Maps.
  const map = $('[data-map]');
  if (map && c.mapUrl) {
    map.href = c.mapUrl;
    map.target = '_blank';
    map.rel = 'noopener';
  }

  // Show all mobile numbers as clickable phone links.
  const mobileBox = $('[data-phones]');
  if (mobileBox) {
    mobileBox.innerHTML = '';
    (c.mobiles || []).forEach(number => {
      const a = document.createElement('a');
      a.href = `tel:+91${number}`;
      a.textContent = `+91 ${number}`;
      a.setAttribute('aria-label', `Call ${number}`);
      mobileBox.appendChild(a);
    });
  }

  // Show all office/other phone numbers as clickable links.
  const landlineBox = $('[data-landlines]');
  if (landlineBox) {
    landlineBox.innerHTML = '';
    (c.landlines || []).forEach(number => {
      const clean = number.replace(/[^\d+]/g, '');
      const a = document.createElement('a');
      a.href = clean.startsWith('+') ? `tel:${clean}` : `tel:+91${clean}`;
      a.textContent = number;
      a.setAttribute('aria-label', `Call ${number}`);
      landlineBox.appendChild(a);
    });
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  const menuBtn = $('.menu-btn');
  const navLinks = $('.nav-links');
  menuBtn?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });

  $$('.nav-links a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
})();
