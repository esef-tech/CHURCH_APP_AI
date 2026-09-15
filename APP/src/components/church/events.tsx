"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { prettyDate } from "@/lib/seed-data";

type Event = {
  id: string;
  title: string;
  date: string;
  endDate: string | null;
  description: string;
  location: string;
  category: string;
};

function EventSkeleton() {
  return (
    <Card className="surface h-full rounded-2xl p-6">
      <div className="flex gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-white/5" />
        </div>
      </div>
      <div className="mt-4 h-3 w-full animate-pulse rounded bg-white/5" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/5" />
    </Card>
  );
}

function DateBadge({ iso }: { iso: string }) {
  const d = new Date(iso + "T00:00:00");
  const mon = isNaN(d.getTime())
    ? "—"
    : d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = isNaN(d.getTime()) ? "—" : d.getDate();
  return (
    <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
      <span className="text-[0.6rem] font-bold uppercase tracking-wider text-gold">
        {mon}
      </span>
      <span className="font-serif-display text-2xl font-bold leading-none text-white">
        {day}
      </span>
    </div>
  );
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/events")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { events: Event[] }) => {
        if (!cancelled) setEvents(data.events);
      })
      .catch(() => {
        if (!cancelled) setEvents([]);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="events"
      className="relative scroll-mt-20 border-b border-white/5 py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Events & Conferences"
          title="Greater Works Gatherings"
          description="Mark your calendar — conferences, summits, and revival nights across our Arizona campuses."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <EventSkeleton key={i} />)
            : events.map((e) => (
                <Card
                  key={e.id}
                  className="surface surface-hover flex h-full flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-start"
                >
                  <DateBadge iso={e.date} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                        {e.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {prettyDate(e.date, e.endDate ?? undefined)}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif-display text-xl font-bold leading-snug text-white">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {e.description}
                    </p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 text-gold" /> {e.location}
                    </p>
                  </div>
                </Card>
              ))}
        </div>

        {!loading && events.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No upcoming events listed right now. Please check back soon.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
