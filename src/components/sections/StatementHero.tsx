"use client";

import Image from "next/image";
import { profile } from "@/data/portfolio";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

const headline = ["Architecting scalable", "systems today."];
const headlineB = ["Preparing for the", "[justice] system tomorrow."];

export function StatementHero() {
  return (
    <section
      id="statement"
      className="relative overflow-hidden border-b border-ink-700 px-6 pt-12 pb-20 sm:px-10 sm:pt-14 sm:pb-24 lg:px-32 lg:pt-16 lg:pb-28"
    >
      {/* Column-rule background */}
      <div className="absolute inset-0 bg-columnrule opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Slow radial glow — pure CSS, no JS animation cost */}
      <div
        aria-hidden
        className="anim-glow pointer-events-none absolute left-1/3 top-1/3 h-[40rem] w-[40rem] rounded-full bg-navy-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — headline */}
        <div className="lg:col-span-7">
          <span className="anim-fade-in" style={{ animationDelay: "0s" }}>
            <MonoLabel className="text-navy-300">
              § 01 — Statement of the Case
            </MonoLabel>
          </span>

          <h1 className="mt-6 font-display text-[2.5rem] leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {headline.map((line, i) => (
              <span
                key={`a-${i}`}
                className="anim-fade-up block text-paper-50"
                style={{ animationDelay: `${0.05 + i * 0.12}s` }}
              >
                {line}
              </span>
            ))}

            <span
              aria-hidden
              className="anim-draw-x my-6 block h-px w-40 bg-brass-400/70 shadow-[0_0_10px_rgba(201,169,110,0.45)]"
              style={{ animationDelay: "0.45s" }}
            />

            {headlineB.map((line, i) => (
              <span
                key={`b-${i}`}
                className="anim-fade-up block italic text-navy-300"
                style={{ animationDelay: `${0.7 + i * 0.12}s` }}
              >
                {line.split(/(\[justice\])/).map((part, j) =>
                  part === "[justice]" ? (
                    <span
                      key={j}
                      className="font-display not-italic text-brass-400"
                    >
                      justice
                    </span>
                  ) : (
                    <span key={j}>{part}</span>
                  ),
                )}
              </span>
            ))}
          </h1>

          <p
            className="anim-fade-up mt-8 max-w-xl text-base text-paper-200 sm:text-lg"
            style={{ animationDelay: "1s" }}
          >
            I&apos;m Jesnar — a 3rd-year Computer Engineering student building
            robust backend foundations and AI-integrated products today, in
            preparation for law school tomorrow. The same rigor that ships
            software ships arguments.
          </p>

          <div
            className="anim-fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "1.15s" }}
          >
            <MagneticButton href="#exhibit-a" variant="primary">
              Read the Brief ↓
            </MagneticButton>
            <MagneticButton href={profile.resumeHref} variant="ghost" external>
              Download Résumé
            </MagneticButton>
          </div>
        </div>

        {/* Right — identification card */}
        <div className="lg:col-span-5">
          <div
            className="anim-fade-up relative mx-auto max-w-md lg:ml-auto"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="corner-tick group relative overflow-hidden rounded-md border border-ink-700 bg-ink-900">
              {/* IDENTIFICATION label */}
              <div className="absolute left-3 top-3 z-20 rounded-sm border border-ink-700 bg-ink-950/90 px-2 py-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper-400">
                  IDENTIFICATION
                </span>
              </div>

              {/* VERIFIED badge — pops in after the scan completes */}
              <div className="anim-badge-pop absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-sm border border-verdict/60 bg-ink-950/90 px-2 py-1">
                <span className="block h-1.5 w-1.5 rounded-full bg-verdict shadow-[0_0_8px_var(--color-verdict)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-verdict">
                  Verified
                </span>
              </div>

              {/* Portrait — flickers during the analysis pass */}
              <div className="anim-id-flicker">
                <Image
                  src="/jsnaur-portrait.png"
                  alt="Jesnar Tindogan"
                  width={520}
                  height={680}
                  priority
                  className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              {/* CRT scanlines — always on, very subtle */}
              <div className="scanline-overlay pointer-events-none absolute inset-0 z-10 opacity-40 mix-blend-overlay" />

              {/* Initial scan beam — sweeps top → bottom once on mount */}
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <div className="anim-scan-sweep absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-brass-400/30 to-transparent shadow-[0_0_30px_8px_rgba(201,169,110,0.25)]" />
              </div>

              {/* Recurring soft scan line — slow, ambient */}
              <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                <div className="anim-scan-loop absolute inset-x-0 top-0 h-px bg-brass-400/60 shadow-[0_0_8px_2px_rgba(201,169,110,0.4)]" />
              </div>

              {/* Targeting reticle corners */}
              <div className="pointer-events-none absolute inset-2 z-10 opacity-50">
                <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-brass-400/70" />
                <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-brass-400/70" />
                <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-brass-400/70" />
                <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-brass-400/70" />
              </div>

              {/* Bottom vignette — keeps the IDENTIFICATION + VERIFIED text readable */}
              <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-2xl tracking-tight text-paper-50">
                  {profile.name}
                </p>
                <MonoLabel className="text-paper-600">v.2026.05</MonoLabel>
              </div>
              <p className="text-sm text-paper-200">{profile.role}</p>
              <div className="space-y-1.5 border-t border-ink-700 pt-3 font-mono text-[11px] tracking-wide text-paper-400">
                <p>
                  <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] animate-pulse rounded-full bg-verdict shadow-[0_0_6px_var(--color-verdict)]" />
                  ONLINE — {profile.location}
                </p>
                <p>◆ {profile.status}</p>
                <p>§ Building: {profile.building.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
