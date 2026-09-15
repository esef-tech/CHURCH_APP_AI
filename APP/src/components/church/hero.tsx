import { Play, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHURCH } from "@/lib/church";
import type { SampleSermon } from "@/lib/seed-data";
import { LiveBadge, GoldCross } from "./badges";
import { HeroGiveButton, HeroPrayerButton } from "./hero-buttons";

type HeroProps = {
  featuredSermon: SampleSermon;
};

export function Hero({ featuredSermon }: HeroProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-white/5"
    >
      {/* ambient background image + glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src="/church/hero-ambient.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/60 via-[#0b0f19]/80 to-[#0b0f19]" />
        <div className="absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -left-24 top-40 h-[24rem] w-[24rem] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Left: copy + stats */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <span className="eyebrow">Welcome Home</span>
          <h1 className="mt-4 font-serif-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]">
            Experience faith, <br className="hidden sm:block" />
            <span className="text-gradient-gold">hope, and renewal</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {CHURCH.description} A family across Arizona pursuing God in
            worship, discipleship, and transformative prayer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <HeroGiveButton />
            <HeroPrayerButton />
          </div>

          {/* Stats */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/5 pt-8">
            {CHURCH.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif-display text-3xl font-bold text-gradient-gold sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: live service card */}
        <div className="flex items-center lg:col-span-5">
          <div className="surface surface-hover relative w-full overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <LiveBadge />
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Sunday Service
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <GoldCross className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-white">
                  {featuredSermon.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {CHURCH.mainServices[0].replace("Sunday • ", "")} ·{" "}
                  {CHURCH.city}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {featuredSermon.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
              >
                <a href="#sermons">
                  <Play className="h-4 w-4 fill-current" /> Watch / Listen
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="gap-2 text-muted-foreground hover:text-white"
              >
                <a href="#living-word">
                  Today&rsquo;s Devotional <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-7 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-muted-foreground">
              <Heart className="h-3.5 w-3.5 text-gold" />
              Wednesday prayer night · 7:00 PM · Phoenix Main
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
