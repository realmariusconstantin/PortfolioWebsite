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

| Command             | What it does                                                                  |
| ------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload. TODO placeholders are visible (dashed amber boxes). |
| `npm run build`     | Type-checks, pre-renders every route to static HTML in `dist/`, writes `404.html`. |
| `npm run preview`   | Serves `dist/` locally to check the production build.                         |
| `npm run typecheck` | Runs `vue-tsc` only.                                                          |
| `npm run images`    | Regenerates responsive images and icons from `assets-src/`.                   |

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
