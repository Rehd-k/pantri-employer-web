"use client";

import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const ECOSYSTEM = [
  "Farm",
  "Procurement",
  "Processing",
  "Packaging",
  "Warehouse",
  "Pantri",
  "Your Home",
];

const FUTURE = [
  {
    title: "Food processing",
    description: "Closer control of quality and pack formats for household staples.",
  },
  {
    title: "Pantri-branded products",
    description: "Trusted everyday items under the Pantri name — when the time is right.",
  },
  {
    title: "Farmer & supplier network",
    description: "Deeper relationships from farm to kitchen so prices and supply stay predictable.",
  },
];

const VALUES = [
  { title: "Trust", description: "Clear plans, honest limits, and employer-backed access." },
  { title: "Food", description: "Real groceries and packages people cook with every week." },
  { title: "Affordability", description: "Bulk buying power and payroll-friendly payment plans." },
  { title: "Intelligence", description: "Technology that makes shopping and planning simpler." },
  { title: "Convenience", description: "From catalogue to fulfilment without reinventing payroll." },
  { title: "Family", description: "Built around households, celebrations, and everyday meals." },
];

export function AboutContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                About Pantri
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Better food. Smarter living.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pantri-muted">
                Pantri is a food purchasing platform with payroll-backed payment plans — helping
                employees get the food they need today and pay through salary.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our story"
            title="Food is essential — buying enough at once shouldn&apos;t be so hard"
            description="Pantri begins with a simple idea: by combining technology, bulk purchasing, and employer payroll systems, food purchasing becomes easier and more predictable."
          />
        </ScrollReveal>
        <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-pantri-muted">
          <p>
            Households know the pressure of restocking rice, oil, protein, and the extras that make a
            home run. Waiting for payday — or stretching a basket too thin — shouldn&apos;t decide
            what&apos;s on the table.
          </p>
          <p>
            Pantri partners with employers so eligible employees can shop groceries, family packages,
            and event supplies, then spread the cost through authorized payroll deductions. We are a
            food platform first — not a personal loan product.
          </p>
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Ecosystem"
            title="From farm to your home"
            description="How we think about the path food takes — today and as Pantri grows."
          />
        </ScrollReveal>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          {ECOSYSTEM.map((node, i) => (
            <div key={node} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
                  node === "Pantri"
                    ? "border-pantri-accent bg-pantri-accent text-white"
                    : "border-pantri-border bg-pantri-surface text-pantri-foreground"
                }`}
              >
                {node}
              </div>
              {i < ECOSYSTEM.length - 1 ? (
                <span className="hidden text-pantri-muted sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Our long-term vision"
            title="From your pantry to the farm."
            description="Aspirations for the future — not facilities or brands we claim to operate today."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {FUTURE.map((item) => (
            <ScrollReveal key={item.title}>
              <div className="pantri-card relative h-full p-6">
                <span className="absolute right-4 top-4 rounded-full bg-pantri-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-pantri-primary">
                  Vision
                </span>
                <h3 className="pr-16 text-lg font-bold text-pantri-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Values"
            title="What we stand for"
            description="The principles that shape how we design Pantri."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <ScrollReveal key={v.title}>
              <div className="pantri-card h-full p-6">
                <h3 className="text-lg font-bold text-pantri-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{v.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section dark>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Build with Pantri</h2>
            <p className="mt-4 text-lg text-white/80">
              Employers are onboarded by our team. Careers and partnerships start with a conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact?topic=Employer%20enquiry" variant="secondary">
                Join as employer
              </CTAButton>
              <CTAButton
                href="/contact?topic=Careers"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white dark:border-white/40"
              >
                Work with us
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
