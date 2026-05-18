"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { PageHero, PageShell } from "@/components/site/PageShell";
import { IMG } from "@/data/tourlanka";

export default function ContactContent() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <PageHero
        eyebrow="Begin Your Journey"
        title="Tell us your dream."
        italic="We’ll plan the rest."
        subtitle="Share a few details — your dates, travel style, who you’re travelling with — and a local Tour Lanka designer will craft a private itinerary within 24 hours."
        image={IMG.galle}
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h2 className="font-display text-3xl">Request your itinerary</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              All journeys are fully bespoke. There are no fixed dates.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Field label="Full name" placeholder="Your name" />
              <Field label="Email" type="email" placeholder="you@email.com" />
              <Field label="Travel dates" placeholder="Approx. month / year" />
              <Field label="Travellers" placeholder="e.g. 2 adults" />
              <div className="md:col-span-2">
                <Field
                  label="Tell us about your dream trip"
                  textarea
                  placeholder="Wildlife? Honeymoon? Hill country trains? Beach time? Tell us anything."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-gold px-8 py-4 text-sm uppercase tracking-[0.18em] text-primary-foreground shadow-glow transition hover:scale-105 disabled:opacity-70"
              disabled={sent}
            >
              {sent ? "Thank you — we’ll be in touch" : (
                <>
                  Send Inquiry <Send size={14} />
                </>
              )}
            </button>
          </form>

          <aside className="space-y-6">
            <InfoCard
              icon={MapPin}
              title="Visit our office"
              lines={["27 Galle Face Terrace", "Colombo 03, Sri Lanka"]}
            />
            <InfoCard
              icon={Phone}
              title="Call us"
              lines={["+94 77 123 4567", "+94 11 234 5678"]}
            />
            <InfoCard
              icon={MessageCircle}
              title="WhatsApp"
              lines={["+94 77 123 4567", "Reply within minutes"]}
            />
            <InfoCard
              icon={Mail}
              title="Email"
              lines={["hello@tourlanka.lk", "concierge@tourlanka.lk"]}
            />
            <InfoCard
              icon={Clock}
              title="Office hours"
              lines={["Mon – Sat · 8am – 8pm", "Sri Lanka Time · GMT+5:30"]}
            />
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20";
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">{label}</span>
      {textarea ? (
        <textarea rows={5} placeholder={placeholder} className={cls} />
      ) : (
        <input type={type} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="glass flex gap-5 rounded-2xl p-6">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-gold text-primary-foreground shadow-glow">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-gold">{title}</div>
        {lines.map((l) => (
          <div key={l} className="mt-1 text-sm text-foreground/85">{l}</div>
        ))}
      </div>
    </div>
  );
}
