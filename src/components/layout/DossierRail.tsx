"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sections } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function DossierRail() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const activeSection = sections.find((s) => s.id === active);

  return (
    <>
      {/* Desktop sidebar rail */}
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

                <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded border border-ink-700 bg-ink-900/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-200 opacity-0 backdrop-blur transition-opacity duration-200 group-hover/item:opacity-100">
                  {s.title}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile bottom nav bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
        {/* Expanded section list */}
        {mobileOpen && (
          <div className="border-t border-ink-700 bg-ink-950/95 backdrop-blur-md">
            <ul className="flex overflow-x-auto px-4 py-3 gap-2 scrollbar-hide">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id} className="shrink-0">
                    <Link
                      href={`#${s.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200",
                        isActive
                          ? "border-brass-400/60 bg-brass-400/10 text-brass-400"
                          : "border-ink-700 text-paper-600 hover:border-paper-600 hover:text-paper-300",
                      )}
                    >
                      <span>{s.num}</span>
                      <span>{s.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-ink-700 bg-ink-950/95 px-5 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="block h-1.5 w-1.5 rounded-full bg-brass-400 shadow-[0_0_8px_var(--color-brass-400)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-400">
              {activeSection?.num} · {activeSection?.title}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            className="flex items-center gap-2 rounded border border-ink-700 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-600 transition-colors hover:border-paper-600 hover:text-paper-300"
          >
            {mobileOpen ? "✕ close" : "≡ nav"}
          </button>
        </div>
      </div>
    </>
  );
}
