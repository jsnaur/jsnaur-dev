import { cn } from "@/lib/cn";

export function MonoLabel({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-paper-400",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
