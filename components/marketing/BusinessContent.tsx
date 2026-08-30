"use client";

import { Container, CTAButton, Section, SectionHeading, TrustBadge } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const SEGMENTS = [
  { icon: "🏨", title: "Hotels", description: "Kitchen and guest F&B procurement at volume." },
  { icon: "🍽", title: "Restaurants", description: "Consistent supply for menus and prep." },
  { icon: "🏫", title: "Schools", description: "Cafeteria and boarding food programmes." },
  { icon: "🏥", title: "Hospitals", description: "Institutional catering and staff meals." },
  { icon: "👨‍🍳", title: "Caterers", description: "Event and contract catering supply." },
  {
    icon: "🏢",
    title: "Corporate cafeterias",
    description: "Workplace dining and pantry programmes.",
  },
  {
    icon: "🎉",
    title: "Event planners",
    description: "Large gatherings with predictable food lists.",
  },
];

const CAPABILITIES = [
  {
    title: "Bulk ordering",
    description: "Order at business scale with clear pack sizes and fulfilment windows.",
  },
  {
    title: "Contract pricing",
    description: "Negotiated rates for recurring volume  when your account is live.",
  },
  {
    title: "Scheduled deliveries",
    description: "Recurring delivery slots aligned to your kitchen or site calendar.",
  },
  {
    title: "Dedicated account manager",
    description: "A named contact for quotes, substitutions, and operational questions.",
  },
];

export function BusinessContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <TrustBadge>Corporate bulk · roadmap</TrustBadge>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Food procurement at business scale.
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                A future channel for hotels, kitchens, and institutions that need reliable bulk food
                supply  separate from Pantri&apos;s employee payroll benefit.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTAButton href="/contact?topic=Business%2FSales">Talk to Sales</CTAButton>
                <CTAButton href="/for-employers" variant="outline">
                  Looking for employee benefits?
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Who it&apos;s for"
            title="Built for institutional buyers"
            description="Segments we plan to serve  tell us your category when you contact sales."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEGMENTS.map((s) => (
            <ScrollReveal key={s.title}>
              <div className="pantri-card h-full p-6">
                <span className="text-2xl" aria-hidden>
                  {s.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold text-pantri-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{s.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="On our roadmap"
            description="These features are planned for corporate bulk  clearly labelled so nothing is oversold."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <ScrollReveal key={c.title}>
              <div className="pantri-card relative h-full p-6">
                <span className="absolute right-4 top-4 rounded-full bg-pantri-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-pantri-primary">
                  Coming soon
                </span>
                <h3 className="pr-24 text-lg font-bold text-pantri-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{c.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-pantri-muted">
          Our roadmap  capabilities ship when ready. No invented client logos or live contracts
          claimed here.
        </p>
      </Section>

      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pantri-foreground">
              Interested in bulk supply?
            </h2>
            <p className="mt-4 text-lg text-pantri-muted">
              Talk to sales about volumes, delivery sites, and timing. For employee food benefits with
              payroll plans, see For Employers instead.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact?topic=Business%2FSales">Talk to Sales</CTAButton>
              <CTAButton href="/for-employers" variant="outline">
                Employee benefit programme
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
