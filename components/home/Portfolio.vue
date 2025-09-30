<template>
  <div class="py-16 bg-gray-50">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold text-primary mb-4">{{ $t('portfolio.title') }}</h2>
      <p class="max-w-3xl mx-auto mb-12">{{ $t('portfolio.subtitle') }}</p>
      
      <!-- Portfolio Slider -->
      <div 
        class="relative max-w-6xl mx-auto mb-12"
        @mouseenter="stopAutoSlide"
        @mouseleave="startAutoSlide"
      >
        <!-- Slider Container -->
        <div class="overflow-hidden rounded-lg">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="project in portfolioProjects" 
              :key="project.id" 
              class="w-full flex-shrink-0 px-4"
            >
              <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <div class="relative h-64">
                  <NuxtImg :src="project.image" :alt="project.title" class="w-full h-full object-cover" loading="lazy" />
                  <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 class="text-2xl font-bold text-white text-center px-4">{{ $t(project.title) }}</h3>
                  </div>
                </div>
                <div class="p-6">
                  <p class="text-gray-600 mb-4">{{ $t(project.description) }}</p>
                  <NuxtLink :to="localePath(project.link)" class="text-primary font-bold hover:text-blue-600 transition-colors">
                    {{ $t('portfolio.read_more') }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button 
          @click="previousSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          :disabled="currentSlide === 0"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          :disabled="currentSlide === portfolioProjects.length - 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === portfolioProjects.length - 1 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Dots Navigation -->
        <div class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(_, index) in portfolioProjects"
            :key="`dot-${index}`"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>
      
      <div class="text-center">
        <NuxtLink :to="localePath('/portfolio')" class="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600">{{ $t('portfolio.view_all') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const currentSlide = ref(0)
let autoSlideInterval: ReturnType<typeof setInterval> | null = null

const portfolioProjects = [
  {
    id: 1,
    title: 'portfolio.floor_sanding',
    description: 'portfolio.descriptions.floor_sanding',
    image: 'https://placehold.net/800x600/dc3545/ffffff?text=Floor+Sanding',
    link: '/portfolio/floor-sanding'
  },
  {
    id: 2,
    title: 'portfolio.monolithic_works',
    description: 'portfolio.descriptions.monolithic_works',
    image: 'https://placehold.net/800x600/6c757d/ffffff?text=Monolithic+Works',
    link: '/portfolio/monolithic-works'
  },
  {
    id: 3,
    title: 'portfolio.extension_construction',
    description: 'portfolio.descriptions.extension_construction',
    image: 'https://placehold.net/800x600/007bff/ffffff?text=Extension+Construction',
    link: '/portfolio/extension-construction'
  },
  {
    id: 4,
    title: 'portfolio.roof_repair',
    description: 'portfolio.descriptions.roof_repair',
    image: 'https://placehold.net/800x600/28a745/ffffff?text=Roof+Repair',
    link: '/portfolio/roof-repair'
  }
]

const nextSlide = () => {
  if (currentSlide.value < portfolioProjects.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = portfolioProjects.length - 1
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  // Reset auto-slide when user manually navigates
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  autoSlideInterval = setInterval(nextSlide, 5000)
}

const startAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
  autoSlideInterval = setInterval(nextSlide, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  // Preload images
  portfolioProjects.forEach(project => {
    const img = new Image()
    img.src = project.image
  })
  // Start auto-slide
  startAutoSlide()
})

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
})
</script> 