"use client";

import { useEffect, useState } from "react";
import { Headphones, Clock, Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

type Sermon = {
  id: string;
  title: string;
  category: string;
  series: string | null;
  description: string;
  duration: number;
  speaker: string;
  scripture: string | null;
  serviceDate: string;
};

function SermonSkeleton() {
  return (
    <Card className="surface h-full rounded-2xl p-6">
      <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
      <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/5" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/5" />
      <div className="mt-6 h-9 w-32 animate-pulse rounded-lg bg-white/10" />
    </Card>
  );
}

export function Sermons() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [series, setSeries] = useState<string[]>([]);
  const [activeSeries, setActiveSeries] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const q =
      activeSeries !== "All" ? `?series=${encodeURIComponent(activeSeries)}` : "";
    fetch(`/api/sermons${q}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { sermons: Sermon[] }) => {
        if (cancelled) return;
        setSermons(data.sermons);
      })
      .catch(() => {
        if (!cancelled) setSermons([]);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [activeSeries]);

  // load unique series list once
  useEffect(() => {
    fetch("/api/sermons")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { sermons: Sermon[] }) => {
        const unique = Array.from(
          new Set(data.sermons.map((s) => s.series).filter(Boolean) as string[]),
        );
        setSeries(unique);
      })
      .catch(() => {});
  }, []);

  const handleListen = (s: Sermon) => {
    toast.success(`Now playing: ${s.title}`, {
      description: `${s.speaker} · ${s.duration} min`,
    });
  };

  const selectSeries = (s: string) => {
    if (s === activeSeries) return;
    setLoading(true);
    setActiveSeries(s);
  };

  return (
    <section
      id="sermons"
      className="relative scroll-mt-20 border-b border-white/5 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Messages & Media"
            title="Sermons & Media Archive"
            description="Spirit-filled teachings and audio from our Sunday services, impact series, and prayer nights."
          />
          {series.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {["All", ...series].map((s) => (
                <button
                  key={s}
                  onClick={() => selectSeries(s)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                    activeSeries === s
                      ? "border-gold/50 bg-gold/15 text-gold"
                      : "border-white/10 text-muted-foreground hover:text-white",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SermonSkeleton key={i} />)
            : sermons.map((s) => (
                <Card
                  key={s.id}
                  className="surface surface-hover flex h-full flex-col rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold">
                      {s.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {s.duration} min
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif-display text-xl font-bold leading-snug text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Headphones className="h-3.5 w-3.5" />
                    <span className="truncate">{s.speaker}</span>
                    {s.scripture ? (
                      <>
                        <span aria-hidden>·</span>
                        <span className="truncate text-gold/80">
                          {s.scripture}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <Button
                    onClick={() => handleListen(s)}
                    variant="ghost"
                    className="mt-auto w-fit gap-2 border border-white/10 bg-transparent text-white hover:bg-gold/10 hover:text-white"
                  >
                    <Play className="h-4 w-4 fill-current" /> Listen now
                  </Button>
                </Card>
              ))}
        </div>

        {!loading && sermons.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No sermons available right now. Please check back soon.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
