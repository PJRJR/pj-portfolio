# PJ Rodriguez Portfolio — Claude Code Guide

This is a personal portfolio site at pjr.design, built for graduate school applications (CSU East Bay IxDIA MA) and job search. Owner: PJ Rodriguez, graphic designer and interaction designer in the SF Bay Area.

## Tech stack

- **Build tool:** Vite (multi-page config in `vite.config.js`)
- **Languages:** Vanilla HTML, CSS, and JavaScript. No frameworks.
- **Animation:** GSAP 3.12+ with ScrollTrigger and MorphSVGPlugin
- **Interactive embeds:** @rive-app/canvas for `.riv` files
- **Hosting:** Netlify (free tier, credit-based, ~20 deploys/month budget)
- **Domain:** pjr.design via Squarespace DNS pointed to Netlify
- **Version control:** Git + GitHub, auto-deploys from `main` branch

## Repo structure

pj-portfolio/
├── index.html ← Home page
├── about.html ← Bio, education, experience
├── projects.html ← All projects grid
├── illustration.html ← Illustration gallery
├── work.html ← (currently work-in-progress)
├── project-spex.html ← Case study
├── project-grand-games.html
├── project-safehere.html
├── project-cop28.html ← Stub
├── project-playlab.html ← Stub
├── project-ideo-ai.html ← IDEO fellowship overview
├── project-rive-demo.html
├── vite.config.js
├── netlify.toml
├── package.json
├── public/assets/
│ ├── images/ ← All project images
│ ├── videos/ ← MP4/WebM motion exports
│ └── rive/ ← .riv animation files
└── src/
├── styles/main.css ← All styling, CSS variables, responsive
└── js/main.js ← GSAP animations, mobile nav, Rive loader

## Branch workflow

- **`dev` branch:** local iteration. Run `npm run dev` for hot reload at localhost:5173. Make as many commits here as needed.
- **`main` branch:** production. Only merge `dev` into `main` when changes are batched, finished, and ready to deploy. Each push to `main` consumes a Netlify credit.
- **Default behavior:** assume PJ is on `dev` unless he says otherwise. Never push directly to `main` without explicit confirmation.

## Asset naming convention

All files in `public/assets/images/` and `public/assets/videos/` follow the pattern:
projectname-descriptor.format

Examples:

- `spex-product-render.png`
- `spex-form-exploded-side.png`
- `spex-physical-prototype-pj.jpg`
- `grandgames-hero.jpg`
- `safehere-prototype-screen.png`

Project name is lowercase, no spaces, no underscores. Descriptor is hyphen-separated lowercase. Multi-word project names compress (e.g., `grandgames`, not `grand-games` or `grand_games`).

## Image and video specs

- **Hero images:** 1600px wide max, JPG for photographic content, PNG for graphics with transparency
- **Inline case study images:** 1200px wide max
- **Compress aggressively:** PNGs through pngquant or similar, JPGs at 80-85% quality
- **Videos:** MP4 H.264 for broadest compatibility, WebM as secondary format only if specifically needed. Loop-friendly, muted, no audio track.

## Design system

- **Colors:** Navy `#1A1B2F` (primary/footer), Sage `#8BA793` (accent/labels), Coral `#FF6B6B` (highlight), Cream `#F5F0EB` (background), White `#FAFAFA` (cards). Defined as CSS custom properties in `main.css`.
- **Fonts:** Instrument Serif (display/headings), DM Sans (body), loaded via Google Fonts. Some pages use Outfit instead of Instrument Serif — check the page before assuming.
- **Layout:** Max-width 1200px container, fluid type via `clamp()`, mobile-first responsive.
- **Spacing tokens:** `--space-sm`, `--space-md`, `--space-lg`, `--space-xl` defined as CSS variables. Use these, not hardcoded pixel or rem values.

## Writing style for case study copy

These rules apply to anything PJ asks Claude to draft for the site:

- **Literary but clear.** Sentences are consistently paced. Avoid rushed fragments.
- **No em dashes.** They read as AI writing. Use commas, semicolons, or restructure the sentence.
- **No vague filler.** "Various stakeholders," "wide range of," "innovative solutions" — cut these.
- **No name-dropping for borrowed credibility.** Mention companies and people only when they're directly relevant to the work being described.
- **No generic portfolio conventions.** Avoid "I'm a passionate designer who loves solving problems." Avoid problem-solution-impact templating that reads like a UX bootcamp deliverable.
- **Yurok heritage and cultural references** are woven through visual motifs, never stated explicitly in copy.
- **Active voice. Specific verbs.** "Designed ten gesture commands" beats "was responsible for designing ten gesture commands."

## Case study structure

Every full case study page (SPEX, Grand Games, SafeHere, ViaGem, Thornberry, Music Box) addresses three things at minimum:

1. **The problem** — what was broken, missing, or unmet
2. **PJ's specific role and contributions** — group projects must clearly indicate what PJ did versus the team
3. **User testing results, performance metrics, or a live prototype link** — concrete evidence of impact or iteration

The IDEO Fellowship is a separate format: a center peek modal containing three NDA-compliant project overviews, not a full scrollable case study.

## Code collaboration preferences

- **Surgical fixes over rewrites.** When fixing a bug or making an adjustment, change only what's necessary. Do not refactor unrelated code in the same edit.
- **Read the actual file state before proposing changes.** Don't assume the file matches what was discussed earlier in the conversation.
- **No abandoned experiments.** If an approach doesn't work, fully revert it before trying something else. Leftover dead code from rejected approaches is a recurring frustration.
- **Complete, ready-to-paste files preferred** over annotated snippets that require manual integration.
- **Plain-language descriptions are valid input.** When PJ says "this heading is too big" or "I want more space between these sections," translate that into the specific CSS edit.

## Workflow

- **All file edits happen via Claude Code in the terminal.** Chat conversations on claude.ai are for planning, copy drafts, and design decisions only.
- **Local dev:** `npm run dev` (Vite hot reload at localhost:5173)
- **Deploy to live:** `git push` to `main` branch, Netlify auto-deploys in ~60 seconds
- **Adding images:** drop file in `public/assets/images/`, reference as `/assets/images/filename.ext` in HTML
- **Adding Rive:** drop `.riv` in `public/assets/rive/`, embed with `<canvas data-rive-src="/assets/rive/file.riv" data-rive-state="State Machine 1">`

## Deadlines and priorities

Active deadline: CSU East Bay IxDIA MA application, May 1, 2026.

Project priority order for case study completion:

1. SPEX
2. Grand Games
3. SafeHere
4. ViaGem
5. Thornberry
6. Music Box
7. IDEO Fellowship (modal format)

## Things Claude Code should not do

- Don't create `.md` summary files or documentation unless explicitly requested
- Don't add new dependencies to `package.json` without confirming with PJ first
- Don't reorganize files or rename existing assets without explicit instruction
- Don't push to `main` unless PJ confirms the changes are ready to deploy
- Don't introduce frameworks (React, Vue, Svelte). This site stays vanilla.
