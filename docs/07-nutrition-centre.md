# Spec 07  Nutrition Centre

## Route & files

- Route: `/nutrition`
- Create: `app/(marketing)/nutrition/page.tsx`

## Purpose

Showcase Pantri's nutrition and meal planning capabilities. Premium, health-focused design.

Headline: **Food that fits your life.**

## Sections

### Hero

- Headline + subtext: Pantri helps you understand what to eat, not just buy food.

### Goals grid

Cards for: Weight management, Healthy eating, High protein, Family nutrition, Low sugar, Low sodium, Balanced meals, Fitness.

Each card: icon, title, 1-line description.

### How it works

1. Complete health questionnaire (in app)
2. Get personalized meal suggestions
3. Shop ingredients from your plan

Reference stitch mobile designs for tone  do not copy PantryPay naming.

### App CTA

Phone mockup + **Explore Nutrition in the App** → `/download`

### Medical disclaimer (required)

> Pantri provides general nutrition information and does not replace professional medical advice. Consult a healthcare provider for medical concerns.

## Data source

Static content. Optional future: public nutrition catalog API (not yet exposed  do not block on backend).

## Acceptance checklist

- [ ] No medical claims
- [ ] Disclaimer visible above fold or in dedicated banner
- [ ] Premium food photography placeholders (unsplash-style or gradient cards)
- [ ] Links to `/recipes` and `/download`

## Dependencies

- `01-design-system.md`
