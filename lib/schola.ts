/**
 * Schola public API client. SCHOLA_API_KEY belongs in .env.local — server-only,
 * never NEXT_PUBLIC_ (server-to-server calls skip CORS and don't need an
 * allowed-origins entry). Docs: schola.ng → Settings → API keys.
 */

const SCHOLA_BASE_URL =
  process.env.SCHOLA_API_BASE_URL ?? "https://schola.ng/api/v1";
const SCHOLA_API_KEY = process.env.SCHOLA_API_KEY;

const REVALIDATE_SECONDS = 300;

export type ScholaEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: "Academic" | "Cultural" | "Sport" | "Community" | "Admissions";
  location: string;
  starts_at: string;
  ends_at: string | null;
  image_url: string | null;
  published_at: string;
};

export type ScholaPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  tags: string[];
  author: { name: string; avatar_url: string | null };
  published_at: string;
};

type ScholaListResponse<T> = {
  data: T[];
  meta: { next_cursor: string | null; has_more: boolean };
};

const emptyPage = <T>(): ScholaListResponse<T> => ({
  data: [],
  meta: { next_cursor: null, has_more: false },
});

async function scholaFetch<T>(
  path: string,
  searchParams: Record<string, string | number | undefined> = {},
): Promise<T | null> {
  if (!SCHOLA_API_KEY) {
    console.warn(`[schola] SCHOLA_API_KEY is not set — skipping ${path}`);
    return null;
  }

  const url = new URL(`${SCHOLA_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { "X-Schola-Key": SCHOLA_API_KEY },
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (err) {
    console.error(`[schola] request to ${path} failed:`, err);
    return null;
  }

  if (res.status === 404) return null;

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error(
      `[schola] ${path} returned ${res.status}: ${body?.error?.message ?? res.statusText}`,
    );
    return null;
  }

  return (await res.json()) as T;
}

export async function fetchScholaEventsPage(params: {
  when?: "upcoming" | "past" | "all";
  category?: string;
  limit?: number;
  cursor?: string;
}): Promise<ScholaListResponse<ScholaEvent>> {
  const page = await scholaFetch<ScholaListResponse<ScholaEvent>>(
    "/events",
    params,
  );
  return page ?? emptyPage();
}

export async function fetchAllScholaEvents(
  params: { when?: "upcoming" | "past" | "all"; category?: string } = {},
): Promise<ScholaEvent[]> {
  const events: ScholaEvent[] = [];
  let cursor: string | undefined;

  do {
    const page = await fetchScholaEventsPage({ ...params, limit: 100, cursor });
    events.push(...page.data);
    cursor = page.meta.has_more ? (page.meta.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return events;
}

export async function fetchScholaEvent(
  idOrSlug: string,
): Promise<ScholaEvent | null> {
  const res = await scholaFetch<{ data: ScholaEvent }>(
    `/events/${encodeURIComponent(idOrSlug)}`,
  );
  return res?.data ?? null;
}

export async function fetchScholaPostsPage(params: {
  tag?: string;
  limit?: number;
  cursor?: string;
}): Promise<ScholaListResponse<ScholaPost>> {
  const page = await scholaFetch<ScholaListResponse<ScholaPost>>(
    "/posts",
    params,
  );
  return page ?? emptyPage();
}

export async function fetchAllScholaPosts(
  params: { tag?: string } = {},
): Promise<ScholaPost[]> {
  const posts: ScholaPost[] = [];
  let cursor: string | undefined;

  do {
    const page = await fetchScholaPostsPage({ ...params, limit: 100, cursor });
    posts.push(...page.data);
    cursor = page.meta.has_more ? (page.meta.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return posts;
}

export async function fetchScholaPost(
  idOrSlug: string,
): Promise<ScholaPost | null> {
  const res = await scholaFetch<{ data: ScholaPost }>(
    `/posts/${encodeURIComponent(idOrSlug)}`,
  );
  return res?.data ?? null;
}
