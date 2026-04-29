import Link from "next/link";
import Image from "next/image";
import { getUpcomingEvents, type SchoolEvent } from "@/content/events";
import { formatEventDate, formatEventTime } from "@/lib/dates";

/**
 * Homepage events preview. Shows three upcoming. Each card links to the
 * full event detail page at /events/[slug]. The "View all events"
 * button is real now (the old one was disabled).
 */
export async function EventsPreview() {
  const events = await getUpcomingEvents(3);

  if (events.length === 0) return null;

  return (
    <section id="events" className="bg-plum py-24 text-cream lg:py-32">
      <div className="container-prose">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-5 text-rose-soft">What's on</p>
            <h2 className="font-serif text-display-lg">Upcoming at the school</h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 self-start rounded-md border border-cream/30 px-5 py-2.5 text-sm text-cream transition-colors hover:bg-cream hover:text-plum"
          >
            View all events
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: SchoolEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-md bg-plum-soft transition-colors hover:bg-plum-soft/80"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-plum-deep">
        {event.image && (
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-plum">
          {event.category}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-eyebrow text-rose-soft">
          {formatEventDate(event.startsAt)} · {formatEventTime(event.startsAt)}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-cream">
          {event.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/70">
          {event.summary}
        </p>
      </div>
    </Link>
  );
}
