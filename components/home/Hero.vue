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
      <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">{{ $t('home.hero.title') }}</h1>
      <p class="max-w-2xl mb-8 text-lg md:text-xl animate-fade-in-up">{{ $t('home.hero.subtitle') }}</p>
      <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
        <a href="tel:+35799900778" class="bg-secondary text-white font-bold py-3 px-6 rounded-md mr-4 hover:bg-gray-600 transition-colors inline-block">{{ $t('home.hero.cta_phone') }}</a>
        <NuxtLink :to="localePath('/services')" class="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors">{{ $t('home.hero.cta_services') }}</NuxtLink>
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
const localePath = useLocalePath()

const slides = [
  {
    bgImage: '/images/hero/screen1.webp',
    title: 'K.M Construction',
    subtitle: 'Professional Construction Services in Cyprus'
  },
  {
    bgImage: '/images/hero/screen2.webp',
    title: 'Quality & Reliability',
    subtitle: 'Your Trusted Construction Partner'
  }
]

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index;
  // Reset interval on manual navigation
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  slideInterval = setInterval(nextSlide, 5000);
}

onMounted(() => {
  // Preload images for better performance
  slides.forEach(slide => {
    const img = new Image();
    img.src = slide.bgImage;
    img.loading = 'eager';
  });
  // Start slider
  slideInterval = setInterval(nextSlide, 5000);
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
})
</script>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  /* Start hidden, let animation handle visibility */
  opacity: 0; 
}
</style> 