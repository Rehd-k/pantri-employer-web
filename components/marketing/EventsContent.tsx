"use client";

import { EventPlannerForm } from "./events/EventPlannerForm";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { EVENT_TYPES } from "@/lib/event-planner";

const EVENT_ICONS: Record<string, string> = {
  Wedding: "💍",
  Burial: "🕯",
  "Naming Ceremony": "👶",
  Birthday: "🎂",
  "Traditional Marriage": "🎎",
  "Church Event": "⛪",
  "Corporate Event": "🏢",
};

export function EventsContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-12 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Event planner
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Planning an event? Let Pantri handle the food list.
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Get a quick estimate for Nigerian celebrations  then shop packages or talk to Pantri
                for a real quote.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {EVENT_TYPES.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1.5 rounded-full border border-pantri-border bg-pantri-surface px-3 py-1.5 text-xs font-medium text-pantri-muted"
                  >
                    <span aria-hidden>{EVENT_ICONS[type]}</span>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Interactive demo"
            title="Build your food estimate"
            description="Client-side estimator  not a guaranteed quote. Final quantities depend on menu, region, and catalogue."
          />
        </ScrollReveal>
        <EventPlannerForm />
        <p className="mt-8 text-center text-xs leading-relaxed text-pantri-muted">
          Estimates are illustrative. Final quantities depend on menu, region, and Pantri catalog
          availability. Eligible employees may use payroll payment plans in the app.
        </p>
        <div className="mt-6 flex justify-center">
          <CTAButton href="/contact" variant="ghost">
            Talk to Pantri →
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
