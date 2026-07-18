"use client";

// One of the four permitted client components (§2.1) — needs form state
// (useActionState) and the pending indicator (useFormStatus, §8.2). The
// underlying <form action={...}> still works as a plain POST with
// JavaScript disabled, since it's bound to a real Server Action.

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertTriangle } from "lucide-react";
import { submitAppointment, type AppointmentFormState } from "@/app/actions/appointment";
import { FormField } from "@/components/forms/FormField";
import { services } from "@/content/services";
import { dayOptions, timeOptions } from "@/lib/schema";
import { whatsappUrl } from "@/lib/utils";

const initialState: AppointmentFormState = { status: "idle" };

const inputClass =
  "w-full rounded-sm border bg-enamel px-4 py-3 text-scrub transition duration-200 ease-clinic focus:border-clinic";

type AppointmentFormProps = {
  /** Preselects the Treatment field — used by /book?treatment=slug (§7.3 sec 9). */
  defaultTreatment?: string;
};

export function AppointmentForm({ defaultTreatment = "" }: AppointmentFormProps) {
  const [state, formAction] = useActionState(submitAppointment, initialState);
  const errors = state.errors ?? {};
  const values = state.values;

  return (
    <div>
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-card border border-error/30 bg-error/5 p-4 text-sm text-error"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p>{state.message}</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-block font-medium underline underline-offset-4"
            >
              Message us on WhatsApp instead
            </a>
          </div>
        </div>
      )}

      <form action={formAction} noValidate className="space-y-5">
        {/* Honeypot (§8.1) — off-screen and aria-hidden, never seen by a real visitor. */}
        <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company">Leave this field blank</label>
          <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <FormField id="name" label="Full name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={60}
            defaultValue={values?.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
        </FormField>

        <FormField
          id="phone"
          label="Phone number"
          required
          error={errors.phone}
          hint="10-digit mobile number, with or without +91"
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={values?.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
          />
        </FormField>

        <FormField id="treatment" label="Treatment" error={errors.treatment}>
          <select
            id="treatment"
            name="treatment"
            defaultValue={values?.treatment ?? defaultTreatment}
            className={inputClass}
          >
            <option value="">Select a treatment (optional)</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="not-sure">Not sure / general consultation</option>
          </select>
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="day" label="Preferred day" error={errors.day}>
            <select id="day" name="day" defaultValue={values?.day ?? ""} className={inputClass}>
              <option value="">No preference</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="time" label="Preferred time" error={errors.time}>
            <select id="time" name="time" defaultValue={values?.time ?? ""} className={inputClass}>
              <option value="">No preference</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField
          id="message"
          label="Anything we should know?"
          error={errors.message}
          hint="Optional, max 500 characters"
        >
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={500}
            defaultValue={values?.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={inputClass}
          />
        </FormField>

        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[48px] w-full items-center justify-center rounded-pill bg-clinic px-8 py-3.5 text-body-l font-medium text-enamel transition duration-200 ease-clinic hover:bg-scrub disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Sending…" : "Book appointment"}
    </button>
  );
}
