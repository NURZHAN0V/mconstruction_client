<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CommonBackToTop />
  <CommonCallButton @open-modal="isCallModalOpen = true" />
  <CommonCallModal :is-open="isCallModalOpen" @close="isCallModalOpen = false" />
</template>

<script setup lang="ts">
const isCallModalOpen = ref(false)
</script>
