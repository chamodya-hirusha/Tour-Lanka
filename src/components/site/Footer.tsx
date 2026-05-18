import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-card/30">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-gold shadow-glow">
                <span className="font-display text-xl font-bold text-primary-foreground">T</span>
              </div>
              <div>
                <div className="font-display text-2xl">Tour Lanka</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                  Ceylon · Est. 2014
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Authentic Sri Lankan luxury journeys, crafted by local experts. From misty hills to
              wild coastlines — your island, your story.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 transition hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">Destinations</h4>
            <ul className="space-y-3 text-sm text-foreground/80">
              {["Sigiriya", "Ella", "Kandy", "Nuwara Eliya", "Mirissa", "Galle"].map((d) => (
                <li key={d}>
                  <Link href="/destinations" className="transition hover:text-gold">
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">Experiences</h4>
            <ul className="space-y-3 text-sm text-foreground/80">
              {[
                "Wildlife Safaris",
                "Cultural Heritage",
                "Hill Country Trains",
                "Beach Luxury",
                "Honeymoon Escapes",
                "Private Chauffeur Tours",
              ].map((d) => (
                <li key={d}>
                  <Link href="/packages" className="transition hover:text-gold">
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-gold">Visit Us</h4>
            <ul className="space-y-4 text-sm text-foreground/80">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>27 Galle Face Terrace, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>hello@tourlanka.lk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Tour Lanka (Pvt) Ltd. Crafted on the island.</p>
          <p className="tracking-[0.2em] uppercase">Sri Lanka Time · GMT+5:30</p>
        </div>
      </div>
    </footer>
  );
}
