import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play, MapPin, Star, Clock, Compass, Car, Hotel, Train, Phone } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import {
  IMG,
  destinations,
  packages,
  testimonials,
} from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "Tour Lanka — Discover The Soul of Sri Lanka",
  description: "Luxury private tours of Sri Lanka — Sigiriya, Ella, Yala safaris, tea country and golden beaches, crafted by local experts.",
  openGraph: {
    title: "Tour Lanka — Discover The Soul of Sri Lanka",
    description: "One island. Endless wonders. Cinematic Sri Lankan journeys, hand-crafted.",
    images: [IMG.sigiriya],
  },
};

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Marquee />
      <FeaturedDestinations />
      <SignaturePackages />
      <WhyChooseUs />
      <ImmersiveStory />
      <Testimonials />
      <CTASection />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMG.sigiriya}
          alt="Sigiriya Rock Fortress at sunrise"
          width={1920}
          height={1080}
          className="ken-burns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/35 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Vertical text */}
      <div className="absolute left-8 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.5em] text-gold/70 lg:block">
        Ceylon · Pearl of the Indian Ocean
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          <p className="fade-up flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-12 bg-gold" /> A Tour Lanka Original
          </p>
          <h1 className="fade-up fade-up-1 mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.95] text-foreground">
            Discover The Soul
            <span className="block">
              Of <span className="text-gradient-gold">Sri Lanka</span>
            </span>
            <span className="mt-2 block font-display text-3xl italic text-foreground/85 md:text-4xl">
              One Island. Endless Wonders.
            </span>
          </h1>
          <p className="fade-up fade-up-2 mt-8 max-w-xl text-base leading-relaxed text-foreground/85 md:text-lg">
            From misty mountains and ancient kingdoms to golden beaches and unforgettable wildlife
            safaris — Tour Lanka crafts extraordinary Sri Lankan journeys for travelers seeking
            luxury, culture, and adventure.
          </p>

          <div className="fade-up fade-up-3 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/destinations"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Explore Sri Lanka
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <button className="group inline-flex items-center gap-3 rounded-full border border-border bg-card/30 px-6 py-4 text-sm uppercase tracking-[0.18em] text-foreground backdrop-blur transition hover:border-gold hover:text-gold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-gold text-primary-foreground">
                <Play size={12} fill="currentColor" />
              </span>
              Watch Our Story
            </button>
          </div>
        </div>

        {/* Floating destination cards */}
        <div className="fade-up fade-up-4 mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Ella", meta: "5 Days · Hill Country", img: IMG.ella },
            { name: "Sigiriya", meta: "Cultural Tour", img: IMG.sigiriya },
            { name: "Mirissa", meta: "Whale Watching", img: IMG.mirissa },
            { name: "Yala", meta: "Safari Experience", img: IMG.yala },
          ].map((c, i) => (
            <div
              key={c.name}
              className="glass group reveal-hover relative overflow-hidden rounded-2xl"
              style={{ animationDelay: `${0.6 + i * 0.1}s` }}
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent" />
              </div>
              <div className="p-4">
                <div className="font-display text-xl text-foreground">{c.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-gold/80">{c.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-foreground/60 md:flex">
        Scroll
        <span className="h-10 w-px animate-pulse bg-gold" />
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Sigiriya", "Ella", "Kandy", "Yala", "Mirissa", "Galle",
    "Nuwara Eliya", "Arugam Bay", "Anuradhapura", "Polonnaruwa",
    "Trincomalee", "Bentota",
  ];
  return (
    <div className="border-y border-border bg-card/30 py-6 overflow-hidden">
      <div className="flex animate-[shimmer-line_30s_linear_infinite] gap-12 whitespace-nowrap text-2xl font-display italic text-foreground/40">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            {w}
            <span className="h-1 w-1 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedDestinations() {
  const featured = destinations.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Where to Wander</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Sacred peaks, wild jungles
            <span className="block italic text-gradient-gold">and shores of gold.</span>
          </h2>
        </div>
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold hover:text-foreground"
        >
          View all destinations <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((d, i) => (
          <Link
            key={d.slug}
            href={`/destinations/${d.slug}`}
            className={`group reveal-hover relative overflow-hidden rounded-3xl shadow-elegant block ${
              i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div className={`relative ${i === 0 ? "h-[560px]" : "h-80"}`}>
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-amber-400">
                <MapPin size={12} /> {d.region}
              </div>
              <h3 className="mt-2 font-display text-3xl leading-tight text-white md:text-4xl">{d.name}</h3>
              <p className="mt-2 max-w-md text-sm text-white/75">{d.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/75 transition group-hover:text-amber-400">
                Discover <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SignaturePackages() {
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-card/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Signature Journeys</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Hand-crafted Sri Lankan
            <span className="block italic text-gradient-gold">tour experiences.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((p) => (
            <article
              key={p.title}
              className="group glass reveal-hover flex flex-col overflow-hidden rounded-3xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-gradient-gold px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground">
                  {p.tag}
                </span>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/60 px-3 py-1 text-[11px] text-foreground backdrop-blur">
                  <Clock size={11} /> {p.days} days
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl leading-tight">{p.title}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-gold/85">{p.route}</p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-3 shrink-0 bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-end justify-between border-t border-border pt-5">
                  <div className="flex items-center gap-2 ml-auto">
                    <Link
                      href={`/packages/${p.slug}`}
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
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    { icon: Compass, title: "Local Sri Lankan Experts", desc: "Born and raised on the island. We share Sri Lanka as it is truly lived." },
    { icon: Car, title: "Private Chauffeur Tours", desc: "Your own driver-guide in air-conditioned comfort, every kilometre." },
    { icon: Hotel, title: "Handpicked Luxury Resorts", desc: "From colonial heritage hotels to jungle-edge tented camps." },
    { icon: Star, title: "Authentic Wildlife Safaris", desc: "Sunrise game drives in Yala and Wilpattu with naturalist guides." },
    { icon: Train, title: "Scenic Train Experiences", desc: "First-class observation seats on the Ella & Kandy line." },
    { icon: Phone, title: "24/7 Travel Assistance", desc: "A real Sri Lankan team on call from arrival to your final goodbye." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-elegant">
            <img
              src={IMG.tea}
              alt="Tea pickers in Nuwara Eliya"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-64 rotate-[3deg] overflow-hidden rounded-2xl border-4 border-background shadow-glow md:block">
            <img src={IMG.waterfall} alt="" loading="lazy" className="aspect-square object-cover" />
          </div>
          <div className="absolute -top-6 -left-4 hidden w-48 -rotate-[5deg] glass-strong rounded-2xl p-5 md:block">
            <div className="font-display text-3xl text-gradient-gold">1,200+</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-foreground/85">
              Travellers welcomed
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Why Tour Lanka</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Sri Lanka expertise,
            <span className="block italic text-gradient-gold">luxury hospitality.</span>
          </h2>
          <p className="mt-6 max-w-lg text-foreground/80">
            For over a decade we have guided travellers from across the world into the heart of
            Ceylon — with the care, knowledge, and warmth only a truly local team can offer.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-border bg-card/40 p-5 transition hover:border-gold/50">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold text-primary-foreground shadow-glow">
                  <f.icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-xl">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImmersiveStory() {
  return (
    <section className="relative my-12 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.villa} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">A Sense of Place</p>
          <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
            Where the jungle meets
            <span className="block italic text-gradient-gold">the Indian Ocean.</span>
          </h2>
          <p className="mt-6 text-foreground/85">
            Float in an infinity pool above the canopy. Wake to the cry of peacocks. Dine under the
            stars on a beach lit by paper lanterns. Tour Lanka choreographs the small, perfect
            moments that turn a holiday into a homecoming.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-gold px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Our Story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Travellers’ Tales</p>
        <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
          Whispers from
          <span className="italic text-gradient-gold"> our guests.</span>
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="glass relative rounded-3xl p-8">
            <div className="flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-2xl italic leading-snug text-foreground/95">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm">
              <div>
                <div className="font-medium text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.place}</div>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{t.trip}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 bg-card/60 p-12 shadow-glow md:p-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={IMG.mirissa} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/40" />
        </div>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Begin Your Journey</p>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] md:text-6xl">
              Let’s craft your
              <span className="block italic text-gradient-gold">Sri Lankan story.</span>
            </h2>
            <p className="mt-6 max-w-md text-foreground/80">
              Tell us your travel dates and dreams. Within 24 hours a local Tour Lanka expert will
              design a private itinerary, just for you.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-gold px-9 py-4 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105"
            >
              Plan My Journey <ArrowRight size={16} />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-border px-9 py-4 text-sm uppercase tracking-[0.18em] text-foreground transition hover:border-gold hover:text-gold"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
