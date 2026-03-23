export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'placeholder-article' }];
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <main>
      <h1>{title}</h1>
      <p>This page is under construction. Content coming soon.</p>
    </main>
  );
}
