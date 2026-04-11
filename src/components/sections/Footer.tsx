"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { owner } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="section-padding border-t border-border-dim" style={{ background: "#0d0f14" }}>
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Label */}
        <p className="font-mono text-accent-cyan text-xs tracking-[0.3em] uppercase">
          {"// INIT CONNECTION //"}
        </p>

        {/* Heading */}
        <h2 className="font-orbitron text-2xl sm:text-3xl font-black text-text-primary">
          Let&apos;s Build Something{" "}
          <span className="text-accent-cyan text-glow-cyan">Together</span>
        </h2>

        {/* CTA email button */}
        <a
          href={`mailto:${owner.email}`}
          className="font-mono text-sm px-8 py-3 border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-base transition-all duration-300 tracking-widest uppercase"
          style={{ boxShadow: "0 0 20px #00f5c440, 0 0 40px #00f5c420" }}
        >
          SEND TRANSMISSION → {owner.email}
        </a>

        {/* Social links */}
        <div className="flex gap-6">
          <a
            href={`https://github.com/${owner.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors tracking-wider"
          >
            <GithubIcon className="w-4 h-4" />
            GITHUB
          </a>
          <a
            href={`https://linkedin.com/in/${owner.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors tracking-wider"
          >
            <LinkedinIcon className="w-4 h-4" />
            LINKEDIN
          </a>
          <a
            href={`mailto:${owner.email}`}
            className="flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-cyan transition-colors tracking-wider"
          >
            <Mail className="w-4 h-4" />
            EMAIL
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border-dim" />

        {/* Copyright */}
        <p className="font-mono text-[10px] text-text-muted tracking-widest">
          © {year} Liam T. Nguyen — Built with Next.js
        </p>
      </div>
    </footer>
  );
}
