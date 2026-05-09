"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.18);
    y.set(dy * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles =
    variant === "primary"
      ? "bg-brass-400 text-ink-950 hover:bg-brass-300"
      : "border border-navy-500/60 text-paper-50 hover:border-navy-300 hover:bg-navy-500/10";

  const linkProps = external
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-block"
      onMouseMove={(e) => handleMove(e as unknown as React.MouseEvent<HTMLAnchorElement>)}
      onMouseLeave={handleLeave}
    >
      <Link
        href={href}
        {...linkProps}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={cn(
          "inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-200",
          styles,
          className,
        )}
      >
        {children}
      </Link>
    </motion.span>
  );
}
