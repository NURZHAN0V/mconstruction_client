<template>
  <button
    @click="$emit('openModal')"
    class="fixed bottom-24 right-5 z-40 flex items-center justify-center p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
    :aria-label="$t('call_modal.call_button_label')"
  >
    <Icon name="ri:phone-fill" class="h-6 w-6" />
  </button>
</template>

<script setup lang="ts">
defineEmits(['openModal'])
</script>
