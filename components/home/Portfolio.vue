<template>
  <div class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-primary mb-4">{{ $t('home.portfolio.title') }}</h2>
      <p class="max-w-3xl mx-auto mb-12">{{ $t('home.portfolio.subtitle') }}</p>
      <!-- Carousel will be here -->
      <div class="text-center">
        <NuxtLink :to="localePath('/portfolio')" class="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600">{{ $t('home.portfolio.view_all') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script> 