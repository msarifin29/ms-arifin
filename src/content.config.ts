import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'; // Di v6/v7 disarankan mengimpor z dari astro/zod
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	loader: glob({ pattern: '**/*.{md,mdx}', base: "./src/content/blog" }),
	schema: ({ image }) => z.object({
		title: z.string(),
		seoTitle: z.string().optional(),
		description: z.string(),
		slug: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).optional(),
		coverImage: image().optional()
	}),
});

export const collections = { blog };
