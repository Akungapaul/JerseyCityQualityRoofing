import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
import type { InternalLink } from "@/lib/internal-links";
import { BlogCard } from "@/components/sections/blog-card";

interface SiloContentLinksProps {
  articles: InternalLink[];
  costGuide: InternalLink | null;
  serviceName: string;
}

export function SiloContentLinks({
  articles,
  costGuide,
  serviceName,
}: SiloContentLinksProps) {
  if (articles.length === 0 && costGuide === null) {
    return null;
  }

  return (
    <div>
      <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-4">
        {serviceName} Resources & Guides
      </h2>
      <p className="text-lg text-text-secondary mb-8 leading-relaxed">
        Explore our in-depth articles and cost information for{" "}
        {serviceName.toLowerCase()} to help you make informed decisions about
        your roofing project.
      </p>

      {/* Cost guide featured card */}
      {costGuide && (
        <Link
          href={costGuide.path}
          prefetch={false}
          className="group block bg-secondary rounded-lg p-6 border border-accent mb-8"
        >
          <div className="flex items-start gap-4">
            <DollarSign
              size={24}
              className="text-accent shrink-0 mt-1"
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {costGuide.title}
              </h3>
              {costGuide.description && (
                <p className="text-lg text-text-secondary mt-1 line-clamp-2">
                  {costGuide.description}
                </p>
              )}
              <span className="inline-flex items-center gap-1 text-accent font-bold text-lg mt-3 group-hover:gap-2 transition-all duration-[150ms]">
                View Cost Guide{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Blog article cards grid */}
      {articles.length > 0 && (
        <>
          <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => {
              const slug =
                article.path.split("/").filter(Boolean).pop() ?? "";
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
        </>
      )}
    </div>
  );
}
