"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";
import Image from "next/image";

// ─── Tab definitions ──────────────────────────────────────
type Tab = {
  id: "all" | ProjectCategory;
  label: string;
  dot: string;        // accent colour for the indicator dot
  border: string;     // active border colour
  glow: string;       // active box-shadow
  text: string;       // active text colour
};

const TABS: Tab[] = [
  {
    id: "all",
    label: "All",
    dot: "#00f5c4",
    border: "#00f5c4",
    glow: "#00f5c420",
    text: "#00f5c4",
  },
  {
    id: "personal",
    label: "Personal Projects",
    dot: "#e8eaf0",
    border: "#e8eaf0",
    glow: "#e8eaf020",
    text: "#e8eaf0",
  },
  {
    id: "work",
    label: "Work Projects",
    dot: "#ff2d9b",
    border: "#ff2d9b",
    glow: "#ff2d9b20",
    text: "#ff2d9b",
  },
  {
    id: "university",
    label: "University Projects",
    dot: "#f5c400",
    border: "#f5c400",
    glow: "#f5c40020",
    text: "#f5c400",
  },
];

// Only show tabs that have matching projects (plus "All" always shown)
function useVisibleTabs() {
  return TABS.filter((tab) => {
    if (tab.id === "all") return true;
    if (tab.id === "research") return projects.some((p) => p.type === "research");
    return projects.some((p) => p.category === tab.id);
  });
}

// ─── Category badge config ────────────────────────────────
const CATEGORY_BADGE: Record<ProjectCategory, { label: string; color: string; bg: string }> = {
  personal: { label: "PERSONAL", color: "#00f5c4", bg: "#00f5c415" },
  work:     { label: "WORK",     color: "#ff2d9b", bg: "#ff2d9b15" },
  university:{ label: "UNI",    color: "#f5c400", bg: "#f5c40015" },
  research: { label: "RESEARCH", color: "#a855f7", bg: "#a855f715" },
};

// ─── Project Card ─────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const hasImage = !!project.image;
  const catBadge = CATEGORY_BADGE[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="project-card border border-border-dim overflow-hidden flex flex-col"
      style={{ background: "#141820" }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-44 overflow-hidden flex-shrink-0"
        style={{
          background: hasImage
            ? undefined
            : "linear-gradient(135deg, #141820 0%, #1a2030 50%, #0d1520 100%)",
        }}
      >
        {hasImage ? (
          <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border border-accent-cyan opacity-20" style={{ transform: "rotate(45deg)" }} />
            <span className="absolute font-mono text-xs text-text-muted">NO IMAGE</span>
          </div>
        )}

        {/* Badges — top right: featured only */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {project.featured && (
            <span className="font-mono text-[9px] tracking-widest px-2 py-0.5 font-bold text-black" style={{ background: "#00f5c4" }}>
              FEATURED
            </span>
          )}
        </div>

        {/* Bottom fade */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #141820 0%, transparent 60%)" }} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-orbitron text-sm font-bold text-text-primary mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="font-mono text-xs text-text-muted leading-relaxed mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] px-2 py-0.5 border border-border-dim text-text-muted tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-border-dim">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-accent-cyan hover:text-white transition-colors tracking-wider"
            >
              <ExternalLink className="w-3 h-3" />
              LIVE
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-text-muted hover:text-accent-cyan transition-colors tracking-wider"
            >
              <GithubIcon className="w-3 h-3" />
              CODE
            </a>
          )}
          {project.type === "research" && project.paper && (
            <a
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] text-accent-magenta hover:text-white transition-colors tracking-wider"
            >
              <FileText className="w-3 h-3" />
              PAPER
            </a>
          )}
          {/* Category badge — bottom right */}
          <span
            className="ml-auto font-mono text-[9px] tracking-widest px-2 py-0.5 font-bold border"
            style={{ color: catBadge.color, background: catBadge.bg, borderColor: `${catBadge.color}40` }}
          >
            {catBadge.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Filter Tab button ────────────────────────────────────
function FilterTab({
  tab,
  active,
  count,
  onClick,
}: {
  tab: Tab;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 font-mono text-xs tracking-widest px-4 py-2.5 border whitespace-nowrap transition-all duration-200 flex-shrink-0"
      style={
        active
          ? {
              borderColor: tab.border,
              color: tab.text,
              background: tab.glow,
              boxShadow: `0 0 12px ${tab.glow}`,
            }
          : {
              borderColor: "#1e2535",
              color: "#6b7280",
              background: "#141820",
            }
      }
    >
      {/* Dot indicator */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
        style={{ background: active ? tab.dot : "#374151" }}
      />
      {tab.label.toUpperCase()}
      {/* Count badge */}
      <span
        className="font-mono text-[9px] px-1.5 py-0.5 rounded-sm ml-1 transition-all duration-200"
        style={
          active
            ? { background: `${tab.dot}25`, color: tab.dot }
            : { background: "#1e2535", color: "#4b5563" }
        }
      >
        {count}
      </span>
    </button>
  );
}

// ─── Main Section ─────────────────────────────────────────
export default function Projects() {
  const visibleTabs = useVisibleTabs();
  const [active, setActive] = useState<Tab["id"]>("all");

  const getCount = (tabId: Tab["id"]) => {
    if (tabId === "all") return projects.length;
    if (tabId === "research") return projects.filter((p) => p.type === "research").length;
    return projects.filter((p) => p.category === tabId).length;
  };

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    if (active === "research") return projects.filter((p) => p.type === "research");
    return projects.filter((p) => p.category === active);
  }, [active]);

  const activeTab = visibleTabs.find((t) => t.id === active)!;

  return (
    <section id="projects" className="section-padding" style={{ background: "#0a0c10" }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel label="FEATURED PROJECTS" />
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black text-text-primary mb-8">
            What I&apos;ve <span className="text-accent-cyan">Built</span>
          </h2>
        </ScrollReveal>

        {/* Filter tab bar
            Mobile:  horizontal scroll (no wrap, -mx padding trick for edge bleed)
            Tablet+: wraps naturally                                               */}
        <ScrollReveal delay={0.1}>
          <div className="relative mb-10">
            {/* Scroll container — mobile gets horizontal scroll, md+ wraps */}
            <div
              className="flex gap-2 overflow-x-auto md:flex-wrap pb-1 md:pb-0
                          scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {visibleTabs.map((tab) => (
                <FilterTab
                  key={tab.id}
                  tab={tab}
                  active={active === tab.id}
                  count={getCount(tab.id)}
                  onClick={() => setActive(tab.id)}
                />
              ))}
            </div>

            {/* Active tab underline accent — desktop only */}
            <div
              className="hidden md:block h-px mt-3 transition-all duration-300"
              style={{
                background: `linear-gradient(to right, ${activeTab.border}60, transparent)`,
              }}
            />
          </div>
        </ScrollReveal>

        {/* Project grid
            Mobile:  1 col
            Tablet:  2 col
            Desktop: 3 col                                                         */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center font-mono text-text-muted tracking-widest"
              >
                {"// NO ENTRIES YET //"}
              </motion.div>
            ) : (
              filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
