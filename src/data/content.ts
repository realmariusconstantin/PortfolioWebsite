/**
 * Every piece of copy on the site lives here. Components only render this data.
 *
 * Conventions:
 * - Strings starting with "TODO:" are placeholders. Components hide list items
 *   whose text starts with "TODO:" and projects with `draft: true`, so nothing
 *   unfinished reaches the live site. Search this file for "TODO" to find them.
 * - No em dashes in copy. Use commas, full stops or "to".
 */
import type { imageMeta } from './images.generated'

export type ImageKey = keyof typeof imageMeta

export interface Screenshot {
  image: ImageKey
  alt: string
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
    'Full-stack developer in Ireland building real-time web apps with Vue, Node.js and TypeScript. Creator of Romish, a CS2 10-man matchmaking platform.',
  ogImage: '/og/home.png',
  resume: '/Marius-Constantin-CV.pdf',
  // Formspree form used by the contact section (same endpoint as the old site).
  formEndpoint: 'https://formspree.io/f/xeejgwqd',
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

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: 'Full-Stack Developer',
  headline: 'I build full-stack web apps, from real-time interfaces to the auth and data layers behind them.',
  intro:
    'My main stack is Vue, Node.js and TypeScript. My latest project, Romish, runs CS2 10-man matches end to end: sign-in, queue, draft, map veto and Elo.',
  primaryCta: { label: 'View projects', href: '#work' },
  secondaryCta: { label: 'Get in touch', href: '#contact' },
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const featuredProject: Project & { outcomes: string[]; timeline: string; status: string } = {
  slug: 'romish',
  title: 'Romish',
  summary: 'CS2 10-man matchmaking platform that automates queue, draft, map veto and Elo.',
  status: 'Public beta',
  timeline: 'March 2025 to present',
  stack: ['Vue.js', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'Steam OpenID', 'Discord OAuth2', 'JWT'],
  outcomes: [
    'Replaces spreadsheets and manual admin with one automated flow: queue, ready-check, captain draft, map veto, match.',
    'Players sign in with Steam and link Discord, so every account maps to a real identity.',
    'Elo ratings update after every match and feed back into balanced team drafts.',
    'Admin panel for managing users and matches, with search, status filters and bans.',
  ],
  links: [{ label: 'Live site', href: 'https://romish.org', external: true }],
  repoNote: 'Private repo, walkthrough on request',
  caseStudy: '/projects/romish',
  image: { image: 'romish-veto', alt: 'Romish map veto screen showing a grid of CS2 maps for teams to ban in turn' },
}

export const projects: Project[] = [
  {
    slug: 'portfolio',
    title: 'This portfolio',
    summary:
      'Pre-rendered Vue site with all copy driven from one typed content file, light and dark themes, and a Lighthouse budget of 95+.',
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
  { group: 'Frontend', items: ['Vue.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'Java', 'Spring Boot', 'REST APIs'] },
  { group: 'Data', items: ['MongoDB', 'MySQL', 'SQL'] },
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
    "I'm a third-year BSc Mobile & Web Computing student at the Technological University of the Shannon (TUS Midlands Midwest). I grew up in Romania, live in Ireland, and work in English and Romanian.",
    'Romish came from a real problem: organising CS2 10-mans meant tracking players, balancing teams and updating Elo by hand. I designed and built the platform that now automates all of it, from Steam sign-in to the final score.',
    "Alongside my degree I work part-time in a busy customer-facing team, where I've also trained new staff. It's taught me to stay calm under pressure, communicate clearly and be someone the team can rely on.",
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
    // TODO: confirm start year and expected graduation (CV says 2023 to present).
    period: '2023 to present',
    location: 'Ireland',
    // TODO: confirm the module areas below match your course.
    points: [
      'Third year. Coursework across web and mobile development, Java, databases and networking.',
      'TODO: notable module, grade or team project worth mentioning.',
    ],
  },
  {
    kind: 'Work',
    // TODO: CV says "Manager". Confirm the job title you want shown here and on your CV.
    title: 'Part-time team member',
    org: "Supermac's",
    period: '2022 to present',
    location: 'Nenagh, Ireland',
    points: [
      'Customer-facing role in a busy, fast-paced team, held alongside full-time study.',
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
