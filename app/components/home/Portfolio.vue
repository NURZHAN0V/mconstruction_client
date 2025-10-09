<template>
  <section class="py-20 md:py-24 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-10 md:mb-14">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">{{ $t('portfolio.title') }}</h2>
        <p class="max-w-3xl mx-auto text-gray-600">{{ $t('portfolio.subtitle') }}</p>
      </div>

      <div 
        class="relative max-w-6xl mx-auto select-none"
        @mouseenter="pauseAutoplay"
        @mouseleave="resumeAutoplay"
      >
        <!-- Viewport -->
        <div class="relative overflow-hidden rounded-2xl shadow-2xl bg-black/5">
          <!-- Slide -->
          <transition name="carousel-fade" mode="out-in">
            <div :key="currentIndex" class="relative h-[420px] sm:h-[480px] md:h-[540px]">
              <NuxtLink :to="localePath(projects[currentIndex].link)" class="absolute inset-0" aria-label="Open project"></NuxtLink>
              <NuxtImg 
                :src="projects[currentIndex].image" 
                :alt="$t(projects[currentIndex].title)" 
                class="absolute inset-0 w-full h-full object-cover" 
                loading="lazy"
                sizes="sm:100vw md:80vw lg:1200px"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div class="max-w-2xl">
                  <h3 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                    {{ $t(projects[currentIndex].title) }}
                  </h3>
                  <p class="text-base sm:text-lg text-white/90 mb-5 line-clamp-3">
                    {{ $t(projects[currentIndex].description) }}
                  </p>
                  <NuxtLink 
                    :to="localePath(projects[currentIndex].link)"
                    class="inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg bg-primary text-white shadow-lg hover:bg-primary/90 hover:shadow-xl active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group"
                  >
                    {{ $t('portfolio.read_more') }}
                    <Icon name="ri:arrow-right-line" class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </transition>

          <!-- Progress bar -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-white/20">
            <div class="h-full bg-primary transition-all duration-200" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <!-- Arrows -->
        <button 
          @click="prev"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Previous project"
        >
          <Icon name="ri:arrow-left-s-line" class="w-6 h-6" />
        </button>
        <button 
          @click="next"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Next project"
        >
          <Icon name="ri:arrow-right-s-line" class="w-6 h-6" />
        </button>

        <!-- Dots -->
        <div class="flex justify-center mt-5 space-x-2">
          <button
            v-for="(p, index) in projects"
            :key="`dot-${index}`"
            @click="goTo(index)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            :class="currentIndex === index ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'"
            :aria-label="`Go to slide ${index + 1}`"
            :aria-current="currentIndex === index ? 'true' : 'false'"
          ></button>
        </div>
      </div>

      <div class="text-center mt-10">
        <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-lg bg-secondary text-white shadow-lg hover:bg-secondary/90 hover:shadow-xl active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300">
          {{ $t('portfolio.view_all') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

// Known portfolio items and local images
const projects = [
  {
    id: 1,
    title: 'portfolio.floor_sanding',
    description: 'portfolio.descriptions.floor_sanding',
    image: '/images/portfolio/floor-sanding/6048585302198568950-819x1024.webp',
    link: '/portfolio/floor-sanding'
  },
  {
    id: 2,
    title: 'portfolio.monolithic_works',
    description: 'portfolio.descriptions.monolithic_works',
    image: '/images/portfolio/monolithic-works/1.webp',
    link: '/portfolio/monolithic-works'
  },
  {
    id: 3,
    title: 'portfolio.extension_construction',
    description: 'portfolio.descriptions.extension_construction',
    image: '/images/portfolio/extension-construction/1.webp',
    link: '/portfolio/extension-construction'
  },
  {
    id: 4,
    title: 'portfolio.roof_repair',
    description: 'portfolio.descriptions.roof_repair',
    image: '/images/portfolio/roof-repair/1.webp',
    link: '/portfolio/roof-repair'
  }
]

const currentIndex = ref(0)
const autoplayMs = 5000
let timer: ReturnType<typeof setInterval> | null = null
const progress = ref(0)
let progressTimer: ReturnType<typeof setInterval> | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length
  resetProgress()
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length
  resetProgress()
}

const goTo = (index: number) => {
  currentIndex.value = index
  resetProgress()
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, autoplayMs)
  startProgress()
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  stopProgress()
}

function pauseAutoplay() {
  stopAutoplay()
}

function resumeAutoplay() {
  startAutoplay()
}

function startProgress() {
  stopProgress()
  progress.value = 0
  const step = 100 / (autoplayMs / 100)
  progressTimer = setInterval(() => {
    progress.value = Math.min(100, progress.value + step)
  }, 100)
}

function stopProgress() {
  if (progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.5s ease;
}
.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}
</style> 