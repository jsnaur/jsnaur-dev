"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * SSR-safe reveal. Server and first client render emit identical markup
 * (opacity-0 + translated). After mount, an IntersectionObserver toggles
 * the visible state. CSS handles the transition — no framer hydration drift.
 */
export function Reveal({ children, delay = 0, y = 16, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}s`,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        willChange: "opacity, transform",
      }}
      className={cn(
        "transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
