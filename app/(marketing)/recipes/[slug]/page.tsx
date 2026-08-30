import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetailContent } from "@/components/marketing/RecipeDetailContent";
import { getRecipeBySlug, RECIPES } from "@/lib/recipes";

export function generateStaticParams() {
  return RECIPES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe — Pantri" };
  return {
    title: `${recipe.title} — Pantri Recipes`,
    description: recipe.summary,
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();
  return <RecipeDetailContent recipe={recipe} />;
}
