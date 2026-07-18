import { cn } from "@/lib/utils";

// Server Component. Small pill label — rinse fill behind scrub text (§5.1).

type ChipProps = {
  className?: string;
  children: React.ReactNode;
};

export function Chip({ className, children }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill bg-rinse px-3 py-1 text-sm text-scrub",
        className
      )}
    >
      {children}
    </span>
  );
}
