import { clinic } from "@/content/clinic";

type ClassValue = string | false | null | undefined;

/** Joins conditional class names, dropping falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/** ₹12,000 — Indian digit grouping, no decimals. */
export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;
}

/** ₹8,000 – ₹15,000 — the Cost Clarity Table range format (§5.5). */
export function formatINRRange(min: number, max: number): string {
  return `${formatINR(min)} – ${formatINR(max)}`;
}

/**
 * wa.me deep link with a prefilled message (§8.3).
 * Pass a service name for the service-page template; omit for the generic one.
 */
export function whatsappUrl(serviceName?: string): string {
  const message = serviceName
    ? `Hi, I'd like to book an appointment for ${serviceName} at ${clinic.name}.`
    : `Hi, I'd like to book an appointment at ${clinic.name}.`;
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}
