import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SiloPillarLinkProps {
  label: string;
  linkText: string;
  href: string;
}

export function SiloPillarLink({ label, linkText, href }: SiloPillarLinkProps) {
  return (
    <div className="bg-secondary rounded-lg p-6 border-l-4 border-accent">
      <p className="text-[0.875rem] font-bold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <Link
        href={href}
        className="text-lg font-heading font-bold text-accent mt-2 inline-flex items-center gap-2 hover:gap-3 transition-all duration-[150ms]"
      >
        {linkText}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}
