"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Mail, User, FolderKanban, Cpu, X, Menu } from "lucide-react";

const NAV_NODES = [
  { label: "HOME", icon: Home, href: "#hero", position: "top-center" },
  { label: "ABOUT", icon: User, href: "#overview", position: "mid-right" },
  { label: "PROJECTS", icon: FolderKanban, href: "#projects", position: "bot-left" },
  { label: "SKILLS", icon: Cpu, href: "#skills", position: "bot-right" },
  { label: "CONTACT", icon: Mail, href: "#footer", position: "mid-left" },
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

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

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
      {/* Outer layer = border color */}
      <div
        style={{
          width: 72,
          height: 72,
          clipPath: HEX_CLIP,
          background: "#00f5c4",
          boxShadow: "0 0 18px #00f5c460",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Inner layer = dark fill */}
        <div
          style={{
            width: 63,
            height: 63,
            clipPath: HEX_CLIP,
            background: "#0d1117",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon className="w-6 h-6 text-accent-cyan group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan uppercase">
        {label}
      </span>
    </motion.div>
  );
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
}

export default function HexNav() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed top bar */}
      <motion.nav
        animate={{ y: visible ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
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

        {/* Desktop nav links — hidden on tablet/mobile */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_NODES.map(({ label, icon: Icon, href }) => (
            <button
              key={label}
              onClick={() => scrollTo(href)}
              className="flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-accent-cyan/70 hover:text-accent-cyan uppercase transition-colors duration-200 group"
            >
              <Icon className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              {label}
            </button>
          ))}
        </div>

        {/* Hamburger — only on tablet/mobile */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden w-10 h-10 flex items-center justify-center border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-[#0d0f14] transition-all duration-200"
          aria-label="Open navigation"
          style={{ boxShadow: "0 0 10px #00f5c440" }}
        >
          <Menu className="w-5 h-5" />
        </button>
      </motion.nav>

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

            {/* Hex node layout */}
            <div className="relative w-[290px] h-[260px] sm:w-[340px] sm:h-[280px]">
              {/* HOME — top center */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <HexNode {...NAV_NODES[0]} index={0} onClose={() => setOpen(false)} />
              </div>

              {/* ABOUT — mid right */}
              <div className="absolute top-[80px] right-0 sm:top-[90px]">
                <HexNode {...NAV_NODES[1]} index={1} onClose={() => setOpen(false)} />
              </div>

              {/* Center diamond */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.15, type: "spring" }}
                className="absolute top-[100px] left-1/2 sm:top-[112px]"
                style={{
                  width: 16,
                  height: 16,
                  background: "#00f5c4",
                  transform: "translateX(-50%) rotate(45deg)",
                  boxShadow: "0 0 20px #00f5c4, 0 0 40px #00f5c480",
                }}
              />

              {/* CONTACT — mid left */}
              <div className="absolute top-[80px] left-0 sm:top-[90px]">
                <HexNode {...NAV_NODES[4]} index={2} onClose={() => setOpen(false)} />
              </div>

              {/* PROJECTS — bottom left */}
              <div className="absolute bottom-0 left-0">
                <HexNode {...NAV_NODES[2]} index={3} onClose={() => setOpen(false)} />
              </div>

              {/* SKILLS — bottom right */}
              <div className="absolute bottom-0 right-0">
                <HexNode {...NAV_NODES[3]} index={4} onClose={() => setOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
