import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { AdmissionsForm } from "@/components/marketing/admissions-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Admissions",
  description: `Apply, book a school visit, or get in touch with the ${site.name} admissions team in ${site.location}.`,
};

const steps: { n: string; title: string; body: string; link?: { label: string; href: string } }[] = [
  {
    n: "01",
    title: "Initial enquiry",
    body: "Tell us a bit about your child and what you're looking for. We'll get back to you within two working days.",
  },
  {
    n: "02",
    title: "School visit",
    body: "Come and see us — meet teachers, walk the campus, and ask the questions only an in-person visit answers.",
    link: { label: "Book a visit", href: "/visit" },
  },
  {
    n: "03",
    title: "Application & assessment",
    body: "Complete the application form. Children sit a short, age-appropriate assessment so we can place them well.",
  },
  {
    n: "04",
    title: "Offer & enrolment",
    body: "Successful applicants receive an offer and joining instructions. Welcome to the school.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Joining the school."
        intro="Whether you're ready to apply or just starting to look, this is where to begin. The four steps below are how every family joins us."
      />

      {/* Process */}
      <section className="container-prose pb-24 lg:pb-32">
        <div className="grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="bg-cream-warm p-8 lg:p-10">
              <p className="font-serif text-sm text-accent">{step.n}</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
              {step.link && (
                <Link
                  href={step.link.href}
                  className="mt-5 inline-flex border-b border-accent pb-0.5 text-sm text-foreground transition-colors hover:text-accent"
                >
                  {step.link.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {site.admissionDocuments.length > 0 && (
        <section className="container-prose pb-24 lg:pb-32">
          <div className="grid gap-10 rounded-md border border-ink-line p-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:p-12">
            <div>
              <p className="eyebrow mb-5">Before you apply</p>
              <h2 className="font-serif text-display-md text-foreground">Documents to have ready.</h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {site.admissionDocuments.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-base text-muted">
                  <FileCheck2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Enquiry form */}
      <section id="enquire" className="bg-cream-warm">
        <div className="container-prose grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-32">
          <div>
            <p className="eyebrow mb-5">Get in touch</p>
            <h2 className="font-serif text-display-md text-foreground">
              Send us an enquiry.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Or call us directly on{" "}
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="border-b border-accent pb-0.5 text-foreground transition-colors hover:text-accent"
              >
                {site.contact.phone}
              </a>{" "}
              during school hours.
            </p>
          </div>
          <div>
            <AdmissionsForm />
          </div>
        </div>
      </section>
    </>
  );
}
