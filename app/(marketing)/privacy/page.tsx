import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton, Section } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy — Pantri",
  description: "Placeholder privacy policy for Pantri. Full legal text will be published here.",
};

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-pantri-accent">Legal</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-pantri-foreground">
          Privacy Policy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-pantri-muted">
          This page is a placeholder. Pantri&apos;s full privacy policy — covering how we collect,
          use, and protect account, order, and employer-related information — will be published here
          before public launch.
        </p>
        <p className="mt-4 text-base leading-relaxed text-pantri-muted">
          Until then, contact{" "}
          <a href="mailto:support@pantri.app" className="font-semibold text-pantri-accent hover:underline">
            support@pantri.app
          </a>{" "}
          with privacy questions.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton href="/contact">Contact us</CTAButton>
          <CTAButton href="/terms" variant="outline">
            Terms of use
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
