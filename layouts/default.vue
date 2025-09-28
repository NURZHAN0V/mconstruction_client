<template>
  <div class="flex flex-col min-h-screen font-sans">
    <LayoutHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
</script> 