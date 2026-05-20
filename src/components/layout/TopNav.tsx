"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { sections } from "@/data/portfolio";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "TaraCSE", href: "#exhibit-a" },
  { label: "Projects", href: "#exhibits-bc" },
  { label: "Managed Teams", href: "#managed-teams" },
  { label: "Process", href: "#methodology" },
] as const;

export function TopNav() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const allTargets = [
      ...sections.map((s) => s.id),
      "managed-teams",
    ];
    allTargets.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (href: string) => active === href.replace("#", "");

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-ink-700/50 bg-ink-950/88 shadow-[0_1px_24px_rgba(13,21,46,0.55)] backdrop-blur-md"
          : "bg-transparent",
      )}
      animate={{ y: visible ? 0 : -64 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
        {/* Left — initials badge */}
        <Link href="#statement" className="group flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-brass-400/50 bg-brass-400/10 font-mono text-[9px] uppercase tracking-[0.08em] text-brass-400 transition-all group-hover:border-brass-400 group-hover:bg-brass-400/20">
            JT
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-paper-400 transition-colors group-hover:text-paper-200 sm:block">
            Jesnar T.
          </span>
        </Link>

        {/* Center — nav links (desktop only) */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-200",
                  active ? "text-paper-50" : "text-paper-600 hover:text-paper-300",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-md border border-ink-700 bg-ink-800/80"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right — Let's Talk CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="#closing"
            className={cn(
              "group flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200",
              isActive("#closing")
                ? "border-brass-400/60 bg-brass-400/10 text-brass-400"
                : "border-navy-500/50 text-paper-300 hover:border-brass-400/50 hover:bg-brass-400/5 hover:text-brass-300",
            )}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verdict opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verdict" />
            </span>
            Let&apos;s Talk
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-7 w-7 items-center justify-center rounded border border-ink-700 bg-ink-900/60 text-paper-400 transition-colors hover:border-ink-600 hover:text-paper-200 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="flex flex-col gap-[4px]"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[1.5px] w-[14px] origin-center rounded-full bg-current"
                  variants={{
                    open: {
                      0: { rotate: 45, y: 5.5 },
                      1: { opacity: 0, scaleX: 0 },
                      2: { rotate: -45, y: -5.5 },
                    }[i] ?? {},
                    closed: { rotate: 0, y: 0, opacity: 1, scaleX: 1 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink-700/60 bg-ink-950/96 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-0.5 p-3">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                      active
                        ? "border border-ink-700 bg-ink-800/80 text-paper-50"
                        : "text-paper-400 hover:bg-ink-800/40 hover:text-paper-200",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-1 border-t border-ink-700/50 pt-1">
                <Link
                  href="#closing"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-md border border-verdict/30 bg-verdict/5 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-verdict transition-colors hover:bg-verdict/10"
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verdict opacity-50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verdict" />
                  </span>
                  Let&apos;s Talk
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
