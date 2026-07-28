import { cn } from "@/lib/utils";

// Server Component. Small label — rinse fill behind scrub text (§5.1).
// §5.3 revision (2026-07-28): rounded-pill → rounded-soft, per the client's
// explicit "chips/tags/form inputs → rounded-soft" mapping. Real shape
// change, not a rename — chips go from stadium-shaped to softly rounded
// rectangles. Flagged for visual sign-off wherever Chip renders (DoctorCard
// speciality tags).

type ChipProps = {
  className?: string;
  children: React.ReactNode;
};

export function Chip({ className, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-soft bg-rinse px-3 py-1 text-sm text-scrub",
        className
      )}
    >
      {children}
    </span>
  );
}
