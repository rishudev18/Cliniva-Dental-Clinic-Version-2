// Server Component. First focusable element on every page (§10).
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-clinic focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-enamel"
    >
      Skip to content
    </a>
  );
}
