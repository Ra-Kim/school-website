import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

/**
 * /results
 *
 * The school owns this URL. It explains the result checker and sends
 * parents to the school's portal (portal.ssis.com.ng, run on Schola).
 *
 * Why a dedicated page instead of just linking to the portal directly:
 *   - Trust signal. A page on ssis.com.ng explaining "this is where to
 *     check results" is reassuring before parents land on another domain.
 *   - SEO. "Sharon Stars result checker" should rank for /results.
 *   - Migration safety. If the portal moves, only content/site.ts changes.
 */

export const metadata: Metadata = {
  title: "Result Checker",
  description: `Check your child's results, view reports, and access the parent portal at ${site.name}.`,
};

const steps = [
  {
    n: "01",
    title: "Have your details ready",
    body: "You'll need your child's Student ID. The school office can give it to you if you don't have it.",
  },
  {
    n: "02",
    title: "Open the result checker",
    body: "Click the button below. It opens in a new tab — your place on this page is preserved. Enter the Student ID, then pick the session and term.",
  },
  {
    n: "03",
    title: "View, save, or print",
    body: "The report card opens on screen. You can save it as a PDF or print a copy for your records.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For current parents"
        title="Result Checker."
        intro="Sign in to view your child's reports, term grades, and academic progress."
      />

      {/* Primary action — what 80% of visitors come here to do */}
      <section className="container-prose">
        <div className="rounded-md border border-plum/15 bg-cream-warm p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-serif text-display-md text-foreground">
                Check your child&apos;s result.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                You&apos;ll be taken to our school portal. All you need is your
                child&apos;s Student ID.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Have a parent account? You can also{" "}
                <a
                  href={site.external.parentPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-accent pb-0.5 text-foreground transition-colors hover:text-accent"
                >
                  sign in to the parent portal
                </a>{" "}
                for fees, attendance and announcements.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <ButtonLink
                href={site.external.resultChecker}
                external
                className="px-7 py-4 text-base"
              >
                Open Result Checker
                <span aria-hidden>↗</span>
              </ButtonLink>
              <p className="text-xs text-ink-subtle">
                Opens in a new tab
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How-to */}
      <section className="container-prose py-24 lg:py-32">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-5">How it works</p>
          <h2 className="font-serif text-display-md text-foreground">
            Three steps to your child&apos;s results.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="bg-cream-warm p-8 lg:p-10">
              <p className="font-serif text-sm text-accent">{step.n}</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Help / FAQ */}
      <section className="bg-cream-warm">
        <div className="container-prose py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-5">Need help?</p>
              <h2 className="font-serif text-display-md text-foreground">
                Trouble checking a result?
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-muted">
              <Faq question="I don't know my child's Student ID, or I've forgotten my portal password.">
                Contact the school office on{" "}
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="border-b border-accent pb-0.5 text-foreground transition-colors hover:text-accent"
                >
                  {site.contact.phone}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="border-b border-accent pb-0.5 text-foreground transition-colors hover:text-accent"
                >
                  {site.contact.email}
                </a>{" "}
                during school hours and we&apos;ll help.
              </Faq>
              <Faq question="My child's Student ID isn't working.">
                Check for typos — the ID is letters followed by numbers. If it
                still doesn&apos;t work, get in touch and we&apos;ll check the records.
              </Faq>
              <Faq question="I can't see this term's report yet.">
                Reports are released on the dates announced at the start of
                each term. If the date has passed and you still can&apos;t see it,
                please contact the school.
              </Faq>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Faq({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-medium text-foreground">{question}</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}
