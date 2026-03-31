import { AlertTriangle, Phone } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface UrgencyBannerProps {
  variant: "emergency" | "storm-season";
  className?: string;
}

function isStormSeason(): boolean {
  const month = new Date().getMonth();
  return month >= 5 && month <= 10;
}

export function UrgencyBanner({ variant, className }: UrgencyBannerProps) {
  if (variant === "storm-season" && !isStormSeason()) return null;

  return (
    <div
      role="alert"
      className={cn(
        "bg-[#d4782f] text-dominant py-2 px-4 flex items-center justify-center gap-3 flex-wrap",
        className,
      )}
    >
      <AlertTriangle
        size={20}
        className="text-dominant shrink-0"
        aria-hidden="true"
      />
      <span className="text-lg font-bold">
        {variant === "emergency"
          ? "24/7 Emergency Service Available \u2014 Call Now:"
          : "Storm Season Alert: Schedule Your Free Roof Inspection"}
      </span>
      <a
        href={PHONE_HREF}
        className="text-dominant underline underline-offset-4 font-bold hover:opacity-80 transition-opacity min-h-[44px] inline-flex items-center"
      >
        {PHONE_NUMBER}
      </a>
    </div>
  );
}
