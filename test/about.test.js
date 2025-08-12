import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../pages/about.vue'

describe('About Page', () => {
  it('renders properly', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
  
  it('displays the main heading', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.find('h1').text()).toBe('About the Author')
  })
  
  it('displays Iain Cambridge name', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.find('h2').text()).toBe('Iain Cambridge')
  })
  
  it('mentions 15 years of experience', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('15 years of experience')
  })
  
  it('mentions the book purpose for non-technical founders', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('non-technical founders')
    expect(wrapper.text()).toContain('gets ripped off')
    expect(wrapper.text()).toContain('wrong technology')
  })
  
  it('displays the author image with correct alt text', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    const nuxtImg = wrapper.findComponent({ name: 'NuxtImg' })
    expect(nuxtImg.exists()).toBe(true)
    expect(nuxtImg.attributes('alt')).toBe('Iain Cambridge - Software Development Consultant')
  })
  
  it('contains call-to-action section', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('Ready to Bridge the Gap?')
    expect(wrapper.text()).toContain('Get Your Copy - $10')
  })
  
  it('has navigation links to blog and book purchase', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    // Check for NuxtLink component (blog link)
    const nuxtLinks = wrapper.findAllComponents({ name: 'NuxtLink' })
    expect(nuxtLinks.length).toBeGreaterThan(0)
    
    // Check for anchor tag (buy link)
    const anchorLinks = wrapper.findAll('a')
    expect(anchorLinks.length).toBeGreaterThan(0)
    
    // Check that the text content includes the expected buy link
    expect(wrapper.text()).toContain('Get Your Copy')
  })
  
  it('contains key benefits list', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('Communicate effectively with technical teams')
    expect(wrapper.text()).toContain('Make informed technology decisions')
    expect(wrapper.text()).toContain('Avoid costly miscommunications')
  })
})