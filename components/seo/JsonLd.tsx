// Server Component — renders a pre-built JSON-LD string (§9.3). Never
// interactive, so it doesn't need "use client" (hard rule 1).

export function JsonLd({ data }: { data: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}
