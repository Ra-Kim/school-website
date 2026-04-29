import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Form primitives. All three share the same look: cream-warm fill,
 * subtle plum border, plum focus ring. No outlined-on-white look —
 * inputs read as part of the page surface, not floating over it.
 */

const baseField =
  "w-full rounded-md border border-ink-line bg-cream-warm px-4 py-3 text-sm text-foreground placeholder:text-ink-subtle transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function Field({ label, htmlFor, required, error, children }: FieldWrapperProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs uppercase tracking-eyebrow text-ink-subtle"
      >
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-accent">{error}</p>}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(baseField, className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(baseField, "min-h-[140px] resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(baseField, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = "Select";
