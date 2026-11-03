import Link from "next/link";
import { ClipboardCheck, Users, GraduationCap, FileBarChart } from "lucide-react";
import { site } from "@/content/site";

/**
 * Highlights — four quick-scan cards straight after the hero, each a
 * door into a page. Every claim here is pulled from content/site.ts or
 * the admissions page, so keep them in sync if those change.
 */
const ratio = site.stats.find((s) => s.label.toLowerCase().includes("ratio"))?.value;
const firstAge = site.programs[0]?.ageRange.match(/\d+/)?.[0];
const lastAge = site.programs[site.programs.length - 1]?.ageRange.match(/\d+(?=\D*$)/)?.[0];

const highlights = [
  {
    icon: ClipboardCheck,
    title: "Easy admissions",
    body: "Send an enquiry from home. We reply within two working days.",
    href: "/admissions#enquire",
    cta: "Start an enquiry",
  },
  {
    icon: Users,
    title: "Small classes",
    body: ratio
      ? `A ${ratio} teacher to pupil ratio, so every child is known by name.`
      : "Small classes, so every child is known by name.",
    href: "/about",
    cta: "About the school",
  },
  {
    icon: GraduationCap,
    title: `${site.programs[0]?.name} to ${site.programs[site.programs.length - 1]?.name}`,
    body:
      firstAge && lastAge
        ? `One school from age ${firstAge} to ${lastAge}, preparing students for WAEC and IGCSE.`
        : "One school from the early years through secondary.",
    href: "/#academics",
    cta: "Our programmes",
  },
  {
    icon: FileBarChart,
    title: "Results online",
    body: "Parents check termly results any time on the school portal.",
    href: "/results",
    cta: "Check results",
  },
];

export function Highlights() {
  return (
    <section aria-label="Highlights" className="container-prose pb-8 pt-4 lg:pb-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map(({ icon: Icon, title, body, href, cta }) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col rounded-md border border-ink-line bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md hover:shadow-plum/5"
          >
            <span className="grid h-11 w-11 place-items-center rounded-md bg-rose-tint text-accent transition-colors group-hover:bg-accent group-hover:text-cream">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-5 font-serif text-xl text-foreground">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
            <span className="mt-5 text-sm font-medium text-foreground transition-colors group-hover:text-accent">
              {cta} <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
