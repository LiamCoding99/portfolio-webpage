"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Award,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { owner } from "@/data/portfolio";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Cpu,
  Award,
  GitBranch,
};

function useCountUp(target: string, duration = 1500) {
  const [count, setCount] = useState("0");
  const hasRun = useRef(false);

  const start = () => {
    if (hasRun.current) return;
    hasRun.current = true;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const val = (numeric * step) / steps;
      setCount(
        (Number.isInteger(numeric) ? Math.floor(val) : val.toFixed(2)) + suffix
      );
      if (step >= steps) {
        clearInterval(interval);
        setCount(target);
      }
    }, duration / steps);
  };

  return { count, start };
}

function StatCounter({ value, label }: { value: string; label: string }) {
  const { count, start } = useCountUp(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <div ref={ref} className="text-center px-4 py-3 border-l border-border-dim first:border-l-0">
      <div className="font-orbitron text-2xl font-bold text-accent-cyan text-glow-cyan">
        {count}
      </div>
      <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

function OverviewCard({
  icon,
  title,
  body,
  index,
}: {
  icon: string;
  title: string;
  body: string;
  index: number;
}) {
  const Icon = ICON_MAP[icon] || Cpu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-5 border-l-2 border-accent-cyan"
      style={{ background: "#141820", borderRight: "1px solid #1e2535", borderTop: "1px solid #1e2535", borderBottom: "1px solid #1e2535" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 text-accent-cyan flex-shrink-0" />
        <h3 className="font-orbitron text-sm font-bold text-text-primary tracking-wider">
          {title}
        </h3>
      </div>
      <p className="font-mono text-xs text-text-muted leading-relaxed whitespace-pre-line">
        {body}
      </p>
    </motion.div>
  );
}

export default function Overview() {
  return (
    <section id="overview" className="section-padding bg-base">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel label="SYSTEM OVERVIEW" />
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black text-text-primary mb-12">
            About <span className="text-accent-cyan">Me</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio — left */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-5">
              {owner.bio.map((para, i) => (
                <p key={i} className="font-mono text-sm text-text-muted leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Stats inline */}
              <div className="flex mt-8 pt-6 border-t border-border-dim">
                {owner.stats.map((s) => (
                  <StatCounter key={s.label} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Cards — right */}
          <div className="grid sm:grid-cols-2 gap-4">
            {owner.overview_cards.map((card, i) => (
              <OverviewCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                body={card.body}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
