"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarRating } from "./star-rating";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";
import { TESTIMONIALS } from "@/data/testimonials";
import type { Testimonial } from "@/data/types";
import { MUNICIPALITIES } from "@/data/municipalities";

interface TestimonialCarouselProps {
  testimonials?: readonly Testimonial[];
}

function getCityName(citySlug: string): string {
  const municipality = (MUNICIPALITIES as Record<string, { name: string }>)[citySlug];
  return municipality?.name ?? citySlug;
}

export function TestimonialCarousel({
  testimonials = TESTIMONIALS,
}: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <SectionWrapper tone="secondary">
      <ScrollReveal>
        <h2 className="font-heading font-bold text-[1.75rem] text-text-primary mb-8">
          What Our Customers Say
        </h2>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                  role="group"
                  aria-roledescription="slide"
                >
                  <div className="bg-dominant rounded-lg p-6 h-full flex flex-col">
                    <StarRating rating={testimonial.rating} className="mb-3" />
                    <p className="text-text-primary text-lg leading-relaxed flex-1">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="mt-4">
                      <p className="font-bold text-text-primary text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-text-secondary text-lg">
                        {getCityName(testimonial.citySlug)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="min-h-[44px] min-w-[44px] bg-dominant rounded-full flex items-center justify-center hover:bg-[#4a5040] transition-colors duration-[150ms] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="min-h-[44px] min-w-[44px] bg-dominant rounded-full flex items-center justify-center hover:bg-[#4a5040] transition-colors duration-[150ms] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
