import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

const STATS = [
  {
    number: "20+",
    label: "Years",
    description: "Serving Hudson County since 2003",
  },
  {
    number: "2,500+",
    label: "Projects",
    description: "Roofing projects completed",
  },
  {
    // Single-city alignment (2026-11-06): this stat said "12 Cities /
    // Every Hudson County municipality" from the multi-town era. The
    // population figure is the one the service pages already use
    // ("Serving 292,449 residents in Jersey City").
    number: "292,449",
    label: "Residents",
    description: "Jersey City's population",
  },
  // CRO Phase 4 (2026-11-06, audit 4.2/4.4): the "4.8 Stars / Average
  // customer rating" stat was removed deliberately. The site has no
  // verified external review source backing the number, so the claim
  // stays down until Paul supplies one (a Google Business Profile link
  // or a dated review export). Do not re-add a rating display without
  // that source.
] as const;

export function WhyChooseUs() {
  return (
    <SectionWrapper tone="dominant">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Why Choose Jersey City Quality Roofing
        </h2>
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-secondary rounded-lg p-4 sm:p-6 text-center"
            >
              <p className="font-heading font-bold text-[2rem] text-accent">
                {stat.number}
              </p>
              <p className="font-heading font-bold text-lg text-text-primary mt-1">
                {stat.label}
              </p>
              <p className="text-text-secondary text-lg mt-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
