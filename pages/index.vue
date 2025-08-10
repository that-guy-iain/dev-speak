<template>
  <div class="hello-container">
    <h1>Dev-Speak</h1>
  </div>
</template>

<script setup lang="ts">
// Using Composition API with script setup as per guidelines
import { defineComponent } from 'vue';

// Define a multi-word component name to satisfy ESLint rule
defineComponent({
  name: 'IndexPage'
});

definePageMeta({
  name: 'HomePage'
});
</script>

<style >
@reference "tailwindcss";
.hello-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  @apply bg-red-500 text-white;
}

h1 {
  font-size: 2rem;
  color: yellow;
}
</style>