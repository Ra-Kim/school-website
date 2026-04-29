import { site } from "@/content/site";

/**
 * Pillars — replaces the old Mission/Card section.
 *
 * Old version had: typo'd headline ("stanadrds"), book-rose.svg icons,
 * cluttered "Read More" links with opacity-50 (broken), and
 * disabled-looking buttons. Removed all of it. The pillars are bold
 * declarative statements with a serif title and a single supporting
 * sentence each. No icons, no fake "read more" links.
 */
export function Pillars() {
  return (
    <section className="bg-cream-warm py-24 lg:py-32">
      <div className="container-prose">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-5 justify-center">What we stand for</p>
          <h2 className="text-center font-serif text-display-lg text-foreground">
            Three commitments that shape every lesson, every term, every year.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-md bg-ink-line lg:grid-cols-3">
          {site.pillars.map((pillar, idx) => (
            <article
              key={pillar.title}
              className="group bg-cream-warm p-10 transition-colors hover:bg-cream lg:p-12"
            >
              <p className="font-serif text-sm text-accent">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-3xl text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
