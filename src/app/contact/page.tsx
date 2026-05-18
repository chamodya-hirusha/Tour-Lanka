import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { IMG } from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "Contact Tour Lanka — Plan Your Sri Lanka Journey",
  description: "Plan your private luxury Sri Lanka journey. Tour Lanka local travel designers reply within 24 hours.",
  openGraph: {
    title: "Plan Your Sri Lanka Journey — Tour Lanka",
    description: "Tell us your dates. A local designer replies in 24 hours.",
    images: [IMG.galle],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
