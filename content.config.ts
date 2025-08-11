import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',
            // Define custom schema for docs collection
            schema: z.object({
                tags: z.array(z.string()),
                image: z.string(),
                date: z.date()
            })
        })
    }
})