import { z } from "zod";

/**
 * Admissions enquiry schema. Same shape used for client-side react-hook-form
 * validation and server-side action validation. If a malicious client
 * bypasses the form, the server still rejects bad input.
 */

export const ageGroups = [
  "Early Years (2-5)",
  "Primary (6-11)",
  "Secondary (12-18)",
] as const;

export const enquiryReasons = [
  "Apply for admission",
  "Book a school visit",
  "General enquiry",
] as const;

export const admissionsEnquirySchema = z.object({
  parentName: z.string().min(2, "Please enter your name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a contact number").max(30),
  childAge: z.enum(ageGroups, {
    errorMap: () => ({ message: "Please choose your child's age group" }),
  }),
  reason: z.enum(enquiryReasons, {
    errorMap: () => ({ message: "Please choose a reason" }),
  }),
  message: z
    .string()
    .max(2000, "Please keep your message under 2000 characters")
    .optional()
    .or(z.literal("")),
  // Honeypot — real humans will leave this empty. Bots fill every field.
  _company: z.string().max(0).optional().or(z.literal("")),
});

export type AdmissionsEnquiry = z.infer<typeof admissionsEnquirySchema>;
