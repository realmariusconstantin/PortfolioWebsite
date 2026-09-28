# Portfolio: Romish case study refresh (implementation prompt)

You are working in Marius Constantin's portfolio repo (mariusconstantin.com: Vue 3, TypeScript, Tailwind CSS, Vite, deployed on Vercel, light and dark themes). Update the Romish case study at `/projects/romish` and the Romish card on the home page (`#work`) for the new Romish brand, add a Brand section, refresh screenshots, and make the page easier for recruiters to skim. **Do not redesign the rest of the portfolio.**

First, find where the case study lives (a `.vue` page, a route component, or a content/data file such as `projects.ts` or markdown) and where the home-page project card gets its data. Change content in its existing source of truth; don't hardcode copies.

Writing rules for every piece of copy: first person, plain and specific, short sentences, **no em dashes** (use a colon, comma or full stop instead), no hype words ("revolutionary", "seamless", "cutting-edge"). Every number must stay exactly as given here.

---

## 1. The Romish brand (use only inside the case study and the Romish card)

- Mark, "the Ready ring". Inline this SVG as a small Vue component (`RomishMark.vue`, props `size`, `ringColor` defaulting to `currentColor`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 12 76 76" role="img" aria-label="Romish">
  <path d="M81.13 28.2A38 38 0 1 1 71.8 18.87L62.62 31.98A22 22 0 1 0 68.02 37.38Z" fill="currentColor"/>
  <circle cx="50" cy="50" r="8" fill="#FFAA1F"/>
</svg>
```

- Accent: amber `#FFAA1F`. On a light background amber is a fill only; amber text uses `#9A5B00`. Dark surfaces: `#0B0C0E`, `#121316`, border `#24272C`, text `#EDEBE6`, muted `#9398A1`.
- Keep the portfolio's own fonts site-wide. Don't import Romish's fonts globally; the Brand section's type specimen may load Unbounded 600 only on that route, if it's cheap (a single `<link>` or `@font-face` scoped to the page). Otherwise show the specimen as an image.
- Never rotate the mark; minimum 16px; keep clear space around it about a fifth of its height.

## 2. Hero of the case study

- Replace any old Romish logo or text logo with the mark + "Romish" (portfolio font is fine).
- One-line pitch under the title: **"A CS2 10-player matchmaking platform where captains draft teams and ban maps, then play on a server the app sets up itself."**
- A compact facts row (definition list, not a table): **Role:** solo, design to deployment · **Timeline:** 2024 to present · **Status:** Pre-launch · **Stack:** Next.js 16, TypeScript, MongoDB, Redis, Pusher · Links: Live site, Code walkthrough (contact).
- Hero image: the new landing page screenshot (see section 5), dark frame, rounded corners, `alt` describing what's on screen.

## 3. "At a glance" strip (new, directly under the hero)

Four stat tiles, big number + one-line label. Use exactly these:

- **10** players synced in real time per match
- **7** match phases, from Find Match to Results
- **8** server-side deadline types, none depending on an open browser tab
- **40** automated failure-path checks run by bot scripts
  Tiles are plain text in the DOM (not images) so they're readable by screen readers and search.

## 4. New section: "Brand and design"

Insert it after "Beyond the Match" and before "Lessons Learned"; renumber every following section (Lessons becomes 10, Status becomes 11) and update any in-page table of contents or anchors.

Copy (use as written; fix only typos):

> Romish ran for most of its life on a working name and a Spartan-helmet placeholder. Before launch I rebuilt the brand around the product itself.
>
> The name is Rom-ish: Romanian plus Irish. I explored eight logo concepts over three rounds, from geometric monograms to heritage ideas like the Dacian draco and a wolf-teeth shield, and tested each one as an app icon, a 16px favicon and inside the navbar.
>
> The winner is the Ready ring: a heavy ring with a notch and an amber dot. It reads as a crosshair and as the ready state, the moment a match pops, and it still works at 16px where the detailed concepts fell apart.
>
> The system is deliberately quiet: one warm accent against a dark UI, Unbounded for the display voice, Geist for the interface, and Geist Mono for anything that changes or lines up, like scores, Elo and timers. The colours live as tokens in Tailwind v4 and are mapped onto shadcn's variables, so existing components picked up the brand without rewrites.

Marius: confirm the last sentence once the brand rollout is merged; if it isn't yet, change it to "are being mapped onto".

Visuals for this section, in this order:

1. **Exploration strip:** `romish-logo-exploration.webp`, the concept board (rounds 1 to 3). Caption: "Eight concepts, each tested as an icon, a favicon and in the navbar."
2. **Final mark:** the `RomishMark` component large on `#0B0C0E` next to its 32px and 16px sizes (live components, not an image).
3. **Palette:** 6 swatches as live elements with name + hex: bg `#0B0C0E`, surface `#121316`, ink `#EDEBE6`, muted `#9398A1`, amber `#FFAA1F`, team beta `#4C7DFF`. Hex values visible as text, with sufficient contrast on each swatch.
4. **Type specimen:** "ROMISH" in Unbounded, "Map veto · 20s per ban" in Geist, "13 : 11 · +18 Elo" in Geist Mono.
5. **Before and after:** two screenshots side by side (`romish-before.webp`, `romish-after.webp`) of the same screen (the Play page), captioned "Before and after the rebrand."

## 5. Screenshots

Marius will supply the images; add them to the existing image folder with these names, and render a clearly labelled placeholder (not a broken image) if a file is missing, so the page can ship now.

| File                                          | Screen                     | Used in                    |
| --------------------------------------------- | -------------------------- | -------------------------- |
| `romish-landing.webp`                       | New landing page hero      | Case study hero, home card |
| `romish-play.webp`                          | Play page (dashboard)      | Player Journey step 1      |
| `romish-ready-check.webp`                   | Ready check                | Player Journey             |
| `romish-draft.webp`                         | Captain draft              | Player Journey             |
| `romish-veto.webp`                          | Map veto                   | Player Journey             |
| `romish-setup.webp`                         | Server setup               | Player Journey             |
| `romish-live.webp`                          | Live match                 | Player Journey             |
| `romish-results.webp`                       | Results with Elo changes   | Player Journey             |
| `romish-mobile.webp`                        | Four phone screens         | Player Journey             |
| `romish-logo-exploration.webp`              | Logo concept board         | Brand                      |
| `romish-before.webp`, `romish-after.webp` | Play page before and after | Brand                      |

Rules: WebP, 2400px wide for desktop shots (1200px displayed), `width`/`height` attributes set to prevent layout shift, `loading="lazy"` for everything below the hero, `decoding="async"`, meaningful `alt` on each. Replace the old screenshots in Player Journey with the new files; keep the existing captions and numbers (25s ready check, 30s per pick, 20s per ban, 3 min setup cap, 5 min to reconnect).

## 6. Skimmability for recruiters

- Add a sticky or top in-page table of contents with the section numbers and titles (anchor links; on mobile a collapsible list).
- In "Engineering Deep Dives", keep each subsection's first paragraph visible and put the pseudocode blocks and long lists inside `<details>` with a clear summary ("Show the scheduler pseudocode"). Nothing is deleted.
- Add a "Back to top" link at the end of each long section.
- End the page with the existing CTA ("Want a walkthrough of the code?") and make it the amber button style from section 1, with visible focus state.

## 7. Home page card (`#work`)

- Swap the card's logo for `RomishMark`, the image for `romish-landing.webp`, and keep the "Pre-launch" badge.
- Card summary (one sentence): "Captains draft, ban maps, then play on a server the app provisions itself: real-time for ten players, built solo."

## 8. Meta

- Update the case study's `<title>`, meta description and OpenGraph/Twitter image to the new landing screenshot (a 1200×630 crop, `romish-og.webp`). Description: "How I built Romish, a CS2 10-player matchmaking platform: server-side timers, real-time sync, game-server automation and the brand."
- Keep the canonical URL.

## 9. Out of scope

- No changes to other projects, the About/Skills/Experience sections, site fonts or the site's global colours.
- Don't invent metrics, users, uptime or performance numbers. Only the numbers in this prompt and those already on the page.

## 10. Done when

1. `npm run build` and the type-check pass; no console errors on `/projects/romish` or `/`.
2. Both themes look right; amber is never used as text on a light background.
3. Lighthouse on `/projects/romish`: no accessibility errors, no CLS from images.
4. Every section number, anchor and TOC link matches after the renumbering.
5. Summary of changed files and the list of screenshot placeholders still waiting for images.

# mariusconstantin.com

My developer portfolio: a pre-rendered Vue 3 site with a home page and a case study for Romish, my CS2 10-man matchmaking platform.

**Stack:** Vue 3, TypeScript, Vite, Tailwind CSS v4, Vue Router, vite-ssg (static pre-rendering), @unhead/vue, @vueuse/core. Deployed on Vercel.

**Lighthouse (production build):** Performance 97 to 100, Accessibility 100, Best Practices 100, SEO 100 on mobile and desktop.

## Setup

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command               | What it does                                                                          |
| --------------------- | ------------------------------------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload. TODO placeholders are visible (dashed amber boxes).       |
| `npm run build`     | Type-checks, pre-renders every route to static HTML in`dist/`, writes `404.html`. |
| `npm run preview`   | Serves`dist/` locally to check the production build.                                |
| `npm run typecheck` | Runs`vue-tsc` only.                                                                 |
| `npm run images`    | Regenerates responsive images and icons from`assets-src/`.                          |

## Editing content

All copy lives in **`src/data/content.ts`**. Components only render it, so you can change text, projects, skills and the case study without touching markup.

- Search the file for `TODO` to find everything that still needs your input.
- Any string that starts with `TODO` is shown as a placeholder in dev and **removed from production builds** (see `stripContentTodos` in `vite.config.ts`), so unfinished notes never ship.
- Projects with `draft: true` are hidden. Fill them in and delete the flag to publish them.
- Keep copy free of em dashes.

## Images

1. Put the original PNG in `assets-src/`.
2. Add an entry to `images` in `scripts/optimize-images.mjs` (you can crop, and blur regions that show personal data).
3. Run `npm run images`. It writes AVIF + WebP at 480/800/1600px to `public/images/` and updates `src/data/images.generated.ts` with their dimensions.
4. Reference the image by key in `content.ts`, e.g. `{ image: 'romish-veto', alt: '...' }`.

Share images (`public/og/*.png`) and the app icon are screenshots of the HTML templates in `scripts/og/`. To regenerate one, run `npm run dev`, open `http://localhost:5173/scripts/og/home.html` (or `romish.html`, `icon.html`) at 1200x630 (icon: 512x512), and save a screenshot over the file in `public/og/` (icon: `assets-src/icon-source.png`, then `npm run images`).

## Contact form

The form posts to Formspree (`site.formEndpoint` in `content.ts`, form `xeejgwqd`, the same one the old site used). No backend is needed. If submissions stop arriving, check in the Formspree dashboard that `mariusconstantin.com` is an allowed domain and that the monthly quota isn't used up.

## Deploying to Vercel

The repo includes `vercel.json` (build command, output directory, clean URLs and cache headers).

1. On vercel.com, **Add New > Project** and import this GitHub repo.
2. Leave the framework preset as detected (Vite). Build and output settings come from `vercel.json`.
3. Deploy. Every push to the production branch redeploys, and pull requests get preview URLs.
4. Under **Settings > Domains**, add `mariusconstantin.com` and follow the DNS instructions.

Or from the CLI: `npx vercel` for a preview deployment, `npx vercel --prod` for production.

Unknown URLs get the pre-rendered `404.html`.

## Project structure

```
src/
  data/          content.ts (all copy), images.generated.ts
  pages/         HomePage, RomishCaseStudy, NotFound
  sections/      Home page sections (hero, work, skills, about, experience, contact)
  components/    Shared UI (header, footer, buttons, lightbox, contact form, ...)
    case-study/  Architecture diagram
  composables/   useTheme, useScrollSpy, useSeo
  directives/    v-reveal scroll animation
  styles/        main.css: design tokens (colours, type, radius) and base styles
public/          Static files: CV, fonts, images, icons, og, sitemap.xml, robots.txt
assets-src/      Original images (input for npm run images)
scripts/         Image pipeline, post-build step, OG templates
```

## Design tokens

Colours for both themes are CSS variables in `src/styles/main.css` (`:root` for light, `.dark` for dark), mapped to Tailwind utilities such as `bg-surface`, `text-muted`, `border-line` and `text-accent`. Fonts, radius, container width and type scale live in the `@theme` block in the same file. The theme defaults to the visitor's system preference, and their choice is saved in `localStorage`.

The previous static site is preserved on the `old-site` branch.
