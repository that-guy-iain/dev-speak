import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '../pages/index.vue'

// Mock Nuxt's definePageMeta function
vi.stubGlobal('definePageMeta', vi.fn())

describe('IndexPage', () => {
  it('renders properly', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct heading', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.find('h1').text()).toBe('Dev-Speak')
  })

  it('has the correct CSS class', () => {
    const wrapper = mount(IndexPage)
    expect(wrapper.find('.hello-container').exists()).toBe(true)
  })
})