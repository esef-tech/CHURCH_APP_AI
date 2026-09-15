import { BookOpen, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { AudioPlayer } from "./audio-player";
import type { SampleDevotional } from "@/lib/seed-data";
import { prettyDate } from "@/lib/seed-data";

type DevotionalProps = {
  devotional: SampleDevotional;
};

export function Devotional({ devotional }: DevotionalProps) {
  const paragraphs = devotional.body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="living-word" className="relative scroll-mt-20 overflow-hidden border-b border-white/5 py-20 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src="/church/devotional.png"
          alt=""
          className="absolute right-0 top-0 h-full w-full object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/70 to-[#0b0f19]/30" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Daily Inspiration"
          title="Living Word Devotional"
          description="Spiritual nourishment and pastoral wisdom for daily victory — a fresh word every morning."
        />

        <Card className="surface mt-10 overflow-hidden rounded-3xl p-0">
          <div className="grid lg:grid-cols-12">
            {/* Left rail */}
            <div className="flex flex-col gap-6 border-b border-white/5 p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <BookOpen className="h-4 w-4 text-gold" />
                Today&rsquo;s Devotional · {prettyDate(devotional.date)}
              </div>
              <h3 className="font-serif-display text-3xl font-bold leading-tight text-white">
                {devotional.title}
              </h3>
              <p className="text-sm font-medium text-gold">
                Scripture: {devotional.scripture}
              </p>

              <AudioPlayer
                author={`${devotional.author} (${devotional.durationMin}:${String(
                  Math.round((devotional.durationMin % 1) * 60),
                ).padStart(2, "0")})`}
                durationMin={devotional.durationMin}
              />

              <blockquote className="relative mt-auto border-l-2 border-gold/50 pl-4 text-sm italic leading-relaxed text-muted-foreground">
                <Quote className="absolute -left-px -top-2 h-4 w-4 text-gold/40" />
                &ldquo;{devotional.confession}&rdquo;
              </blockquote>
            </div>

            {/* Right content */}
            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-8">
              <div className="flex flex-col gap-4">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[0.95rem] leading-relaxed text-foreground/90"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gold/15 bg-gold/[0.04] p-5">
                  <h4 className="font-serif-display text-sm font-bold uppercase tracking-[0.18em] text-gold">
                    Daily Confession
                  </h4>
                  <p className="mt-3 text-sm italic leading-relaxed text-foreground/90">
                    &ldquo;{devotional.confession}&rdquo;
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <h4 className="font-serif-display text-sm font-bold uppercase tracking-[0.18em] text-white">
                    Prayer of Faith
                  </h4>
                  <p className="mt-3 text-sm italic leading-relaxed text-foreground/90">
                    &ldquo;{devotional.prayer}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
