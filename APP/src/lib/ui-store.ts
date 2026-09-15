"use client";

import { create } from "zustand";

type UIState = {
  /** prayer request modal open state, controlled from the header/footer CTAs */
  prayerOpen: boolean;
  openPrayer: () => void;
  closePrayer: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  prayerOpen: false,
  openPrayer: () => set({ prayerOpen: true }),
  closePrayer: () => set({ prayerOpen: false }),
}));
