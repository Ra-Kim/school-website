import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Clock, Users } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { WebsiteForm, type FormField } from "@/components/marketing/website-form";
import { site } from "@/content/site";
import { ageGroups } from "@/lib/schemas/admissions";
import { visitTimes } from "@/lib/schemas/forms";

export const metadata: Metadata = {
  title: "Book a Visit",
  description: `Book a visit to ${site.name} in ${site.location}. Walk the school, meet our teachers and ask your questions in person.`,
};

const fields: FormField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", wide: true },
  { name: "preferredDate", label: "Preferred date (Mon–Fri)", type: "date", required: true },
  { name: "preferredTime", label: "Preferred time", type: "select", options: visitTimes, defaultValue: "Any time" },
  { name: "childAge", label: "Child's age group", type: "select", options: ageGroups, required: true, placeholder: "Choose age group" },
  { name: "visitors", label: "Number of visitors", type: "number", min: 1, max: 6, defaultValue: 1 },
  { name: "message", label: "Anything we should know?", type: "textarea", placeholder: "Questions you'd like answered, or anything that would help us plan your visit." },
];

const expectations = [
  { icon: Users, title: "Meet the people", body: "Walk the classrooms and meet the teachers your child would learn with." },
  { icon: Clock, title: "On a school day", body: "Visits happen Monday to Friday, so you see the school as it really is." },
  { icon: CalendarCheck, title: "We'll confirm", body: "We call or email within two working days to agree a time that suits you." },
];

export default function VisitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a visit"
        parent={{ label: "Admissions", href: "/admissions" }}
        title="Come and see us."
        intro="The best way to know if a school is right is to walk through it. Tell us when suits you and we'll arrange the rest."
      />

      <section className="container-prose pb-16 lg:pb-24">
        <div className="grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-3">
          {expectations.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-cream-warm p-8 lg:p-10">
              <Icon aria-hidden className="h-5 w-5 text-accent" />
              <h2 className="mt-4 font-serif text-xl text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-warm">
        <div className="container-prose grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-32">
          <div>
            <p className="eyebrow mb-5">Request a visit</p>
            <h2 className="font-serif text-display-md text-foreground">Pick a day that works.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Prefer to talk? Call{" "}
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="border-b border-accent pb-0.5 text-foreground transition-colors hover:text-accent"
              >
                {site.contact.phone}
              </a>
              . You&apos;ll find us at {site.contact.address}.
            </p>
            <p className="mt-4 text-sm text-ink-subtle">
              Ready to apply already?{" "}
              <Link href="/admissions#enquire" className="text-foreground underline-offset-4 hover:text-accent hover:underline">
                Start an enquiry →
              </Link>
            </p>
          </div>
          <WebsiteForm
            kind="visit"
            fields={fields}
            submitLabel="Request a visit"
            successBody="We've received your request and will call or email within two working days to confirm your visit. A copy has been sent to your email."
            note="We'll only use your details to arrange your visit."
          />
        </div>
      </section>
    </>
  );
}
