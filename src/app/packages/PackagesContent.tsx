"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Check } from "lucide-react";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { IMG, packages } from "@/data/tourlanka";

const ALL_TAGS = ["All", ...Array.from(new Set(packages.map((p) => p.tag)))] as const;

const TAG_STYLES: Record<string, { pill: string; active: string }> = {
  All:            { pill: "border-border text-foreground/70 hover:border-gold/50 hover:text-gold", active: "border-gold bg-gold text-primary-foreground" },
  Luxury:         { pill: "border-amber-400/30 text-amber-400/80 hover:bg-amber-400/10",          active: "border-amber-400 bg-amber-400/20 text-amber-300" },
  Honeymoon:      { pill: "border-rose-400/30 text-rose-400/80 hover:bg-rose-400/10",             active: "border-rose-400 bg-rose-400/20 text-rose-300" },
  Cultural:       { pill: "border-violet-400/30 text-violet-400/80 hover:bg-violet-400/10",       active: "border-violet-400 bg-violet-400/20 text-violet-300" },
  Adventure:      { pill: "border-emerald-400/30 text-emerald-400/80 hover:bg-emerald-400/10",    active: "border-emerald-400 bg-emerald-400/20 text-emerald-300" },
  "Beach Luxury": { pill: "border-sky-400/30 text-sky-400/80 hover:bg-sky-400/10",                active: "border-sky-400 bg-sky-400/20 text-sky-300" },
};

const tagCount = (tag: string) =>
  tag === "All" ? packages.length : packages.filter((p) => p.tag === tag).length;

export default function PackagesContent() {
  const [activeTag, setActiveTag] = useState<string>("All");
  const filtered = activeTag === "All" ? packages : packages.filter((p) => p.tag === activeTag);

  return (
    <PageShell>
      <PageHero
        eyebrow="Signature Tours"
        title="Private journeys,"
        italic="hand-crafted by locals."
        subtitle="Six signature itineraries — from a 5-day hill country escape to a 10-day grand tour. Every route is fully customisable to your taste."
        image={IMG.sigiriya}
      />

      {/* ── Tag filter bar ──────────────────────────────────────── */}
      <div className="sticky top-16 z-40 border-b border-border backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
            <span className="mr-3 shrink-0 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Filter
            </span>
            {ALL_TAGS.map((tag) => {
              const styles = TAG_STYLES[tag] ?? TAG_STYLES["All"];
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`
                    relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2
                    text-[11px] font-medium uppercase tracking-[0.2em]
                    transition-all duration-300
                    ${isActive ? styles.active : styles.pill}
                  `}
                >
                  {tag}
                  <span className={`grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold transition-all duration-300 ${isActive ? "bg-white/20" : "bg-foreground/10"}`}>
                    {tagCount(tag)}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-[1.0625rem] left-1/2 h-0.5 w-3/4 -translate-x-1/2 rounded-full bg-gradient-gold" />
                  )}
                </button>
              );
            })}
            <span className="ml-auto shrink-0 text-[10px] text-muted-foreground">
              {filtered.length} tour{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* ── Package cards ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl space-y-10 px-6 py-16">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <p className="font-display text-4xl text-foreground/30">No tours found</p>
            <button onClick={() => setActiveTag("All")} className="text-sm text-gold underline underline-offset-4">
              Clear filter
            </button>
          </div>
        ) : (
          filtered.map((p, i) => (
            <article
              key={p.slug}
              className={`group glass grid items-stretch overflow-hidden rounded-3xl transition-all duration-500 md:grid-cols-2 ${
                i % 2 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-72 md:h-auto">
                <img src={p.img} alt={p.title} loading="lazy"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground">
                  {p.tag}
                </span>
              </div>

              <div className="flex flex-col justify-center p-10 md:p-12">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-gold/80">
                  <span className="flex items-center gap-1.5"><Clock size={11} /> {p.days} days</span>
                  <span className="h-px w-10 bg-gold/40" />
                  <span>{p.tag}</span>
                </div>
                <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{p.title}</h2>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-gold">{p.route}</p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
                      <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full bg-gold/20 text-gold">
                        <Check size={10} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
                  <div className="flex flex-wrap items-center gap-3 ml-auto">
                    <Link
                      href={`/packages/${p.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm uppercase tracking-[0.15em] text-gold transition hover:bg-gold/10"
                    >
                      View Details
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
                    >
                      Book Now <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </PageShell>
  );
}
