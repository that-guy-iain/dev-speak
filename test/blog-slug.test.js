import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick, computed, defineComponent } from 'vue'

// Utility to flush pending promises from async setup
const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0))

// Minimal Nuxt/Content runtime mocks
function setupMocks(targetSlug, blogPost) {
  globalThis.useRoute = () => ({ params: { slug: targetSlug } })
  globalThis.queryCollection = () => {
    return {
      _where: null,
      where(field, op, value) { this._where = { field, value }; return this },
      order() { return this },
      async findOne() {
        if (this._where && this._where.field === 'slug' && this._where.value === targetSlug) {
          return blogPost
        }
        return null
      },
      async all() { return [blogPost] }
    }
  }
  globalThis.useAsyncData = async (key, handler) => {
    const value = await handler()
    return { data: ref(value), pending: ref(false) }
  }
  globalThis.useHead = () => {}
  globalThis.createError = (e) => e
  if (!globalThis.process) globalThis.process = {}
  globalThis.process.client = false
  // Provide computed globally (in case SFC expects global var after transform)
  globalThis.computed = computed
}

describe('[slug].vue page', () => {
  it('renders the blog post when slug matches a post', async () => {
    const targetSlug = '2025-08-11-new-book'
    const blogPost = {
      title: 'New Book!',
      slug: targetSlug,
      date: '2025-08-11T11:08:22+02:00',
      author: { display_name: 'Iain' },
      top: true,
      body: { type: 'doc', children: [] }
    }

    setupMocks(targetSlug, blogPost)

    // Stub global components used in template
    const stubs = {
      NuxtLink: { template: '<a><slot /></a>' },
      ContentRenderer: { props: ['value'], template: '<div class="content-renderer-stub">Rendered</div>' }
    }

    const component = (await import('../pages/blog/[slug].vue')).default

    // Wrap in Suspense so async setup component renders
    const Parent = defineComponent({
      components: { AsyncPage: component },
      template: '<Suspense><AsyncPage /></Suspense>'
    })

    const wrapper = mount(Parent, { global: { stubs } })

    for (let i = 0; i < 5; i++) {
      await flushPromises();
      await nextTick();
    }

    const text = wrapper.text()
    if (!text.includes('New Book!')) {
      // eslint-disable-next-line no-console
      console.log('DEBUG HTML:', wrapper.html())
    }
    expect(text).toContain('New Book!')
    expect(text).toContain('Iain')
  })
})
