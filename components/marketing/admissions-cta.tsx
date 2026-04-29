import Link from "next/link";

/**
 * AdmissionsCTA — the last section before the footer. Its only job is
 * to convert. One headline, one paragraph, two clear next actions.
 *
 * Don't dilute this with extra links. Whatever competes with the
 * primary CTA wins, and that's not what we want here.
 */
export function AdmissionsCTA() {
  return (
    <section id="contact" className="bg-rose-tint">
      <div className="container-prose grid gap-10 py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-32">
        <div>
          <p className="eyebrow mb-5">Admissions</p>
          <h2 className="font-serif text-display-lg text-foreground">
            Considering us for your child?
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            We'd love to meet you. Begin with an enquiry, book a school
            visit, or jump straight to the application.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end lg:justify-center">
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-plum px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-plum-deep"
          >
            Begin admissions
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/admissions#enquire"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-plum/20 bg-cream px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-plum/40"
          >
            Book a school visit
          </Link>
        </div>
      </div>
    </section>
  );
}
