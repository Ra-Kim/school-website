import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { getUpcomingEvents } from "@/content/events";
import { formatEventDate, formatEventTime } from "@/lib/dates";

/**
 * Hero — server component.
 *
 * Replaces the old Hero with its react-multi-carousel + 6-element stack.
 * Single anchored hero image, asymmetric grid, real numbers, and the
 * next upcoming event surfaced as a quiet card on the photo.
 *
 * Why no carousel: every UX study back to 2010 shows hero carousels
 * reduce conversion. Visitors see the first slide and leave before the
 * second arrives. One strong image with one strong CTA wins.
 *
 * Photography: drop a hero image at /public/hero/hero.jpg (1600x1200
 * roughly, faces ideally on the right two-thirds). Until you do, the
 * placeholder block renders — looks intentional, not broken.
 */
export async function Hero() {
  const [nextEvent] = await getUpcomingEvents(1);

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container-prose grid gap-12 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:pt-20">
        {/* Left — copy block */}
        <div className="flex flex-col justify-center pb-16 lg:pb-24">
          <p className="eyebrow mb-7">
            Est. {site.established} · {site.location}
          </p>
          <h1 className="font-serif text-display-xl text-foreground">
            Where curious
            <br />
            minds become
            <br />
            <span className="italic text-accent">remarkable</span> ones.
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-muted lg:text-lg">
            {site.intro}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-md bg-plum px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-plum-deep"
            >
              Begin admissions
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="border-b border-accent pb-1 text-sm text-foreground transition-colors hover:text-accent"
            >
              Visit the school
            </Link>
          </div>

          {/* Quiet pointer for returning parents. They're scanning for
              this exact phrase ("results", "checker", "portal") so making
              it findable matters; making it loud doesn't. */}
          <p className="mt-6 text-sm text-ink-subtle">
            Already a parent?{" "}
            <Link
              href="/results"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Check results →
            </Link>
          </p>
        </div>

        {/* Right — hero image with overlaid event card */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-rose-tint lg:aspect-auto lg:min-h-[560px]">
          <Image
            src="/assets/jpgs/about-ssis.jpg"
            alt="Students at the school"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />

          {nextEvent && (
            <div className="absolute bottom-6 left-6 max-w-[260px] rounded-md border-l-[3px] border-accent bg-cream/95 p-5 backdrop-blur-sm">
              <p className="eyebrow mb-2 !gap-2 text-[10px]">Next event</p>
              <p className="font-medium leading-tight text-foreground">
                {nextEvent.title}
              </p>
              <p className="mt-1 text-sm text-muted">
                {formatEventDate(nextEvent.startsAt)} ·{" "}
                {formatEventTime(nextEvent.startsAt)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats band */}
      <div className="container-prose mt-2 grid grid-cols-1 gap-6 border-t border-ink-line py-10 sm:grid-cols-3 lg:py-12">
        {site.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-serif text-4xl text-foreground lg:text-5xl">
              {stat.value.split("").map((ch, i) => (
                // Highlight punctuation-ish chars in rose to add warmth without flooding
                <span
                  key={i}
                  className={
                    /[%:]/.test(ch) ? "text-accent" : undefined
                  }
                >
                  {ch}
                </span>
              ))}
            </p>
            <p className="eyebrow mt-3 !gap-2 text-ink-subtle">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
