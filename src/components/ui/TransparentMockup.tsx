"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  /** Display width in px (height auto). */
  width?: number;
  /** Floating rhythm — three offset cycles so stacks never sync. */
  rhythm?: "a" | "b" | "c";
  /** Static rotation in degrees (the float wraps around this). */
  rotate?: number;
  /** Static translate (x, y) in px applied to the outer wrapper. */
  offset?: { x?: number; y?: number };
  /** Initial fade-in tilt offset — direction the mockup enters from. */
  enterFrom?: "left" | "right" | "center";
  /** Delay multiplier for staggered reveals. */
  delayIndex?: number;
  /** Glow/shadow tint hint. */
  tone?: "navy" | "brass" | "neutral";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  priority?: boolean;
};

const TONE_HOVER = {
  navy: "group-hover:drop-shadow-[0_25px_40px_rgba(107,141,214,0.35)]",
  brass: "group-hover:drop-shadow-[0_25px_40px_rgba(201,169,110,0.35)]",
  neutral: "group-hover:drop-shadow-[0_25px_40px_rgba(13,21,46,0.6)]",
} as const;

const TONE_PEDESTAL = {
  navy: "bg-[radial-gradient(ellipse_at_center,rgba(107,141,214,0.28)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  brass: "bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.22)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  neutral: "bg-[radial-gradient(ellipse_at_center,rgba(13,21,46,0.55)_0%,rgba(13,21,46,0.25)_35%,transparent_70%)]",
} as const;

/**
 * Displays a mobile mockup PNG that already contains its own device bezel and
 * has a transparent background. No outer frame is drawn — the mockup floats
 * directly on the page with a soft pedestal shadow, gentle vertical drift,
 * and a hover lift that intensifies the drop shadow.
 *
 * For static placement, pass a parent that controls position; for stacks of
 * 2–3 phones, vary `rhythm` per child so they don't breathe in unison.
 */
export function TransparentMockup({
  src,
  alt,
  width = 220,
  rhythm = "a",
  rotate = 0,
  offset,
  enterFrom = "center",
  delayIndex = 0,
  tone = "neutral",
  className,
  onClick,
  ariaLabel,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  const enterX = enterFrom === "left" ? -28 : enterFrom === "right" ? 28 : 0;

  // Mockup PNGs are 1415x2000 (≈ 0.7075 aspect). Compute display height to
  // match so next/image reserves the correct intrinsic box.
  const height = Math.round(width * (2000 / 1415));

  // Float class is deterministic from props so SSR and client render match.
  // The global `@media (prefers-reduced-motion)` rule in globals.css disables
  // the animation for users who opt out.
  const floatClass =
    rhythm === "a"
      ? "anim-float-a"
      : rhythm === "b"
        ? "anim-float-b"
        : "anim-float-c";

  const baseTransform = `translate(${offset?.x ?? 0}px, ${offset?.y ?? 0}px) rotate(${rotate}deg)`;

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: enterX, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.08 * delayIndex,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: baseTransform }}
      className={cn(
        "group relative inline-block will-change-transform",
        className,
      )}
    >
      {/* Pedestal shadow — anchors the mockup to the page surface */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 bottom-[-14px] h-6 w-[78%] -translate-x-1/2 rounded-full blur-md transition-opacity duration-500",
          TONE_PEDESTAL[tone],
          "opacity-70 group-hover:opacity-100",
        )}
      />

      {/* Floating layer — gentle drift in place */}
      <span
        className={cn(
          "block transition-transform duration-500 ease-out",
          floatClass,
          "group-hover:-translate-y-2 group-hover:scale-[1.025]",
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={1415}
          height={2000}
          priority={priority}
          sizes={`(max-width: 768px) ${width}px, ${width}px`}
          style={{ width: `${width}px`, height: `${height}px` }}
          className={cn(
            "h-auto select-none transition-[filter] duration-500",
            "drop-shadow-[0_18px_28px_rgba(13,21,46,0.55)]",
            TONE_HOVER[tone],
          )}
        />
      </span>
    </motion.div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? alt}
        className="cursor-zoom-in border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded-2xl"
      >
        {content}
      </button>
    );
  }
  return content;
}
