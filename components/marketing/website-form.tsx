"use client";

import { useState, useTransition } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemas, type FormKind } from "@/lib/schemas/forms";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { submitWebsiteForm, type FormResult } from "@/app/(marketing)/forms/actions";
import { cn } from "@/lib/cn";

/**
 * Config-driven form for the visit / story / alumni forms. Pages pass a
 * list of fields; validation comes from the matching zod schema, so the
 * client and the server action always agree.
 */

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "select" | "textarea" | "checkbox";
  options?: readonly string[];
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  /** Span both columns on wide screens. */
  wide?: boolean;
  min?: string | number;
  max?: string | number;
  defaultValue?: string | number;
};

export function WebsiteForm({
  kind,
  fields,
  submitLabel,
  successTitle = "Thank you.",
  successBody,
  note,
}: {
  kind: FormKind;
  fields: FormField[];
  submitLabel: string;
  successTitle?: string;
  successBody: string;
  note?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  const defaultValues = Object.fromEntries(
    fields.map((f) => [f.name, f.type === "checkbox" ? false : (f.defaultValue ?? "")]),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchemas[kind]),
    defaultValues,
  });

  const onSubmit = handleSubmit((data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    startTransition(async () => {
      const r = await submitWebsiteForm(kind, fd);
      setResult(r);
      if (r.ok) reset(defaultValues);
    });
  });

  if (result?.ok) {
    return (
      <div className="rounded-md border border-accent/30 bg-rose-tint p-8 text-center" role="status">
        <p className="font-serif text-2xl text-foreground">{successTitle}</p>
        <p className="mt-3 text-base text-muted">{successBody}</p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-6 border-b border-accent pb-1 text-sm text-foreground transition-colors hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  const serverErrors = result && !result.ok ? result.fieldErrors : undefined;
  const errorFor = (name: string) =>
    (errors[name]?.message as string | undefined) ?? serverErrors?.[name]?.[0];

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={`${kind}-_company`}>
          Company (leave blank)
          <input id={`${kind}-_company`} type="text" tabIndex={-1} autoComplete="off" {...register("_company")} />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fields.map((f) => {
          const id = `${kind}-${f.name}`;
          const error = errorFor(f.name);

          if (f.type === "checkbox") {
            return (
              <div key={f.name} className="md:col-span-2">
                <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
                  <input
                    id={id}
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 accent-[#2A1B3D]"
                    {...register(f.name)}
                  />
                  <span>{f.label}</span>
                </label>
                {error && <p className="mt-2 text-xs text-accent">{error}</p>}
              </div>
            );
          }

          return (
            <div key={f.name} className={cn((f.wide || f.type === "textarea") && "md:col-span-2")}>
              <Field label={f.label} htmlFor={id} required={f.required} error={error}>
                {f.type === "select" ? (
                  <Select id={id} defaultValue={f.defaultValue ?? ""} {...register(f.name)}>
                    <option value="" disabled>
                      {f.placeholder ?? "Choose one"}
                    </option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </Select>
                ) : f.type === "textarea" ? (
                  <Textarea id={id} placeholder={f.placeholder} {...register(f.name)} />
                ) : (
                  <Input
                    id={id}
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    placeholder={f.placeholder}
                    min={f.min}
                    max={f.max}
                    defaultValue={f.defaultValue}
                    {...register(f.name)}
                  />
                )}
              </Field>
            </div>
          );
        })}
      </div>

      {result && !result.ok && (
        <p className="rounded-md border border-accent/40 bg-rose-tint px-4 py-3 text-sm text-foreground" role="alert">
          {result.error}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : submitLabel}
        </Button>
        {note && <p className="text-xs text-ink-subtle">{note}</p>}
      </div>
    </form>
  );
}
