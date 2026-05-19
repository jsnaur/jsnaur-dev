import { MonoLabel } from "./MonoLabel";
import { cn } from "@/lib/cn";

export function SectionHeading({
  num,
  eyebrow,
  title,
  titleNode,
  caption,
  align = "left",
  className,
}: {
  num: string;
  eyebrow: string;
  title?: string;
  /** Optional JSX override for the title — use for brand-colored app names. */
  titleNode?: React.ReactNode;
  caption?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <MonoLabel className="text-navy-300">
        § {num} — {eyebrow}
      </MonoLabel>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-paper-50">
        {titleNode ?? title}
      </h2>
      {caption && (
        <p
          className={cn(
            "font-mono text-xs text-paper-400 max-w-xl",
            align === "center" && "mx-auto",
          )}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
