<template>
  <header class="sticky top-0 w-full bg-black text-white py-4 shadow-md z-50">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-yellow-400 font-bold text-xl">Dev-Speak</NuxtLink>
      
      <nav>
        <ul class="flex space-x-6">
          <li><NuxtLink to="#" class="hover:text-yellow-400 transition-colors">Blog</NuxtLink></li>
          <li><NuxtLink to="#" class="hover:text-yellow-400 transition-colors">Buy Book</NuxtLink></li>
          <li><NuxtLink to="#" class="hover:text-yellow-400 transition-colors">About</NuxtLink></li>
        </ul>
      </nav>
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