"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Star,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { packages } from "@/data/tourlanka";

const TAG_COLOURS: Record<string, string> = {
  Luxury:          "bg-amber-500/15 text-amber-400 border-amber-400/30",
  Honeymoon:       "bg-rose-500/15 text-rose-400 border-rose-400/30",
  Cultural:        "bg-violet-500/15 text-violet-400 border-violet-400/30",
  Adventure:       "bg-emerald-500/15 text-emerald-400 border-emerald-400/30",
  "Beach Luxury":  "bg-sky-500/15 text-sky-400 border-sky-400/30",
};

const SECTIONS = ["Overview", "Itinerary", "Includes"] as const;

interface PackageContentProps {
  pkg: typeof packages[number];
}

export default function PackageContent({ pkg }: PackageContentProps) {
  const currentIdx = packages.findIndex((p) => p.slug === pkg.slug);
  const prev = currentIdx > 0 ? packages[currentIdx - 1] : null;
  const next = currentIdx < packages.length - 1 ? packages[currentIdx + 1] : null;
  const tagClass = TAG_COLOURS[pkg.tag] ?? "bg-gold/15 text-gold border-gold/30";

  const [activeSection, setActiveSection] = useState<string>("Overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scrollspy — highlight active section in sub-nav
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(s); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (section: string) => {
    sectionRefs.current[section]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageShell>
      {/* HERO */}
      <section className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pkg.img}
            alt={pkg.title}
            className="ken-burns h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36">
          <nav className="fade-up mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-foreground/50">
            <Link href="/" className="transition hover:text-gold">Home</Link>
            <ChevronRight size={10} />
            <Link href="/packages" className="transition hover:text-gold">Tours</Link>
            <ChevronRight size={10} />
            <span className="text-gold">{pkg.title}</span>
          </nav>

          <div className="fade-up fade-up-1 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${tagClass}`}>
              {pkg.tag}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              <Clock size={10} className="text-gold" /> {pkg.days} Days / {pkg.days - 1} Nights
            </span>
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              <Users size={10} className="text-gold" /> Private Tour
            </span>
          </div>

          <h1 className="fade-up fade-up-2 mt-5 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            {pkg.title}
          </h1>

          <p className="fade-up fade-up-3 mt-5 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold">
            <MapPin size={13} /> {pkg.route}
          </p>

          <div className="fade-up fade-up-4 mt-4 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-foreground/60">Luxury Graded · All Private</span>
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAV */}
      <div className="sticky top-16 z-40 border-b border-border glass-strong">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`relative px-5 py-3.5 text-[11px] uppercase tracking-[0.25em] transition-colors duration-200 ${
                  activeSection === s
                    ? "text-gold"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {s}
                {activeSection === s && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-gold rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-gold px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* LEFT COLUMN */}
          <div className="space-y-20">
            {/* OVERVIEW */}
            <section
              ref={(el) => { sectionRefs.current["Overview"] = el; }}
              id="overview"
            >
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Overview</p>
              <p className="mt-5 text-lg leading-relaxed text-foreground/85">
                {pkg.description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card/30 px-5 py-4 text-sm transition hover:border-gold/30"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check size={12} />
                    </span>
                    {h}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card/20 p-6 sm:grid-cols-4">
                {[
                  { label: "Duration", value: `${pkg.days} Days` },
                  { label: "Nights", value: `${pkg.days - 1} Nights` },
                  { label: "Group", value: "Private" },
                  { label: "Departure", value: "Any Date" },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
                    <p className="mt-1.5 font-display text-xl">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARY */}
            <section
              ref={(el) => { sectionRefs.current["Itinerary"] = el; }}
              id="itinerary"
            >
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Day-by-Day Itinerary</p>
              <ol className="relative mt-8 border-l border-gold/20 pl-8 space-y-1">
                {pkg.itinerary.map((item: { day: number; place: string; detail: string }) => (
                  <li key={item.day} className="relative pb-7 last:pb-0 group/item">
                    <span className="absolute -left-[1.18rem] top-1 grid h-6 w-6 place-items-center rounded-full border border-gold/50 bg-background text-[10px] font-bold text-gold transition group-hover/item:border-gold group-hover/item:bg-gold/10">
                      {item.day}
                    </span>

                    <div className="glass rounded-2xl p-5 transition duration-300 hover:border-gold/20">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold">
                        <CalendarDays size={10} />
                        Day {item.day} · <span className="text-foreground/70">{item.place}</span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-foreground/75">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* INCLUDES */}
            <section
              ref={(el) => { sectionRefs.current["Includes"] = el; }}
              id="includes"
            >
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">What's Included</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card/20 px-5 py-4 text-sm transition hover:border-gold/25"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check size={11} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                  <Clock size={9} className="text-gold" /> {pkg.days} Days
                </span>
                <span className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] ${tagClass}`}>
                  {pkg.tag}
                </span>
              </div>

              <Link
                href="/contact"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-4 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-[1.02]"
              >
                Book This Tour <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 py-3.5 text-sm uppercase tracking-[0.15em] text-gold transition hover:bg-gold/10"
              >
                Request Custom Quote
              </Link>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">
                Free consultation · No commitment · Fully customisable
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-gold">Quick Facts</p>
              <dl className="space-y-3 text-sm">
                {[
                  { label: "Duration", value: `${pkg.days} Days / ${pkg.days - 1} Nights` },
                  { label: "Category", value: pkg.tag },
                  { label: "Group Type", value: "Private" },
                  { label: "Vehicle", value: "Private AC" },
                  { label: "Departure", value: "Any Date" },
                  { label: "Min. Guests", value: "1" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium text-foreground text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 text-center">
              <p className="font-display text-lg">Need help choosing?</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Our local experts are here to personalise any itinerary for you.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold transition hover:underline"
              >
                Talk to an expert <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        {/* PREV / NEXT */}
        <div className="mt-24 grid gap-4 border-t border-border pt-12 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/packages/${prev.slug}`}
              className="group glass flex items-center gap-5 rounded-2xl p-6 transition hover:border-gold/30"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition group-hover:border-gold/40 group-hover:bg-gold/10">
                <ArrowLeft size={16} className="text-gold transition group-hover:-translate-x-0.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Previous</p>
                <p className="mt-1 truncate font-display text-lg">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/packages/${next.slug}`}
              className="group glass flex items-center justify-end gap-5 rounded-2xl p-6 text-right transition hover:border-gold/30"
            >
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Next</p>
                <p className="mt-1 truncate font-display text-lg">{next.title}</p>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition group-hover:border-gold/40 group-hover:bg-gold/10">
                <ArrowRight size={16} className="text-gold transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </PageShell>
  );
}
