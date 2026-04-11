// ============================================================
// SINGLE SOURCE OF TRUTH — edit only this file to update content
// ============================================================

export const owner = {
  name: "Liam T. Nguyen",
  title: "Full-Stack Developer",
  subtitle: "AI/LLM Specialist",
  location: "Santa Ana, CA, USA",
  email: "liamnguyen224@gmail.com",
  github: "LiamCoding99",
  linkedin: "liam-th-nguyen",
  bio: [
    "I'm a full-stack developer at Cal Poly Pomona (CS, GPA 3.61, graduating June 2026), building production AI systems that actually ship. From voice receptionists to multi-tenant SaaS dashboards — I close the loop between prototype and prod.",
    "My focus is the intersection of LLM orchestration, real-time infrastructure, and clean full-stack product work. I think in systems, build for scale, and care obsessively about the developer experience on both sides of the API.",
  ],
  stats: [
    { value: "2+", label: "Years Experience" },
    { value: "3.61", label: "GPA" },
    { value: "5+", label: "Projects Shipped" },
  ],
  overview_cards: [
    {
      id: "education",
      icon: "GraduationCap",
      title: "Education",
      body: "B.S. Computer Science — Cal Poly Pomona (exp. June 2026)\nA.S. Computer Science — Santa Ana CC (GPA 3.9)",
    },
    {
      id: "focus",
      icon: "Cpu",
      title: "Focus Areas",
      body: "Voice AI · Multi-tenant SaaS · Full-Stack Web · LLM Integrations",
    },
    {
      id: "achievements",
      icon: "Award",
      title: "Achievements",
      body: "AWS Cloud Practitioner · CompTIA A+ · CS Club President",
    },
    {
      id: "open_source",
      icon: "GitBranch",
      title: "Open Source",
      body: "Active on GitHub — developer tooling and AI experiments",
    },
  ],
} as const;

// ---------------------------------------------------------------
// PROJECTS
// To add a project: append one object below.
// To add a research paper: set type: "research" and paper: "<url>".
// ---------------------------------------------------------------
export type Project = {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  type: "project" | "research";
  paper?: string;
};

export const projects: Project[] = [
  {
    id: "speak-autos",
    title: "SPEAK.AUTOS — AI Voice Receptionist SaaS",
    description:
      "Production AI voice agent: Twilio PSTN → Deepgram STT → GPT-4.1 Mini → ElevenLabs TTS. Multi-tenant dashboard (Next.js + Supabase RLS). Split-domain infra: voice server on DigitalOcean, frontend on Vercel.",
    image: "/projects/speak-autos.png",
    tags: ["Next.js", "Node.js", "Supabase", "Twilio", "OpenAI", "DigitalOcean"],
    liveUrl: "https://speak.autos",
    featured: true,
    type: "project",
  },
  {
    id: "untiled-app",
    title: "Untiled App — Mental Wellness Platform",
    description:
      "Senior capstone project with a team of 6 at Tilted Lab Inc. Built a mental wellness webapp for applicants to track and manage their wellbeing. The core focus: applying Agile methodology in a real-world product cycle — sprints, standups, retrospectives, and iterative delivery from discovery to production.",
    image: "/projects/tilted-lab-inc.png",
    tags: ["React", "JavaScript", "Tailwind CSS", "Firebase"],
    liveUrl: "https://untilt.web.app/",
    featured: false,
    type: "project",
  },
  {
    id: "meat-worker-solution",
    title: "Meat Worker Solution — AI Lead Capture",
    description:
      "Dark-themed B2B site with GPT-4o-mini web chatbot + Twilio voice agent as 24/7 lead capture. n8n pipelines fan out leads to Gmail, Google Sheets, and Supabase simultaneously.",
    image: "/projects/mws.png",
    tags: ["HTML/CSS", "Tailwind", "n8n", "Twilio", "GPT-4o-mini", "Supabase"],
    liveUrl: "https://meatworkersolution.com.au",
    featured: true,
    type: "project",
  },
];

// ---------------------------------------------------------------
// SKILLS
// To add a skill: find the right category, append to items[].
// To add a category: append a new SkillCategory object.
// ---------------------------------------------------------------
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type Skill = { name: string; level: SkillLevel; icon?: string };
export type SkillCategory = { id: string; label: string; items: Skill[] };

export const skills: SkillCategory[] = [
  {
    id: "all",
    label: "All",
    items: [], // auto-populated from all categories in the UI
  },
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "TypeScript", level: "expert" },
      { name: "JavaScript", level: "expert" },
      { name: "Python", level: "advanced" },
      { name: "C/C++", level: "intermediate" },
      { name: "SQL", level: "advanced" },
      { name: "Java", level: "intermediate" },
      { name: "Swift", level: "beginner" },
      { name: "Kotlin", level: "beginner" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", level: "expert" },
      { name: "Next.js", level: "expert" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "Framer Motion", level: "advanced" },
      { name: "HTML/CSS", level: "expert" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", level: "expert" },
      { name: "Express", level: "advanced" },
      { name: "PostgreSQL", level: "advanced" },
      { name: "Supabase", level: "advanced" },
      { name: "Firebase", level: "intermediate" },
      { name: "PHP", level: "intermediate" },
    ],
  },
  {
    id: "devops",
    label: "DevOps / Cloud",
    items: [
      { name: "DigitalOcean", level: "advanced" },
      { name: "Vercel", level: "expert" },
      { name: "AWS", level: "intermediate" },
      { name: "nginx", level: "advanced" },
      { name: "Linux (Ubuntu)", level: "advanced" },
      { name: "Docker", level: "intermediate" },
      { name: "pm2", level: "advanced" },
      { name: "Git/GitHub", level: "expert" },
    ],
  },
  {
    id: "ai",
    label: "AI / LLM",
    items: [
      { name: "OpenAI API", level: "expert" },
      { name: "Claude API", level: "expert" },
      { name: "LangGraph", level: "advanced" },
      { name: "CrewAI", level: "intermediate" },
      { name: "Deepgram STT", level: "advanced" },
      { name: "ElevenLabs TTS", level: "advanced" },
      { name: "Twilio AI Voice", level: "advanced" },
      { name: "n8n", level: "advanced" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "VS Code", level: "expert" },
      { name: "Supabase", level: "advanced" },
      { name: "MySQL", level: "intermediate" },
      { name: "Zapier", level: "intermediate" },
      { name: "Microsoft Suite", level: "advanced" },
    ],
  },
];

// ---------------------------------------------------------------
// TIMELINE
// ORDER: most recent first.
// Left/right alternation is automatic (index % 2).
// To add: prepend to array.
// ---------------------------------------------------------------
export type TimelineIcon = "work" | "education" | "award" | "project";
export type TimelineEntry = {
  id: string;
  date: string;
  duration: string;
  org: string;
  role: string;
  icon: TimelineIcon;
  points: string[];
};

export const timeline: TimelineEntry[] = [
  {
    id: "speak-autos-project",
    date: "June 2025 – Present",
    duration: "~1 year",
    org: "speak.autos",
    role: "Founder / Lead Engineer",
    icon: "project",
    points: [
      "Built production AI voice agent: Twilio → Deepgram → GPT-4.1 Mini → ElevenLabs",
      "Architected split-domain infra: Node.js/WebSocket on DigitalOcean + Next.js on Vercel",
      "Shipped multi-tenant SaaS dashboard with Supabase RLS",
    ],
  },
  {
    id: "mws-freelance",
    date: "July 2024 – Present",
    duration: "1 year 10 months",
    org: "Meat Worker Solution",
    role: "Freelance Full-Stack Developer",
    icon: "work",
    points: [
      "Built full B2B site with GPT-4o-mini chatbot + Twilio voice agent",
      "Engineered dual n8n pipelines → Gmail, Sheets, Supabase",
      "Secured self-hosted n8n on DigitalOcean with nginx + iptables",
    ],
  },
  {
    id: "cal-poly",
    date: "2023 – June 2026 (expected)",
    duration: "3 years",
    org: "Cal Poly Pomona",
    role: "B.S. Computer Science — GPA 3.61",
    icon: "education",
    points: ["Focus on AI systems, full-stack web, and cloud infrastructure"],
  },
  {
    id: "teaching-assistant",
    date: "Oct 2022 – June 2023",
    duration: "9 months",
    org: "Santa Ana Community College",
    role: "Teaching Assistant — CS Department",
    icon: "work",
    points: [
      "1-on-1 tutoring in C++ and Java",
      "Coordinated with faculty on course milestones and exam prep",
    ],
  },
  {
    id: "cs-club",
    date: "Sept 2021 – June 2023",
    duration: "2 years",
    org: "Santa Ana Community College",
    role: "President — CS Club",
    icon: "award",
    points: [
      "Founded weekly peer study groups (C++, Java, Python)",
      "Mentored members on resume building and job applications",
    ],
  },
  {
    id: "santa-ana-college",
    date: "2021 – June 2023",
    duration: "2 years",
    org: "Santa Ana Community College",
    role: "A.S. Computer Science — GPA 3.9",
    icon: "education",
    points: [],
  },
];
