import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kingdom Keys Prayer Chapel A/G (KKPC A/G) | Phoenix, Arizona",
  description:
    "Kingdom Keys Prayer Chapel, an Assemblies of God church in Arizona. Raising leaders, shaping vision, and influencing society through Christ. Join us for worship, prayer, and community.",
  keywords: [
    "KKPC A/G",
    "Kingdom Keys Prayer Chapel",
    "Assemblies of God",
    "Arizona church",
    "Phoenix church",
    "worship",
    "prayer",
    "devotional",
    "giving",
  ],
  authors: [{ name: "KKPC A/G" }],
  openGraph: {
    title: "Kingdom Keys Prayer Chapel A/G | Phoenix, Arizona",
    description:
      "Raising leaders, shaping vision, and influencing society through Christ. Worship, prayer, and community in Arizona.",
    siteName: "KKPC A/G",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kingdom Keys Prayer Chapel A/G",
    description:
      "Raising leaders, shaping vision, and influencing society through Christ.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${serif.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
