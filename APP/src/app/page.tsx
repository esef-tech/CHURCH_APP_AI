import { db } from "@/lib/db";
import {
  SAMPLE_DEVOTIONALS,
  SAMPLE_SERMONS,
  SAMPLE_BRANCHES,
  type SampleDevotional,
  type SampleSermon,
  type SampleBranch,
} from "@/lib/seed-data";
import { Header } from "@/components/church/header";
import { Hero } from "@/components/church/hero";
import { Devotional } from "@/components/church/devotional";
import { Sermons } from "@/components/church/sermons";
import { Giving } from "@/components/church/giving";
import { CentralAid } from "@/components/church/central-aid";
import { Branches } from "@/components/church/branches";
import { Events } from "@/components/church/events";
import { Footer } from "@/components/church/footer";
import { PrayerRequest } from "@/components/church/prayer-request";
import AiAssistant from "@/components/church/ai-assistant";

async function getDevotional(): Promise<SampleDevotional> {
  try {
    const row = await db.devotional.findFirst({
      orderBy: { date: "desc" },
    });
    if (!row) return SAMPLE_DEVOTIONALS[0];
    return {
      id: row.id,
      date: row.date,
      title: row.title,
      scripture: row.scripture,
      body: row.body,
      confession: row.confession ?? "",
      prayer: row.prayer ?? "",
      author: row.author,
      durationMin: 7,
    };
  } catch {
    return SAMPLE_DEVOTIONALS[0];
  }
}

async function getFeaturedSermon(): Promise<SampleSermon> {
  try {
    const row = await db.sermon.findFirst({
      orderBy: { serviceDate: "desc" },
    });
    if (!row) return SAMPLE_SERMONS[0];
    return {
      id: row.id,
      title: row.title,
      category: row.category,
      series: row.series ?? "",
      description: row.description,
      duration: row.duration,
      speaker: row.speaker,
      scripture: row.scripture ?? "",
      serviceDate: row.serviceDate,
    };
  } catch {
    return SAMPLE_SERMONS[0];
  }
}

async function getBranches(): Promise<SampleBranch[]> {
  try {
    const rows = await db.branch.findMany({
      orderBy: [{ isMain: "desc" }, { city: "asc" }],
    });
    if (rows.length === 0) return SAMPLE_BRANCHES;
    return rows.map((r) => ({
      id: r.id,
      city: r.city,
      name: r.name,
      address: r.address,
      serviceTimes: r.serviceTimes,
      phone: r.phone ?? undefined,
      isMain: r.isMain,
    }));
  } catch {
    return SAMPLE_BRANCHES;
  }
}

export default async function Home() {
  const [devotional, featuredSermon, branches] = await Promise.all([
    getDevotional(),
    getFeaturedSermon(),
    getBranches(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero featuredSermon={featuredSermon} />
        <Devotional devotional={devotional} />
        <Sermons />
        <Giving />
        <CentralAid />
        <Branches branches={branches} />
        <Events />
      </main>
      <Footer />
      <PrayerRequest />
      <AiAssistant />
    </div>
  );
}
