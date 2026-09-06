(() => {
  // config.js defines NCRW_CONFIG with const, so use it directly.
  const c = (typeof NCRW_CONFIG !== "undefined") ? NCRW_CONFIG : window.NCRW_CONFIG;
  if (!c) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  document.title = `${c.companyName} | ${c.tagline}`;

  $$("[data-address]").forEach(el => el.textContent = c.address);

  // Direct WhatsApp links.
  const waUrl = `https://wa.me/${c.primaryWhatsApp}`;
  $$("[data-whatsapp]").forEach(el => {
    el.href = `${waUrl}?text=${encodeURIComponent("Hello New Capital Roadways, I need a transport/vehicle requirement.")}`;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Call buttons use the first mobile number.
  const firstMobile = c.mobiles[0];
  $$("[data-phone]").forEach(el => {
    el.href = `tel:+91${firstMobile}`;
  });

  // Google Maps.
  const map = $("[data-map]");
  if (map && c.mapUrl) {
    map.href = c.mapUrl;
    map.target = "_blank";
    map.rel = "noopener";
  }

  // Show ALL mobile numbers as clickable tel: links.
  const mobileBox = $("[data-phones]");
  if (mobileBox) {
    mobileBox.innerHTML = "";
    c.mobiles.forEach(number => {
      const a = document.createElement("a");
      a.href = `tel:+91${number}`;
      a.textContent = `+91 ${number}`;
      a.setAttribute("aria-label", `Call ${number}`);
      mobileBox.appendChild(a);
    });
  }

  // Show ALL office phone numbers as clickable tel: links.
  const landlineBox = $("[data-landlines]");
  if (landlineBox) {
    landlineBox.innerHTML = "";
    c.landlines.forEach(number => {
      const clean = number.replace(/[^\d+]/g, "");
      const a = document.createElement("a");
      a.href = `tel:${clean}`;
      a.textContent = number;
      a.setAttribute("aria-label", `Call ${number}`);
      landlineBox.appendChild(a);
    });
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const menuBtn = $(".menu-btn");
  const navLinks = $(".nav-links");
  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  $$(".nav-links a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
})();
