"use client";

import { FeatureCard } from "./Cards";
import { PaymentCalculator, PaymentPlanVisual } from "./PaymentCalculator";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { PAYMENT_PLANS, calculatePayment, nairaToKobo } from "@/lib/marketing";
import { formatNaira } from "@/lib/format";

const STEPS = [
  {
    step: "01",
    title: "Choose your food",
    description:
      "Browse everyday groceries, curated family packages, or event supplies. Pick what your household needs today.",
  },
  {
    step: "02",
    title: "Choose your payment plan",
    description:
      "Select a payroll-backed plan — typically 20% upfront over 6 months, or 25% upfront over 5 months.",
  },
  {
    step: "03",
    title: "Get your food",
    description:
      "After your initial payment and employer approval, Pantri fulfils your order so you can start cooking sooner.",
  },
  {
    step: "04",
    title: "Pay through payroll",
    description:
      "Remaining installments are deducted automatically through your employer's payroll process — no separate loan chase.",
  },
];

const EXAMPLE_KOBO = nairaToKobo(300_000);
const PLAN_20 = PAYMENT_PLANS[0];
const PLAN_25 = PAYMENT_PLANS[1];
const EXAMPLE_20 = calculatePayment(EXAMPLE_KOBO, PLAN_20);
const EXAMPLE_25 = calculatePayment(EXAMPLE_KOBO, PLAN_25);

export function HowItWorksContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                How it works
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                How Pantri Works
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pantri-muted">
                Pantri is a food purchasing platform with payroll-backed payment plans — not a
                personal loan. Get the food you need today. Pay from your salary.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTAButton href="/shop">Start Shopping</CTAButton>
                <CTAButton href="/pricing" variant="outline">
                  View payment plans
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Four steps"
            title="From basket to payroll"
            description="A simple flow designed for employees at participating workplaces."
          />
        </ScrollReveal>

        {/* Mobile vertical timeline */}
        <ol className="relative space-y-8 border-l-2 border-pantri-border pl-8 md:hidden">
          {STEPS.map((item) => (
            <li key={item.step} className="relative">
              <span className="absolute left-[-2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-pantri-accent text-xs font-bold text-white">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-pantri-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pantri-muted">{item.description}</p>
            </li>
          ))}
        </ol>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative mb-10">
            <div className="absolute top-5 right-0 left-0 h-0.5 bg-pantri-border" />
            <div className="relative grid grid-cols-4 gap-6">
              {STEPS.map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-pantri-accent text-sm font-bold text-white">
                    {item.step}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((item, i) => (
              <ScrollReveal key={item.step} className={`delay-[${i * 80}ms]`}>
                <div className="pantri-card h-full p-6">
                  <h3 className="text-lg font-bold text-pantri-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pantri-muted">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Payment plans"
            title="Pay a portion today. Spread the rest."
            description="Two common payroll plans. Exact options depend on your employer."
          />
        </ScrollReveal>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <ScrollReveal>
            <div className="pantri-card p-6">
              <h3 className="text-xl font-bold text-pantri-foreground">{PLAN_20.label}</h3>
              <p className="mt-2 text-sm text-pantri-muted">
                Lower upfront. Longer payroll schedule.
              </p>
              <p className="mt-4 text-sm text-pantri-muted">
                Example on {formatNaira(EXAMPLE_KOBO)}:
              </p>
              <p className="mt-1 text-sm font-semibold text-pantri-foreground">
                {formatNaira(EXAMPLE_20.initialKobo)} upfront ·{" "}
                {formatNaira(EXAMPLE_20.monthlyKobo)}/mo × {EXAMPLE_20.months}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="pantri-card p-6">
              <h3 className="text-xl font-bold text-pantri-foreground">{PLAN_25.label}</h3>
              <p className="mt-2 text-sm text-pantri-muted">
                Higher upfront. Fewer monthly deductions.
              </p>
              <p className="mt-4 text-sm text-pantri-muted">
                Example on {formatNaira(EXAMPLE_KOBO)}:
              </p>
              <p className="mt-1 text-sm font-semibold text-pantri-foreground">
                {formatNaira(EXAMPLE_25.initialKobo)} upfront ·{" "}
                {formatNaira(EXAMPLE_25.monthlyKobo)}/mo × {EXAMPLE_25.months}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mb-8 flex justify-center">
          <CTAButton href="/pricing" variant="outline">
            Full pricing details
          </CTAButton>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2 lg:items-start">
          <ScrollReveal>
            <PaymentPlanVisual />
          </ScrollReveal>
          <ScrollReveal>
            <PaymentCalculator />
          </ScrollReveal>
        </div>
      </Section>

      <Section dark>
        <ScrollReveal>
          <SectionHeading
            light
            title="Who can use Pantri?"
            description="Pantri is available to employees of participating employers. Your workplace must be onboarded before you can shop with payroll plans."
          />
        </ScrollReveal>
        <div className="flex flex-wrap justify-center gap-4">
          <CTAButton href="/for-employees" variant="secondary">
            Check If My Employer Participates
          </CTAButton>
          <CTAButton href="/for-employers" variant="outline" className="border-white/40 text-white hover:bg-white/10">
            I&apos;m an employer
          </CTAButton>
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Clarity"
            title="What Pantri is — and is not"
            description="We keep the messaging honest so you know exactly what you're signing up for."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          <ScrollReveal>
            <FeatureCard
              icon="🛒"
              title="Not a grocery delivery app only"
              description="Delivery may be part of fulfilment, but Pantri is built around payroll-backed purchasing — not just same-day grocery logistics."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FeatureCard
              icon="💳"
              title="Not primarily a loan app"
              description="Pantri is a food purchasing platform. Payment plans sit on payroll arrangements with your employer — not a standalone cash loan product."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FeatureCard
              icon="✅"
              title="IS: food + payroll plans"
              description="Technology-powered food purchasing with payroll payment plans so employees can stock up today and pay over time."
            />
          </ScrollReveal>
        </div>
        <div className="mt-12 text-center">
          <CTAButton href="/shop">Start Shopping</CTAButton>
        </div>
      </Section>
    </>
  );
}
