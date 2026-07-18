import { Star } from "lucide-react";

// Server Component. Five-star row; filled stars in scrub ink.

type StarRatingProps = { rating: number };

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={
            i < rating
              ? "h-4 w-4 fill-scrub text-scrub"
              : "h-4 w-4 text-graphite/40"
          }
        />
      ))}
    </div>
  );
}
