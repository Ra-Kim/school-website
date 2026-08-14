import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { LocalFaq } from "@/components/seo/local-faq";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}, off Sars Link Road in Rumuagholu, Port Harcourt — a short drive from Rumuokoro.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Find us, write to us, call us."
        intro="The fastest way to reach the admissions team is the form on the admissions page. For everything else, the details below."
      />

      <section className="container-prose pb-24 lg:pb-32">
        <div className="grid gap-px overflow-hidden rounded-md bg-ink-line md:grid-cols-3">
          <ContactCard
            label="Address"
            value={site.contact.address}
            href={site.contact.googleMapsUrl || undefined}
          />
          <ContactCard
            label="Email"
            value={site.contact.email}
            href={`mailto:${site.contact.email}`}
          />
          <ContactCard
            label="Phone"
            value={site.contact.phone}
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
          />
        </div>

        <div className="mt-12 aspect-[16/7] overflow-hidden rounded-md bg-rose-tint">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d829.6877018523377!2d6.981624647973694!3d4.882347630629881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069d1ea3c16f349%3A0x2d31accd7329d649!2sSharon%20Stars!5e0!3m2!1sen!2sng!4v1777397148270!5m2!1sen!2sng"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </section>

      <LocalFaq />
    </>
  );
}

function ContactCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="bg-cream-warm p-8 lg:p-10">
      <p className="text-xs uppercase tracking-eyebrow text-accent">{label}</p>
      <p className="mt-3 font-serif text-xl leading-snug text-foreground">
        {value}
      </p>
    </div>
  );
  if (href)
    return (
      <a href={href} className="block transition-colors hover:bg-cream">
        {content}
      </a>
    );
  return content;
}
