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
      className="relative min-h-screen overflow-hidden border-b border-ink-700 px-6 py-24 sm:px-10 lg:px-32"
    >
      {/* Column-rule background */}
      <div className="absolute inset-0 bg-columnrule opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Slow radial glow — pure CSS, no JS animation cost */}
      <div
        aria-hidden
        className="anim-glow pointer-events-none absolute left-1/3 top-1/3 h-[40rem] w-[40rem] rounded-full bg-navy-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 pt-12 lg:grid-cols-12 lg:gap-16 lg:pt-20">
        {/* Left — headline */}
        <div className="lg:col-span-7">
          <span className="anim-fade-in" style={{ animationDelay: "0s" }}>
            <MonoLabel className="text-navy-300">
              § 01 — Statement of the Case
            </MonoLabel>
          </span>

          <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
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
              className="anim-draw-x my-6 block h-px w-40 bg-brass-400/70"
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
            <div className="corner-tick relative overflow-hidden rounded-md border border-ink-700 bg-ink-900">
              <div className="absolute left-3 top-3 z-10 rounded-sm border border-ink-700 bg-ink-950/90 px-2 py-1">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-paper-400">
                  IDENTIFICATION
                </span>
              </div>
              <Image
                src="/jsnaur-portrait.png"
                alt="Jesnar Tindogan"
                width={520}
                height={680}
                priority
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
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
                  <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-verdict" />
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
