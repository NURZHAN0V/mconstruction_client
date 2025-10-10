<template>
  <div class="flex flex-col min-h-screen font-sans">
    <LayoutHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <LayoutFooter />
    <CommonBackToTop />
    <CommonCallButton @open-modal="isCallModalOpen = true" />
    <CommonCallModal :is-open="isCallModalOpen" @close="isCallModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
const isCallModalOpen = ref(false)
</script> 