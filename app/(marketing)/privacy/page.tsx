import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles the information you share through this website.`,
};

/**
 * Plain-language privacy notice. It describes what this website actually
 * does — keep it in step with the admissions form (lib/schemas/admissions.ts)
 * and anything else that collects data. Have the school review it.
 */
const sections = [
  {
    title: "What we collect",
    body: [
      "When you send an enquiry through our admissions form, we receive your name, email address, phone number, your child's age group, the reason for your enquiry, and any message you choose to add.",
      "We don't ask for payment details on this website, and we don't use advertising trackers.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "Only to respond to your enquiry, for example to answer your questions, arrange a school visit or guide you through admissions. We also email you a copy confirming we've received it.",
      "We don't sell or share your details with anyone for marketing.",
    ],
  },
  {
    title: "Results and the parent portal",
    body: [
      `The Result Checker and parent portal are run for us by ${site.external.poweredBy?.label ?? "our portal provider"} at a separate address. When you use them, that service handles your sign-in and your child's records on the school's behalf.`,
    ],
  },
  {
    title: "Your choices",
    body: [
      `You can ask us what we hold about you, or ask us to correct or delete it, at any time. Email ${site.contact.email} or call ${site.contact.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Your information, handled with care."
        intro="A plain-language summary of what this website collects and why."
      />
      <section className="container-prose pb-24 lg:pb-32">
        <div className="max-w-2xl divide-y divide-ink-line border-y border-ink-line">
          {sections.map((s) => (
            <div key={s.title} className="py-8">
              <h2 className="font-serif text-2xl text-foreground">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
