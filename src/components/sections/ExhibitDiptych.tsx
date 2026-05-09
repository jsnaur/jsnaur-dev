"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gesturix, lynk } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";

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
    const t = setInterval(() => setIdx((i) => (i + 1) % ASL_PREDICTIONS.length), 1400);
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
    const t = setInterval(() => setPulse((p) => (p + 1) % 3), 1500);
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

function FannedHand({ srcs, onOpen }: { srcs: string[]; onOpen: (s: Shot) => void }) {
  // 5 phones fanning out — wide rotation + explicit X spread so each is fully visible
  const angles = [-22, -11, 0, 11, 22];
  const xs = [-150, -78, 0, 78, 150];
  const ys = [60, 18, 0, 18, 60];
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[560px] overflow-hidden sm:h-[480px] sm:overflow-visible">
      {srcs.slice(0, 5).map((s, i) => (
        <button
          key={s}
          type="button"
          onClick={() => onOpen({ src: s, alt: `GesturiX screen ${i + 1}` })}
          aria-label={`View GesturiX screen ${i + 1}`}
          className="group absolute left-1/2 top-4 transition-transform duration-[450ms] ease-out hover:z-50 focus:z-50 focus:outline-none"
          style={{
            transform: `translate(calc(-50% + ${xs[i]}px), ${ys[i]}px) rotate(${angles[i]}deg)`,
            zIndex: 10 - Math.abs(i - 2),
          }}
        >
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-4 group-hover:scale-[1.06] group-focus-visible:-translate-y-4">
            <PhoneFrame
              src={s}
              alt={`GesturiX screen ${i + 1}`}
              className="w-[170px] ring-1 ring-ink-700/60 transition-shadow duration-300 group-hover:ring-brass-400/60 group-hover:shadow-[0_30px_80px_-20px_rgba(201,169,110,0.25)]"
            />
          </span>
        </button>
      ))}
    </div>
  );
}

function IsoStack({ srcs, onOpen }: { srcs: string[]; onOpen: (s: Shot) => void }) {
  const top = srcs.slice(0, 3);
  // Cleaner staircase: each card stepped down + offset right, with slight perspective
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[440px] [perspective:1600px]">
      {top.map((s, i) => (
        <button
          key={s}
          type="button"
          onClick={() => onOpen({ src: s, alt: `LYNK screen ${i + 1}` })}
          aria-label={`View LYNK screen ${i + 1}`}
          className="group absolute transition-transform duration-[450ms] ease-out hover:z-50 focus:z-50 focus:outline-none"
          style={{
            top: `${i * 70}px`,
            left: `${i * 36}px`,
            transform: `rotateY(${-14 + i * 1}deg) rotateX(6deg) translateZ(${-i * 16}px)`,
            transformOrigin: "right center",
            zIndex: 10 - i,
          }}
        >
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-3 group-hover:[transform:rotateY(-6deg)] group-focus-visible:-translate-y-3">
            <PhoneFrame
              src={s}
              alt={`LYNK screen ${i + 1}`}
              className="w-[200px] ring-1 ring-ink-700/60 transition-shadow duration-300 group-hover:ring-navy-300/70 group-hover:shadow-[0_30px_80px_-20px_rgba(107,141,214,0.3)]"
            />
          </span>
        </button>
      ))}
    </div>
  );
}

function ProjectColumn({
  caseNo,
  name,
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
        {name}
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

      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {stack.map((t) => (
          <span
            key={t}
            className="rounded border border-ink-700 px-2 py-0.5 font-mono text-[10px] text-paper-400"
          >
            {t}
          </span>
        ))}
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
              tagline={gesturix.tagline}
              highlights={gesturix.highlights}
              stack={gesturix.stack}
              github={gesturix.github}
              role={gesturix.role}
              period={gesturix.period}
              visual={
                <div className="relative">
                  <FannedHand srcs={gesturix.screens.slice(0, 5)} onOpen={setOpen} />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    <GesturiXPanel />
                  </div>
                </div>
              }
            />
          </Reveal>

          <Reveal delay={0.1}>
            <ProjectColumn
              caseNo={lynk.caseNo}
              name={lynk.name}
              tagline={lynk.tagline}
              highlights={lynk.highlights}
              stack={lynk.stack}
              github={lynk.github}
              role={lynk.role}
              period={lynk.period}
              visual={
                <div className="relative">
                  <IsoStack srcs={lynk.screens.slice(2, 5)} onOpen={setOpen} />
                  <div className="absolute -bottom-2 left-0 right-0 mx-auto max-w-[280px]">
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
