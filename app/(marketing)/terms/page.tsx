import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton, Section } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Terms of Use — Pantri",
  description: "Placeholder terms of use for Pantri. Full legal text will be published here.",
};

export default function TermsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-pantri-accent">Legal</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-pantri-foreground">
          Terms of Use
        </h1>
        <p className="mt-6 text-base leading-relaxed text-pantri-muted">
          This page is a placeholder. Pantri&apos;s full terms of use — covering website use, the
          employer portal, and food purchasing with payroll-backed payment plans — will be published
          here before public launch.
        </p>
        <p className="mt-4 text-base leading-relaxed text-pantri-muted">
          Pantri is a food purchasing platform with payroll-backed payment plans, not a personal loan
          product. Eligibility depends on participating employers.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/contact">Contact us</CTAButton>
          <CTAButton href="/privacy" variant="outline">
            Privacy policy
          </CTAButton>
        </div>
        <p className="mt-8 text-sm text-pantri-muted">
          <Link href="/" className="font-medium text-pantri-accent hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </Section>
  );
}
