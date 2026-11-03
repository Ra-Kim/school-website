"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { navItems } from "@/lib/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import Image from "next/image";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(site.contact.address)}`;
  const telHref = `tel:${site.contact.phone.replace(/\s/g, "")}`;
  const mailHref = `mailto:${site.contact.email}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-background/85 backdrop-blur-md transition-colors",
        scrolled && "border-b border-ink-line",
      )}
    >
      <div
        className={cn(
          "hidden lg:block overflow-hidden border-b border-ink-line/60 bg-cream/40 transition-all duration-300",
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
        )}
      >
        <div className="container-prose flex h-9 items-center justify-between text-xs text-muted">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-plum"
          >
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{site.contact.address}</span>
          </a>

          <div className="flex items-center gap-5">
            <a
              href={telHref}
              className="flex items-center gap-1.5 transition-colors hover:text-plum"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{site.contact.phone}</span>
            </a>
            <a
              href={mailHref}
              className="flex items-center gap-1.5 transition-colors hover:text-plum"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{site.contact.email}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container-prose flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/logo.png" alt="logo" height={60} width={60} />
          <span className="hidden font-serif text-base lg:text-lg tracking-wide text-plum font-semibold sm:inline">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              // Hover or keyboard focus opens the menu; no JS needed.
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-haspopup="true"
                  className="flex items-center gap-1 py-2 text-sm text-muted transition-colors hover:text-foreground group-focus-within:text-foreground"
                >
                  {item.label}
                  <ChevronDown aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-[200px] rounded-md border border-ink-line bg-surface p-2 shadow-lg shadow-plum/10">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded px-3 py-2 text-sm text-muted transition-colors hover:bg-cream-warm hover:text-foreground focus:bg-cream-warm focus:text-foreground focus:outline-none"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/results"
            className="rounded-md border border-plum/30 bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-plum hover:bg-plum hover:text-cream"
          >
            Result Checker
          </Link>
          <Link
            href="/admissions"
            className="rounded-md bg-plum px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-plum-deep"
          >
            Apply
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="relative grid h-10 w-10 place-items-center lg:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: -4 }}
            transition={{ type: "spring", bounce: 0.1 }}
            className="absolute h-[1.5px] w-6 rounded-full bg-plum"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="absolute h-[1.5px] w-6 rounded-full bg-plum"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 4 }}
            transition={{ type: "spring", bounce: 0.1 }}
            className="absolute h-[1.5px] w-6 rounded-full bg-plum"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 top-20 z-30 overflow-y-auto bg-white lg:hidden"
          >
            <motion.nav
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="container-prose flex flex-col gap-1 py-6 bg-white min-h-screen"
            >
              {navItems.map((item) => (
                <div key={item.href} className="border-b border-ink-line py-4">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-2xl text-foreground"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      {item.children
                        .filter((child) => child.href !== item.href)
                        .map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="text-sm text-muted transition-colors hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/admissions"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md bg-plum py-3.5 text-sm font-medium text-cream"
                >
                  Apply
                </Link>
                <Link
                  href="/results"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md border border-plum/30 py-3.5 text-sm font-medium text-foreground"
                >
                  Result Checker
                </Link>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-ink-line pt-6 text-sm text-muted">
                <a href={telHref} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  {site.contact.phone}
                </a>
                <a href={mailHref} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  {site.contact.email}
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{site.contact.address}</span>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
