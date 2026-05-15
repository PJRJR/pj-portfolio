/* ============================================
   PJ PORTFOLIO — main.js
   ============================================ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, CustomEase);

const PJ_FACE = {
  p: { rotation: 270, scaleX: 1.6, scaleY: 1.85, x: 30, y: 20 },
  j: { scaleX: 1, scaleY: 1, x: 0, y: 0 },
  dot1: { y: -50, x: 2 },
  dot2: { y: -50, x: -12 },
  smile: { rotation: -90, x: 92, y: 54, opacity: 1 },
};

// Sidebar runs at 2rem vs intro's 6rem — scale factor for px values
const SIDEBAR_RATIO = 2 / 6;

const PJ_FACE_SIDEBAR = {
  p: {
    rotation: 270,
    scaleX: 1.5,
    scaleY: 1.75,
    x: 17,
    y: 10,
  },
  j: {
    scaleX: 1,
    scaleY: 1.15,
    x: PJ_FACE.j.x * SIDEBAR_RATIO,
    y: PJ_FACE.j.y * SIDEBAR_RATIO,
  },
  dot1: {
    y: -23,
    x: 1,
  },
  dot2: {
    y: -23,
    x: -4,
  },
  smile: {
    rotation: -90,
    x: PJ_FACE.smile.x * SIDEBAR_RATIO,
    y: PJ_FACE.smile.y * SIDEBAR_RATIO,
    opacity: 1,
  },
};

/* ============================================
   MOBILE NAV
   ============================================ */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */
function setActiveNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href") || "";
    const hrefPage = href.split("/").pop() || "index.html";

    if (hrefPage === "index.html" || href === "/") {
      if (page === "" || page === "index.html") {
        link.classList.add("active");
      }
    } else if (hrefPage && page === hrefPage) {
      link.classList.add("active");
    }
  });
}

/* ============================================
   HERO NAME — scatter animation
   ============================================ */
function initHeroLetters() {
  const nameEl = document.querySelector(".hero-name");
  if (!nameEl) return;

  const text = nameEl.textContent.trim();
  nameEl.innerHTML = "";
  nameEl.setAttribute("aria-label", text);

  text.split(" ").forEach((word, wordIdx) => {
    if (wordIdx > 0) {
      const sp = document.createElement("span");
      sp.className = "ltr-space";
      sp.setAttribute("aria-hidden", "true");
      nameEl.appendChild(sp);
    }
    const wordEl = document.createElement("span");
    wordEl.className = "ltr-word";
    wordEl.setAttribute("aria-hidden", "true");

    word.split("").forEach((char) => {
      const s = document.createElement("span");
      s.className = "ltr-char";
      s.textContent = char;
      s.setAttribute("aria-hidden", "true");
      wordEl.appendChild(s);
    });
    nameEl.appendChild(wordEl);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const letters = nameEl.querySelectorAll(".ltr-char");
  const rotations = Array.from(letters).map((_, i) =>
    i % 2 === 0 ? -(8 + Math.random() * 14) : 8 + Math.random() * 14,
  );
  const yOffsets = Array.from(letters).map(() => -(30 + Math.random() * 40));

  gsap.fromTo(
    letters,
    (i) => ({ opacity: 0, y: yOffsets[i], rotation: rotations[i] }),
    {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 0.9,
      ease: "back.out(1.4)",
      stagger: { amount: 0.55, from: "start" },
      delay: 0.3,
    },
  );
}

/* ============================================
   KLAMATH WAVE — perpetual GSAP path animation
   ============================================ */
function initKlamathWave() {
  const path = document.querySelector(".hero-klamath path");
  if (!path) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const wave1 =
    "M0 7 Q50 1,100 7 Q150 13,200 7 Q250 1,300 7 Q350 13,400 7 Q450 1,500 7 Q550 13,600 7";
  const wave2 =
    "M0 7 Q50 13,100 7 Q150 1,200 7 Q250 13,300 7 Q350 1,400 7 Q450 13,500 7 Q550 1,600 7";

  gsap.to(path, {
    attr: { d: wave2 },
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

/* ============================================
   HERO ENTRANCE — staggered fade-up
   ============================================ */
function initHeroEntrance() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const els = [
    document.querySelector(".hero-topbar"),
    document.querySelector(".hero-klamath"),
    document.querySelector(".hero-disciplines"),
    document.querySelector(".hero-info-block"),
    document.querySelector(".hero-cta"),
  ].filter(Boolean);
  if (!els.length) return;

  gsap.fromTo(
    els,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      delay: 1.1,
    },
  );
}

/* ============================================
   HERO LAVA LAMP — SVG metaball goo + text inversion
   ============================================ */
function initHeroCursorGlow() {
  const isHome =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/index" ||
    window.location.pathname.endsWith("/index.html") ||
    window.location.pathname.endsWith("/index");
  if (!isHome) return;

  const hero = document.querySelector(".hero");
  if (!hero) return;
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.matchMedia("(max-width: 768px)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  hero.style.background = "var(--page-bg)";

  const W = () => hero.offsetWidth;
  const H = () => hero.offsetHeight;
  const NS = "http://www.w3.org/2000/svg";

  const circles = [];
  const gooSvg = document.createElementNS(NS, "svg");
  gooSvg.setAttribute("aria-hidden", "true");
  Object.assign(gooSvg.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "0",
    overflow: "hidden",
    clipPath: "inset(0)",
    webkitClipPath: "inset(0)",
    willChange: "transform",
  });

  gooSvg.innerHTML = `
    <defs>
      <filter id="lf" color-interpolation-filters="sRGB"
              x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feColorMatrix in="blur" mode="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 28 -10"/>
      </filter>
      <radialGradient id="lg" cx="50%" cy="50%" r="50%">
        <stop offset="0%"   stop-color="#0a0c0b" stop-opacity="0.92"/>
        <stop offset="50%"  stop-color="#080a09" stop-opacity="0.78"/>
        <stop offset="80%"  stop-color="#050706" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="#030404" stop-opacity="0.0"/>
      </radialGradient>
    </defs>
    <g filter="url(#lf)">
      <circle id="lb0" fill="url(#lg)" r="210"/>
      <circle id="lb1" fill="url(#lg)" r="172"/>
      <circle id="lb2" fill="url(#lg)" r="148"/>
    </g>
  `;
  hero.insertBefore(gooSvg, hero.firstChild);
  [0, 1, 2].forEach((i) => circles.push(gooSvg.querySelector("#lb" + i)));

  // ── Stars ──
  const STAR_COUNT = 380;
  const starSvg = document.createElementNS(NS, "svg");
  starSvg.setAttribute("aria-hidden", "true");
  Object.assign(starSvg.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "1",
    overflow: "hidden",
  });

  function buildStars() {
    starSvg.innerHTML = "";
    const w = W(),
      h = H();
    for (let i = 0; i < STAR_COUNT; i++) {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", (Math.random() * w).toFixed(0));
      c.setAttribute("cy", (Math.random() * h).toFixed(0));
      c.setAttribute("r", (Math.random() * 0.7 + 0.3).toFixed(1));
      const a = (Math.random() * 0.55 + 0.25).toFixed(2);
      c.setAttribute("fill", "rgba(200,212,194," + a + ")");
      starSvg.appendChild(c);
    }
  }
  buildStars();
  hero.insertBefore(starSvg, gooSvg.nextSibling);
  window.addEventListener("resize", buildStars, { passive: true });

  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const n = hero.querySelector(".hero-noise");
      if (n) n.style.zIndex = "2";
    }),
  );

  // ── Text inversion ──
  const textElsDark = new Map();
  const heroBtns = [...hero.querySelectorAll(".hero-cta .btn")];

  function registerEl(el, darkColor) {
    textElsDark.set(el, darkColor);
  }

  // Seed: name letters + topbar elements
  hero.querySelectorAll(".ltr-char").forEach((el) => registerEl(el, ""));
  hero
    .querySelectorAll(
      ".hero-topbar-time, .hero-topbar-status, .hero-topbar-left, .hero-topbar-right, .hero-topbar-arrow",
    )
    .forEach((el) => registerEl(el, ""));

  function splitTextEls() {
    hero
      .querySelectorAll(
        ".hero-info-val, .hero-info-label, .hero-info-sep, .hero-disciplines, .hero-tagline-sub",
      )
      .forEach((el) => {
        if (el.dataset.split) return;
        el.dataset.split = "1";
        const chars = el.textContent.split("");
        el.innerHTML = "";
        chars.forEach((ch) => {
          const s = document.createElement("span");
          s.textContent = ch;
          s.style.display = "inline";
          el.appendChild(s);
          const darkColor = el.classList.contains("hero-info-val")
            ? "var(--forest)"
            : "var(--text-light)";
          registerEl(s, darkColor);
          gsap.set(s, { color: "#f0f8f2" });
          onDarkSet.add(s);
        });
      });
  }

  function splitAndColor() {
    splitTextEls();
  }

  // Re-split after language changes
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        hero.querySelectorAll("[data-split]").forEach((el) => {
          delete el.dataset.split;
          el.querySelectorAll("span").forEach((s) => textElsDark.delete(s));
        });
        splitTextEls();
      }, 300);
    });
  });

  const onDarkSet = new Set();
  let frameCount = 0;

  function updateTextColors(blobPositions) {
    if (frameCount++ % 3 !== 0) return;
    const heroRect = hero.getBoundingClientRect();

    // Text — GSAP color tween
    textElsDark.forEach((darkColor, el) => {
      const rect = el.getBoundingClientRect();
      const elCx = rect.left - heroRect.left + rect.width * 0.5;
      const elCy = rect.top - heroRect.top + rect.height * 0.5;
      const shouldBeLight = blobPositions.some(
        ([bx, by, br]) => Math.sqrt((elCx - bx) ** 2 + (elCy - by) ** 2) < br,
      );
      const isLight = onDarkSet.has(el);
      if (shouldBeLight && !isLight) {
        onDarkSet.add(el);
        gsap.to(el, { color: "#f0f8f2", duration: 0.06, overwrite: "auto" });
      } else if (!shouldBeLight && isLight) {
        onDarkSet.delete(el);
        const revert = darkColor || "var(--text)";
        gsap.to(el, { color: revert, duration: 0.1, overwrite: "auto" });
      }
    });

    // Buttons — class toggle with extra radius padding for sensitivity
    const BTN_PAD = 40;
    heroBtns.forEach((btn) => {
      const rect = btn.getBoundingClientRect();
      const bx = rect.left - heroRect.left + rect.width * 0.5;
      const by = rect.top - heroRect.top + rect.height * 0.5;
      const over = blobPositions.some(
        ([cx, cy, br]) =>
          Math.sqrt((bx - cx) ** 2 + (by - cy) ** 2) < br + BTN_PAD,
      );
      btn.classList.toggle("goo-over", over);
    });

    // Klamath + topbar rule — partial gradient inversion
    updateLineGradients(blobPositions, heroRect);
  }

  // ── Gradient line inversion ──
  const gradientLines = [
    {
      svgEl: hero.querySelector(".hero-klamath"),
      gradId: "klamath-grad",
      baseColor: "#4a90d9",
    },
    {
      svgEl: hero.querySelector(".hero-topbar-rule"),
      gradId: "topbar-grad",
      baseColor: "#1e3025",
    },
  ].filter((l) => l.svgEl);

  function updateLineGradients(blobPositions, heroRect) {
    gradientLines.forEach(({ svgEl, gradId, baseColor }) => {
      const grad = svgEl.querySelector("#" + gradId);
      if (!grad) return;

      const svgRect = svgEl.getBoundingClientRect();
      const svgW = svgRect.width;
      if (!svgW) return;

      const lineY = svgRect.top + svgRect.height * 0.5;
      const intervals = [];

      blobPositions.forEach(([bx, by, br]) => {
        const bxPage = bx + heroRect.left;
        const dy = Math.abs(lineY - (by + heroRect.top));
        if (dy >= br) return;
        const hw = Math.sqrt(br * br - dy * dy);
        const t0 = Math.max(0, (bxPage - hw - svgRect.left) / svgW);
        const t1 = Math.min(1, (bxPage + hw - svgRect.left) / svgW);
        if (t1 > t0) intervals.push([t0, t1]);
      });

      intervals.sort((a, b) => a[0] - b[0]);
      const merged = [];
      for (const iv of intervals) {
        if (merged.length && iv[0] <= merged[merged.length - 1][1]) {
          merged[merged.length - 1][1] = Math.max(
            merged[merged.length - 1][1],
            iv[1],
          );
        } else {
          merged.push([...iv]);
        }
      }

      const stops = [];
      const push = (offset, color) =>
        stops.push({ offset: (offset * 100).toFixed(2) + "%", color });

      let cursor = 0;
      for (const [t0, t1] of merged) {
        if (t0 > cursor) {
          push(cursor, baseColor);
          push(t0, baseColor);
        }
        push(t0, "#f0f8f2");
        push(t1, "#f0f8f2");
        cursor = t1;
      }
      if (cursor < 1) {
        push(cursor, baseColor);
        push(1, baseColor);
      }
      if (!stops.length) {
        push(0, baseColor);
        push(1, baseColor);
      }

      while (grad.firstChild) grad.removeChild(grad.firstChild);
      stops.forEach(({ offset, color }) => {
        const s = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop",
        );
        s.setAttribute("offset", offset);
        s.setAttribute("stop-color", color);
        grad.appendChild(s);
      });
    });
  }

  // ── Physics ──
  const SAT = [
    { angle: 0.9, dist: 100 },
    { angle: 2.3, dist: 112 },
  ];
  const SAT_LERP = [0.022, 0.015];
  const LERP = 0.006;
  const PAD = 0.06;

  function setC(i, x, y) {
    circles[i].setAttribute("cx", x.toFixed(1));
    circles[i].setAttribute("cy", y.toFixed(1));
  }

  function initPositions() {
    const cx = W() * 0.62,
      cy = H() * 0.45;
    setC(0, cx, cy);
    setC(1, cx + Math.cos(0.9) * 100, cy + Math.sin(0.9) * 100);
    setC(2, cx + Math.cos(2.3) * 112, cy + Math.sin(2.3) * 112);
  }
  initPositions();
  window.addEventListener("resize", initPositions, { passive: true });

  const satX = SAT.map((s) => W() * 0.62 + Math.cos(s.angle) * s.dist);
  const satY = SAT.map((s) => H() * 0.45 + Math.sin(s.angle) * s.dist);
  let targetX = W() * 0.62,
    targetY = H() * 0.45;
  let leadX = targetX,
    leadY = targetY;
  let rafId = null;

  function clamp(v, a, b) {
    return v < a ? a : v > b ? b : v;
  }

  const BLOB_R = [172, 141, 121];

  function tick() {
    rafId = requestAnimationFrame(tick);
    const hw = W(),
      hh = H();
    const minX = hw * PAD,
      maxX = hw * (1 - PAD);
    const minY = hh * PAD,
      maxY = hh * (1 - PAD);

    leadX += (targetX - leadX) * LERP;
    leadY += (targetY - leadY) * LERP;
    const lx = clamp(leadX, minX, maxX);
    const ly = clamp(leadY, minY, maxY);
    setC(0, lx, ly);

    SAT.forEach((s, i) => {
      s.angle += 0.0012;
      const tx = clamp(lx + Math.cos(s.angle) * s.dist, minX, maxX);
      const ty = clamp(ly + Math.sin(s.angle) * s.dist, minY, maxY);
      satX[i] += (tx - satX[i]) * SAT_LERP[i];
      satY[i] += (ty - satY[i]) * SAT_LERP[i];
      setC(i + 1, satX[i], satY[i]);
    });

    updateTextColors([
      [lx, ly, BLOB_R[0]],
      [satX[0], satY[0], BLOB_R[1]],
      [satX[1], satY[1], BLOB_R[2]],
    ]);
  }

  new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        if (!rafId) rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
    { threshold: 0.01 },
  ).observe(hero);

  rafId = requestAnimationFrame(tick);

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    targetX = e.clientX - r.left;
    targetY = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", () => {
    targetX = W() * 0.62;
    targetY = H() * 0.45;
  });

  return { splitAndColor };
}

/* ============================================
   HERO TIME
   ============================================ */
function initHeroTime() {
  const el = document.getElementById("hero-time");
  if (!el) return;

  function update() {
    el.textContent = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
  update();
  setInterval(update, 1000);
}

/* ============================================
   SCROLL REVEALS
   ============================================ */
function initScrollReveals() {
  const noMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!noMotion) {
    gsap.set(".reveal", { opacity: 0, y: 26 });
  }

  document.querySelectorAll(".reveal-mask").forEach((mask) => {
    if (noMotion) {
      gsap.set(mask, { scaleX: 0 });
      return;
    }

    const fromRight = mask.classList.contains("reveal-mask--from-right");
    const fromTop = mask.classList.contains("reveal-mask--from-top");
    const fromBottom = mask.classList.contains("reveal-mask--from-bottom");
    const isY = fromTop || fromBottom;
    const prop = isY ? "scaleY" : "scaleX";
    const origin = fromRight
      ? "right center"
      : fromTop
        ? "top center"
        : fromBottom
          ? "bottom center"
          : "left center";
    const wrap = mask.closest(".reveal-wrap");

    gsap.set(mask, { transformOrigin: origin, [prop]: 1 });
    gsap.to(mask, {
      [prop]: 0,
      duration: 1.1,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: wrap || mask,
        start: "top 84%",
        toggleActions: "play none none none",
      },
    });
  });

  if (noMotion) return;

  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 87%",
        toggleActions: "play none none none",
      },
    });
  });

  document
    .querySelectorAll(".projects-grid, .illustration-grid")
    .forEach((grid) => {
      const cards = grid.querySelectorAll(".project-card");
      if (!cards.length) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "top 85%" },
        },
      );
    });
}

/* ============================================
   CURSOR LABEL
   ============================================ */
function initCursorLabels() {
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.matchMedia("(max-width: 768px)").matches) return;
  const label = document.getElementById("cursor-label");
  if (!label) return;

  document.querySelectorAll(".project-card-image-link").forEach((link) => {
    link.addEventListener("mouseenter", () =>
      gsap.to(label, { opacity: 1, duration: 0.2 }),
    );
    link.addEventListener("mouseleave", () =>
      gsap.to(label, { opacity: 0, duration: 0.2 }),
    );
    link.addEventListener("mousemove", (e) => {
      label.style.left = e.clientX + 16 + "px";
      label.style.top = e.clientY + 16 + "px";
    });
  });
}

/* ============================================
   SEE MORE TOGGLE
   ============================================ */
function initSeeMore() {
  document.querySelectorAll(".see-more-btn").forEach((btn) => {
    const id = btn.getAttribute("data-target");
    const content = id ? document.getElementById(id) : null;
    if (!content) return;

    gsap.set(content, { height: 0, overflow: "hidden" });

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      if (!open) {
        gsap.to(content, {
          height: "auto",
          duration: 0.55,
          ease: "power2.out",
          onComplete: () => {
            content.style.overflow = "visible";
          },
        });
      } else {
        content.style.overflow = "hidden";
        gsap.to(content, { height: 0, duration: 0.4, ease: "power2.in" });
      }
    });
  });
}

/* ============================================
   I18N
   ============================================ */
const TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.work": "Work",
    "nav.illustration": "Illustration",
    "nav.about": "About",
    "nav.craft": "Craft",
    "nav.soon": "soon",
    "nav.contact": "Contact",
    "hero.tagline": "Interaction Design \u00B7 Motion \u00B7 Illustration",
    "hero.tagline.sub":
      "Third-generation San Franciscan with Yurok roots, an illustration background, and a practice in interaction design and motion.",
    "hero.bio":
      "Experience designer from the Bay Area \u2014 motion, interaction, and culture.",
    "hero.cta.work": "View My Work \u2192",
    "hero.cta.about": "About Me",
    "hero.location": "San Francisco, CA",
    "home.work.label": "Selected Work",
    "home.work.heading": "Selected Projects",
    "home.seeall": "All Projects \u2192",
    "home.intro.p1": "PJ Rodriguez is an interaction designer, motion designer, and illustrator based in San Francisco.",
    "home.intro.p2": "He is an <a href=\"https://ideo.com\" target=\"_blank\" rel=\"noopener\">IDEO Color by Design Fellow\u00A0\u2197<\/a> and a <a href=\"https://dschool.stanford.edu/programs/university-innovation-fellows\" target=\"_blank\" rel=\"noopener\">Stanford d.school University Innovation Fellow\u00A0\u2197<\/a>, with a B.S. in Interaction Design from Santa Monica College\u00A0\u2014 <a href=\"https://linkedin.com/in/pjrdesign\" target=\"_blank\" rel=\"noopener\">LinkedIn\u00A0\u2197<\/a>",
    "footer.tagline": "Illustration \u00B7 Design \u00B7 Motion",
    "footer.copy": "\u00A9 2026 Patrick Rodriguez",
    "footer.resume": "Resume",
    "footer.colophon": "Built with Vite · Made with <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">blood</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">caffeine</span></span> , <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">sweat</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">caffeine</span></span> &amp; <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">tears</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">vibes</span></span>",
    "about.hobbies.label": "When I'm not designing",
    "about.hobbies.dancing": "Dancing",
    "about.hobbies.cubing": "Speedcubing",
    "about.hobbies.reading": "Reading",
    "about.hobbies.listening": "Listening",
    "about.hobbies.nextbook": "Next book",
    "about.hobbies.podcast": "Switch podcast",
    "about.pill.sf": "Based in SF",
    "about.pill.langs": "EN / PT / ES",
    "about.pill.ideo": "IDEO Fellow",
    "about.pill.dschool": "d.school Fellow",
    "projects.label": "Selected Work",
    "projects.heading": "All Projects",
    "proj.gg.title": "Grand Games",
    "proj.gg.desc":
      "Multilingual public signage designed, printed, and installed at Grand Park LA",
    "proj.gg.tags":
      "Graphic Design \u00B7 Multilingual \u00B7 Print \u00B7 2022",
    "proj.spex.title": "SPEX",
    "proj.spex.desc":
      "Mixed-reality wearable learning tool for hands-on skills education",
    "proj.spex.tags": "Interaction Design \u00B7 AR \u00B7 Wearable",
    "proj.ideo.title": "AI Diagnosis Tool",
    "proj.ideo.desc":
      "Conversational AI appliance repair experience \u2014 persona, UI, and prototypes",
    "proj.ideo.tags": "Interaction Design \u00B7 AI \u00B7 IDEO \u00B7 2023",
    "proj.cop28.title": "COP28 AR Experience",
    "proj.cop28.desc":
      "Immersive AR installation promoting climate action at the UN climate conference",
    "proj.cop28.tags": "AR \u00B7 Visual Design \u00B7 IDEO \u00B7 2023",
    "proj.genai.title": "Gen-AI Workshop Curriculum",
    "proj.genai.desc":
      "Bilingual EN/ES curriculum helping educators explore generative AI tools",
    "proj.genai.tags": "Education \u00B7 Bilingual \u00B7 IDEO \u00B7 2023",
    "proj.safehere.title": "SafeHere",
    "proj.safehere.desc":
      "A mobile app connecting Main Street businesses to safety ambassadors through discreet, real-time incident reporting.",
    "proj.safehere.tags": "UX Research \u00B7 Interaction Design \u00B7 2020",
    "proj.talklot.title": "TalkLot",
    "proj.talklot.desc":
      "A speech-first language learning app designed to reinforce spoken fluency through extensive oral production.",
    "proj.talklot.tags":
      "Interaction Design \u00B7 UX Research \u00B7 Solo \u00B7 2022",
    "proj.musicbox.title": "Music Box",
    "proj.musicbox.desc":
      "A cardboard ambient sound device controlled by a physical enclosure, built with Arduino, Processing, and the Minim audio library.",
    "proj.musicbox.tags":
      "Interaction Design \u00B7 Physical Computing \u00B7 Motion \u00B7 Solo",
    "proj.viagem.title": "ViaGem",
    "proj.viagem.desc":
      "A bilingual language-learning app connecting English and Portuguese speakers through travel, tutors, and consolidated tools.",
    "proj.viagem.tags":
      "UX Research \u00B7 Interaction Design \u00B7 Visual Design \u00B7 2020",
    "illus.label": "Illustration",
    "about.label": "About",
    "about.page.heading": "Designer, Illustrator, Creative Technologist",
    "about.heading":
      "Illustrator and designer<br /><em>from the Bay Area.</em>",
    "about.body":
      "Designer and illustrator from the Bay Area — with a background in motion, interaction design, and cultural storytelling. IDEO Fellow. B.S. Interaction Design, Santa Monica College.",
    "about.bio.p1":
      "Born and raised in San Francisco, third generation. I came to design through illustration, moved into graphic design, then interaction design, and found at IDEO that motion design brought it all together into a single coherent practice.",
    "about.bio.p2":
      "I've been in the freestyle dance scene since 2008, which has shaped how I think about timing, rhythm, and what makes movement feel right.",
    "about.bio.p3":
      "My family has Yurok roots, from the Klamath River in Northern California, and contributing to the tribe's language and culture revitalization through interactive media is work I intend to do.",
    "about.bio":
      "Graphic designer and illustrator with a love for motion and interactive work — using tools like After Effects, Rive, and GSAP to make visuals that people actually engage with. Based in the Bay Area, working across print, digital, and whatever's in between since 2014.",
    "about.bio2":
      "IDEO Color by Design Fellow. Stanford d.school University Innovation Fellow. B.S. Interaction Design, Santa Monica College (3.93 GPA). English native, Portuguese\u2011BR advanced, Spanish\u2011LATAM advanced-intermediate.",
    "about.meta.based.label": "Based in",
    "about.meta.based.val": "San Francisco Bay Area",
    "about.meta.edu.label": "Education",
    "about.meta.edu.degree1": "B.S. Interaction Design",
    "about.meta.edu.school1": "Santa Monica College",
    "about.meta.edu.degree2": "A.A. Graphic Design",
    "about.meta.edu.school2": "College of San Mateo",
    "about.meta.awards.label": "Languages",
    "about.meta.awards.val": "English<br />Portuguese<br />Spanish",
    "about.skills.label": "Skills & Tools",
    "about.skills.heading": "What I bring",
    "about.skills.design": "Design",
    "about.skills.tools": "Tools",
    "about.skills.build": "Build",
    "about.exp.label": "Experience",
    "about.exp.heading": "Selected work & roles",
    "about.exp.ideo.title": "IDEO Color by Design Fellowship",
    "about.exp.ideo.desc":
      "Designed a conversational AI appliance repair tool, an AR experience for COP28, and bilingual Gen-AI workshop curriculum for educators. Recognized for creative leadership and multilingual design thinking.",
    "about.exp.gg.title": "Grand Games \u2014 Grand Park, Los Angeles",
    "about.exp.gg.desc":
      "Led graphic design for a multilingual public signage system installed across Grand Park for the 2022 World Cup viewing events. Designed, printed, and physically installed. Campaign reached thousands of visitors.",
    "about.exp.indie.date": "2014 \u2013 Present",
    "about.exp.indie.title": "Independent Design & Illustration",
    "about.exp.indie.desc":
      "Illustration practice since 2014. Client and personal work spanning editorial illustration, motion graphics, brand identity, and interactive experiences.",
    "about.btn.resume": "Download Resume \u2192",
    "about.btn.work": "View Work \u2192",
    "work.eyebrow": "Selected Work",
    "work.heading": "Case studies upon request.",
    "work.body":
      "Selected case studies are available upon request. Leave your name and email and I'll send them your way.",
    "work.placeholder.name": "Your name",
    "work.placeholder.email": "Your email",
    "work.submit": "Request access \u2192",
    "work.success": "Got it \u2014 I'll be in touch shortly.",
    "work.or": "Or reach me directly at",
  },
  pt: {
    "nav.home": "In\u00EDcio",
    "nav.work": "Projetos",
    "nav.illustration": "Ilustra\u00E7\u00E3o",
    "nav.about": "Sobre",
    "nav.craft": "Arte",
    "nav.soon": "em breve",
    "nav.contact": "Contato",
    "hero.tagline":
      "Design de Intera\u00E7\u00E3o \u00B7 Motion \u00B7 Ilustra\u00E7\u00E3o",
    "hero.tagline.sub":
      "Nativo de terceira gera\u00E7\u00E3o com ra\u00EDzes Yurok, forma\u00E7\u00E3o em ilustra\u00E7\u00E3o e uma pr\u00E1tica em design de intera\u00E7\u00E3o e motion.",
    "hero.bio":
      "Designer de experi\u00EAncias do Bay Area \u2014 movimento, intera\u00E7\u00E3o e cultura.",
    "hero.cta.work": "Ver meu trabalho \u2192",
    "hero.cta.about": "Sobre mim",
    "hero.location": "São Francisco, CA",
    "home.work.label": "Trabalhos Selecionados",
    "home.work.heading": "Projetos em Destaque",
    "home.seeall": "Todos os projetos \u2192",
    "home.intro.p1": "PJ Rodriguez \u00E9 designer de intera\u00E7\u00E3o, designer de motion e ilustrador baseado em S\u00E3o Francisco.",
    "home.intro.p2": "\u00C9 fellow do <a href=\"https://ideo.com\" target=\"_blank\" rel=\"noopener\">IDEO Color by Design \u2197<\/a> e <a href=\"https://dschool.stanford.edu/programs/university-innovation-fellows\" target=\"_blank\" rel=\"noopener\">Stanford d.school University Innovation Fellow \u2197<\/a>, com bacharelado em Interaction Design pela Santa Monica College \u2014 <a href=\"https://linkedin.com/in/pjrdesign\" target=\"_blank\" rel=\"noopener\">LinkedIn \u2197<\/a>",
    "footer.tagline": "Ilustra\u00E7\u00E3o \u00B7 Design \u00B7 Motion",
    "footer.copy": "\u00A9 2026 Patrick Rodriguez",
    "footer.resume": "Curr\u00EDculo",
    "footer.colophon": "Built with Vite · Feito com <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">sangue</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">café</span></span> , <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">suor</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">café</span></span> &amp; <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">lágrimas</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">vibes</span></span>",
    "about.hobbies.label": "Quando n\u00E3o estou desenhando",
    "about.hobbies.dancing": "Dan\u00E7a",
    "about.hobbies.cubing": "Speedcubing",
    "about.hobbies.reading": "Leitura",
    "about.hobbies.listening": "Escutando",
    "about.hobbies.nextbook": "Pr\u00F3ximo livro",
    "about.hobbies.podcast": "Outro podcast",
    "about.pill.sf": "Baseado em SF",
    "about.pill.langs": "EN / PT / ES",
    "about.pill.ideo": "IDEO Fellow",
    "about.pill.dschool": "d.school Fellow",
    "projects.label": "Trabalhos Selecionados",
    "projects.heading": "Todos os Projetos",
    "proj.gg.title": "Grand Games",
    "proj.gg.desc":
      "Sinalizac\u0327a\u0303o p\u00FAblica multil\u00EDngue projetada, impressa e instalada no Grand Park LA",
    "proj.gg.tags":
      "Design Gr\u00E1fico \u00B7 Multil\u00EDngue \u00B7 Impress\u00E3o \u00B7 2022",
    "proj.spex.title": "SPEX",
    "proj.spex.desc":
      "Ferramenta de aprendizado wearable em realidade mista para educa\u00E7\u00E3o pr\u00E1tica",
    "proj.spex.tags": "Design de Intera\u00E7\u00E3o \u00B7 AR \u00B7 Wearable",
    "proj.ideo.title": "Ferramenta de Diagn\u00F3stico com IA",
    "proj.ideo.desc":
      "Experi\u00EAncia conversacional de reparo de eletrodom\u00E9sticos com IA \u2014 persona, UI e prot\u00F3tipos",
    "proj.ideo.tags":
      "Design de Intera\u00E7\u00E3o \u00B7 IA \u00B7 IDEO \u00B7 2023",
    "proj.cop28.title": "Experi\u00EAncia AR COP28",
    "proj.cop28.desc":
      "Instala\u00E7\u00E3o AR imersiva promovendo a\u00E7\u00E3o clim\u00E1tica na confer\u00EAncia da ONU",
    "proj.cop28.tags": "AR \u00B7 Design Visual \u00B7 IDEO \u00B7 2023",
    "proj.genai.title": "Curr\u00EDculo de Workshop Gen-IA",
    "proj.genai.desc":
      "Curr\u00EDculo biling\u00FCe EN/ES para educadores explorarem ferramentas de IA generativa",
    "proj.genai.tags":
      "Educa\u00E7\u00E3o \u00B7 Biling\u00FCe \u00B7 IDEO \u00B7 2023",
    "proj.safehere.title": "SafeHere",
    "proj.safehere.desc":
      "Um app m\u00F3vel conectando empresas da Main Street a embaixadores de seguran\u00E7a por meio de relat\u00F3rios discretos em tempo real.",
    "proj.safehere.tags":
      "Pesquisa UX \u00B7 Design de Intera\u00E7\u00E3o \u00B7 2020",
    "proj.talklot.title": "TalkLot",
    "proj.talklot.desc":
      "Um app de aprendizado de idiomas com foco na fala, projetado para refor\u00E7ar a flu\u00EAncia oral por meio de produ\u00E7\u00E3o oral extensiva.",
    "proj.talklot.tags":
      "Design de Intera\u00E7\u00E3o \u00B7 Pesquisa UX \u00B7 Solo \u00B7 2022",
    "proj.musicbox.title": "Console de Som Ambiente",
    "proj.musicbox.desc":
      "Um dispositivo de som ambiente em papel\u00E3o controlado por uma caixa f\u00EDsica, constru\u00EDdo com Arduino, Processing e a biblioteca de \u00E1udio Minim.",
    "proj.musicbox.tags":
      "Design de Intera\u00E7\u00E3o \u00B7 Computa\u00E7\u00E3o F\u00EDsica \u00B7 Motion \u00B7 Solo",
    "proj.viagem.title": "ViaGem",
    "proj.viagem.desc":
      "Um app bil\u00EDngue de aprendizado de idiomas conectando falantes de ingl\u00EAs e portugu\u00EAs atrav\u00E9s de viagens, tutores e ferramentas consolidadas.",
    "proj.viagem.tags":
      "Pesquisa UX \u00B7 Design de Intera\u00E7\u00E3o \u00B7 Design Visual \u00B7 2020",
    "illus.label": "Ilustra\u00E7\u00E3o",
    "about.label": "Sobre",
    "about.page.heading": "Designer, Ilustrador, Tecn\u00F3logo Criativo",
    "about.heading": "Ilustrador e designer<br /><em>do Bay Area.</em>",
    "about.body":
      "Designer e ilustrador da \u00C1rea da Ba\u00EDa \u2014 com experi\u00EAncia em motion, design de intera\u00E7\u00E3o e narrativa cultural. Fellow IDEO. B.S. Interaction Design, Santa Monica College.",
    "about.bio.p1":
      "Nascido e criado em San Francisco, terceira gera\u00E7\u00E3o. Cheguei ao design atrav\u00E9s da ilustra\u00E7\u00E3o, passei para o design gr\u00E1fico, depois para o design de intera\u00E7\u00E3o, e descobri no IDEO que o motion design uniu tudo em uma pr\u00E1tica coerente.",
    "about.bio.p2":
      "Estou na cena do freestyle dance desde 2008, o que moldou como penso sobre tempo, ritmo e o que faz o movimento parecer certo.",
    "about.bio.p3":
      "Minha fam\u00EDlia tem ra\u00EDzes Yurok, no Rio Klamath no norte da Calif\u00F3rnia, e contribuir para a revitaliza\u00E7\u00E3o da l\u00EDngua e cultura da tribo atrav\u00E9s de m\u00EDdia interativa \u00E9 um trabalho que pretendo fazer.",
    "about.bio":
      "Designer gr\u00E1fico e ilustrador com paix\u00E3o por motion e trabalho interativo — usando ferramentas como After Effects, Rive e GSAP para criar visuais que as pessoas realmente curtem. Baseado no Bay Area, trabalhando em print, digital e o que vier desde 2014.",
    "about.bio2":
      "Fellow IDEO Color by Design e Stanford d.school University Innovation Fellow. Bacharelado em Interaction Design, Santa Monica College (GPA 3,93). Ingl\u00EAs nativo, portugu\u00EAs avan\u00E7ado, espanhol intermedi\u00E1rio avan\u00E7ado.",
    "about.meta.based.label": "Localiza\u00E7\u00E3o",
    "about.meta.based.val": "Bay Area, Calif\u00F3rnia",
    "about.meta.edu.label": "Forma\u00E7\u00E3o",
    "about.meta.edu.degree1": "B.S. Design de Intera\u00E7\u00E3o",
    "about.meta.edu.school1": "Santa Monica College",
    "about.meta.edu.degree2": "A.A. Design Gr\u00E1fico",
    "about.meta.edu.school2": "College of San Mateo",
    "about.meta.awards.label": "Idiomas",
    "about.meta.awards.val": "Ingl\u00EAs<br />Portugu\u00EAs<br />Espanhol",
    "about.skills.label": "Habilidades e Ferramentas",
    "about.skills.heading": "O que eu ofere\u00E7o",
    "about.skills.design": "Design",
    "about.skills.tools": "Ferramentas",
    "about.skills.build": "Desenvolvimento",
    "about.exp.label": "Experi\u00EAncia",
    "about.exp.heading": "Trabalhos e fun\u00E7\u00F5es selecionados",
    "about.exp.ideo.title": "Fellowship IDEO Color by Design",
    "about.exp.ideo.desc":
      "Projetei uma ferramenta de reparo de eletrodom\u00E9sticos com IA conversacional, uma experi\u00EAncia AR para a COP28 e curr\u00EDculo biling\u00FCe de workshop sobre IA generativa para educadores.",
    "about.exp.gg.title": "Grand Games \u2014 Grand Park, Los Angeles",
    "about.exp.gg.desc":
      "Liderei o design gr\u00E1fico de um sistema de sinaliza\u00E7\u00E3o p\u00FAblica multil\u00EDngue instalado no Grand Park para os eventos de transmiss\u00E3o da Copa do Mundo 2022. Projetado, impresso e instalado fisicamente.",
    "about.exp.indie.date": "2014 \u2013 Presente",
    "about.exp.indie.title": "Design e Ilustra\u00E7\u00E3o Independente",
    "about.exp.indie.desc":
      "Pr\u00E1tica de ilustra\u00E7\u00E3o desde 2014. Trabalhos de clientes e pessoais abrangendo ilustra\u00E7\u00E3o editorial, motion graphics, identidade de marca e experi\u00EAncias interativas.",
    "about.btn.resume": "Baixar curr\u00EDculo \u2192",
    "about.btn.work": "Ver trabalhos \u2192",
    "work.eyebrow": "Trabalhos Selecionados",
    "work.heading": "Cases dispon\u00EDveis mediante solicita\u00E7\u00E3o.",
    "work.body":
      "Cases selecionados dispon\u00EDveis mediante solicita\u00E7\u00E3o. Deixe seu nome e e-mail e eu envio direto pra voc\u00EA.",
    "work.placeholder.name": "Seu nome",
    "work.placeholder.email": "Seu e-mail",
    "work.submit": "Solicitar acesso \u2192",
    "work.success": "Recebido \u2014 entro em contato em breve.",
    "work.or": "Ou fale comigo diretamente em",
  },
  es: {
    "nav.home": "Inicio",
    "nav.work": "Proyectos",
    "nav.illustration": "Ilustraci\u00F3n",
    "nav.about": "Sobre m\u00ED",
    "nav.craft": "Arte",
    "nav.soon": "en breve",
    "nav.contact": "Contacto",
    "hero.tagline":
      "Dise\u00F1o de Interacci\u00F3n \u00B7 Motion \u00B7 Ilustraci\u00F3n",
    "hero.tagline.sub":
      "Nativo de tercera generaci\u00F3n con ra\u00EDces Yurok, formaci\u00F3n en ilustraci\u00F3n y una pr\u00E1ctica en dise\u00F1o de interacci\u00F3n y motion.",
    "hero.bio":
      "Dise\u00F1ador de experiencias del Bay Area \u2014 movimiento, interacci\u00F3n y cultura.",
    "hero.cta.work": "Ver mi trabajo \u2192",
    "hero.cta.about": "Sobre m\u00ED",
    "hero.location": "San Francisco, CA",
    "home.work.label": "Trabajo Seleccionado",
    "home.work.heading": "Proyectos Destacados",
    "home.seeall": "Todos los proyectos \u2192",
    "home.intro.p1": "PJ Rodriguez es dise\u00F1ador de interacci\u00F3n, dise\u00F1ador de motion e ilustrador con base en San Francisco.",
    "home.intro.p2": "Es fellow de <a href=\"https://ideo.com\" target=\"_blank\" rel=\"noopener\">IDEO Color by Design \u2197<\/a> y <a href=\"https://dschool.stanford.edu/programs/university-innovation-fellows\" target=\"_blank\" rel=\"noopener\">Stanford d.school University Innovation Fellow \u2197<\/a>, con licenciatura en Interaction Design en Santa Monica College \u2014 <a href=\"https://linkedin.com/in/pjrdesign\" target=\"_blank\" rel=\"noopener\">LinkedIn \u2197<\/a>",
    "footer.tagline": "Ilustraci\u00F3n \u00B7 Dise\u00F1o \u00B7 Motion",
    "footer.copy": "\u00A9 2026 Patrick Rodriguez",
    "footer.resume": "Curr\u00EDculum",
    "footer.colophon": "Built with Vite · Hecho con <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">sangre</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">café</span></span> , <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">sudor</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">café</span></span> &amp; <span style=\"position:relative;display:inline-block;\"><span style=\"text-decoration:line-through;text-decoration-color:var(--sage-teal);\">lágrimas</span><br><span style=\"font-size:0.85em;color:var(--sage-teal);position:absolute;left:0;top:100%;white-space:nowrap;\">vibes</span></span>",
    "about.hobbies.label": "Cuando no estoy dise\u00F1ando",
    "about.hobbies.dancing": "Baile",
    "about.hobbies.cubing": "Speedcubing",
    "about.hobbies.reading": "Lectura",
    "about.hobbies.listening": "Escuchando",
    "about.hobbies.nextbook": "Siguiente libro",
    "about.hobbies.podcast": "Cambiar podcast",
    "about.pill.sf": "Con base en SF",
    "about.pill.langs": "EN / PT / ES",
    "about.pill.ideo": "IDEO Fellow",
    "about.pill.dschool": "d.school Fellow",
    "projects.label": "Trabajo Seleccionado",
    "projects.heading": "Todos los Proyectos",
    "proj.gg.title": "Grand Games",
    "proj.gg.desc":
      "Se\u00F1alizaci\u00F3n p\u00FAblica multiling\u00FCe dise\u00F1ada, impresa e instalada en Grand Park LA",
    "proj.gg.tags":
      "Dise\u00F1o Gr\u00E1fico \u00B7 Multiling\u00FCe \u00B7 Impresi\u00F3n \u00B7 2022",
    "proj.spex.title": "SPEX",
    "proj.spex.desc":
      "Herramienta de aprendizaje wearable en realidad mixta para educaci\u00F3n pr\u00E1ctica",
    "proj.spex.tags":
      "Dise\u00F1o de Interacci\u00F3n \u00B7 AR \u00B7 Wearable",
    "proj.ideo.title": "Herramienta de Diagn\u00F3stico con IA",
    "proj.ideo.desc":
      "Experiencia conversacional de reparaci\u00F3n con IA \u2014 persona, UI y prototipos",
    "proj.ideo.tags":
      "Dise\u00F1o de Interacci\u00F3n \u00B7 IA \u00B7 IDEO \u00B7 2023",
    "proj.cop28.title": "Experiencia AR COP28",
    "proj.cop28.desc":
      "Instalaci\u00F3n AR inmersiva para promover la acci\u00F3n clim\u00E1tica en la conferencia de la ONU",
    "proj.cop28.tags": "AR \u00B7 Dise\u00F1o Visual \u00B7 IDEO \u00B7 2023",
    "proj.genai.title": "Curr\u00EDculo de Taller Gen-IA",
    "proj.genai.desc":
      "Curr\u00EDculo biling\u00FCe EN/ES para que educadores exploren herramientas de IA generativa",
    "proj.genai.tags":
      "Educaci\u00F3n \u00B7 Biling\u00FCe \u00B7 IDEO \u00B7 2023",
    "proj.safehere.title": "SafeHere",
    "proj.safehere.desc":
      "Una app m\u00F3vil que conecta negocios de Main Street con embajadores de seguridad mediante reportes discretos en tiempo real.",
    "proj.safehere.tags":
      "Investigaci\u00F3n UX \u00B7 Dise\u00F1o de Interacci\u00F3n \u00B7 2020",
    "proj.talklot.title": "TalkLot",
    "proj.talklot.desc":
      "Una app de aprendizaje de idiomas con \u00E9nfasis en el habla, dise\u00F1ada para reforzar la fluidez oral mediante una producci\u00F3n oral extensiva.",
    "proj.talklot.tags":
      "Dise\u00F1o de Interacci\u00F3n \u00B7 Investigaci\u00F3n UX \u00B7 Solo \u00B7 2022",
    "proj.musicbox.title": "Consola de Sonido Ambiente",
    "proj.musicbox.desc":
      "Un dispositivo de sonido ambiente en cart\u00F3n controlado por una caja f\u00EDsica, construido con Arduino, Processing y la biblioteca de audio Minim.",
    "proj.musicbox.tags":
      "Dise\u00F1o de Interacci\u00F3n \u00B7 Computaci\u00F3n F\u00EDsica \u00B7 Motion \u00B7 Solo",
    "proj.viagem.title": "ViaGem",
    "proj.viagem.desc":
      "Una app biling\u00FCe de aprendizaje de idiomas que conecta hablantes de ingl\u00E9s y portugu\u00E9s a trav\u00E9s de viajes, tutores y herramientas consolidadas.",
    "proj.viagem.tags":
      "Investigaci\u00F3n UX \u00B7 Dise\u00F1o de Interacci\u00F3n \u00B7 Dise\u00F1o Visual \u00B7 2020",
    "illus.label": "Ilustraci\u00F3n",
    "about.label": "Sobre m\u00ED",
    "about.page.heading": "Dise\u00F1ador, Ilustrador, Tecn\u00F3logo Creativo",
    "about.heading":
      "Ilustrador y dise\u00F1ador<br /><em>del \u00C1rea de la Bah\u00EDa.</em>",
    "about.body":
      "Dise\u00F1ador e ilustrador del \u00C1rea de la Bah\u00EDa \u2014 con experiencia en motion, dise\u00F1o de interacci\u00F3n y narrativa cultural. Fellow de IDEO. B.S. Interaction Design, Santa Monica College.",
    "about.bio.p1":
      "Nacido y criado en San Francisco, tercera generaci\u00F3n. Llegu\u00E9 al dise\u00F1o a trav\u00E9s de la ilustraci\u00F3n, pas\u00E9 al dise\u00F1o gr\u00E1fico, luego al dise\u00F1o de interacci\u00F3n, y descubr\u00ED en IDEO que el motion design lo uni\u00F3 todo en una pr\u00E1ctica coherente.",
    "about.bio.p2":
      "Llevo en la escena del freestyle dance desde 2008, lo que ha moldeado c\u00F3mo pienso sobre el tiempo, el ritmo y lo que hace que el movimiento se sienta bien.",
    "about.bio.p3":
      "Mi familia tiene ra\u00EDces Yurok, del R\u00EDo Klamath en el norte de California, y contribuir a la revitalizaci\u00F3n de la lengua y cultura de la tribu a trav\u00E9s de medios interactivos es un trabajo que planeo hacer.",
    "about.bio":
      "Dise\u00F1ador gr\u00E1fico e ilustrador con pasi\u00F3n por el motion y el trabajo interactivo — usando herramientas como After Effects, Rive y GSAP para crear visuales con los que la gente realmente conecta. Basado en el Bay Area, trabajando en print, digital y lo que surja desde 2014.",
    "about.bio2":
      "Fellow IDEO Color by Design y Stanford d.school University Innovation Fellow. Licenciatura en Interaction Design, Santa Monica College (promedio 3.93). Ingl\u00E9s nativo, portugu\u00E9s avanzado, espa\u00F1ol intermedio avanzado.",
    "about.meta.based.label": "Ubicaci\u00F3n",
    "about.meta.based.val": "Bay Area, California",
    "about.meta.edu.label": "Educaci\u00F3n",
    "about.meta.edu.degree1": "B.S. Dise\u00F1o de Interacci\u00F3n",
    "about.meta.edu.school1": "Santa Monica College",
    "about.meta.edu.degree2": "A.A. Dise\u00F1o Gr\u00E1fico",
    "about.meta.edu.school2": "College of San Mateo",
    "about.meta.awards.label": "Idiomas",
    "about.meta.awards.val":
      "Ingl\u00E9s<br />Portugu\u00E9s<br />Espa\u00F1ol",
    "about.skills.label": "Habilidades y Herramientas",
    "about.skills.heading": "Lo que ofrezco",
    "about.skills.design": "Dise\u00F1o",
    "about.skills.tools": "Herramientas",
    "about.skills.build": "Desarrollo",
    "about.exp.label": "Experiencia",
    "about.exp.heading": "Trabajos y roles seleccionados",
    "about.exp.ideo.title": "Fellowship IDEO Color by Design",
    "about.exp.ideo.desc":
      "Dise\u00F1\u00E9 una herramienta de reparaci\u00F3n de electrodom\u00E9sticos con IA conversacional, una experiencia AR para la COP28 y curr\u00EDculo biling\u00FCe de taller sobre IA generativa para educadores.",
    "about.exp.gg.title": "Grand Games \u2014 Grand Park, Los Angeles",
    "about.exp.gg.desc":
      "Lider\u00E9 el dise\u00F1o gr\u00E1fico de un sistema de se\u00F1alizaci\u00F3n p\u00FAblica multiling\u00FCe instalado en Grand Park para los eventos de transmisi\u00F3n del Mundial 2022. Dise\u00F1ado, impreso e instalado f\u00EDsicamente.",
    "about.exp.indie.date": "2014 \u2013 Presente",
    "about.exp.indie.title": "Dise\u00F1o e Ilustraci\u00F3n Independiente",
    "about.exp.indie.desc":
      "Pr\u00E1ctica de ilustraci\u00F3n desde 2014. Trabajo de clientes y personal abarcando ilustraci\u00F3n editorial, motion graphics, identidad de marca y experiencias interactivas.",
    "about.btn.resume": "Descargar curr\u00EDculum \u2192",
    "about.btn.work": "Ver trabajo \u2192",
    "work.eyebrow": "Trabajo Seleccionado",
    "work.heading": "Cases disponibles bajo solicitud.",
    "work.body":
      "Cases seleccionados disponibles bajo solicitud. Deja tu nombre y correo y te los env\u00EDo.",
    "work.placeholder.name": "Tu nombre",
    "work.placeholder.email": "Tu correo",
    "work.submit": "Solicitar acceso \u2192",
    "work.success": "Listo \u2014 me pongo en contacto pronto.",
    "work.or": "O escr\u00EDbeme directamente a",
  },
};

const HTML_LANG = { en: "en", pt: "pt-BR", es: "es-419" };

function applyLang(lang) {
  const strings = TRANSLATIONS[lang];
  if (!strings) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (strings[key] === undefined) return;
    el.style.opacity = "0";
    setTimeout(() => {
      el.textContent = strings[key];
      el.style.opacity = "";
      if (el.dataset.split) delete el.dataset.split;
    }, 180);
  });

  // Placeholder translations
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (strings[key] !== undefined) el.placeholder = strings[key];
  });

  // innerHTML translations (for content with HTML tags like <br>)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (strings[key] !== undefined) el.innerHTML = strings[key];
  });

  // Lang-specific spans — show only the matching language
  const htmlLangVal = HTML_LANG[lang];
  document.querySelectorAll("p span[lang]").forEach((el) => {
    el.style.display = el.getAttribute("lang") === htmlLangVal ? "" : "none";
  });

  document.documentElement.lang = HTML_LANG[lang];
  localStorage.setItem("pj-lang", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", String(active));
    btn.classList.toggle("active", active);
  });
}

function initI18n() {
  const enabled = document.body.hasAttribute("data-lang-toggle");
  if (!enabled) {
    document.querySelector(".lang-toggle, .sidebar-lang")?.classList.add("lang-toggle--disabled");
    applyLang("en");
    return;
  }
  const saved = localStorage.getItem("pj-lang") || "en";
  applyLang(saved);
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
}

/* ============================================
   PARALLAX
   ============================================ */
function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.to(".hero-content", {
    yPercent: -8,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

/* ============================================
   RIVE EMBEDS
   ============================================ */
async function initRiveEmbeds() {
  const canvases = document.querySelectorAll("canvas[data-rive-src]");
  if (!canvases.length) return;

  const { default: RiveCanvas } = await import("@rive-app/canvas");
  canvases.forEach((canvas) => {
    new RiveCanvas({
      src: canvas.getAttribute("data-rive-src"),
      canvas,
      stateMachines:
        canvas.getAttribute("data-rive-state") || "State Machine 1",
      autoplay: true,
      onLoad: () => {
        canvas.width = canvas.parentElement.offsetWidth * devicePixelRatio;
        canvas.height = canvas.parentElement.offsetHeight * devicePixelRatio;
      },
    });
  });
}

/* ============================================
   FOOTER BOUNCE
   ============================================ */
function initFooterBounce() {
  const bouncyPath = document.querySelector("#bouncy-path");
  if (!bouncyPath) return;

  const flat = "M0,4 Q1139,4 2278,4";

  function buildPath(intensity) {
    return "M0,4 Q1139," + (4 + intensity) + " 2278,4";
  }

  function triggerBounce(rawVelocity) {
    const vel = Math.max(Math.abs(rawVelocity || 0), 600);
    const droop = 14 + (Math.min(vel, 4000) / 4000) * 30;
    gsap
      .timeline({ overwrite: true })
      .set(bouncyPath, { attr: { d: buildPath(droop) } })
      .to(bouncyPath, {
        attr: { d: flat },
        duration: 3.5,
        ease: "elastic.out(1.2, 0.25)",
      });
  }

  ScrollTrigger.create({
    trigger: ".footer-wave",
    start: "top bottom",
    onEnter: (self) => triggerBounce(self.getVelocity()),
    onEnterBack: (self) => triggerBounce(self.getVelocity()),
  });
}

function initSectionWave() {
  const path = document.querySelector("#section-wave-path");
  if (!path) return;

  const flat = "M0,4 Q1139,4 2278,4";

  function buildPath(intensity) {
    return "M0,4 Q1139," + (4 + intensity) + " 2278,4";
  }

  function triggerBounce(rawVelocity) {
    const vel = Math.max(Math.abs(rawVelocity || 0), 600);
    const droop = 14 + (Math.min(vel, 4000) / 4000) * 30;
    gsap
      .timeline({ overwrite: true })
      .set(path, { attr: { d: buildPath(droop) } })
      .to(path, {
        attr: { d: flat },
        duration: 3.5,
        ease: "elastic.out(1.2, 0.25)",
      });
  }

  ScrollTrigger.create({
    trigger: ".section-wave",
    start: "top bottom",
    onEnter: (self) => triggerBounce(self.getVelocity()),
    onEnterBack: (self) => triggerBounce(self.getVelocity()),
  });
}

/* ============================================
   IMAGE MAGNIFY CURSOR
   ============================================ */
function initImageMagnify() {
  const targets = document.querySelectorAll("img[data-magnify]");
  if (!targets.length) return;

  const ZOOM = 2.4;
  const LENS_SIZE = 200;

  const lens = document.createElement("div");
  lens.style.cssText = [
    "position:fixed",
    `width:${LENS_SIZE}px`,
    `height:${LENS_SIZE}px`,
    "border-radius:50%",
    "overflow:hidden",
    "pointer-events:none",
    "z-index:9999",
    "display:none",
    "border:2px solid var(--forest,#1e3025)",
    "box-shadow:0 4px 24px rgba(0,0,0,0.22)",
    "background:#f2efe9",
  ].join(";");
  document.body.appendChild(lens);

  const lensImg = document.createElement("img");
  lensImg.style.cssText = "position:absolute;top:0;left:0;transform-origin:top left;pointer-events:none;max-width:none;";
  lens.appendChild(lensImg);

  let activeTarget = null;

  function moveLens(e) {
    if (!activeTarget) return;
    const rect = activeTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const scaledW = rect.width * ZOOM;
    const scaledH = rect.height * ZOOM;
    const offX = -(relX * scaledW - LENS_SIZE / 2);
    const offY = -(relY * scaledH - LENS_SIZE / 2);
    lensImg.style.width = scaledW + "px";
    lensImg.style.height = scaledH + "px";
    lensImg.style.transform = `translate(${offX}px,${offY}px)`;
    lens.style.left = (e.clientX - LENS_SIZE / 2) + "px";
    lens.style.top = (e.clientY - LENS_SIZE / 2) + "px";
  }

  targets.forEach((img) => {
    img.style.cursor = "none";
    img.addEventListener("mouseenter", () => {
      activeTarget = img;
      lensImg.src = img.currentSrc || img.src;
      lens.style.display = "block";
    });
    img.addEventListener("mousemove", moveLens);
    img.addEventListener("mouseleave", () => {
      activeTarget = null;
      lens.style.display = "none";
      lensImg.src = "";
    });
  });
}

/* ============================================
   FOOTER TIME
   ============================================ */
function initFooterTime() {
  const el = document.getElementById("footer-time");
  if (!el) return;

  function update() {
    el.textContent = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
  update();
  setInterval(update, 1000);
}

/* ============================================
   HERO + FOOTER NOISE
   ============================================ */
function initHeroNoise() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = [
    { selector: ".hero", cls: "hero-noise", alpha: 28 },
    { selector: ".footer", cls: "footer-noise", alpha: 18 },
  ];

  targets.forEach(({ selector, cls, alpha }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    const canvas = document.createElement("canvas");
    canvas.className = cls;
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      opacity: cls === "hero-noise" ? "0.7" : "0.45",
      mixBlendMode: "overlay",
      zIndex: cls === "hero-noise" ? "2" : "0",
    });
    el.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let raf,
      lastTs = 0;

    function resize() {
      canvas.width = Math.floor(el.offsetWidth / 2);
      canvas.height = Math.floor(el.offsetHeight / 2);
    }

    function draw(ts) {
      raf = requestAnimationFrame(draw);
      if (ts - lastTs < 62) return;
      lastTs = ts;
      const w = canvas.width,
        h = canvas.height;
      if (!w || !h) return;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = (v * 0.82) | 0;
        d[i + 1] = v;
        d[i + 2] = (v * 0.88) | 0;
        d[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
    }

    resize();
    raf = requestAnimationFrame(draw);

    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        raf = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(raf);
      }
    }).observe(el);

    window.addEventListener("resize", resize, { passive: true });
  });
}

/* ============================================
   SPEX PAGE ANIMATIONS
   ============================================ */
function initSpexAnimations() {
  if (!window.location.pathname.includes("project-spex")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const statNums = document.querySelectorAll(".stat-num");
  if (statNums.length) {
    ScrollTrigger.create({
      trigger: statNums[0],
      start: "top 85%",
      once: true,
      onEnter: () => {
        statNums.forEach((el) => {
          const target = parseInt(el.dataset.target, 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
              el.innerText = Math.round(obj.val);
            },
          });
        });
      },
    });
  }

  const protoSection = document.querySelector(".proto-gallery");
  if (protoSection) {
    const figures = protoSection.querySelectorAll(".media-figure");
    gsap.from(figures, {
      scrollTrigger: {
        trigger: protoSection,
        start: "top 85%",
        once: true,
      },
      opacity: 0,
      y: 30,
      scale: 1.04,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.25,
    });
  }

  const storyImg = document.querySelector(".storyboard-figure img");
  if (storyImg) {
    gsap.fromTo(
      storyImg,
      { scale: 1.06 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: storyImg,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1.5,
        },
      },
    );
  }
}

/* ============================================
   GRAND GAMES PAGE ANIMATIONS
   ============================================ */
function initGrandGamesAnimations() {
  if (!window.location.pathname.includes("project-grand-games")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".project-image-grid").forEach((grid) => {
    const children = Array.from(grid.children);
    if (!children.length) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("pj-intro")) {
    document.body.classList.add("skip-intro", "intro-done");
  }
  const skipIntro = new URLSearchParams(window.location.search).has("nav");
  if (skipIntro) {
    const intro = document.getElementById("pj-intro");
    if (intro) intro.remove();
    document.body.classList.add("skip-intro", "intro-done");
  } else {
    initIntroAnimation();
  }
  initMobileNav();
  setActiveNav();
  initHeroLetters();
  initKlamathWave();
  initHeroEntrance();
  // Disabled pending homepage restructure
  // const goo = initHeroCursorGlow();
  initHeroTime();
  initHeroNoise();
  initScrollReveals();
  initCursorLabels();
  initSeeMore();
  initI18n();
  setTimeout(() => {
    // if (goo) goo.splitAndColor();
  }, 250);
  initParallax();
  initRiveEmbeds();
  initFooterTime();
  initFooterBounce();
  initSectionWave();
  initImageMagnify();
  initSpexAnimations();
  initGrandGamesAnimations();

  /* ============================================
     CUSTOM CURSOR DOT
     ============================================ */
  const cursorDot = document.createElement("div");
  cursorDot.className = "cursor-dot";
  document.body.appendChild(cursorDot);

  if (window.matchMedia("(min-width: 768px)").matches) {
    const setX = gsap.quickSetter(cursorDot, "x", "px");
    const setY = gsap.quickSetter(cursorDot, "y", "px");

    window.addEventListener("mousemove", (e) => {
      const half = cursorDot.offsetWidth / 2;
      setX(e.clientX - half);
      setY(e.clientY - half);
    });

    document.querySelectorAll("a, button, [role='button'], .work-item-thumb").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("cursor-hover"));
    });
  } else {
    cursorDot.style.display = "none";
  }
});

/* ============================================
   SIDEBAR MOBILE TOGGLE
   ============================================ */
const sidebarToggle = document.querySelector(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
  });
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("sidebar-open");
    }
  });
}


/* ============================================
   PJ INTRO ANIMATION — homepage only
   ============================================ */
function initIntroAnimation() {
  const intro = document.getElementById("pj-intro");
  if (intro) {
    document.body.style.overflow = "hidden";
    const mainContent = document.querySelector(".main-content");
    if (mainContent) mainContent.style.pointerEvents = "none";

    const p = intro.querySelector(".pj-p");
    const dot1 = intro.querySelector(".pj-dot1");
    const dot2 = intro.querySelector(".pj-dot2");
    const j = intro.querySelector(".pj-j");
    const smile = intro.querySelector(".pj-smile");

    gsap.set(p, { ...PJ_FACE.p, transformOrigin: "top left" });
    gsap.set(j, { ...PJ_FACE.j, transformOrigin: "bottom center" });
    gsap.set(dot1, PJ_FACE.dot1);
    gsap.set(dot2, PJ_FACE.dot2);
    gsap.set(smile, { ...PJ_FACE.smile, transformOrigin: "center center" });

    const face = intro.querySelector(".pj-face");

    // Pre-calculate target before any animation runs
    const targetEl = document.querySelector(".pj-initials");

    const tl = gsap.timeline({
      delay: 0.6,
      onStart: () => {
        const faceRect = face.getBoundingClientRect();
        const pEl = document.querySelector(".sidebar-identity .pj-p");
        const dot2El = document.querySelector(".sidebar-identity .pj-dot2");
        const pRect = pEl.getBoundingClientRect();
        const dot2Rect = dot2El.getBoundingClientRect();
        const targetCenterX = (pRect.left + dot2Rect.right) / 2;
        const targetCenterY = pRect.top + pRect.height / 2;
        tl._flick = {
          dx: targetCenterX - (faceRect.left + faceRect.width / 2),
          dy: targetCenterY - (faceRect.top + faceRect.height / 2),
          ds: pRect.height / faceRect.height,
        };
      },
    });

    tl.to({}, { duration: 0.5 })
      .to(face, { scale: 0.82, duration: 0.45, ease: "power3.out" })
      .to(face, { scale: 1, duration: 0.85, ease: "expo.in" })
      .to(smile, { opacity: 0, duration: 1.2, ease: "power1.in" }, "<0.15")
      .to(dot1, { y: 0, x: 0, duration: 0.5, ease: "power2.in" }, "<0.5")
      .to(dot2, { y: 0, x: 0, duration: 0.5, ease: "power2.in" }, "<0")
      .to(
        p,
        {
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          x: 0,
          y: 0,
          transformOrigin: "top left",
          duration: 0.73,
          ease: "power3.in",
        },
        "-=.8",
      )
      .to(
        j,
        {
          scaleX: 1,
          scaleY: 1,
          x: 0,
          y: 0,
          transformOrigin: "baseline",
          duration: 0.75,
          ease: "power3.inOut",
        },
        "<0",
      )
      .add("flick")
      .to(
        face,
        {
          x: () => (tl._flick.dx < 0 ? 16 : -16),
          y: () => (tl._flick.dy < 0 ? 10 : -10),
          duration: 0.5,
          ease: "linear.in",
        },
        "flick-=0.1",
      )
      .to(face, {
        x: () => tl._flick.dx,
        y: () => tl._flick.dy,
        scale: () => tl._flick.ds,
        transformOrigin: "center center",
        duration: 1.4,
        ease: "power3.out",
      })
      .call(() => {
        document.body.classList.add("intro-done");
      })
      .to(
        intro,
        {
          autoAlpha: 0,
          duration: 0.15,
          onComplete: () => {
            intro.remove();
            document.body.style.overflow = "";
            document.body.style.pointerEvents = "";
            if (mainContent) mainContent.style.pointerEvents = "";
          },
        },
        "+=0.15",
      );
  }
}

/* ============================================
   SIDEBAR IDENTITY HOVER
   ============================================ */
function initSidebarHover() {
  const sidebarId = document.querySelector(".sidebar-identity");
  if (!sidebarId) return;

  const p = sidebarId.querySelector(".pj-p");
  if (!p) return;
  const dot1 = sidebarId.querySelector(".pj-dot1");
  const dot2 = sidebarId.querySelector(".pj-dot2");
  const j = sidebarId.querySelector(".pj-j");
  const smile = sidebarId.querySelector(".pj-smile");

  // Ensure smile starts hidden and pre-rotated
  gsap.set(smile, {
    rotation: -90,
    opacity: 0,
    transformOrigin: "center center",
  });

  let hoverTl = null;
  let leaveTimeout = null;

  sidebarId.querySelector(".pj-initials").addEventListener("mouseenter", () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }
    if (hoverTl) hoverTl.kill();
    hoverTl = gsap.timeline();
    hoverTl
      .to(p, {
        ...PJ_FACE_SIDEBAR.p,
        transformOrigin: "top left",
        duration: 0.7,
        ease: "power2.inOut",
      })
      .to(
        dot1,
        { ...PJ_FACE_SIDEBAR.dot1, duration: 0.35, ease: "power2.out" },
        0.1,
      )
      .to(
        dot2,
        { ...PJ_FACE_SIDEBAR.dot2, duration: 0.35, ease: "power2.out" },
        0.14,
      )
      .to(smile, { opacity: 1, duration: 0.2, ease: "power1.in" }, 0.5);
  });

  sidebarId.querySelector(".pj-initials").addEventListener("mouseleave", () => {
    leaveTimeout = setTimeout(() => {
      if (hoverTl) hoverTl.kill();
      hoverTl = gsap.timeline();
      hoverTl
        .to(smile, { opacity: 0, duration: 0.2, ease: "power1.in" })
        .to(dot1, { y: 0, x: 0, duration: 0.35, ease: "power2.in" }, "-=0.1")
        .to(dot2, { y: 0, x: 0, duration: 0.35, ease: "power2.in" }, "-=0.35")
        .to(
          p,
          {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
            transformOrigin: "top left",
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.2",
        );
    }, 250);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSidebarHover();
});
