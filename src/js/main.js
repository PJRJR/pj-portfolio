/* ============================================
   PJ PORTFOLIO — Main JavaScript
   GSAP ScrollTrigger + Mobile Nav + Rive helper
   ============================================ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// --- Mobile Navigation ---
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const isOpen = navLinks.classList.contains("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// --- Set active nav link based on current page ---
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    // Match exact path or if we're on a project page, highlight "Work"
    if (
      path.endsWith(href) ||
      (path.includes("/src/pages/") && href.includes("projects"))
    ) {
      link.classList.add("active");
    }
  });
}

// --- GSAP: Reveal animations on scroll ---
function initScrollAnimations() {
  // Animate all elements with class "reveal"
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Stagger project cards
  const cards = document.querySelectorAll(".project-card");
  if (cards.length > 0) {
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 85%",
        },
      }
    );
  }

  // Hero entrance
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    gsap.fromTo(
      heroContent,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }
}

// --- GSAP: Smooth parallax on hero (subtle) ---
function initParallax() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  gsap.to(".hero h1", {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

// --- Rive helper: load a .riv file into a canvas ---
// Usage: add <canvas data-rive-src="/assets/rive/my-anim.riv" data-rive-state="State Machine 1"></canvas>
async function initRiveEmbeds() {
  const canvases = document.querySelectorAll("canvas[data-rive-src]");
  if (canvases.length === 0) return;

  // Dynamic import so the page doesn't fail if no Rive files exist yet
  const { default: RiveCanvas } = await import("@rive-app/canvas");

  canvases.forEach((canvas) => {
    const src = canvas.getAttribute("data-rive-src");
    const stateMachine =
      canvas.getAttribute("data-rive-state") || "State Machine 1";

    new RiveCanvas({
      src,
      canvas,
      stateMachines: stateMachine,
      autoplay: true,
      onLoad: () => {
        // Resize canvas to match container
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth * window.devicePixelRatio;
        canvas.height = parent.offsetHeight * window.devicePixelRatio;
      },
    });
  });
}

// --- Footer bounce based on scroll velocity ---
function initFooterBounce() {
  const bouncyPath = document.querySelector("#bouncy-path");
  if (!bouncyPath) return;

  const down = "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V50H0V-0.3z";
  const flat = "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V50H0V-0.3z";

  ScrollTrigger.create({
    trigger: ".footer",
    start: "top bottom",
    onEnter: (self) => {
      const velocity = self.getVelocity();
      const variation = velocity / 10000;
      gsap.fromTo(
        "#bouncy-path",
        { morphSVG: down },
        {
          duration: 2,
          morphSVG: flat,
          ease: `elastic.out(${1 + variation}, ${1 - variation})`,
          overwrite: true,
        }
      );
    },
  });
}

// --- Initialize everything ---
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  setActiveNav();
  initScrollAnimations();
  initParallax();
  initRiveEmbeds();
  initFooterBounce();
});
