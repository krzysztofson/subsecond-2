# subsecond.app

One-page site for the subsecond boutique web agency. Design B ("Prism"): glass
surfaces, CSS-only animation, Pearl (light) and Onyx (dark) themes, EN copy.

## Stack

- [Vite](https://vitejs.dev/) + vanilla TypeScript (no framework)
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

- `index.html` + `src/styles/b.css` — homepage (EN only, CSS-only animation)
- `src/site.ts` — homepage entry: attribution, GA4/pixel page view, booking modal, before/after sliders, video review form
- `src/forms.ts` — free video review form: JSON post to Formspark with UTMs, inline success/error, `video_review_submit` GA4 event
- `src/styles/widgets.css` — booking modal, Calendly loading state, cookie notice and slider, themed via `--w-*` properties
- `src/theme.ts` — Pearl / Onyx switch; an inline script in each page applies the stored or system theme before first paint
- `designs/` — the B mockup the pages were built from (reference only, not deployed)
- `revenue-review.html` + `src/revenue-review.ts` — EN-only paid landing page at `/revenue-review` (OpenAI Ads destination; `noindex`), same design B styles plus its own section at the end of `b.css`
- `src/booking.ts` — Calendly: lazy embeds, booking modal, funnel + conversion tracking from Calendly's postMessage events
- `src/attribution.ts` — keeps UTMs and `oppref` in `sessionStorage` for the session and passes UTMs to Calendly
- `src/tracking.ts` — `oaiq` (OpenAI pixel) and `gtag` (GA4) wrappers
- `src/notice.ts` — informational cookie notice (tracking does not depend on it)

## Notes

- Theme choice persists in `localStorage` (`subsecond-b-theme`); with none stored, pages follow the system setting.
- `prefers-reduced-motion` turns off every animation and transition on the design B pages.
- Do not add CSS `scroll-behavior: smooth`.

## Tracking

- The OpenAI Measurement Pixel (`OPENAI_PIXEL_ID`) and GA4 (`GA_ID`) from `src/config.ts` are injected into every HTML page by the `injectTracking()` plugin in `vite.config.ts`. Pixel debug logging is on for `localhost` or with `?oaiq_debug=1`.
- **Primary conversion:** `lead_created` fires once per successful Calendly booking (`calendly.event_scheduled`), with the Calendly invitee UUID as `event_id`. Opening Calendly or clicking a CTA never counts as a lead.
- GA4 funnel events: `openai_lp_view`, `revenue_review_cta_click`, `booking_cta_click`, `calendly_opened`, `calendly_date_selected`, `calendly_booking_completed`, `video_review_cta_click`, `video_review_submit`, `video_review_error`, `fallback_form_submit`.
- Never strip the query string on the way in: the pixel reads `oppref` from the landing URL. `/revenue-review` is served without a redirect.
- Bookings made on calendly.com directly (the "open in a new tab" fallback) carry UTMs but don't fire the pixel conversion.
- Ad destination: `https://subsecond.app/revenue-review?utm_source=openai&utm_medium=paid&utm_campaign=revenue_review&utm_content=<creative>`
