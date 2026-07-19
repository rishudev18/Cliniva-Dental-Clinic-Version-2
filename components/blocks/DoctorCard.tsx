import Image from "next/image";
import type { Doctor } from "@/content/doctors";
import { Chip } from "@/components/ui/Chip";

// Server Component. Photo (4:5), name in Newsreader, qualifications in mono,
// speciality chips, experience (§6). `compact` for the home page row (§7.1),
// `full` adds the expanded bio for /about (§7.4).
// No portraits supplied yet (§13) — labelled placeholder at the correct
// aspect ratio, never a stock photo.

type DoctorCardProps = {
  doctor: Doctor;
  variant?: "compact" | "full";
};

export function DoctorCard({ doctor, variant = "compact" }: DoctorCardProps) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("");
  const full = variant === "full";

  return (
    <article className="flex h-full flex-col rounded-card border bg-enamel p-5 shadow-card">
      {/* Portrait */}
      <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-2 overflow-hidden rounded-sm bg-rinse">
        {doctor.photo ? (
          <Image
            src={doctor.photo}
            alt={`Portrait of ${doctor.name}`}
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover"
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

      <h3 className="mt-4 font-display text-xl font-medium text-scrub">{doctor.name}</h3>
      <p className="mt-1 font-mono text-sm text-graphite">{doctor.qualifications}</p>
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
    </article>
  );
}
