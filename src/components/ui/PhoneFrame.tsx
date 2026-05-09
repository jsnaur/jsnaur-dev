import Image from "next/image";
import { cn } from "@/lib/cn";

export function PhoneFrame({
  src,
  alt,
  className,
  width = 240,
  height = 520,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.2rem] border border-ink-700 bg-ink-900 p-1.5 shadow-[0_20px_60px_-20px_rgba(13,21,46,0.9)]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-ink-800" />
      <div className="relative overflow-hidden rounded-[1.8rem] border border-ink-800 bg-ink-950">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 60vw, 240px"
        />
      </div>
    </div>
  );
}
