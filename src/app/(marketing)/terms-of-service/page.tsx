import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { BUSINESS_INFO } from "@/data/business-info";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service | Jersey City Quality Roofing",
  description:
    "The terms that govern use of the Jersey City Quality Roofing website and how our estimates, contracts, and warranties work.",
  path: "/terms-of-service",
});

const LAST_UPDATED = "October 20, 2026";

function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <h2 className="font-heading font-bold text-[1.5rem] leading-snug text-text-primary">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 text-text-secondary text-lg leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export default function TermsOfServicePage() {
  return (
    <>
      <SectionWrapper tone="dominant" className="lg:py-24">
        <ScrollReveal>
          <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
            Terms of Service
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-3xl">
            Last updated: {LAST_UPDATED}. These terms govern your use of the{" "}
            {BUSINESS_INFO.name} website. By using this website, you agree to
            them.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper tone="dominant" className="pt-0 lg:pt-0">
        <div className="max-w-3xl">
          <LegalSection heading="Our services">
            <p>
              {BUSINESS_INFO.name} provides residential and commercial roofing
              services — including roof repair, roof replacement, roof
              inspection, emergency roof repair, flat roof systems, roof
              maintenance, and commercial roof repair and replacement — in the
              service areas listed on this website. The descriptions of our
              services on this website are general information, not a promise
              that a particular service is suitable for your property.
            </p>
          </LegalSection>

          <LegalSection heading="Estimates">
            <p>
              Estimates we provide, including any requested through this
              website, are preliminary assessments based on the information
              available and the conditions we can observe. Roofing conditions
              that are hidden — such as decking damage or concealed water
              intrusion — may only become visible once work begins. If hidden
              conditions change the scope of a project, we will explain the
              change and its cost before doing the additional work. An estimate
              is not a binding price until it is set out in a written agreement
              signed by you and by us.
            </p>
          </LegalSection>

          <LegalSection heading="Contracts and warranties">
            <p>
              Roofing work is performed under a written agreement that sets the
              scope of work, price, payment schedule, and warranty terms for
              your project. If anything on this website conflicts with your
              signed agreement, the signed agreement controls. Workmanship
              warranties are those stated in your written agreement.
              Manufacturer warranties on materials are provided by the
              manufacturer and subject to the manufacturer&rsquo;s terms.
              References on this website to our license and insurance reflect
              our status at the time of writing; verification is available on
              request, as noted on our site.
            </p>
          </LegalSection>

          <LegalSection heading="Payment">
            <p>
              Payment amounts, deposits, and schedules are set by your written
              agreement. Work may be rescheduled or paused if a scheduled
              payment is not made, as your agreement provides.
            </p>
          </LegalSection>

          <LegalSection heading="Scheduling and weather">
            <p>
              Roofing work depends on safe weather conditions. Start and
              completion dates are estimates and may shift because of weather,
              material availability, permit timing, or conditions discovered
              during the work. We will keep you informed of schedule changes.
            </p>
          </LegalSection>

          <LegalSection heading="Website content">
            <p>
              The content on this website — including guides, pricing
              information, and descriptions of roofing problems and solutions —
              is for general information only. Pricing guides describe typical
              ranges, not quotes for your property. We work to keep the
              website accurate and current, but we do not warrant that it is
              complete, error-free, or up to date, and we may change or remove
              content at any time.
            </p>
          </LegalSection>

          <LegalSection heading="Intellectual property">
            <p>
              The text, photos, logos, and design of this website belong to{" "}
              {BUSINESS_INFO.name} or are used with permission. You may view
              and print pages for your personal, non-commercial use. You may
              not copy, republish, or use our content, name, or logo for
              commercial purposes without our written permission.
            </p>
          </LegalSection>

          <LegalSection heading="Acceptable use">
            <p>
              You agree not to misuse this website: do not submit false or
              misleading information through our forms, attempt to gain
              unauthorized access to the website or its systems, interfere with
              the website&rsquo;s operation, or use automated means to scrape
              or harvest content or contact information.
            </p>
          </LegalSection>

          <LegalSection heading="Links to other websites">
            <p>
              This website may link to third-party sites for convenience. We
              do not control or endorse those sites and are not responsible for
              their content or practices.
            </p>
          </LegalSection>

          <LegalSection heading="Limitation of liability">
            <p>
              To the fullest extent permitted by New Jersey law,{" "}
              {BUSINESS_INFO.name} is not liable for indirect, incidental, or
              consequential damages arising from your use of this website. This
              section does not limit any liability arising from roofing work
              performed under a written agreement, which is governed by that
              agreement and applicable law.
            </p>
          </LegalSection>

          <LegalSection heading="Indemnification">
            <p>
              You agree to indemnify and hold harmless {BUSINESS_INFO.name}{" "}
              from claims, damages, and expenses (including reasonable
              attorneys&rsquo; fees) arising from your misuse of this website
              or violation of these terms.
            </p>
          </LegalSection>

          <LegalSection heading="Governing law">
            <p>
              These terms are governed by the laws of the State of New Jersey.
              Any dispute arising from these terms or your use of this website
              will be brought in the state or federal courts located in New
              Jersey.
            </p>
          </LegalSection>

          <LegalSection heading="Changes to these terms">
            <p>
              We may update these terms from time to time. The current version
              will always be posted on this page with its &ldquo;last
              updated&rdquo; date, and continued use of the website after a
              change means you accept the updated terms.
            </p>
          </LegalSection>

          <LegalSection heading="Contact us">
            <p>
              Questions about these terms:
            </p>
            <p>
              {BUSINESS_INFO.name}
              <br />
              {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}{" "}
              {BUSINESS_INFO.address.zip}
              <br />
              Email:{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="underline hover:text-accent"
              >
                {BUSINESS_INFO.email}
              </a>
              <br />
              Or use the contact form on our{" "}
              <a href="/contact" className="underline hover:text-accent">
                contact page
              </a>
              .
            </p>
          </LegalSection>
        </div>
      </SectionWrapper>
    </>
  );
}
