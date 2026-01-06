import ServiceDetailClient from "./ServiceDetailClient";
import { validSlugs } from "./services-data";

// Generate static params for all service pages
export function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceDetailClient slug={slug} />;
}
