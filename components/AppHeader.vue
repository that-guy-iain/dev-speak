<template>
  <header class="sticky top-0 w-full bg-white shadow-sm border-b border-gray-200 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-gray-900 font-bold text-xl hover:text-blue-600 transition-colors">
          Dev-Speak
        </NuxtLink>
        
        <nav>
          <ul class="flex items-center space-x-8">
            <li>
              <NuxtLink 
                to="/blog" 
                class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Blog
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="#" 
                class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="#" 
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Buy Book
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

// Define a multi-word component name to satisfy ESLint rule
defineComponent({
  name: 'AppHeader'
});
</script>

<style scoped>

</style>

<style  lang="postcss">
@reference "tailwindcss";
</style>