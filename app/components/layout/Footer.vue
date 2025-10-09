<template>
  <footer class="bg-gray-100 border-t">
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div class="mb-4 md:mb-0">
          <h3 class="text-xl font-bold">K.M.Construction</h3>
        </div>
        <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <NuxtLink :to="localePath('/')" class="hover:text-primary">{{ $t('nav.home') }}</NuxtLink>
            <NuxtLink :to="localePath('/services')" class="hover:text-primary">{{ $t('nav.services') }}</NuxtLink>
            <NuxtLink :to="localePath('/portfolio')" class="hover:text-primary">{{ $t('nav.portfolio') }}</NuxtLink>
            <NuxtLink :to="localePath('/contacts')" class="hover:text-primary">{{ $t('nav.contacts') }}</NuxtLink>
            <NuxtLink :to="localePath('/privacy-policy')" class="hover:text-primary">{{ $t('footer.privacy_policy') }}</NuxtLink>
        </div>
      </div>
      <div class="text-center text-gray-500 mt-6 pt-6 border-t">
        <p>K.M.Construction © {{ new Date().getFullYear() }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script> 