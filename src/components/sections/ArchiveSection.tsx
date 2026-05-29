"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { campusee, managedTeams } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";
import { TransparentMockup } from "@/components/ui/TransparentMockup";
import { StackBadges } from "@/components/ui/StackBadges";
import { GitHubButton } from "@/components/ui/GitHubButton";
import { cn } from "@/lib/cn";

/* Auto-sliding photo card for grouped PM artifacts (e.g. MediBridge x2) */
function PMPhotoSlider({
  images,
  project,
  role,
  period,
  onOpen,
}: {
  images: Array<{ src: string; alt: string; objectPosition: string }>;
  project: string;
  role: string;
  period: string;
  onOpen: (img: { src: string; alt: string }) => void;
}) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  useEffect(() => {
    if (!inView || images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [inView, images.length]);

  const cur = images[idx];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer div — not a button so the dot <buttons> inside remain valid */}
      <motion.div
        role="group"
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="group relative w-full cursor-pointer overflow-hidden rounded-lg border border-ink-700 bg-ink-900 transition-colors hover:border-brass-400/50"
        onClick={() => onOpen(cur)}
      >
        {/* Tab bar with slide dots */}
        <div className="relative z-20 flex items-center justify-between gap-2 border-b border-ink-700 bg-ink-800/60 px-3 py-1.5">
          <span className="font-mono text-[10px] text-paper-400">{project}.pm</span>
          {images.length > 1 && (
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                  aria-label={`View photo ${i + 1}`}
                  className={cn(
                    "h-[3px] rounded-full transition-all duration-300",
                    i === idx ? "w-5 bg-brass-400" : "w-1.5 bg-ink-600 hover:bg-ink-500",
                  )}
                />
              ))}
            </div>
          )}
          <span className="font-mono text-[10px] text-paper-600 transition-colors group-hover:text-brass-400">
            open ↗
          </span>
        </div>

        {/* Sliding image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-800">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={idx}
              className="absolute inset-0"
              initial={{ x: "100%", opacity: 0.7 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.7 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={cur.src}
                alt={cur.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: cur.objectPosition }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Scanner — sweeps the photo on card hover */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-brass-400/70 shadow-[0_0_10px_1px_rgba(201,169,110,0.55)]"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-brass-400/5 mix-blend-overlay" />
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 border-t border-ink-700 px-3 py-2.5">
          <p className="font-display text-base text-paper-50">{project}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-mono text-[10px] text-paper-600">{role}</span>
            <span className="font-mono text-[10px] text-paper-600">{period}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ArchiveSection() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  const medibridgeImages = managedTeams.artifacts
    .filter((a) => a.project === "MediBridge")
    .map((a) => ({ src: a.src, alt: a.alt, objectPosition: a.objectPosition }));

  const otherArtifacts = managedTeams.artifacts.filter(
    (a) => a.project !== "MediBridge",
  );

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
                    <span style={{ color: "#818cf8" }}>Campu</span>
                    <span style={{ color: "#fbbf24" }}>See</span>
                  </h3>
                  <p className="mt-3 text-paper-200">{campusee.tagline}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-paper-600">
                    {campusee.role}
                  </p>

                  <div className="mt-6">
                    <StackBadges stack={campusee.stack} speed={20} />
                  </div>

                  <GitHubButton href={campusee.github} className="mt-6" />
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
          <article id="managed-teams" className="relative">
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
                  3 projects · {1 + otherArtifacts.length} exhibits
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* MediBridge — auto-sliding card */}
                <PMPhotoSlider
                  images={medibridgeImages}
                  project="MediBridge"
                  role={managedTeams.artifacts[0].role}
                  period={managedTeams.artifacts[0].period}
                  onOpen={setOpen}
                />

                {/* CampuSee + LYNK */}
                {otherArtifacts.map((artifact, i) => (
                  <motion.div
                    key={artifact.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.6, delay: (i + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => setOpen({ src: artifact.src, alt: artifact.alt })}
                      whileHover={{ y: -4, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="group relative block w-full overflow-hidden rounded-lg border border-ink-700 bg-ink-900 text-left transition-colors hover:border-navy-400/70"
                    >
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
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          style={{ objectPosition: artifact.objectPosition }}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                        {/* Scanner — sweeps the photo on card hover */}
                        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <motion.div
                            className="absolute inset-x-0 h-[1px] bg-brass-400/70 shadow-[0_0_10px_1px_rgba(201,169,110,0.55)]"
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="absolute inset-0 bg-brass-400/5 mix-blend-overlay" />
                        </div>
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
                  3 multi-person teams — MediBridge · LYNK (4–6 devs each) · CampuSee
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
