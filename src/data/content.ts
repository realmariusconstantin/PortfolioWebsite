/**
 * Every piece of copy on the site lives here. Components only render this data.
 *
 * Conventions:
 * - Strings starting with "TODO:" are placeholders. Components hide list items
 *   whose text starts with "TODO:" and projects with `draft: true`, so nothing
 *   unfinished reaches the live site. Search this file for "TODO" to find them.
 * - No em dashes in copy. Use commas, full stops or "to".
 * - Production builds replace "TODO..." strings with '' (see vite.config.ts), so
 *   components treat empty strings as hidden too. Use `shown()` below.
 *
 * This file is also imported by scripts/optimize-images.mjs (Node type stripping),
 * so keep it free of runtime imports and TypeScript-only syntax like enums.
 */

/** One screenshot on the site. The optimised files come from assets-src/<file> via `npm run images`. */
export interface ImageSlot {
  /** Output name in public/images and the key in images.generated.ts. */
  id: string
  /** PNG original to drop into assets-src/. */
  file: string
  alt: string
  caption: string
  /** CSS aspect-ratio reserved for the placeholder before the image exists, e.g. "16 / 9". */
  aspect: string
  /** Recommended size of the PNG, shown on the dev placeholder. */
  size: string
  /** Exactly what to screenshot. Shown on the dev placeholder. */
  capture: string
  /** Draw browser chrome around it (desktop screens). Phone composites set this to false. */
  browser?: boolean
  /** Cap the rendered width, for portrait crops like a modal or side panel. */
  maxWidth?: string
}

export interface Screenshot {
  /** An ImageSlot id. */
  image: string
  alt: string
  caption?: string
}

export interface Link {
  label: string
  href: string
  external?: boolean
}

export interface Project {
  slug: string
  title: string
  summary: string
  stack: string[]
  links: Link[]
  /** Shown instead of a repo link when the code is private. */
  repoNote?: string
  caseStudy?: string
  image?: Screenshot
  /** Draft projects are kept out of the rendered site until filled in. */
  draft?: boolean
}

// ---------------------------------------------------------------------------
// Site + person
// ---------------------------------------------------------------------------

export const site = {
  url: 'https://mariusconstantin.com',
  title: 'Marius Constantin, Full-Stack Developer',
  description:
    'Full-stack developer in Ireland building real-time web apps with TypeScript, Vue and React/Next.js. Creator of Romish, a CS2 10-player matchmaking platform.',
  ogImage: '/og/home.png',
  resume: '/Marius-Constantin-CV.pdf',
  // The contact form posts here; api/contact.ts validates the email and forwards to Formspree.
  formEndpoint: '/api/contact',
}

export const person = {
  name: 'Marius Constantin',
  initials: 'MC',
  role: 'Full-Stack Developer',
  location: 'Ireland',
  availability: 'Open to full-stack roles and internships',
  email: 'marius.c49@yahoo.com',
  github: 'https://github.com/realmariusconstantin',
  // TODO: the CV uses linkedin.com/in/mariusconstantin-5044b9346 (no hyphen). Confirm which is correct.
  linkedin: 'https://www.linkedin.com/in/marius-constantin-5044b9346/',
  languages: ['English', 'Romanian'],
}

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

/** Heading copy for each home page section, keyed by section id. */
export const sections = {
  work: { title: 'Selected work', intro: "Things I've designed, built and shipped, starting with the one I'm proudest of." },
  skills: { title: 'Skills', intro: 'The tools I use, grouped by where they sit in the stack.' },
  about: { title: 'About me', intro: '' },
  experience: { title: 'Experience & education', intro: '' },
  contact: { title: "Let's talk", intro: '' },
} satisfies Record<(typeof nav)[number]['id'], { title: string; intro: string }>

/** True for placeholder copy that must not render. */
export const isTodo = (text: string) => text.trimStart().startsWith('TODO')

/** True for copy that should render: not empty (TODOs become '' in production) and not a TODO. */
export const shown = (text: string | undefined): text is string => !!text && !isTodo(text)

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  headline: 'I build full-stack web apps, from real-time interfaces to the auth and data layers behind them.',
  intro:
    'I work in TypeScript across Vue and React/Next.js, with Node.js, MongoDB and Redis behind them. My latest project, Romish, is a Next.js platform that runs a 10-player CS2 match end to end: Steam sign-in, queue, captain draft, map veto, an automated game server and Elo.',
  primaryCta: { label: 'View projects', href: '#work' },
  secondaryCta: { label: 'Get in touch', href: '#contact' },
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const featuredProject: Project & { outcomes: string[]; timeline: string; status: string } = {
  slug: 'romish',
  title: 'Romish',
  summary:
    'CS2 10-player matchmaking platform: Steam sign-in, queue, ready check, captain draft, map veto, automated game servers and Elo.',
  status: 'Pre-launch',
  timeline: 'March 2025 to present',
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Redis', 'Pusher', 'Steam OpenID', 'DatHost + MatchZy'],
  outcomes: [
    'Runs a whole 10-player match with no admin involved: queue, ready check, captain draft, map veto, a configured game server and Elo.',
    'Every deadline is enforced on the server, so a match plays out the same way whether or not anyone has the page open.',
    'Starts and configures a CS2 server for exactly those ten players, and reads the result back through a signed webhook.',
    "AFK captains, disconnects and servers that fail to start all have a defined outcome, and nobody is penalised for the platform's own faults.",
  ],
  links: [{ label: 'Live site', href: 'https://romish.org', external: true }],
  repoNote: 'Private repo, walkthrough on request',
  caseStudy: '/projects/romish',
  image: { image: 'romish-draft', alt: '' }, // alt comes from the image slot
}

export const projects: Project[] = [
  {
    slug: 'portfolio',
    title: 'This portfolio',
    summary:
      'Pre-rendered Vue site with all copy driven from one typed content file, with light and dark themes.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
    links: [
      { label: 'GitHub', href: 'https://github.com/realmariusconstantin/PortfolioWebsite', external: true },
    ],
  },
  {
    // TODO: prefilled from the public repo. Confirm your role (the repo has a MariusFrontend branch),
    // the backend stack, and whether there is a live demo, then remove `draft`.
    // SECURITY: the repo README publishes an admin email + password. Remove it and rotate the password.
    slug: 'renova',
    title: 'Renova (TUSBinRight+)',
    summary:
      'Team-built recycling web app: scan a barcode or pick an item, and it tells you which bin to use and how to prepare it, with location-specific rules and an admin panel.',
    stack: ['Vue 3', 'Vite', 'Chart.js', 'Barcode scanning', 'TODO: backend (PHP / MySQL?)'],
    links: [{ label: 'GitHub', href: 'https://github.com/realmariusconstantin/TUSBinRIght-', external: true }],
    draft: true,
  },
  {
    // TODO: prefilled from the public repo. The README's tech stack section is still a template; confirm the stack
    // and your part in the team, then remove `draft`.
    slug: 'environmental-impact-tracker',
    title: 'Environmental Impact Tracker',
    summary:
      'Team project that estimates your carbon footprint from daily activities and charts your progress over time.',
    stack: ['Vue.js', 'TODO'],
    links: [
      { label: 'GitHub', href: 'https://github.com/realmariusconstantin/EnvironmentalImpactTracker', external: true },
    ],
    draft: true,
  },
  {
    // TODO: prefilled from the public repo (no README yet). Add a one-line summary, then remove `draft`.
    slug: 'banking-system',
    title: 'Banking System',
    summary: 'TODO: one-line description. Java project for TUS.',
    stack: ['Java'],
    links: [{ label: 'GitHub', href: 'https://github.com/realmariusconstantin/Banking-System-Project', external: true }],
    draft: true,
  },
]

export const moreOnGithub = {
  title: 'More on GitHub',
  body: 'College coursework and team projects in Java and Vue.',
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skills: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['Vue.js', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'REST APIs'] },
  { group: 'Data', items: ['MongoDB', 'Redis', 'MySQL', 'SQL'] },
  { group: 'Mobile', items: ['Kotlin', 'Firebase'] },
  {
    group: 'Other',
    items: ['JWT auth', 'Role-based access control', 'Git', 'Figma', 'Wireshark', 'Arduino / embedded'],
  },
]

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  paragraphs: [
    "I'm a third-year BSc Mobile & Web Computing student at the Technological University of the Shannon (TUS Midlands Midwest). I was born in Romania, live in Ireland, and speak both English and Romanian.",
    'Romish came from a real problem: organising CS2 10-mans meant tracking players, balancing teams and updating Elo by hand. I designed and built the platform that now automates all of it, from Steam sign-in to the final score.',
    "Alongside my degree I work as a manager at Supermac's, running a busy customer-facing team and training new staff. It's taught me to stay calm under pressure, communicate clearly and be someone the team can rely on.",
    "Next, I want to join a team as a full-stack developer and ship software people use every day. Long term, I'd like to build a company of my own.",
  ],
  facts: [
    { label: 'Studying', value: 'BSc Mobile & Web Computing, TUS' },
    { label: 'Year', value: 'Third year' },
    { label: 'Based in', value: 'Ireland' },
    { label: 'Languages', value: 'English, Romanian' },
  ],
}

// ---------------------------------------------------------------------------
// Experience + education
// ---------------------------------------------------------------------------

export const timeline: {
  kind: 'Education' | 'Work'
  title: string
  org: string
  period: string
  location?: string
  points: string[]
}[] = [
  {
    kind: 'Education',
    title: 'BSc Mobile & Web Computing',
    org: 'Technological University of the Shannon (TUS Midlands Midwest)',
    period: '2023 to present',
    location: 'Ireland',
    points: [
      'Third year. Coursework across web and mobile development, Java, databases and networking.',
      'TODO: notable module, grade or team project worth mentioning.',
    ],
  },
  {
    kind: 'Work',
    title: 'Manager',
    org: "Supermac's",
    period: '2022 to present',
    location: 'Nenagh, Ireland',
    points: [
      'Manage a busy, fast-paced, customer-facing team alongside my studies.',
      'Trained new staff on service standards and day-to-day procedures.',
    ],
  },
]

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contact = {
  body: "I'm looking for full-stack roles, internships and graduate positions in Ireland or remote. If you're hiring, or want to talk about something you're building, send me a message.",
  form: {
    success: "Thanks, your message is on its way. I'll get back to you by email.",
    error: "Something went wrong and your message wasn't sent. Please try again, or email me directly.",
  },
}

// ---------------------------------------------------------------------------
// Romish: image slots
// Drop a PNG into assets-src/ with the exact `file` name and run `npm run images`.
// Until then the slot shows a dashed placeholder in `npm run dev` and nothing in
// production. Blur regions for personal data live in scripts/optimize-images.mjs.
// ---------------------------------------------------------------------------

const desktop = 'Desktop browser, viewport 1600 × 900 or larger (the existing shots are about 1870 × 950).'

export const romishImages = [
  {
    id: 'romish-landing',
    file: 'romish-landing.png',
    alt: 'Romish landing page: the headline "The home of competitive CS2", a Sign in with Steam button and a preview of the Play page',
    caption: 'The landing page. Sign-in is Steam only.',
    aspect: '16 / 9',
    size: '1920 × 1080',
    capture: 'Landing page, signed out, desktop at 1600px wide or more. Whole first screen, no cookie banner.',
    browser: true,
  },
  {
    id: 'romish-dashboard',
    file: 'romish-dashboard.png',
    alt: 'Romish Play page: a rank card with Elo and an Elo chart on the left, party slots and a Find Match button in the centre, and the Live matches list below',
    caption: 'The Play page: party slots, the Find Match button, rank and Elo history, and live matches.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Play page (/dashboard): Find Match button, party slots, rank card with the Elo chart, and at least one live match card if you can. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-ready-check',
    file: 'romish-ready-check.png',
    alt: 'The "Match found" ready check: 18 seconds left to accept, 4 of 10 players accepted, and an Accept button',
    caption: 'Ten players found: everyone has 25 seconds to accept.',
    aspect: '446 / 478',
    size: 'The modal alone, cropped, about 450 × 480',
    capture: 'The "Match found" ready check modal, cropped to the modal, with the countdown running and a few players accepted.',
    browser: false,
    maxWidth: '360px',
  },
  {
    id: 'romish-draft',
    file: 'romish-draft.png',
    alt: "Captain draft, pick 3 of 8: Team Alpha has three players, Team Beta's captain is picking with 18 seconds left, and six players are still available",
    caption: 'The captain draft. The server picks at random if the clock runs out.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Captain draft mid-pick: both team columns visible, the timer running. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-veto',
    file: 'romish-veto.png',
    alt: 'Map veto, ban 4 of 6: Dust II, Inferno and Nuke are banned, and the captain chooses from the four maps left',
    caption: 'The map veto: alternating bans until one map is left.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Map veto with some maps banned and the turn timer running (the current shot shows the timer at 0). ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-setup',
    file: 'romish-setup.png',
    alt: 'Server setup for a match on Mirage: "Creating server" and "Configuring match" are done and "Almost ready" is in progress, between the two team rosters',
    caption: 'Server setup, shown while the platform starts and configures the game server.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Server setup screen with the progress steps. Optionally a second shot of the connect screen, with the IP and password hidden. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-live',
    file: 'romish-live.png',
    alt: 'Live match on Mirage: Team Alpha leads 13 to 9, with the server address blurred, copy buttons and a Reconnect button between the rosters',
    caption: 'A live match. The score updates round by round from the game server.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Live match with the score and both rosters. Hide the server IP. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-results',
    file: 'romish-results.png',
    alt: "Match results on Mirage: Team Alpha wins 13 to 9, with each player's K/D/A and Elo change, the match MVP, and Queue again, Back to home and View profile buttons",
    caption: "Results: every player's K/D/A and Elo change, and the match MVP.",
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Results screen with the winner, score, MVP, K/D/A and Elo changes. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-mobile',
    file: 'romish-mobile.png',
    alt: 'Four phone screens of the match flow side by side: the captain draft, the map veto, server setup and the results',
    caption: 'The same match flow on a phone: draft, veto, server setup and results.',
    aspect: '1760 / 924',
    size: 'Built by scripts/compose-mobile.mjs from 390 × 844 phone shots in assets-src/mobile/',
    capture:
      'Phone screens of the match flow at 390px wide (device emulation). Put them in assets-src/mobile/ and run node scripts/compose-mobile.mjs.',
    browser: false,
  },
  {
    id: 'romish-social',
    file: 'romish-social.png',
    alt: "The friends panel: add a friend by name or Steam ID, tabs for online, all, pending and blocked, and one sent request with the other player's name blurred",
    caption: 'The friends panel slides out from any page.',
    aspect: '394 / 440',
    size: 'The top of the panel, cropped, about 400 × 440',
    capture: 'The friends panel open, cropped to the panel. Use seeded test users, or blur real Steam names.',
    browser: false,
    maxWidth: '340px',
  },
  {
    id: 'romish-admin',
    file: 'romish-admin.png',
    alt: 'Admin overview: online, queue and match counters, service health for the database, Redis, Pusher and DatHost, and recent registrations',
    caption: 'The admin overview: live counts and the health of every dependency.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Admin overview or analytics page. Blur player names and Steam IDs. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-match-lab',
    file: 'romish-match-lab.png',
    alt: 'The admin UI Studio: cards that open each real match and queue screen (player draft, map veto, server loading, live match, match summary, match found and more) with simulated data',
    caption: 'UI Studio opens every real screen with simulated data. Match Lab, in the next tab, runs the match rules.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Admin Match Lab mid-run (e.g. team assignment or veto), or the UI Studio with its state controls visible. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-profile',
    file: 'romish-profile.png',
    alt: 'Player profile: Elo 1,000, win rate, match count and a Trust Score of 100 out of 100, with the Steam ID blurred',
    caption: 'Every player starts with a Trust Score of 100.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Player profile showing Elo, the Elo chart and Trust Score. Blur the Steam ID. ${desktop}`,
    browser: true,
  },
  {
    id: 'romish-servers',
    file: 'romish-servers.png',
    alt: 'Admin server health page: latency checks for MongoDB, Redis, Pusher and DatHost, game server status with the address blurred, and owner-only power controls',
    caption: 'Server health in the admin panel. Only the owner can power the real server.',
    aspect: '16 / 9',
    size: '1600 × 900 or larger',
    capture: `Admin → Servers: dependency health and game server status. Blur the server address and the admin URL. ${desktop}`,
    browser: true,
  },
] as const satisfies readonly ImageSlot[]

export type RomishImageId = (typeof romishImages)[number]['id']

export const romishImage = (id: string): ImageSlot | undefined => romishImages.find((s) => s.id === id)

// ---------------------------------------------------------------------------
// Romish case study (/projects/romish)
// Every technical claim below is traceable to the private Romish docs.
// Strings starting with "TODO" are hidden in production and shown as dashed
// placeholders in `npm run dev`.
// ---------------------------------------------------------------------------

export interface Table {
  caption: string
  head: string[]
  rows: string[][]
}

export interface DeepDive {
  id: string
  title: string
  takeaway: string
  problem: string
  did: string[]
  robust: string[]
  snippet?: { label: string; code: string }
  table?: Table
  image?: RomishImageId
}

export interface Lesson {
  title: string
  body: string
  /** Lessons render in production only once confirmed. */
  confirmed: boolean
}

export const romishCaseStudy = {
  seo: {
    title: 'Romish case study: CS2 matchmaking on Next.js | Marius Constantin',
    description:
      'How I built Romish, a CS2 10-player matchmaking platform on Next.js, MongoDB, Redis and Pusher: server-side timers, session locks, automated game servers and Elo.',
    ogImage: '/og/romish.png',
    ogImageAlt: 'Romish case study: a CS2 10-player matchmaking platform',
  },

  hero: {
    eyebrow: 'Case study',
    title: 'Romish',
    tagline:
      'A CS2 10-player matchmaking platform: Steam sign-in, queue, ready check, captain draft, map veto, automated game servers and Elo.',
    meta: [
      { label: 'Role', value: 'Solo full-stack developer' },
      { label: 'Timeline', value: featuredProject.timeline },
      { label: 'Status', value: featuredProject.status },
    ],
    stack: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'MongoDB Atlas + Mongoose',
      'Upstash Redis',
      'Upstash QStash',
      'Pusher',
      'NextAuth v5',
      'Steam OpenID 2.0',
      'DatHost API, FTP, RCON',
      'MatchZy (CS2 plugin)',
      'Stripe',
      'Zod',
      'Pino',
      'Sentry',
      'Jest',
      'Playwright',
      'GitHub Actions',
      'Vercel',
    ],
    image: 'romish-landing' as RomishImageId,
    browserUrl: 'romish.org',
  },

  toc: { title: 'On this page', readingTime: 'min read' },

  tldr: {
    id: 'tldr',
    nav: 'TL;DR',
    eyebrow: 'TL;DR',
    title: 'What I built, and what it shows',
    takeaway: 'Five lines for a quick read. The rest of the page is the detail behind each one.',
    points: [
      {
        lead: 'A full product, end to end.',
        body: 'I designed and built the platform that takes ten players from Steam sign-in to updated Elo, on Next.js 16, React 19 and TypeScript.',
      },
      {
        lead: 'Real-time systems.',
        body: 'Ten people act in sync over Pusher channels, and every deadline runs on the server, so no outcome depends on a browser being open.',
      },
      {
        lead: 'Distributed state.',
        body: 'Redis locks and Lua scripts keep the queue, sessions and timers correct across serverless instances. MongoDB holds the durable record.',
      },
      {
        lead: 'Third-party integrations.',
        body: 'Steam OpenID, DatHost, FTP, RCON, the MatchZy game plugin, Stripe and QStash, with a signature check on every one that calls back in.',
      },
      {
        lead: 'Security and testing.',
        body: 'CSRF, rate limits, CSP and a role-gated admin panel with an audit log. Jest and Playwright in CI, plus bot scripts that play whole matches.',
      },
    ],
  },

  problem: {
    id: 'problem',
    nav: 'The problem',
    eyebrow: 'The problem',
    title: 'Ten people, one match, no admin',
    takeaway: 'Ten people have to act in sync, and any one of them can stall the match.',
    body: "Community CS2 10-mans are usually run by hand. Someone collects ten players, checks who is actually there, balances two teams, runs a map veto in chat, sets up a server, and then updates everyone's rating in a spreadsheet. It's harder to automate than it looks.",
    hard: [
      {
        title: 'Everyone waits on someone',
        body: "Ten accepts, eight picks, six bans. Each step blocks on one person, so the flow has to move on by itself when they don't act.",
      },
      {
        title: 'Anyone can vanish',
        body: 'Players go AFK, close the tab or lose their connection at any point, and the match still needs a clean outcome.',
      },
      {
        title: 'The server has to match the lobby',
        body: 'A real CS2 server has to be started and configured for exactly those ten players on the chosen map, and then report the result back.',
      },
    ],
  },

  journey: {
    id: 'journey',
    nav: 'Player journey',
    eyebrow: 'The player journey',
    title: 'From Find Match to results',
    takeaway: 'Seven phases on one continuous screen, and the server owns every clock.',
    intro:
      'For the player it is one flow. The same map backdrop and frame carry through from the ready check to the results, and every screen is built phone-first.',
    mobileImage: 'romish-mobile' as RomishImageId,
    phases: [
      {
        id: 'find',
        label: 'Find Match',
        clock: 'Solo or party',
        image: 'romish-dashboard' as RomishImageId,
        points: [
          'Queue solo or as a party of up to five. The party leader queues everyone.',
          'Every member is checked before joining: bans, queue access, cooldowns and any other active session.',
          "The Play button follows the player's state: Find Match, Ready Up, a cooldown countdown, or back to their match.",
        ],
      },
      {
        id: 'ready',
        label: 'Ready check',
        clock: '25s',
        image: 'romish-ready-check' as RomishImageId,
        points: [
          'When ten players are found, everyone gets Accept or Decline and a 25-second countdown (admins can change it).',
          'A decline or a no-show sends everyone who accepted back to the front of the queue, keeping their original wait time.',
          'The timeout is resolved on the server, even if nobody has the page open.',
        ],
      },
      {
        id: 'draft',
        label: 'Draft',
        clock: '30s per pick',
        image: 'romish-draft' as RomishImageId,
        points: [
          'Each party captains its own team through its highest-Elo member. With no parties, the two highest-Elo players captain.',
          'Captains pick in the order A A B B A B A B. Party members are already placed on their team.',
          'If a captain runs out of time, the server picks a random available player.',
        ],
      },
      {
        id: 'veto',
        label: 'Veto',
        clock: '20s per ban',
        image: 'romish-veto' as RomishImageId,
        points: [
          'Captains take turns banning maps until one is left, and that map is played.',
          "A missed turn bans a random map, so a captain who leaves can't stall the match.",
          'The game server has been booting in the background since the match was created.',
        ],
      },
      {
        id: 'setup',
        label: 'Server setup',
        clock: '3 min cap',
        image: 'romish-setup' as RomishImageId,
        points: [
          'The platform starts the server, uploads a match config for these ten players and loads it, with no human involved.',
          'Only the ten players see the connect details: the address, copy buttons and a steam:// link.',
          'If setup fails twice or takes over 3 minutes, the match is cancelled with no penalties and all ten go back to the front of the queue.',
        ],
      },
      {
        id: 'live',
        label: 'Live',
        clock: 'MatchZy',
        image: 'romish-live' as RomishImageId,
        points: [
          'The MatchZy plugin runs the knife round, warmup, match and overtime on the game server.',
          'The score updates round by round from a signed webhook, and anyone signed in can spectate.',
          'A player who disconnects has 5 minutes to reconnect before it counts as an abandon.',
        ],
      },
      {
        id: 'results',
        label: 'Results',
        clock: 'Elo applied',
        image: 'romish-results' as RomishImageId,
        points: [
          "The results screen shows the winner, score, MVP, K/D/A and every player's Elo change.",
          'Every player is released from the match at once, so Queue again works straight away.',
          'The game server is stopped a minute later if no other match needs it.',
        ],
      },
    ],
  },

  deepDives: {
    id: 'deep-dives',
    nav: 'Engineering',
    eyebrow: 'Engineering deep dives',
    title: 'What made it harder than a CRUD app',
    takeaway: 'Six problems, each with the problem, what I built, and why it holds up.',
    labels: { problem: 'The problem', did: 'What I built', robust: 'Why it holds up' },
    items: [
      {
        id: 'dd-timers',
        title: 'Server-side timers',
        takeaway: 'Timeouts are decided on the server, exactly once, whether or not anyone has the page open.',
        problem:
          'A match has eight kinds of deadline: ready checks, turns, setup and result timeouts, abandons, a live score poller and the server release. If browsers decided them, one closed tab could freeze a match and two open tabs could fire the same timeout twice.',
        did: [
          'Every deadline lives in one Redis sorted set: the member is the task, the score is when it is due. Scheduling the same task again just moves its deadline.',
          'A Lua script reads the due tasks and removes them in one step, so each task goes to exactly one caller, however many instances are sweeping.',
          'On a long-running server, a sweeper runs every 2 seconds, holding a short Redis lease so only one instance sweeps at a time.',
          'On serverless hosting, scheduling a deadline also publishes a delayed QStash message that wakes a signed endpoint one second after it is due.',
        ],
        robust: [
          'An early, duplicate or stale wake-up finds nothing to do, because the Redis set is the source of truth.',
          'A task that throws is rescheduled 10 seconds later instead of being lost.',
          'Handlers re-check state before acting. An auto-pick is a conditional write on the pick index, so it lands once even if the sweeper and several open pages report the same timeout.',
        ],
        snippet: {
          label: 'Pseudocode',
          code: `schedule(task, dueAt):
  ZADD deadlines dueAt task        # same task again = new deadline
  if serverless:
    qstash.publish("/api/cron/match-tick", delay = dueAt - now + 1s)

sweep():                           # every 2s, or on a QStash wake-up
  tasks = EVAL takeDue(now)        # Lua: read due members + remove them, atomically
  for task in tasks:
    try:   run(task)               # re-checks the match before acting
    catch: schedule(task, now + 10s)`,
        },
      },
      {
        id: 'dd-session',
        title: 'One active session per player',
        takeaway: 'A player can only be in one flow at a time, and a stale lock can never trap them.',
        problem:
          'A double click, two tabs, or a party leader queueing while a member joins somewhere else could put one player in two matches. Nine people waiting on someone who is busy elsewhere is a dead match.',
        did: [
          'Each player has a session record in Redis: what they are in (queue, ready check or match), the phase, and its deadline.',
          'Joining the queue claims the lock for the whole unit, solo or party, in one Lua call. Either every member gets it or nobody does.',
          'Every way into a flow refuses a player who is already in one, and names who is blocking ("Viper is currently in a match").',
          'One browser tab drives the session. Other tabs can watch, and show "Session active in another window" with a Use this tab button.',
        ],
        robust: [
          'Reads heal the lock. Every read checks it against the queue, the ready check and the match: a lock whose match is over is released on the spot, and a player who is really in a match gets their lock back.',
          'Every way out (result, forfeit, any cancel) goes through one release function, so no path forgets a player.',
          'Refreshing, bookmarking or typing a URL lands on the real phase page through server-side redirects.',
        ],
        snippet: {
          label: 'Pseudocode',
          code: `claimSessions(members, session):   # one Lua script: all or nothing
  for m in members:
    if EXISTS session:{m}: return CONFLICT(m)
  for m in members:
    SET session:{m} session EX safetyTtl
  return OK

readSession(user):                  # every read reconciles
  lock  = GET session:{user}
  truth = queued(user) or readyCheck(user) or liveMatch(user)
  if lock and not truth: DEL session:{user}      # match over: free them
  if truth and not lock: SET session:{user} ...   # really playing: restore`,
        },
      },
      {
        id: 'dd-server',
        title: 'Automating the game server',
        takeaway: 'From the last ban to a configured CS2 server with no human involved, and a clean exit if it fails.',
        problem:
          'Before anyone can play, a real CS2 server has to be running, locked to exactly these ten players, on the map the veto chose, and able to report the result back. Every one of those steps can fail.',
        did: [
          'Start early. The DatHost server is started when the match is created, so it has usually booted by the last ban. Setup checks again and waits for the boot if needed.',
          'Configure. The app builds a MatchZy match config (teams, Steam IDs, map, a knife round for sides) and a whitelist of the ten Steam IDs, and uploads them over FTP.',
          'Load. It runs the config over RCON, reads the server address, and flips the match to live only if it is still in setup, with a conditional update.',
          'Report back. MatchZy posts going live, every round, disconnects and the final result to a webhook that checks a shared secret in constant time.',
        ],
        robust: [
          'One automatic retry after 5 seconds, and a 3-minute cap on the whole setup.',
          'If it still fails, the match is cancelled with no penalty for anyone, and all ten players go back to the front of the queue.',
          'A setup that finishes after its match was cancelled never goes live. The server is released instead.',
          'Finishing a match is idempotent. MatchZy can send both of its end-of-match events and Elo is still applied once.',
        ],
        snippet: {
          label: 'The match config MatchZy loads (trimmed)',
          code: `{
  "matchid": 1042,
  "team1": { "name": "<alpha captain>", "players": { "<steam64>": "<name>" } },
  "team2": { "name": "<beta captain>",  "players": { "<steam64>": "<name>" } },
  "num_maps": 1,
  "maplist": ["de_mirage"],
  "map_sides": ["knife"],
  "players_per_team": 5,
  "cvars": {
    "matchzy_remote_log_url": "<app>/api/webhooks/matchzy",
    "matchzy_remote_log_header_key": "X-MatchZy-Secret"
  }
}`,
        },
        image: 'romish-servers',
      },
      {
        id: 'dd-fair-play',
        title: 'Fair play',
        takeaway: 'Rules that punish bad behaviour, not bad luck.',
        problem:
          "Teams have to be balanced and captains chosen fairly, and players who dodge or abandon need a consequence. None of that should punish anyone for the platform's own failures.",
        did: [
          'Matchmaking takes the oldest waiting group first. A party is taken whole or not at all and never larger than one team, with an optional cap on the Elo spread. It is a pure, unit-tested function shared with the admin Match Lab.',
          'Captains: each party goes on one team and its highest-Elo member captains it. Otherwise the two highest-Elo solo players captain.',
          "Elo: each side's rating is its team average, K = 32, and every player on a side gets that side's change, so the result is zero-sum.",
          'Cooldowns and Trust Score escalate within a rolling 24 hours. Admins can lift a cooldown, and the offense still counts toward the next one.',
        ],
        robust: [
          'Server setup failures, admin cancels and missing results never penalise anyone.',
          'Each player is penalised at most once per match.',
          'Every timer, cooldown and penalty number lives in one rules file.',
        ],
        snippet: {
          label: 'Elo after a match',
          code: `ratingA   = average(team A Elo)
ratingB   = average(team B Elo)
expectedA = 1 / (1 + 10 ^ ((ratingB - ratingA) / 400))
changeA   = round(32 * (resultA - expectedA))   # resultA: 1 win, 0 loss
changeB   = -changeA                           # zero-sum: team B mirrors it`,
        },
        table: {
          caption: 'Penalties within a rolling 24 hours. Trust Score starts at 100 and never drops below 0.',
          head: ['Offense', 'Queue cooldown (1st, 2nd, 3rd and later)', 'Trust Score'],
          rows: [
            ['Decline a ready check', '5 min, 15 min, 1 h', 'No change'],
            ['Miss a ready check', '5 min, 15 min, 1 h', 'No change'],
            ['Abandon after accepting', '5 min, 15 min, 1 h', '-5, -10, -20'],
            ['Captain turn timeout', 'None', '-5 each, from the 3rd'],
          ],
        },
        image: 'romish-profile',
      },
      {
        id: 'dd-realtime',
        title: 'Realtime and privacy',
        takeaway: "Everyone sees the same state instantly, and nobody sees what they shouldn't.",
        problem:
          'Ten players, spectators and admins all watch the same match. Picks and bans have to appear instantly, but connect details, party chat and direct messages must only reach the right people.',
        did: [
          'Pusher channels are split by audience: public channels carry only public state, private channels carry per-user, party and team data, and a presence channel runs global chat.',
          'The server authorises private channels by checking membership (your own user channel, your party, your team in this match) and the CSRF token.',
          'The browser keeps one subscription per channel, however many components listen to it.',
          'Spectators get an allow-list of match fields. Any field added to the model later stays hidden until it is listed.',
        ],
        robust: [
          'No public event carries connect details, IPs or passwords. When the server is ready, players refetch the match, and only the ten players get the address back.',
          "Draft, veto and server setup can't be spectated at all.",
          "Pages resync on focus, on reconnect and on a slow poll, so a dropped connection never leaves a stale screen. Clocks use the server's time, so a refresh shows the same number.",
        ],
        table: {
          caption: 'Pusher channels by audience.',
          head: ['Channel', 'Type', 'Carries'],
          rows: [
            ['queue, match-{id}, live-matches', 'Public', 'Queue changes, picks, bans and scores. Never private data.'],
            ['private-user-{id}', 'Private', 'Session updates, party, friends, notifications and DMs'],
            ['private-party-{id}, private-team-{match}-{side}', 'Private', 'Party chat and team chat'],
            ['presence-global-chat', 'Presence', "Global chat, with who's online"],
          ],
        },
      },
      {
        id: 'dd-security',
        title: 'Security',
        takeaway: 'Every way into the app is checked: browsers, game servers, payments and the scheduler.',
        problem:
          'The app takes requests from browsers and from four machine callers (the game server, DatHost, Stripe and QStash), and it has an admin panel that can ban players and power a real game server.',
        did: [
          'A proxy runs before every request. It applies rate limits (stricter on login and queue join, plus per-action limits on invites, friend requests and chat) and checks a CSRF double-submit token on every mutating API call.',
          'Webhooks skip CSRF and prove who they are instead: MatchZy with a shared secret compared in constant time, DatHost with an HMAC, Stripe with its signature, and QStash with a signed JWT that supports key rotation.',
          'Steam sign-in is verified server-side with Steam. Sessions are stored in the database behind a host-only, HttpOnly cookie.',
          'Security headers: a Content Security Policy, X-Frame-Options DENY, nosniff, and strict referrer and permissions policies.',
          'Admin routes are gated by role (moderator, admin, owner), and every admin change is written to an audit log. Config changes are stored as a before and after diff.',
        ],
        robust: [
          'Request bodies are validated with Zod.',
          'User input in database search queries is escaped.',
          'Blocks are never revealed: a blocked player\'s card just returns "not found".',
        ],
      },
    ] satisfies DeepDive[],
  },

  architecture: {
    id: 'architecture',
    nav: 'Architecture',
    eyebrow: 'Architecture',
    title: 'How it fits together',
    takeaway: 'One Next.js app, two stores, and managed services for realtime, timers, game servers and payments.',
    intro:
      'Romish is a single Next.js app. Route handlers call service modules that own the rules, and the rule modules themselves (matchmaking, draft, veto, Elo) never touch a database, so the API, the admin Match Lab and the tests all run the same code.',
    diagramTitle: 'Romish system overview',
    diagramDesc:
      'The browser talks to the Next.js app over HTTPS and receives live updates from Pusher. The app stores durable data in MongoDB and live state in Redis, schedules wake-ups through QStash, pushes events through Pusher, drives the CS2 server through DatHost, and uses Steam for sign-in and Stripe for billing. The CS2 server reports results back to the app through the MatchZy webhook, and QStash wakes the app when a deadline is due.',
    diagram: {
      nodes: {
        browser: { name: 'Browser', detail: 'React pages' },
        pusher: { name: 'Pusher', detail: 'realtime channels' },
        app: { name: 'Next.js app', detail: 'App Router, TypeScript' },
        mongo: { name: 'MongoDB Atlas', detail: 'durable records' },
        redis: { name: 'Upstash Redis', detail: 'queue, locks, timers' },
        qstash: { name: 'QStash', detail: 'deadline wake-ups' },
        dathost: { name: 'DatHost', detail: 'API, FTP, RCON' },
        steam: { name: 'Steam', detail: 'OpenID, Web API' },
        stripe: { name: 'Stripe', detail: 'checkout, webhooks' },
        cs2: { name: 'CS2 server', detail: 'MatchZy plugin' },
      },
      layers: ['proxy: rate limits, CSRF, page guard', 'route handlers → lib/ services', 'timer sweeper (long-running hosts)'],
      edges: {
        https: 'HTTPS',
        events: 'events',
        socket: 'websocket',
        socketShort: 'push',
        setup: 'start, config',
        webhook: 'results webhook',
      },
    },
    state: {
      title: 'Where state lives',
      rule: 'If it must survive a restart or feed history, it goes in MongoDB. If it changes every few seconds or expires on its own, it goes in Redis.',
      table: {
        caption: 'Where state lives',
        head: ['Store', 'Holds', 'Why'],
        rows: [
          [
            'MongoDB',
            'Users, matches, friendships, messages, notifications, reports, roles, audit and system logs, runtime config',
            'Durable and queried by history',
          ],
          [
            'Redis',
            'Queue, ready checks, live parties, presence, session locks, cooldowns, timers, live scores',
            'Changes every few seconds or expires on its own',
          ],
        ],
      } satisfies Table,
    },
  },

  failure: {
    id: 'failure',
    nav: 'Handling failure',
    eyebrow: 'Handling failure',
    title: 'What happens when things go wrong',
    takeaway: "Every failure I could find has a defined outcome, and the platform's own faults never cost a player anything.",
    table: {
      caption: 'Failure modes and how Romish handles each one',
      head: ['Failure', 'What happens'],
      rows: [
        [
          'Nobody answers the ready check',
          'Resolved on the server at the deadline. No-shows get a cooldown, and everyone who accepted goes back to the front of the queue.',
        ],
        [
          'A captain goes AFK or disconnects',
          'The server picks or bans at random every 30 or 20 seconds, so the match never deadlocks. Trust Score drops from the 3rd timeout in 24 hours.',
        ],
        [
          'A player leaves the site during draft or veto',
          'Presence is checked every 15 seconds. Five minutes away counts as an abandon: a cooldown and a Trust Score penalty.',
        ],
        [
          "The game server won't start, or FTP or RCON fails",
          'One retry, then the match is cancelled with no penalty and all ten players are requeued at the front.',
        ],
        [
          'Setup finishes after the match was cancelled',
          'The conditional update refuses to go live. The match stays cancelled and the server is released.',
        ],
        [
          'MatchZy never reports a result',
          'After 3 hours the match is cancelled and flagged for an admin to review. Nobody is penalised.',
        ],
        ['MatchZy sends the final result twice', 'Finishing a match is idempotent: the second call returns early, so Elo is applied once.'],
        [
          'Two admins cancel the same match at once',
          'A conditional status update lets one of them win. The other is told the match has already ended.',
        ],
      ],
    } satisfies Table,
  },

  platform: {
    id: 'platform',
    nav: 'Beyond the match',
    eyebrow: 'Beyond the match',
    title: 'The platform around it',
    takeaway: 'Social features, a full admin panel and billing sit around the match flow.',
    cards: [
      {
        title: 'Social',
        image: 'romish-social' as RomishImageId | undefined,
        points: [
          'Friends with live presence (online, in queue, in party, in match). One record per pair, so one-sided states are impossible.',
          'Parties of up to five, with invites by name search, from friends, or through a 15-minute invite link.',
          'Chat in four channel types (global, party, team and DMs) with unread badges, edits, reports, slow mode and a profanity filter.',
          'Notifications with toasts and inline actions that clear in every tab once acted on.',
        ],
      },
      {
        title: 'Admin panel',
        image: 'romish-admin' as RomishImageId | undefined,
        points: [
          'Moderation: reports with evidence, bans, chat mutes and player notes.',
          'Live config without a deploy: queue rules, party size, ready-check time, maintenance mode and the site banner, pushed to open tabs.',
          'Analytics: player, matchmaking and server charts, retention cohorts and the Elo distribution.',
          'Every admin action recorded in an audit log.',
        ],
      },
      {
        title: 'Billing',
        image: undefined as RomishImageId | undefined,
        points: [
          'Stripe Checkout for three monthly tiers.',
          'A signed Stripe webhook activates, renews and cancels subscriptions, and players can cancel themselves.',
          'Admins can grant access by hand, and an open beta switch lets everyone queue.',
        ],
      },
    ],
  },

  testing: {
    id: 'testing',
    nav: 'Testing',
    eyebrow: 'Testing and tooling',
    title: 'How I know it works',
    takeaway: 'Bots play whole matches, so the failure paths get tested without ten real people.',
    image: 'romish-match-lab' as RomishImageId,
    items: [
      {
        title: 'Jest unit and API tests',
        body: 'The pure rules (matchmaker, Elo, draft and veto), the session lock, scheduler, penalties, server setup and spectator privacy, plus route handlers for the queue, matches, sessions and admin role gates.',
      },
      {
        title: 'A fake Redis that runs the real Lua',
        body: "An in-memory stand-in for Upstash with strings, sets, sorted sets, hashes, pipelines and the app's own Lua scripts, so the atomic claims are tested as written.",
      },
      {
        title: 'Bot scripts',
        body: 'Scripts that act as seeded test users and play through the flow. The failure-path script runs 40 checks: ready-check timeouts, declines, setup failure and requeue, captain timeouts, two admins cancelling at once, and spectator privacy. It fast-forwards deadlines through the production code, so it never waits on real clocks.',
      },
      {
        title: 'CI on every push',
        body: 'GitHub Actions runs lint, the type-check, npm audit, Jest with coverage, a Playwright smoke set and a production build.',
      },
      {
        title: 'Match Lab and UI Studio',
        body: 'Admin tools that run each match stage in a sandbox against fake players using the production rule functions, and render every real screen with simulated data, each state reachable by URL.',
      },
    ],
  },

  lessons: {
    id: 'lessons',
    nav: 'Lessons',
    eyebrow: 'Lessons learned',
    title: 'What broke, and what I changed',
    takeaway: 'The bugs that taught me the most, and the rule each one left behind.',
    items: [
      {
        title: 'One definition for the session cookie',
        body: 'Cookie settings drifted apart between NextAuth, the Steam login route and the user endpoint, and logins failed silently: players signed in, then looked signed out on the next page. Now all three read one shared definition.',
        confirmed: true,
      },
      {
        title: "Don't log players out everywhere",
        body: 'Deleting other sessions on login looked like good hygiene, but it signed players out on every other device. I removed it and left a comment in the code so it does not come back.',
        confirmed: true,
      },
      {
        title: 'Load images in batches',
        body: 'Loading a dozen large map images at once caused connection resets in development. Map grids now load in small, staggered batches.',
        confirmed: true,
      },
      {
        title: 'Let the server own the clock',
        body: 'When timers ran in the browser, what happened at a deadline depended on who had the page open. Moving every deadline to the server made outcomes the same whether or not anyone is watching.',
        confirmed: true,
      },
    ] satisfies Lesson[],
  },

  status: {
    id: 'status',
    nav: 'Status',
    eyebrow: "Status and what's next",
    title: 'Where it is now',
    takeaway: 'Pre-launch. The match flow works end to end, from queue to results.',
    body: 'The full match flow is built and covered by tests and bot scripts. Before opening it up, I am working on:',
    next: [
      'Map pools set from the admin panel and used in every veto',
      'A priority queue for paid tiers',
      'Complete GDPR data export and account deletion',
      'Tournaments',
    ],
  },

  cta: {
    title: 'Want a walkthrough of the code?',
    body: "The repo is private, but I'm happy to walk through it on a call: the timers, the session lock, or anything else on this page.",
    contact: 'Get in touch',
    resume: 'View resume',
  },
}

/** Keys that aren't read as prose: metadata, code, screen-reader-only text and TODO notes. */
const unread = new Set(['seo', 'code', 'diagramDesc', 'todo', 'id', 'nav', 'image', 'mobileImage'])

/** Words across the prose in a value, for reading-time estimates. */
export function countWords(value: unknown): number {
  if (typeof value === 'string') return shown(value) ? value.split(/\s+/).filter(Boolean).length : 0
  if (Array.isArray(value)) return value.reduce<number>((n, v) => n + countWords(v), 0)
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce<number>((n, [k, v]) => (unread.has(k) ? n : n + countWords(v)), 0)
  }
  return 0
}
