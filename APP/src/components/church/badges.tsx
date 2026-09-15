import { cn } from "@/lib/utils";

export function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-red-300",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="live-dot absolute inline-flex h-2 w-2 rounded-full bg-red-500" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      Live · On Air
    </span>
  );
}

export function GoldCross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10.2 2h3.6v6.4H20v3.6h-6.2V22h-3.6v-9.8H4V8.4h6.2V2Z" />
    </svg>
  );
}
