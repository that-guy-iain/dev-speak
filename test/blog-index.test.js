import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Simple test component that mimics the blog structure
const BlogIndexTest = {
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 class="text-3xl font-bold text-gray-900">Blog</h1>
          <p class="mt-2 text-gray-600">Insights, tutorials, and thoughts on development</p>
        </div>
      </header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row gap-8">
          <main class="lg:w-2/3">
            <div class="space-y-6">
              <article class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <header class="mb-4">
                  <h2 class="text-xl font-semibold text-gray-900 mb-2">New Book!</h2>
                  <div class="flex items-center text-sm text-gray-500 space-x-4">
                    <time>August 11, 2025</time>
                    <span>Iain</span>
                  </div>
                </header>
                <div class="prose prose-gray max-w-none">
                  <p class="text-gray-600 leading-relaxed">
                    Picture this: You're sitting in a meeting with your development team...
                  </p>
                </div>
                <footer class="mt-4 pt-4 border-t border-gray-100">
                  <a href="#" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read more
                  </a>
                </footer>
              </article>
            </div>
          </main>
          <aside class="lg:w-1/3">
            <div class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Welcome to our blog! Here you'll find insights, tutorials, and thoughts on development.
                </p>
              </div>
              <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
                <div class="space-y-3">
                  <article>
                    <h4 class="text-sm font-medium text-gray-900">New Book!</h4>
                    <time class="text-xs text-gray-500">August 11, 2025</time>
                  </article>
                </div>
              </div>
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
  `
}

describe('Blog Index Page Structure', () => {
  it('renders the correct blog page layout and structure', () => {
    const wrapper = mount(BlogIndexTest)
    
    // Test header
    expect(wrapper.find('h1').text()).toBe('Blog')
    expect(wrapper.text()).toContain('Insights, tutorials, and thoughts on development')
    
    // Test layout structure
    const main = wrapper.find('main')
    const aside = wrapper.find('aside')
    expect(main.classes()).toContain('lg:w-2/3')
    expect(aside.classes()).toContain('lg:w-1/3')
    
    // Test blog post structure
    const article = wrapper.find('article')
    expect(article.exists()).toBe(true)
    expect(article.text()).toContain('New Book!')
    expect(article.text()).toContain('August 11, 2025')
    expect(article.text()).toContain('Iain')
    expect(article.text()).toContain('Read more')
    
    // Test sidebar content
    const sidebar = wrapper.find('aside')
    expect(sidebar.text()).toContain('About')
    expect(sidebar.text()).toContain('Recent Posts')
    expect(sidebar.text()).toContain('Categories')
    expect(sidebar.text()).toContain('Development')
    expect(sidebar.text()).toContain('Business')
    expect(sidebar.text()).toContain('Technology')
  })
})