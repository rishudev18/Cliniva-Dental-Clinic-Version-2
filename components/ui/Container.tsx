import { cn } from "@/lib/utils";

// Server Component. The one container per SPEC §5.3:
// max-w-6xl mx-auto px-5 md:px-8.

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-6xl px-5 md:px-8", className)}>{children}</div>
  );
}
