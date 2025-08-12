<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Text Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Turn Your Vision into 
              <span class="text-blue-600">Tech</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              The plain-English guide that bridges the gap between your entrepreneurial vision 
              and the technical reality of building it. Stop nodding along in confusion. 
              Start leading with confidence.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#" 
                class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Get Your Copy - $10
              </a>
              <a 
                href="/content/blog"
                class="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
              >
                Read the Blog
              </a>
            </div>
          </div>
          
          <!-- Placeholder Image -->
          <div class="flex justify-center lg:justify-end">
            <div class="relative">
              <NuxtImg
                src="/images/book-cover.png"
                alt="Dev-Speak: Turn Your Vision into Tech - Book Cover"
                width="400"
                height="600"
                class="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
              <div class="absolute -bottom-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg">
                Just $10!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Why Founders Love Dev-Speak
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Finally understand the technical side of your business without learning to code
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Speak Their Language</h3>
            <p class="text-gray-600">Communicate effectively with your technical team and make informed decisions</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Save Money</h3>
            <p class="text-gray-600">Avoid costly miscommunications and recognize when solutions are overkill</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Move Faster</h3>
            <p class="text-gray-600">Make decisions quickly without constantly asking for explanations</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Know When You're Being Advised Correctly
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn to spot the differences between programming languages, databases, and hosting solutions 
            so you can evaluate technical recommendations with confidence
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Programming Languages -->
          <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Programming Languages</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start">
                <span class="text-orange-600 mr-2">•</span>
                <span>Understand when Python vs JavaScript vs PHP makes sense for your project</span>
              </li>
              <li class="flex items-start">
                <span class="text-orange-600 mr-2">•</span>
                <span>Recognize when a developer is pushing their favorite language unnecessarily</span>
              </li>
              <li class="flex items-start">
                <span class="text-orange-600 mr-2">•</span>
                <span>Know the real trade-offs between speed, cost, and development time</span>
              </li>
            </ul>
          </div>

          <!-- Databases -->
          <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Database Solutions</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start">
                <span class="text-teal-600 mr-2">•</span>
                <span>Learn when MySQL, PostgreSQL, or MongoDB is the right choice</span>
              </li>
              <li class="flex items-start">
                <span class="text-teal-600 mr-2">•</span>
                <span>Spot over-engineered database solutions that waste money</span>
              </li>
              <li class="flex items-start">
                <span class="text-teal-600 mr-2">•</span>
                <span>Understand scaling implications before you need them</span>
              </li>
            </ul>
          </div>

          <!-- Hosting Solutions -->
          <div class="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4 text-center">Hosting & Infrastructure</h3>
            <ul class="space-y-3 text-gray-600">
              <li class="flex items-start">
                <span class="text-indigo-600 mr-2">•</span>
                <span>Know when AWS, Google Cloud, or simple shared hosting is appropriate</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-600 mr-2">•</span>
                <span>Avoid paying for enterprise solutions when you need basic hosting</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-600 mr-2">•</span>
                <span>Understand the real costs of different hosting approaches</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center mt-12">
          <p class="text-lg text-gray-600 mb-6">
            Stop second-guessing technical decisions. Get the knowledge you need to lead confidently.
          </p>
          <a 
            href="#" 
            class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Learn the Differences - $10
          </a>
        </div>
      </div>
    </section>
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