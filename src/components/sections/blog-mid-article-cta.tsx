import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

interface BlogMidArticleCtaProps {
  /** Display name of the article's silo service, when the article has one. */
  serviceName?: string;
  /** Path to the Jersey City page for that service, when known. */
  serviceHref?: string;
}

/**
 * Mid-article CTA for blog posts (CRO Phase 5, 2026-11-06; audit
 * finding 11). Blog articles used to ask for the lead only after the
 * full article, related modules, FAQs, related articles, and the
 * author bio. This block is inserted after the second article section
 * so a ready reader can act without scrolling to the end. The primary
 * action scrolls to the article's own quote form (#full-quote-form);
 * the offer copy (free inspection, written itemized proposal) is the
 * one the site already publishes in its homepage FAQ.
 */
export function BlogMidArticleCta({
  serviceName,
  serviceHref,
}: BlogMidArticleCtaProps) {
  return (
    <div className="bg-secondary rounded-lg p-6 sm:p-8 border border-accent">
      <h2 className="text-[1.75rem] font-heading font-bold text-text-primary">
        Dealing With This on Your Own Roof?
      </h2>
      <p className="text-lg text-text-secondary mt-3 leading-relaxed">
        Every estimate is free and includes a full roof inspection and a
        written, itemized proposal. Tell us what you are seeing and we
        will call you back within 24 hours.
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        <a
          href="#full-quote-form"
          className={cn(buttonVariants({ variant: "primary", size: "default" }))}
        >
          Get My Free Quote
        </a>
        {serviceName && serviceHref ? (
          <Link
            href={serviceHref}
            className={cn(
              buttonVariants({ variant: "secondary", size: "default" }),
            )}
          >
            Our {serviceName} Service in Jersey City
          </Link>
        ) : null}
      </div>
    </div>
  );
}
