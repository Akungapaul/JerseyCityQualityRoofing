import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  siloBadgeLabel: string;
  publishDate: string;
  readingTimeMinutes: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function BlogCard({
  slug,
  title,
  description,
  siloBadgeLabel,
  publishDate,
  readingTimeMinutes,
}: BlogCardProps) {
  const formattedDate = publishDate
    ? dateFormatter.format(new Date(publishDate))
    : "";

  return (
    <Link
      href={`/blog/${slug}`}
      prefetch={false}
      className="group block bg-secondary rounded-lg p-6 border border-[#4a5040] hover:border-accent transition-colors duration-[150ms]"
    >
      <span className="inline-flex items-center bg-accent/10 text-accent rounded-full px-2 py-0.5 text-[0.875rem] font-bold uppercase tracking-wider">
        {siloBadgeLabel}
      </span>
      <h3 className="text-lg font-heading font-bold text-text-primary mt-3">
        {title}
      </h3>
      <p className="text-lg text-text-secondary mt-2 line-clamp-3">
        {description}
      </p>
      <p className="text-[0.875rem] text-text-secondary mt-3">
        {formattedDate}
        {formattedDate && readingTimeMinutes > 0 ? " \u00B7 " : ""}
        {readingTimeMinutes > 0 ? `${readingTimeMinutes} min read` : ""}
      </p>
      <span className="inline-flex items-center gap-1 text-accent font-bold text-lg mt-4 group-hover:gap-2 transition-all duration-[150ms]">
        Read Article
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
