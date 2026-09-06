(() => {
  const c = window.NCRW_CONFIG;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  document.title = `${c.companyName} | ${c.tagline}`;

  $$("[data-address]").forEach(el => el.textContent = c.address);

  // Keep action links as direct HTML links for maximum browser compatibility.
  // JavaScript only personalizes the WhatsApp message and contact lists.
  const waUrl = `https://wa.me/${c.primaryWhatsApp}`;
  $$("[data-whatsapp]").forEach(el => {
    el.href = `${waUrl}?text=${encodeURIComponent("Hello New Capital Roadways, I need a transport/vehicle requirement.")}`;
  });

  const firstMobile = c.mobiles[0];
  $$("[data-phone]").forEach(el => el.href = `tel:+91${firstMobile}`);

  const map = $("[data-map]");
  if (map && c.mapUrl) {
    map.href = c.mapUrl;
    map.target = "_blank";
    map.rel = "noopener";
    map.textContent = "Open Google Maps →";
  }

  const mobileBox = $("[data-phones]");
  if (mobileBox) {
    c.mobiles.forEach(number => {
      const a = document.createElement("a");
      a.href = `tel:+91${number}`;
      a.textContent = `+91 ${number}`;
      mobileBox.appendChild(a);
    });
  }

  const landlineBox = $("[data-landlines]");
  if (landlineBox) {
    c.landlines.forEach(number => {
      const a = document.createElement("a");
      a.href = `tel:${number.replace(/\s/g, "")}`;
      a.textContent = number;
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
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
})();
