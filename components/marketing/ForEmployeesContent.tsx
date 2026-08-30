"use client";

import { FaqAccordion } from "./FaqAccordion";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { FAQ_EMPLOYEE } from "@/lib/faq";

const EMPLOYEE_STEPS = [
  {
    step: "01",
    title: "Choose your food",
    description: "Browse groceries, family packages, or event supplies in the Pantri app.",
  },
  {
    step: "02",
    title: "Select your payment plan",
    description: "Pick 20% + 6 months or 25% + 5 months — whichever your employer offers.",
  },
  {
    step: "03",
    title: "Payroll authorization",
    description: "Your order is linked to your verified employer payroll arrangement.",
  },
  {
    step: "04",
    title: "Receive your food",
    description: "After initial payment and approval, Pantri fulfils your order.",
  },
  {
    step: "05",
    title: "Automatic deductions",
    description: "Remaining installments come out through payroll — no separate loan chase.",
  },
];

const ELIGIBILITY = [
  "You must work for a participating employer",
  "Your account is verified through employer / payroll onboarding",
  "Credit limits and available plans follow your employer's policy",
];

export function ForEmployeesContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                For employees
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Your salary. Your food. Your choice.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pantri-muted">
                Pantri lets you buy the food you need today and pay through your salary — a food
                purchasing platform with payroll-backed plans, not a personal loan.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTAButton href="#eligibility">Check If My Employer Participates</CTAButton>
                <CTAButton href="/contact" variant="outline">
                  Ask My Employer to Join Pantri
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works for you"
            title="Five steps from basket to payroll"
            description="Same simple flow whether you shop groceries or a family package."
          />
        </ScrollReveal>
        <ol className="relative mx-auto max-w-2xl space-y-0 border-l-2 border-pantri-border pl-8">
          {EMPLOYEE_STEPS.map((item) => (
            <li key={item.step} className="relative pb-10 last:pb-0">
              <span className="absolute left-[-2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-pantri-accent text-xs font-bold text-white">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-pantri-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pantri-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="eligibility" muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Eligibility"
            title="Can I use Pantri?"
            description="Pantri is available only through participating workplaces."
          />
        </ScrollReveal>
        <ul className="mx-auto max-w-xl space-y-4">
          {ELIGIBILITY.map((item) => (
            <li
              key={item}
              className="pantri-card flex items-start gap-3 p-4 text-sm text-pantri-foreground"
            >
              <span className="mt-0.5 text-pantri-accent">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-pantri-muted">
          Not sure if your company is onboarded? Ask HR, or tell them about Pantri.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <CTAButton href="/contact" variant="outline">
            Ask My Employer to Join Pantri
          </CTAButton>
          <CTAButton href="/how-it-works" variant="ghost">
            See how Pantri works
          </CTAButton>
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common employee questions"
            description="Straight answers about eligibility, plans, and what Pantri is — and is not."
          />
        </ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQ_EMPLOYEE} />
        </div>
        <div className="mt-8 text-center">
          <CTAButton href="/faq" variant="ghost">
            View all FAQs →
          </CTAButton>
        </div>
      </Section>

      <Section dark>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              light
              title="Order in the Pantri app"
              description="Browse on the web, then download the app to place orders with payroll payment plans."
            />
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <CTAButton href="/download" variant="secondary">
                Download Pantri
              </CTAButton>
              <CTAButton
                href="/shop"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white dark:border-white/40"
              >
                Browse the shop
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
