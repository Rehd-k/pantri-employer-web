"use client";

import { FaqAccordion } from "./FaqAccordion";
import { TestimonialCard } from "./Cards";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { FAQ_ITEMS } from "@/lib/faq";

const TRUST_ITEMS = [
  {
    icon: "🔒",
    title: "Secure payments",
    description: "Initial payments and plan confirmations use secure checkout flows in the app.",
  },
  {
    icon: "🏢",
    title: "Verified employers",
    description: "Access requires a participating employer with an authorized payroll arrangement.",
  },
  {
    icon: "👁",
    title: "Transparent pricing",
    description: "See package totals, upfront amounts, and monthly deductions before you order.",
  },
  {
    icon: "📍",
    title: "Order tracking",
    description: "Follow fulfilment and delivery status in the Pantri mobile app.",
  },
  {
    icon: "👤",
    title: "Secure account",
    description: "Your Pantri account is tied to verified workplace onboarding — not open signup alone.",
  },
  {
    icon: "🛡",
    title: "Data protection",
    description: "We handle account and order data carefully and only as needed to fulfil your purchase.",
  },
  {
    icon: "💬",
    title: "Customer support",
    description: "Get help with orders, eligibility, and payroll-plan questions via support.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Being able to stock the house and spread payments through payroll took real pressure off our month.",
    role: "Employee at a participating company",
  },
  {
    quote:
      "We wanted a food benefit staff would actually use. Pantri fit our payroll process without us running a canteen.",
    role: "HR lead at a participating employer",
  },
  {
    quote:
      "The plans are clear — I knew the upfront and the monthly amount before I confirmed the order.",
    role: "Employee using Pantri packages",
  },
  {
    quote:
      "Payroll deductions landed on schedule. No chasing a separate loan or wondering what I owed.",
    role: "Employee at a participating workplace",
  },
];

export function FaqPageContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Trust & FAQ
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Questions, answered
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pantri-muted">
                How Pantri works, who can use it, and how we keep purchases clear and secure — without
                pretending to be a loan app.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Trust"
            title="Built for clarity and care"
            description="Practical signals — not invented certifications or fake partnership badges."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="pantri-card h-full p-6">
                <span className="text-2xl" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-pantri-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pantri-muted">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-pantri-muted">
          Employer and partner logos will appear here when published — none invented for this page.
        </p>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Stories"
            title="What people say"
            description="Placeholder testimonials for layout — not attributed to real named companies."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <ScrollReveal key={t.quote}>
              <TestimonialCard quote={t.quote} role={t.role} placeholder />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Everything we get asked"
            description="Sixteen answers covering products, payroll plans, delivery, and security."
          />
        </ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <CTAButton href="/contact">Contact support</CTAButton>
          <CTAButton href="/how-it-works" variant="outline">
            How Pantri works
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
