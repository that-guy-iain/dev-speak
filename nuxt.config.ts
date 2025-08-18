
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      script: [{src: 'https://stats.iain.rocks/info.js', async: true, defer: 'true', referrerpolicy: 'unsafe-url', 'data-domain': 'dev-speak.com'}],
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/eslint'
  ],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
