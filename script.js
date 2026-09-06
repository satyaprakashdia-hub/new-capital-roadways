(() => {
  const c = window.NCRW_CONFIG;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  document.title = `${c.companyName} | ${c.tagline}`;

  $$("[data-address]").forEach(el => el.textContent = c.address);

  const waUrl = `https://wa.me/${c.primaryWhatsApp}`;
  $$("[data-whatsapp]").forEach(el => el.href = `${waUrl}?text=${encodeURIComponent("Hello New Capital Roadways, I need a transport/vehicle requirement.")}`);

  const firstMobile = c.mobiles[0];
  $$("[data-phone]").forEach(el => el.href = `tel:+91${firstMobile}`);

  const map = $("[data-map]");
  if (map) {
    map.href = c.mapUrl || "#";
    if (!c.mapUrl || c.mapUrl === "#") {
      map.textContent = "Google Maps link will be added →";
      map.removeAttribute("target");
    }
  }

  const mobileBox = $("[data-phones]");
  c.mobiles.forEach(number => {
    const a = document.createElement("a");
    a.href = `tel:+91${number}`;
    a.textContent = `+91 ${number}`;
    mobileBox.appendChild(a);
  });

  const landlineBox = $("[data-landlines]");
  c.landlines.forEach(number => {
    const a = document.createElement("a");
    a.href = `tel:${number.replace(/\s/g, "")}`;
    a.textContent = number;
    landlineBox.appendChild(a);
  });

  $("#year").textContent = new Date().getFullYear();

  const menuBtn = $(".menu-btn");
  const navLinks = $(".nav-links");
  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
})();
