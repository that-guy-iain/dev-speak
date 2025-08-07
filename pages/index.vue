<template>
  <div class="hello-container">
    <h1>hello world</h1>
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

<style scoped>
.hello-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

h1 {
  font-size: 2rem;
  color: blue;
}
</style>