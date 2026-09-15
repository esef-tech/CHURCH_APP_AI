import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/events
 *
 * Returns events sorted by `date` ASC (upcoming first).
 *
 * Response: 200 { events: Event[] }
 */
export async function GET() {
  const events = await db.event.findMany({
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ events });
}
