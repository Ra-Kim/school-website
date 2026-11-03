"use server";

import { formSchemas, type FormKind } from "@/lib/schemas/forms";
import { resend, ADMISSIONS_INBOX, SENDER_EMAIL } from "@/lib/resend";
import { site } from "@/content/site";

/**
 * One server action for the smaller website forms (visit, story, alumni).
 * Same flow as the admissions enquiry: re-validate, drop honeypot hits,
 * email the school (reply-to = the sender), then confirm to the sender.
 */

export type FormResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[] | undefined> };

type Copy = {
  subject: (d: Record<string, unknown>) => string;
  heading: string;
  confirmSubject: string;
  confirmBody: string;
  labels: Record<string, string>;
};

const copy: Record<FormKind, Copy> = {
  visit: {
    subject: (d) => `Visit request: ${d.preferredDate} — ${d.name}`,
    heading: "New school visit request",
    confirmSubject: `Your visit request — ${site.name}`,
    confirmBody:
      "Thank you for asking to visit. We'll call or email within two working days to confirm a time that works.",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      preferredDate: "Preferred date",
      preferredTime: "Preferred time",
      childAge: "Child's age group",
      visitors: "Number of visitors",
      message: "Notes",
    },
  },
  story: {
    subject: (d) => `New story to share: ${d.role} — ${d.name}`,
    heading: "New testimonial submission",
    confirmSubject: `Thank you for your story — ${site.name}`,
    confirmBody:
      "Thank you for taking the time to share your experience. We read every story, and we'll let you know if we feature yours on the website.",
    labels: {
      name: "Name",
      email: "Email",
      role: "Relationship to the school",
      story: "Story",
      publishConsent: "OK to publish with name",
    },
  },
  alumni: {
    subject: (d) => `Alumni registration: ${d.name} (${d.sectionLeft}, ${d.yearLeft})`,
    heading: "New alumni registration",
    confirmSubject: `Welcome back — ${site.name} alumni`,
    confirmBody:
      "Thank you for registering. It's wonderful to hear from former students, and we'll keep you posted with school news and reunions.",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone / WhatsApp",
      yearLeft: "Year left",
      sectionLeft: "Left from",
      occupation: "What they do now",
      location: "Where they live",
      message: "Message",
      directoryConsent: "OK to list in alumni directory",
    },
  },
};

export async function submitWebsiteForm(kind: FormKind, formData: FormData): Promise<FormResult> {
  const schema = formSchemas[kind];
  if (!schema) return { ok: false, error: "Unknown form." };

  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data as Record<string, unknown> & { name: string; email: string; _company?: string };
  if (data._company) return { ok: true };

  const c = copy[kind];
  try {
    await resend.emails.send({
      from: `${site.name} Website <${SENDER_EMAIL}>`,
      to: ADMISSIONS_INBOX,
      replyTo: data.email,
      subject: c.subject(data),
      html: renderInternal(c, data),
    });
    await resend.emails.send({
      from: `${site.name} <${SENDER_EMAIL}>`,
      to: data.email,
      subject: c.confirmSubject,
      html: renderConfirmation(c, data.name),
    });
    return { ok: true };
  } catch (err) {
    console.error(`Resend error (${kind}):`, err);
    return {
      ok: false,
      error: `We couldn't send this just now. Please try again, or call us on ${site.contact.phone}.`,
    };
  }
}

function display(value: unknown) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return escape(String(value ?? "")).replace(/\n/g, "<br>");
}

function renderInternal(c: Copy, data: Record<string, unknown>) {
  const rows = Object.entries(c.labels)
    .filter(([key]) => data[key] !== undefined && data[key] !== "")
    .map(
      ([key, label]) =>
        `<tr><td style="padding: 8px 12px 8px 0; color: #6b6b6b; width: 180px; vertical-align: top;">${label}</td><td style="padding: 8px 0;">${display(data[key])}</td></tr>`,
    )
    .join("");
  return `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; line-height: 1.6;">
      <h2 style="color: #2A1B3D; margin: 0 0 16px;">${c.heading}</h2>
      <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      <p style="margin-top: 20px; color: #6b6b6b; font-size: 13px;">Reply to this email to respond directly.</p>
    </div>
  `;
}

function renderConfirmation(c: Copy, name: string) {
  return `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; line-height: 1.6; color: #2A1B3D;">
      <p>Dear ${escape(name.split(" ")[0])},</p>
      <p>${c.confirmBody}</p>
      <p>If you need us sooner, please call ${escape(site.contact.phone)}.</p>
      <p>Warm regards,<br/>${escape(site.name)}</p>
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
