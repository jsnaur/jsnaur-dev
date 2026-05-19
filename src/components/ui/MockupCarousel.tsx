"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";

export type Slide = { src: string; alt: string };

type Tone = "navy" | "brass" | "neutral";

type Props = {
  slides: Slide[];
  width?: number;
  autoMs?: number;
  tone?: Tone;
  onSlideClick?: (s: Slide) => void;
  className?: string;
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
  navy: "drop-shadow-[0_30px_50px_rgba(107,141,214,0.45)]",
  brass: "drop-shadow-[0_30px_50px_rgba(201,169,110,0.45)]",
  neutral: "drop-shadow-[0_30px_50px_rgba(13,21,46,0.7)]",
} as const;

const TONE_GLOW_RING_COLOR = {
  navy: "rgba(107,141,214,0.35)",
  brass: "rgba(201,169,110,0.35)",
  neutral: "rgba(200,200,220,0.15)",
} as const;

const TONE_PEDESTAL = {
  navy: "bg-[radial-gradient(ellipse_at_center,rgba(107,141,214,0.32)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  brass: "bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.26)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  neutral: "bg-[radial-gradient(ellipse_at_center,rgba(13,21,46,0.55)_0%,rgba(13,21,46,0.25)_35%,transparent_70%)]",
} as const;

function positionStyle(rel: number) {
  if (rel === 0) {
    return { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 30 };
  }
  if (rel === -1) {
    return { x: -145, z: -80, rotateY: 22, scale: 0.82, opacity: 0.45, zIndex: 20 };
  }
  if (rel === 1) {
    return { x: 145, z: -80, rotateY: -22, scale: 0.82, opacity: 0.45, zIndex: 20 };
  }
  const sign = rel < 0 ? -1 : 1;
  return { x: sign * 260, z: -120, rotateY: sign * -30, scale: 0.55, opacity: 0, zIndex: 10 };
}

/* Active slide with mouse-follow 3-D tilt */
function TiltSlide({
  s,
  width,
  height,
  tone,
  onSlideClick,
}: {
  s: Slide;
  width: number;
  height: number;
  tone: Tone;
  onSlideClick?: (s: Slide) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 28 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Shine position follows mouse
  const shineX = useTransform(springX, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(springY, [-0.5, 0.5], ["20%", "80%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSlideClick?.(s)}
      aria-label={`View ${s.alt}`}
      aria-current="true"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className={cn(
        "relative block cursor-zoom-in rounded-[2.2rem] border-0 bg-transparent p-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
        `ring-1 ${TONE_RING[tone]}`,
      )}
      whileTap={{ scale: 0.96 }}
    >
      <Image
        src={s.src}
        alt={s.alt}
        width={1415}
        height={2000}
        draggable={false}
        sizes={`${width}px`}
        style={{ width: `${width}px`, height: `${height}px` }}
        className={cn("h-auto select-none rounded-[2.2rem]", TONE_GLOW[tone])}
        priority
      />

      {/* Mouse-follow shine overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2.2rem] opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />

      {/* Pulsing glow ring */}
      <motion.div
        className="pointer-events-none absolute inset-[-3px] rounded-[2.4rem]"
        animate={{
          boxShadow: [
            `0 0 0 0px ${TONE_GLOW_RING_COLOR[tone]}`,
            `0 0 0 6px ${TONE_GLOW_RING_COLOR[tone]}`,
            `0 0 0 0px ${TONE_GLOW_RING_COLOR[tone]}`,
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
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
    (delta: number) => setIndex((i) => (i + delta + len) % len),
    [len],
  );
  const jumpTo = useCallback((i: number) => setIndex(((i % len) + len) % len), [len]);

  useEffect(() => {
    if (!autoMs || paused || !inView || len <= 1) return;
    const t = window.setInterval(() => go(1), autoMs);
    return () => window.clearInterval(t);
  }, [autoMs, paused, inView, len, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if ((e.key === "Enter" || e.key === " ") && onSlideClick) {
      e.preventDefault();
      onSlideClick(slides[index]);
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
      {/* 3-D stage */}
      <div
        className="relative mx-auto"
        style={{
          width: `${width + 300}px`,
          maxWidth: "100%",
          height: `${height + 60}px`,
          perspective: "1400px",
        }}
      >
        <AnimatePresence initial={false}>
          {slides.map((s, i) => {
            let rel = i - index;
            if (rel > len / 2) rel -= len;
            if (rel < -len / 2) rel += len;
            if (Math.abs(rel) > 1) return null;

            const pos = positionStyle(rel);
            const isActive = rel === 0;

            if (isActive) {
              return (
                <motion.div
                  key={s.src}
                  className="absolute left-1/2 top-0"
                  style={{ marginLeft: -width / 2, zIndex: pos.zIndex, transformStyle: "preserve-3d" }}
                  initial={{ opacity: 0, scale: 0.5, z: -300 }}
                  animate={{ x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9 }}
                >
                  {/* Pedestal */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute bottom-[-16px] left-1/2 h-6 w-[78%] -translate-x-1/2 rounded-full blur-lg",
                      TONE_PEDESTAL[tone],
                      "opacity-95",
                    )}
                  />
                  <TiltSlide
                    s={s}
                    width={width}
                    height={height}
                    tone={tone}
                    onSlideClick={onSlideClick}
                  />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={s.src}
                className="absolute left-1/2 top-0"
                style={{ marginLeft: -width / 2, zIndex: pos.zIndex, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.5, z: -200 }}
                animate={{
                  x: pos.x,
                  z: pos.z,
                  rotateY: pos.rotateY,
                  scale: pos.scale,
                  opacity: pos.opacity,
                }}
                whileHover={{ scale: pos.scale * 1.06, opacity: 0.7, z: pos.z + 30 }}
                transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.8 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 || info.velocity.x < -300) go(1);
                  else if (info.offset.x > 50 || info.velocity.x > 300) go(-1);
                }}
              >
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Show ${s.alt}`}
                  tabIndex={-1}
                  className="block cursor-pointer rounded-[2.2rem] border-0 bg-transparent p-0 focus:outline-none"
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
                    className="h-auto select-none drop-shadow-lg"
                  />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Animated dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <motion.button
              key={s.src}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to slide ${i + 1}: ${s.alt}`}
              aria-current={active ? "true" : undefined}
              animate={active ? { width: 24, opacity: 1 } : { width: 6, opacity: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={cn(
                "h-1.5 rounded-full",
                active ? TONE_DOT_ACTIVE[tone] : "bg-ink-700 hover:bg-ink-500",
              )}
            />
          );
        })}
      </div>

      {/* Caption */}
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-paper-600">
        drag · arrow keys · tap to view full
      </p>
    </div>
  );
}
