"use server";

import { admissionsEnquirySchema } from "@/lib/schemas/admissions";
import { resend, ADMISSIONS_INBOX, SENDER_EMAIL } from "@/lib/resend";
import { site } from "@/content/site";

/**
 * Server action — runs on the server, never ships to the client.
 *
 * Why a server action vs an API route:
 *   - One less file. Form imports it directly, types stay in sync.
 *   - No public endpoint surface for bots to hammer.
 *   - Built-in CSRF protection via Next.js framework.
 *
 * What this does:
 *   1. Re-validates input on the server (clients lie)
 *   2. Drops anything that triggered the honeypot
 *   3. Sends two emails:
 *      - to the school admissions inbox (the actual lead)
 *      - to the parent, confirming we received it
 *   4. Returns a serializable result so the client can show success/error
 *
 * Phase 3 will add: write to a CRM table for the platform's lead pipeline.
 */

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitAdmissionsEnquiry(
  formData: FormData,
): Promise<EnquiryResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = admissionsEnquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot trip — silently succeed so bots don't learn to bypass it
  if (data._company) return { ok: true };

  try {
    // Internal lead notification
    await resend.emails.send({
      from: `${site.name} Website <${SENDER_EMAIL}>`,
      to: ADMISSIONS_INBOX,
      replyTo: data.email,
      subject: `New enquiry: ${data.reason} — ${data.parentName}`,
      html: renderInternalEmail(data),
    });

    // Parent confirmation
    await resend.emails.send({
      from: `${site.name} <${SENDER_EMAIL}>`,
      to: data.email,
      subject: `We've received your enquiry — ${site.name}`,
      html: renderConfirmationEmail(data),
    });

    return { ok: true };
  } catch (err) {
    console.error("Resend error:", err);
    return {
      ok: false,
      error:
        "We couldn't send your enquiry just now. Please try again, or email us directly.",
    };
  }
}

function renderInternalEmail(data: {
  parentName: string;
  email: string;
  phone: string;
  childAge: string;
  reason: string;
  message?: string;
}) {
  return `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; line-height: 1.6;">
      <h2 style="color: #2A1B3D; margin: 0 0 16px;">New admissions enquiry</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 12px 8px 0; color: #6b6b6b; width: 140px;">Name</td><td style="padding: 8px 0;"><strong>${escape(data.parentName)}</strong></td></tr>
        <tr><td style="padding: 8px 12px 8px 0; color: #6b6b6b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escape(data.email)}">${escape(data.email)}</a></td></tr>
        <tr><td style="padding: 8px 12px 8px 0; color: #6b6b6b;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escape(data.phone)}">${escape(data.phone)}</a></td></tr>
        <tr><td style="padding: 8px 12px 8px 0; color: #6b6b6b;">Child age</td><td style="padding: 8px 0;">${escape(data.childAge)}</td></tr>
        <tr><td style="padding: 8px 12px 8px 0; color: #6b6b6b;">Reason</td><td style="padding: 8px 0;">${escape(data.reason)}</td></tr>
      </table>
      ${
        data.message
          ? `<div style="margin-top: 20px; padding: 16px; background: #FDFBF7; border-left: 3px solid #C4477A; border-radius: 4px;"><p style="margin: 0; color: #2A1B3D;">${escape(data.message).replace(/\n/g, "<br>")}</p></div>`
          : ""
      }
    </div>
  `;
}

function renderConfirmationEmail(data: { parentName: string; reason: string }) {
  return `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; line-height: 1.6; color: #2A1B3D;">
      <p>Dear ${escape(data.parentName.split(" ")[0])},</p>
      <p>Thank you for your enquiry. We've received your message and a member of our admissions team will be in touch within two working days.</p>
      <p>If your enquiry is urgent, please call us on ${escape(site.contact.phone)}.</p>
      <p>Warm regards,<br/>The Admissions Team<br/>${escape(site.name)}</p>
    </div>
  `;
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
