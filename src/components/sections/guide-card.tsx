import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface GuideCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function GuideCard({
  href,
  title,
  description,
  icon: Icon,
}: GuideCardProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group block bg-secondary rounded-lg p-6 border border-[#4a5040] hover:border-accent transition-colors duration-[150ms]"
    >
      <Icon size={24} className="text-accent mb-2" aria-hidden="true" />
      <h3 className="text-lg font-heading font-bold text-text-primary mt-2">
        {title}
      </h3>
      <p className="text-lg text-text-secondary mt-2 line-clamp-2">
        {description}
      </p>
      <span className="inline-flex items-center gap-1 text-accent font-bold text-lg mt-4 group-hover:gap-2 transition-all duration-[150ms]">
        View Guide
        <ArrowRight size={16} aria-hidden="true" />
      </span>
    </Link>
  );
}
