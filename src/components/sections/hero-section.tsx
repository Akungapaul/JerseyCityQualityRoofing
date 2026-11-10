import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="bg-dominant py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side: headline, subtext, CTAs */}
          <div className="lg:w-[60%] text-center lg:text-left">
            {/* Toms River treatment (2026-11-10): the coded H1 carries
                the full phrase; the second half sits in an sr-only span
                so visitors see only "Roofing Contractor Jersey City,
                NJ". Title tag unchanged; H1 weight unchanged. */}
            <h1 className="font-heading font-bold text-4xl sm:text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
              Roofing Contractor Jersey City, NJ
              <span className="sr-only">
                : Residential and Commercial Roof Repair and Roof Replacement
              </span>
            </h1>
            {/* Hero intro is now four labeled bullets (Toms River
                treatment, 2026-11-10). The CTAs below are unchanged. */}
            <ul className="text-text-secondary text-lg mt-4 max-w-xl lg:max-w-none space-y-2">
              <li>
                <strong className="text-text-primary">Who we are:</strong>{" "}
                Jersey City Quality Roofing, a local roofing company serving
                homes and businesses.
              </li>
              <li>
                <strong className="text-text-primary">What we do:</strong>{" "}
                Residential and commercial roof repair and roof replacement.
              </li>
              <li>
                <strong className="text-text-primary">Where we work:</strong>{" "}
                Jersey City and communities across Hudson County, NJ.
              </li>
              <li>
                <strong className="text-text-primary">Why choose us:</strong>{" "}
                inspection + written scope, workmanship coverage and warranty
                terms explained before work begins.
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
              <a
                href="#quote-form"
                className={cn(
                  buttonVariants({ variant: "primary", size: "default" }),
                )}
              >
                Get Your Free Quote
              </a>
              {/* CRO Phase 3 (2026-11-06, audit 3.2): this button used to
                  read "Call Request a Free Estimate" and exit to
                  /contact even though both quote forms are on this page.
                  It now scrolls to the detailed form on the homepage. */}
              <a
                href="#full-quote-form"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "default" }),
                  "gap-2",
                )}
              >
                Request a Detailed Quote
              </a>
            </div>
          </div>

          {/* Right side: hero image placeholder */}
          <div className="lg:w-[40%] flex items-center justify-center">
            <div
              data-placeholder="hero-image"
              className="w-full max-w-md aspect-[4/3] rounded-lg bg-gradient-to-br from-secondary to-[#33382b] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 150"
                className="w-48 h-36 text-[#4a5040]"
                aria-hidden="true"
              >
                {/* Simple roofing illustration placeholder */}
                <polygon
                  points="100,20 20,80 180,80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <rect
                  x="20"
                  y="80"
                  width="160"
                  height="50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <rect
                  x="80"
                  y="95"
                  width="40"
                  height="35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="100"
                  y1="95"
                  x2="100"
                  y2="130"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {/* Chimney */}
                <rect
                  x="140"
                  y="35"
                  width="20"
                  height="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
