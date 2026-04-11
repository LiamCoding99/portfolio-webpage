# Liam T. Nguyen — Portfolio

> Personal portfolio website for Liam T. Nguyen, Full-Stack Developer & AI/LLM Specialist.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

---

## Overview

Dark-themed, animated developer portfolio built with a cyberpunk/terminal aesthetic. Designed for performance, maintainability, and visual impact — all personal content is managed from a **single data file** with no CMS or database required.

### Sections

| Section | Description |
|---|---|
| **Hero** | Glitch-animated name, typewriter subtitle, particle field, animated stat counters |
| **System Overview** | Bio paragraphs + info cards (Education, Focus, Achievements, Open Source) |
| **Featured Projects** | Filterable card grid with thumbnails, tags, and live/GitHub links |
| **Skill Matrix** | Tabbed skill browser with proficiency levels, animated on tab switch |
| **System Log** | Alternating left/right career timeline with scroll-triggered reveals |
| **Footer** | Email CTA + social links |

---

## Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + custom CSS keyframes (glitch, scanlines, glow)
- **Animation** — Framer Motion (scroll reveals, stagger, spring nav)
- **Canvas** — Hand-written particle field (no library dependency)
- **Icons** — lucide-react + inline SVG for brand icons
- **Fonts** — Orbitron (headings) · JetBrains Mono (body)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build (verify before deploying)
npm run build
```

---

## Content Management

**All personalisation lives in one file: [`src/data/portfolio.ts`](./src/data/portfolio.ts)**

No CMS. No database. Edit that file and redeploy — the UI updates automatically.

### Add a Project

1. Drop a thumbnail into `public/projects/your-image.png`
2. Append to the `projects` array in `portfolio.ts`:

```ts
{
  id: "project-id",           // kebab-case, unique
  title: "Project Title",
  description: "What it does and why it matters.",
  image: "/projects/your-image.png",
  tags: ["Next.js", "Supabase", "OpenAI"],
  liveUrl: "https://yourproject.com",
  githubUrl: "https://github.com/you/repo",
  featured: true,             // shows FEATURED badge
  type: "project",
}
```

### Add a Research Paper

Same as above, but set `type: "research"` and include `paper: "https://..."`.  
A **Research** filter tab appears automatically once any research entry exists.

### Add or Remove a Skill

Find the right category in `portfolio.ts` and edit its `items` array:

```ts
{ name: "Rust", level: "intermediate" }
```

Available levels: `"beginner"` · `"intermediate"` · `"advanced"` · `"expert"`

To add a new skill category, append a new `SkillCategory` object — the tab bar generates itself.

### Add a Timeline Entry

Prepend to the `timeline` array (most recent entry first):

```ts
{
  id: "unique-id",
  date: "Jan 2026 – Present",
  duration: "6 months",
  org: "Organisation Name",
  role: "Your Role",
  icon: "work",               // "work" | "education" | "award" | "project"
  points: [
    "Key achievement or responsibility",
    "Another bullet point",
  ],
}
```

Left/right alternation on the timeline is automatic — no layout adjustments needed.

---

## Project Structure

```
/
├── app/
│   ├── icon.png              # Favicon
│   ├── layout.tsx            # Root layout, font loading, metadata
│   ├── page.tsx              # Assembles all sections
│   └── globals.css           # Base styles, CRT scanline, keyframes
├── src/
│   ├── data/
│   │   └── portfolio.ts      # ← Single source of truth for all content
│   └── components/
│       ├── nav/
│       │   └── HexNav.tsx    # Hexagon hamburger menu overlay
│       ├── sections/
│       │   ├── Hero.tsx
│       │   ├── Overview.tsx
│       │   ├── Projects.tsx
│       │   ├── Skills.tsx
│       │   ├── SystemLog.tsx
│       │   └── Footer.tsx
│       └── ui/
│           ├── ParticleField.tsx   # Canvas star field
│           ├── GlitchText.tsx      # CSS clip-path glitch effect
│           ├── SectionLabel.tsx    # // LABEL // headers
│           ├── ScrollReveal.tsx    # Framer Motion scroll wrapper
│           └── SocialIcons.tsx     # GitHub + LinkedIn SVG icons
└── public/
    └── projects/             # Drop project thumbnails here
```

---

## Deployment

Recommended: **[Vercel](https://vercel.com)** — zero-config for Next.js.

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Deploy — Vercel auto-detects Next.js, no additional configuration needed

Every push to `main` triggers an automatic redeploy.

---

## License

MIT — feel free to use this as a template. A credit or star is appreciated but not required.
