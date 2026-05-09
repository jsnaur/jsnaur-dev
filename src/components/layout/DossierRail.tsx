"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sections } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function DossierRail() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(s.id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col gap-5">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="group/item relative">
              <Link
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${s.num} ${s.title}`}
                className="flex items-center gap-3"
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-300 ease-out",
                    isActive
                      ? "w-9 bg-brass-400"
                      : "w-4 bg-ink-700 group-hover/item:w-7 group-hover/item:bg-paper-400",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-200",
                    isActive
                      ? "text-paper-50"
                      : "text-paper-600 group-hover/item:text-paper-300",
                  )}
                >
                  {s.num}
                </span>
              </Link>

              {/* Floating title tooltip — only on hover */}
              <span
                className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded border border-ink-700 bg-ink-900/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-200 opacity-0 backdrop-blur transition-opacity duration-200 group-hover/item:opacity-100"
              >
                {s.title}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
