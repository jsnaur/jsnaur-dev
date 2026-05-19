"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  width?: number;
  rhythm?: "a" | "b" | "c";
  rotate?: number;
  offset?: { x?: number; y?: number };
  enterFrom?: "left" | "right" | "center";
  delayIndex?: number;
  tone?: "navy" | "brass" | "neutral";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  priority?: boolean;
};

const TONE_HOVER = {
  navy: "group-hover:drop-shadow-[0_28px_44px_rgba(107,141,214,0.45)]",
  brass: "group-hover:drop-shadow-[0_28px_44px_rgba(201,169,110,0.45)]",
  neutral: "group-hover:drop-shadow-[0_28px_44px_rgba(13,21,46,0.7)]",
} as const;

const TONE_PEDESTAL = {
  navy: "bg-[radial-gradient(ellipse_at_center,rgba(107,141,214,0.28)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  brass: "bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.22)_0%,rgba(13,21,46,0.4)_35%,transparent_70%)]",
  neutral: "bg-[radial-gradient(ellipse_at_center,rgba(13,21,46,0.55)_0%,rgba(13,21,46,0.25)_35%,transparent_70%)]",
} as const;

const TONE_SHINE = {
  navy: "rgba(107,141,214,0.14)",
  brass: "rgba(201,169,110,0.14)",
  neutral: "rgba(255,255,255,0.08)",
} as const;

const FLOAT_CLASS = {
  a: "anim-float-a",
  b: "anim-float-b",
  c: "anim-float-c",
} as const;

function Inner({
  src,
  alt,
  width,
  height,
  tone,
  rhythm,
  rotate,
  offset,
  enterFrom,
  delayIndex,
  priority,
  className,
}: {
  src: string; alt: string; width: number; height: number;
  tone: "navy" | "brass" | "neutral";
  rhythm: "a" | "b" | "c";
  rotate: number;
  offset: { x?: number; y?: number };
  enterFrom: "left" | "right" | "center";
  delayIndex: number;
  priority: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const shineX = useTransform(springX, [-0.5, 0.5], ["15%", "85%"]);
  const shineY = useTransform(springY, [-0.5, 0.5], ["15%", "85%"]);

  const enterX = enterFrom === "left" ? -30 : enterFrom === "right" ? 30 : 0;
  const baseTransform = `translate(${offset?.x ?? 0}px, ${offset?.y ?? 0}px) rotate(${rotate}deg)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: enterX, y: 24 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.08 * delayIndex, ease: [0.22, 1, 0.36, 1] }}
      style={{ transform: baseTransform }}
      className={cn("group relative inline-block will-change-transform", className)}
    >
      {/* Pedestal */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-[-14px] left-1/2 h-6 w-[78%] -translate-x-1/2 rounded-full blur-md transition-opacity duration-500",
          TONE_PEDESTAL[tone],
          "opacity-70 group-hover:opacity-100",
        )}
      />

      {/* Float + tilt wrapper */}
      <motion.div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: 700,
        }}
        className={cn(
          "relative block transition-[filter] duration-500 ease-out",
          FLOAT_CLASS[rhythm],
          "group-hover:-translate-y-2",
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

        {/* Mouse-follow shine */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${shineX} ${shineY}, ${TONE_SHINE[tone]} 0%, transparent 55%)`,
          }}
        />

        {/* Scan-line sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            className="h-[1px] w-full bg-white/10 shadow-[0_0_6px_1px_rgba(255,255,255,0.08)]"
            animate={{ y: ["0%", "5000%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TransparentMockup({
  src,
  alt,
  width = 220,
  rhythm = "a",
  rotate = 0,
  offset = {},
  enterFrom = "center",
  delayIndex = 0,
  tone = "neutral",
  className,
  onClick,
  ariaLabel,
  priority = false,
}: Props) {
  const height = Math.round(width * (2000 / 1415));

  const inner = (
    <Inner
      src={src}
      alt={alt}
      width={width}
      height={height}
      tone={tone}
      rhythm={rhythm}
      rotate={rotate}
      offset={offset}
      enterFrom={enterFrom}
      delayIndex={delayIndex}
      priority={priority}
      className={className}
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel ?? alt}
        className="cursor-zoom-in border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 rounded-2xl"
      >
        {inner}
      </button>
    );
  }
  return inner;
}
