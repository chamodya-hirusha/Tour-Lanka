import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  italic,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-32">
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="ken-burns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20">
        <p className="fade-up text-xs uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
        <h1 className="fade-up fade-up-1 mt-5 font-display text-5xl leading-[1.02] text-foreground sm:text-6xl md:text-7xl">
          {title}
          {italic && (
            <span className="block italic text-gradient-gold">{italic}</span>
          )}
        </h1>
        <p className="fade-up fade-up-2 mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
