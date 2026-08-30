"use client";

import Link from "next/link";
import { Container, CTAButton, Section } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import type { Recipe } from "@/lib/recipes";

export function RecipeDetailContent({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <section className="bg-pantri-background pt-8 pb-4">
        <Container>
          <p className="text-sm text-pantri-muted">
            <Link href="/recipes" className="font-medium text-pantri-accent hover:underline">
              Recipes
            </Link>
            {" / "}
            <span className="text-pantri-foreground">{recipe.title}</span>
          </p>
        </Container>
      </section>

      <Section className="pt-4!">
        <div className="grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <div
              className={`flex aspect-4/3 items-end rounded-2xl border border-pantri-border bg-linear-to-br ${recipe.gradient} p-6`}
            >
              <span className="rounded-full bg-pantri-surface/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pantri-accent">
                {recipe.tag}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="text-3xl font-bold tracking-tight text-pantri-foreground sm:text-4xl">
              {recipe.title}
            </h1>
            <p className="mt-3 text-pantri-muted">{recipe.summary}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Meta label="Time" value={`${recipe.cookTimeMinutes} min`} />
              <Meta label="Difficulty" value={recipe.difficulty} />
              <Meta label="Servings" value={`${recipe.servings}`} />
              <Meta label="Approx. kcal" value={`~${recipe.caloriesApprox}`} />
            </dl>
            <p className="mt-4 text-xs text-pantri-muted">{recipe.nutritionNote}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/shop">Shop related ingredients</CTAButton>
              <CTAButton href="/nutrition" variant="outline">
                Nutrition centre
              </CTAButton>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-pantri-foreground">Ingredients</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-pantri-muted">
              {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal>
            <h2 className="text-xl font-bold text-pantri-foreground">Steps</h2>
            <ol className="mt-4 space-y-4">
              {recipe.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-pantri-muted">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pantri-accent text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>

        <p className="mt-12 text-center text-xs text-pantri-muted">
          Nutritional values are estimates and do not replace professional medical advice.
        </p>
      </Section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-pantri-border bg-pantri-surface p-3">
      <dt className="text-xs text-pantri-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-pantri-foreground">{value}</dd>
    </div>
  );
}
