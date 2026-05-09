"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function HairlineDivider({
  className,
  vertical = false,
  delay = 0,
}: {
  className?: string;
  vertical?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
      className={cn(
        vertical ? "w-px bg-ink-700" : "h-px w-full bg-ink-700",
        "relative overflow-hidden",
        className,
      )}
    >
      <div
        style={{
          transformOrigin: vertical ? "top" : "left",
          transform: shown
            ? vertical
              ? "scaleY(1)"
              : "scaleX(1)"
            : vertical
            ? "scaleY(0)"
            : "scaleX(0)",
          transitionDelay: `${delay}s`,
        }}
        className="absolute inset-0 bg-navy-400 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      />
    </div>
  );
}
