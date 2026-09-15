import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  GIVING_PURPOSES,
  CURRENCIES,
  PAYMENT_CHANNELS,
  givingReference,
} from "@/lib/church";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const purposeIds = GIVING_PURPOSES.map((p) => p.id) as [string, ...string[]];
const currencyCodes = CURRENCIES.map((c) => c.code) as [string, ...string[]];
const channelIds = PAYMENT_CHANNELS.map((c) => c.id) as [string, ...string[]];

const donationSchema = z.object({
  purpose: z.enum(purposeIds),
  currency: z.enum(currencyCodes),
  amount: z.number().positive(),
  channel: z.enum(channelIds),
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().trim().max(160).optional(),
  phone: z.string().trim().max(60).optional(),
  note: z.string().trim().max(1000).optional(),
});

/**
 * POST /api/giving
 *
 * Body (JSON):
 *   {
 *     purpose:   "tithe" | "offertory" | "first-fruits" | "central-aid" | "temple-project",
 *     currency:  "USD" | "GHS" | "GBP" | "EUR",
 *     amount:    number (> 0),
 *     channel:   "card" | "paypal" | "cashapp" | "zelle",
 *     name?:     string,
 *     email?:    string,
 *     phone?:    string,
 *     note?:     string
 *   }
 *
 * Success: 201 { ok: true, reference: string, donation: { id, purpose, currency, amount, channel, name, email, phone, note, status, createdAt } }
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

  const parsed = donationSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message = firstIssue
      ? `${firstIssue.path.join(".") || "body"}: ${firstIssue.message}`
      : "Invalid donation payload.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const data = parsed.data;
  const reference = givingReference();

  const donation = await db.donation.create({
    data: {
      reference,
      status: "pending",
      purpose: data.purpose,
      currency: data.currency,
      amount: data.amount,
      channel: data.channel,
      name: data.name ?? null,
      email: data.email ?? null,
      phone: data.phone ?? null,
      note: data.note ?? null,
    },
  });

  // Sanitised payload — strip nothing sensitive (no payment card data is
  // ever collected), but normalise nulls and avoid leaking timestamps format.
  return NextResponse.json(
    {
      ok: true,
      reference: donation.reference,
      donation: {
        id: donation.id,
        purpose: donation.purpose,
        currency: donation.currency,
        amount: donation.amount,
        channel: donation.channel,
        name: donation.name,
        email: donation.email,
        phone: donation.phone,
        note: donation.note,
        status: donation.status,
        createdAt: donation.createdAt.toISOString(),
      },
    },
    { status: 201 },
  );
}
