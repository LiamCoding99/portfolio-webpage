"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Mail, User, FolderKanban, Cpu, X, Menu } from "lucide-react";

const NAV_NODES = [
  { label: "HOME", icon: Home, href: "#hero", position: "top-center" },
  { label: "CONTACT", icon: Mail, href: "#footer", position: "mid-left" },
  { label: "ABOUT", icon: User, href: "#overview", position: "mid-right" },
  { label: "PROJECTS", icon: FolderKanban, href: "#projects", position: "bot-left" },
  { label: "SKILLS", icon: Cpu, href: "#skills", position: "bot-right" },
];

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 260, damping: 20 },
  }),
  exit: (i: number) => ({
    scale: 0,
    opacity: 0,
    transition: { delay: (NAV_NODES.length - i) * 0.05, duration: 0.2 },
  }),
};

function HexNode({
  label,
  icon: Icon,
  href,
  index,
  onClose,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={() => {
        onClose();
        setTimeout(() => {
          const el = document.querySelector(href);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }}
    >
      <div
        className="relative w-20 h-20 flex items-center justify-center"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          background: "#141820",
          border: "2px solid #00f5c4",
          boxShadow: "0 0 15px #00f5c440, inset 0 0 10px #00f5c410",
          transition: "all 0.3s",
        }}
      >
        <Icon className="w-7 h-7 text-accent-cyan group-hover:scale-110 transition-transform" />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function HexNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed top bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(13, 15, 20, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 245, 196, 0.08)",
        }}
      >
        <div
          className="font-orbitron text-accent-cyan text-lg tracking-widest font-bold cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          &lt;LN /&gt;
        </div>
        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 flex items-center justify-center border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-base transition-all duration-200"
          aria-label="Open navigation"
          style={{ boxShadow: "0 0 10px #00f5c440" }}
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(13, 15, 20, 0.97)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Radial glow behind center diamond */}
            <div
              className="absolute"
              style={{
                width: 300,
                height: 300,
                background:
                  "radial-gradient(circle, #00f5c420 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-base transition-all duration-200"
              aria-label="Close navigation"
              style={{ boxShadow: "0 0 10px #00f5c440" }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hex node layout matching reference screenshot */}
            <div className="relative w-[340px] h-[280px]">
              {/* HOME — top center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <HexNode {...NAV_NODES[0]} index={0} onClose={() => setOpen(false)} />
              </div>

              {/* CONTACT — mid left */}
              <div className="absolute top-[90px] left-0">
                <HexNode {...NAV_NODES[1]} index={1} onClose={() => setOpen(false)} />
              </div>

              {/* Center diamond */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.15, type: "spring" }}
                className="absolute top-[112px] left-1/2 -translate-x-1/2"
                style={{
                  width: 20,
                  height: 20,
                  background: "#00f5c4",
                  transform: "translateX(-50%) rotate(45deg)",
                  boxShadow: "0 0 20px #00f5c4, 0 0 40px #00f5c480",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              />

              {/* ABOUT — mid right */}
              <div className="absolute top-[90px] right-0">
                <HexNode {...NAV_NODES[2]} index={2} onClose={() => setOpen(false)} />
              </div>

              {/* PROJECTS — bottom left */}
              <div className="absolute bottom-0 left-0">
                <HexNode {...NAV_NODES[3]} index={3} onClose={() => setOpen(false)} />
              </div>

              {/* SKILLS — bottom right */}
              <div className="absolute bottom-0 right-0">
                <HexNode {...NAV_NODES[4]} index={4} onClose={() => setOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
