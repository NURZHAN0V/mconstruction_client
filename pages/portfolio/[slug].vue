<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="category">
      <h1 class="text-4xl font-bold text-primary mb-4">{{ $t(category.title) }}</h1>
      <p class="text-lg mb-8">{{ $t(category.description) }}</p>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in category.projects" :key="project.title" class="border rounded-lg shadow-lg overflow-hidden">
          <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-xl mb-2">{{ project.title }}</h3>
            <p class="text-gray-600">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Category not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const portfolioData = {
  'floor-sanding': {
    title: 'portfolio.floor_sanding',
    description: 'portfolio.descriptions.floor_sanding',
    projects: [
      { title: 'Project 1', description: 'Description for project 1', image: '/images/portfolio/floor-sanding/1.jpg' },
      { title: 'Project 2', description: 'Description for project 2', image: '/images/portfolio/floor-sanding/2.jpg' },
    ]
  },
  'monolithic-works': {
    title: 'portfolio.monolithic_works',
    description: 'portfolio.descriptions.monolithic_works',
    projects: [
      { title: 'Project 3', description: 'Description for project 3', image: '/images/portfolio/monolithic-works/1.jpg' },
    ]
  },
  'extension-construction': {
    title: 'portfolio.extension_construction',
    description: 'portfolio.descriptions.extension_construction',
    projects: [
        { title: 'Project 4', description: 'Description for project 4', image: '/images/portfolio/extension-construction/1.jpg' },
    ]
  },
  'roof-repair': {
    title: 'portfolio.roof_repair',
    description: 'portfolio.descriptions.roof_repair',
    projects: [
        { title: 'Project 5', description: 'Description for project 5', image: '/images/portfolio/roof-repair/1.jpg' },
    ]
  },
};

const category = computed(() => portfolioData[slug as keyof typeof portfolioData]);
</script> 