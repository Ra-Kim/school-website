import { site } from "@/content/site";

/**
 * Visible FAQ answering the location questions local parents actually
 * type into Google ("school near Rumuokoro", "schools in Rumuagholu").
 * Paired with FAQPage JSON-LD so it's also eligible for a rich result.
 *
 * Keep every answer factually true — don't claim a neighbourhood the
 * school doesn't actually sit in or near. Padding this with places is
 * how you lose the Business Profile's trust score, not gain reach.
 */
const otherAreas = site.serviceAreas.filter(
  (a) => a !== "Port Harcourt" && a !== "Rumuagholu",
);

const faqs = [
  {
    question: `Where exactly is ${site.shortName} located?`,
    answer: `${site.name} is at ${site.contact.address}. We're just off Sars Link Road (Sars Road), a short drive from the Rumuokoro roundabout.`,
  },
  {
    question: "Do you take pupils from outside Rumuagholu?",
    answer: `Yes — we welcome pupils from anywhere in Port Harcourt. Many of our families already commute in from ${otherAreas.slice(0, -1).join(", ")}, and ${otherAreas[otherAreas.length - 1]}.`,
  },
  {
    question: "Is there parking and a straightforward way to find you?",
    answer:
      "Yes. The school is easy to reach from Sars Road — use the map on this page for turn-by-turn directions, or call us and we'll talk you in.",
  },
] as const;

export function LocalFaq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="container-prose pb-24 lg:pb-32">
      <p className="eyebrow mb-6">Finding us</p>
      <dl className="divide-y divide-ink-line border-y border-ink-line">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-8">
            <dt className="font-serif text-xl text-foreground">
              {faq.question}
            </dt>
            <dd className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
