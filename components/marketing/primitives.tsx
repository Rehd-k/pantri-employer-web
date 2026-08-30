import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  id,
  className = "",
  dark = false,
  muted = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Branded navy section  same in light and dark */
  dark?: boolean;
  /** Alternate surface (e.g. white band in light, elevated in dark) */
  muted?: boolean;
}) {
  const tone = dark
    ? "bg-pantri-primary text-white"
    : muted
      ? "bg-pantri-surface"
      : "bg-pantri-background";

  return (
    <section id={id} className={`py-16 sm:py-20 ${tone} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`mb-12 max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
            light ? "text-white/70" : "text-pantri-accent"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-pantri-foreground"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/80" : "text-pantri-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-pantri-accent text-white hover:opacity-90 shadow-md hover:shadow-lg",
    secondary: "bg-pantri-primary text-white hover:opacity-90 shadow-md hover:shadow-lg",
    outline:
      "border-2 border-pantri-primary text-pantri-primary hover:bg-pantri-primary hover:text-white dark:border-pantri-primary dark:hover:text-white",
    ghost: "text-pantri-primary hover:bg-pantri-primary/10",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function TrustBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-pantri-border bg-pantri-surface/80 px-4 py-1.5 text-xs font-medium text-pantri-muted backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-pantri-accent" />
      {children}
    </span>
  );
}
