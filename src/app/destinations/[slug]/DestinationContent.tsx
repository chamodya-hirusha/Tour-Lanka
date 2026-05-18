"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Cloud,
  MapPin,
  Star,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { destinations, packages } from "@/data/tourlanka";

const REGION_COLOURS: Record<string, string> = {
  "Cultural Triangle": "bg-violet-500/15 text-violet-400 border-violet-400/30",
  "Hill Country":      "bg-emerald-500/15 text-emerald-400 border-emerald-400/30",
  "South Coast":       "bg-sky-500/15 text-sky-400 border-sky-400/30",
  "Central Highlands": "bg-amber-500/15 text-amber-400 border-amber-400/30",
  "Tea Country":       "bg-teal-500/15 text-teal-400 border-teal-400/30",
  "Wildlife":          "bg-lime-500/15 text-lime-400 border-lime-400/30",
  "East Coast":        "bg-rose-500/15 text-rose-400 border-rose-400/30",
};

interface DestinationContentProps {
  dest: typeof destinations[number];
}

export default function DestinationContent({ dest }: DestinationContentProps) {
  const currentIdx = destinations.findIndex((d) => d.slug === dest.slug);
  const prev = currentIdx > 0 ? destinations[currentIdx - 1] : null;
  const next = currentIdx < destinations.length - 1 ? destinations[currentIdx + 1] : null;
  const regionClass = REGION_COLOURS[dest.region] ?? "bg-gold/15 text-gold border-gold/30";

  // Related tour packages
  const related = packages.filter((p) =>
    (dest.relatedPackages as readonly string[]).includes(p.slug)
  );

  // Sticky bar visibility
  const heroRef = useRef<HTMLDivElement>(null);
  const [barVisible, setBarVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setBarVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PageShell>
      {/* ── Sticky sub-bar ────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 top-16 z-40 transition-all duration-500 ${
          barVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="glass-strong border-b border-border/50">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-2.5">
            <Link href="/destinations" className="flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-foreground/60 transition hover:text-gold">
              <ArrowLeft size={11} /> Destinations
            </Link>
            <span className="h-4 w-px bg-border" />
            <span className={`hidden shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] uppercase tracking-[0.25em] sm:block ${regionClass}`}>
              {dest.region}
            </span>
            <p className="flex-1 truncate font-display text-sm leading-none">{dest.name}</p>
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-gradient-gold px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Plan a Visit
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={dest.img} alt={dest.name} className="ken-burns h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36">
          {/* Breadcrumb */}
          <nav className="fade-up mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-foreground/50">
            <Link href="/" className="transition hover:text-gold">Home</Link>
            <ChevronRight size={10} />
            <Link href="/destinations" className="transition hover:text-gold">Destinations</Link>
            <ChevronRight size={10} />
            <span className="text-gold">{dest.name}</span>
          </nav>

          {/* Region badge */}
          <div className="fade-up fade-up-1 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${regionClass}`}>
              {dest.region}
            </span>
          </div>

          <h1 className="fade-up fade-up-2 mt-5 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            {dest.name}
          </h1>
          <p className="fade-up fade-up-3 mt-5 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold">
            <MapPin size={13} /> {dest.region} · Sri Lanka
          </p>
          <div className="fade-up fade-up-4 mt-4 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-foreground/60">Luxury Curated · Private Access</span>
          </div>
        </div>
        {/* Sentinel for sticky bar */}
        <div ref={heroRef} className="absolute bottom-0 h-px w-full" />
      </section>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

          {/* Left column */}
          <div className="min-w-0 space-y-16">

            {/* Overview */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Overview</p>
              <p className="mt-5 text-lg leading-relaxed text-foreground/85">{dest.description}</p>
            </div>

            {/* Highlights */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Highlights</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {dest.highlights.map((h: string) => (
                  <div key={h} className="flex items-center gap-3 rounded-2xl border border-border bg-card/30 px-5 py-4 text-sm transition hover:border-gold/30">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check size={12} />
                    </span>
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* Related tour packages */}
            {related.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Tours Featuring This Destination</p>
                <div className="mt-6 space-y-4">
                  {related.map((pkg) => (
                    <div key={pkg.slug} className="glass flex items-center gap-5 overflow-hidden rounded-2xl p-5 transition hover:border-gold/25">
                      <img src={pkg.img} alt={pkg.title} className="h-16 w-24 shrink-0 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-gold">{pkg.tag} · {pkg.days} days</p>
                        <p className="mt-1 truncate font-display text-lg">{pkg.title}</p>
                      </div>
                      <Link
                        href={`/packages/${pkg.slug}`}
                        className="shrink-0 rounded-full border border-gold/40 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-gold transition hover:bg-gold/10"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column — sticky info card */}
          <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">

            {/* Quick info card */}
            <div className="glass-strong rounded-3xl p-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Destination at a Glance</p>

              <dl className="mt-5 space-y-4">
                {[
                  { icon: <MapPin size={13} className="text-gold" />, label: "Region", value: dest.region },
                  { icon: <CalendarDays size={13} className="text-gold" />, label: "Best Time", value: dest.bestTime },
                  { icon: <Cloud size={13} className="text-gold" />, label: "Climate", value: dest.climate },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/10">{icon}</span>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="my-6 h-px bg-border" />

              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-4 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-[1.02]"
              >
                Plan a Visit <ArrowRight size={14} />
              </Link>
              <Link
                href="/packages"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 py-3.5 text-sm uppercase tracking-[0.15em] text-gold transition hover:bg-gold/10"
              >
                Browse All Tours
              </Link>
            </div>

            {/* All destinations mini-list */}
            <div className="glass rounded-2xl p-5">
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-gold">All Destinations</p>
              <ul className="space-y-1">
                {destinations.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/destinations/${d.slug}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-gold/10 ${
                        d.slug === dest.slug ? "bg-gold/10 text-gold" : "text-foreground/70"
                      }`}
                    >
                      <span>{d.name}</span>
                      {d.slug === dest.slug
                        ? <span className="text-[9px] uppercase tracking-wider text-gold">Current</span>
                        : <ChevronRight size={13} className="text-foreground/30" />
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Prev / Next ─────────────────────────────────────── */}
        <div className="mt-24 grid gap-4 border-t border-border pt-12 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/destinations/${prev.slug}`}
              className="group glass flex items-center gap-5 rounded-2xl p-6 transition hover:border-gold/30"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition group-hover:border-gold/40 group-hover:bg-gold/10">
                <ArrowLeft size={16} className="text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Previous</p>
                <p className="mt-1 truncate font-display text-lg">{prev.name}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/destinations/${next.slug}`}
              className="group glass flex items-center justify-end gap-5 rounded-2xl p-6 text-right transition hover:border-gold/30"
            >
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Next</p>
                <p className="mt-1 truncate font-display text-lg">{next.name}</p>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition group-hover:border-gold/40 group-hover:bg-gold/10">
                <ArrowRight size={16} className="text-gold" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </PageShell>
  );
}
