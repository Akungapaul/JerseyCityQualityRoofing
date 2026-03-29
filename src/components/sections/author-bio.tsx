import Link from "next/link";
import { User, ArrowRight } from "lucide-react";

interface AuthorBioProps {
  name: string;
  bio?: string;
}

const DEFAULT_BIO =
  "Expert roofing advice from the Jersey City Quality Roofing team. With decades of experience serving Hudson County homeowners and businesses, we share our knowledge to help you make informed roofing decisions.";

export function AuthorBio({ name, bio }: AuthorBioProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-full bg-secondary border border-[#4a5040] flex items-center justify-center shrink-0">
        <User size={28} className="text-text-secondary" aria-hidden="true" />
      </div>
      <div>
        <p className="text-lg font-heading font-bold text-text-primary">
          {name}
        </p>
        <p className="text-lg text-text-secondary mt-1 leading-relaxed">
          {bio ?? DEFAULT_BIO}
        </p>
        <Link
          href="/contact"
          className="text-accent font-bold text-lg mt-2 inline-flex items-center gap-1"
        >
          Contact Us
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
