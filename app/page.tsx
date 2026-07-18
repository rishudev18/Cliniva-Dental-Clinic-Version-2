// Temporary Step 1 placeholder proving tokens and fonts load.
// Replaced by the real home page in Step 7 (SPEC §7.1).
export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-graphite">
        Step 1 scaffold
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium text-scrub">
        Clivia Dental Clinic
      </h1>
      <p className="mt-4 max-w-[68ch] text-graphite">
        Project scaffold is in place. Design tokens, fonts, and folder
        structure are configured. Site build continues in the next steps.
      </p>
      <div className="mt-8 flex gap-4">
        <span className="rounded-pill bg-clinic px-6 py-3 font-medium text-enamel">
          Token check: clinic
        </span>
        <span className="rounded-card bg-rinse px-6 py-3 font-mono text-scrub shadow-card">
          Token check: rinse
        </span>
      </div>
    </main>
  );
}
