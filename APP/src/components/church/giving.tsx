"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Loader2, CheckCircle2, Lock, Heart } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  GIVING_PURPOSES,
  CURRENCIES,
  PAYMENT_CHANNELS,
  formatMoney,
} from "@/lib/church";
import { SectionHeading } from "./section-heading";

type Status = "idle" | "submitting" | "done";

export function Giving() {
  const [purpose, setPurpose] = useState<string>(GIVING_PURPOSES[0].id);
  const [currency, setCurrency] = useState<string>("USD");
  const [amount, setAmount] = useState<string>("100");
  const [channel, setChannel] = useState<string>(PAYMENT_CHANNELS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string | null>(null);

  const numericAmount = useMemo(() => {
    const n = parseFloat(amount);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [amount]);

  const currencyObj = CURRENCIES.find((c) => c.code === currency)!;

  // Allow other sections (e.g. Central Aid) to pre-select a giving purpose.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string;
      if (typeof detail === "string" && GIVING_PURPOSES.some((p) => p.id === detail)) {
        setPurpose(detail);
        // reset a previous completed state so the form is visible again
        setStatus("idle");
        setReference(null);
      }
    };
    window.addEventListener("give:purpose", handler);
    return () => window.removeEventListener("give:purpose", handler);
  }, []);

  const handleSubmit = async () => {
    if (numericAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/giving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose,
          currency,
          amount: numericAmount,
          channel,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setReference(data.reference);
      setStatus("done");
      toast.success("Giving received!", {
        description: `Reference ${data.reference}`,
      });
    } catch (e) {
      setStatus("idle");
      toast.error(
        e instanceof Error ? e.message : "Could not process your gift.",
      );
    }
  };

  const reset = () => {
    setStatus("idle");
    setReference(null);
    setAmount("100");
    setName("");
    setEmail("");
  };

  return (
    <section id="giving" className="relative scroll-mt-20 border-b border-white/5 py-20 md:py-24">
      {/* glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Online Giving"
          title="Honour the Lord with Your Substance"
          description="Tithe, First Fruits, Offering, and Central Aid Scholarship donations. Every gift advances the kingdom and serves our community."
          align="center"
          className="mx-auto items-center"
        />

        <Card className="surface mx-auto mt-10 max-w-4xl rounded-3xl p-6 sm:p-8">
          {status === "done" && reference ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-white">
                Thank you for your gift
              </h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Your generosity is a seed into the kingdom. A confirmation with
                reference <span className="font-mono text-gold">{reference}</span>{" "}
                has been recorded. May the Lord multiply it back to you.
              </p>
              <p className="text-sm text-muted-foreground">
                You gave <span className="text-white font-semibold">{formatMoney(numericAmount, currency)}</span>{" "}
                · {GIVING_PURPOSES.find((p) => p.id === purpose)?.label}
              </p>
              <Button
                onClick={reset}
                className="mt-2 gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
              >
                Give Again
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-7">
              {/* Purpose */}
              <div className="flex flex-col gap-3">
                <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Select Giving Purpose
                </Label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {GIVING_PURPOSES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPurpose(p.id)}
                      className={cn(
                        "group flex flex-col gap-1 rounded-2xl border p-4 text-left transition-all",
                        purpose === p.id
                          ? "border-gold/50 bg-gold/10"
                          : "border-white/8 bg-white/[0.02] hover:border-gold/30",
                      )}
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-serif-display text-base font-bold text-white">
                          {p.label}
                        </span>
                        {purpose === p.id ? (
                          <CheckCircle2 className="h-4 w-4 text-gold" />
                        ) : null}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-gold/80">
                        {p.sub}
                      </span>
                      <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {p.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency + Amount */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Currency
                  </Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-full bg-white/[0.03]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.code} ({c.symbol}) — {c.label.split(" - ")[1] ?? c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Amount
                  </Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {currencyObj.symbol}
                    </span>
                    <Input
                      type="number"
                      inputMode="decimal"
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Quick amounts */}
              <div className="flex flex-wrap gap-2">
                {[50, 100, 250, 500, 1000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(String(v))}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                      amount === String(v)
                        ? "border-gold/50 bg-gold/15 text-gold"
                        : "border-white/10 text-muted-foreground hover:text-white",
                    )}
                  >
                    {currencyObj.symbol}
                    {v}
                  </button>
                ))}
              </div>

              {/* Payment channel */}
              <div className="flex flex-col gap-3">
                <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Payment Channel
                </Label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {PAYMENT_CHANNELS.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChannel(ch.id)}
                      className={cn(
                        "flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all",
                        channel === ch.id
                          ? "border-gold/50 bg-gold/10"
                          : "border-white/8 bg-white/[0.02] hover:border-gold/30",
                      )}
                    >
                      <span className="font-serif-display text-sm font-bold text-white">
                        {ch.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {ch.note}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional donor details */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Name (optional)
                  </Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-white/[0.03]"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Email for receipt (optional)
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-white/[0.03]"
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={status === "submitting" || numericAmount <= 0}
                className="h-12 gap-2 bg-gold text-base font-semibold text-[#1a1206] hover:bg-gold-bright disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Proceed to Secure Giving ({formatMoney(numericAmount, currency)})
                  </>
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-gold" /> 256-bit encrypted
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-gold" /> Tax-deductible
                </span>
                <span>KKPC A/G is a registered 501(c)(3) non-profit</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
