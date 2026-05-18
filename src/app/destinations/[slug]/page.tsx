import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationContent from "./DestinationContent";
import { destinations } from "@/data/tourlanka";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — Tour Lanka Destinations`,
    description: dest.description,
    openGraph: {
      title: `${dest.name} — Tour Lanka`,
      description: dest.description,
      images: [dest.img],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) {
    notFound();
  }
  return <DestinationContent dest={dest} />;
}
