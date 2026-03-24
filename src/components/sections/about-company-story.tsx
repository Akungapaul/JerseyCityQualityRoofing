import { ABOUT_CONTENT } from "@/data/about-content";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

export function AboutCompanyStory() {
  const { heading, paragraphs } = ABOUT_CONTENT.companyStory;

  return (
    <SectionWrapper tone="secondary">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-6">
          {heading}
        </h2>
        <div className="max-w-3xl">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-text-secondary text-lg mt-4 first:mt-0 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
