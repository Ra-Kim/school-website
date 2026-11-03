import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { WebsiteForm, type FormField } from "@/components/marketing/website-form";
import { site } from "@/content/site";
import { storyRoles } from "@/lib/schemas/forms";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `What parents, students and former students say about ${site.name}.`,
};

const fields: FormField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "role", label: "You are a…", type: "select", options: storyRoles, required: true, wide: true },
  { name: "story", label: "Your story", type: "textarea", required: true, placeholder: "What has the school meant to you or your child? A moment, a teacher, a change you noticed…" },
  { name: "publishConsent", label: `${site.shortName} may publish my story on its website and social media with my name.`, type: "checkbox" },
];

export default function TestimonialsPage() {
  const testimonials = site.testimonials;

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        parent={{ label: "About", href: "/about" }}
        title="What families say."
        intro="In the words of the parents, students and former students who know us best."
      />

      <section className="container-prose pb-24 lg:pb-32">
        {testimonials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name + t.quote.slice(0, 20)} className="flex flex-col rounded-md border border-ink-line bg-surface p-8">
                <Quote aria-hidden className="h-6 w-6 text-accent" />
                <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span className="block text-ink-subtle">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-ink-line p-10 text-center">
            <Quote aria-hidden className="mx-auto h-6 w-6 text-accent" />
            <p className="mt-4 font-serif text-2xl text-foreground">Stories are on their way.</p>
            <p className="mx-auto mt-3 max-w-md text-base text-muted">
              We&apos;re gathering stories from our families. Be one of the first to share yours below.
            </p>
          </div>
        )}
      </section>

      <section id="share" className="bg-cream-warm">
        <div className="container-prose grid gap-12 py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-20 lg:py-32">
          <div>
            <p className="eyebrow mb-5">Share your story</p>
            <h2 className="font-serif text-display-md text-foreground">Tell us about your experience.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Parents, students and former students are all welcome. We read every story, and we&apos;ll
              check with you before featuring yours.
            </p>
          </div>
          <WebsiteForm
            kind="story"
            fields={fields}
            submitLabel="Send my story"
            successBody="Thank you for sharing. We read every story, and we'll be in touch if we'd like to feature yours."
          />
        </div>
      </section>
    </>
  );
}
