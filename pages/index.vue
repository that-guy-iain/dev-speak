<template>
  <div class="hello-container bg-yellow">
    <h1 class="underline">Dev-Speak</h1>
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

<style  lang="postcss">
@reference "tailwindcss";
</style>