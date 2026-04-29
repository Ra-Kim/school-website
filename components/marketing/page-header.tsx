/**
 * Used by every inner page (About, Admissions, Events, Blog, Contact)
 * to keep header treatment consistent. Accepts an optional eyebrow
 * (small kicker line) and an optional intro paragraph.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="container-prose pb-16 pt-16 lg:pb-24 lg:pt-28">
      {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
      <h1 className="font-serif text-display-lg text-foreground lg:text-display-xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </header>
  );
}
