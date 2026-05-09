"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function Lightbox({
  open,
  onClose,
  src,
  alt,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-950/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="fixed right-5 top-5 z-10 rounded-md border border-ink-700 bg-ink-900/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-200 hover:border-navy-300 hover:text-paper-50"
          >
            close esc
          </button>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="my-12 w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-lg border border-ink-700 bg-ink-900">
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={6000}
                className="h-auto w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
