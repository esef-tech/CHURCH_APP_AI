"use client";

import { useEffect, useState } from "react";
import { Heart, Loader2, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRAYER_CATEGORIES } from "@/lib/church";
import { useUIStore } from "@/lib/ui-store";

type Status = "idle" | "submitting" | "done";

export function PrayerRequest() {
  const open = useUIStore((s) => s.prayerOpen);
  const closePrayer = useUIStore((s) => s.closePrayer);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<string>(PRAYER_CATEGORIES[0]);
  const [request, setRequest] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  // reset the form whenever the dialog closes
  useEffect(() => {
    if (!open && status === "done") {
      const t = setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setPhone("");
        setRequest("");
        setIsUrgent(false);
        setCategory(PRAYER_CATEGORIES[0]);
        setMessage(null);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (request.trim().length < 5) {
      toast.error("Please share a little more in your request.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/prayer-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          request: request.trim(),
          category,
          isUrgent,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send");
      setMessage(data.message);
      setStatus("done");
      toast.success("Prayer request received", {
        description: "Our prayer team is standing with you.",
      });
    } catch (err) {
      setStatus("idle");
      toast.error(
        err instanceof Error ? err.message : "Could not submit your request.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? null : closePrayer())}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#111521] text-foreground sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
              <Heart className="h-5 w-5" />
            </span>
            <div>
              <DialogTitle className="font-serif-display text-xl font-bold text-white">
                Share a Prayer Request
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Our prayer team is honoured to stand with you in faith.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {status === "done" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="font-serif-display text-xl font-bold text-white">
              Your request has been received
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {message ??
                "Our prayer team will lift your request before the Lord. You are not alone."}
            </p>
            <Button
              onClick={closePrayer}
              className="mt-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="pr-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Name
                </Label>
                <Input
                  id="pr-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="bg-white/[0.03]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="pr-cat" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="pr-cat" className="bg-white/[0.03]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRAYER_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="pr-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email (optional)
                </Label>
                <Input
                  id="pr-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white/[0.03]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="pr-phone" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone (optional)
                </Label>
                <Input
                  id="pr-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(602) 555-0000"
                  className="bg-white/[0.03]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="pr-request" className="text-xs uppercase tracking-wider text-muted-foreground">
                Your Prayer Request
              </Label>
              <Textarea
                id="pr-request"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="Share what is on your heart…"
                rows={4}
                required
                minLength={5}
                className="resize-none bg-white/[0.03]"
              />
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <div>
                <Label
                  htmlFor="pr-urgent"
                  className="text-sm font-medium text-white"
                >
                  Mark as urgent
                </Label>
                <p className="text-xs text-muted-foreground">
                  For time-sensitive needs requiring immediate prayer.
                </p>
              </div>
              <Switch
                id="pr-urgent"
                checked={isUrgent}
                onCheckedChange={setIsUrgent}
              />
            </div>

            <Button
              type="submit"
              disabled={status === "submitting"}
              className="h-12 gap-2 bg-gold font-semibold text-[#1a1206] hover:bg-gold-bright disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Submit Prayer Request
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Your request is handled with confidentiality and pastoral care.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
