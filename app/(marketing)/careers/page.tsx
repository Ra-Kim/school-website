import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Teaching and staff vacancies at ${site.name}, ${site.location}.`,
};

const cvSubject = encodeURIComponent(`CV: application to ${site.name}`);

export default function CareersPage() {
  const vacancies = site.vacancies;

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        parent={{ label: "About", href: "/about" }}
        title="Teach with us."
        intro="We look for teachers and staff who care about why a student is struggling, not just whether they passed, and who want to keep growing in their craft."
      />

      <section className="container-prose pb-24 lg:pb-32">
        <p className="eyebrow mb-6">Current vacancies</p>
        {vacancies.length > 0 ? (
          <ul className="divide-y divide-ink-line border-y border-ink-line">
            {vacancies.map((v) => (
              <li key={v.title} className="grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
                <div>
                  <p className="text-xs uppercase tracking-eyebrow text-accent">
                    {v.type}
                    {v.closes && ` · Closes ${v.closes}`}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-foreground">{v.title}</h2>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">{v.summary}</p>
                </div>
                <a
                  href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Application: ${v.title}`)}`}
                  className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-plum px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-plum-deep"
                >
                  Apply by email
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-xl border-y border-ink-line py-8 text-base leading-relaxed text-muted">
            There are no vacancies listed right now. New roles are posted here when they open.
          </p>
        )}

        <div className="mt-12 flex flex-col gap-6 rounded-md bg-cream-warm p-8 md:flex-row md:items-center md:justify-between lg:p-10">
          <div>
            <h2 className="font-serif text-2xl text-foreground">Send us your CV anyway.</h2>
            <p className="mt-2 max-w-lg text-base leading-relaxed text-muted">
              We&apos;re always glad to hear from good teachers. Tell us which subjects and classes you teach, and
              we&apos;ll keep your CV on file.
            </p>
          </div>
          <a
            href={`mailto:${site.contact.email}?subject=${cvSubject}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-plum/30 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-plum hover:bg-plum hover:text-cream"
          >
            <Mail aria-hidden className="h-4 w-4" />
            {site.contact.email}
          </a>
        </div>
      </section>
    </>
  );
}
