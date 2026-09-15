import { NextResponse } from "next/server";
import { CHURCH, GIVING_PURPOSES } from "@/lib/church";
import { getZai } from "@/lib/zai";

export const runtime = "nodejs";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

/**
 * Builds the "Grace" system prompt — turns the LLM into the friendly,
 * Christ-centred AI assistant for Kingdom Keys Prayer Chapel A/G.
 */
function buildSystemPrompt(): string {
  const services = CHURCH.mainServices.join(" · ");
  const stats = CHURCH.stats.map((s) => `${s.value} ${s.label}`).join(", ");
  const purposes = GIVING_PURPOSES.map(
    (p) => `- ${p.label} (${p.sub}): ${p.description}`,
  ).join("\n");

  return `You are "Grace", the friendly AI assistant for ${CHURCH.name} ${CHURCH.suffix} (${CHURCH.shortName}), a Spirit-filled Assemblies of God church based in ${CHURCH.city}, ${CHURCH.state}, ${CHURCH.country}.

ABOUT THE CHURCH
- Full name: ${CHURCH.name} ${CHURCH.suffix} (${CHURCH.shortName})
- Tagline: ${CHURCH.tagline}
- Vision: ${CHURCH.vision}
- Address: ${CHURCH.address}
- Phone: ${CHURCH.phone}
- Email: ${CHURCH.email}
- Main campus service times: ${services}
- Reach: ${stats}
- Campuses across Arizona: Phoenix (main), Mesa, Tempe, Tucson, Glendale, Flagstaff.
- The church regularly runs services, prayer meetings, devotionals, sermons, and community events across these campuses.

GIVING (Online Giving purposes)
${purposes}
Accepted currencies: USD, GHS, GBP, EUR. Payment channels: Visa/Master card, PayPal, Cash App ($kkpcag), Zelle (give@kkpcag.church).

YOUR PERSONA & RULES
- Be warm, welcoming, concise, and Christ-centred. Glorify Jesus in tone.
- You can answer questions about: service times, giving, upcoming events, prayer, location, what to expect, campuses, and church life.
- Keep replies SHORT — under about 120 words — unless the person explicitly asks for more detail.
- Use plain text. Use short paragraphs or a few bullet points when helpful. No markdown headings.
- NEVER invent specific dates, times beyond what's listed above, prices, scriptures taken out of context, or facts about the church that aren't in this context. If you don't know a specific detail, say so honestly and invite them to call ${CHURCH.phone} or email ${CHURCH.email}.
- If asked something completely outside church life (politics, other churches, general world knowledge not relevant to a visitor's church journey), gently and kindly redirect the conversation back to KKPC A/G and how you can help with church life, prayer, or giving.
- Always offer to take a prayer request when it feels natural (e.g. when someone shares a need, a worry, or asks for prayer). You can ask them to share what's on their heart.
- Never claim to be a pastor or to perform sacraments; you are an assistant.
- Refer to the church affectionately as "KKPC A/G" or "Kingdom Keys Prayer Chapel".

Remember: you are a help to seekers, guests, and members alike — point everyone toward Christ and toward belonging in this church family.`;
}

export async function POST(req: Request) {
  const fallbackReply =
    "I'm sorry, I couldn't respond right now. Please try again shortly.";

  try {
    const body = await req.json().catch(() => ({}));
    const incoming = Array.isArray(body?.messages) ? body.messages : [];
    const messages: IncomingMessage[] = incoming
      .filter(
        (m: unknown): m is IncomingMessage =>
          !!m &&
          typeof m === "object" &&
          ((m as IncomingMessage).role === "user" ||
            (m as IncomingMessage).role === "assistant") &&
          typeof (m as IncomingMessage).content === "string",
      )
      .slice(-12)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }));

    if (messages.length === 0) {
      return NextResponse.json({ ok: true, reply: greetingReply() });
    }

    const zai = await getZai();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: buildSystemPrompt() },
        ...messages,
      ],
      temperature: 0.6,
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() || fallbackReply;

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    return NextResponse.json(
      { ok: false, reply: fallbackReply, error: String(error) },
      { status: 200 },
    );
  }
}

function greetingReply(): string {
  return "Welcome to Kingdom Keys Prayer Chapel! I'm Grace. Ask me about service times, giving, events, or share a prayer need.";
}
