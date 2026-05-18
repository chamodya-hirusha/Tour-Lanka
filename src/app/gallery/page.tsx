import type { Metadata } from "next";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { galleryItems, IMG } from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "Sri Lanka Gallery — Tour Lanka",
  description: "A cinematic gallery of Sri Lanka — tea plantations, wildlife, waterfalls, temples, beaches and luxury resorts.",
  openGraph: {
    title: "Sri Lanka Gallery — Tour Lanka",
    description: "A visual love letter to the pearl of the Indian Ocean.",
    images: [IMG.mirissa],
  },
};

export default function GalleryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Gallery"
        title="A visual love letter"
        italic="to Ceylon."
        subtitle="Misty mornings on the tea hills. Leopards in the long grass. Stilt fishermen at dusk. A few small windows into the Sri Lanka we know and love."
        image={IMG.mirissa}
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {galleryItems.map((g, i) => (
            <figure
              key={g.label + i}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl shadow-elegant"
            >
              <img
                src={g.img}
                alt={g.label}
                loading="lazy"
                className={`w-full object-cover transition duration-[1500ms] group-hover:scale-110 ${
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent opacity-90" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{g.region}</div>
                <div className="mt-1 font-display text-2xl">{g.label}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
