import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Fuel,
  Gauge,
  Luggage,
  Settings,
  Star,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { vehicles } from "@/data/tourlanka";

interface PageProps {
  params: {
    slug: string;
  };
}

const CAT_COLOURS: Record<string, string> = {
  "Luxury SUV":    "bg-amber-500/15 text-amber-400 border-amber-400/30",
  "Luxury Van":    "bg-sky-500/15 text-sky-400 border-sky-400/30",
  "Eco Sedan":     "bg-emerald-500/15 text-emerald-400 border-emerald-400/30",
  "Luxury Minibus":"bg-violet-500/15 text-violet-400 border-violet-400/30",
  "Safari 4×4":   "bg-lime-500/15 text-lime-400 border-lime-400/30",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = vehicles.find((v) => v.slug === slug);
  if (!v) return {};
  return {
    title: `${v.name} — Tour Lanka Fleet`,
    description: v.description,
    openGraph: {
      title: `${v.name} — Tour Lanka`,
      description: v.description,
      images: [v.img],
    },
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = vehicles.find((v) => v.slug === slug);
  if (!v) {
    notFound();
  }

  const idx = vehicles.findIndex((x) => x.slug === v.slug);
  const prev = idx > 0 ? vehicles[idx - 1] : null;
  const next = idx < vehicles.length - 1 ? vehicles[idx + 1] : null;
  const catClass = CAT_COLOURS[v.category] ?? "bg-gold/15 text-gold border-gold/30";

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={v.img} alt={v.name} className="ken-burns h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-36">
          {/* Breadcrumb */}
          <nav className="fade-up mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-foreground/50">
            <Link href="/" className="transition hover:text-gold">Home</Link>
            <ChevronRight size={10} />
            <Link href="/vehicles" className="transition hover:text-gold">Fleet</Link>
            <ChevronRight size={10} />
            <span className="text-gold">{v.name}</span>
          </nav>

          <div className="fade-up fade-up-1 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${catClass}`}>
              {v.category}
            </span>
            <span className="rounded-full bg-gradient-gold px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground">
              {v.badge}
            </span>
          </div>

          <h1 className="fade-up fade-up-2 mt-5 max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            {v.name}
          </h1>

          <div className="fade-up fade-up-3 mt-5 flex flex-wrap gap-4">
            {[
              { icon: <Users size={12} />, label: `${v.seats} Seats` },
              { icon: <Fuel size={12} />, label: v.fuel },
              { icon: <Zap size={12} />, label: v.transmission },
              { icon: <Wind size={12} />, label: v.ac ? "Full AC" : "Open Air" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-foreground/70">
                <span className="text-gold">{icon}</span> {label}
              </span>
            ))}
          </div>

          <div className="fade-up fade-up-4 mt-4 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-foreground/60">Professionally maintained · Chauffeur driven</span>
          </div>
        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">

          {/* Left column */}
          <div className="min-w-0 space-y-16">

            {/* Overview */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Overview</p>
              <p className="mt-5 text-lg leading-relaxed text-foreground/85">{v.description}</p>
            </div>

            {/* Features */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Features & Amenities</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {v.features.map((f: string) => (
                  <div key={f} className="flex items-center gap-3 rounded-2xl border border-border bg-card/30 px-5 py-4 text-sm transition hover:border-gold/30">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                      <Check size={12} />
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications table */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Technical Specifications</p>
              <dl className="mt-6 grid gap-3 rounded-3xl border border-border bg-card/20 p-6 sm:grid-cols-2">
                {[
                  { icon: <Settings size={13} />, label: "Engine", value: v.specs.engine },
                  { icon: <Gauge size={13} />, label: "Power", value: v.specs.power },
                  { icon: <Zap size={13} />, label: "Torque", value: v.specs.torque },
                  { icon: <Settings size={13} />, label: "Drive", value: v.specs.drive },
                  { icon: <Luggage size={13} />, label: "Luggage", value: v.specs.luggage },
                  { icon: <Users size={13} />, label: "Capacity", value: `${v.seats} passengers` },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0 sm:[&:nth-last-child(2)]:border-0">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">{icon}</span>
                    <div>
                      <dt className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">{label}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Best for */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-gold">Best For</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {v.bestFor.map((b: string) => (
                  <span key={b} className="rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-foreground/80">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — booking widget */}
          <div className="space-y-5 lg:sticky lg:top-32 lg:self-start">

            {/* Price card */}
            <div className="glass-strong rounded-3xl p-8">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] ${catClass}`}>
                  {v.category}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                  <Users size={9} className="text-gold" /> {v.seats} seats
                </span>
              </div>

              <Link
                href="/contact"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold py-4 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-[1.02]"
              >
                Book This Vehicle <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 py-3.5 text-sm uppercase tracking-[0.15em] text-gold transition hover:bg-gold/10"
              >
                Request Custom Quote
              </Link>
              <p className="mt-3 text-center text-[10px] text-muted-foreground">
                Includes driver · Fuel extra · Flexible dates
              </p>
            </div>

            {/* All vehicles mini-list */}
            <div className="glass rounded-2xl p-5">
              <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-gold">All Vehicles</p>
              <ul className="space-y-1">
                {vehicles.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/vehicles/${x.slug}`}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition hover:bg-gold/10 ${
                        x.slug === v.slug ? "bg-gold/10 text-gold" : "text-foreground/70"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate">{x.name}</p>
                        <p className="text-[9px] text-muted-foreground">{x.category}</p>
                      </div>
                      {x.slug === v.slug
                        ? <span className="shrink-0 text-[9px] uppercase tracking-wider text-gold">Current</span>
                        : <ChevronRight size={13} className="shrink-0 text-foreground/30" />
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-24 grid gap-4 border-t border-border pt-12 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/vehicles/${prev.slug}`}
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
              href={`/vehicles/${next.slug}`}
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
