# Spec 08  Recipes

## Route & files

- Route: `/recipes`
- Detail: `/recipes/[slug]` (static slugs)
- Create:
  - `app/(marketing)/recipes/page.tsx`
  - `app/(marketing)/recipes/[slug]/page.tsx`
  - `lib/recipes.ts` (static recipe data)

## Purpose

Editorial recipe showcase. Demonstrates "your groceries become your meal plan."

Headline: **Your groceries become your meal plan.**

## Listing page

### Hero

- Headline + animated food-to-recipe visualization (simple CSS: ingredients list → arrow → recipe cards)

### Recipe grid

Static recipes in `lib/recipes.ts`:

- Jollof Rice, Egusi Soup, Fried Rice, Chicken Stew, Beans & Plantain, Moi Moi, Pasta, Vegetable Soup

Each card: image placeholder, title, cook time, difficulty, calories (approximate), "Cook with what I have" tag.

### CTA

Link to app for personalized suggestions → `/download`

## Detail page

Per recipe:

- Hero image
- Title, time, difficulty, servings
- Nutrition info (approximate, non-medical)
- Ingredients list
- Steps (numbered)
- Related ingredients you can buy on Pantri → `/shop`
- Disclaimer: nutritional values are estimates

## Data source

Static `lib/recipes.ts`  no backend yet.

## States

- 404 for unknown slug

## Acceptance checklist

- [ ] At least 8 recipes
- [ ] Detail pages render full content
- [ ] Mobile responsive cards
- [ ] Cross-links to `/shop`

## Dependencies

- `07-nutrition-centre.md` (optional)
