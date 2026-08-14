/**
 * Single source of truth for everything-about-the-school that appears
 * in the marketing site. When you (or a CMS) eventually drives this,
 * components import from here so the migration is one file.
 *
 * Replace the placeholders. Keep the shape.
 */

export const site = {
  name: "Sharon Stars International School",
  shortName: "SSIS",
  tagline: "Where curious minds become remarkable ones.",
  established: 2011,
  location: "Rumuagholu, Port Harcourt",

  // shown on hero + admissions
  intro:
    "Fifteen years of preparing young people for university, for work, and for the harder parts of being human.",

  // shown on About section / page
  about:
    "we believe a great education is the union of rigorous thinking, deep character, and genuine community. Our students leave us not only with the grades that open doors, but with the judgement to know which doors are worth walking through.",

  // headline stats — used in hero band and admissions page
  stats: [
    { value: "96%", label: "University placement" },
    { value: "1:12", label: "Teacher to pupil ratio" },
    { value: "15 yrs", label: "Educating young minds" },
  ],

  // three pillars (replaces the cluttered "mission" cards)
  pillars: [
    {
      title: "Academics",
      body: "A rigorous curriculum delivered by teachers who care about why a student is struggling, not just whether they passed.",
    },
    {
      title: "Character",
      body: "We teach honesty, perseverance, and care for others as deliberately as we teach algebra. They are subjects in their own right.",
    },
    {
      title: "Community",
      body: "Small classes, real relationships, and an alumni network that stays connected long after graduation.",
    },
  ],

  // school sections — replaces the "Classes" component
  programs: [
    {
      name: "Early Years",
      ageRange: "Age 2 – 5",
      summary: "Where wonder is taken seriously and learning starts with play.",
    },
    {
      name: "Primary",
      ageRange: "Age 5 – 11",
      summary: "Foundations in literacy, numeracy, and the joy of asking better questions.",
    },
    {
      name: "Secondary",
      ageRange: "Age 10 – 16",
      summary: "Preparation for WAEC, IGCSE, and the universities our students aim for.",
    },
  ],

  contact: {
    email: "info@ssis.com.ng",
    phone: "+234 9064605022",
    address: "No. 8 Deeper Life Close, off Sars Link Road, Rumuagholu, Port Harcourt",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    // From the Google Maps embed on /contact — keep in sync if the pin moves.
    geo: { latitude: 4.882347630629881, longitude: 6.981624647973694 },
    googleMapsUrl: "https://maps.app.goo.gl/H3Nkc5KCDjPkPqjz9",
  },

  // Neighbourhoods and landmarks a local parent would actually search —
  // used in JSON-LD areaServed and in on-page copy. Keep this truthful:
  // only list places the school genuinely serves or sits near.
  serviceAreas: [
    "Rumuagholu",
    "Sars Road",
    "Rumuokoro",
    "Nkpolu",
    "Sars Link Road",
    "Port Harcourt",
  ],

  social: {
    instagram: "",
    facebook: "",
  },

  // External services — keep this here so phase 3 can swap them out cleanly
  external: {
    resultChecker: "https://app.cloudnotte.com",
    parentPortal: "https://app.cloudnotte.com",
  },
} as const;

export type SiteContent = typeof site;
