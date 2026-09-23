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

// ---------------------------------------------------------------------------
// Romish case study (/projects/romish)
// Items starting with "TODO" are hidden on the live site and shown as dashed
// placeholders in `npm run dev`, so you can see where they go.
// ---------------------------------------------------------------------------

export interface CaseStudyFeature {
  id: string
  title: string
  image: Screenshot
  body: string
  points: string[]
}

export const romishCaseStudy = {
  seo: {
    title: 'Romish case study: CS2 10-man matchmaking | Marius Constantin',
    description:
      'How I designed and built Romish, a CS2 10-man platform with Steam and Discord sign-in, real-time queue, captain draft, map veto and Elo ratings.',
    ogImage: '/og/romish.png',
  },
  title: 'Romish',
  tagline:
    'A CS2 10-man matchmaking platform that takes a match from queue to final score with no admin in the loop.',
  meta: [
    { label: 'Role', value: 'Solo full-stack developer' },
    { label: 'Timeline', value: featuredProject.timeline },
    { label: 'Status', value: featuredProject.status },
  ],
  heroImage: {
    image: 'romish-draft',
    alt: 'Romish captain draft screen: two captains on either side and a grid of available players in the middle',
  } satisfies Screenshot,

  problem: {
    title: 'The problem',
    paragraphs: [
      "Community 10-man matches in Counter-Strike 2 were organised by hand. Someone had to collect ten players, check who was actually ready, balance two teams, run a map veto in chat, and then update everyone's rating in a spreadsheet after the game.",
      'Every step depended on an admin being online, and every step was a chance for arguments about unfair teams or lost results.',
    ],
  },

  solution: {
    title: 'The solution',
    intro: 'Romish automates the whole lifecycle of a match. It rests on four ideas.',
    pillars: [
      {
        title: 'Verified players',
        body: 'Sign-in goes through Steam, and players link Discord. Every account is tied to a real Steam identity, which cuts out throwaway accounts.',
      },
      {
        title: 'Automated flow',
        body: 'Queue, ready-check, draft, veto and match run on their own. Admins only step in when something goes wrong.',
      },
      {
        title: 'Fair teams',
        body: 'Every player has an Elo rating that moves after each match, so drafts and results reflect real skill over time.',
      },
      {
        title: 'Real-time updates',
        body: 'WebSockets push every queue change, pick and ban to all ten players instantly. Nobody has to refresh.',
      },
    ],
  },

  walkthrough: { eyebrow: 'Walkthrough', title: 'From sign-in to final score' },
  technical: { eyebrow: 'Under the hood', title: 'Technical highlights' },

  features: [
    {
      id: 'auth',
      title: 'Secure sign-in with Steam and Discord',
      image: {
        image: 'romish-auth',
        alt: 'Steam sign-in page asking the user to sign in to api.romish.org with their Steam account',
      },
      body: "Players sign in on Steam's own page through OpenID, so Romish never handles a Steam password. They then link Discord through OAuth2, and the API issues a JWT for the session.",
      points: [
        'Steam OpenID for game identity, handled by the API at api.romish.org',
        'Discord OAuth2 to connect players to the community server',
        'JWT-based sessions for the API and WebSocket connection',
        'TODO: anything else worth calling out, e.g. token storage or role sync from Discord',
      ],
    },
    {
      id: 'admin',
      title: 'Command center for admins',
      image: {
        image: 'romish-admin',
        alt: 'Romish admin dashboard with counters for total users, active matches, queued players and online users, above a user management table',
      },
      body: 'Admins get one screen for the whole platform: live counters at the top, then tabs for admin controls, match control, user management, recent activity and a testing mode.',
      points: [
        'Live counts of users, active matches, queued players and who is online',
        'Search users by name or Steam ID and filter by online, in queue or banned',
        'Per-user actions, including bans, restricted to admin accounts',
        // TODO: confirm. Inferred from the Testing Mode tab and the bot players in the screenshots.
        'Testing mode for running the flow end to end without ten real players',
      ],
    },
    {
      id: 'queue',
      title: 'One-click queue with ready-check',
      image: {
        image: 'romish-queue',
        alt: 'Romish queue screen with five player slots, region Europe, game mode 5v5, and a 25 second queue timer',
      },
      body: "Joining is a single click. The lobby updates live as players join or leave. Once ten are in, everyone has to accept a ready-check before the draft starts, so one AFK player can't stall the match.",
      points: [
        'Live lobby showing who is queued, the region and the game mode',
        'Queue timer and one-click leave',
        'Ready-check before the draft begins',
        'TODO: what happens when someone declines or misses the ready-check',
      ],
    },
    {
      id: 'draft',
      title: 'Captain draft, 1-2-2-2-1',
      image: {
        image: 'romish-draft',
        alt: 'Romish captain draft screen showing whose turn it is to pick, pick 1 of 8, and the remaining available players',
      },
      body: "Two captains pick the teams in a 1-2-2-2-1 order. After the first pick, each captain picks two in a row, which evens out the first-pick advantage. Every pick shows up for all players the moment it's made.",
      points: [
        'Eight picks in 1-2-2-2-1 order, with a clear turn indicator',
        'Players move from the pool to a team as they are picked',
        'TODO: how captains are chosen (highest Elo, random, other)',
        'TODO: pick timer and what happens if a captain runs out of time',
      ],
    },
    {
      id: 'veto',
      title: 'Map veto with side selection',
      image: {
        image: 'romish-veto',
        alt: 'Romish map veto screen showing twelve CS2 maps and a banner saying it is your turn to ban',
      },
      body: "The captains take turns banning maps until one is left, then sides are chosen for it. It's the flow competitive players already know, without a spreadsheet or a chat thread.",
      points: [
        'Turn-based bans with a clear "your turn" indicator',
        'Remaining map count shown throughout',
        'Side selection for the final map',
        'TODO: map pool rules (fixed list or admin-configurable)',
      ],
    },
    {
      id: 'match',
      title: 'Match tracking and results',
      image: {
        image: 'romish-match',
        alt: 'Romish match complete screen: Team Alpha wins 13 to 11 on Mirage, with both five-player rosters and captains marked',
      },
      body: "While the match is being played, its status is shown to every player. When it ends, the result page shows the winner, final score, map and both rosters, and every player's Elo is updated.",
      points: [
        'Match status visible to all ten players',
        'Result summary with score, map, rosters and captains',
        'Elo updated automatically from the result',
        'TODO: how results get in (admin entry, player report, or game server integration)',
      ],
    },
  ] satisfies CaseStudyFeature[],

  architecture: {
    title: 'Architecture',
    intro:
      'A Vue single-page app talks to a Node.js and Express API over REST for regular requests and over WebSockets for live match state. MongoDB stores users, matches and ratings. Steam and Discord handle identity.',
    diagram: {
      client: { kind: 'Client', name: 'Vue.js SPA', detail: 'romish.org' },
      clientToApi: ['REST over HTTPS', 'WebSocket events'],
      api: { kind: 'API', name: 'Node.js + Express', detail: 'api.romish.org', tags: ['JWT auth', 'Match state', 'Elo'] },
      apiToDb: ['Reads and writes'],
      db: { kind: 'Database', name: 'MongoDB', detail: 'users, matches, ratings' },
      apiToIdentity: 'Identity',
      identity: [
        { name: 'Steam', detail: 'OpenID 2.0' },
        { name: 'Discord', detail: 'OAuth2' },
      ],
    },
    notes: [
      'TODO: hosting (where the frontend, API and database run)',
      'TODO: WebSocket library (Socket.IO or ws) and how rooms or channels map to matches',
    ],
  },

  auth: {
    title: 'How sign-in works',
    steps: [
      'The player clicks "Sign in with Steam" and is sent to Steam\'s OpenID login page.',
      "Steam redirects back to the API with a signed response. The API verifies it and reads the player's Steam ID.",
      'The player links Discord through the OAuth2 authorisation flow.',
      'The API creates or updates the user in MongoDB and issues a JWT, which the app uses for API requests and the WebSocket connection.',
      'TODO: where the JWT is stored (httpOnly cookie or local storage), its lifetime, and how refresh works',
    ],
  },

  realtime: {
    title: 'Real-time design',
    // TODO: confirm these match your implementation (server validates each action and broadcasts state).
    paragraphs: [
      "Queue joins, ready-checks, draft picks and map bans are all events. The client sends an action, the server checks it is valid for the current state (for example, that it's really this captain's turn), updates the match, and broadcasts the new state to everyone in that match.",
      'Keeping the server as the single source of truth means two players can never see different teams or different bans.',
      'TODO: reconnect handling, e.g. what a player sees if they refresh mid-draft',
    ],
  },

  elo: {
    title: 'Elo ratings',
    // TODO: confirm. "Starts at 1000" comes from the admin screenshot, where every new user is on 1000.
    paragraphs: [
      "Every player starts at 1000. After a match, each player's rating moves based on the result and how strong the other team was, using the standard Elo model.",
    ],
    formula: {
      expected: 'E = 1 / (1 + 10^((R_opp − R) / 400))',
      update: "R' = R + K × (S − E)",
      legend: 'R is the player\'s rating, R_opp the opposing team\'s rating, S is 1 for a win and 0 for a loss, and K sets how far one match can move a rating.',
    },
    notes: [
      'TODO: the K-factor you use, and whether it changes for new players',
      'TODO: how a team rating is formed (e.g. the average of the five players)',
    ],
  },

  challenges: {
    title: 'Challenges and what I learned',
    items: [
      'TODO: hardest technical problem (e.g. keeping draft state in sync when players disconnect) and how you solved it',
      'TODO: something you would design differently if you started again',
      'TODO: what running a public beta with real players taught you',
    ],
  },

  cta: {
    title: 'Work with me',
    body: "I'm looking for full-stack roles, internships and graduate positions. If Romish is the kind of work your team does, I'd like to hear from you.",
  },
}
