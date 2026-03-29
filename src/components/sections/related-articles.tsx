import type { InternalLink } from "@/lib/internal-links";
import { BlogCard } from "@/components/sections/blog-card";

interface RelatedArticlesProps {
  articles: InternalLink[];
  heading?: string;
}

export function RelatedArticles({
  articles,
  heading = "Related Articles",
}: RelatedArticlesProps) {
  const displayed = articles.slice(0, 3);

  if (displayed.length === 0) return null;

  return (
    <div>
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary mb-6">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((article) => {
          // Extract slug from path (last segment)
          const segments = article.path.split("/").filter(Boolean);
          const slug = segments[segments.length - 1] ?? "";

          return (
            <BlogCard
              key={article.path}
              slug={slug}
              title={article.title}
              description={article.description ?? ""}
              siloBadgeLabel="ROOFING"
              publishDate=""
              readingTimeMinutes={10}
            />
          );
        })}
      </div>
    </div>
  );
}
