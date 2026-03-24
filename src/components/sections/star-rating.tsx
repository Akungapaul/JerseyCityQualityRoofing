import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
}

export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars`}
      className={cn("flex items-center gap-0.5", className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          aria-hidden="true"
          className={
            i < rating
              ? "text-accent fill-current"
              : "text-[#4a5040]"
          }
        />
      ))}
    </div>
  );
}
