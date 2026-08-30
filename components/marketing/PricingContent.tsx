"use client";

import { FaqAccordion } from "./FaqAccordion";
import { PaymentCalculator } from "./PaymentCalculator";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { formatNaira } from "@/lib/format";
import { FAQ_PRICING } from "@/lib/faq";
import {
  PAYMENT_PLANS,
  calculatePayment,
  DEFAULT_SALARY_NAIRA,
  nairaToKobo,
} from "@/lib/marketing";

const EXAMPLE_SALARY_KOBO = nairaToKobo(DEFAULT_SALARY_NAIRA);

export function PricingContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Pricing
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Simple payment plans
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-pantri-muted">
                Spread the cost of food over 5 or 6 months through payroll  no cash upfront.
                Your food package limit is typically 1.5× your monthly salary. Not a personal loan
                product.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Plans"
            title="Choose how you pay"
            description={`Examples below use a ${formatNaira(EXAMPLE_SALARY_KOBO)} salary (FGV ${formatNaira(calculatePayment(EXAMPLE_SALARY_KOBO, PAYMENT_PLANS[0]).creditLimitKobo)}).`}
          />
        </ScrollReveal>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {PAYMENT_PLANS.map((plan) => {
            const result = calculatePayment(EXAMPLE_SALARY_KOBO, plan);
            return (
              <ScrollReveal key={plan.id}>
                <div className="pantri-card flex h-full flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-pantri-foreground">{plan.label}</h3>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-pantri-muted">Upfront</dt>
                      <dd className="font-semibold text-pantri-foreground">₦0</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-pantri-muted">Duration</dt>
                      <dd className="font-semibold text-pantri-foreground">
                        {plan.months} equal monthly deductions
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 rounded-xl bg-pantri-surface-muted p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-pantri-muted">
                      Example
                    </p>
                    <p className="mt-2 text-sm text-pantri-foreground">
                      <span className="font-bold text-pantri-accent">
                        {formatNaira(result.monthlyKobo)}
                      </span>
                      /mo × {result.months} on a{" "}
                      {formatNaira(result.creditLimitKobo)} limit
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Calculator"
            title="Try your numbers"
            description="Enter your salary to see your 1.5× food package limit and monthly deductions."
          />
        </ScrollReveal>
        <div className="mx-auto max-w-2xl">
          <PaymentCalculator />
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <div className="pantri-card mx-auto max-w-3xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-pantri-foreground">Eligibility & terms</h2>
            <p className="mt-3 text-sm leading-relaxed text-pantri-muted">
              Actual eligibility, limits, availability and terms depend on your employer and payroll
              arrangement. You generally cannot buy above your 1.5× salary limit; as deductions reduce
              what you owe, available credit returns so you can shop again up to that limit. Pantri is
              a food purchasing platform  not a personal loan product.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CTAButton href="/for-employees" variant="outline">
                For employees
              </CTAButton>
              <CTAButton href="/for-employers" variant="ghost">
                For employers
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing questions"
            description="Quick answers about plans and what Pantri is."
          />
        </ScrollReveal>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={FAQ_PRICING} />
        </div>
        <div className="mt-8 text-center">
          <CTAButton href="/faq" variant="ghost">
            View all FAQs →
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
