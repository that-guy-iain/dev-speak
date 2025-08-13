import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',
            // Define custom schema for blog collection
            schema: z.object({
                title: z.string(),
                slug: z.string().optional(),
                date: z.date(),
                draft: z.boolean().optional(),
                tags: z.array(z.string()).optional(),
                image: z.string().optional(),
                author: z.object({
                    display_name: z.string()
                }).optional(),
                top: z.boolean().optional(),
                description: z.string().optional(),
                excerpt: z.string().optional()
            })
        })
    }
})