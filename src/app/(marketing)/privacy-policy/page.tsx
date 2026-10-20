import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ScrollReveal } from "@/components/sections/scroll-reveal";
import { BUSINESS_INFO } from "@/data/business-info";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy | Jersey City Quality Roofing",
  description:
    "How Jersey City Quality Roofing collects, uses, and protects the information you share through our website and quote forms.",
  path: "/privacy-policy",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <SectionWrapper tone="dominant" className="lg:py-24">
        <ScrollReveal>
          <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-lg mt-4 max-w-3xl">
            Last updated: {LAST_UPDATED}. This policy explains what information{" "}
            {BUSINESS_INFO.name} collects through this website, how we use it,
            and the choices you have.
          </p>
        </ScrollReveal>
      </SectionWrapper>

      <SectionWrapper tone="dominant" className="pt-0 lg:pt-0">
        <div className="max-w-3xl">
          <LegalSection heading="Information we collect">
            <p>
              <strong>Information you give us.</strong> When you request an
              estimate or contact us through this website, we collect the
              details you submit: your name, email address, phone number,
              property address, the type of service you are asking about, and
              your description of the project. If you contact us by email, we
              collect your email address and the contents of your message.
            </p>
            <p>
              <strong>Information collected automatically.</strong> Like most
              websites, we use Google Analytics to understand how visitors use
              our site. Google Analytics sets cookies and collects usage data
              such as the pages you visit, how long you stay, your device and
              browser type, and general location derived from your IP address.
            </p>
            <p>
              <strong>Spam protection.</strong> Our forms are protected by
              Cloudflare Turnstile, which processes limited technical signals
              to tell real visitors apart from bots. Turnstile does not use
              this data to track you across other websites.
            </p>
          </LegalSection>

          <LegalSection heading="How we use your information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your estimate requests and questions;</li>
              <li>Schedule, perform, and follow up on roofing services;</li>
              <li>
                Send service-related communications, such as appointment
                confirmations and project updates;
              </li>
              <li>Understand how our website is used so we can improve it;</li>
              <li>Protect our website against spam, fraud, and abuse; and</li>
              <li>Meet our legal, tax, and insurance record-keeping duties.</li>
            </ul>
            <p>
              We do not sell your personal information, and we do not share it
              with third parties for their own marketing.
            </p>
          </LegalSection>

          <LegalSection heading="When we share information">
            <p>
              We share personal information only when it is necessary to run
              our business, for example with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service providers</strong> that operate parts of our
                website and communications — such as our analytics provider
                (Google), our spam-protection provider (Cloudflare), and our
                website hosting and email providers. These providers may use
                your information only to provide their services to us.
              </li>
              <li>
                <strong>Authorities and other parties</strong> when required by
                law, court order, or a lawful request, or when needed to
                protect our rights, property, or safety.
              </li>
              <li>
                <strong>A successor business</strong> if our company is sold or
                merged, in which case your information would remain subject to
                this policy or a policy with equivalent protections.
              </li>
            </ul>
          </LegalSection>

          <LegalSection heading="Cookies">
            <p>
              Cookies are small files stored on your device. Our site uses
              cookies set by Google Analytics to measure website traffic and
              performance. You can block or delete cookies in your browser
              settings at any time; the website will still work, though some
              measurements will not be recorded. You can also install the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="underline hover:text-accent"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection heading="How long we keep information">
            <p>
              We keep estimate requests and customer records for as long as
              needed to provide our services and to meet legal, tax, and
              insurance record-keeping requirements. Analytics data is retained
              according to our Google Analytics settings. When information is
              no longer needed, we delete it or make it anonymous.
            </p>
          </LegalSection>

          <LegalSection heading="Security">
            <p>
              We take reasonable administrative and technical measures to
              protect the information you share with us. No method of
              transmission or storage is completely secure, however, so we
              cannot guarantee absolute security.
            </p>
          </LegalSection>

          <LegalSection heading="Your choices and rights">
            <p>
              You may ask us to show you the personal information we hold about
              you, to correct it, or to delete it, by emailing us at{" "}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="underline hover:text-accent"
              >
                {BUSINESS_INFO.email}
              </a>
              . We will respond within a reasonable time and, where the law
              requires it, within the period it sets. We may need to verify
              your identity before acting on a request, and we may keep certain
              records we are legally required to retain.
            </p>
          </LegalSection>

          <LegalSection heading="Children's privacy">
            <p>
              This website is intended for property owners and is not directed
              to children under 13. We do not knowingly collect personal
              information from children under 13; if you believe a child has
              provided us information, contact us and we will delete it.
            </p>
          </LegalSection>

          <LegalSection heading="Links to other websites">
            <p>
              Our website may link to other sites we do not control. This
              policy does not apply to those sites, and we encourage you to
              read their privacy policies.
            </p>
          </LegalSection>

          <LegalSection heading="Changes to this policy">
            <p>
              We may update this policy from time to time. The current version
              will always be posted on this page with its &ldquo;last
              updated&rdquo; date, and significant changes will apply going
              forward from the date they are posted.
            </p>
          </LegalSection>

          <LegalSection heading="Contact us">
            <p>
              Questions about this policy or about how we handle your
              information:
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
