"use client";

import { useMemo, useState } from "react";
import { Container, CTAButton, Section } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq";

const CATEGORIES: { id: string; label: string; match: (item: FaqItem) => boolean }[] = [
  {
    id: "getting-started",
    label: "Getting started",
    match: (item) =>
      ["What is Pantri?", "Who can use Pantri?", "Does my employer need to participate?"].includes(
        item.q,
      ),
  },
  {
    id: "orders",
    label: "Orders",
    match: (item) =>
      [
        "When do I receive my food?",
        "Can I cancel an order?",
        "How does delivery work?",
        "How does Pantri handle fresh food?",
        "How does Pantri handle refunds?",
        "Can I customize my package?",
        "Can I buy food for an event?",
        "Can I buy individual groceries?",
      ].includes(item.q),
  },
  {
    id: "payments",
    label: "Payments",
    match: (item) =>
      [
        "How does payroll deduction work?",
        "What payment plans are available?",
        "Is Pantri a loan?",
      ].includes(item.q),
  },
  {
    id: "employer",
    label: "Employer",
    match: (item) =>
      ["Does my employer need to participate?", "What happens if I leave my employer?"].includes(
        item.q,
      ),
  },
  {
    id: "account",
    label: "Account",
    match: (item) =>
      ["Is my financial information secure?", "Who can use Pantri?"].includes(item.q),
  },
];

export function HelpContent() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);

  const category = CATEGORIES.find((c) => c.id === categoryId) ?? CATEGORIES[0];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? FAQ_ITEMS.filter(
          (item) =>
            item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
        )
      : FAQ_ITEMS.filter(category.match);
    return base;
  }, [query, category]);

  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-10 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Help centre
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                How can we help?
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Search common questions or browse by topic. Still stuck? Contact support.
              </p>
              <div className="mx-auto mt-8 max-w-xl">
                <label className="sr-only" htmlFor="help-search">
                  Search help
                </label>
                <input
                  id="help-search"
                  type="search"
                  placeholder="Search FAQ…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pantri-input"
                />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        {!query ? (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  categoryId === cat.id
                    ? "bg-pantri-primary text-white"
                    : "border border-pantri-border bg-pantri-surface text-pantri-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl space-y-4">
          {results.length === 0 ? (
            <div className="pantri-card p-8 text-center">
              <p className="font-semibold text-pantri-foreground">No matching articles</p>
              <p className="mt-2 text-sm text-pantri-muted">Try another search or contact support.</p>
            </div>
          ) : (
            results.map((item) => (
              <details key={item.q} className="pantri-card group p-5">
                <summary className="cursor-pointer list-none font-semibold text-pantri-foreground">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-pantri-muted">{item.a}</p>
              </details>
            ))
          )}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <CTAButton href="/faq">Full FAQ</CTAButton>
          <CTAButton href="/contact" variant="outline">
            Contact support
          </CTAButton>
          <CTAButton href="/download" variant="ghost">
            Download app
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
