"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { campusee, managedTeams } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { TransparentMockup } from "@/components/ui/TransparentMockup";

export function ArchiveSection() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section
      id="archive"
      className="relative border-b border-ink-700 px-6 py-20 sm:px-10 sm:py-28 lg:px-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            num="04"
            eyebrow="The Archive"
            title="Prior work, for the curious."
            caption="prior_work/ — earlier ships kept on file."
          />
        </Reveal>

        {/* CampuSee Case File */}
        <Reveal delay={0.1} className="mt-12">
          <article className="relative">
            <div className="relative ml-6 inline-flex">
              <div className="rounded-t-md border border-b-0 border-ink-700 bg-ink-900 px-4 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-400">
                  CASE FILE — {campusee.caseNo}
                </span>
              </div>
            </div>

            <div className="rounded-md rounded-tl-none border border-ink-700 bg-ink-900/70 p-6 sm:p-10">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <h3 className="font-display text-4xl tracking-tight text-paper-50">
                    {campusee.name}
                  </h3>
                  <p className="mt-3 text-paper-200">{campusee.tagline}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-paper-600">
                    {campusee.role}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {campusee.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-ink-700 px-2 py-0.5 font-mono text-[10px] text-paper-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={campusee.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-navy-300 hover:text-brass-400"
                  >
                    repository ↗
                  </a>
                </div>

                <div className="lg:col-span-7">
                  <MonoLabel className="text-navy-300">filmstrip</MonoLabel>
                  <div className="mt-6 flex flex-wrap justify-center gap-6 sm:justify-start sm:gap-4">
                    {campusee.screens.map((s, i) => {
                      const rhythms: ("a" | "b" | "c")[] = ["a", "b", "c", "a"];
                      const rotations = [-4, -1, 2, 5];
                      return (
                        <div key={s} className="flex flex-col items-center">
                          <TransparentMockup
                            src={s}
                            alt={`CampuSee screen ${i + 1}`}
                            width={140}
                            rotate={rotations[i]}
                            rhythm={rhythms[i]}
                            enterFrom={i < 2 ? "left" : "right"}
                            delayIndex={i}
                            tone="neutral"
                            onClick={() =>
                              setOpen({ src: s, alt: `CampuSee screen ${i + 1}` })
                            }
                            ariaLabel={`View CampuSee screen ${i + 1}`}
                          />
                          <span className="mt-4 font-mono text-[9px] uppercase tracking-wider text-paper-600">
                            frame.{String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Managed Teams — PM Artifacts */}
        <Reveal delay={0.15} className="mt-10">
          <article className="relative">
            <div className="relative ml-6 inline-flex">
              <div className="rounded-t-md border border-b-0 border-ink-700 bg-ink-900 px-4 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-400">
                  PM ARTIFACTS — MANAGED TEAMS
                </span>
              </div>
            </div>

            <div className="rounded-md rounded-tl-none border border-ink-700 bg-ink-900/70 p-6 sm:p-10">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <MonoLabel className="text-brass-400">project leadership evidence</MonoLabel>
                  <h3 className="mt-2 font-display text-3xl tracking-tight text-paper-50 sm:text-4xl">
                    {managedTeams.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-paper-200">
                    {managedTeams.description}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-600">
                  3 projects · {managedTeams.artifacts.length} boards
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {managedTeams.artifacts.map((artifact, i) => (
                  <motion.div
                    key={artifact.project}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setOpen({ src: artifact.src, alt: artifact.alt })}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="group relative block w-full overflow-hidden rounded-lg border border-ink-700 bg-ink-900 text-left transition-colors hover:border-navy-400/70"
                    >
                      {/* Dossier scanner line */}
                      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <motion.div
                          className="h-[1px] w-full bg-brass-400/60 shadow-[0_0_8px_1px_rgba(201,169,110,0.4)]"
                          animate={{ y: ["0%", "5000%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="absolute inset-0 bg-brass-400/5 mix-blend-overlay" />
                      </div>

                      {/* Tab bar */}
                      <div className="relative z-20 flex items-center justify-between border-b border-ink-700 bg-ink-800/60 px-3 py-1.5">
                        <span className="font-mono text-[10px] text-paper-400">
                          {artifact.project}.pm
                        </span>
                        <span className="font-mono text-[10px] text-paper-600 transition-colors group-hover:text-brass-400">
                          open ↗
                        </span>
                      </div>

                      <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
                        <Image
                          src={artifact.src}
                          alt={artifact.alt}
                          fill
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      <div className="relative z-20 border-t border-ink-700 px-3 py-2.5">
                        <p className="font-display text-base text-paper-50">{artifact.project}</p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-paper-600">{artifact.role}</span>
                          <span className="font-mono text-[10px] text-paper-600">{artifact.period}</span>
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 border-t border-ink-700 pt-6">
                <p className="font-mono text-[11px] text-paper-600">
                  ◆ PM boards capture sprint planning, task ownership, and delivery cadence across
                  3 multi-person teams — GesturiX (4–6 devs), LYNK (4–6 devs), CampuSee
                </p>
              </div>
            </div>
          </article>
        </Reveal>
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
