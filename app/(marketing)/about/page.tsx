import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/marketing/page-header";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Founded in ${site.established}, ${site.name} is a school built around the student, not the system.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the school"
        title="A school built around the student, not the system."
        intro={`Founded in ${site.established} in ${site.location}, ${site.name} has spent more than two decades preparing young people for university, for work, and for the harder parts of being human.`}
      />

      {/* Lead photograph */}
      <section className="container-prose">
        <div className="relative aspect-[16/8] overflow-hidden rounded-md bg-rose-tint">
          <Image
            src="/assets/jpgs/carousel-ssis.jpg"
            alt="Students at the school"
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Head's welcome */}
      <section className="container-prose py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">A welcome</p>
            <h2 className="font-serif text-display-md text-foreground">
              From the head of school.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Every parent who walks into our reception is doing one of the
              hardest things parents do: deciding who to trust with the years
              that shape their child most. We take that seriously.
            </p>
            <p>
              At {site.shortName}, {site.about}
            </p>
            <p>
              Our teachers stay. Our class sizes are small enough that no
              child is invisible. And the work — the actual learning — is
              rigorous, not because rigour is a brand, but because it is what
              honours a child&apos;s capacity.
            </p>
            <p className="font-serif text-foreground">
              — The Head of School
            </p>
          </div>
        </div>
      </section>

      {/* Pull-out story / mission band */}
      <section className="bg-plum py-24 text-cream lg:py-32">
        <div className="container-prose">
          <p className="eyebrow mb-7 text-rose-soft">Our mission</p>
          <p className="max-w-4xl font-serif text-display-md leading-tight text-cream lg:text-display-lg">
            To raise young people who are kind, curious, and capable —
            <span className="italic text-rose-soft"> in that order</span>.
          </p>
        </div>
      </section>

      {/* By the numbers */}
      <section className="container-prose py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5 justify-center">The school in numbers</p>
          <h2 className="font-serif text-display-md text-foreground">
            What twenty-six years looks like.
          </h2>
        </div>
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {site.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-6xl text-foreground">
                {stat.value.split("").map((ch, i) => (
                  <span
                    key={i}
                    className={/[%:]/.test(ch) ? "text-accent" : undefined}
                  >
                    {ch}
                  </span>
                ))}
              </p>
              <p className="eyebrow mt-4 justify-center text-ink-subtle">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-warm">
        <div className="container-prose grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-24">
          <h2 className="font-serif text-display-md text-foreground">
            Come and see us.
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:justify-end">
            <ButtonLink href="/admissions">Begin admissions</ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
