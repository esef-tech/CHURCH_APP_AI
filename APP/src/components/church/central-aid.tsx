import { GraduationCap, HeartHandshake, BookMarked, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CHURCH } from "@/lib/church";
import { SectionHeading } from "./section-heading";
import { CentralAidCta } from "./central-aid-cta";

const PILLARS = [
  {
    icon: GraduationCap,
    title: "Scholarships",
    body: "Need-based scholarships opening doors to colleges and universities across Arizona.",
  },
  {
    icon: BookMarked,
    title: "Resources",
    body: "Books, devices, and learning materials distributed to students and families in need.",
  },
  {
    icon: HeartHandshake,
    title: "Mentorship",
    body: "Pastoral and academic mentorship raising the next generation of kingdom leaders.",
  },
];

export function CentralAid() {
  return (
    <section id="central-aid" className="relative scroll-mt-20 border-b border-white/5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Central Aid"
              title="Educating, empowering, and transforming lives"
              description="Central Aid supports students and families through scholarships, educational resources, and practical community care across Arizona."
            />

            <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-white/5 py-8">
              {CHURCH.centralAidStats.map((s) => (
                <div key={s.label}>
                  <dt className="font-serif-display text-3xl font-bold text-gradient-gold sm:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="surface surface-hover rounded-2xl p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-serif-display text-base font-bold text-white">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>

            <CentralAidCta />
          </div>

          {/* Visual card */}
          <div className="lg:col-span-5">
            <Card className="surface relative overflow-hidden rounded-3xl p-0">
              <div className="relative h-64 sm:h-80">
                <img
                  src="/church/central-aid.png"
                  alt="Students learning together in a warm community space"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-[#0b0f19]/60 text-gold backdrop-blur-sm">
                    <GraduationCap className="h-12 w-12" />
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-serif-display text-xl font-bold text-white">
                  Making quality education accessible
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Across Arizona, Central Aid is closing the gap between
                  potential and opportunity — one student at a time.
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 gap-2 px-0 text-gold hover:bg-transparent hover:text-gold-bright"
                >
                  <a href="#giving">
                    Become a partner <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
