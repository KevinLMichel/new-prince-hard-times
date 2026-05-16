import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const chapterStatus = z.enum(["concept", "outline", "draft", "revision", "polished"]);

const chapters = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/chapters" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    dek: z.string().optional(),
    order: z.number(),
    part: z.string(),
    tags: z.array(z.string()).default([]),
    status: chapterStatus,
    summary: z.string(),
    updated: z.coerce.date()
  })
});

const brief = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/brief" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string().optional()
  })
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string().optional(),
    status: z.string().optional()
  })
});

const appendices = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/appendices" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    relatedChapters: z.array(z.number()).default([]),
    updated: z.coerce.date()
  })
});

const endnotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/endnotes" }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    chapterOrder: z.number(),
    chapterTitle: z.string(),
    chapterSlug: z.string(),
    notes: z.array(
      z.object({
        marker: z.string(),
        text: z.string(),
        sources: z.array(z.string()).default([])
      })
    ).default([])
  })
});

export const collections = { chapters, brief, notes, appendices, endnotes };
