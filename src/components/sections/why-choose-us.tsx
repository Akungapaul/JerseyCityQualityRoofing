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
    number: "12",
    label: "Cities",
    description: "Every Hudson County municipality",
  },
  {
    number: "4.8",
    label: "Stars",
    description: "Average customer rating",
  },
] as const;

export function WhyChooseUs() {
  return (
    <SectionWrapper tone="dominant">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Why Choose Jersey City Quality Roofing
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-secondary rounded-lg p-6 text-center"
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
