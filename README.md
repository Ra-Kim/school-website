# School site rebuild — drop-in guide

This bundle replaces the old marketing site with a redesigned, content-driven Next.js 14 app. Drop these files into your existing repo, install a few packages, set env vars, delete the old files listed below, and you're done.

The architecture is built so phases 2 (CMS) and 3 (school management platform) plug in without rewrites.

---

## 1. Install dependencies

```bash
npm i clsx tailwind-merge tailwindcss-animate \
      react-hook-form @hookform/resolvers zod \
      resend
```

Your existing `framer-motion` and `next/font` stay. You can remove `react-multi-carousel` — the new hero doesn't need it.

---

## 2. Environment variables

Create `.env.local` at the project root:

```
NEXT_PUBLIC_SITE_URL=https://ssis.com.ng

# Resend — sign up at https://resend.com (free tier: 3000 emails/month)
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMISSIONS_INBOX=admissions@ssis.com.ng
SENDER_EMAIL=notifications@ssis.com.ng
```

**Resend setup checklist:**
1. Sign up at resend.com
2. Add your domain (ssis.com.ng) and verify via DNS records
3. Copy API key from dashboard → API Keys
4. Until your domain is verified, Resend will only deliver to your own signup email — fine for testing

When you deploy to Vercel/Netlify, add the same vars to the host's environment.

---

## 3. Replace these old files

These exist in your current codebase and should be deleted — the new files supersede them:

```
src/components/header/index.tsx        ← replaced by components/marketing/site-header.tsx
src/components/header/mobile.tsx       ← replaced by components/marketing/site-header.tsx (single component now)
src/components/hero/index.tsx          ← replaced by components/marketing/hero.tsx
src/components/about-us/index.tsx      ← replaced by components/marketing/welcome.tsx + app/(marketing)/about/page.tsx
src/components/classes/index.tsx       ← replaced by components/marketing/academics.tsx
src/components/mission/index.tsx       ← replaced by components/marketing/pillars.tsx
src/components/events/index.tsx        ← replaced by components/marketing/events-preview.tsx + app/(marketing)/events/page.tsx
src/components/contact/index.tsx       ← replaced by components/marketing/admissions-cta.tsx
src/components/contact/form.tsx        ← replaced by components/marketing/admissions-form.tsx
src/components/footer/index.tsx        ← replaced by components/marketing/site-footer.tsx
src/lib/constants.ts                   ← replaced by content/site.ts + lib/nav.ts + lib/fonts.ts
src/app/page.tsx                       ← moved to app/(marketing)/page.tsx
```

The old `src/app/page.tsx` should be removed because the new homepage lives at `src/app/(marketing)/page.tsx`. Next.js route groups (folders in parens) don't add a URL segment — the file resolves to `/`.

---

## 4. Asset placeholders to swap

The new components reference images that don't exist yet. Until you drop real photography in, you'll see broken-image placeholders against rose-tinted backgrounds — looks intentional, not broken.

```
public/hero/hero.jpg              ← Hero image, ~1600×1200, faces ideally on the right
public/about/lead.jpg             ← Wide lead photo on the About page, 16:8
public/events/placeholder-1.jpg   ← Per-event images
public/events/placeholder-2.jpg
public/events/placeholder-3.jpg
public/logo.png                   ← Used in JSON-LD structured data
public/favicon.ico
```

---

## 5. Content to update

Edit `src/content/site.ts` — that's the single source of truth for school name, contact, stats, and copy. Everything else reads from this file, so updating it once propagates everywhere.

Edit `src/content/events.ts` to add events. Edit `src/content/posts.ts` to add blog posts.

---

## 6. Routes shipping in this rebuild

```
/                       Homepage (hero → welcome → pillars → academics → events → journal → admissions CTA)
/about                  Full about page with head's welcome and stats
/admissions             Process steps + enquiry form (Resend)
/events                 All upcoming events
/events/[slug]          Single event detail
/blog                   All journal posts
/blog/[slug]            Single post
/contact                Contact details + map placeholder

/sitemap.xml            Auto-generated for SEO
/robots.txt             Auto-generated
```

---

## 7. What's wired up for SEO

- Per-page metadata via Next.js `generateMetadata`
- Open Graph tags on every page
- `EducationalOrganization` JSON-LD structured data in the marketing layout
- Dynamic `sitemap.xml` covering static pages + every event + every post
- `robots.txt` allowing all crawlers and pointing to the sitemap

After deploy: submit `https://yourdomain/sitemap.xml` to Google Search Console and Bing Webmaster Tools.

---

## 8. Phase 2 plan — Headless CMS

When you're ready (recommended: 4–8 weeks after launch, once you have real traffic and real content gaps):

- Install Payload CMS into the same repo: `npx create-payload-app@latest`
- Move the `events` and `posts` collections from TypeScript files into Payload collections
- Replace `src/content/events.ts` and `src/content/posts.ts` with thin wrappers that fetch from Payload's local API — the function signatures (`getEvents`, `getPosts`) stay the same, so nothing else in the app needs to change
- Admin lives at `/admin`; school staff log in to publish

Total work: roughly 2-3 days of focused effort.

---

## 9. Phase 3 plan — School management platform

This is the Cloudnotte-replacement work. Build it in the same monorepo under a new route group:

```
src/app/
  (marketing)/    ← what you have now
  (platform)/     ← new — student/teacher/parent portal, auth-required
    layout.tsx    ← different shell (sidebar nav, user menu)
    students/
    teachers/
    grades/
    fees/
    attendance/
```

**Build order (your priority was right):**

1. **Result checker** first. This single feature captures the entire data model: students, classes, subjects, teachers, parents, terms, grades. Once it's working for your school, every subsequent feature builds on the same tables.
2. **Fees** (manual entry + parent statements). Adds: fee categories, payments, receipts.
3. **Attendance**. Adds: attendance records, term calendar.
4. **Multi-tenancy**. Refactor for `school_id` row-level scoping. This is when you can onboard a second school.

Reasonable timeline for a focused builder: 4-6 months for steps 1-3 at one school, another 2-3 months to harden for multi-tenancy.

---

## 10. The result checker (interim)

The "Result Checker" link in the header and footer points to your Cloudnotte URL via `site.external.resultChecker` in `content/site.ts`. When phase 3's result checker ships, change one line in that file and the entire site updates.

---

## Things I deliberately removed from the old site

For the record, in case you wonder where they went:

- **The hero carousel.** Replaced with a single anchored image. Carousels reduce conversion on every UX study going back fifteen years.
- **`setPage` + `useEffect` + `getElementById` scroll handlers.** Replaced with native `<a href="#anchor">` plus `scroll-behavior: smooth` in CSS. ~80 lines of fragile code → 1 line.
- **The "Designed By Mindless Arts" footer.** When you sell this template to other schools, that credit becomes their footer. If you want a portfolio link, link to Mindless Arts from the About page or your personal site.
- **The opacity-50 disabled "Read More" buttons** on the Mission cards. Either a button works or it isn't there.
- **The `react-multi-carousel` dependency.** No carousel = no carousel library.
- **Six magic-number widths** (`w-[93%]`, `lg:w-[86%]`, `lg:w-[72%]`). One container width, defined in `tailwind.config.ts`.
