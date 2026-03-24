import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Municipality } from "@/data/types";
import { cn } from "@/lib/utils";

interface CityCardProps {
  city: Municipality;
  featured?: boolean;
}

export function CityCard({ city, featured = false }: CityCardProps) {
  return (
    <Link
      href={`/service-areas/${city.slug}`}
      className={cn(
        "group block bg-secondary rounded-lg hover:border-accent border border-[#4a5040] transition-colors duration-[150ms]",
        featured ? "p-6" : "p-5",
      )}
    >
      <h3
        className={cn(
          "font-heading font-bold text-text-primary",
          featured ? "text-[1.5rem]" : "text-lg",
        )}
      >
        {city.name}
      </h3>
      <p className="text-text-secondary text-lg mt-1">
        {city.description.split(".")[0]}.
      </p>
      <p className="text-text-secondary text-lg mt-2">
        Population: {city.population.toLocaleString()}
      </p>
      <span className="inline-flex items-center gap-1 text-accent font-bold text-lg mt-3 group-hover:gap-2 transition-all duration-[150ms]">
        View Services <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
