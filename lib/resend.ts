import { Resend } from "resend";

/**
 * Resend client. RESEND_API_KEY belongs in .env.local.
 *
 * Setup checklist (do this before deploying):
 *   1. npm i resend zod
 *   2. Sign up at resend.com (free tier — 3,000 emails/month, plenty)
 *   3. Add and verify your school's domain (DNS records via your registrar)
 *   4. Copy the API key, drop in .env.local as RESEND_API_KEY
 *   5. Set ADMISSIONS_INBOX in .env.local — where enquiries land
 *   6. Set SENDER_EMAIL in .env.local — must match a verified domain,
 *      e.g. "notifications@yourschool.edu.ng"
 *
 * Until the domain is verified, Resend will only deliver to your own
 * email address — fine for testing.
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

export const ADMISSIONS_INBOX =
  process.env.ADMISSIONS_INBOX ?? "increasechris124@gmail.com";

export const SENDER_EMAIL =
  process.env.SENDER_EMAIL ?? "notifications@yourschool.edu.ng";
