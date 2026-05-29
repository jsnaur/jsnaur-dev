"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { events, eventCategories, type EventCategory, type EventEntry } from "@/data/events";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

const CATEGORY_TONE: Record<EventCategory, { dot: string; text: string; border: string; glow: string }> = {
  Robotics: {
    dot: "bg-brass-400",
    text: "text-brass-300",
    border: "border-brass-400/40",
    glow: "shadow-[0_0_18px_-5px_rgba(201,169,110,0.55)]",
  },
  Cloud: {
    dot: "bg-navy-300",
    text: "text-navy-300",
    border: "border-navy-400/40",
    glow: "shadow-[0_0_18px_-5px_rgba(129,140,248,0.55)]",
  },
  Community: {
    dot: "bg-verdict",
    text: "text-verdict",
    border: "border-verdict/40",
    glow: "shadow-[0_0_18px_-5px_rgba(74,222,128,0.55)]",
  },
  Design: {
    dot: "bg-paper-100",
    text: "text-paper-100",
    border: "border-paper-300/40",
    glow: "shadow-[0_0_18px_-5px_rgba(250,250,250,0.4)]",
  },
};

function EventCard({
  event,
  index,
  onOpen,
}: {
  event: EventEntry;
  index: number;
  onOpen: (img: { src: string; alt: string }) => void;
}) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15%" });
  const tone = CATEGORY_TONE[event.category];

  useEffect(() => {
    if (!inView || event.images.length <= 1) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % event.images.length),
      3800 + index * 250,
    );
    return () => clearInterval(t);
  }, [inView, event.images.length, index]);

  const currentSrc = event.images[idx];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className="relative flex h-full flex-col overflow-hidden rounded-lg border border-ink-700 bg-ink-900/80 backdrop-blur-sm transition-colors duration-300 hover:border-brass-400/40"
      >
        {/* Tab bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-ink-700 bg-ink-800/70 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className={cn("h-1.5 w-1.5 rounded-full", tone.dot)} />
            <span className={cn("font-mono text-[10px] uppercase tracking-[0.18em]", tone.text)}>
              {event.category}
            </span>
          </div>
          <span className="font-mono text-[10px] tabular-nums text-paper-500">
            {event.timeframe}
          </span>
        </div>

        {/* Image carousel */}
        <button
          type="button"
          onClick={() => onOpen({ src: currentSrc, alt: `${event.title} — photo ${idx + 1}` })}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-800"
          aria-label={`Open photo from ${event.title}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSrc}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={currentSrc}
                alt={`${event.title} — photo ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Scanner line — sweeps the photo on card hover */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-brass-400/70 shadow-[0_0_10px_1px_rgba(201,169,110,0.55)]"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-brass-400/5 mix-blend-overlay" />
          </div>

          {/* Timeframe badge on image */}
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-md border bg-ink-950/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur",
              tone.border,
              tone.text,
              tone.glow,
            )}
          >
            {event.timeframe}
          </span>

          {/* Slide dots */}
          {event.images.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
              {event.images.map((_, i) => (
                <span
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIdx(i);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${i + 1}`}
                  className={cn(
                    "h-[3px] cursor-pointer rounded-full transition-all duration-300",
                    i === idx ? "w-6 bg-brass-400" : "w-1.5 bg-paper-50/30 hover:bg-paper-50/60",
                  )}
                />
              ))}
            </div>
          )}
        </button>

        {/* Body */}
        <div className="relative z-10 flex flex-1 flex-col border-t border-ink-700 px-4 py-4">
          <h3 className="font-display text-xl tracking-tight text-paper-50 transition-colors group-hover:text-brass-300">
            {event.title}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-500">
            {event.role}
          </p>
          <p className="mt-3 text-sm text-paper-300">{event.blurb}</p>

          {event.highlights.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {event.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-md border border-ink-700 bg-ink-800/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-paper-400"
                >
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function EventsSection() {
  const [filter, setFilter] = useState<EventCategory | "All">("All");
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  const sorted = useMemo(() => {
    const arr = filter === "All" ? events : events.filter((e) => e.category === filter);
    return [...arr].sort((a, b) => b.sortKey - a.sortKey);
  }, [filter]);

  const newest = sorted[0];
  const oldest = sorted.length > 1 ? sorted[sorted.length - 1] : null;

  const filters: Array<EventCategory | "All"> = ["All", ...eventCategories];

  return (
    <section
      id="events"
      className="relative overflow-hidden border-b border-ink-700 px-6 py-20 sm:px-10 sm:py-28 lg:px-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-columnrule opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            num="06"
            eyebrow="Events × Field Notes"
            title="Where I show up, and what I run."
            caption="events/ — facilitation, workshops, and community presence on file."
          />
        </Reveal>

        {/* Span rail — newest → oldest timeframes */}
        {newest && (
          <Reveal delay={0.08} className="mt-10">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex min-w-0 flex-col">
                <MonoLabel className="text-brass-400">most recent</MonoLabel>
                <span className="mt-1 truncate font-display text-lg text-paper-50 sm:text-xl">
                  {newest.timeframe}
                </span>
              </div>
              <div className="relative flex-1">
                <span className="block h-px w-full bg-gradient-to-r from-brass-400/60 via-ink-700 to-navy-400/40" />
                <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brass-400 shadow-[0_0_10px_rgba(201,169,110,0.7)]" />
                <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-navy-300 shadow-[0_0_10px_rgba(129,140,248,0.7)]" />
              </div>
              {oldest && (
                <div className="flex min-w-0 flex-col items-end text-right">
                  <MonoLabel className="text-navy-300">earliest</MonoLabel>
                  <span className="mt-1 truncate font-display text-lg text-paper-50 sm:text-xl">
                    {oldest.timeframe}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* Filter chips */}
        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <MonoLabel className="mr-2 text-paper-500">filter:</MonoLabel>
            {filters.map((f) => {
              const active = f === filter;
              return (
                <motion.button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    "relative rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-200",
                    active
                      ? "border-brass-400/60 bg-brass-400/10 text-brass-300 shadow-[inset_0_0_12px_-6px_rgba(201,169,110,0.6)]"
                      : "border-ink-700 bg-ink-900/50 text-paper-400 hover:border-ink-600 hover:text-paper-100",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="events-active-pill"
                      className="absolute inset-0 rounded-full border border-brass-400/40 bg-brass-400/10"
                      transition={{ type: "spring", stiffness: 280, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </motion.button>
              );
            })}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-paper-600">
              {sorted.length} {sorted.length === 1 ? "exhibit" : "exhibits"}
            </span>
          </div>
        </Reveal>

        {/* Flat grid — most recent → oldest */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {sorted.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onOpen={setOpen}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 border-t border-ink-700 pt-6">
          <p className="font-mono text-[11px] text-paper-600">
            ◆ Robotics facilitation across RoboQuest 2024 · RoboQuest 2025 · Summer Cup Vis–Min ·
            workshops in AWS · GDG · UXPH
          </p>
        </div>
      </div>

      <Lightbox
        open={!!open}
        onClose={() => setOpen(null)}
        src={open?.src ?? ""}
        alt={open?.alt ?? ""}
      />
    </section>
  );
}
