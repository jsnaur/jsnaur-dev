"use client";

import { useState } from "react";

/* Technology → brand color map */
const TECH: Record<string, { color: string; bg: string; border: string }> = {
  "Next.js":      { color: "#f2f4f8", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.18)" },
  "TypeScript":   { color: "#60a5fa", bg: "rgba(49,120,198,0.14)",  border: "rgba(49,120,198,0.42)" },
  "Supabase":     { color: "#3ecf8e", bg: "rgba(62,207,142,0.12)",  border: "rgba(62,207,142,0.38)" },
  "Gemini":       { color: "#60a5fa", bg: "rgba(66,133,244,0.12)",  border: "rgba(66,133,244,0.38)" },
  "pgvector":     { color: "#fb923c", bg: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.38)" },
  "Tailwind":     { color: "#22d3ee", bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.38)" },
  "React Native": { color: "#61dafb", bg: "rgba(97,218,251,0.10)",  border: "rgba(97,218,251,0.36)" },
  "Expo":         { color: "#a1a1aa", bg: "rgba(200,200,220,0.06)", border: "rgba(200,200,220,0.16)" },
  "Python":       { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.38)" },
  "PyTorch":      { color: "#fb923c", bg: "rgba(238,76,44,0.14)",   border: "rgba(238,76,44,0.42)" },
  "PostgreSQL":   { color: "#60a5fa", bg: "rgba(51,103,145,0.14)",  border: "rgba(51,103,145,0.42)" },
};

const FALLBACK = {
  color: "#8593ae",
  bg: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.12)",
};

function Badge({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  const c = TECH[label] ?? FALLBACK;

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? c.color : "#8593ae",
        background: hovered ? c.bg : "transparent",
        borderColor: hovered ? c.border : "rgba(35,45,71,1)",
        boxShadow: hovered ? `0 0 10px 0 ${c.border}` : "none",
        transform: hovered ? "translateY(-2px) scale(1.06)" : "none",
        transition: "all 0.2s cubic-bezier(0.22,1,0.36,1)",
      }}
      className="inline-block cursor-default rounded border px-2 py-0.5 font-mono text-[10px] shrink-0"
    >
      {label}
    </span>
  );
}

type Props = {
  stack: readonly string[];
  /** px per second for the ticker scroll speed */
  speed?: number;
};

export function StackBadges({ stack, speed = 30 }: Props) {
  const [paused, setPaused] = useState(false);

  /* Duplicate for seamless loop */
  const items = [...stack, ...stack];

  /* Width estimate: ~70px per badge on average */
  const totalW = stack.length * 72;
  const duration = totalW / speed;

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Tech stack"
    >
      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-ink-900/80 to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-ink-900/80 to-transparent" />

      <div
        className="flex gap-1.5 w-max"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((t, i) => (
          <Badge key={`${t}-${i}`} label={t} />
        ))}
      </div>
    </div>
  );
}
