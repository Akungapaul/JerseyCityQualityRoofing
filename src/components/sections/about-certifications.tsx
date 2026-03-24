import { Award, Shield } from "lucide-react";
import { BUSINESS_INFO } from "@/data/business-info";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

export function AboutCertifications() {
  const {
    certifications,
    insuranceProvider,
    insurancePolicyNumber,
    licenseNumber,
  } = BUSINESS_INFO;

  return (
    <SectionWrapper tone="secondary">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          Certifications & Credentials
        </h2>

        {/* Certification cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="bg-dominant rounded-lg p-5 flex flex-col items-center text-center"
            >
              <Award
                size={32}
                className="text-accent mb-3"
                aria-hidden="true"
              />
              <p className="font-heading font-bold text-lg text-accent">
                {cert.name}
              </p>
              <p className="text-text-secondary text-lg mt-1">
                Issued by {cert.issuer}
              </p>
              <p className="text-text-secondary text-lg">Since {cert.year}</p>
            </div>
          ))}
        </div>

        {/* Insurance & License */}
        <div className="bg-dominant rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Shield
              size={24}
              className="text-accent shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <p className="font-heading font-bold text-lg text-text-primary">
                Fully Licensed & Insured
              </p>
              <p className="text-text-secondary text-lg mt-2">
                <span className="font-bold text-text-primary">
                  NJ HIC License:
                </span>{" "}
                {licenseNumber}
              </p>
              <p className="text-text-secondary text-lg mt-1">
                <span className="font-bold text-text-primary">
                  Insurance Provider:
                </span>{" "}
                {insuranceProvider}
              </p>
              <p className="text-text-secondary text-lg mt-1">
                <span className="font-bold text-text-primary">
                  Policy Number:
                </span>{" "}
                {insurancePolicyNumber}
              </p>
              <p className="text-text-secondary text-lg mt-3">
                Full liability and workers compensation coverage on every
                project. Certificates of insurance available upon request.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
