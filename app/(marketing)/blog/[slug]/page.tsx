import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/marketing/BlogPostContent";
import type { PublicBlogPost } from "@/lib/blog-posts";
import { publicApi, PublicApiError } from "@/lib/public-api";

async function fetchPost(slug: string): Promise<PublicBlogPost | null> {
  try {
    return await publicApi.get<PublicBlogPost>(`/public/blog/posts/${slug}`);
  } catch (err) {
    if (err instanceof PublicApiError && err.status === 404) return null;
    throw err;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return { title: "Article · Pantri" };
  return {
    title: `${post.title} · Pantri Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();
  return <BlogPostContent post={post} />;
}
