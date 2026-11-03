import Link from "next/link";
import { Plus } from "lucide-react";
import { site } from "@/content/site";

/**
 * Homepage FAQ — the questions parents ask on the phone, answered
 * before they need to call. Native <details>, so it works without JS
 * and is keyboard-accessible for free. Paired with FAQPage JSON-LD.
 *
 * Every answer must be true. Facts come from content/site.ts and the
 * admissions page; when those change, check these still hold.
 */
const programmeList = site.programs
  .map((p) => `${p.name} (${p.ageRange.replace("Age ", "ages ")})`)
  .join(", ");

const faqs = [
  {
    question: "What ages do you admit?",
    answer: `We have three sections: ${programmeList}.`,
  },
  {
    question: "How do I apply?",
    answer:
      "Start with an enquiry on our admissions page or call us. We reply within two working days, invite you for a school visit, then your child completes the application and a short assessment before an offer is made.",
  },
  {
    question: "Is there an entrance assessment?",
    answer:
      "Yes. Every child sits a short, age-appropriate assessment. It isn't a pass-or-fail test; it helps us place your child in the right class.",
  },
  {
    question: "Can I visit the school before applying?",
    answer: `Yes, and we encourage it. Call ${site.contact.phone} or send an enquiry and we'll arrange a time to meet teachers and walk the campus.`,
  },
  {
    question: "What exams do secondary students prepare for?",
    answer: "Our secondary students are prepared for WAEC and IGCSE.",
  },
  {
    question: "How much are the school fees?",
    answer: `Fees depend on your child's section. Call ${site.contact.phone} or send an enquiry and we'll share the current fee schedule.`,
  },
  {
    question: "How do I check my child's results?",
    answer:
      "Use the Result Checker on this website. It opens the school portal, where you can view termly results online.",
  },
  {
    question: "Where is the school?",
    answer: `${site.contact.address}.`,
  },
];

export function HomeFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section id="faq" className="container-prose py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Questions</p>
          <h2 className="font-serif text-display-lg text-foreground">
            What parents usually ask.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
            Can&apos;t find your answer? We&apos;re happy to help.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm text-foreground transition-colors hover:text-accent"
          >
            Ask us a question <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="border-t border-ink-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-ink-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-lg text-foreground transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="max-w-xl pb-6 text-base leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
