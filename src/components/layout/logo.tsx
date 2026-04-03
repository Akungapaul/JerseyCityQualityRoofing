import Link from "next/link";
import { cn } from "@/lib/utils";

function RoofIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#2a2e22" />
      <path d="M16 6 L28 18 L25.5 18 L16 9.5 L6.5 18 L4 18 Z" fill="#c89640" />
      <rect x="9" y="17" width="14" height="9" rx="1" fill="#c89640" opacity="0.85" />
      <rect x="14" y="20" width="4" height="6" rx="0.5" fill="#2a2e22" />
      <rect x="10.5" y="19" width="3" height="3" rx="0.5" fill="#2a2e22" />
      <rect x="18.5" y="19" width="3" height="3" rx="0.5" fill="#2a2e22" />
      <rect x="21" y="9" width="3" height="8" fill="#c89640" opacity="0.7" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="Jersey City Quality Roofing — Home"
    >
      <RoofIcon className="size-8 lg:size-9" />
      <span className="font-heading font-bold text-lg lg:text-xl leading-tight text-text-primary">
        <span className="text-accent">Jersey City</span>{" "}
        Quality Roofing
      </span>
    </Link>
  );
}

export { RoofIcon };
