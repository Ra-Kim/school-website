import { site } from "@/content/site";

/**
 * Academics — replaces the old Classes component (with the school-cap
 * SVG that looked like a 2014 Bootstrap landing page).
 *
 * Editorial tier: each program is a typeset row with age range, name,
 * and a one-line summary. No icons. The structure does the work.
 */
export function Academics() {
  return (
    <section id="academics" className="container-prose py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Programmes</p>
          <h2 className="font-serif text-display-lg text-foreground">
            From first letters to first-choice universities.
          </h2>
        </div>
        <div>
          <ul className="divide-y divide-ink-line border-y border-ink-line">
            {site.programs.map((program) => (
              <li
                key={program.name}
                className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 py-7 lg:grid-cols-[140px_1fr_auto] lg:items-baseline lg:gap-x-12"
              >
                <p className="font-serif text-sm text-accent">
                  {program.ageRange}
                </p>
                <h3 className="font-serif text-2xl text-foreground lg:text-3xl">
                  {program.name}
                </h3>
                <p className="col-span-2 text-base leading-relaxed text-muted lg:col-span-1 lg:max-w-md">
                  {program.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
