"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

export type Slide = { src: string; alt: string };

type Tone = "navy" | "brass" | "neutral";

type Props = {
  slides: Slide[];
  /** Width of the centered (active) mockup in px. */
  width?: number;
  /** Auto-advance interval. Pass 0 to disable. */
  autoMs?: number;
  /** Tone for glow/dot colors. */
  tone?: Tone;
  /** Click handler for the active slide (e.g. open Lightbox). */
  onSlideClick?: (s: Slide) => void;
  className?: string;
  /** Optional aria-label for the whole carousel. */
  ariaLabel?: string;
};

const TONE_RING = {
  navy: "ring-navy-300/60",
  brass: "ring-brass-400/60",
  neutral: "ring-paper-400/40",
} as const;

const TONE_DOT_ACTIVE = {
  navy: "bg-navy-300",
  brass: "bg-brass-400",
  neutral: "bg-paper-200",
} as const;

const TONE_GLOW = {
  navy: "drop-shadow-[0_25px_40px_rgba(107,141,214,0.35)]",
  brass: "drop-shadow-[0_25px_40px_rgba(201,169,110,0.35)]",
  neutral: "drop-shadow-[0_25px_40px_rgba(13,21,46,0.6)]",
} as const;

const TONE_PEDESTAL = {
  navy: "bg-[radial-gradient(ellipse_at_center,rgba(107,141,214,0.28)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  brass:
    "bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.22)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  neutral:
    "bg-[radial-gradient(ellipse_at_center,rgba(13,21,46,0.55)_0%,rgba(13,21,46,0.25)_35%,transparent_70%)]",
} as const;

// 3-position carousel: -1 (prev), 0 (active), 1 (next).
// Anything else fades out beyond the visible track.
function positionStyle(rel: number) {
  if (rel === 0) {
    return { x: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
  }
  if (rel === -1) {
    return { x: -135, scale: 0.78, rotate: -8, opacity: 0.55, zIndex: 20 };
  }
  if (rel === 1) {
    return { x: 135, scale: 0.78, rotate: 8, opacity: 0.55, zIndex: 20 };
  }
  // Out-of-frame slides — collapse and hide.
  const sign = rel < 0 ? -1 : 1;
  return { x: sign * 220, scale: 0.6, rotate: sign * -14, opacity: 0, zIndex: 10 };
}

export function MockupCarousel({
  slides,
  width = 220,
  autoMs = 4500,
  tone = "navy",
  onSlideClick,
  className,
  ariaLabel,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-15%" });

  const height = Math.round(width * (2000 / 1415));
  const len = slides.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + len) % len);
    },
    [len],
  );
  const jumpTo = useCallback((i: number) => setIndex(((i % len) + len) % len), [len]);

  // Auto-advance (paused on hover/focus, when out of view, or when len <= 1)
  useEffect(() => {
    if (!autoMs || paused || !inView || len <= 1) return;
    const t = window.setInterval(() => go(1), autoMs);
    return () => window.clearInterval(t);
  }, [autoMs, paused, inView, len, go]);

  // Keyboard arrows when focus is inside the carousel
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "Enter" || e.key === " ") {
      if (onSlideClick) {
        e.preventDefault();
        onSlideClick(slides[index]);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={ariaLabel ?? "Mockup carousel"}
      className={cn("relative mx-auto w-full select-none", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {/* Stage */}
      <div
        className="relative mx-auto"
        style={{ width: `${width + 280}px`, maxWidth: "100%", height: `${height + 40}px` }}
      >
        <AnimatePresence initial={false}>
          {slides.map((s, i) => {
            // Compute shortest signed distance (-1, 0, 1, …) on a circular index.
            let rel = i - index;
            if (rel > len / 2) rel -= len;
            if (rel < -len / 2) rel += len;
            // Render only the visible window (prev/active/next) for perf.
            if (Math.abs(rel) > 1) return null;

            const pos = positionStyle(rel);
            const isActive = rel === 0;

            return (
              <motion.div
                key={s.src}
                className="absolute left-1/2 top-0"
                style={{ marginLeft: -width / 2, zIndex: pos.zIndex }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  x: pos.x,
                  scale: pos.scale,
                  rotate: pos.rotate,
                  opacity: pos.opacity,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.9 }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  const threshold = 60;
                  if (info.offset.x < -threshold || info.velocity.x < -350) go(1);
                  else if (info.offset.x > threshold || info.velocity.x > 350) go(-1);
                }}
                whileTap={isActive ? { scale: 0.97 } : undefined}
              >
                {/* Pedestal shadow */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-1/2 bottom-[-12px] h-5 w-[78%] -translate-x-1/2 rounded-full blur-md transition-opacity duration-500",
                    TONE_PEDESTAL[tone],
                    isActive ? "opacity-90" : "opacity-40",
                  )}
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!isActive) jumpTo(i);
                    else if (onSlideClick) onSlideClick(s);
                  }}
                  aria-label={
                    isActive ? `View ${s.alt}` : `Show ${s.alt}`
                  }
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={isActive ? 0 : -1}
                  className={cn(
                    "block cursor-pointer rounded-[2.2rem] border-0 bg-transparent p-0",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
                    isActive ? `ring-1 ${TONE_RING[tone]}` : "",
                  )}
                  style={{ width: `${width}px`, height: `${height}px` }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={1415}
                    height={2000}
                    draggable={false}
                    sizes={`${width}px`}
                    style={{ width: `${width}px`, height: `${height}px` }}
                    className={cn(
                      "h-auto select-none transition-[filter] duration-500",
                      "drop-shadow-[0_18px_28px_rgba(13,21,46,0.55)]",
                      isActive ? TONE_GLOW[tone] : "",
                    )}
                  />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.src}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.alt}`}
              aria-current={active ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active
                  ? `w-6 ${TONE_DOT_ACTIVE[tone]}`
                  : "w-1.5 bg-ink-700 hover:bg-ink-600",
              )}
            />
          );
        })}
      </div>

      {/* Caption hint */}
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-paper-600">
        drag · arrow keys · tap to view full
      </p>
    </div>
  );
}
