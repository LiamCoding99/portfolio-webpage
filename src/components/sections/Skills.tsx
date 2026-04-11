"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { skills, type SkillLevel } from "@/data/portfolio";

const LEVEL_CONFIG: Record<
  SkillLevel,
  { label: string; color: string; bg: string }
> = {
  expert: { label: "EXPERT", color: "#ff2d9b", bg: "#ff2d9b15" },
  advanced: { label: "ADVANCED", color: "#00f5c4", bg: "#00f5c415" },
  intermediate: { label: "INTERMEDIATE", color: "#3b82f6", bg: "#3b82f615" },
  beginner: { label: "BEGINNER", color: "#6b7280", bg: "#6b728015" },
};

function SkillPill({
  name,
  level,
  index,
}: {
  name: string;
  level: SkillLevel;
  index: number;
}) {
  const cfg = LEVEL_CONFIG[level];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex items-center justify-between gap-3 px-4 py-3 border border-border-dim hover:border-accent-cyan transition-colors duration-200"
      style={{ background: "#141820" }}
    >
      <span className="font-mono text-xs text-text-primary">{name}</span>
      <span
        className="font-mono text-[9px] tracking-widest px-2 py-0.5 flex-shrink-0"
        style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}40` }}
      >
        {cfg.label}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const categories = skills.filter((c) => c.id !== "all");
  const tabs = ["All", ...categories.map((c) => c.label)];
  const [active, setActive] = useState("All");

  const items = useMemo(() => {
    if (active === "All") {
      return categories.flatMap((c) => c.items);
    }
    return categories.find((c) => c.label === active)?.items ?? [];
  }, [active, categories]);

  return (
    <section id="skills" className="section-padding bg-base">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel label="SKILL MATRIX" />
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black text-text-primary mb-8">
            Tech <span className="text-accent-cyan">Stack</span>
          </h2>
        </ScrollReveal>

        {/* Tab bar */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-1 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`font-mono text-xs tracking-widest px-3 py-2 border transition-all duration-200 ${
                  active === tab
                    ? "border-accent-cyan text-accent-cyan"
                    : "border-border-dim text-text-muted hover:border-accent-cyan hover:text-accent-cyan"
                }`}
                style={
                  active === tab
                    ? { background: "#00f5c410" }
                    : { background: "#141820" }
                }
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Legend */}
        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap gap-4 mb-8">
            {(Object.entries(LEVEL_CONFIG) as [SkillLevel, (typeof LEVEL_CONFIG)[SkillLevel]][]).map(
              ([level, cfg]) => (
                <div key={level} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cfg.color }}
                  />
                  <span className="font-mono text-[10px] text-text-muted tracking-wider">
                    {cfg.label}
                  </span>
                </div>
              )
            )}
          </div>
        </ScrollReveal>

        {/* Skills grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {items.map((skill, i) => (
              <SkillPill key={`${active}-${skill.name}`} name={skill.name} level={skill.level} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
