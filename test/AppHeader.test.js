import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../components/AppHeader.vue'

// Mock NuxtLink component
const mockNuxtLink = {
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
}

describe('AppHeader', () => {
  it('renders properly', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the Dev-Speak text mark', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })
    expect(wrapper.text()).toContain('Dev-Speak')
  })

  it('has the correct menu items', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })
    const menuItems = wrapper.findAll('nav li')
    expect(menuItems.length).toBe(3)
    expect(menuItems[0].text()).toBe('Blog')
    expect(menuItems[1].text()).toBe('Buy Book')
    expect(menuItems[2].text()).toBe('About')
  })

  it('has the correct styling classes', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })
    const header = wrapper.find('header')
    expect(header.classes()).toContain('sticky')
    expect(header.classes()).toContain('bg-black')
  })

  it('has the correct link for the text mark', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          NuxtLink: mockNuxtLink
        }
      }
    })
    const textMarkLink = wrapper.findAll('a')[0]
    expect(textMarkLink.attributes('href')).toBe('/')
  })
})