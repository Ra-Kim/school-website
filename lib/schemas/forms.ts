import { z } from "zod";
import { site } from "@/content/site";
import { ageGroups } from "@/lib/schemas/admissions";

/**
 * Schemas for the smaller website forms: book a visit, share your story,
 * alumni registration. Shared by the client (react-hook-form) and the
 * server action, same as the admissions enquiry.
 *
 * Every schema carries the `_company` honeypot.
 */

const honeypot = z.string().max(0).optional().or(z.literal(""));
const name = z.string().trim().min(2, "Please enter your name").max(100);
const email = z.string().trim().email("Please enter a valid email");
const phone = z.string().trim().min(7, "Please enter a contact number").max(30);
const optionalText = (max: number) =>
  z.string().trim().max(max, `Please keep this under ${max} characters`).optional().or(z.literal(""));
// Checkboxes arrive as booleans from the client and as strings via FormData.
const checkbox = z.preprocess((v) => v === true || v === "true" || v === "on", z.boolean());

// ── Book a visit ─────────────────────────────────────────────────────────
export const visitTimes = ["Any time", "Morning", "Afternoon"] as const;

function isFutureWeekday(value: string) {
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const day = d.getDay();
  return d >= today && day !== 0 && day !== 6;
}

export const visitSchema = z.object({
  name,
  email,
  phone,
  preferredDate: z
    .string()
    .min(1, "Please choose a date")
    .refine(isFutureWeekday, "Please choose a weekday from today onwards"),
  preferredTime: z.enum(visitTimes),
  childAge: z.enum(ageGroups, {
    errorMap: () => ({ message: "Please choose your child's age group" }),
  }),
  visitors: z.coerce.number().int().min(1).max(6),
  message: optionalText(1000),
  _company: honeypot,
});

// ── Share your story (testimonials) ──────────────────────────────────────
export const storyRoles = ["Parent / guardian", "Current student", "Former student", "Other"] as const;

export const storySchema = z.object({
  name,
  email,
  role: z.enum(storyRoles, { errorMap: () => ({ message: "Please choose one" }) }),
  story: z
    .string()
    .trim()
    .min(30, "Please write at least a couple of sentences")
    .max(1500, "Please keep your story under 1500 characters"),
  publishConsent: checkbox.refine((v) => v, "Please tick this so we can share your story"),
  _company: honeypot,
});

// ── Alumni registration ──────────────────────────────────────────────────
const thisYear = new Date().getFullYear();
export const leavingYears = Array.from(
  { length: thisYear - site.established + 1 },
  (_, i) => String(thisYear - i),
);
export const leavingSections = ["Primary", "Secondary"] as const;

export const alumniSchema = z.object({
  name,
  email,
  phone: optionalText(30),
  yearLeft: z.string().refine((v) => leavingYears.includes(v), "Please choose a year"),
  sectionLeft: z.enum(leavingSections, { errorMap: () => ({ message: "Please choose one" }) }),
  occupation: optionalText(150),
  location: optionalText(100),
  message: optionalText(1000),
  directoryConsent: checkbox,
  _company: honeypot,
});

export const formSchemas = {
  visit: visitSchema,
  story: storySchema,
  alumni: alumniSchema,
} as const;

export type FormKind = keyof typeof formSchemas;
