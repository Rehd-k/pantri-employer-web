"use client";

import Link from "next/link";
import { FeatureCard } from "./Cards";
import { CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const VALUE_PROPS = [
  {
    icon: "🥗",
    title: "Employee welfare",
    description:
      "Help employees manage food expenses with payroll-backed purchasing  a benefit they use every month.",
  },
  {
    icon: "📋",
    title: "Easy payroll administration",
    description:
      "Structured deduction schedules that fit your payroll calendar. Clear amounts, clear timing.",
  },
  {
    icon: "📦",
    title: "No inventory for employers",
    description:
      "Pantri handles procurement, fulfilment, and delivery. You do not stock or warehouse food.",
  },
  {
    icon: "🤝",
    title: "Employee retention",
    description:
      "A practical food benefit employees actually use  not another unused perk on paper.",
  },
  {
    icon: "📊",
    title: "Reporting",
    description:
      "Monitor participation, active plans, and payroll deductions from one employer portal.",
  },
];

const ONBOARDING_STEPS = [
  {
    step: "01",
    title: "Contact Pantri",
    description:
      "Tell us about your organisation. Pantri (or a platform admin) creates your employer account  companies do not self-register on the website.",
    href: "/contact?topic=Employer%20enquiry" as string | null,
  },
  {
    step: "02",
    title: "Configure credit policy",
    description: "Once invited, set eligibility and exposure rules for employees in the portal.",
    href: null,
  },
  {
    step: "03",
    title: "Invite employees",
    description: "Send invites so staff can join and start shopping with payroll plans.",
    href: null,
  },
  {
    step: "04",
    title: "Employees shop via app",
    description: "Staff browse groceries and packages in the Pantri app and pay through payroll.",
    href: null,
  },
];

const DASHBOARD_STATS = [
  { label: "Employees enrolled", value: "248" },
  { label: "Active food plans", value: "186" },
  { label: "Monthly deductions", value: "₦12.4M" },
  { label: "Outstanding", value: "₦38.2M" },
];

const CHART_BARS = [
  { label: "Jan", height: "40%" },
  { label: "Feb", height: "55%" },
  { label: "Mar", height: "48%" },
  { label: "Apr", height: "70%" },
  { label: "May", height: "62%" },
  { label: "Jun", height: "85%" },
];

export function ForEmployersContent() {
  return (
    <>
      <Section dark className="py-20! sm:py-28!">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
              For employers
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              A better food benefit for your employees.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Give your employees access to affordable food purchasing without building another
              internal welfare system. Pantri handles the food; payroll handles the rest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact?topic=Employer%20enquiry" variant="secondary">
                Partner With Pantri
              </CTAButton>
              <CTAButton
                href="/contact"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white dark:border-white/40"
              >
                Book a Demo
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Pantri"
            title="Built for HR and payroll teams"
            description="A food purchasing platform with payroll-backed plans  not a loan product bolted onto your books."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_PROPS.map((prop, i) => (
            <ScrollReveal key={prop.title} className={i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : undefined}>
              <FeatureCard {...prop} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              align="left"
              eyebrow="Employer portal"
              title="See participation and deductions at a glance"
              description="Monitor enrolled employees, active food plans, and payroll exposure from one dashboard."
            />
            <div className="mt-8">
              <CTAButton href="/login">Sign in to portal</CTAButton>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="pantri-card p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-pantri-muted">
                  Illustrative preview
                </p>
                <p className="text-xs text-pantri-muted">Upcoming payroll · 28 Sep 2026</p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {DASHBOARD_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-pantri-surface-muted p-4"
                  >
                    <p className="text-xs text-pantri-muted">{stat.label}</p>
                    <p className="mt-1 text-lg font-bold text-pantri-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-3 text-xs font-medium text-pantri-muted">
                  Monthly deductions trend
                </p>
                <div className="flex h-32 items-end gap-2 rounded-xl bg-pantri-surface-muted px-3 pb-2 pt-4">
                  {CHART_BARS.map((bar) => (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-pantri-accent/80"
                        style={{ height: bar.height }}
                      />
                      <span className="text-[10px] text-pantri-muted">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-xs text-pantri-muted">
                Illustrative dashboard preview  sign in to your portal for live data.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Onboarding"
            title="How onboarding works"
            description="Four steps from company registration to employees shopping in the app."
          />
        </ScrollReveal>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ONBOARDING_STEPS.map((item, i) => (
            <ScrollReveal key={item.step}>
              <li className="pantri-card relative h-full p-6">
                <span className="text-3xl font-bold text-pantri-accent/30">{item.step}</span>
                <h3 className="mt-3 text-lg font-bold text-pantri-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pantri-muted">{item.description}</p>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-4 inline-block text-sm font-semibold text-pantri-accent hover:underline"
                  >
                    Get started →
                  </Link>
                ) : null}
                {i < ONBOARDING_STEPS.length - 1 ? (
                  <span className="absolute top-8 -right-3 hidden text-pantri-border lg:block">
                    →
                  </span>
                ) : null}
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      <Section dark>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <ScrollReveal>
            <SectionHeading
              light
              align="left"
              eyebrow="HR & payroll"
              title="Built to fit your payroll process"
              description="Learn how Pantri deductions integrate with HR and payroll workflows  schedules, approvals, and reconciliation."
            />
          </ScrollReveal>
          <ScrollReveal>
            <CTAButton href="/hr-payroll" variant="secondary">
              Explore HR & payroll
            </CTAButton>
          </ScrollReveal>
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pantri-foreground">
              Ready to partner with Pantri?
            </h2>
            <p className="mt-4 text-lg text-pantri-muted">
              Contact Pantri to onboard your organisation, or book a demo with our team.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact?topic=Employer%20enquiry">Partner With Pantri</CTAButton>
              <CTAButton href="/contact" variant="outline">
                Book a Demo
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
