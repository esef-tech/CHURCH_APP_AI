/**
 * Idempotent seed script for KKPC A/G.
 *
 * Populates the Devotional, Sermon, Event, and Branch tables from the
 * shared sample content in src/lib/seed-data. Re-running is safe — every
 * record is upserted on a stable unique key.
 *
 * Run with:
 *   bun run prisma/seed.ts
 * or:
 *   bun run db:seed
 */
import { PrismaClient } from "@prisma/client";

import {
  SAMPLE_DEVOTIONALS,
  SAMPLE_SERMONS,
  SAMPLE_EVENTS,
  SAMPLE_BRANCHES,
} from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  // --- Devotionals (keyed on unique `date`) -------------------------------
  for (const d of SAMPLE_DEVOTIONALS) {
    await prisma.devotional.upsert({
      where: { date: d.date },
      create: {
        id: d.id,
        date: d.date,
        title: d.title,
        scripture: d.scripture,
        body: d.body,
        confession: d.confession,
        prayer: d.prayer,
        author: d.author,
      },
      update: {
        title: d.title,
        scripture: d.scripture,
        body: d.body,
        confession: d.confession,
        prayer: d.prayer,
        author: d.author,
      },
    });
  }

  // --- Sermons (keyed on `id`) -------------------------------------------
  for (const s of SAMPLE_SERMONS) {
    await prisma.sermon.upsert({
      where: { id: s.id },
      create: {
        id: s.id,
        title: s.title,
        category: s.category,
        series: s.series,
        description: s.description,
        duration: s.duration,
        speaker: s.speaker,
        scripture: s.scripture,
        serviceDate: s.serviceDate,
      },
      update: {
        title: s.title,
        category: s.category,
        series: s.series,
        description: s.description,
        duration: s.duration,
        speaker: s.speaker,
        scripture: s.scripture,
        serviceDate: s.serviceDate,
      },
    });
  }

  // --- Events (keyed on `id`) --------------------------------------------
  for (const e of SAMPLE_EVENTS) {
    await prisma.event.upsert({
      where: { id: e.id },
      create: {
        id: e.id,
        title: e.title,
        date: e.date,
        endDate: e.endDate ?? null,
        description: e.description,
        location: e.location,
        category: e.category,
      },
      update: {
        title: e.title,
        date: e.date,
        endDate: e.endDate ?? null,
        description: e.description,
        location: e.location,
        category: e.category,
      },
    });
  }

  // --- Branches (keyed on `id`) ------------------------------------------
  for (const b of SAMPLE_BRANCHES) {
    await prisma.branch.upsert({
      where: { id: b.id },
      create: {
        id: b.id,
        city: b.city,
        name: b.name,
        address: b.address,
        serviceTimes: b.serviceTimes,
        phone: b.phone ?? null,
        isMain: b.isMain ?? false,
      },
      update: {
        city: b.city,
        name: b.name,
        address: b.address,
        serviceTimes: b.serviceTimes,
        phone: b.phone ?? null,
        isMain: b.isMain ?? false,
      },
    });
  }

  const [devotionals, sermons, events, branches] = await Promise.all([
    prisma.devotional.count(),
    prisma.sermon.count(),
    prisma.event.count(),
    prisma.branch.count(),
  ]);

  console.log(
    `Seeded: ${devotionals} devotionals, ${sermons} sermons, ${events} events, ${branches} branches`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error("Seed failed:", err);
    await prisma.$disconnect();
    process.exit(1);
  });
