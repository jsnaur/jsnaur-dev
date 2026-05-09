"use client";

import Image from "next/image";
import { useState } from "react";
import { campusee } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";

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

        <Reveal delay={0.1} className="mt-12">
          <article className="relative">
            {/* Folder tab */}
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
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {campusee.screens.map((s, i) => (
                      <button
                        key={s}
                        onClick={() =>
                          setOpen({ src: s, alt: `CampuSee screen ${i + 1}` })
                        }
                        className="group relative overflow-hidden rounded-lg border border-ink-700 bg-ink-900 transition-colors hover:border-navy-400/70"
                      >
                        <Image
                          src={s}
                          alt={`CampuSee screen ${i + 1}`}
                          width={300}
                          height={650}
                          className="h-auto w-full"
                          sizes="(max-width: 640px) 50vw, 220px"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 to-transparent p-2">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-paper-400 group-hover:text-brass-400">
                            frame.{String(i + 1).padStart(2, "0")} ↗
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
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
