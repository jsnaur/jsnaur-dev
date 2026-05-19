"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gesturix, lynk } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MockupCarousel } from "@/components/ui/MockupCarousel";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { StackBadges } from "@/components/ui/StackBadges";

type Shot = { src: string; alt: string };

const ASL_PREDICTIONS = [
  { letter: "L", conf: 94.3 },
  { letter: "Y", conf: 91.1 },
  { letter: "N", conf: 96.7 },
  { letter: "K", conf: 89.4 },
  { letter: "A", conf: 92.8 },
];

function GesturiXPanel() {
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0);
  
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % ASL_PREDICTIONS.length), 1200);
    return () => clearInterval(t);
  }, [reduced]);
  
  const cur = ASL_PREDICTIONS[idx];
  
  return (
    <div className="rounded-md border border-ink-700 bg-ink-950/85 px-3 py-2 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-verdict" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-paper-400">
          pytorch · inferring
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-paper-50">
        predicting → <span className="text-brass-400">&quot;{cur.letter}&quot;</span>{" "}
        <span className="text-paper-400">({cur.conf}%)</span>
      </p>
    </div>
  );
}

function LynkPanel() {
  const reduced = useReducedMotion();
  const [pulse, setPulse] = useState(0);
  
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setPulse((p) => (p + 1) % 3), 1200);
    return () => clearInterval(t);
  }, [reduced]);
  
  const states = [
    { label: "POST /moderate", status: "200ms · ✓ approved" },
    { label: "POST /moderate", status: "184ms · ✓ approved" },
    { label: "POST /moderate", status: "412ms · ⚑ flagged" },
  ];
  const cur = states[pulse];
  
  return (
    <div className="rounded-md border border-ink-700 bg-ink-950/85 px-3 py-2 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-navy-300" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-paper-400">
          webhook · ai moderation
        </span>
      </div>
      <p className="mt-1 font-mono text-xs text-paper-50">
        <span className="text-navy-300">{cur.label}</span>{" "}
        <span className="text-paper-400">→ {cur.status}</span>
      </p>
    </div>
  );
}

function ProjectColumn({
  caseNo,
  name,
  brandName,
  tagline,
  highlights,
  stack,
  github,
  role,
  period,
  topRight,
  visual,
}: {
  caseNo: string;
  name: string;
  brandName?: React.ReactNode;
  tagline: string;
  highlights: readonly string[];
  stack: readonly string[];
  github: string;
  role: string;
  period: string;
  topRight?: React.ReactNode;
  visual: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <MonoLabel className="text-navy-300">case {caseNo}</MonoLabel>
        {topRight}
      </div>
      <h3 className="mt-3 font-display text-4xl tracking-tight text-paper-50 sm:text-5xl">
        {brandName ?? name}
      </h3>
      <p className="mt-3 max-w-md text-paper-200">{tagline}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-paper-600">
        {role} · {period}
      </p>

      <div className="mt-8">{visual}</div>

      <ul className="mt-8 space-y-2.5 text-sm text-paper-200">
        {highlights.map((h) => (
          <li key={h} className="flex gap-3">
            <span className="mt-2 block h-px w-3 shrink-0 bg-brass-400" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <StackBadges stack={stack} speed={26} />
      </div>

      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-navy-300 hover:text-brass-400"
      >
        repository ↗
      </a>
    </div>
  );
}

export function ExhibitDiptych() {
  const [open, setOpen] = useState<Shot | null>(null);

  return (
    <section
      id="exhibits-bc"
      className="relative border-b border-ink-700 px-6 py-20 sm:px-10 sm:py-28 lg:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            num="03"
            eyebrow="Exhibits B & C"
            title="Mobile innovations — two cases, two languages."
            caption="GesturiX v. LYNK — one solves perception, one solves trust. tap any screen to view full."
          />
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="pointer-events-none absolute inset-y-12 left-1/2 hidden -translate-x-1/2 lg:block">
            <div className="relative h-full w-px bg-ink-700">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-700 bg-ink-950 px-2 py-0.5 text-sm font-display italic text-paper-400">
                vs.
              </span>
            </div>
          </div>

          <Reveal>
            <ProjectColumn
              caseNo={gesturix.caseNo}
              name={gesturix.name}
              brandName={
                <>
                  <span style={{ color: "#f97316" }}>Gesturi</span>
                  <span style={{ color: "#ef4444" }}>X</span>
                </>
              }
              tagline={gesturix.tagline}
              highlights={gesturix.highlights}
              stack={gesturix.stack}
              github={gesturix.github}
              role={gesturix.role}
              period={gesturix.period}
              visual={
                <div className="relative">
                  <MockupCarousel
                    width={170}
                    tone="brass"
                    autoMs={1500}
                    ariaLabel="GesturiX screens"
                    onSlideClick={setOpen}
                    slides={gesturix.screens.slice(0, 5).map((src, i) => ({
                      src,
                      alt: `GesturiX screen ${i + 1}`,
                    }))}
                  />
                  <div className="mt-4 flex justify-center">
                    <GesturiXPanel />
                  </div>
                </div>
              }
            />
          </Reveal>

          {/* Mobile "vs" divider — between the two columns */}
          <div className="flex items-center gap-4 lg:hidden">
            <div className="h-px flex-1 bg-ink-700" />
            <span className="rounded-full border border-ink-700 bg-ink-950 px-3 py-1 text-sm font-display italic text-paper-400">vs.</span>
            <div className="h-px flex-1 bg-ink-700" />
          </div>

          <Reveal delay={0.1}>
            <ProjectColumn
              caseNo={lynk.caseNo}
              name={lynk.name}
              brandName={
                <span style={{ color: "#d4a255" }}>LYNK</span>
              }
              tagline={lynk.tagline}
              highlights={lynk.highlights}
              stack={lynk.stack}
              github={lynk.github}
              role={lynk.role}
              period={lynk.period}
              visual={
                <div className="relative">
                  <MockupCarousel
                    width={180}
                    tone="navy"
                    autoMs={1500}
                    ariaLabel="LYNK screens"
                    onSlideClick={setOpen}
                    slides={lynk.screens.map((src, i) => ({
                      src,
                      alt: `LYNK screen ${i + 1}`,
                    }))}
                  />
                  <div className="mt-4 mx-auto max-w-[280px]">
                    <LynkPanel />
                  </div>
                </div>
              }
            />
          </Reveal>
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