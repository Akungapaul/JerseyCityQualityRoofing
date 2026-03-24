import { ABOUT_CONTENT } from "@/data/about-content";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

export function AboutTeamSection() {
  const { team } = ABOUT_CONTENT;

  return (
    <SectionWrapper tone="dominant">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Our Team
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-secondary rounded-lg p-6">
              <div
                className="w-20 h-20 rounded-full bg-[#33382b] mx-auto mb-4"
                data-placeholder="team-photo"
                aria-hidden="true"
              />
              <h3 className="font-heading font-bold text-lg text-text-primary text-center">
                {member.name}
              </h3>
              <p className="text-accent text-lg text-center mt-1">
                {member.role}
              </p>
              <p className="text-text-secondary text-lg mt-3 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
