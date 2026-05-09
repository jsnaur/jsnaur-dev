export function CaseHeader() {
  return (
    <div className="fixed right-5 top-5 z-40 hidden md:block">
      <div className="flex items-center gap-3 rounded-md border border-ink-700 bg-ink-900/60 px-3 py-1.5 backdrop-blur-md">
        <span className="block h-1.5 w-1.5 rounded-full bg-brass-400 shadow-[0_0_10px_var(--color-brass-400)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-400">
          JTT · Case 2026-0001 · Portfolio
        </span>
      </div>
    </div>
  );
}
