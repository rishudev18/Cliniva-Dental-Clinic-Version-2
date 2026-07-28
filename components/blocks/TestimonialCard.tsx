import type { Testimonial } from "@/content/testimonials";
import { StarRating } from "@/components/ui/StarRating";

// Server Component. Initials avatar, name, treatment tag, 5-star row,
// quote, source badge (§6). Quote at text-body-l (was text-sm) so it
// outweighs its own metadata — the testimonial is the content, the name/
// treatment/source are labels. Hover lift reuses ServiceCard's exact
// pattern; unlike DoctorCard this isn't gating on a real link, since
// there's no per-review destination in the data model — the lift reads as
// ambient card polish rather than a click affordance. This component is
// home-page-only (no other route renders it), so its hover treatment can
// go further than the shared lift/shadow pattern without affecting scope
// discipline elsewhere: the avatar fill shifts from rinse to a clinic tint
// on hover, a second, card-specific hover detail beyond what ServiceCard/
// DoctorCard get.

type TestimonialCardProps = { testimonial: Testimonial };

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-card border bg-enamel p-6 shadow-soft transition duration-200 ease-clinic hover:-translate-y-0.5 hover:border-graphite/40 hover:shadow-lift">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-pill bg-rinse font-medium text-scrub transition-colors duration-200 ease-clinic group-hover:bg-clinic/15 group-hover:text-clinic"
        >
          {testimonial.initials}
        </span>
        <div>
          <p className="font-medium text-scrub">{testimonial.name}</p>
          <p className="text-sm text-graphite">{testimonial.treatment}</p>
        </div>
      </div>
      <div className="mt-4">
        <StarRating rating={testimonial.rating} />
      </div>
      <blockquote className="mt-3 flex-1 text-body-l text-graphite">
        “{testimonial.text}”
      </blockquote>
      <p className="mt-4 font-mono text-eyebrow uppercase text-graphite">
        Via {testimonial.source}
      </p>
    </article>
  );
}
