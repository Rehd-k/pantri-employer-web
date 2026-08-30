"use client";

import { Container, CTAButton, Section, SectionHeading } from "@/components/marketing/primitives";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";

const STEPS = [
  {
    step: "01",
    title: "Phone number",
    description: "Create your account in the Pantri app with a mobile number you can verify.",
  },
  {
    step: "02",
    title: "Email",
    description: "Add a work or personal email for order updates and account recovery.",
  },
  {
    step: "03",
    title: "Employer",
    description: "Select your participating employer so purchases can use payroll plans.",
  },
  {
    step: "04",
    title: "Employee ID / verification",
    description: "Complete workplace verification so your employer can approve eligibility.",
  },
  {
    step: "05",
    title: "Start shopping",
    description: "Browse packages and groceries, choose a plan, and order in the app.",
  },
];

export function SignupContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Employee signup
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Join Pantri in the app
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Employee accounts are created in the mobile app  not on this website. Your employer
                must already be onboarded by Pantri.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTAButton href="/download">Download Pantri</CTAButton>
                <CTAButton href="/contact?topic=Employer%20enquiry" variant="outline">
                  Ask employer to join Pantri
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Onboarding"
            title="What signup looks like"
            description="These steps happen in the Pantri app after your workplace participates."
          />
        </ScrollReveal>
        <ol className="mx-auto max-w-2xl space-y-6 border-l-2 border-pantri-border pl-8">
          {STEPS.map((item) => (
            <li key={item.step} className="relative">
              <span className="absolute left-[-2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-pantri-accent text-xs font-bold text-white">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-pantri-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-pantri-muted">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-pantri-foreground">Employers</h2>
          <p className="mt-3 text-sm text-pantri-muted">
            Companies cannot self-register here. Contact Pantri to onboard your organisation. Once
            set up, employer users sign in at the portal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <CTAButton href="/contact?topic=Employer%20enquiry">Contact Pantri</CTAButton>
            <CTAButton href="/login" variant="outline">
              Employer login
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}
