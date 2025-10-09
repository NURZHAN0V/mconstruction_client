<template>
  <section class="py-16 sm:py-24 bg-gray-900">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-200 mb-4">{{ $t('home.cta.title') }}</h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{{ $t('home.cta.subtitle') }}</p>
      <CommonActionButtons show-call-button show-email-button />
    </div>
  </section>
</template>