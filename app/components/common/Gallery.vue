<template>
  <div class="gallery-container">
    <!-- Main Image -->
    <div class="relative mb-4">
      <div class="relative overflow-hidden rounded-lg shadow-lg cursor-pointer" @click="openFullscreen">
        <NuxtImg 
          :src="currentImage" 
          :alt="currentImageAlt"
          class="w-full h-96 md:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        
        <!-- Fullscreen Button -->
        <div class="absolute top-4 left-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/80 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </div>
        
        <!-- Navigation Arrows -->
        <button 
          v-if="images.length > 1"
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          v-if="images.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Image Counter -->
        <div v-if="images.length > 1" class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>

    <!-- Thumbnail Gallery -->
    <div v-if="images.length > 1" class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToImage(index)"
        class="relative overflow-hidden rounded-lg aspect-square transition-all duration-300 hover:scale-105"
        :class="currentIndex === index ? 'ring-2 ring-primary shadow-lg' : 'opacity-70 hover:opacity-100'"
      >
        <NuxtImg 
          :src="image.thumbnail || image.src" 
          :alt="image.alt"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-if="currentIndex === index" class="absolute inset-0 bg-primary/20"></div>
      </button>
    </div>

    <!-- Fullscreen Modal -->
    <div 
      v-if="isFullscreen" 
      class="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      @click="closeFullscreen"
    >
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <!-- Close Button -->
        <button 
          @click="closeFullscreen"
          class="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Fullscreen Image -->
        <div class="relative max-w-full max-h-full" @click.stop>
          <NuxtImg 
            :src="currentImage" 
            :alt="currentImageAlt"
            class="max-w-full max-h-full object-contain"
            loading="lazy"
          />
          
          <!-- Navigation Arrows in Fullscreen -->
          <button 
            v-if="images.length > 1"
            @click="previousImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            v-if="images.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image Counter in Fullscreen -->
          <div v-if="images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-lg">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string
  alt: string
  thumbnail?: string
}

const props = defineProps<{
  images: GalleryImage[]
}>()

const currentIndex = ref(0)
const isFullscreen = ref(false)

const currentImage = computed(() => props.images[currentIndex.value]?.src || '')
const currentImageAlt = computed(() => props.images[currentIndex.value]?.alt || '')

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = props.images.length - 1
  }
}

const goToImage = (index: number) => {
  currentIndex.value = index
}

const openFullscreen = () => {
  isFullscreen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullscreen = () => {
  isFullscreen.value = false
  document.body.style.overflow = 'auto'
}

// Keyboard navigation
let handleKeydown: ((event: KeyboardEvent) => void) | null = null

onMounted(() => {
  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      previousImage()
    } else if (event.key === 'ArrowRight') {
      nextImage()
    } else if (event.key === 'Escape' && isFullscreen.value) {
      closeFullscreen()
    } else if (event.key === 'f' || event.key === 'F') {
      if (!isFullscreen.value) {
        openFullscreen()
      }
    }
  }
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (handleKeydown) {
    document.removeEventListener('keydown', handleKeydown)
    handleKeydown = null
  }
  // Restore body overflow when component is unmounted
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.gallery-container {
  @apply w-full;
}
</style>
