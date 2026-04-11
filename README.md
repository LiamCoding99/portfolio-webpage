# Liam T. Nguyen — Portfolio

Dark-themed, animated developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to Update Content

**All content lives in a single file: `/src/data/portfolio.ts`**

### Add a Project
1. Drop a thumbnail into `/public/projects/your-image.png`
2. Open `/src/data/portfolio.ts`
3. Append to the `projects` array:
```ts
{
  id: "my-project",
  title: "My Project",
  description: "What it does.",
  image: "/projects/your-image.png",
  tags: ["Next.js", "Supabase"],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/...",
  featured: true,
  type: "project",
}
```

### Add a Research Paper
Same as above, but set `type: "research"` and add `paper: "https://..."`. A **Research** tab appears automatically.

### Add / Remove a Skill
Find the right category in `portfolio.ts` → edit `items[]`:
```ts
{ name: "Rust", level: "intermediate" }
```
Levels: `"beginner"` | `"intermediate"` | `"advanced"` | `"expert"`

### Add a Timeline Entry
Prepend to the `timeline` array (most recent first). Left/right alternation is automatic.

## Deployment

Deploy to Vercel in one click — connect the GitHub repo and it auto-deploys on push to `main`.

```bash
npm run build   # verify before pushing
```
