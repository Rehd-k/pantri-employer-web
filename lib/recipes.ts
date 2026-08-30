export interface Recipe {
  slug: string;
  title: string;
  cookTimeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  caloriesApprox: number;
  servings: number;
  tag: string;
  summary: string;
  ingredients: string[];
  steps: string[];
  nutritionNote: string;
  gradient: string;
}

export const RECIPES: Recipe[] = [
  {
    slug: "jollof-rice",
    title: "Jollof Rice",
    cookTimeMinutes: 60,
    difficulty: "Medium",
    caloriesApprox: 420,
    servings: 6,
    tag: "Cook with what I have",
    summary: "Party-ready tomato rice with peppers and spice.",
    ingredients: [
      "3 cups long-grain rice",
      "Tomato stew base (blended tomato, pepper, onion)",
      "Vegetable oil",
      "Seasoning cubes, thyme, curry",
      "Stock or water",
    ],
    steps: [
      "Parboil rice and rinse.",
      "Fry tomato-pepper blend until oil separates.",
      "Add stock, seasoning, and rice; cook covered until done.",
      "Steam on low heat for a smoky finish.",
    ],
    nutritionNote: "Approx. 420 kcal per serving  estimate only.",
    gradient: "from-orange-400/40 to-red-600/30",
  },
  {
    slug: "egusi-soup",
    title: "Egusi Soup",
    cookTimeMinutes: 75,
    difficulty: "Medium",
    caloriesApprox: 380,
    servings: 6,
    tag: "Cook with what I have",
    summary: "Melon-seed soup with leafy greens and protein.",
    ingredients: [
      "Ground egusi",
      "Palm oil",
      "Assorted meat or fish",
      "Stockfish (optional)",
      "Ugu or spinach",
      "Pepper and seasoning",
    ],
    steps: [
      "Cook proteins until tender; reserve stock.",
      "Fry egusi paste in palm oil.",
      "Add stock and simmer.",
      "Finish with greens and seasoning.",
    ],
    nutritionNote: "Approx. 380 kcal per serving  estimate only.",
    gradient: "from-emerald-500/40 to-yellow-600/20",
  },
  {
    slug: "fried-rice",
    title: "Fried Rice",
    cookTimeMinutes: 45,
    difficulty: "Easy",
    caloriesApprox: 390,
    servings: 5,
    tag: "Cook with what I have",
    summary: "Colourful rice with mixed vegetables and protein.",
    ingredients: [
      "Parboiled rice",
      "Mixed vegetables",
      "Chicken or shrimp",
      "Curry, thyme, seasoning",
      "Oil",
    ],
    steps: [
      "Cook rice until just done.",
      "Sauté vegetables and protein.",
      "Toss rice with curry and seasoning until hot.",
    ],
    nutritionNote: "Approx. 390 kcal per serving  estimate only.",
    gradient: "from-lime-400/40 to-amber-500/30",
  },
  {
    slug: "chicken-stew",
    title: "Chicken Stew",
    cookTimeMinutes: 50,
    difficulty: "Easy",
    caloriesApprox: 310,
    servings: 4,
    tag: "Cook with what I have",
    summary: "Tomato-based chicken stew for rice or yam.",
    ingredients: [
      "Chicken pieces",
      "Tomato-pepper blend",
      "Onion, oil",
      "Seasoning, bay leaf",
    ],
    steps: [
      "Season and brown chicken.",
      "Cook tomato base until thick.",
      "Simmer chicken in stew until tender.",
    ],
    nutritionNote: "Approx. 310 kcal per serving  estimate only.",
    gradient: "from-red-400/40 to-orange-500/30",
  },
  {
    slug: "beans-and-plantain",
    title: "Beans & Plantain",
    cookTimeMinutes: 55,
    difficulty: "Easy",
    caloriesApprox: 450,
    servings: 4,
    tag: "Cook with what I have",
    summary: "Honey beans with ripe plantain  simple and filling.",
    ingredients: [
      "Honey beans or black-eyed peas",
      "Ripe plantain",
      "Palm or vegetable oil",
      "Pepper, onion, seasoning",
    ],
    steps: [
      "Cook beans until soft.",
      "Season with pepper sauce.",
      "Fry or roast plantain and serve alongside.",
    ],
    nutritionNote: "Approx. 450 kcal per serving  estimate only.",
    gradient: "from-amber-400/40 to-rose-500/20",
  },
  {
    slug: "moi-moi",
    title: "Moi Moi",
    cookTimeMinutes: 90,
    difficulty: "Medium",
    caloriesApprox: 280,
    servings: 8,
    tag: "Cook with what I have",
    summary: "Steamed bean pudding with pepper and optional egg.",
    ingredients: [
      "Peeled beans",
      "Pepper, onion",
      "Oil",
      "Eggs or fish (optional)",
      "Seasoning",
    ],
    steps: [
      "Blend beans with pepper and onion.",
      "Mix with oil and seasoning.",
      "Portion into wraps or ramekins; steam until set.",
    ],
    nutritionNote: "Approx. 280 kcal per serving  estimate only.",
    gradient: "from-yellow-300/40 to-orange-400/30",
  },
  {
    slug: "pasta",
    title: "Pasta",
    cookTimeMinutes: 35,
    difficulty: "Easy",
    caloriesApprox: 400,
    servings: 4,
    tag: "Cook with what I have",
    summary: "Weeknight pasta with tomato sauce and vegetables.",
    ingredients: [
      "Pasta",
      "Tomato sauce or stew",
      "Vegetables",
      "Protein optional",
      "Herbs and seasoning",
    ],
    steps: [
      "Boil pasta al dente.",
      "Warm sauce with vegetables.",
      "Toss together and serve.",
    ],
    nutritionNote: "Approx. 400 kcal per serving  estimate only.",
    gradient: "from-rose-400/40 to-yellow-500/20",
  },
  {
    slug: "vegetable-soup",
    title: "Vegetable Soup",
    cookTimeMinutes: 40,
    difficulty: "Easy",
    caloriesApprox: 220,
    servings: 4,
    tag: "Cook with what I have",
    summary: "Light vegetable soup with optional protein.",
    ingredients: [
      "Mixed leafy vegetables",
      "Stock",
      "Pepper and onion",
      "Optional fish or chicken",
      "Seasoning",
    ],
    steps: [
      "Build a light stock with seasoning.",
      "Add protein if using.",
      "Finish with vegetables just until wilted.",
    ],
    nutritionNote: "Approx. 220 kcal per serving  estimate only.",
    gradient: "from-green-400/40 to-teal-500/30",
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return RECIPES.find((r) => r.slug === slug);
}
