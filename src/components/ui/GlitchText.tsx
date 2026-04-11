"use client";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`} aria-label={text}>
      {/* Main text */}
      <span
        className="relative z-10"
        style={{ animation: "glitch-main 3s infinite" }}
      >
        {text}
      </span>

      {/* Glitch layer 1 (cyan) */}
      <span
        aria-hidden
        className="absolute inset-0 text-accent-cyan"
        style={{
          animation: "glitch-1 3s infinite",
          left: "2px",
          textShadow: "-2px 0 #ff2d9b",
        }}
      >
        {text}
      </span>

      {/* Glitch layer 2 (magenta) */}
      <span
        aria-hidden
        className="absolute inset-0 text-accent-magenta"
        style={{
          animation: "glitch-2 3s infinite",
          left: "-2px",
          textShadow: "2px 0 #00f5c4",
        }}
      >
        {text}
      </span>
    </span>
  );
}
