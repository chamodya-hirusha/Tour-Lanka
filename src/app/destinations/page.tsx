import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { destinations, IMG } from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "Sri Lanka Destinations — Tour Lanka",
  description: "Eight unforgettable Sri Lankan destinations — Sigiriya, Ella, Mirissa, Kandy, Yala and more, curated by Tour Lanka.",
  openGraph: {
    title: "Sri Lanka Destinations — Tour Lanka",
    description: "Explore Sri Lanka's most iconic regions with private luxury tours.",
    images: [IMG.ella],
  },
};

export default function DestinationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Destinations"
        title="Eight wonders,"
        italic="one emerald island."
        subtitle="From the sacred Cultural Triangle to the wild south coast, every corner of Sri Lanka tells a different story. Choose where yours begins."
        image={IMG.ella}
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {destinations.map((d, i) => (
            <article
              key={d.slug}
              className="group reveal-hover relative overflow-hidden rounded-3xl shadow-elegant"
            >
              <div className="relative h-[420px]">
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-amber-400">
                  <span className="flex items-center gap-2">
                    <MapPin size={12} /> {d.region}
                  </span>
                  <span className="text-white/60">0{i + 1}</span>
                </div>
                <h2 className="mt-3 font-display text-4xl text-white">{d.name}</h2>
                <p className="mt-2 max-w-md text-sm text-white/80">{d.desc}</p>
                <Link
                  href={`/destinations/${d.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/80 transition group-hover:text-amber-400"
                >
                  Discover <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
