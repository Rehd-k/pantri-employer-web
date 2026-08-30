"use client";

import { Container, CTAButton, Section, SectionHeading, TrustBadge } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const INVENTORY = [
  { name: "Rice", remaining: 65, status: "ok" as const, note: "65% remaining" },
  { name: "Beans", remaining: 20, status: "low" as const, note: "20% remaining" },
  { name: "Oil", remaining: 12, status: "low" as const, note: "Low" },
  { name: "Chicken", remaining: 80, status: "ok" as const, note: "Available" },
  {
    name: "Tomatoes",
    remaining: 18,
    status: "expiring" as const,
    note: "Low  Expiring soon",
  },
];

const RECS = [
  {
    title: "Rice restock",
    copy: "You usually buy rice around this time.",
  },
  {
    title: "Cooking oil",
    copy: "You may need cooking oil soon.",
  },
  {
    title: "Tomato paste",
    copy: "Based on recent meals, tomato paste may run low this week.",
  },
];

export function PantryContent() {
  return (
    <>
      <div className="border-b border-pantri-border bg-pantri-accent/10 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-pantri-foreground">
          Coming soon in the Pantri app  roadmap preview only
        </p>
      </div>

      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <TrustBadge>Future vision</TrustBadge>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Know what&apos;s in your kitchen.
              </h1>
              <p className="mt-4 text-2xl font-semibold text-pantri-primary sm:text-3xl">
                Never run out of the things you use most.
              </p>
              <p className="mt-6 text-lg text-pantri-muted">
                A smart pantry and reorder experience planned for the Pantri mobile app  not live on
                the web today.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Demo inventory"
            title="See your staples at a glance"
            description="Static illustration  no live inventory sync on this website."
          />
        </ScrollReveal>
        <div className="mx-auto grid max-w-3xl gap-4">
          {INVENTORY.map((item) => (
            <ScrollReveal key={item.name}>
              <div className="pantri-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-pantri-foreground">{item.name}</h3>
                  <StatusBadge status={item.status} label={item.note} />
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-pantri-surface-muted">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.status === "ok"
                        ? "bg-pantri-accent"
                        : item.status === "expiring"
                          ? "bg-amber-500"
                          : "bg-orange-500"
                    }`}
                    style={{ width: `${item.remaining}%` }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Smart reorder"
            title="Gentle nudges when you might need more"
            description="Example AI-style recommendations  illustrative copy only."
          />
        </ScrollReveal>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {RECS.map((rec) => (
            <ScrollReveal key={rec.title}>
              <div className="pantri-card h-full p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-pantri-accent">
                  Suggestion
                </p>
                <h3 className="mt-2 font-bold text-pantri-foreground">{rec.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{rec.copy}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTAButton href="/download">Review Recommendations</CTAButton>
          <p className="mt-4 text-xs text-pantri-muted">
            Opens the download page  pantry features ship in the app when ready.
          </p>
        </div>
      </Section>
    </>
  );
}

function StatusBadge({
  status,
  label,
}: {
  status: "ok" | "low" | "expiring";
  label: string;
}) {
  const styles =
    status === "ok"
      ? "bg-pantri-accent/15 text-pantri-accent"
      : status === "expiring"
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
        : "bg-orange-500/15 text-orange-700 dark:text-orange-400";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles}`}>{label}</span>
  );
}
