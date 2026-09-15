"use client";

import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/ui-store";

/** Scrolls to the giving section. */
export function HeroGiveButton() {
  const onClick = () => {
    document
      .getElementById("giving")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <Button
      onClick={onClick}
      className="gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
      size="lg"
    >
      <Sparkles className="h-4 w-4" /> Give Online
    </Button>
  );
}

/** Opens the prayer request modal via the shared UI store. */
export function HeroPrayerButton() {
  const openPrayer = useUIStore((s) => s.openPrayer);
  return (
    <Button
      onClick={openPrayer}
      variant="outline"
      size="lg"
      className="gap-2 border-gold/30 bg-gold/5 text-white hover:bg-gold/10 hover:text-white"
    >
      <Heart className="h-4 w-4 text-gold" /> Prayer Request
    </Button>
  );
}
