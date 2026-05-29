"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import {
  EmailIcon,
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/ui/SocialIcons";

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

type Contact = {
  label: string;
  value: string;
  href: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
  external: boolean;
};

const contacts: Contact[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: EmailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "/jesnartindogan",
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "@jsnaur",
    href: profile.github,
    Icon: GitHubIcon,
    external: true,
  },
  {
    label: "Instagram",
    value: `@${profile.instagramHandle}`,
    href: profile.instagram,
    Icon: InstagramIcon,
    external: true,
  },
  {
    label: "Facebook",
    value: `@${profile.facebookHandle}`,
    href: profile.facebook,
    Icon: FacebookIcon,
    external: true,
  },
];

function ContactGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <div
      ref={ref}
      className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {contacts.map(({ label, value, href, Icon, external }, i) => (
        <motion.a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-xl border border-ink-700 bg-ink-900/70 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brass-400/60 hover:bg-ink-900 hover:shadow-[0_18px_40px_-22px_rgba(201,169,110,0.5)]"
        >
          {/* hover sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brass-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-700 bg-ink-950/80 text-paper-300 transition-all duration-300 group-hover:scale-110 group-hover:border-brass-400/50 group-hover:text-brass-400">
            <Icon />
          </span>
          <span className="relative">
            <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-paper-300 transition-colors group-hover:text-paper-50">
              {label}
            </span>
            <span className="mt-0.5 block max-w-[10rem] truncate font-mono text-[10px] text-paper-600 transition-colors group-hover:text-paper-400">
              {value}
            </span>
          </span>
        </motion.a>
      ))}
    </div>
  );
}

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-32 lg:px-32"
    >
      {/* Ambient background — matches hero / exhibit treatment */}
      <div
        aria-hidden
        className="anim-orb-a pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-navy-500/8 blur-3xl"
      />
      <div
        aria-hidden
        className="anim-orb-b pointer-events-none absolute bottom-0 right-1/4 h-[24rem] w-[24rem] rounded-full bg-brass-400/5 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <SectionHeading
            num="07"
            eyebrow="Closing Statement"
            title=""
            align="center"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl font-display text-3xl leading-tight text-paper-50 sm:text-4xl md:text-5xl">
            &ldquo;Currently debugging software.{" "}
            <br className="hidden sm:block" />
            Ultimately preparing to debug the{" "}
            <em className="text-brass-400 not-italic font-display">justice</em>{" "}
            system.&rdquo;
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-400">
            — {profile.name}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 w-full">
          <MonoLabel as="p" className="text-navy-300">
            let&apos;s talk — pick any channel
          </MonoLabel>
          <div className="mt-6">
            <ContactGrid />
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
