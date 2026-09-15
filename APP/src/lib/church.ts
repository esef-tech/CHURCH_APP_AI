/**
 * Central church identity & shared configuration for KKPC A/G.
 * Used by the AI assistant context, the giving form, the footer, etc.
 */
export const CHURCH = {
  shortName: "KKPC A/G",
  name: "Kingdom Keys Prayer Chapel",
  suffix: "Assemblies of God",
  tagline: "Raising Leaders, Shaping Vision, Influencing Society through Christ.",
  vision:
    "To raise leaders, shape vision, and influence society through Christ — a house of prayer for all nations.",
  description:
    "Join the Kingdom Keys Prayer Chapel family in worship, discipleship, and transformative community prayer across Arizona.",
  city: "Phoenix",
  state: "Arizona",
  country: "United States",
  address: "1440 E Northern Ave, Phoenix, AZ 85020",
  phone: "(602) 555-0144",
  email: "hello@kkpcag.church",
  ussd: "",
  // Service times for the main campus
  mainServices: ["Sunday • 8:00 AM", "Sunday • 10:30 AM", "Wednesday • 7:00 PM (Prayer)"],
  socials: [
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  ],
  stats: [
    { value: "12k+", label: "Worshippers" },
    { value: "24/7", label: "Prayer support" },
    { value: "6", label: "Arizona campuses" },
  ],
  centralAidStats: [
    { value: "3.2k+", label: "Students served" },
    { value: "14", label: "Scholarship programs" },
    { value: "$480k", label: "Granted in 2025" },
  ],
} as const;

/** Giving purposes shown in the Online Giving form */
export const GIVING_PURPOSES = [
  {
    id: "tithe",
    label: "Tithe",
    sub: "10% Increase",
    description: "Honour God with the first tenth of your increase.",
  },
  {
    id: "offertory",
    label: "Offertory",
    sub: "Freewill",
    description: "A freewill offering of thanksgiving.",
  },
  {
    id: "first-fruits",
    label: "First Fruits",
    sub: "Annual Dedication",
    description: "Dedicating the first of your year to the Lord.",
  },
  {
    id: "central-aid",
    label: "Central Aid",
    sub: "Scholarship Fund",
    description: "Educating and empowering students across Arizona.",
  },
  {
    id: "temple-project",
    label: "Temple Project",
    sub: "Expansion",
    description: "Building the house — our Phoenix campus expansion.",
  },
] as const;

/** Currencies accepted */
export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD - US Dollar" },
  { code: "GHS", symbol: "₵", label: "GHS - Ghana Cedi" },
  { code: "GBP", symbol: "£", label: "GBP - British Pound" },
  { code: "EUR", symbol: "€", label: "EUR - Euro" },
] as const;

/** US-appropriate payment channels */
export const PAYMENT_CHANNELS = [
  { id: "card", label: "Visa / Master", note: "Debit or Credit Card" },
  { id: "paypal", label: "PayPal", note: "Pay with PayPal" },
  { id: "cashapp", label: "Cash App", note: "$kkpcag" },
  { id: "zelle", label: "Zelle", note: "give@kkpcag.church" },
] as const;

/** Prayer request categories */
export const PRAYER_CATEGORIES = [
  "General",
  "Healing",
  "Guidance",
  "Family",
  "Thanksgiving",
  "Salvation",
] as const;

/** Navigation sections (smooth-scroll anchors) */
export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "living-word", label: "Living Word" },
  { id: "sermons", label: "Sermons" },
  { id: "central-aid", label: "Central Aid" },
  { id: "locate", label: "Locate Church" },
  { id: "events", label: "Events" },
] as const;

export type GivingPurpose = (typeof GIVING_PURPOSES)[number];
export type Currency = (typeof CURRENCIES)[number];
export type PaymentChannel = (typeof PAYMENT_CHANNELS)[number];

/** Generate an internal giving reference code */
export function givingReference(prefix = "KKPC"): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `${prefix}-${ts}-${rand}`;
}

/** Format a currency amount for display */
export function formatMoney(amount: number, currencyCode: string): string {
  const cur = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${cur.symbol}${formatted}`;
}
