"use client";

import Link from "next/link";
import { Container, CTAButton, Section } from "./primitives";
import { ScrollReveal } from "./ScrollReveal";
import {
  formatBlogDate,
  isVideoPost,
  type PublicBlogPost,
} from "@/lib/blog-posts";

export function BlogPostContent({ post }: { post: PublicBlogPost }) {
  const video = isVideoPost(post);

  return (
    <>
      <section className="bg-pantri-background pt-8 pb-4">
        <Container>
          <p className="text-sm text-pantri-muted">
            <Link href="/blog" className="font-medium text-pantri-accent hover:underline">
              Journal
            </Link>
            {" / "}
            <span className="text-pantri-foreground">{post.title}</span>
          </p>
        </Container>
      </section>

      <Section className="pt-4!">
        {video && post.youtubeEmbedUrl ? (
          <ScrollReveal>
            <div className="mb-10 overflow-hidden rounded-2xl border border-pantri-border bg-black shadow-sm">
              <iframe
                title={post.title}
                src={post.youtubeEmbedUrl}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <div
              className={`mb-10 flex aspect-21/9 max-h-72 items-end rounded-2xl border border-pantri-border bg-linear-to-br ${post.coverGradient} p-6 sm:p-8`}
              style={
                post.coverImageUrl
                  ? {
                      backgroundImage: `url(${post.coverImageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <span className="rounded-full bg-pantri-surface/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pantri-accent">
                {post.category}
              </span>
            </div>
          </ScrollReveal>
        )}

        <article className="mx-auto max-w-2xl">
          <ScrollReveal>
            <p className="text-sm text-pantri-muted">
              {formatBlogDate(post.publishedAt)}
              {video
                ? " · Video · Pantri Editorial"
                : ` · ${post.readTimeMinutes} min read · Pantri Editorial`}
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-pantri-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-pantri-muted">{post.excerpt}</p>
          </ScrollReveal>

          {post.bodyParagraphs.length > 0 ? (
            <div className="mt-10 space-y-5 text-base leading-relaxed text-pantri-muted">
              {post.bodyParagraphs.map((p, i) => (
                <p key={`${i}-${p.slice(0, 24)}`}>{p}</p>
              ))}
            </div>
          ) : null}

          {post.tiktokUrl ? (
            <p className="mt-8 text-sm text-pantri-muted">
              Also on TikTok:{" "}
              <a
                href={post.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-pantri-accent hover:underline"
              >
                Watch on TikTok
              </a>
            </p>
          ) : null}

          <div className="mt-12 flex flex-wrap gap-4 border-t border-pantri-border pt-8">
            <CTAButton href="/shop">Shop on Pantri</CTAButton>
            <CTAButton href="/blog" variant="outline">
              More articles
            </CTAButton>
          </div>
        </article>
      </Section>
    </>
  );
}
