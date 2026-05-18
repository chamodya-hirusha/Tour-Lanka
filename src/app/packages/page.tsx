import type { Metadata } from "next";
import PackagesContent from "./PackagesContent";
import { IMG } from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages — Tour Lanka",
  description: "Luxury Sri Lanka tour packages — heritage, honeymoon, wildlife safaris, hill country and south coast journeys.",
  openGraph: {
    title: "Sri Lanka Tour Packages — Tour Lanka",
    description: "Hand-crafted private journeys through Sri Lanka.",
    images: [IMG.sigiriya],
  },
};

export default function PackagesPage() {
  return <PackagesContent />;
}
