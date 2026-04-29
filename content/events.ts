/**
 * Events live here as plain TypeScript for now. When Payload CMS arrives
 * (phase 2), the export below becomes an async fetch — every component
 * already awaits `getEvents()`, so nothing else changes.
 *
 * Slug must be unique and URL-safe. Date is ISO; we format at render time.
 */

export type SchoolEvent = {
  slug: string;
  title: string;
  startsAt: string; // ISO 8601
  endsAt?: string;
  location: string;
  summary: string;
  body: string; // can be markdown later
  image?: string; // path under /public, e.g. "/events/founders-day.jpg"
  category: "Academic" | "Cultural" | "Sport" | "Community" | "Admissions";
};

const events: SchoolEvent[] = [
  {
    slug: "founders-day-lecture",
    title: "Founders' Day Lecture",
    startsAt: "2026-10-12T10:00:00+01:00",
    location: "Main Hall",
    category: "Academic",
    summary:
      "Our annual Founders' Day, marking another year of the school's work and welcoming back alumni.",
    body: "The annual Founders' Day Lecture is open to current parents, alumni, and prospective families. This year's keynote will be announced shortly.",
    image: "/events/placeholder-1.jpg",
  },
  {
    slug: "open-house-secondary",
    title: "Open House — Secondary",
    startsAt: "2026-11-02T09:30:00+01:00",
    endsAt: "2026-11-02T13:00:00+01:00",
    location: "Secondary campus",
    category: "Admissions",
    summary:
      "A morning for prospective parents to tour the secondary campus, meet teachers, and see classes in session.",
    body: "Tours leave from reception every 30 minutes. Q&A with the head of secondary at 12:00.",
    image: "/events/placeholder-2.jpg",
  },
  {
    slug: "inter-house-sports",
    title: "Inter-House Sports Day",
    startsAt: "2026-11-23T08:00:00+01:00",
    location: "School field",
    category: "Sport",
    summary:
      "The houses compete across track and field. Parents are warmly invited.",
    body: "Refreshments will be served from 11:00. House points are settled here.",
    image: "/events/placeholder-3.jpg",
  },
];

export async function getEvents(): Promise<SchoolEvent[]> {
  // sort soonest-first, drop past events
  const now = Date.now();
  return events
    .filter((e) => new Date(e.startsAt).getTime() >= now - 1000 * 60 * 60 * 6)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
}

export async function getEventBySlug(slug: string): Promise<SchoolEvent | null> {
  return events.find((e) => e.slug === slug) ?? null;
}

export async function getUpcomingEvents(limit = 3): Promise<SchoolEvent[]> {
  return (await getEvents()).slice(0, limit);
}
