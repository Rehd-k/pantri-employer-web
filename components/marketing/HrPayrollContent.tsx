"use client";

import { FeatureCard } from "./Cards";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const FEATURES = [
  {
    icon: "✅",
    title: "Employee verification",
    description:
      "Confirm staff against your roster before payroll plans unlock  each employer stays in their own tenant boundary.",
  },
  {
    icon: "📅",
    title: "Deduction schedules",
    description:
      "Support 5- or 6-month plans with clear installment amounts that map to your payroll calendar.",
  },
  {
    icon: "📤",
    title: "Payroll reports & CSV exports",
    description:
      "Export deduction files for your payroll run so finance teams can reconcile without retyping.",
  },
  {
    icon: "✔️",
    title: "Approval workflows",
    description:
      "Review and approve orders or exceptions before deductions hit the next payroll cycle.",
  },
  {
    icon: "⚠️",
    title: "Exception handling",
    description:
      "Flag mismatches, failed deductions, and edge cases so payroll admins can resolve them quickly.",
  },
  {
    icon: "👤",
    title: "Employee status",
    description:
      "Track active, frozen, and departed employees so eligibility and deductions stay accurate.",
  },
  {
    icon: "💰",
    title: "Outstanding deductions",
    description:
      "See what remains on each plan  balances, months left, and exposure at a glance.",
  },
  {
    icon: "📜",
    title: "Audit history",
    description:
      "A trail of policy changes, approvals, and payroll actions for compliance and internal review.",
  },
];

const MOCK_RUNS = [
  { period: "Sep 2026", employees: 186, amount: "₦12.4M", status: "Ready" },
  { period: "Aug 2026", employees: 178, amount: "₦11.9M", status: "Exported" },
  { period: "Jul 2026", employees: 171, amount: "₦11.2M", status: "Exported" },
];

export function HrPayrollContent() {
  return (
    <>
      <Section dark className="py-20! sm:py-28!">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/70">
              HR & payroll
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Designed for the people who run payroll.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Pantri deductions plug into your existing payroll process  schedules, exports, and
              approvals  without mixing data across employers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact?topic=Payroll" variant="secondary">
                Talk to Our Payroll Team
              </CTAButton>
              <CTAButton
                href="/login"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white dark:border-white/40"
              >
                Sign in to portal
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="What payroll admins get"
            description="Tools for verification, schedules, and reconciliation  scoped to your organisation only."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <ScrollReveal key={f.title}>
              <FeatureCard {...f} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              align="left"
              eyebrow="Portal preview"
              title="Payroll runs at a glance"
              description="Illustrative mock of the payroll runs view  live data appears after Pantri onboards your organisation."
            />
            <div className="mt-6 flex flex-wrap gap-4">
              <CTAButton href="/login">Existing partners: sign in</CTAButton>
              <CTAButton href="/for-employers" variant="outline">
                For employers
              </CTAButton>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="pantri-card overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-pantri-border bg-pantri-surface-muted px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-pantri-muted">
                  Payroll runs · Illustrative
                </p>
                <span className="rounded-full bg-pantri-accent/15 px-2 py-0.5 text-[10px] font-semibold text-pantri-accent">
                  Preview
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-pantri-border text-xs text-pantri-muted">
                      <th className="px-4 py-3 font-medium">Period</th>
                      <th className="px-4 py-3 font-medium">Employees</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_RUNS.map((run) => (
                      <tr key={run.period} className="border-b border-pantri-border last:border-0">
                        <td className="px-4 py-3 font-medium text-pantri-foreground">
                          {run.period}
                        </td>
                        <td className="px-4 py-3 text-pantri-muted">{run.employees}</td>
                        <td className="px-4 py-3 text-pantri-foreground">{run.amount}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              run.status === "Ready"
                                ? "bg-pantri-accent/15 text-pantri-accent"
                                : "bg-pantri-surface-muted text-pantri-muted"
                            }`}
                          >
                            {run.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-pantri-border px-4 py-3 text-xs text-pantri-muted">
                Each employer only sees their own payroll data. CSV export available in the live
                portal.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-pantri-foreground">
              Ready to talk payroll?
            </h2>
            <p className="mt-4 text-lg text-pantri-muted">
              Organisations are onboarded by Pantri. Contact our payroll team to discuss schedules,
              exports, and how deductions fit your process.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="/contact?topic=Payroll">Talk to Our Payroll Team</CTAButton>
              <CTAButton href="/login" variant="outline">
                Sign in
              </CTAButton>
            </div>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
