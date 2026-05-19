export const profile = {
  name: "Jesnar T. Tindogan",
  initials: "JTT",
  role: "Full-Stack Engineer · AI Integration · Project Lead",
  location: "Cebu City, PH",
  email: "tindoganjesnar@gmail.com",
  github: "https://github.com/jsnaur",
  linkedin: "https://www.linkedin.com/in/jesnartindogan",
  resumeHref: "/Tindogan_Resume.pdf",
  status: "Open to SWE internships & AI engineering roles",
  building: ["TaraCSE"],
} as const;

export const sections = [
  { id: "statement", num: "01", title: "Statement", file: "hero.tsx" },
  { id: "exhibit-a", num: "02", title: "Exhibit A", file: "taracse.tsx" },
  { id: "exhibits-bc", num: "03", title: "Exhibits B & C", file: "diptych.tsx" },
  { id: "archive", num: "04", title: "The Archive", file: "archive.tsx" },
  { id: "methodology", num: "05", title: "Methodology", file: "how_i_build.tsx" },
  { id: "closing", num: "06", title: "Closing", file: "contact.tsx" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/* TaraCSE — flagship */
export const taracse = {
  name: "TaraCSE",
  caseNo: "2026-0001",
  tagline: "AI-integrated Civil Service Exam preparation platform.",
  stack: ["Next.js", "TypeScript", "Supabase", "Gemini", "pgvector", "Tailwind"],
  role: "Personal ongoing project — Project Manager",
  period: "April 2026 — Present",
  github: "https://github.com/jsnaur/taracse",
  highlights: [
    "Solo-architected a Next.js + Supabase platform with TypeScript end-to-end.",
    "Personally engineered a custom RAG pipeline using Gemini embeddings + pgvector similarity search.",
    "Self-managed scope, roadmap, and shipping cadence — every commit authored solo.",
    "Hardened AI endpoints with in-memory rate limiting (10 req/min/user) for stability.",
  ],
  desktop: {
    landing: "/projects/taracse/DesktopWeb/TaraCSE_LandingPageWeb.png",
    dashboard: "/projects/taracse/DesktopWeb/TaraCSE_DashboardWeb.png",
    practice: "/projects/taracse/DesktopWeb/TaraCSE_PracticeWeb.png",
    mock: "/projects/taracse/DesktopWeb/TaraCSE_MockWeb.png",
    analytics: "/projects/taracse/DesktopWeb/TaraCSE_AnalyticsWeb.png",
  },
  mobile: {
    landing: "/projects/taracse/MobileWeb/TaraCSE_LandPageMobile.png",
    dashboard: "/projects/taracse/MobileWeb/TaraCSE_DashboardMobile.png",
    practice: "/projects/taracse/MobileWeb/TaraCSE_PracticeMobile.png",
    mock: "/projects/taracse/MobileWeb/TaraCSE_MockMobile.png",
    analytics: "/projects/taracse/MobileWeb/TaraCSE_AnalyticsMobile.png",
  },
} as const;

/* GesturiX */
export const gesturix = {
  name: "GesturiX",
  caseNo: "2025-0002",
  tagline: "Real-time ASL gesture & digit recognition mobile app.",
  stack: ["React Native", "Expo", "Python", "PyTorch"],
  role: "Project Manager & Full-Stack Developer",
  period: "Sept 2025 — Dec 2025",
  github: "https://github.com/jsnaur/GesturiX",
  highlights: [
    "Integrated a trained PyTorch ASL model for on-device, real-time gesture validation.",
    "Designed an interactive Quiz feature delivering immediate, accurate feedback.",
    "Led 4–6 cross-functional developers from ideation to production.",
  ],
  screens: [
    "/projects/gesturix/WelcomeScreen.png",
    "/projects/gesturix/TranslateScreen.png",
    "/projects/gesturix/LearnScreen.png",
    "/projects/gesturix/Pre-QuizScreen.png",
    "/projects/gesturix/MainQuizScreen.png",
  ],
} as const;

/* LYNK */
export const lynk = {
  name: "LYNK",
  caseNo: "2026-0003",
  tagline: "AI-integrated campus questing & social networking app.",
  stack: ["React Native", "Expo", "TypeScript", "Tailwind", "Supabase"],
  role: "Project Manager & Full-Stack Developer",
  period: "Feb 2026 — May 2026",
  github: "https://github.com/jsnaur/lynk",
  highlights: [
    "Engineered backend webhooks powering real-time AI content moderation.",
    "Built algorithm-based social feed mechanics on Supabase + Edge Functions.",
    "Shipped a multi-role product (player, moderator) with a unified design system.",
  ],
  screens: [
    "/projects/lynk/SplashScreen.png",
    "/projects/lynk/AuthScreen.png",
    "/projects/lynk/HomeFeedScreen.png",
    "/projects/lynk/LeaderBoardScreen.png",
    "/projects/lynk/ModeratorScreen.png",
    "/projects/lynk/ShopScreen.png",
  ],
} as const;

/* CampuSee — archive */
export const campusee = {
  name: "CampuSee",
  caseNo: "2025-0004",
  tagline: "Campus social network with real-time messaging & feeds.",
  stack: ["React Native", "Supabase", "TypeScript"],
  role: "Full-Stack Developer",
  github: "https://github.com/jsnaur/CampuSee",
  screens: [
    "/projects/campusee/WelcomeScreen.png",
    "/projects/campusee/HomeFeedScreen.png",
    "/projects/campusee/MessageScreen.png",
    "/projects/campusee/ProfileScreen.png",
  ],
} as const;

/* Managed Teams — PM artifacts */
export const managedTeams = {
  title: "Managed Teams",
  description:
    "Cross-functional project management evidence — sprint boards, task maps, and delivery tracking from three distinct product teams.",
  artifacts: [
    {
      project: "MediBridge",
      src: "/projects/ManagedTeams/MediBridge1-PM.jpeg",
      alt: "MediBridge — Project Management Board",
      role: "Project Manager",
      period: "Sept 2025 — Dec 2025",
    },
    {
      project: "CampuSee",
      src: "/projects/ManagedTeams/CampuSee-PM.jpg",
      alt: "CampuSee — Project Management Board",
      role: "Project Manager",
      period: "2024",
    },
    {
      project: "LYNK",
      src: "/projects/ManagedTeams/LYNK-PM.jpg",
      alt: "LYNK — Project Management Board",
      role: "Project Manager",
      period: "Feb 2026 — May 2026",
    },
  ],
} as const;

/* Methodology — three articles */
export const methodology = [
  {
    article: "I",
    title: "Backend Architecture",
    manifesto:
      "Systems should hold under load, fail loud, and recover quietly. Schema before syntax.",
    evidence: [
      "PostgreSQL + Supabase — pgvector, RLS, edge functions",
      "REST + webhook pipelines with rate limiting",
      "Type-safe contracts across web, mobile, and AI services",
    ],
  },
  {
    article: "II",
    title: "AI Integration",
    manifesto:
      "Models are tools, not magic. Ground them with retrieval; bound them with rules.",
    evidence: [
      "RAG with Gemini embeddings + vector similarity",
      "On-device ML inference (PyTorch ASL recognition)",
      "Webhook-driven content moderation pipelines",
    ],
  },
  {
    article: "III",
    title: "Project Leadership",
    manifesto:
      "Clear specs eliminate noise. The team ships when communication does.",
    evidence: [
      "Led 4–6 dev cross-functional teams to production",
      "Authored technical specs that survived contact with reality",
      "Removed bottlenecks before they became blockers",
    ],
  },
] as const;