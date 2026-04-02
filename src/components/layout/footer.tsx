import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { Badge } from "@/components/ui/badge";
import { BUSINESS_INFO } from "@/data/business-info";
import { getServicesByCategory } from "@/data/services";
import { getAllMunicipalities } from "@/data/municipalities";
import { PHONE_NUMBER, PHONE_HREF, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Footer() {
  const residentialServices = getServicesByCategory("residential");
  const commercialServices = getServicesByCategory("commercial");
  const municipalities = getAllMunicipalities();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dominant border-t border-secondary/30">
      {/* Section 1: CTA Banner Strip */}
      <div className="bg-secondary py-8 lg:py-10">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h2 className="font-heading font-bold text-[1.75rem] text-text-primary">
                Ready to Protect Your Roof?
              </h2>
              <p className="mt-2 text-text-secondary text-lg">
                Call now for a free inspection or request your no-obligation
                quote.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-md text-accent font-body font-bold text-lg hover:underline underline-offset-4 transition-colors duration-[--duration-fast] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              >
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                {PHONE_NUMBER}
              </a>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "default" }),
                )}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Multi-column sitemap */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          {/* Column 1: Residential Services */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Residential Services
            </h3>
            <ul className="space-y-2">
              {residentialServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/residential/${service.slug}`}
                    className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
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
                    href={`/services/commercial/${service.slug}`}
                    className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {municipalities.map((muni) => (
                <li key={muni.slug}>
                  <Link
                    href={`/service-areas/${muni.slug}`}
                    className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                  >
                    {muni.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  Roofing Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/problems"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  Common Problems
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  Project Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
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
                <Phone
                  size={20}
                  strokeWidth={1.5}
                  className="shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a
                  href={PHONE_HREF}
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
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
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
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
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/service-areas"
                  className="text-text-secondary hover:text-accent text-lg transition-colors duration-[--duration-fast]"
                >
                  All Service Areas
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
          <Badge variant="status">Insured</Badge>
        </div>
      </div>

      {/* Section 4: Copyright bar */}
      <div className="border-t border-secondary/30 py-6">
        <p className="text-text-secondary text-lg text-center">
          &copy; {BUSINESS_INFO.foundedYear}&ndash;{currentYear} {SITE_NAME}.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
