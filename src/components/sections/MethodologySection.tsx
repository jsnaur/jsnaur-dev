"use client";

import { useEffect, useRef, useState } from "react";
import { methodology } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";

const Icons = {
  I: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="8" y="22" width="48" height="6" />
      <rect x="8" y="32" width="48" height="6" />
      <rect x="8" y="42" width="48" height="6" />
      <line x1="20" y1="14" x2="20" y2="22" />
      <line x1="32" y1="14" x2="32" y2="22" />
      <line x1="44" y1="14" x2="44" y2="22" />
    </svg>
  ),
  II: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="14" cy="20" r="3" />
      <circle cx="14" cy="44" r="3" />
      <circle cx="32" cy="32" r="3" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="50" cy="44" r="3" />
      <line x1="17" y1="20" x2="29" y2="32" />
      <line x1="17" y1="44" x2="29" y2="32" />
      <line x1="35" y1="32" x2="47" y2="20" />
      <line x1="35" y1="32" x2="47" y2="44" />
    </svg>
  ),
  III: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="32" cy="14" r="4" />
      <circle cx="14" cy="40" r="4" />
      <circle cx="32" cy="50" r="4" />
      <circle cx="50" cy="40" r="4" />
      <line x1="32" y1="18" x2="14" y2="36" />
      <line x1="32" y1="18" x2="50" y2="36" />
      <line x1="14" y1="44" x2="32" y2="46" />
      <line x1="50" y1="44" x2="32" y2="46" />
    </svg>
  ),
} as const;

function Pillar({
  data,
  index,
}: {
  data: (typeof methodology)[number];
  index: number;
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
      { rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="relative px-6 lg:px-8">
      {/* Vertical hairline */}
      <div className="absolute left-0 top-0 hidden h-full w-px bg-ink-700 lg:block">
        <div
          style={{
            transformOrigin: "top",
            transform: shown ? "scaleY(1)" : "scaleY(0)",
            transitionDelay: `${0.1 * index}s`,
          }}
          className="h-full w-px bg-navy-400 transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        />
      </div>

      <MonoLabel className="text-brass-400">ART. {data.article}</MonoLabel>
      <h3 className="mt-3 font-display text-3xl tracking-tight text-paper-50 sm:text-4xl">
        {data.title}
      </h3>

      <div className="mt-5 text-navy-300">{Icons[data.article as "I" | "II" | "III"]}</div>

      <p className="mt-5 max-w-sm text-paper-200">{data.manifesto}</p>

      <ul className="mt-6 space-y-2 border-t border-ink-700 pt-5">
        {data.evidence.map((e, i) => (
          <li key={e} className="flex gap-2 font-mono text-[11px] text-paper-400">
            <span className="text-paper-600">§ {data.article}.{i + 1}</span>
            <span>{e}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MethodologySection() {
  return (
    <section
      id="methodology"
      className="relative border-b border-ink-700 px-6 py-20 sm:px-10 sm:py-28 lg:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            num="05"
            eyebrow="Methodology"
            title="How I build — three articles."
            caption="art.1 §§ 1–3 · art.2 §§ 1–3 · art.3 §§ 1–3"
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0">
          {methodology.map((m, i) => (
            <Pillar key={m.article} data={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
