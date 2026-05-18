import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { IMG } from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "About Tour Lanka — Sri Lankan Travel Specialists",
  description: "Tour Lanka is a local Sri Lankan luxury travel company designing private island journeys with authentic Ceylonese hospitality.",
  openGraph: {
    title: "About Tour Lanka",
    description: "A team born and raised in Sri Lanka, sharing our island with the world.",
    images: [IMG.tea],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Story"
        title="Born in Ceylon."
        italic="Built on hospitality."
        subtitle="Tour Lanka was founded with a passion for sharing the beauty, culture and soul of Sri Lanka with the world."
        image={IMG.tea}
      />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-elegant">
              <img src={IMG.kandy} alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="glass-strong absolute -bottom-8 -right-6 hidden w-56 rotate-[3deg] rounded-2xl p-5 md:block">
              <div className="font-display text-3xl text-gradient-gold">10 yrs</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-foreground/85">
                Designing Sri Lankan journeys
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">An island company</p>
            <h2 className="mt-4 font-display text-5xl leading-tight">
              We grew up under
              <span className="italic text-gradient-gold"> these palm trees.</span>
            </h2>
            <div className="mt-7 space-y-5 text-foreground/85">
              <p>
                Tour Lanka was founded with a passion for sharing the beauty, culture and soul of
                Sri Lanka with the world. From ancient kingdoms and sacred temples to untouched
                beaches and breathtaking wildlife, we create journeys that go beyond tourism —
                delivering unforgettable island experiences crafted with authentic Sri Lankan
                hospitality.
              </p>
              <p>
                Our small team of Colombo-based travel designers, drivers and naturalists has been
                quietly building Sri Lanka’s most personal luxury travel company. We don’t do
                package buses or rushed photo stops. We do mornings with monks, sundowners on
                Galle’s ramparts, and tea with the planter’s grand-daughter in Nuwara Eliya.
              </p>
              <p>
                If you trust us with your time on this island, we will treat it as the gift it is.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { n: "1,200+", l: "Guests welcomed" },
                { n: "98%", l: "Would recommend" },
                { n: "24/7", l: "On-island support" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card/40 p-5">
                  <div className="font-display text-3xl text-gradient-gold">{s.n}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-gold px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Speak to a designer <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
