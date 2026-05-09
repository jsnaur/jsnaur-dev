"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";

function Signature() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <svg
      ref={ref}
      viewBox="0 0 240 90"
      className="h-20 w-56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* J */}
      <motion.path
        d="M30 14 L30 60 Q30 74 16 70"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
      />
      {/* T */}
      <motion.path
        d="M70 14 L120 14 M95 14 L95 70"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
      />
      {/* T */}
      <motion.path
        d="M150 14 L210 14 M180 14 L180 70"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 1.3, ease: "easeInOut" }}
      />
      {/* Underline flourish */}
      <motion.path
        d="M14 80 Q120 90 226 78"
        stroke="#c9a96e"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}

const links = [
  { label: "email", href: `mailto:${profile.email}` },
  { label: "linkedin", href: profile.linkedin, external: true },
  { label: "github", href: profile.github, external: true },
];

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="relative px-6 py-32 sm:px-10 lg:px-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <SectionHeading
            num="06"
            eyebrow="Closing Statement"
            title=""
            align="center"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl font-display text-3xl leading-tight text-paper-50 sm:text-4xl md:text-5xl">
            "Currently debugging software.{" "}
            <br className="hidden sm:block" />
            Ultimately preparing to debug the{" "}
            <em className="text-brass-400 not-italic font-display">justice</em>{" "}
            system."
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-400">
            — {profile.name}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="rounded-md border border-navy-500/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-200 transition-colors hover:border-brass-400 hover:bg-navy-500/10 hover:text-paper-50"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16 flex items-center gap-5">
            <div className="text-paper-50">
              <Signature />
            </div>
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-brass-400/60">
              <Image
                src="/jsnaur-portrait.png"
                alt="Jesnar Tindogan"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-600">
            {profile.name} · {profile.location} · 2026
          </p>
        </Reveal>

        <Reveal delay={0.4} className="mt-20 w-full">
          <div className="border-t border-ink-700 pt-6">
            <MonoLabel className="text-paper-600">
              case closed. § 06 of 06 · built with next.js 16 ·{" "}
              <a
                href="https://github.com/jsnaur"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brass-400"
              >
                view source ↗
              </a>
            </MonoLabel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
