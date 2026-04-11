"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Trophy, Rocket, type LucideIcon } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { timeline, type TimelineIcon } from "@/data/portfolio";

const ICON_MAP: Record<TimelineIcon, { icon: LucideIcon; color: string; bg: string }> = {
  work: { icon: Briefcase, color: "#00f5c4", bg: "#00f5c420" },
  education: { icon: GraduationCap, color: "#ff2d9b", bg: "#ff2d9b20" },
  award: { icon: Trophy, color: "#f5c400", bg: "#f5c40020" },
  project: { icon: Rocket, color: "#00f5c4", bg: "#00bfa520" },
};

function TimelineCard({
  entry,
  index,
}: {
  entry: (typeof timeline)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cfg = ICON_MAP[entry.icon];
  const Icon = cfg.icon;

  return (
    <div
      ref={ref}
      className={`relative flex w-full mb-12 ${
        isLeft ? "justify-start" : "justify-end"
      } lg:mb-0`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full lg:w-[calc(50%-3rem)] border border-border-dim p-5 ${
          isLeft ? "lg:mr-12" : "lg:ml-12"
        }`}
        style={{ background: "#141820" }}
      >
        {/* Date & Duration */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] text-text-muted tracking-wider">
            {entry.date}
          </span>
          <span
            className="font-mono text-[9px] px-2 py-0.5 tracking-wider"
            style={{ background: "#1a2030", color: "#6b7280" }}
          >
            {entry.duration}
          </span>
        </div>

        {/* Org */}
        <div
          className="font-orbitron text-sm font-bold mb-1"
          style={{ color: cfg.color }}
        >
          {entry.org}
        </div>

        {/* Role */}
        <div className="font-mono text-xs text-text-primary mb-4">{entry.role}</div>

        {/* Points */}
        {entry.points.length > 0 && (
          <ul className="space-y-1.5">
            {entry.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent-cyan mt-0.5 flex-shrink-0 font-mono text-xs">›</span>
                <span className="font-mono text-[11px] text-text-muted leading-relaxed">
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      {/* Centre icon — visible only on desktop */}
      <div
        className={`hidden lg:flex absolute top-5 left-1/2 -translate-x-1/2 w-10 h-10 items-center justify-center border-2 z-10`}
        style={{
          borderColor: cfg.color,
          background: cfg.bg,
          boxShadow: `0 0 15px ${cfg.color}40`,
        }}
      >
        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
      </div>
    </div>
  );
}

export default function SystemLog() {
  return (
    <section id="system-log" className="section-padding" style={{ background: "#0a0c10" }}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionLabel label="SYSTEM LOG" />
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black text-text-primary mb-16">
            Career <span className="text-accent-cyan">Timeline</span>
          </h2>
        </ScrollReveal>

        {/* Timeline container */}
        <div className="relative">
          {/* Centre line — desktop only */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 timeline-line"
          />

          {/* Entries */}
          <div className="lg:space-y-12">
            {timeline.map((entry, i) => (
              <TimelineCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
