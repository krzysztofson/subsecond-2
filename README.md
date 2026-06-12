# subsecond.app

Award-style one-page site for the subsecond boutique web agency. Dark editorial
design, WebGL hero, scroll choreography, bilingual EN/PL copy.

## Stack

- [Vite](https://vitejs.dev/) + vanilla TypeScript (no framework)
- [GSAP](https://gsap.com/) + ScrollTrigger — preloader, line reveals, section staggers, magnetic buttons, custom cursor
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling and anchor navigation
- [Three.js](https://threejs.org/) — hero background: domain-warped fbm noise shader reacting to the cursor
- [Vitest](https://vitest.dev/) + jsdom — unit tests

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # typecheck + production build to dist/
npm run preview  # preview the production build
npm test         # run unit tests
```

## Structure

- `index.html` — full semantic markup; every translatable element carries a `data-i18n` key
- `src/i18n.ts` — EN/PL dictionary, `setLanguage()`, localStorage persistence
- `src/webgl.ts` — Three.js hero scene with reduced-motion and no-WebGL fallbacks
- `src/animations.ts` — split-text helper, scroll reveals, cursor, magnetic buttons, preloader
- `src/main.ts` — boot sequence and language-toggle wiring
- `src/styles/main.css` — design system (custom properties, fluid type via `clamp()`)

## Notes

- Language choice persists in `localStorage` (`subsecond-lang`) and updates `<html lang>`.
- `prefers-reduced-motion` disables the preloader, smooth scroll, grain and the WebGL animation loop (a single static frame is rendered instead).
- Do not add CSS `scroll-behavior: smooth` — it conflicts with Lenis.
