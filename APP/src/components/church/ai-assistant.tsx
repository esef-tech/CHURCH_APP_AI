"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Welcome to Kingdom Keys Prayer Chapel! I'm Grace. Ask me about service times, giving, events, or share a prayer need.",
};

const QUICK_REPLIES = [
  "Service times",
  "How do I give?",
  "Upcoming events",
  "Pray for me",
];

const FALLBACK_REPLY =
  "I'm sorry, I couldn't respond right now. Please try again shortly — or call (602) 555-0144 and we'd love to help.";

/**
 * Floating "Ask Grace" AI assistant chat widget for KKPC A/G.
 * Renders a fixed bottom-right FAB that opens a chat panel.
 * Designed to be dropped into the app shell — does not self-render.
 */
export default function AiAssistant() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom on new messages / loading change.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Focus the input when the panel opens.
  React.useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  const hasConversation = messages.length > 1;

  async function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; reply?: string }
        | null;
      const reply =
        data?.reply && typeof data.reply === "string"
          ? data.reply
          : FALLBACK_REPLY;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: FALLBACK_REPLY },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence initial={false}>
        {open && (
          <motion.section
            key="ai-panel"
            role="dialog"
            aria-label="Ask Grace — KKPC A/G Assistant"
            aria-modal="false"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "pointer-events-auto flex max-h-[70vh] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl surface shadow-2xl shadow-black/50",
            )}
            style={{ backgroundColor: "#111521" }}
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-[rgba(255,255,255,0.08)] bg-[rgba(245,185,66,0.06)] px-4 py-3">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#1a1206]"
                style={{
                  background:
                    "linear-gradient(135deg, #fde9b8 0%, #f5b942 55%, #d99a2b 100%)",
                }}
                aria-hidden="true"
              >
                <Sparkles className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-serif-display text-base leading-tight text-foreground">
                  Ask Grace
                </h2>
                <p className="truncate text-xs text-muted-foreground">
                  KKPC A/G Assistant
                </p>
              </div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="size-8 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </Button>
            </header>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scroll-area flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <MessageBubble key={i} message={m} />
              ))}

              {loading && (
                <div className="flex items-center gap-2">
                  <Avatar />
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-[rgba(255,255,255,0.08)] bg-[#161b29] px-3 py-2">
                    <Dot delay="0ms" />
                    <Dot delay="150ms" />
                    <Dot delay="300ms" />
                  </div>
                </div>
              )}

              {!loading && !hasConversation && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="rounded-full border border-[rgba(245,185,66,0.4)] bg-[rgba(245,185,66,0.08)] px-3 py-1.5 text-xs text-[#f5b942] transition-colors hover:bg-[rgba(245,185,66,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b942]/50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Composer */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[rgba(255,255,255,0.08)] p-3"
            >
              <label htmlFor="grace-input" className="sr-only">
                Type a message to Grace
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="grace-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Grace anything…"
                  disabled={loading}
                  autoComplete="off"
                  className="h-10 rounded-xl border-[rgba(255,255,255,0.1)] bg-[#0b0f19] text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-[#f5b942]/60 focus-visible:ring-[#f5b942]/30"
                  aria-label="Message"
                />
                <Button
                  type="submit"
                  size="icon"
                  aria-label="Send message"
                  disabled={loading || input.trim().length === 0}
                  className="size-10 shrink-0 rounded-xl bg-[#f5b942] text-[#1a1206] hover:bg-[#fbbf24] disabled:opacity-50"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="mt-2 px-1 text-[10px] text-muted-foreground">
                Grace is an AI assistant. For urgent pastoral care, call{" "}
                <span className="text-[#f5b942]">(602) 555-0144</span>.
              </p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <Button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Grace assistant" : "Open Grace assistant"}
        aria-expanded={open}
        className="pointer-events-auto size-14 rounded-full bg-[#f5b942] text-[#1a1206] shadow-xl shadow-black/40 hover:bg-[#fbbf24]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <MessageCircle className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}

/* ---------- sub components ---------- */

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-2xl rounded-tr-sm border border-[rgba(245,185,66,0.25)] bg-[rgba(245,185,66,0.14)] px-3 py-2 text-sm text-foreground">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start gap-2">
      <Avatar />
      <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-[rgba(255,255,255,0.08)] bg-[#161b29] px-3 py-2 text-sm text-foreground">
        {message.content}
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <span
      className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-[#1a1206]"
      style={{
        background:
          "linear-gradient(135deg, #fde9b8 0%, #f5b942 55%, #d99a2b 100%)",
      }}
      aria-hidden="true"
    >
      <Sparkles className="size-3.5" />
    </span>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-[#f5b942]"
      style={{ animationDelay: delay, animationDuration: "1s" }}
    />
  );
}
