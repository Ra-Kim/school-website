import { Hero } from "@/components/marketing/hero";
import { Welcome } from "@/components/marketing/welcome";
import { Pillars } from "@/components/marketing/pillars";
import { Academics } from "@/components/marketing/academics";
import { EventsPreview } from "@/components/marketing/events-preview";
import { JournalPreview } from "@/components/marketing/journal-preview";
import { AdmissionsCTA } from "@/components/marketing/admissions-cta";

/**
 * Homepage. Eight intentional sections, each doing one job:
 *
 *   1. Hero               — first impression + primary CTA
 *   2. Welcome            — short intro, links to About
 *   3. Pillars            — three core values
 *   4. Academics          — programmes (was the "Classes" component)
 *   5. EventsPreview      — three upcoming, links to /events
 *   6. JournalPreview     — three latest posts, links to /blog
 *   7. AdmissionsCTA      — final conversion section
 *   (Footer comes from the (marketing) layout)
 *
 * Notice what's NOT here that was on the old homepage:
 *   - The contact form. It's now on /contact and /admissions where
 *     visitors who actually want to make contact will land. The
 *     homepage's job is to drive them there, not to be every page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <Pillars />
      <Academics />
      <EventsPreview />
      <JournalPreview />
      <AdmissionsCTA />
    </>
  );
}
