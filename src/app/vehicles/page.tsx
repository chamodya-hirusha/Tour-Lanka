import type { Metadata } from "next";
import VehiclesContent from "./VehiclesContent";
import { IMG } from "@/data/tourlanka";

export const metadata: Metadata = {
  title: "Private Vehicles — Tour Lanka",
  description: "Private chauffeur vehicles for Sri Lanka tours — luxury SUVs, vans, minibuses and open-top safari jeeps with experienced driver-guides.",
  openGraph: {
    title: "Private Vehicles — Tour Lanka",
    description: "Hand-selected vehicles for every journey across Sri Lanka.",
    images: [IMG.vLandCruiser],
  },
};

export default function VehiclesPage() {
  return <VehiclesContent />;
}
