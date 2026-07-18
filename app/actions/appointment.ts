"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { clinic } from "@/content/clinic";
import { getService } from "@/content/services";
import { appointmentSchema, type AppointmentFieldErrors } from "@/lib/schema";

// The appointment Server Action (SPEC §8.2). Bound to the form via
// useActionState, but because it's a real Server Action the <form> still
// works as a plain HTML POST with JavaScript disabled — Next.js re-renders
// the page with the returned state either way, which is what makes the
// no-JS submit path work without any separate fallback code.

export type AppointmentFormState = {
  status: "idle" | "error";
  errors?: AppointmentFieldErrors;
  values?: {
    name: string;
    phone: string;
    treatment: string;
    day: string;
    time: string;
    message: string;
  };
  message?: string;
};

// In-memory per-IP rate limit (§8.2: reject >3 submissions per IP per 10
// minutes). No external store is on the §2.2 allowed dependency list, and a
// single Vercel serverless instance's in-memory Map is enough to stop the
// casual bot traffic this form will actually see.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const submissionLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  submissionLog.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function submitAppointment(
  _prevState: AppointmentFormState,
  formData: FormData
): Promise<AppointmentFormState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    treatment: String(formData.get("treatment") ?? ""),
    day: String(formData.get("day") ?? ""),
    time: String(formData.get("time") ?? ""),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot tripped — pretend success and send nothing, so a bot script
  // gets no signal that it was caught.
  const honeypot = String(formData.get("company") ?? "");
  if (honeypot !== "") {
    redirect("/thank-you");
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return {
      status: "error",
      values,
      message:
        "Too many requests from this connection. Please wait a few minutes, or reach us directly on WhatsApp.",
    };
  }

  const parsed = appointmentSchema.safeParse(values);
  if (!parsed.success) {
    const errors: AppointmentFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof AppointmentFieldErrors;
      if (!errors[field]) errors[field] = issue.message;
    }
    return { status: "error", errors, values };
  }

  const treatmentName =
    parsed.data.treatment && parsed.data.treatment !== "not-sure"
      ? (getService(parsed.data.treatment)?.name ?? parsed.data.treatment)
      : "Not sure / general consultation";

  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      // Placeholder sender — Resend's shared sandbox address works without
      // domain verification but is restricted to the account owner's own
      // inbox. Swap to a verified address on the clinic's domain (§13 TODO)
      // once one exists, e.g. `bookings@cliviadental.in`.
      from: `${clinic.name} website <onboarding@resend.dev>`,
      to: clinic.email,
      subject: `New appointment request — ${parsed.data.name}`,
      text: [
        `Name: ${parsed.data.name}`,
        `Phone: ${parsed.data.phone}`,
        `Treatment: ${treatmentName}`,
        `Preferred day: ${parsed.data.day || "No preference"}`,
        `Preferred time: ${parsed.data.time || "No preference"}`,
        `Message: ${parsed.data.message || "—"}`,
      ].join("\n"),
    });
    if (error) throw error;
  } catch (err) {
    console.error("Appointment email failed to send:", err);
    return {
      status: "error",
      values,
      message: "We couldn't submit your request just now. Please try again, or message us directly on WhatsApp.",
    };
  }

  redirect("/thank-you");
}
