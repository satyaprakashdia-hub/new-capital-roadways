const NCRW_CONFIG = {
  companyName: "New Capital Roadways",
  tagline: "Packers & Movers",
  serviceLine: "26 Years in Service",
  address: "Plot No. 31, Near Shiv Mandir, National Highway 5, Pahala, Bhubaneswar, Odisha 751032, India",
  mobiles: [
    "9937372298",
    "8658109603",
    "9238305128",
    "9338759080",
    "9348928002"
  ],
  landlines: [
    "9777684892"
  ],
  primaryPhone: "9338759080",
  primaryWhatsApp: "919338759080",
  mapUrl: "https://maps.app.goo.gl/Yd5YJ37T7SHEsDhS8?g_st=ac",
  shortName: "NCRW"
};

(() => {
  const c = (typeof NCRW_CONFIG !== "undefined") ? NCRW_CONFIG : window.NCRW_CONFIG;
  if (!c) return;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  document.title = `${c.companyName} | ${c.tagline}`;
  $$("[data-address]").forEach(el => el.textContent = c.address);

  const waUrl = `https://wa.me/${c.primaryWhatsApp}`;
  $$("[data-whatsapp]").forEach(el => {
    el.href = `${waUrl}?text=${encodeURIComponent("Hello New Capital Roadways, I need a transport/vehicle requirement.")}`;
    el.target = "_blank";
    el.rel = "noopener";
  });

  $$("[data-phone]").forEach(el => {
    el.href = `tel:+91${c.primaryPhone}`;
  });

  const map = $("[data-map]");
  if (map && c.mapUrl) {
    map.href = c.mapUrl;
    map.target = "_blank";
    map.rel = "noopener";
  }

  const mobileBox = $("[data-phones]");
  if (mobileBox) {
    mobileBox.innerHTML = "";
    c.mobiles.forEach(number => {
      const a = document.createElement("a");
      a.href = `tel:+91${number}`;
      a.textContent = `+91 ${number}`;
      mobileBox.appendChild(a);
    });
  }

  const landlineBox = $("[data-landlines]");
  if (landlineBox) {
    landlineBox.innerHTML = "";
    c.landlines.forEach(number => {
      const clean = number.replace(/[^\d+]/g, "");
      const a = document.createElement("a");
      a.href = `tel:${clean}`;
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

  $$(".nav-links a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
})();
