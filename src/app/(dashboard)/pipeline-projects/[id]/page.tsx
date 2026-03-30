// Server component that exports generateStaticParams
export function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

import ProjectDetailClient from './client';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetailClient projectId={resolvedParams.id} />;
}

