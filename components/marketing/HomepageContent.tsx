"use client";

import { useEffect, useState } from "react";
import {
  CategoryCard,
  FeatureCard,
  PackageCard,
  PackageCardFromApi,
  TestimonialCard,
} from "./Cards";
import { FaqAccordion } from "./FaqAccordion";
import { PaymentCalculator, PaymentPlanVisual } from "./PaymentCalculator";
import { Container, CTAButton, Section, SectionHeading, TrustBadge } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { publicApi } from "@/lib/public-api";
import type { PublicPackageListItem } from "@/lib/marketing";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose your food",
    description: "Shop groceries or select a ready-made package within your 1.5× salary limit.",
  },
  {
    step: "02",
    title: "Choose your payment plan",
    description: "Pick 5 or 6 equal monthly payroll deductions  no cash upfront.",
  },
  {
    step: "03",
    title: "Get your food",
    description: "Your order is fulfilled after employer approval.",
  },
  {
    step: "04",
    title: "Pay through payroll",
    description: "Equal installments are deducted through your employer's payroll process.",
  },
];

const CATEGORIES = [
  {
    title: "Everyday Groceries",
    emoji: "🛒",
    href: "/shop",
    items: ["Rice", "Beans", "Garri", "Oil", "Flour", "Pasta", "Seasonings", "Vegetables"],
  },
  {
    title: "Family Packages",
    emoji: "👨‍👩‍👧‍👦",
    href: "/packages",
    items: ["Bachelor", "Couple", "Family of 3", "Family of 4", "Family of 5+"],
  },
  {
    title: "Protein",
    emoji: "🍗",
    href: "/shop",
    items: ["Chicken", "Beef", "Fish", "Eggs", "Seafood"],
  },
  {
    title: "Events",
    emoji: "🎉",
    href: "/events",
    items: ["Weddings", "Burials", "Naming ceremonies", "Birthdays", "Corporate events"],
  },
];

const STATIC_PACKAGES = [
  {
    name: "Bachelor",
    description: "For one person.",
    totalKobo: 80_000_00,
    itemSummary: "Essentials for solo living",
    href: "/packages",
  },
  {
    name: "Couple",
    description: "For two.",
    totalKobo: 150_000_00,
    itemSummary: "Balanced staples for two",
    href: "/packages",
  },
  {
    name: "Family of 4",
    description: "For growing families.",
    totalKobo: 300_000_00,
    itemSummary: "Monthly family essentials",
    href: "/packages",
    popular: true,
  },
  {
    name: "Custom",
    description: "Build your own package.",
    totalKobo: 200_000_00,
    itemSummary: "Choose your own items",
    href: "/packages",
  },
];

const WHY_PANTRI = [
  {
    icon: "⚡",
    title: "Get food now",
    description: "Don't wait months to build your grocery budget.",
  },
  {
    icon: "💼",
    title: "Pay through payroll",
    description: "Agreed payments handled through your employer's payroll process.",
  },
  {
    icon: "📦",
    title: "Buy in bulk",
    description: "Access better purchasing economics through Pantri's bulk procurement.",
  },
  {
    icon: "📋",
    title: "Plan smarter",
    description: "Know what your family needs before you shop.",
  },
  {
    icon: "🥗",
    title: "Eat better",
    description: "Get personalized recipes and nutrition guidance.",
  },
  {
    icon: "🏠",
    title: "One place for your food",
    description: "Shopping, planning, recipes, nutrition and deliveries in one platform.",
  },
];

export function HomepageContent() {
  const [packages, setPackages] = useState<PublicPackageListItem[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(true);

  useEffect(() => {
    publicApi
      .get<PublicPackageListItem[]>("/public/packages")
      .then(setPackages)
      .catch(() => setPackages([]))
      .finally(() => setPackagesLoading(false));
  }, []);

  const displayPackages =
    packages.length > 0
      ? packages.slice(0, 4)
      : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-white to-pantri-cream pt-12 pb-20 sm:pt-16 sm:pb-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-up">
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-pantri-charcoal sm:text-5xl lg:text-[3.25rem]">
                A full table today.{" "}
                <span className="text-pantri-primary">Room in your paycheck for tomorrow.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pantri-muted">
                Pantri helps you stock the food your household needs now, while payroll
                deductions spread the cost gently across your salaryso you can eat well,
                cover your bills, and still set money aside for investments that help you earn
                more.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="/shop">Start Shopping</CTAButton>
                <CTAButton href="/how-it-works" variant="outline">
                  See How Pantri Works
                </CTAButton>
              </div>
            </div>
            <div className="flex flex-col gap-6 lg:items-end">
              <PaymentPlanVisual />
              <PaymentCalculator />
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <Section id="how-it-works">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works"
            title="Food today. Payments made easy."
            description="Four simple steps from choosing food to payroll deductions."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((item, i) => (
            <ScrollReveal key={item.step} className={`delay-[${i * 100}ms]`}>
              <div className="relative rounded-2xl border border-pantri-border bg-pantri-surface p-6">
                <span className="text-3xl font-bold text-pantri-accent/30">{item.step}</span>
                <h3 className="mt-3 text-lg font-bold text-pantri-charcoal">{item.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* What can you buy */}
      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Shop"
            title="What can you buy?"
            description="Groceries, family packages, protein, and event supplies  all with payroll-friendly payment plans."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <ScrollReveal key={cat.title}>
              <CategoryCard {...cat} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Packages */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Packages"
            title="Built around real life."
            description="Food packages designed for different household sizes and situations."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packagesLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl border border-pantri-border bg-pantri-surface"
              />
            ))
          ) : displayPackages ? (
            displayPackages.map((pkg) => (
              <ScrollReveal key={pkg.id}>
                <PackageCardFromApi pkg={pkg} />
              </ScrollReveal>
            ))
          ) : (
            STATIC_PACKAGES.map((pkg) => (
              <ScrollReveal key={pkg.name}>
                <PackageCard {...pkg} popular={pkg.popular} />
              </ScrollReveal>
            ))
          )}
        </div>
        <div className="mt-10 text-center">
          <CTAButton href="/packages" variant="outline">
            View all packages
          </CTAButton>
        </div>
      </Section>

      {/* Why Pantri */}
      <Section muted>
        <ScrollReveal>
          <SectionHeading eyebrow="Benefits" title="Why Pantri?" />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_PANTRI.map((item) => (
            <ScrollReveal key={item.title}>
              <FeatureCard {...item} />
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* For employees */}
      <Section dark>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              light
              align="left"
              title="Your salary. Your food. Your choice."
              description="Pantri gives employees of participating organizations a simpler way to purchase essential food with equal monthly payroll deductions  no cash upfront."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="/for-employees" variant="primary">
                Check If My Employer Participates
              </CTAButton>
              <CTAButton href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-pantri-primary">
                Ask My Employer to Join
              </CTAButton>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6">
              {["Choose food", "Select payment plan", "Payroll authorization", "Receive food", "Automatic deductions"].map(
                (step, i, arr) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pantri-accent text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="font-medium">{step}</span>
                    {i < arr.length - 1 ? (
                      <span className="ml-auto hidden text-white/30 sm:inline">↓</span>
                    ) : null}
                  </div>
                ),
              )}
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* For employers */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              align="left"
              eyebrow="For employers"
              title="A better food benefit for your employees."
              description="Give your employees access to affordable food purchasing without building another internal welfare system."
            />
            <ul className="mt-6 space-y-3 text-sm text-pantri-muted">
              {[
                "Help employees manage food expenses",
                "Structured deduction schedules for payroll teams",
                "Pantri handles procurement, fulfilment and delivery",
                "A practical benefit employees actually use",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-pantri-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="/contact?topic=Employer%20enquiry">Partner With Pantri</CTAButton>
              <CTAButton href="/contact" variant="outline">
                Book a Demo
              </CTAButton>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-2xl border border-pantri-border bg-pantri-surface p-6 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-pantri-muted">
                Employer portal preview
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Employees enrolled", value: "248" },
                  { label: "Active food plans", value: "186" },
                  { label: "Monthly deductions", value: "₦12.4M" },
                  { label: "Outstanding", value: "₦38.2M" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-pantri-surface-muted p-4">
                    <p className="text-xs text-pantri-muted">{stat.label}</p>
                    <p className="mt-1 text-lg font-bold text-pantri-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-pantri-muted">
                Illustrative dashboard preview  sign in to your portal for live data.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <ScrollReveal>
          <SectionHeading title="What people are saying" />
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <TestimonialCard
              quote="I could finally buy our monthly food supplies without paying everything at once."
              role="Pantri Employee"
            />
          </ScrollReveal>
          <ScrollReveal>
            <TestimonialCard
              quote="Pantri gives our staff a practical benefit they actually use."
              role="HR Manager"
            />
          </ScrollReveal>
        </div>
      </Section>

      {/* Mobile app */}
      <Section muted>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <SectionHeading
              align="left"
              title="Everything Pantri, in your pocket."
              description="Shop, plan meals, track orders, and manage your pantry from the Pantri mobile app."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="/download">Download Pantri</CTAButton>
            </div>
            <div className="mt-6 flex gap-4">
              <span className="rounded-lg border border-pantri-border px-4 py-2 text-sm text-pantri-muted">
                App Store  coming soon
              </span>
              <span className="rounded-lg border border-pantri-border px-4 py-2 text-sm text-pantri-muted">
                Google Play  coming soon
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="mx-auto flex h-80 w-48 items-center justify-center rounded-[2.5rem] border-4 border-pantri-charcoal bg-pantri-primary/5 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pantri-accent text-white font-bold">
                  P
                </div>
                <p className="text-sm font-semibold text-pantri-charcoal">Pantri App</p>
                <p className="mt-1 text-xs text-pantri-muted">Marketplace · Packages · Nutrition</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <ScrollReveal>
          <SectionHeading title="Frequently asked questions" />
        </ScrollReveal>
        <ScrollReveal>
          <FaqAccordion />
        </ScrollReveal>
        <div className="mt-8 text-center">
          <CTAButton href="/faq" variant="ghost">
            View all FAQs →
          </CTAButton>
        </div>
      </Section>
    </>
  );
}
