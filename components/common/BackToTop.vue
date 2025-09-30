<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-5 right-5 z-50 p-3 bg-primary text-light rounded-full shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      aria-label="Back to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  </transition>
</template>

<script setup>
const isVisible = ref(false);
let handleScroll = null;

onMounted(() => {
  handleScroll = () => {
    isVisible.value = window.scrollY > 400;
  };
  window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
  if (handleScroll) {
    window.removeEventListener('scroll', handleScroll);
    handleScroll = null;
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

</script> 