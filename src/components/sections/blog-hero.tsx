import { ReadingTimeBadge } from "@/components/sections/reading-time-badge";

interface BlogHeroProps {
  headline: string;
  subtitle: string;
  siloBadgeLabel: string;
  author: string;
  publishDate: string;
  readingTimeMinutes: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function BlogHero({
  headline,
  subtitle,
  siloBadgeLabel,
  author,
  publishDate,
  readingTimeMinutes,
}: BlogHeroProps) {
  const formattedDate = publishDate
    ? dateFormatter.format(new Date(publishDate))
    : "";

  return (
    <section className="bg-dominant">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <span className="inline-flex items-center bg-accent text-dominant rounded-full px-3 py-1 text-[0.875rem] font-bold uppercase tracking-wider">
          {siloBadgeLabel}
        </span>
        <h1 className="text-[2.5rem] lg:text-[3rem] font-heading font-bold text-text-primary leading-[1.1] mt-4">
          {headline}
        </h1>
        <p className="text-lg text-text-secondary mt-4 leading-relaxed max-w-3xl">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-6 text-[0.875rem] text-text-secondary">
          <span>By {author}</span>
          {formattedDate && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{formattedDate}</span>
            </>
          )}
          <span aria-hidden="true">&middot;</span>
          <ReadingTimeBadge minutes={readingTimeMinutes} />
        </div>
      </div>
    </section>
  );
}
