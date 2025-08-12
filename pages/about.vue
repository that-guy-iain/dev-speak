<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            About the Author
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Meet the experienced consultant behind Dev-Speak
          </p>
        </div>
      </div>
    </section>

    <!-- About Content Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <!-- Author Image Placeholder -->
          <div class="lg:col-span-1">
            <div class="relative">
              <NuxtImg
                src="https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Iain+Cambridge"
                alt="Iain Cambridge - Software Development Consultant"
                width="400"
                height="400"
                class="rounded-lg shadow-lg w-full"
                loading="eager"
              />
            </div>
          </div>
          
          <!-- Author Bio -->
          <div class="lg:col-span-2">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Iain Cambridge
            </h2>
            <div class="prose prose-lg text-gray-600 space-y-6">
              <p>
                With over <strong>15 years of experience</strong> in the software development industry, 
                Iain Cambridge has worked with countless startups, scale-ups, and established companies 
                as a trusted software development consultant.
              </p>
              
              <p>
                Throughout his career, Iain has witnessed the same painful scenario play out repeatedly: 
                brilliant non-technical founders with game-changing ideas getting lost in translation 
                when it comes to building their vision. Too often, these entrepreneurs find themselves 
                either overpaying for overcomplicated solutions or wasting precious time and resources 
                on the wrong technology choices.
              </p>
              
              <p>
                Frustrated by seeing talented founders struggle with the technical aspects of their 
                businesses, Iain decided to bridge this gap. He wrote <strong>Dev-Speak</strong> as 
                a plain-English guide that empowers non-technical founders to understand the technical 
                side of their business without needing to learn how to code.
              </p>
              
              <p>
                The book distills 15 years of industry experience into practical, actionable insights 
                that help founders:
              </p>
              
              <ul class="list-disc list-inside space-y-2 text-gray-600">
                <li>Communicate effectively with technical teams</li>
                <li>Make informed technology decisions</li>
                <li>Avoid costly miscommunications and over-engineering</li>
                <li>Recognize when solutions are unnecessarily complex</li>
                <li>Move faster without constantly needing explanations</li>
              </ul>
              
              <p>
                Iain's mission is simple: <em>to ensure that no founder ever gets ripped off or 
                wastes time building with the wrong technology again</em>. Dev-Speak is his contribution 
                to leveling the playing field between technical and non-technical entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          Ready to Bridge the Gap?
        </h3>
        <p class="text-lg text-gray-600 mb-8">
          Get your copy of Dev-Speak and start speaking the same language as your technical team.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#" 
            class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Your Copy - $10
          </a>
          <NuxtLink 
            to="/blog" 
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200"
          >
            Read the Blog
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

// Define a multi-word component name to satisfy ESLint rule
defineComponent({
  name: 'AboutPage'
});
// @name AboutPage

// Define a multi-word component name to satisfy ESLint rule
</script>

<style lang="postcss">
</style>