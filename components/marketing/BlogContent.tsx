"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container, CTAButton, Section } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  formatBlogDate,
  type BlogCategory,
} from "@/lib/blog-posts";

export function BlogContent() {
  const [category, setCategory] = useState<BlogCategory | "All">("All");

  const posts = useMemo(() => {
    if (category === "All") return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === category);
  }, [category]);

  return (
    <>
      <section className="bg-linear-to-b from-pantri-surface to-pantri-background pt-12 pb-12 sm:pt-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pantri-accent">
                Journal
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-pantri-foreground sm:text-5xl">
                Food & Wellness Journal
              </h1>
              <p className="mt-6 text-lg text-pantri-muted">
                Practical writing on budgeting, Nigerian cooking, family pantries, and everyday food
                decisions.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Section className="pt-0!">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <FilterChip
            label="All"
            active={category === "All"}
            onClick={() => setCategory("All")}
          />
          {BLOG_CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="pantri-card mx-auto max-w-lg p-10 text-center">
            <p className="font-semibold text-pantri-foreground">No posts in this category yet</p>
            <button
              type="button"
              onClick={() => setCategory("All")}
              className="mt-4 text-sm font-semibold text-pantri-accent hover:underline"
            >
              View all posts
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ScrollReveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="pantri-card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`flex aspect-16/10 items-end bg-linear-to-br ${post.gradient} p-4`}
                  >
                    <span className="rounded-full bg-pantri-surface/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-pantri-accent">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs text-pantri-muted">
                      {formatBlogDate(post.date)} · {post.readTimeMinutes} min read
                    </p>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-pantri-foreground group-hover:text-pantri-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-pantri-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-pantri-accent">Read →</span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <CTAButton href="/shop" variant="outline">
            Shop the marketplace
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-pantri-primary text-white"
          : "border border-pantri-border bg-pantri-surface text-pantri-muted hover:text-pantri-foreground"
      }`}
    >
      {label}
    </button>
  );
}
