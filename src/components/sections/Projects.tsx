"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { projects, type Project } from "@/data/portfolio";
import Image from "next/image";

function ProjectCard({ project }: { project: Project }) {
  const hasImage = !!project.image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="project-card border border-border-dim overflow-hidden flex flex-col"
      style={{ background: "#141820" }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-44 overflow-hidden"
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
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 border border-accent-cyan opacity-20"
              style={{ transform: "rotate(45deg)" }}
            />
            <span className="absolute font-mono text-xs text-text-muted">NO IMAGE</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          {project.featured && (
            <span
              className="font-mono text-[9px] tracking-widest px-2 py-0.5 text-base font-bold"
              style={{ background: "#00f5c4" }}
            >
              FEATURED
            </span>
          )}
          {project.type === "research" && (
            <span
              className="font-mono text-[9px] tracking-widest px-2 py-0.5 text-white font-bold"
              style={{ background: "#ff2d9b" }}
            >
              RESEARCH
            </span>
          )}
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #141820 0%, transparent 60%)" }}
        />
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
        <div className="flex gap-3 pt-3 border-t border-border-dim">
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
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const hasResearch = projects.some((p) => p.type === "research");
  const tabs = ["All", "Projects", ...(hasResearch ? ["Research"] : [])];
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    if (active === "Research") return projects.filter((p) => p.type === "research");
    return projects.filter((p) => p.type === "project");
  }, [active]);

  return (
    <section id="projects" className="section-padding" style={{ background: "#0a0c10" }}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel label="FEATURED PROJECTS" />
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black text-text-primary mb-8">
            What I&apos;ve <span className="text-accent-cyan">Built</span>
          </h2>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-1 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`font-mono text-xs tracking-widest px-4 py-2 border transition-all duration-200 ${
                  active === tab
                    ? "border-accent-cyan text-accent-cyan"
                    : "border-border-dim text-text-muted hover:border-accent-cyan hover:text-accent-cyan"
                }`}
                style={
                  active === tab
                    ? { background: "#00f5c410", boxShadow: "0 0 10px #00f5c420" }
                    : { background: "#141820" }
                }
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
