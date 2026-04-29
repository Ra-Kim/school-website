import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/marketing/page-header";
import { getEvents, type SchoolEvent } from "@/content/events";
import { formatEventDate, formatEventTime } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Open days, lectures, sports days, and community events — all the ways to experience the school.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="What's on"
        title="Events at the school."
        intro="Open to current parents, prospective families, alumni, and the wider community."
      />

      <section className="container-prose pb-24 lg:pb-32">
        {events.length === 0 ? (
          <p className="text-base text-muted">
            No events scheduled at the moment. Please check back soon.
          </p>
        ) : (
          <ul className="divide-y divide-ink-line border-y border-ink-line">
            {events.map((event) => (
              <EventRow key={event.slug} event={event} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function EventRow({ event }: { event: SchoolEvent }) {
  return (
    <li>
      <Link
        href={`/events/${event.slug}`}
        className="group grid gap-6 py-8 transition-colors hover:bg-cream-warm md:grid-cols-[200px_140px_1fr_auto] md:items-center md:gap-8"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-rose-tint md:aspect-square md:h-[140px]">
          {event.image && (
            <Image
              src={event.image}
              alt=""
              fill
              sizes="200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div>
          <p className="font-serif text-2xl text-foreground lg:text-3xl">
            {formatEventDate(event.startsAt).split(",")[1]?.trim()}
          </p>
          <p className="mt-1 text-sm text-ink-subtle">
            {formatEventTime(event.startsAt)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-eyebrow text-accent">
            {event.category} · {event.location}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-foreground transition-colors group-hover:text-accent">
            {event.title}
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-muted">
            {event.summary}
          </p>
        </div>
        <div className="text-sm text-ink-subtle md:text-right">
          <span aria-hidden>→</span>
        </div>
      </Link>
    </li>
  );
}
