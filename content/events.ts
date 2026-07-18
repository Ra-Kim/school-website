/**
 * Events, sourced live from the Schola API (see lib/schola.ts). Every
 * component already awaits these getters, so nothing downstream changes.
 * If SCHOLA_API_KEY is missing or the API is unreachable, these resolve to
 * an empty list — pages already handle the zero-events case.
 */

import {
  fetchAllScholaEvents,
  fetchScholaEvent,
  fetchScholaEventsPage,
  type ScholaEvent,
} from "@/lib/schola";

export type SchoolEvent = {
  slug: string;
  title: string;
  startsAt: string; // ISO 8601
  endsAt?: string;
  location: string;
  summary: string;
  body: string;
  image?: string;
  category: "Academic" | "Cultural" | "Sport" | "Community" | "Admissions";
};

function mapEvent(event: ScholaEvent): SchoolEvent {
  return {
    slug: event.slug,
    title: event.title,
    startsAt: event.starts_at,
    endsAt: event.ends_at ?? undefined,
    location: event.location,
    summary: event.summary,
    body: event.body,
    image: event.image_url ?? undefined,
    category: event.category,
  };
}

export async function getEvents(): Promise<SchoolEvent[]> {
  const events = await fetchAllScholaEvents({ when: "upcoming" });
  return events.map(mapEvent);
}

export async function getEventBySlug(
  slug: string,
): Promise<SchoolEvent | null> {
  const event = await fetchScholaEvent(slug);
  return event ? mapEvent(event) : null;
}

export async function getUpcomingEvents(limit = 3): Promise<SchoolEvent[]> {
  const page = await fetchScholaEventsPage({ when: "upcoming", limit });
  return page.data.map(mapEvent);
}
