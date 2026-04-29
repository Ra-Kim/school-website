import Link from "next/link";
import { site } from "@/content/site";

/**
 * Welcome — short editorial intro on the homepage. The job is to make
 * a parent want to click through to the full About page; not to be the
 * About page. Keep this section tight.
 */
export function Welcome() {
  return (
    <section className="container-prose py-24 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Welcome</p>
          <h2 className="font-serif text-display-lg text-foreground">
            A school built around the student, not the system.
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>At {site.shortName}, {site.about}</p>
          <p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-b border-accent pb-1 text-foreground transition-colors hover:text-accent"
            >
              Read the head&apos;s welcome
              <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
