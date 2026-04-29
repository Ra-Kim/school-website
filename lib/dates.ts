/**
 * Consistent date formatting across the site.
 * Centralizing this means a single place to swap to a different locale
 * if the SaaS phase 3 needs it.
 */

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
});

export function formatEventDate(iso: string): string {
  // e.g. "Sat, 12 Oct 2026"
  return dateFormat.format(new Date(iso));
}

export function formatEventTime(iso: string): string {
  // e.g. "10:00"
  return timeFormat.format(new Date(iso));
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
