import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/marketing/page-header";
import { ButtonLink } from "@/components/ui/button";
import { getEventBySlug, getEvents } from "@/content/events";
import { formatEventDate, formatEventTime } from "@/lib/dates";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event" };
  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "article",
      images: event.image ? [{ url: event.image }] : undefined,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <>
      <div className="container-prose pt-12">
        <Link
          href="/events"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All events
        </Link>
      </div>

      <PageHeader eyebrow={event.category} title={event.title} />

      <section className="container-prose">
        <div className="relative aspect-[16/8] overflow-hidden rounded-md bg-rose-tint">
          {event.image && (
            <Image
              src={event.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </section>

      <section className="container-prose py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Meta sidebar */}
          <aside className="space-y-8">
            <Detail label="When">
              <p className="font-medium text-foreground">
                {formatEventDate(event.startsAt)}
              </p>
              <p className="text-muted">
                {formatEventTime(event.startsAt)}
                {event.endsAt && ` – ${formatEventTime(event.endsAt)}`}
              </p>
            </Detail>
            <Detail label="Where">
              <p className="text-foreground">{event.location}</p>
            </Detail>
            <Detail label="For">
              <p className="text-foreground">{event.category}</p>
            </Detail>

            <ButtonLink href="/admissions" className="w-full">
              Book a school visit
            </ButtonLink>
          </aside>

          {/* Body */}
          <div className="max-w-prose space-y-5 text-lg leading-relaxed text-muted">
            <p className="font-serif text-xl text-foreground">
              {event.summary}
            </p>
            {event.body.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-eyebrow text-ink-subtle">
        {label}
      </p>
      <div className="mt-2 text-base">{children}</div>
    </div>
  );
}
