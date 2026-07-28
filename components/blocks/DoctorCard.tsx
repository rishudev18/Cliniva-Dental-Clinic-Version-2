import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/content/doctors";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

// Server Component. Photo (4:5), name in the display face, qualifications in mono,
// speciality chips, experience (§6). `compact` for the home page row (§7.1),
// `full` adds the expanded bio for /about (§7.4).
// No portraits supplied yet (§13) — labelled placeholder at the correct
// aspect ratio, never a stock photo.
//
// Restyle (2026-07-28): `object-top` unifies the crop across mismatched
// source ratios; the name/qualifications block reserves height for the
// longest observed content (2 lines / 4 lines, measured at 1024px across
// all four doctors) rather than truncating — so every card's chip row
// starts at the same Y position without cutting anyone's credentials off.
// `href` makes the card a link (home → `/about#<slug>`) with a hover lift
// matching ServiceCard's pattern; without it (`/about`, already at the
// destination) it renders as a plain, non-interactive `<article>`, same as
// before. `full` cards without an `href` carry the `id` anchor themselves.

type DoctorCardProps = {
  doctor: Doctor;
  variant?: "compact" | "full";
  href?: string;
};

const cardClass = "flex h-full flex-col rounded-well border bg-enamel p-5 shadow-soft scroll-mt-24";
const linkHoverClass =
  "transition duration-200 ease-clinic hover:-translate-y-0.5 hover:border-graphite/40 hover:shadow-lift";

export function DoctorCard({ doctor, variant = "compact", href }: DoctorCardProps) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("");
  const full = variant === "full";
  const anchorId = full && !href ? doctor.slug : undefined;

  const body = (
    <>
      {/* Portrait */}
      <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-2 overflow-hidden rounded-well border bg-rinse">
        {doctor.photo ? (
          <Image
            src={doctor.photo}
            alt={`Portrait of ${doctor.name}`}
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <>
            <span className="font-display text-5xl font-medium text-scrub">{initials}</span>
            <span className="font-mono text-eyebrow uppercase text-scrub">
              Portrait to come
            </span>
          </>
        )}
      </div>

      {/* Reserved heights (not line-clamped — nothing here is ever
          truncated) keep the chip row below aligned across all four cards
          regardless of how many lines a name or qualification list runs to. */}
      <h3 className="mt-4 min-h-[3.5rem] font-display text-xl font-medium text-scrub">
        {doctor.name}
      </h3>
      <p className="mt-1 min-h-[5rem] font-mono text-sm text-graphite">{doctor.qualifications}</p>
      <p className="mt-0.5 font-mono text-eyebrow uppercase text-graphite">
        {doctor.registration}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {(full ? doctor.specialities : doctor.specialities.slice(0, 1)).map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <p className="mt-3 text-sm text-graphite">
        {doctor.role} ·{" "}
        <span className="font-mono tabular-nums">{doctor.experienceYears} years</span>{" "}
        experience
      </p>

      {full && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {doctor.bio.split("\n\n").map((para, i) => (
            <p key={i} className="text-sm text-graphite">
              {para}
            </p>
          ))}
          <p className="text-sm text-graphite">
            Speaks {doctor.languages.join(", ")}
          </p>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardClass, linkHoverClass)}>
        {body}
      </Link>
    );
  }

  return (
    <article id={anchorId} className={cardClass}>
      {body}
    </article>
  );
}
