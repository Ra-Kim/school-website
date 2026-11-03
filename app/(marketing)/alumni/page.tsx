import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { WebsiteForm, type FormField } from "@/components/marketing/website-form";
import { site } from "@/content/site";
import { leavingSections, leavingYears } from "@/lib/schemas/forms";

export const metadata: Metadata = {
  title: "Alumni",
  description: `Former students of ${site.name}: register to stay in touch with the school and your classmates.`,
};

const fields: FormField[] = [
  { name: "name", label: "Full name (as at school)", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone / WhatsApp", type: "tel", autoComplete: "tel" },
  { name: "yearLeft", label: "Year you left", type: "select", options: leavingYears, required: true, placeholder: "Choose a year" },
  { name: "sectionLeft", label: "You left from", type: "select", options: leavingSections, required: true },
  { name: "occupation", label: "What you do now", placeholder: "Studying, working, building…" },
  { name: "location", label: "Where you live now", autoComplete: "address-level2", wide: true },
  { name: "message", label: "A message for the school or your classmates", type: "textarea" },
  { name: "directoryConsent", label: `${site.shortName} may include my name, year and what I do now in an alumni list shared with other former students.`, type: "checkbox" },
];

const reasons = [
  "Hear about reunions and school events",
  "Reconnect with classmates from your year",
  "Come back to inspire current students",
];

export default function AlumniPage() {
  return (
    <>
      <PageHeader
        eyebrow="Alumni"
        parent={{ label: "About", href: "/about" }}
        title="Once a Sharon Star, always one."
        intro={`Since ${site.established}, our students have gone on to university, work and much more. We'd love to hear where life has taken you.`}
      />

      <section className="container-prose pb-16 lg:pb-24">
        <ul className="grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r} className="bg-cream-warm p-8 lg:p-10">
              <p className="font-serif text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-serif text-xl text-foreground">{r}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="register" className="bg-cream-warm">
        <div className="container-prose grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-32">
          <div>
            <p className="eyebrow mb-5">Register</p>
            <h2 className="font-serif text-display-md text-foreground">Stay connected.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              It takes two minutes. We&apos;ll only use your details to keep in touch, and you can ask us to
              remove them at any time.
            </p>
          </div>
          <WebsiteForm
            kind="alumni"
            fields={fields}
            submitLabel="Register"
            successTitle="Welcome back."
            successBody="Thank you for registering. It's wonderful to hear from you, and we'll keep you posted."
          />
        </div>
      </section>
    </>
  );
}
