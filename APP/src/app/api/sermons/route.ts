import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/sermons
 *
 * Optional query filters:
 *   ?series=<text>     — case-insensitive contains on `series`
 *   ?category=<text>   — case-insensitive contains on `category`
 *
 * Default sort: serviceDate DESC (most recent first).
 *
 * Response: 200 { sermons: Sermon[] }
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const series = searchParams.get("series")?.trim();
  const category = searchParams.get("category")?.trim();

  // Prisma's SQLite connector does not support `mode: "insensitive"` (only
  // PostgreSQL does). However, Prisma translates `contains` to a SQLite
  // `LIKE '%value%'` expression, and SQLite's `LIKE` is case-insensitive for
  // ASCII characters by default — so plain `contains` already gives us the
  // case-insensitive match the API contract requires.
  const where = {
    ...(series ? { series: { contains: series } } : {}),
    ...(category ? { category: { contains: category } } : {}),
  };

  const sermons = await db.sermon.findMany({
    where,
    orderBy: { serviceDate: "desc" },
  });

  return NextResponse.json({ sermons });
}
