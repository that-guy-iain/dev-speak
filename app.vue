<template>
  <div class="min-h-screen">
    <AppHeader />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup>
// Import the AppHeader component
import AppHeader from '~/components/AppHeader.vue';
</script>
<style scoped>

@reference "tailwindcss";
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>