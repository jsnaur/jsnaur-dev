import { cn } from "@/lib/cn";
import { MonoLabel } from "./MonoLabel";

export function CaseCard({
  filename,
  children,
  className,
  bare = false,
}: {
  filename?: string;
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-ink-700 bg-ink-900/80 backdrop-blur-sm",
        "transition-colors duration-300 hover:border-navy-400/60",
        !bare && "p-5",
        className,
      )}
    >
      {filename && (
        <div className="absolute -top-px left-4 -translate-y-1/2 bg-ink-950 px-2">
          <MonoLabel className="text-paper-400 normal-case tracking-[0.18em]">
            {filename}
          </MonoLabel>
        </div>
      )}
      {children}
    </div>
  );
}
