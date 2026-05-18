"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Fuel, ArrowRight, Check, Zap } from "lucide-react";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { vehicles, IMG } from "@/data/tourlanka";

const ALL_CATS = ["All", ...Array.from(new Set(vehicles.map((v) => v.category)))] as const;

export default function VehiclesContent() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filtered = activeFilter === "All" ? vehicles : vehicles.filter((v) => v.category === activeFilter);

  return (
    <PageShell>
      <PageHero
        eyebrow="Private Fleet"
        title="Your journey,"
        italic="your private chariot."
        subtitle="Five hand-selected vehicles — from our flagship Land Cruiser to open-top safari jeeps — each with an experienced driver-guide fluent in English."
        image={IMG.vLandCruiser}
      />

      {/* ── Filter bar ─────────────────────────────────────────── */}
      <div className="sticky top-16 z-40 border-b border-border backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            <span className="mr-3 shrink-0 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Type</span>
            {ALL_CATS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeFilter === cat
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-border text-foreground/60 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">{filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {/* ── Vehicle grid ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((v) => (
            <article key={v.slug} className="group glass flex flex-col overflow-hidden rounded-3xl reveal-hover">

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={v.img}
                  alt={v.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground">
                  {v.badge}
                </span>
                {!v.ac && (
                  <span className="absolute right-4 top-4 rounded-full bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-foreground backdrop-blur">
                    Open Air
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{v.category}</p>
                <h2 className="mt-2 font-display text-2xl leading-tight">{v.name}</h2>

                {/* Quick specs row */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] text-foreground/70">
                    <Users size={11} className="text-gold" /> {v.seats} seats
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] text-foreground/70">
                    <Fuel size={11} className="text-gold" /> {v.fuel}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] text-foreground/70">
                    <Zap size={11} className="text-gold" /> {v.transmission}
                  </span>
                </div>

                {/* Top features */}
                <ul className="mt-5 space-y-2">
                  {v.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                        <Check size={10} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-7 flex items-end justify-between border-t border-border pt-5">
                  <div className="flex gap-2 ml-auto">
                    <Link
                      href={`/vehicles/${v.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/10"
                    >
                      Details
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
                    >
                      Book <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
