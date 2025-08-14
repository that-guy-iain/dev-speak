<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Article -->
        <main class="flex-1 lg:max-w-4xl">
          <div v-if="pending" class="animate-pulse">
            <div class="h-8 bg-gray-200 rounded mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded mb-8"></div>
            <div class="space-y-4">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          <article v-else-if="post" class="bg-white rounded-lg shadow-sm p-8">
            <!-- Breadcrumb -->
            <nav class="mb-6">
              <ol class="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <NuxtLink to="/" class="hover:text-gray-700">Home</NuxtLink>
                </li>
                <li>/</li>
                <li>
                  <NuxtLink to="/blog" class="hover:text-gray-700">Blog</NuxtLink>
                </li>
                <li>/</li>
                <li class="text-gray-900">{{ post.title }}</li>
              </ol>
            </nav>

            <!-- Article Header -->
            <header class="mb-8">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
              
              <div class="flex items-center text-sm text-gray-600 mb-6">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span class="text-white font-medium text-sm">
                      {{ post.author?.display_name?.charAt(0) || 'A' }}
                    </span>
                  </div>
                  <span class="mr-4">{{ post.author?.display_name || 'Anonymous' }}</span>
                </div>
                <time :datetime="post.date" class="mr-4">
                  {{ formatDate(post.date) }}
                </time>
                <span v-if="post.top" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              </div>
            </header>

            <!-- Article Content -->
            <div class="prose prose-lg max-w-none">
              <ContentRenderer :value="post" />
            </div>

            <!-- Article Footer -->
            <footer class="mt-12 pt-8 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <NuxtLink 
                  to="/blog" 
                  class="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back to Blog
                </NuxtLink>
                
                <div class="flex items-center space-x-4">
                  <span class="text-sm text-gray-500">Share:</span>
                  <button 
                    @click="shareOnTwitter"
                    class="text-gray-400 hover:text-blue-400 transition-colors"
                    title="Share on Twitter"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button 
                    @click="shareOnLinkedIn"
                    class="text-gray-400 hover:text-blue-600 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </footer>
          </article>

          <!-- Error State -->
          <div v-else class="bg-white rounded-lg shadow-sm p-8 text-center">
            <div class="max-w-md mx-auto">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
              <p class="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
              <NuxtLink 
                to="/blog" 
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Blog
              </NuxtLink>
            </div>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="lg:w-80">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
            <div v-if="recentPosts && recentPosts.length > 0" class="space-y-4">
              <article 
                v-for="recentPost in recentPosts" 
                :key="recentPost.slug"
                class="group"
              >
                <NuxtLink 
                  :to="`/blog/${recentPost.slug}`"
                  class="block hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
                >
                  <h4 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {{ recentPost.title }}
                  </h4>
                  <time 
                    :datetime="recentPost.date" 
                    class="text-sm text-gray-500"
                  >
                    {{ formatDate(recentPost.date) }}
                  </time>
                </NuxtLink>
              </article>
            </div>
            <div v-else class="text-gray-500 text-sm">
              No recent posts available.
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">About Dev-Speak</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Bridging the gap between entrepreneurial vision and technical reality. 
              Learn the essential technical knowledge every founder needs in plain English.
            </p>
            <NuxtLink 
              to="/about" 
              class="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 transition-colors"
            >
              Learn more
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BlogPostAuthor {
  display_name: string
}
interface BlogPost {
  title: string
  slug?: string
  date: string | Date
  draft?: boolean
  tags?: string[]
  image?: string
  author?: BlogPostAuthor
  top?: boolean
  description?: string
  excerpt?: string
  // Content body fields from @nuxt/content
  body?: any
}

const route = useRoute()
const slug = route.params.slug as string

// Fetch the specific blog post by slug
const { data: postList, pending } = await useAsyncData<BlogPost | null>(`blog-post-${slug}`, () =>
  queryCollection('blog')
    .where('slug', '=', slug)
    .all<BlogPost>()
)

// Fetch recent posts for sidebar (latest 5, excluding current post)
const { data: allPosts } = await useAsyncData<BlogPost[] | null>('blog-posts-sidebar', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const recentPosts = computed<BlogPost[]>(() => {
  if (!allPosts.value) return []
  return allPosts.value
    .slice(0, 5)
})

// Format date helper
const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Social sharing functions (guard for SSR)
const shareOnTwitter = (): void => {
  if (!postList.value) return
  if (process.client) {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this post: ${post.value.title}`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }
}

const shareOnLinkedIn = (): void => {
  if (process.client) {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }
}

// Handle 404 if post not found (only after data resolved)
if (!pending.value && !postList.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

const post = postList.value[0] || null
// SEO Meta (reactive to post value)
useHead(() => ({
  title: post.value ? `${post.value.title} - Dev-Speak` : 'Post Not Found - Dev-Speak',
  meta: [
    {
      name: 'description',
      content: post.value?.description || post.value?.excerpt || 'Blog post from Dev-Speak'
    },
    {
      property: 'og:title',
      content: post.value ? `${post.value.title} - Dev-Speak` : 'Post Not Found - Dev-Speak'
    },
    {
      property: 'og:description',
      content: post.value?.description || post.value?.excerpt || 'Blog post from Dev-Speak'
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'article:published_time',
      content: post.value?.date?.toString()
    },
    {
      property: 'article:author',
      content: post.value?.author?.display_name || 'Dev-Speak'
    }
  ]
}))

</script>

<style scoped>
/* Additional styles to match the blog index */
.prose {
  color: #374151;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #111827;
  font-weight: 700;
}

.prose h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.625;
}

.prose a {
  color: #2563eb;
  transition: color 0.15s ease-in-out;
}

.prose a:hover {
  color: #1d4ed8;
}

.prose blockquote {
  border-left: 4px solid #bfdbfe;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
}

.prose ul,
.prose ol {
  margin-bottom: 1rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}
</style>