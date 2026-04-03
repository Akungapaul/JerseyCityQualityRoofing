import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="bg-dominant py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side: headline, subtext, CTAs */}
          <div className="lg:w-[60%] text-center lg:text-left">
            <h1 className="font-heading font-bold text-[2.5rem] lg:text-[3rem] leading-[1.1] text-text-primary">
              Jersey City&apos;s Most Trusted Roofing Experts
            </h1>
            <p className="text-text-secondary text-lg mt-4 max-w-xl lg:max-w-none">
              Professional residential and commercial roofing services in
              Jersey City and across Hudson County. Licensed, insured, and
              locally trusted since 2003.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
              <a
                href="#quote-form"
                className={cn(
                  buttonVariants({ variant: "primary", size: "default" }),
                )}
              >
                Get Your Free Quote
              </a>
              <a
                href={PHONE_HREF}
                className={cn(
                  buttonVariants({ variant: "phone", size: "default" }),
                  "gap-2",
                )}
              >
                <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                {`Call ${PHONE_NUMBER}`}
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
