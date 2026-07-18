import Link from "next/link";
import { cn } from "@/lib/utils";

// Server Component. Renders <a> (Next Link for internal hrefs) or <button>.
// Variants per SPEC §6: primary (clinic fill), secondary (scrub outline), ghost.

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  newTab?: boolean;
  ariaLabel?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium " +
  "transition duration-200 ease-clinic select-none";

const variants = {
  primary: "bg-clinic text-enamel hover:bg-scrub",
  secondary: "border border-scrub text-scrub hover:border-clinic hover:text-clinic",
  ghost: "text-clinic underline-offset-4 hover:text-scrub hover:underline",
};

// §10 — touch targets minimum 44×44px, so even `sm` keeps min-h-[44px].
const sizes = {
  sm: "min-h-[44px] px-4 py-2 text-sm",
  md: "min-h-[44px] px-6 py-3 text-base",
  lg: "min-h-[48px] px-8 py-3.5 text-body-l",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled,
  className,
  newTab,
  ariaLabel,
  children,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const external = !href.startsWith("/");
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(classes, disabled && "cursor-not-allowed opacity-50")}
    >
      {children}
    </button>
  );
}
