import { MapPin, Clock, Phone, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import type { SampleBranch } from "@/lib/seed-data";

type BranchesProps = {
  branches: SampleBranch[];
};

export function Branches({ branches }: BranchesProps) {
  return (
    <section id="locate" className="relative scroll-mt-20 border-b border-white/5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Find a Branch"
          title="Locate our church family"
          description="Six campuses across Arizona — find a service near you and come worship with us this Sunday."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <Card
              key={b.id}
              className="surface surface-hover flex flex-col rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-white">
                      {b.city}
                    </h3>
                    <p className="text-xs text-muted-foreground">{b.name}</p>
                  </div>
                </div>
                {b.isMain ? (
                  <span className="flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-gold">
                    <Star className="h-3 w-3" /> Main
                  </span>
                ) : null}
              </div>

              <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
                <p className="leading-relaxed">{b.address}</p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold" />
                  {b.serviceTimes}
                </p>
                {b.phone ? (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gold" />
                    {b.phone}
                  </p>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
