"use client";

import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  { step: "1", title: "Order confirmed", icon: "✓" },
  { step: "2", title: "Preparing", icon: "🍳" },
  { step: "3", title: "Packed", icon: "📦" },
  { step: "4", title: "Dispatched", icon: "🚚" },
  { step: "5", title: "Out for delivery", icon: "📍" },
  { step: "6", title: "Delivered", icon: "🏠" },
];

const FEATURES = [
  {
    title: "Estimated delivery time",
    description: "See expected windows when you place an order in the app.",
  },
  {
    title: "Driver info",
    description: "Courier details appear in the app when your order is on the way.",
  },
  {
    title: "Live tracking",
    description: "Follow progress from warehouse to door — primarily in the Pantri app.",
  },
  {
    title: "Delivery address management",
    description: "Save and update delivery addresses on your account.",
  },
  {
    title: "OTP verification",
    description: "Confirm handoff with a one-time code where required.",
  },
  {
    title: "Proof of delivery",
    description: "Keep a record that your order arrived as expected.",
  },
];

export function DeliveryContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Delivery
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                From our warehouse to your door.
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Order on Pantri, then track fulfilment in the mobile app — from confirmation through
                delivery.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTAButton href="/download">Track orders in the app</CTAButton>
                <CTAButton href="/shop" variant="outline">
                  Browse the shop
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Journey"
            title="Every order has a clear path"
            description="Illustrative timeline of what you see as your food moves toward you."
          />
        </ScrollReveal>

        <ol className="relative mx-auto max-w-md space-y-0 border-l-2 border-pantri-accent/40 pl-8 md:hidden">
          {STEPS.map((item) => (
            <li key={item.step} className="relative pb-8 last:pb-0">
              <span className="absolute left-[-2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-pantri-accent text-xs font-bold text-white">
                {item.step}
              </span>
              <p className="text-lg" aria-hidden>
                {item.icon}
              </p>
              <h3 className="mt-1 font-bold text-pantri-foreground">{item.title}</h3>
            </li>
          ))}
        </ol>

        <div className="hidden md:block">
          <div className="relative mb-10 px-2">
            <div className="absolute top-5 right-8 left-8 h-1 overflow-hidden rounded-full bg-pantri-border">
              <div className="h-full w-full origin-left scale-x-100 rounded-full bg-pantri-accent motion-safe:animate-pulse" />
            </div>
            <div className="relative grid grid-cols-6 gap-2">
              {STEPS.map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-pantri-accent text-sm font-bold text-white shadow-md">
                    {item.step}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {STEPS.map((item) => (
              <div key={item.title} className="text-center">
                <p className="text-xl" aria-hidden>
                  {item.icon}
                </p>
                <p className="mt-2 text-xs font-semibold text-pantri-foreground sm:text-sm">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="In the app"
            title="Delivery features"
            description="Tracking and courier details live primarily in the Pantri mobile app."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <ScrollReveal key={f.title}>
              <div className="pantri-card h-full p-6">
                <span className="rounded-full bg-pantri-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-pantri-primary">
                  In app
                </span>
                <h3 className="mt-3 text-lg font-bold text-pantri-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Fresh & frozen"
            title="Care for perishables"
            description="Fresh and frozen items follow tighter windows — inventory is not unlimited."
          />
        </ScrollReveal>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            {
              title: "Delivery windows",
              copy: "Expect shorter slots for perishables. Exact times show in the app at checkout.",
            },
            {
              title: "Storage guidance",
              copy: "Refrigerate or freeze promptly on arrival. Check pack labels for keep-life tips.",
            },
            {
              title: "Availability",
              copy: "Stock depends on catalogue and location — we do not promise unlimited fresh inventory.",
            },
          ].map((card) => (
            <ScrollReveal key={card.title}>
              <div className="pantri-card h-full p-6">
                <h3 className="font-bold text-pantri-foreground">{card.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{card.copy}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTAButton href="/download">Track orders in the app</CTAButton>
        </div>
      </Section>
    </>
  );
}
