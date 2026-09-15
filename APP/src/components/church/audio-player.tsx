"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

type AudioPlayerProps = {
  author: string;
  durationMin: number;
  className?: string;
};

/** Lightweight, dependency-free audio UI that simulates playback progress. */
export function AudioPlayer({
  author,
  durationMin,
  className,
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const totalSec = Math.max(1, Math.round(durationMin * 60));

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setProgress((p) => {
          const next = p + 1 / totalSec;
          if (next >= 1) {
            setPlaying(false);
            return 0;
          }
          return next;
        });
      }, 250);
    } else if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, totalSec]);

  const elapsed = Math.floor(progress * totalSec);
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-3 pr-4",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setPlaying((v) => !v)}
        aria-label={playing ? "Pause audio" : "Play audio"}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-[#1a1206] transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Pause className="h-5 w-5 fill-current" />
        ) : (
          <Play className="h-5 w-5 translate-x-px fill-current" />
        )}
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="truncate font-medium text-white">
            Listen to Audio
          </span>
          <span className="shrink-0 tabular-nums text-muted-foreground">
            {fmt(elapsed)} / {fmt(totalSec)}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-deep to-gold transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </div>
        <p className="mt-2 truncate text-xs text-muted-foreground">{author}</p>
      </div>
    </div>
  );
}
