<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Slides container -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
      :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
      role="tabpanel"
      :aria-hidden="currentSlide !== index"
    >
      <NuxtImg
        :src="slide.bgImage"
        :alt="`Hero slide ${index + 1}`"
        class="w-full h-full object-cover"
        loading="eager"
        preload
      />
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>

    <!-- Overlay Content -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <transition name="fade-up" mode="out-in">
        <div :key="currentSlide" class="w-full">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ t('home.hero.slides[' + currentSlide + '].title') }}</h1>
          <p class="max-w-2xl mx-auto mb-8 text-lg md:text-xl">{{ t('home.hero.slides[' + currentSlide + '].subtitle') }}</p>
        </div>
      </transition>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="tel:+35799900778" class="inline-flex items-center justify-center gap-2 font-bold py-3.5 px-7 rounded-lg bg-secondary text-white shadow-lg shadow-black/10 hover:bg-secondary/90 hover:shadow-xl active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group" aria-label="Позвонить нам">
          <Icon name="ri:phone-fill" class="w-5 h-5" />
          <span>{{ $t('home.hero.cta_phone') }}</span>
        </a>
        <NuxtLink :to="localePath('/services')" class="inline-flex items-center justify-center gap-2 font-bold py-3.5 px-7 rounded-lg bg-primary text-white shadow-lg shadow-black/10 hover:bg-primary/90 hover:shadow-xl active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group" aria-label="Перейти к услугам">
          <Icon name="ri:apps-2-line" class="w-5 h-5" />
          <span>{{ $t('home.hero.cta_services') }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Pagination -->
    <div class="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex space-x-3" role="tablist">
      <button
        v-for="(_, index) in slides"
        :key="`dot-${index}`"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-colors duration-300"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'"
        :aria-label="`Go to slide ${index + 1}`"
        :aria-selected="currentSlide === index"
        role="tab"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const slides = [
  { bgImage: '/images/hero/screen1.webp' },
  { bgImage: '/images/hero/screen2.webp' }
]

const currentSlide = ref(0)
const slideInterval = ref<ReturnType<typeof setInterval> | null>(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetInterval()
}

const resetInterval = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
  slideInterval.value = setInterval(nextSlide, 5000)
}

onMounted(() => {
  slides.forEach(slide => {
    const img = new Image()
    img.src = slide.bgImage
  })
  resetInterval()
})

onUnmounted(() => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
})
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 