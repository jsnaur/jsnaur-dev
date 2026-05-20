"use client";

import { cn } from "@/lib/cn";

export function BrowserFrame({
  url,
  href,
  children,
  className,
  rightSlot,
}: {
  url: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-ink-700 bg-ink-900 shadow-[0_30px_80px_-30px_rgba(13,21,46,0.9)] overflow-hidden",
        className,
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-800/80 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-700" />
        </div>
        <div className="flex-1 mx-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mx-auto flex h-6 max-w-[260px] items-center justify-center gap-1.5 rounded-md border border-ink-700 bg-ink-950/60 px-2 transition-colors hover:border-verdict/50 hover:bg-verdict/5 group"
            >
              <svg
                className="h-3 w-3 text-paper-400 group-hover:text-verdict transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono text-[10px] text-paper-400 group-hover:text-verdict transition-colors">{url}</span>
            </a>
          ) : (
            <div className="mx-auto flex h-6 max-w-[260px] items-center justify-center gap-1.5 rounded-md border border-ink-700 bg-ink-950/60 px-2">
              <svg
                className="h-3 w-3 text-paper-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono text-[10px] text-paper-400">{url}</span>
            </div>
          )}
        </div>
        <div className="flex items-center">{rightSlot}</div>
      </div>
      {children}
    </div>
  );
}
