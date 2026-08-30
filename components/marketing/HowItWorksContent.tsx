"use client";

import { FeatureCard } from "./Cards";
import { PaymentCalculator, PaymentPlanVisual } from "./PaymentCalculator";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import {
  PAYMENT_PLANS,
  calculatePayment,
  DEFAULT_SALARY_NAIRA,
  nairaToKobo,
} from "@/lib/marketing";
import { formatNaira } from "@/lib/format";

const STEPS = [
  {
    step: "01",
    title: "Choose your food",
    description:
      "Browse everyday groceries, curated family packages, or event supplies. Pick what your household needs today  within your 1.5× salary limit.",
  },
  {
    step: "02",
    title: "Choose your payment plan",
    description:
      "Select 5 or 6 equal monthly payroll deductions. No cash upfront  the full amount is spread across your plan.",
  },
  {
    step: "03",
    title: "Get your food",
    description:
      "After employer approval, Pantri fulfils your order so you can start cooking sooner.",
  },
  {
    step: "04",
    title: "Pay through payroll",
    description:
      "Equal installments are deducted automatically through your employer's payroll. As you pay down, available credit opens again up to your limit.",
  },
];

const EXAMPLE_SALARY_KOBO = nairaToKobo(DEFAULT_SALARY_NAIRA);
const PLAN_6 = PAYMENT_PLANS[0];
const PLAN_5 = PAYMENT_PLANS[1];
const EXAMPLE_6 = calculatePayment(EXAMPLE_SALARY_KOBO, PLAN_6);
const EXAMPLE_5 = calculatePayment(EXAMPLE_SALARY_KOBO, PLAN_5);

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
                Pantri is a food purchasing platform with payroll-backed payment plansnot a
                personal loan. A full table today. Room in your paycheck for tomorrowenough
                for food, other bills, and investments that help you earn more. Stock up in
                bulk and you dodge the next price jump (spoiler: in Nigeria, it&apos;s always
                up)your food is already home.
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
            title="No cash upfront. Equal monthly deductions."
            description="Choose 5 or 6 months. Your food package limit is typically 1.5× salary. Exact options depend on your employer."
          />
        </ScrollReveal>

        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <ScrollReveal>
            <div className="pantri-card p-6">
              <h3 className="text-xl font-bold text-pantri-foreground">{PLAN_6.label}</h3>
              <p className="mt-2 text-sm text-pantri-muted">
                Longer schedule. Lower monthly deduction.
              </p>
              <p className="mt-4 text-sm text-pantri-muted">
                Example on {formatNaira(EXAMPLE_6.creditLimitKobo)} FGV (
                {formatNaira(EXAMPLE_SALARY_KOBO)} salary):
              </p>
              <p className="mt-1 text-sm font-semibold text-pantri-foreground">
                {formatNaira(EXAMPLE_6.monthlyKobo)}/mo × {EXAMPLE_6.months}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="pantri-card p-6">
              <h3 className="text-xl font-bold text-pantri-foreground">{PLAN_5.label}</h3>
              <p className="mt-2 text-sm text-pantri-muted">
                Shorter schedule. Higher monthly deduction.
              </p>
              <p className="mt-4 text-sm text-pantri-muted">
                Example on {formatNaira(EXAMPLE_5.creditLimitKobo)} FGV (
                {formatNaira(EXAMPLE_SALARY_KOBO)} salary):
              </p>
              <p className="mt-1 text-sm font-semibold text-pantri-foreground">
                {formatNaira(EXAMPLE_5.monthlyKobo)}/mo × {EXAMPLE_5.months}
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
            title="What Pantri is  and is not"
            description="We keep the messaging honest so you know exactly what you're signing up for."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          <ScrollReveal>
            <FeatureCard
              icon="🛒"
              title="Not a grocery delivery app only"
              description="Delivery may be part of fulfilment, but Pantri is built around payroll-backed purchasing  not just same-day grocery logistics."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FeatureCard
              icon="💳"
              title="Not primarily a loan app"
              description="Pantri is a food purchasing platform. Payment plans sit on payroll arrangements with your employer  not a standalone cash loan product."
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
