"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CHURCH, NAV_ITEMS } from "@/lib/church";
import { useUIStore } from "@/lib/ui-store";
import { GoldCross } from "./badges";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openPrayer = useUIStore((s) => s.openPrayer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-[#0b0f19]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav("home");
          }}
          className="group flex items-center gap-3"
          aria-label={`${CHURCH.name} home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
            <GoldCross className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif-display text-base font-bold tracking-wide text-white">
              {CHURCH.shortName}
            </span>
            <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {CHURCH.name} · A/G
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            onClick={openPrayer}
            className="gap-2 text-muted-foreground hover:text-white"
          >
            <Heart className="h-4 w-4" /> Prayer Request
          </Button>
          <Button
            asChild
            className="gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
          >
            <button onClick={() => handleNav("giving")}>
              <Sparkles className="h-4 w-4" /> Give Online
            </button>
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-white/10 bg-[#0b0f19] p-0 text-foreground"
          >
            <SheetHeader className="border-b border-white/5 px-6 py-4">
              <SheetTitle className="flex items-center gap-3 text-left">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 text-gold">
                  <GoldCross className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="font-serif-display text-sm font-bold text-white">
                    {CHURCH.shortName}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {CHURCH.name} · A/G
                  </span>
                </span>
              </SheetTitle>
              <SheetClose className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:text-white">
                <X className="h-5 w-5" />
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-white/5 p-6">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  openPrayer();
                }}
                className="gap-2 border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                <Heart className="h-4 w-4" /> Prayer Request
              </Button>
              <Button
                onClick={() => handleNav("giving")}
                className="gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
              >
                <Sparkles className="h-4 w-4" /> Give Online
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
