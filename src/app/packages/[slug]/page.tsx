import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageContent from "./PackageContent";
import { packages } from "@/data/tourlanka";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return {};
  return {
    title: `${pkg.title} — Tour Lanka`,
    description: pkg.description,
    openGraph: {
      title: `${pkg.title} — Tour Lanka`,
      description: pkg.description,
      images: [pkg.img],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) {
    notFound();
  }
  return <PackageContent pkg={pkg} />;
}
