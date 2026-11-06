import Link from "next/link";
import { ClipboardList, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_INFO } from "@/data/business-info";
import { getServicesByCategory } from "@/data/services";
import { PHONE_NUMBER, PHONE_HREF, SITE_NAME } from "@/lib/constants";
import { servicePillarPath } from "@/lib/paths";

export function Footer() {
  const residentialServices = getServicesByCategory("residential");
  const commercialServices = getServicesByCategory("commercial");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dominant border-t border-secondary/30">
      {/* CRO Phase 3 (2026-11-06, audit 3.5/finding 14): the footer's
          own CTA strip was removed. Every page already ends with the
          page-level CTABanner using the same heading, subtext, and
          offer, so the two strips ran back to back and diluted the
          close. The page banner remains; the footer goes straight to
          the sitemap columns. */}

      {/* Section 1: Multi-column sitemap */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Residential Services */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Residential Services
            </h3>
            <ul className="space-y-2">
              {residentialServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={servicePillarPath(service.slug)}
                    className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Commercial Services */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Commercial Services
            </h3>
            <ul className="space-y-2">
              {commercialServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={servicePillarPath(service.slug)}
                    className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas column removed 2026-11-06 (single-city
              restructure): the city hub pages it linked to are retired
              and the site serves Jersey City only. */}

          {/* Column 3: Resources */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  Roofing Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/problems"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  Common Problems
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  Project Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Contact Us
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2">
                <MapPin
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="text-text-secondary text-lg">
                  {BUSINESS_INFO.address.street}
                  <br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}{" "}
                  {BUSINESS_INFO.address.zip}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* CRO Phase 3: form icon, not a phone icon -- this row
                    routes to the quote form (no phone number exists). */}
                <ClipboardList
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a
                  href={PHONE_HREF}
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </address>

            {/* Company links */}
            <ul className="mt-6 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast] inline-block py-2 -my-2"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 3: Certification badges */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {BUSINESS_INFO.certifications.map((cert) => (
            <Badge key={cert.name} variant="certification">
              {cert.name}
            </Badge>
          ))}
          <Badge variant="status">
            Licensed: {BUSINESS_INFO.licenseNumber}
          </Badge>
          {/* CRO Phase 4 (audit 4.4): aligned with the data -- the
              insurance claim states what can be shown on request,
              matching BUSINESS_INFO.insuranceProvider. */}
          <Badge variant="status">
            Insured: {BUSINESS_INFO.insuranceProvider}
          </Badge>
        </div>
      </div>

      {/* Section 4: Copyright bar */}
      <div className="border-t border-secondary/30 py-6">
        <p className="text-text-secondary text-lg text-center">
          &copy; {BUSINESS_INFO.foundedYear}&ndash;{currentYear} {SITE_NAME}.
          All rights reserved.
        </p>
        <p className="text-text-secondary text-lg text-center mt-2">
          <Link
            href="/privacy-policy"
            className="hover:text-accent transition-colors duration-[--duration-fast]"
          >
            Privacy Policy
          </Link>
          <span aria-hidden="true" className="mx-3">
            &middot;
          </span>
          <Link
            href="/terms-of-service"
            className="hover:text-accent transition-colors duration-[--duration-fast]"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}
