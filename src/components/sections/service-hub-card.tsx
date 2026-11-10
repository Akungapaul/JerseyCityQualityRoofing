import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceHubCard as ServiceHubCardData } from "@/data/service-hubs";

/**
 * Whole-card link used by the two service hubs and the homepage
 * service-family grids (Toms River treatment, 2026-11-10).
 *
 * The card title is the target page's exact H1 phrase and the blurb
 * is that page's first complete sentence, verbatim from its own
 * content data (see src/data/service-hubs.ts). The blurb is NOT
 * line-clamped: clamping would cut the mandated verbatim sentence.
 */
export function ServiceHubCard({ card }: { card: ServiceHubCardData }) {
  return (
    <Link
      href={card.href}
      className="group bg-dominant rounded-lg p-5 flex flex-col gap-2 hover:bg-[#4a5040] transition-colors duration-[150ms]"
    >
      <h3 className="font-heading font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-[150ms]">
        {card.title}
      </h3>
      <p className="text-text-secondary text-lg">{card.blurb}</p>
      <ArrowRight
        size={16}
        className="text-accent mt-auto pt-2 group-hover:translate-x-1 transition-transform duration-[150ms]"
        aria-hidden="true"
      />
    </Link>
  );
}
