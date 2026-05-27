"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { num: "01", label: "TaraCSE", href: "#exhibit-a" },
  { num: "02", label: "Projects", href: "#exhibits-bc" },
  { num: "03", label: "Teams", href: "#managed-teams" },
  { num: "04", label: "Process", href: "#methodology" },
] as const;

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // While a click-driven smooth scroll is in flight, ignore the scroll-spy so
  // the pill slides straight to the target instead of chasing sections it
  // passes over on the way there.
  const clickScrollRef = useRef(false);
  const scrollRaf = useRef<number | null>(null);

  // Page scroll progress — drives the brass hairline at the bar's base.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Nav stays pinned at all times; we only toggle the glass/shadow once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cancel any in-flight click-scroll animation on unmount.
  useEffect(
    () => () => {
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    },
    [],
  );

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    // Observe only the actual nav destinations (plus the CTA's #closing).
    // We deliberately skip non-nav sections like #archive: it's a tall
    // wrapper around #managed-teams, so it always intersects the band and
    // would overwrite the Teams highlight under last-writer-wins.
    const navIds = [...NAV_LINKS.map((l) => l.href.slice(1)), "closing"];
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        // A click is steering the scroll — let it own `active`.
        if (clickScrollRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Among the sections currently in the band, the active one is the
        // section whose top sits closest to the top of the viewport.
        let topId = "";
        let topY = Infinity;
        for (const id of visible) {
          const el = document.getElementById(id);
          if (!el) continue;
          const y = el.getBoundingClientRect().top;
          if (Math.abs(y) < Math.abs(topY)) {
            topY = y;
            topId = id;
          }
        }
        if (topId) setActive(topId);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    navIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isActive = (href: string) => active === href.replace("#", "");

  // Custom eased scroll — a fixed, consistent glide instead of the browser's
  // native smooth scroll (which varies by browser and feels abrupt over long
  // distances). Runs on rAF, cancels any prior animation, and releases the
  // scroll-spy guard the moment it settles.
  const HEADER_OFFSET = 80; // h-16 bar (64px) + breathing room
  const animateScrollTo = useCallback((targetY: number, duration = 820) => {
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);

    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const endY = Math.max(0, Math.min(targetY, maxY));
    const startY = window.scrollY;
    const distance = endY - startY;
    if (Math.abs(distance) < 2) return;

    const startTime = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    clickScrollRef.current = true;
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(t));
      if (t < 1) {
        scrollRaf.current = requestAnimationFrame(step);
      } else {
        scrollRaf.current = null;
        clickScrollRef.current = false; // hand control back to the scroll-spy
      }
    };
    scrollRaf.current = requestAnimationFrame(step);
  }, []);

  // Drive nav clicks ourselves: slide the pill immediately, then glide the page
  // to the target with a header offset (works for any element, not just the
  // tagged sections). Jumps instantly if the user prefers reduced motion.
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return; // let the browser handle unknown hashes
      e.preventDefault();
      setMobileOpen(false);

      // Pill slides to the clicked item right away.
      setActive(id);

      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        window.scrollTo(0, top);
        return;
      }
      animateScrollTo(top);
    },
    [animateScrollTo],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-ink-700/60 bg-ink-950/85 shadow-[0_8px_30px_rgba(7,11,22,0.55)] backdrop-blur-xl"
          : "border-b border-transparent bg-ink-950/30 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-10 lg:px-14">
        {/* Left — brand lockup */}
        <Link
          href="#statement"
          onClick={(e) => handleNavClick(e, "#statement")}
          className="group flex shrink-0 items-center gap-3"
          aria-label="Back to top"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-brass-400/50 bg-brass-400/10 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-brass-400 transition-all duration-300 group-hover:border-brass-400 group-hover:bg-brass-400/20 group-hover:shadow-[0_0_18px_-4px_rgba(201,169,110,0.6)]">
            JT
            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verdict opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-verdict shadow-[0_0_6px_var(--color-verdict)]" />
            </span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-sm tracking-tight text-paper-50 transition-colors group-hover:text-brass-300">
              Jesnar Tindogan
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-paper-600 transition-colors group-hover:text-paper-400">
              Full-Stack · AI · PM
            </span>
          </span>
        </Link>

        {/* Center — nav links (desktop) */}
        <nav className="hidden items-center gap-1 rounded-full border border-ink-700/70 bg-ink-900/50 px-1.5 py-1 backdrop-blur-sm md:flex">
          {NAV_LINKS.map((item) => {
            const itemActive = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "group relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                  itemActive
                    ? "text-paper-50"
                    : "text-paper-500 hover:text-paper-100",
                )}
              >
                {itemActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full border border-brass-400/40 bg-brass-400/10 shadow-[inset_0_0_12px_-6px_rgba(201,169,110,0.6)]"
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                      mass: 0.9,
                    }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 text-[9px] tabular-nums transition-colors",
                    itemActive
                      ? "text-brass-400"
                      : "text-paper-600 group-hover:text-paper-400",
                  )}
                >
                  {item.num}
                </span>
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right — CTA + résumé + mobile toggle */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/Tindogan_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border border-ink-700 bg-ink-900/60 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-300 transition-all duration-200 hover:border-navy-300/60 hover:text-paper-50 lg:inline-flex"
          >
            Résumé
          </a>

          <Link
            href="#closing"
            onClick={(e) => handleNavClick(e, "#closing")}
            className={cn(
              "group flex items-center gap-2 rounded-md border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-200 sm:px-4",
              isActive("#closing")
                ? "border-brass-400/70 bg-brass-400/15 text-brass-300 shadow-[0_0_18px_-5px_rgba(201,169,110,0.5)]"
                : "border-brass-400/40 bg-brass-400/5 text-brass-300 hover:border-brass-400/70 hover:bg-brass-400/15 hover:shadow-[0_0_18px_-5px_rgba(201,169,110,0.5)]",
            )}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verdict opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-verdict" />
            </span>
            Let&apos;s Talk
            <span className="opacity-60 transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-700 bg-ink-900/60 text-paper-300 transition-colors hover:border-ink-600 hover:text-paper-100 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.div
              animate={mobileOpen ? "open" : "closed"}
              className="flex flex-col gap-[5px]"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[1.5px] w-[16px] origin-center rounded-full bg-current"
                  variants={{
                    open:
                      {
                        0: { rotate: 45, y: 6.5 },
                        1: { opacity: 0, scaleX: 0 },
                        2: { rotate: -45, y: -6.5 },
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

      {/* Scroll progress — brass hairline tracking page position */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-brass-400/70 via-brass-400 to-brass-300 shadow-[0_0_8px_rgba(201,169,110,0.5)]"
      />

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink-700/60 bg-ink-950/97 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((item, i) => {
                const itemActive = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 font-mono text-[12px] uppercase tracking-[0.16em] transition-colors",
                        itemActive
                          ? "border border-brass-400/40 bg-brass-400/10 text-paper-50"
                          : "text-paper-400 hover:bg-ink-800/50 hover:text-paper-100",
                      )}
                    >
                      <span
                        className={cn(
                          "text-[10px] tabular-nums",
                          itemActive ? "text-brass-400" : "text-paper-600",
                        )}
                      >
                        {item.num}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-ink-700/50 pt-3">
                <a
                  href="/Tindogan_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-lg border border-ink-700 bg-ink-900/60 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-paper-300 transition-colors hover:border-navy-300/50 hover:text-paper-50"
                >
                  Résumé
                </a>
                <Link
                  href="#closing"
                  onClick={(e) => handleNavClick(e, "#closing")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-brass-400/40 bg-brass-400/10 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-brass-300 transition-colors hover:bg-brass-400/20"
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
    </header>
  );
}
