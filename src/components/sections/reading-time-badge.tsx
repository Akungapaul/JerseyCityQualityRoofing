import { Clock } from "lucide-react";

interface ReadingTimeBadgeProps {
  minutes: number;
}

export function ReadingTimeBadge({ minutes }: ReadingTimeBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1">
      <Clock size={16} className="text-accent" aria-hidden="true" />
      <span className="text-[0.875rem] text-text-secondary">
        {minutes} min read
      </span>
    </span>
  );
}
