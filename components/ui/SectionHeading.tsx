import { cn } from "@/lib/utils";

// Server Component. Eyebrow (mono) + heading (display face via base styles)
// + optional lead paragraph, per SPEC §6. Carries the `.reveal` scroll-in
// treatment (§5.4) so every section heading gets it automatically.

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** h2 by default; h1 for page headers. */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("reveal", centered && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-eyebrow uppercase text-graphite">{eyebrow}</p>
      )}
      <Heading className={cn("text-scrub", eyebrow && "mt-3")}>{title}</Heading>
      {lead && (
        <p
          className={cn(
            "mt-4 max-w-[68ch] text-body-l text-graphite",
            centered && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
