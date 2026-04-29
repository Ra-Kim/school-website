import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Two button variants, that's it. Keeping the surface tiny.
 *
 *   primary    — filled plum, the main action on a page (Apply, Submit)
 *   ghost      — underlined link style with rose underline (Read more, etc)
 *
 * If you find yourself wanting a third variant, ask whether it actually
 * needs to look different or whether you're just decorating. Marketing
 * sites win by repetition, not variation.
 */

type Variant = "primary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-md bg-plum px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-plum-deep disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:
    "inline-flex items-center gap-2 border-b border-accent pb-1 text-sm text-foreground transition-colors hover:text-accent",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  external?: boolean;
};

export function ButtonLink({
  variant = "primary",
  className,
  href,
  external,
  ...props
}: ButtonLinkProps) {
  const classes = cn(variantClasses[variant], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...props}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}
