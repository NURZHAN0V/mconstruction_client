<template>
  <nav class="py-4" aria-label="Breadcrumb">
    <div class="container mx-auto px-4">
      <ol class="flex items-center space-x-2 text-sm">
        <li v-for="(item, index) in breadcrumbs" :key="index" class="flex items-center">
          <svg v-if="index > 0" class="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
          <NuxtLink 
            v-if="item.to && index < breadcrumbs.length - 1" 
            :to="localePath(item.to)" 
            class="text-gray-500 hover:text-primary transition-colors"
          >
            {{ item.title }}
          </NuxtLink>
          <span v-else class="text-gray-700 font-medium">{{ item.title }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

interface BreadcrumbItem {
  title: string
  to?: string
}

defineProps<{
  breadcrumbs: BreadcrumbItem[]
}>()
</script>


