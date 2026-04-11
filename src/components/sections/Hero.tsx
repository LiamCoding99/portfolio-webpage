"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import ParticleField from "@/components/ui/ParticleField";
import GlitchText from "@/components/ui/GlitchText";
import { owner } from "@/data/portfolio";

const ROLES = ["Full-Stack Developer", "AI/LLM Engineer", "Voice AI Builder"];

function useTypewriter(texts: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % texts.length);
    }

    setDisplay(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex, texts, speed, pause]);

  return display;
}

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
    <div ref={ref} className="text-center">
      <div className="font-orbitron text-3xl font-bold text-accent-cyan text-glow-cyan">
        {count}
      </div>
      <div className="font-mono text-xs text-text-muted tracking-widest uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <ParticleField />

      {/* Terminal path — top left */}
      <div className="absolute top-20 left-6 font-mono text-xs text-text-muted tracking-wider z-10">
        ~/liam-nguyen $<span className="text-accent-cyan animate-pulse">_</span>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00f5c4 1px, transparent 1px), linear-gradient(90deg, #00f5c4 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Avatar placeholder */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-24 h-24 rounded-full mb-8 flex items-center justify-center border-2 border-accent-cyan"
          style={{
            background: "linear-gradient(135deg, #141820 0%, #1a2030 100%)",
            boxShadow: "0 0 30px #00f5c450, 0 0 60px #00f5c420",
          }}
        >
          <span className="font-orbitron text-2xl font-bold text-accent-cyan">LN</span>
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-orbitron font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-text-primary mb-6 leading-none"
        >
          <GlitchText text="LIAM T. NGUYEN" />
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-lg sm:text-xl text-accent-cyan mb-8 h-8"
        >
          {role}
          <span style={{ animation: "blink 1s infinite" }}>|</span>
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {["React", "TypeScript", "Node.js", "Python", "AWS"].map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1 border border-border-dim text-text-muted"
              style={{ background: "#141820" }}
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex gap-10 mb-10"
        >
          {owner.stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} />
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-4"
        >
          <a
            href={`https://github.com/${owner.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm px-4 py-2 border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-base transition-all duration-200"
            style={{ boxShadow: "0 0 10px #00f5c440" }}
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={`https://linkedin.com/in/${owner.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm px-4 py-2 border border-border-dim text-text-muted hover:border-accent-cyan hover:text-accent-cyan transition-all duration-200"
          >
            <LinkedinIcon className="w-4 h-4" />
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ChevronDown
          className="w-4 h-4 animate-bounce text-accent-cyan"
          style={{ animation: "bounce 2s infinite" }}
        />
      </motion.div>
    </section>
  );
}
