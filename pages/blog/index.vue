<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Blog</h1>
        <p class="mt-2 text-gray-600">Insights, tutorials, and thoughts on development</p>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Blog Posts - 2/3 width -->
        <main class="lg:w-2/3">
          <div v-if="pending" class="space-y-6">
            <!-- Loading skeleton -->
            <div v-for="i in 3" :key="i" class="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div class="h-6 bg-gray-200 rounded mb-4"></div>
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          <div v-else-if="posts && posts.length > 0" class="space-y-6">
            <!-- Blog Post Cards -->
            <article 
              v-for="post in posts" 
              :key="post._path"
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200"
            >
              <header class="mb-4">
                <h2 class="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  <NuxtLink :to="post._path" class="block">
                    {{ post.title }}
                  </NuxtLink>
                </h2>
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <time :datetime="post.date">
                    {{ formatDate(post.date) }}
                  </time>
                  <span v-if="post.author?.display_name" class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    {{ post.author.display_name }}
                  </span>
                </div>
              </header>
              
              <div class="prose prose-gray max-w-none">
                <p class="text-gray-600 leading-relaxed">
                  {{ getExcerpt(post) }}
                </p>
              </div>
              
              <footer class="mt-4 pt-4 border-t border-gray-100">
                <NuxtLink 
                  :to="post._path"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                  Read more
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </footer>
            </article>

            <!-- Pagination -->
            <nav v-if="totalPages > 1" class="flex justify-center mt-12" aria-label="Pagination">
              <div class="flex items-center space-x-2">
                <!-- Previous Button -->
                <button
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  ]"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <!-- Page Numbers -->
                <template v-for="page in visiblePages" :key="page">
                  <button
                    v-if="page !== '...'"
                    @click="goToPage(page)"
                    :class="[
                      'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
                </template>

                <!-- Next Button -->
                <button
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  ]"
                >
                  Next
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>

          <div v-else class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No blog posts</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating your first blog post.</p>
          </div>
        </main>

        <!-- Sidebar - 1/3 width -->
        <aside class="lg:w-1/3">
          <div class="space-y-6">
            <!-- About Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                Welcome to our blog! Here you'll find insights, tutorials, and thoughts on development, 
                technology, and building great products.
              </p>
            </div>

            <!-- Recent Posts -->
            <div v-if="recentPosts && recentPosts.length > 0" class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
              <div class="space-y-3">
                <article v-for="post in recentPosts" :key="post._path" class="group">
                  <h4 class="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    <NuxtLink :to="post._path" class="block">
                      {{ post.title }}
                    </NuxtLink>
                  </h4>
                  <time class="text-xs text-gray-500" :datetime="post.date">
                    {{ formatDate(post.date) }}
                  </time>
                </article>
              </div>
            </div>

            <!-- Categories/Tags (placeholder for future) -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Development
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Business
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Technology
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
// @reference "tailwindcss";

const route = useRoute()
const router = useRouter()

// Pagination settings
const POSTS_PER_PAGE = 10
const currentPage = ref(parseInt(route.query.page) || 1)

// Fetch blog posts with pagination
const { data: allPosts, pending } = await useAsyncData('blog-posts', () => 
  queryContent('blog')
    .sort({ date: -1 })
    .find()
)

// Calculate pagination
const totalPosts = computed(() => allPosts.value?.length || 0)
const totalPages = computed(() => Math.ceil(totalPosts.value / POSTS_PER_PAGE))
const startIndex = computed(() => (currentPage.value - 1) * POSTS_PER_PAGE)
const endIndex = computed(() => startIndex.value + POSTS_PER_PAGE)

// Get posts for current page
const posts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.slice(startIndex.value, endIndex.value)
})

// Get recent posts for sidebar (latest 5, excluding current page posts)
const recentPosts = computed(() => {
  if (!allPosts.value) return []
  return allPosts.value.slice(0, 5)
})

// Calculate visible page numbers for pagination
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (current > 4) {
      pages.push('...')
    }
    
    // Show pages around current page
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i)
      }
    }
    
    if (current < total - 3) {
      pages.push('...')
    }
    
    // Always show last page
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
})

// Navigation functions
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  router.push({ query: { ...route.query, page: page === 1 ? undefined : page } })
}

// Utility functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getExcerpt = (post) => {
  if (post.description) return post.description
  if (post.excerpt) return post.excerpt
  
  // Extract first paragraph from content
  const content = post.body?.children?.find(child => child.tag === 'p')?.children
  if (content) {
    const text = content.map(child => child.value || '').join('').trim()
    return text.length > 200 ? text.substring(0, 200) + '...' : text
  }
  
  return 'Read more to discover what this post is about...'
}

// Watch for route changes to update current page
watch(() => route.query.page, (newPage) => {
  currentPage.value = parseInt(newPage) || 1
})

// SEO
useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: 'Insights, tutorials, and thoughts on development and technology.' }
  ]
})
</script>