"use client";

import { Heart, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHURCH, NAV_ITEMS } from "@/lib/church";
import { useUIStore } from "@/lib/ui-store";
import { GoldCross } from "./badges";

export function Footer() {
  const openPrayer = useUIStore((s) => s.openPrayer);

  const handleNav = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="mt-auto border-t border-white/5 bg-[#080b13]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
                <GoldCross className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif-display text-lg font-bold text-white">
                  {CHURCH.shortName}
                </p>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {CHURCH.name} · {CHURCH.suffix}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {CHURCH.tagline} A place of worship, discipleship, prayer, and
              community impact across Arizona.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                onClick={() => handleNav("giving")}
                className="gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
              >
                <Sparkles className="h-4 w-4" /> Give Online
              </Button>
              <Button
                onClick={openPrayer}
                variant="outline"
                className="gap-2 border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                <Heart className="h-4 w-4 text-gold" /> Prayer
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Explore
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Visit & Contact
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{CHURCH.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${CHURCH.phone}`} className="hover:text-white">
                  {CHURCH.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${CHURCH.email}`} className="hover:text-white">
                  {CHURCH.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {CHURCH.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-muted-foreground transition-colors hover:border-gold/40 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {CHURCH.shortName} · {CHURCH.name}{" "}
            Assemblies of God. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-gold">✝</span> Phoenix, {CHURCH.state} ·{" "}
            {CHURCH.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
