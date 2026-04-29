"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  admissionsEnquirySchema,
  ageGroups,
  enquiryReasons,
  type AdmissionsEnquiry,
} from "@/lib/schemas/admissions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { EnquiryResult, submitAdmissionsEnquiry } from "@/app/(marketing)/admissions/actions";

/**
 * Admissions enquiry form.
 *
 * Uses react-hook-form for client validation, then submits via the
 * server action. The action re-validates with the same zod schema.
 *
 * Honeypot field (`_company`) is hidden from real users via CSS.
 * Bots that fill every input get silently dropped server-side.
 *
 * Required setup:
 *   npm i react-hook-form @hookform/resolvers zod resend
 */
export function AdmissionsForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<EnquiryResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionsEnquiry>({
    resolver: zodResolver(admissionsEnquirySchema),
  });

  const onSubmit = handleSubmit((data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      fd.append(k, v ?? "");
    });

    startTransition(async () => {
      const r = await submitAdmissionsEnquiry(fd);
      setResult(r);
      if (r.ok) reset();
    });
  });

  if (result?.ok) {
    return (
      <div className="rounded-md border border-accent/30 bg-rose-tint p-8 text-center">
        <p className="font-serif text-2xl text-foreground">Thank you.</p>
        <p className="mt-3 text-base text-muted">
          We&apos;ve received your enquiry and a member of our admissions team will
          be in touch within two working days. A confirmation has been sent to
          your email.
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-6 border-b border-accent pb-1 text-sm text-foreground transition-colors hover:text-accent"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot — visually hidden, invisible to users, irresistible to bots */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="_company">
          Company (leave blank)
          <input
            id="_company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("_company")}
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Parent / guardian name"
          htmlFor="parentName"
          required
          error={errors.parentName?.message}
        >
          <Input
            id="parentName"
            autoComplete="name"
            {...register("parentName")}
          />
        </Field>

        <Field
          label="Email"
          htmlFor="email"
          required
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
        </Field>

        <Field
          label="Phone"
          htmlFor="phone"
          required
          error={errors.phone?.message}
        >
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
          />
        </Field>

        <Field
          label="Child's age group"
          htmlFor="childAge"
          required
          error={errors.childAge?.message}
        >
          <Select id="childAge" defaultValue="" {...register("childAge")}>
            <option value="" disabled>
              Choose age group
            </option>
            {ageGroups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="What can we help with?"
        htmlFor="reason"
        required
        error={errors.reason?.message}
      >
        <Select id="reason" defaultValue="" {...register("reason")}>
          <option value="" disabled>
            Choose a reason
          </option>
          {enquiryReasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Anything you'd like us to know"
        htmlFor="message"
        error={errors.message?.message}
      >
        <Textarea
          id="message"
          placeholder="Tell us about your child, your timing, or any specific questions."
          {...register("message")}
        />
      </Field>

      {result && !result.ok && (
        <p className="rounded-md border border-accent/40 bg-rose-tint px-4 py-3 text-sm text-foreground">
          {result.error}
        </p>
      )}

      <div className="flex items-center gap-6 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Submit enquiry"}
        </Button>
        <p className="text-xs text-ink-subtle">
          We&apos;ll only use your details to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
