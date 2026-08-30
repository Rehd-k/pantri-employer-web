"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ContactForm, CONTACT_TOPICS } from "./ContactForm";
import { Container, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const DETAILS = [
  { label: "Email", value: "support@pantri.app", href: "mailto:support@pantri.app" },
  { label: "Phone", value: "+234 (placeholder)", href: null },
  { label: "WhatsApp", value: "Chat with us", href: "#" },
  { label: "Office", value: "Lagos, Nigeria", href: null },
  { label: "Support hours", value: "Mon–Fri 9am–6pm WAT", href: null },
];

export function ContactContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-10 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Contact
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Get in touch
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Employer onboarding, payroll questions, or general support — send a message and our
                team will respond within one business day.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CONTACT_TOPICS.map((topic) => (
            <Link
              key={topic}
              href={`/contact?topic=${encodeURIComponent(topic)}`}
              className="rounded-full border border-pantri-border bg-pantri-surface px-4 py-2 text-xs font-semibold text-pantri-foreground hover:border-pantri-accent/40"
            >
              {topic}
            </Link>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <Suspense
              fallback={
                <div className="pantri-card h-96 animate-pulse bg-pantri-surface-muted" />
              }
            >
              <ContactForm />
            </Suspense>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <SectionHeading
                align="left"
                title="Other ways to reach us"
                description="Placeholders until live channels are published."
              />
              <ul className="space-y-4">
                {DETAILS.map((item) => (
                  <li key={item.label} className="pantri-card p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-pantri-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-sm font-semibold text-pantri-accent hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-pantri-foreground">
                        {item.value}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-pantri-muted">
                New employer? Organisations are onboarded by Pantri —{" "}
                <Link
                  href="/contact?topic=Employer%20enquiry"
                  className="font-semibold text-pantri-accent hover:underline"
                >
                  start an employer enquiry
                </Link>
                . Existing employers can{" "}
                <Link href="/login" className="font-semibold text-pantri-accent hover:underline">
                  sign in
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
