"use client";

import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";

const GOALS = [
  {
    icon: "⚖️",
    title: "Weight management",
    description: "Meal ideas that balance portions without extreme diets.",
  },
  {
    icon: "🥗",
    title: "Healthy eating",
    description: "Everyday plates built around whole foods you can actually buy.",
  },
  {
    icon: "💪",
    title: "High protein",
    description: "Protein-forward suggestions for busy weeks and training days.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family nutrition",
    description: "Plans that stretch across household tastes and ages.",
  },
  {
    icon: "🍬",
    title: "Low sugar",
    description: "Lower-sugar swaps and meal patterns  not medical prescriptions.",
  },
  {
    icon: "🧂",
    title: "Low sodium",
    description: "Seasoning-aware ideas for people watching salt intake.",
  },
  {
    icon: "🍽",
    title: "Balanced meals",
    description: "Simple plates with carbs, protein, and vegetables in proportion.",
  },
  {
    icon: "🏃",
    title: "Fitness",
    description: "Fuel for movement  shopping lists that match your week.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Complete a health questionnaire",
    description: "In the Pantri app, share preferences and goals so suggestions fit your life.",
  },
  {
    step: "02",
    title: "Get personalized meal suggestions",
    description: "See meal ideas tailored to your goals  general guidance, not a diagnosis.",
  },
  {
    step: "03",
    title: "Shop ingredients from your plan",
    description: "Add ingredients from your plan to your basket and pay with payroll plans where eligible.",
  },
];

export function NutritionContent() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-pantri-surface via-pantri-background to-pantri-accent/10 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Nutrition centre
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Food that fits your life.
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Pantri helps you understand what to eat, not just buy food  then shop the
                ingredients with payroll-friendly plans.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTAButton href="/download">Explore Nutrition in the App</CTAButton>
                <CTAButton href="/recipes" variant="outline">
                  Browse recipes
                </CTAButton>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <div className="border-y border-pantri-border bg-pantri-surface-muted px-4 py-4">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-pantri-muted sm:text-sm">
          Pantri provides general nutrition information and does not replace professional medical
          advice. Consult a healthcare provider for medical concerns.
        </p>
      </div>

      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Goals"
            title="Choose a direction"
            description="Pick a focus that matches how you want to eat  then explore recipes and the app."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((goal) => (
            <ScrollReveal key={goal.title}>
              <div className="pantri-card group relative h-full overflow-hidden p-6">
                <div className="absolute inset-0 bg-linear-to-br from-pantri-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative text-2xl" aria-hidden>
                  {goal.icon}
                </span>
                <h3 className="relative mt-4 text-lg font-bold text-pantri-foreground">
                  {goal.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-pantri-muted">
                  {goal.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Section muted>
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works"
            title="From goals to grocery list"
            description="Personalization lives in the Pantri app."
          />
        </ScrollReveal>
        <ol className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {STEPS.map((item) => (
            <ScrollReveal key={item.step}>
              <li className="pantri-card h-full p-6">
                <span className="text-3xl font-bold text-pantri-accent/30">{item.step}</span>
                <h3 className="mt-3 text-lg font-bold text-pantri-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-pantri-muted">{item.description}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </Section>

      <Section dark>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div className="mx-auto w-full max-w-xs">
              <div className="rounded-4xl border-4 border-white/20 bg-pantri-surface p-4 shadow-2xl">
                <div className="rounded-2xl bg-linear-to-b from-pantri-accent/20 to-pantri-primary/10 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-pantri-muted">
                    Nutrition · App preview
                  </p>
                  <p className="mt-4 text-lg font-bold text-pantri-foreground">Today&apos;s plate</p>
                  <ul className="mt-4 space-y-2 text-sm text-pantri-muted">
                    <li>Breakfast · oats & fruit</li>
                    <li>Lunch · rice, beans & greens</li>
                    <li>Dinner · grilled fish & salad</li>
                  </ul>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-pantri-border">
                    <div className="h-full w-2/3 rounded-full bg-pantri-accent" />
                  </div>
                  <p className="mt-2 text-xs text-pantri-muted">Illustrative preview only</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <SectionHeading
              light
              align="left"
              title="Explore nutrition in the app"
              description="Questionnaires, meal suggestions, and shopping lists  all in one place for eligible employees."
            />
            <div className="mt-2 flex flex-wrap gap-4">
              <CTAButton href="/download" variant="secondary">
                Explore Nutrition in the App
              </CTAButton>
              <CTAButton
                href="/recipes"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white dark:border-white/40"
              >
                Recipe ideas
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
