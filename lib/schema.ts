import { z } from "zod";
import { services } from "@/content/services";

// Shared validation for the appointment form (SPEC §8.1) — imported by both
// the client form (inline errors) and the Server Action (source of truth,
// since client-side validation can always be bypassed).

const treatmentSlugs = new Set(services.map((s) => s.slug));

export const dayOptions = ["Today", "Tomorrow", "This week", "Next week", "Flexible"] as const;
export const timeOptions = ["Morning", "Afternoon", "Evening"] as const;

// Indian mobile: 10 digits starting 6–9, optional leading +91 or 0.
const phonePattern = /^(?:\+91|0)?[6-9]\d{9}$/;

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(60, "That name looks too long."),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Enter a valid 10-digit Indian mobile number."),
  treatment: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || v === "not-sure" || treatmentSlugs.has(v),
      "Select a valid treatment from the list."
    ),
  day: z.enum(["", ...dayOptions] as const),
  time: z.enum(["", ...timeOptions] as const),
  message: z.string().trim().max(500, "Message is too long (max 500 characters)."),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type AppointmentFieldErrors = Partial<Record<keyof AppointmentInput, string>>;
