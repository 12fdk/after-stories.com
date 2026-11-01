import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * The blog collection (the only content collection on the site). Kept
 * deliberately small: only the fields the blog pages (src/pages/blog/) read.
 * Covers are WebP files under /blog/ in public/ (see prompt.md §7).
 * `ogImage` is intentionally absent — post pages share the site's default
 * share image.
 */
const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    /** Max 70 chars — it becomes <title> and the schema headline. */
    title: z.string().max(70),
    /** Max 160 chars — meta description. */
    description: z.string().max(160),
    /** The lede, rendered under the title on the post page. */
    lede: z.string(),
    /** The one primary keyword the post is targeting. */
    keyword: z.string(),
    /** Site path to the cover, e.g. /blog/slug-cover.webp. Optional. */
    cover: z.string().optional(),
    /** Describes the photograph itself — it is content, not decoration. */
    coverAlt: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Robert Jensen"),
    tags: z.array(z.string()).default([]),
    /** Pairs also rendered as an FAQ section with FAQPage schema. */
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    /** Explicit internal links. Empty = fall back to shared tags. */
    relatedSlugs: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
