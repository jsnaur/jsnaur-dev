"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { taracse } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CaseCard } from "@/components/ui/CaseCard";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { MockupCarousel } from "@/components/ui/MockupCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Lightbox } from "@/components/ui/Lightbox";

/* Auto-scrolling browser preview with manual takeover */
function ScrollableLanding({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const inView = useInView(containerRef, { margin: "-20%" });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !inView || paused) return;

    let raf = 0;
    let last = performance.now();
    const speed = 22; // px / second

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let next = el.scrollTop + speed * dt;
      if (next >= max) next = 0; // loop back to top
      el.scrollTop = next;
      setProgress(next / max);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, paused]);

  // Manual scroll updates progress
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max > 0) setProgress(el.scrollTop / max);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <BrowserFrame
        url="taracse.app"
        className="relative"
        rightSlot={
          <button
            onClick={() => setOpen(true)}
            className="rounded border border-ink-700 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper-400 hover:border-navy-300 hover:text-paper-50 transition-colors"
            aria-label="View full mockup"
          >
            view full ↗
          </button>
        }
      >
        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="h-[420px] sm:h-[520px] lg:h-[580px] overflow-y-auto overscroll-contain bg-ink-950"
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={6000}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={false}
          />
        </div>
        {/* Brass progress hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-ink-700">
          <div
            className="h-full bg-brass-400 transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        {/* Status overlay */}
        <div className="pointer-events-none absolute right-3 top-12 rounded border border-ink-700 bg-ink-950/80 px-2 py-1 backdrop-blur">
          <span className="font-mono text-[9px] uppercase tracking-wider text-paper-400">
            {paused ? "● manual" : "▸ auto-preview"}
          </span>
        </div>
      </BrowserFrame>

      <Lightbox open={open} onClose={() => setOpen(false)} src={src} alt={alt} />
    </>
  );
}

/* RAG architecture diagram */
function RAGDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  // Each node is one or two lines so longer labels never overflow the 140px box.
  const nodes: [string, string?][] = [
    ["User Query"],
    ["Embed", "(Gemini)"],
    ["Vector Search", "(pgvector)"],
    ["Context Inject"],
    ["LLM Response"],
    ["Rate Limit", "(10/min)"],
  ];

  return (
    <div className="relative">
      <MonoLabel className="text-navy-300">
        argument — system architecture
      </MonoLabel>
      <h3 className="mt-3 font-display text-2xl text-paper-50 sm:text-3xl">
        How a question becomes a grounded answer.
      </h3>

      <div className="mt-8 overflow-x-auto pb-4">
        <svg
          ref={ref}
          viewBox="0 0 980 140"
          className="min-w-[860px] w-full"
          aria-label="RAG architecture flow"
        >
          {nodes.map(([line1, line2], i) => {
            const x = 30 + i * 156;
            // Vertical centering: single-line at y=75; two-line at y=68 / 82.
            const singleY = 75;
            return (
              <g key={line1}>
                <motion.rect
                  x={x}
                  y={50}
                  width={140}
                  height={42}
                  rx={6}
                  fill="#131b2e"
                  stroke="#3d63b8"
                  strokeWidth={1}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * i }}
                />
                <motion.text
                  x={x + 70}
                  y={line2 ? 68 : singleY}
                  fontSize={11}
                  fill="#c9d1e0"
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains-mono)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 * i + 0.1 }}
                >
                  <tspan x={x + 70}>{line1}</tspan>
                  {line2 && (
                    <tspan x={x + 70} dy={13} fill="#8593ae">
                      {line2}
                    </tspan>
                  )}
                </motion.text>
                {i < nodes.length - 1 && (
                  <motion.line
                    x1={x + 140}
                    y1={71}
                    x2={x + 156}
                    y2={71}
                    stroke="#6b8dd6"
                    strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.15 * i + 0.2 }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* Desktop screenshot card with mouse-tilt + scanner */
function BentoCard({
  d,
  index,
  onOpen,
}: {
  d: { src: string; alt: string; tab: string; span: string };
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 26 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const shineX = useTransform(springX, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(springY, [-0.5, 0.5], ["20%", "80%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(20% 0 100% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${d.span}`}
      style={{ perspective: "900px" }}
    >
      <motion.button
        ref={cardRef}
        onClick={onOpen}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="group relative block w-full overflow-hidden rounded-lg border border-ink-700 bg-ink-900 transition-colors hover:border-navy-400/70"
      >
        {/* Scanner sweep */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <motion.div
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-navy-400/70 to-transparent shadow-[0_0_12px_2px_rgba(61,99,184,0.45)]"
            animate={{ y: ["0%", "5000%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Mouse-follow shine */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(107,141,214,0.10) 0%, transparent 55%)`,
          }}
        />

        {/* Tab bar */}
        <div className="relative z-20 flex items-center justify-between border-b border-ink-700 bg-ink-800/60 px-3 py-1.5">
          <span className="font-mono text-[10px] text-paper-400">{d.tab}</span>
          <motion.span
            className="font-mono text-[10px] text-paper-600"
            whileHover={{ color: "#c9a96e" }}
          >
            open ↗
          </motion.span>
        </div>

        <Image
          src={d.src}
          alt={d.alt}
          width={1400}
          height={900}
          className="relative z-0 h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.button>
    </motion.div>
  );
}

export function ExhibitTaraCSE() {
  const [openImg, setOpenImg] = useState<{ src: string; alt: string } | null>(null);

  const desktops: { src: string; alt: string; tab: string; span: string }[] = [
    {
      src: taracse.desktop.dashboard,
      alt: "TaraCSE dashboard",
      tab: "/dashboard",
      span: "lg:col-span-7",
    },
    {
      src: taracse.desktop.practice,
      alt: "TaraCSE practice",
      tab: "/practice",
      span: "lg:col-span-4",
    },
    {
      src: taracse.desktop.mock,
      alt: "TaraCSE mock exam",
      tab: "/mock",
      span: "lg:col-span-4",
    },
    {
      src: taracse.desktop.analytics,
      alt: "TaraCSE analytics",
      tab: "/analytics",
      span: "lg:col-span-7",
    },
  ];

  return (
    <section
      id="exhibit-a"
      className="relative overflow-hidden border-b border-ink-700 px-6 py-20 sm:px-10 sm:py-28 lg:px-32"
    >
      {/* Ambient background orbs */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[40rem] w-[40rem] rounded-full bg-navy-500/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-brass-400/4 blur-3xl" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            num="02"
            eyebrow="Exhibit A"
            title="TaraCSE — the flagship case."
            caption={`${taracse.tagline} · ${taracse.role} · solo build · ${taracse.period}`}
          />
        </Reveal>

        {/* Movement 1 — scrollable landing preview */}
        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <ScrollableLanding src={taracse.desktop.landing} alt="TaraCSE landing page" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-600">
                hover to take control · auto-previews when idle · click &quot;view full&quot; to inspect
              </p>
            </div>
            <div className="lg:col-span-4">
              <CaseCard filename="case_no.txt" className="h-full">
                <div className="space-y-4">
                  <div>
                    <MonoLabel className="text-navy-300">CASE</MonoLabel>
                    <p className="mt-1 font-display text-2xl text-paper-50">
                      {taracse.caseNo}
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-paper-200">
                    {taracse.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-2 block h-px w-3 shrink-0 bg-brass-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 border-t border-ink-700 pt-4">
                    {taracse.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-ink-700 px-2 py-0.5 font-mono text-[10px] text-paper-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={taracse.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-navy-300 hover:text-brass-400"
                  >
                    repository ↗
                  </a>
                </div>
              </CaseCard>
            </div>
          </div>
        </Reveal>

        {/* Movement 2 — bento with unmask reveal, tilt, and scanner hover */}
        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-11 lg:gap-6">
          {desktops.map((d, i) => (
            <BentoCard
              key={d.src}
              d={d}
              index={i}
              onOpen={() => setOpenImg({ src: d.src, alt: d.alt })}
            />
          ))}
        </div>

        {/* Mobile stack — own row */}
        <Reveal delay={0.15} className="mt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <MonoLabel className="text-navy-300">
                exhibit a.5 — mobile responsive
              </MonoLabel>
              <h3 className="mt-3 font-display text-3xl text-paper-50 sm:text-4xl">
                Same architecture, scaled to a thumb.
              </h3>
              <p className="mt-4 max-w-md text-paper-200">
                Every TaraCSE surface — landing, dashboard, practice, mock exam,
                analytics — adapts cleanly to mobile. Component reuse over duplication;
                breakpoints over rewrites.
              </p>
              <div className="mt-6 space-y-2 font-mono text-[11px] text-paper-400">
                <p>◆ landing → tap to start</p>
                <p>◆ dashboard → progress at a glance</p>
                <p>◆ practice → infinite-scroll quizzes</p>
                <p>◆ mock → exam-mode, timer, no shortcuts</p>
                <p>◆ analytics → score curves, weak topics</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <MockupCarousel
                width={210}
                tone="brass"
                ariaLabel="TaraCSE mobile screens"
                onSlideClick={setOpenImg}
                slides={[
                  { src: taracse.mobile.landing, alt: "TaraCSE mobile — landing" },
                  { src: taracse.mobile.dashboard, alt: "TaraCSE mobile — dashboard" },
                  { src: taracse.mobile.practice, alt: "TaraCSE mobile — practice" },
                  { src: taracse.mobile.mock, alt: "TaraCSE mobile — mock exam" },
                  { src: taracse.mobile.analytics, alt: "TaraCSE mobile — analytics" },
                ]}
              />
            </div>
          </div>
        </Reveal>

        {/* Movement 3 — live metrics strip */}
        <Reveal delay={0.05} className="mt-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { val: "10", unit: "req/min", label: "Rate Limit / User" },
              { val: "pgvector", unit: "", label: "Vector Engine" },
              { val: "RAG", unit: "pipeline", label: "Retrieval System" },
              { val: "Solo", unit: "build", label: "Authorship" },
            ].map(({ val, unit, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-lg border border-ink-700 bg-ink-900/80 p-4 text-center"
              >
                <p className="font-display text-2xl text-paper-50 sm:text-3xl">
                  {val}
                  {unit && (
                    <span className="ml-1 font-mono text-sm text-paper-600">{unit}</span>
                  )}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-600">
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Movement 4 — RAG diagram */}
        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-lg border border-ink-700 bg-ink-900/60 p-6 sm:p-10">
            <RAGDiagram />
          </div>
        </Reveal>
      </div>

      <Lightbox
        open={!!openImg}
        onClose={() => setOpenImg(null)}
        src={openImg?.src ?? ""}
        alt={openImg?.alt ?? ""}
      />
    </section>
  );
}