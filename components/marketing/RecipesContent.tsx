"use client";

import Link from "next/link";
import { Container, CTAButton, Section, SectionHeading } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import { RECIPES } from "@/lib/recipes";

export function RecipesContent() {
  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-12 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Recipes
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Your groceries become your meal plan.
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Editorial recipes that connect everyday Pantri shopping to meals at home.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <div className="pantri-card w-full max-w-xs p-4 text-left text-sm text-pantri-muted">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pantri-accent">
                  Ingredients
                </p>
                <ul className="space-y-1">
                  <li>Rice</li>
                  <li>Tomato & pepper</li>
                  <li>Oil & seasoning</li>
                </ul>
              </div>
              <span className="text-2xl text-pantri-accent" aria-hidden>
                →
              </span>
              <div className="pantri-card w-full max-w-xs border-pantri-accent/30 p-4 text-left">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pantri-accent">
                  Tonight&apos;s meal
                </p>
                <p className="font-bold text-pantri-foreground">Jollof Rice</p>
                <p className="mt-1 text-sm text-pantri-muted">60 min · Medium</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Cookbooks"
            title="Popular Nigerian plates"
            description="Approximate times and calories  not medical advice."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {RECIPES.map((recipe) => (
            <ScrollReveal key={recipe.slug}>
              <Link
                href={`/recipes/${recipe.slug}`}
                className="pantri-card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex aspect-4/3 items-end bg-linear-to-br ${recipe.gradient} p-4`}
                >
                  <span className="rounded-full bg-pantri-surface/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-pantri-accent">
                    {recipe.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-bold text-pantri-foreground group-hover:text-pantri-primary">
                    {recipe.title}
                  </h3>
                  <p className="mt-1 text-xs text-pantri-muted">
                    {recipe.cookTimeMinutes} min · {recipe.difficulty} · ~
                    {recipe.caloriesApprox} kcal
                  </p>
                  <p className="mt-2 flex-1 text-sm text-pantri-muted">{recipe.summary}</p>
                  <span className="mt-3 text-sm font-semibold text-pantri-accent">View recipe →</span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <CTAButton href="/download">Get personalized suggestions in the app</CTAButton>
        </div>
      </Section>
    </>
  );
}
