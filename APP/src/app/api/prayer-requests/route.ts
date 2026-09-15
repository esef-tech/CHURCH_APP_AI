import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { PRAYER_CATEGORIES } from "@/lib/church";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const categories = PRAYER_CATEGORIES as unknown as string[];
const categoryEnum = z.enum([categories[0], ...categories.slice(1)]);

const prayerSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(120),
  request: z
    .string()
    .trim()
    .min(5, "Please share at least a sentence so we can pray with you.")
    .max(5000),
  email: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(60).optional(),
  category: categoryEnum.default("General"),
  isUrgent: z.boolean().default(false),
});

/**
 * POST /api/prayer-requests
 *
 * Body (JSON):
 *   {
 *     name:       string (required),
 *     request:    string (required, min 5 chars),
 *     email?:     string,
 *     phone?:     string,
 *     category?:  "General" | "Healing" | "Guidance" | "Family" | "Thanksgiving" | "Salvation" (default "General"),
 *     isUrgent?:  boolean (default false)
 *   }
 *
 * Success: 201 { ok: true, id: string, message: string }
 * Error:    400 { ok: false, error: string }
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = prayerSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}`
      : "Invalid prayer request payload.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const data = parsed.data;

  const record = await db.prayerRequest.create({
    data: {
      name: data.name,
      request: data.request,
      email: data.email ?? null,
      phone: data.phone ?? null,
      category: data.category,
      isUrgent: data.isUrgent,
      status: "open",
    },
  });

  const message = data.isUrgent
    ? `Beloved ${data.name}, we have received your urgent request and our prayer team is standing with you right now. May the Lord meet you at the point of your need. (Reference #${record.id})`
    : `Beloved ${data.name}, thank you for sharing your heart with us. Our prayer team has received your request and is agreeing with you in faith. You are not alone — the KKPC A/G family is praying with you. (Reference #${record.id})`;

  return NextResponse.json(
    { ok: true, id: record.id, message },
    { status: 201 },
  );
}
