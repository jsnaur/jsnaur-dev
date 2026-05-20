const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5 shrink-0"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-3.5 w-3.5 shrink-0"
    aria-hidden
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

type Props = {
  href: string;
  label?: string;
  className?: string;
};

export function LiveDemoButton({ href, label = "View Live App", className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative inline-flex items-center gap-2.5 rounded-md border border-verdict/50 bg-verdict/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-verdict transition-all duration-200 hover:border-verdict/80 hover:bg-verdict/20 hover:shadow-[0_0_22px_-4px_rgba(79,178,134,0.55)] ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verdict opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-verdict" />
      </span>
      <GlobeIcon />
      <span>{label}</span>
      <span className="opacity-60 transition-opacity group-hover:opacity-100">↗</span>
    </a>
  );
}

export function GitHubButton({ href, label = "Repository", className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2 rounded-md border border-ink-600 bg-ink-800/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper-300 transition-all duration-200 hover:border-brass-400/70 hover:bg-brass-400/10 hover:text-brass-400 hover:shadow-[0_0_14px_-3px_rgba(201,169,110,0.35)] ${className}`}
    >
      <GitHubIcon />
      <span>{label}</span>
      <span className="opacity-50 transition-opacity group-hover:opacity-100">↗</span>
    </a>
  );
}
