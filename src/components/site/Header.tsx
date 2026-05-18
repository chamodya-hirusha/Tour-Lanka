"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Tours" },
  { href: "/vehicles", label: "Fleet" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-gold shadow-glow">
            <span className="font-display text-lg font-bold text-primary-foreground">T</span>
            <span className="absolute -inset-1 rounded-full border border-primary/40 opacity-0 transition group-hover:opacity-100" />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl tracking-wide text-foreground">Tour Lanka</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Ceylon · Est. 2014</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group relative text-sm uppercase tracking-[0.18em] transition hover:text-gold ${
                  isActive ? "text-gold" : "text-foreground/80"
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-gold transition-all duration-500 group-hover:w-full ${
                  isActive ? "w-full" : "w-0"
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop: toggle + CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full bg-gradient-gold px-6 py-2.5 text-sm font-medium tracking-wide text-primary-foreground shadow-glow transition hover:scale-105 inline-flex"
          >
            Plan My Journey
          </Link>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-strong mt-3 border-t border-border lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm uppercase tracking-[0.18em] hover:text-gold ${
                    isActive ? "text-gold" : "text-foreground/85"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-gold px-6 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Plan My Journey
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
