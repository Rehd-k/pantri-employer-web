/** Blog helpers and labels. Posts are loaded from `/public/blog`. */

export const BLOG_CATEGORIES = [
  "Food",
  "Nutrition",
  "Recipes",
  "Family",
  "Budgeting",
  "Healthy Living",
  "Food Prices",
  "Cooking",
  "Events",
  "Videos",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface PublicBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryKey: string;
  bodyParagraphs: string[];
  coverGradient: string;
  coverImageUrl: string | null;
  youtubeUrl: string | null;
  youtubeEmbedUrl: string | null;
  tiktokUrl: string | null;
  readTimeMinutes: number;
  status: string;
  publishedAt: string | null;
  authorUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicBlogCategory {
  key: string;
  label: string;
}

export function formatBlogDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso.includes("T") ? iso : `${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isVideoPost(post: Pick<PublicBlogPost, "categoryKey" | "category">): boolean {
  return post.categoryKey === "VIDEOS" || post.category === "Videos";
}
