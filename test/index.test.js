import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '../pages/index.vue'

// Mock Nuxt-specific functions
global.definePageMeta = vi.fn()

describe('Index Page', () => {
  it('renders properly', () => {
    const wrapper = mount(Index, {
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
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.find('h1').text()).toContain('Turn Your Vision into')
    expect(wrapper.find('h1').text()).toContain('Tech')
  })
  
  it('displays the testimonials section', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('What Founders Are Saying')
    expect(wrapper.text()).toContain('Real feedback from founders who\'ve transformed their technical confidence')
  })
  
  it('displays all three testimonials with correct quotes', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    
    // Test Sally Jones testimonial
    expect(wrapper.text()).toContain('This was such a great find!')
    expect(wrapper.text()).toContain('Sally Jones')
    expect(wrapper.text()).toContain('Startup Founder')
    
    // Test Iain Cambridge testimonial (with typo as specified)
    expect(wrapper.text()).toContain('This really helped me understand the porposals I was getting on UpWork')
    expect(wrapper.text()).toContain('Iain Cambridge')
    expect(wrapper.text()).toContain('Tech Entrepreneur')
    
    // Test Johnny Williams testimonial (with typo as specified)
    expect(wrapper.text()).toContain('Great book by a somewaht ok guy')
    expect(wrapper.text()).toContain('Johnny Williams')
    expect(wrapper.text()).toContain('Business Owner')
  })
  
  it('displays testimonial cards with proper structure', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    
    // Check for blockquote elements (testimonial quotes)
    const blockquotes = wrapper.findAll('blockquote')
    expect(blockquotes.length).toBe(3)
    
    // Check that each blockquote contains the expected quotes
    const quotes = blockquotes.map(bq => bq.text())
    expect(quotes).toContain('"This was such a great find!"')
    expect(quotes).toContain('"This really helped me understand the porposals I was getting on UpWork"')
    expect(quotes).toContain('"Great book by a somewaht ok guy"')
  })
  
  it('displays star ratings for testimonials', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    
    // Check for star SVG elements (should have 15 stars total - 5 per testimonial)
    const starSvgs = wrapper.findAll('svg[viewBox="0 0 20 20"]')
    expect(starSvgs.length).toBeGreaterThanOrEqual(15)
  })
  
  it('displays author initials in colored circles', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    
    // Check for initials in the testimonial cards
    expect(wrapper.text()).toContain('SJ') // Sally Jones
    expect(wrapper.text()).toContain('IC') // Iain Cambridge
    expect(wrapper.text()).toContain('JW') // Johnny Williams
  })
  
  it('contains features section', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('Why Founders Love Dev-Speak')
    expect(wrapper.text()).toContain('Speak Their Language')
    expect(wrapper.text()).toContain('Save Money')
    expect(wrapper.text()).toContain('Move Faster')
  })
  
  it('contains learning section', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('Know When You\'re Being Advised Correctly')
    expect(wrapper.text()).toContain('Programming Languages')
    expect(wrapper.text()).toContain('Database Solutions')
    expect(wrapper.text()).toContain('Hosting & Infrastructure')
  })
  
  it('has call-to-action buttons', () => {
    const wrapper = mount(Index, {
      global: {
        stubs: {
          NuxtImg: true,
          NuxtLink: true
        }
      }
    })
    expect(wrapper.text()).toContain('Get Your Copy - $10')
    expect(wrapper.text()).toContain('Read the Blog')
  })
})