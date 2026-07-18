import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Server Component. Label + input slot + hint/error, wired for
// aria-describedby (§8.2/§10). The input itself is passed as children so
// AppointmentForm keeps control of type-specific props.

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-scrub">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      <div className={cn("mt-1.5", error && "[&>*]:border-error")}>{children}</div>
      {hint && !error && <p className="mt-1.5 text-sm text-graphite">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
