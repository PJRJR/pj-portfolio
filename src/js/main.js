/* ============================================
   PJ PORTFOLIO — main.js
   ============================================ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

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
        ".hero-info-val, .hero-info-label, .hero-info-sep, .hero-disciplines",
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
    const BTN_PAD = 30;
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
    "nav.contact": "Contact",
    "hero.status": "Available for work",
    "hero.tagline": "Interaction Design \u00B7 Motion \u00B7 Illustration",
    "hero.bio":
      "Experience designer from the Bay Area \u2014 motion, interaction, and culture.",
    "hero.cta.work": "View My Work \u2192",
    "hero.cta.about": "About Me",
    "hero.label.currently": "Currently",
    "hero.val.currently": "Open to design roles",
    "hero.label.previously": "Previously",
    "hero.val.previously": "IDEO \u00B7 Zoox \u00B7 Grand Park LA",
    "hero.label.building": "Building",
    "hero.val.building": "Illustration \u00B7 Motion \u00B7 IxD",
    "home.work.label": "Selected Work",
    "home.work.heading": "Selected Projects",
    "home.seeall": "All Projects \u2192",
    "footer.tagline": "Illustration \u00B7 Design \u00B7 Bay Area",
    "footer.copy": "\u00A9 2026 Patrick Rodriguez",
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
    "proj.samtrans.title": "SamTrans Timetable Redesign",
    "proj.samtrans.desc":
      "Grid-forward transit timetable spec \u2014 multilingual, print-ready",
    "proj.samtrans.tags": "Transit Design \u00B7 Print \u00B7 Spec \u00B7 2026",
    "illus.label": "Illustration",
    "about.heading": "Illustrator and designer\nfrom the Bay Area.",
    "about.bio":
      "I'm a graphic designer and illustrator with roots in the Bay Area — working across print, motion, and interaction design since 2014. I design things that live in the real world: public signage, wayfinding, illustrated campaigns, and interactive experiences.",
    "about.bio2":
      "IDEO Color by Design Fellow and Stanford d.school University Innovation Fellow. B.S. Interaction Design, Santa Monica College (3.93 GPA). English native, Portuguese\u2011BR advanced, Spanish\u2011LATAM advanced-intermediate — which shapes how I approach multilingual design and cultural translation in public work.",
    "about.meta.currently.label": "Currently",
    "about.meta.currently.val": "Open to full-time roles",
    "about.meta.based.label": "Based in",
    "about.meta.based.val": "San Francisco Bay Area",
    "about.meta.edu.label": "Education",
    "about.meta.edu.val": "B.S. Interaction Design, Santa Monica College",
    "about.meta.awards.label": "Fellowships",
    "about.meta.awards.val":
      "IDEO Color by Design \u00B7 Stanford d.school UIFellow",
    "about.skills.label": "Skills & Tools",
    "about.skills.heading": "What I bring",
    "about.exp.label": "Experience",
    "about.exp.heading": "Selected work & roles",
  },
  pt: {
    "nav.home": "In\u00EDcio",
    "nav.work": "Projetos",
    "nav.illustration": "Ilustra\u00E7\u00E3o",
    "nav.about": "Sobre",
    "nav.contact": "Contato",
    "hero.status": "Dispon\u00EDvel para projetos",
    "hero.tagline":
      "Design de Intera\u00E7\u00E3o \u00B7 Motion \u00B7 Ilustra\u00E7\u00E3o",
    "hero.bio":
      "Designer de experi\u00EAncias do Bay Area \u2014 movimento, intera\u00E7\u00E3o e cultura.",
    "hero.cta.work": "Ver meu trabalho \u2192",
    "hero.cta.about": "Sobre mim",
    "hero.label.currently": "Atualmente",
    "hero.val.currently": "Aberto a projetos de design",
    "hero.label.previously": "Anteriormente",
    "hero.val.previously": "IDEO \u00B7 Zoox \u00B7 Grand Park LA",
    "hero.label.building": "Desenvolvendo",
    "hero.val.building": "Ilustra\u00E7\u00E3o \u00B7 Motion \u00B7 IxD",
    "home.work.label": "Trabalhos Selecionados",
    "home.work.heading": "Projetos em Destaque",
    "home.seeall": "Todos os projetos \u2192",
    "footer.tagline": "Ilustra\u00E7\u00E3o \u00B7 Design \u00B7 Bay Area",
    "footer.copy": "\u00A9 2026 Patrick Rodriguez",
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
    "proj.samtrans.title": "Redesign de Tabela SamTrans",
    "proj.samtrans.desc":
      "Tabela de hor\u00E1rios de transporte com grid moderno \u2014 multil\u00EDngue, pronta para impress\u00E3o",
    "proj.samtrans.tags":
      "Design de Transporte \u00B7 Impress\u00E3o \u00B7 Spec \u00B7 2026",
    "illus.label": "Ilustra\u00E7\u00E3o",
    "about.heading": "Ilustrador e designer\ndo Bay Area.",
    "about.bio":
      "Sou designer gr\u00E1fico e ilustrador com ra\u00EDzes no Bay Area — atuando em design gr\u00E1fico, motion e intera\u00E7\u00E3o desde 2014. Crio coisas que existem no mundo real: sinaliza\u00E7\u00E3o p\u00FAblica, wayfinding, campanhas ilustradas e experi\u00EAncias interativas.",
    "about.bio2":
      "Fellow IDEO Color by Design e Stanford d.school University Innovation Fellow. Bacharelado em Interaction Design pela Santa Monica College (GPA 3,93). Ingl\u00EAs nativo, portugu\u00EAs avan\u00E7ado, espanhol intermedi\u00E1rio avan\u00E7ado — o que molda minha abordagem ao design multil\u00EDngue e \u00E0 tradu\u00E7\u00E3o cultural.",
    "about.meta.currently.label": "Atualmente",
    "about.meta.currently.val": "Aberto a vagas de tempo integral",
    "about.meta.based.label": "Localiza\u00E7\u00E3o",
    "about.meta.based.val": "Bay Area, Calif\u00F3rnia",
    "about.meta.edu.label": "Forma\u00E7\u00E3o",
    "about.meta.edu.val": "B.S. Interaction Design, Santa Monica College",
    "about.meta.awards.label": "Fellowships",
    "about.meta.awards.val":
      "IDEO Color by Design \u00B7 Stanford d.school UIFellow",
    "about.skills.label": "Habilidades e Ferramentas",
    "about.skills.heading": "O que eu ofere\u00E7o",
    "about.exp.label": "Experi\u00EAncia",
    "about.exp.heading": "Trabalhos e fun\u00E7\u00F5es selecionados",
  },
  es: {
    "nav.home": "Inicio",
    "nav.work": "Proyectos",
    "nav.illustration": "Ilustraci\u00F3n",
    "nav.about": "Sobre m\u00ED",
    "nav.contact": "Contacto",
    "hero.status": "Disponible para proyectos",
    "hero.tagline":
      "Dise\u00F1o de Interacci\u00F3n \u00B7 Motion \u00B7 Ilustraci\u00F3n",
    "hero.bio":
      "Dise\u00F1ador de experiencias del Bay Area \u2014 movimiento, interacci\u00F3n y cultura.",
    "hero.cta.work": "Ver mi trabajo \u2192",
    "hero.cta.about": "Sobre m\u00ED",
    "hero.label.currently": "Actualmente",
    "hero.val.currently": "Abierto a roles de dise\u00F1o",
    "hero.label.previously": "Antes",
    "hero.val.previously": "IDEO \u00B7 Zoox \u00B7 Grand Park LA",
    "hero.label.building": "Desarrollando",
    "hero.val.building": "Ilustraci\u00F3n \u00B7 Motion \u00B7 IxD",
    "home.work.label": "Trabajo Seleccionado",
    "home.work.heading": "Proyectos Destacados",
    "home.seeall": "Todos los proyectos \u2192",
    "footer.tagline": "Ilustraci\u00F3n \u00B7 Dise\u00F1o \u00B7 Bay Area",
    "footer.copy": "\u00A9 2026 Patrick Rodriguez",
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
    "proj.samtrans.title": "Redise\u00F1o de Horario SamTrans",
    "proj.samtrans.desc":
      "Horario de transporte con grid moderno \u2014 multiling\u00FCe, listo para impresi\u00F3n",
    "proj.samtrans.tags":
      "Dise\u00F1o de Transporte \u00B7 Impresi\u00F3n \u00B7 Spec \u00B7 2026",
    "illus.label": "Ilustraci\u00F3n",
    "about.heading": "Ilustrador y dise\u00F1ador\ndel Bay Area.",
    "about.bio":
      "Soy dise\u00F1ador gr\u00E1fico e ilustrador con ra\u00EDces en el Bay Area — trabajando en dise\u00F1o gr\u00E1fico, motion e interacci\u00F3n desde 2014. Creo cosas que existen en el mundo real: se\u00F1alizaci\u00F3n p\u00FAblica, wayfinding, campa\u00F1as ilustradas y experiencias interactivas.",
    "about.bio2":
      "Fellow IDEO Color by Design y Stanford d.school University Innovation Fellow. Licenciatura en Interaction Design, Santa Monica College (promedio 3.93). Ingl\u00E9s nativo, portugu\u00E9s avanzado, espa\u00F1ol intermedio avanzado — lo que define mi enfoque al dise\u00F1o multiling\u00FCe y la traducci\u00F3n cultural.",
    "about.meta.currently.label": "Actualmente",
    "about.meta.currently.val": "Abierto a roles de tiempo completo",
    "about.meta.based.label": "Ubicaci\u00F3n",
    "about.meta.based.val": "Bay Area, California",
    "about.meta.edu.label": "Educaci\u00F3n",
    "about.meta.edu.val": "B.S. Interaction Design, Santa Monica College",
    "about.meta.awards.label": "Fellowships",
    "about.meta.awards.val":
      "IDEO Color by Design \u00B7 Stanford d.school UIFellow",
    "about.skills.label": "Habilidades y Herramientas",
    "about.skills.heading": "Lo que ofrezco",
    "about.exp.label": "Experiencia",
    "about.exp.heading": "Trabajos y roles seleccionados",
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

  document.documentElement.lang = HTML_LANG[lang];
  localStorage.setItem("pj-lang", lang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", String(active));
    btn.classList.toggle("active", active);
  });
}

function initI18n() {
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

  const flat = "M0,0C0,0,464,0,1139,0s1139,0,1139,0V120H0V0z";

  function buildPath(intensity) {
    return (
      "M0,0C0,0,464," +
      intensity +
      ",1139," +
      intensity +
      "S2278,0,2278,0V120H0V0z"
    );
  }

  function triggerBounce(rawVelocity) {
    const vel = Math.max(Math.abs(rawVelocity || 0), 600);
    const droop = 40 + (Math.min(vel, 4000) / 4000) * 70;
    gsap
      .timeline({ overwrite: true })
      .set(bouncyPath, { morphSVG: buildPath(droop) })
      .to(bouncyPath, {
        morphSVG: flat,
        duration: 3.5,
        ease: "elastic.out(1.2, 0.25)",
      });
  }

  ScrollTrigger.create({
    trigger: ".footer-bounce",
    start: "top bottom",
    onEnter: (self) => triggerBounce(self.getVelocity()),
    onEnterBack: (self) => triggerBounce(self.getVelocity()),
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
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  setActiveNav();
  initHeroLetters();
  initKlamathWave();
  initHeroEntrance();
  const goo = initHeroCursorGlow();
  initHeroTime();
  initHeroNoise();
  initScrollReveals();
  initCursorLabels();
  initSeeMore();
  initI18n();
  setTimeout(() => {
    if (goo) goo.splitAndColor();
  }, 250);
  initParallax();
  initRiveEmbeds();
  initFooterTime();
  initFooterBounce();
});
