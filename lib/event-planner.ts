import {
  calculatePayment,
  DEFAULT_SALARY_NAIRA,
  nairaToKobo,
  PAYMENT_PLANS,
} from "./marketing";

export const EVENT_TYPES = [
  "Wedding",
  "Burial",
  "Naming Ceremony",
  "Birthday",
  "Traditional Marriage",
  "Church Event",
  "Corporate Event",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const FOOD_PREFERENCES = [
  "Rice & grains",
  "Swallow & soups",
  "Protein (chicken/beef/fish)",
  "Vegetarian options",
  "Drinks & soft drinks",
  "Snacks & small chops",
  "Dessert",
] as const;

export type FoodPreference = (typeof FOOD_PREFERENCES)[number];

export interface EventPlannerInput {
  eventType: EventType;
  guests: number;
  budgetNaira?: number;
  location?: string;
  preferences: FoodPreference[];
}

export interface EventEstimate {
  riceKg: number;
  oilLitres: number;
  proteinPortions: number;
  softDrinksCrates: number;
  estimatedCostLowKobo: number;
  estimatedCostHighKobo: number;
  midpointKobo: number;
  shoppingList: string[];
  packageTier: string;
  paymentExample: ReturnType<typeof calculatePayment>;
  deliveryHint: string;
}

const COST_PER_GUEST_KOBO: Record<EventType, number> = {
  Wedding: 450_000,
  Burial: 320_000,
  "Naming Ceremony": 280_000,
  Birthday: 250_000,
  "Traditional Marriage": 400_000,
  "Church Event": 220_000,
  "Corporate Event": 350_000,
};

export function estimateEventFood(input: EventPlannerInput): EventEstimate {
  const guests = Math.max(1, Math.round(input.guests));
  const riceKg = Math.round(guests * 0.08 * 10) / 10;
  const oilLitres = Math.round(guests * 0.02 * 10) / 10;
  const proteinPortions = Math.round(guests * 1.2);
  const softDrinksCrates = Math.max(1, Math.ceil(guests / 24));

  const basePerGuest = COST_PER_GUEST_KOBO[input.eventType];
  let mid = basePerGuest * guests;

  if (input.preferences.includes("Protein (chicken/beef/fish)")) mid *= 1.12;
  if (input.preferences.includes("Drinks & soft drinks")) mid *= 1.05;
  if (input.preferences.includes("Dessert")) mid *= 1.04;
  if (input.preferences.includes("Vegetarian options")) mid *= 0.95;

  if (input.budgetNaira && input.budgetNaira > 0) {
    const budgetKobo = Math.round(input.budgetNaira * 100);
    mid = Math.min(mid, budgetKobo * 1.05);
  }

  const estimatedCostLowKobo = Math.round(mid * 0.85);
  const estimatedCostHighKobo = Math.round(mid * 1.15);
  const midpointKobo = Math.round(mid);

  const shoppingList = [
    `${riceKg} kg rice`,
    `${oilLitres} L cooking oil`,
    `${proteinPortions} protein portions (chicken/beef/fish mix)`,
    `${softDrinksCrates} crate(s) of soft drinks`,
    "Seasonings, pepper, and tomato paste for stews",
    "Serving plates / disposables (optional add-on)",
  ];

  if (input.preferences.includes("Swallow & soups")) {
    shoppingList.push("Garri / pounded yam flour and soup ingredients");
  }
  if (input.preferences.includes("Snacks & small chops")) {
    shoppingList.push("Small chops ingredients (puff-puff, spring rolls, etc.)");
  }
  if (input.preferences.includes("Dessert")) {
    shoppingList.push("Dessert or cake supplies");
  }

  let packageTier = "Family";
  if (guests >= 200) packageTier = "Large gathering / custom bulk";
  else if (guests >= 80) packageTier = "Extended family / event pack";
  else if (guests >= 30) packageTier = "Family+";
  else packageTier = "Couple / small gathering";

  const paymentExample = calculatePayment(
    nairaToKobo(DEFAULT_SALARY_NAIRA),
    PAYMENT_PLANS[0],
    midpointKobo,
  );

  const locationNote = input.location?.trim()
    ? ` for ${input.location.trim()}`
    : "";

  return {
    riceKg,
    oilLitres,
    proteinPortions,
    softDrinksCrates,
    estimatedCostLowKobo,
    estimatedCostHighKobo,
    midpointKobo,
    shoppingList,
    packageTier,
    paymentExample,
    deliveryHint: `Suggest staging dry goods 3–5 days before the ${input.eventType.toLowerCase()}${locationNote}, with fresh items 1–2 days prior. Final slots depend on catalogue and location.`,
  };
}
