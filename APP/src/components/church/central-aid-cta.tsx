"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Scrolls to the giving section and signals it to pre-select a purpose. */
export function CentralAidCta({ purpose = "central-aid" }: { purpose?: string }) {
  const onClick = () => {
    window.dispatchEvent(
      new CustomEvent("give:purpose", { detail: purpose }),
    );
    document
      .getElementById("giving")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <Button
      onClick={onClick}
      className="mt-8 gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
    >
      <Sparkles className="h-4 w-4" /> Support the Fund
    </Button>
  );
}
