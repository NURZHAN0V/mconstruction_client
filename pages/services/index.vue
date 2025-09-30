<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumbs -->
    <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary to-blue-600 text-white py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ $t('nav.services') }}</h1>
          <p class="text-xl md:text-2xl text-blue-100 leading-relaxed">
            {{ $t('home.services.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          <!-- Service 1: New Construction -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-64 md:h-80">
              <NuxtImg 
                src="/images/services/new_construction.webp" 
                :alt="$t('services.new_construction')"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t('services.new_construction') }}</h3>
                <p class="text-blue-100">{{ $t('home.services.descriptions.new_construction') }}</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.design') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.foundation') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.finishing_works') }}
                </span>
              </div>
              <NuxtLink 
                :to="localePath('/services/new-construction')" 
                class="inline-flex items-center text-primary font-bold hover:text-blue-600 transition-colors"
              >
                {{ $t('home.services.read_more') }} →
              </NuxtLink>
            </div>
          </div>

          <!-- Service 2: Comprehensive Renovation -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-64 md:h-80">
              <NuxtImg 
                src="/images/services/comprehensive-renovation.webp" 
                :alt="$t('services.comprehensive_renovation')"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t('services.comprehensive_renovation') }}</h3>
                <p class="text-blue-100">{{ $t('home.services.descriptions.comprehensive_renovation') }}</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.concrete_reinforcement') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.wall_cladding') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.utility_replacement') }}
                </span>
              </div>
              <NuxtLink 
                :to="localePath('/services/comprehensive-renovation')" 
                class="inline-flex items-center text-primary font-bold hover:text-blue-600 transition-colors"
              >
                {{ $t('home.services.read_more') }} →
              </NuxtLink>
            </div>
          </div>

          <!-- Service 3: Facade Works -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-64 md:h-80">
              <NuxtImg 
                src="/images/services/facade-works.webp" 
                :alt="$t('services.facade_works')"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t('services.facade_works') }}</h3>
                <p class="text-blue-100">{{ $t('home.services.descriptions.facade_works') }}</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.facade_restoration') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.facade_insulation') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.decorative_finishing') }}
                </span>
              </div>
              <NuxtLink 
                :to="localePath('/services/facade-works')" 
                class="inline-flex items-center text-primary font-bold hover:text-blue-600 transition-colors"
              >
                {{ $t('home.services.read_more') }} →
              </NuxtLink>
            </div>
          </div>

          <!-- Service 4: Floor Sanding -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-64 md:h-80">
              <NuxtImg 
                src="/images/services/floor-sanding.webp" 
                :alt="$t('services.floor_sanding')"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t('services.floor_sanding') }}</h3>
                <p class="text-blue-100">{{ $t('home.services.descriptions.floor_sanding') }}</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.natural_stone') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.concrete_floor') }}
                </span>
              </div>
              <NuxtLink 
                :to="localePath('/services/floor-sanding')" 
                class="inline-flex items-center text-primary font-bold hover:text-blue-600 transition-colors"
              >
                {{ $t('home.services.read_more') }} →
              </NuxtLink>
            </div>
          </div>

          <!-- Service 5: Concrete Injection -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="relative h-64 md:h-80">
              <NuxtImg 
                src="/images/services/concrete-injection.webp" 
                :alt="$t('services.concrete_injection')"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t('services.concrete_injection') }}</h3>
                <p class="text-blue-100">{{ $t('home.services.descriptions.concrete_injection') }}</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.injection_waterproofing') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.crack_injection') }}
                </span>
                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t('services.sub.masonry_injection') }}
                </span>
              </div>
              <NuxtLink 
                :to="localePath('/services/concrete-injection')" 
                class="inline-flex items-center text-primary font-bold hover:text-blue-600 transition-colors"
              >
                {{ $t('home.services.read_more') }} →
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-primary mb-6">{{ $t('home.why_choose_us.title') }}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ $t('home.why_choose_us.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-dark mb-2">{{ $t('home.why_choose_us.quality.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.why_choose_us.quality.description') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-dark mb-2">{{ $t('home.why_choose_us.speed.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.why_choose_us.speed.description') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-dark mb-2">{{ $t('home.why_choose_us.guarantee.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.why_choose_us.guarantee.description') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-dark mb-2">{{ $t('home.why_choose_us.experience.title') }}</h3>
            <p class="text-gray-600">{{ $t('home.why_choose_us.experience.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-primary to-blue-600">
      <div class="container mx-auto px-4">
        <div class="text-center text-white">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ $t('home.cta.title') }}</h2>
          <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">{{ $t('home.cta.subtitle') }}</p>
          <CommonActionButtons :show-portfolio-button="false" :show-services-button="false" />
        </div>
      </div>
    </section>
  </div>
</template> 

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

// Meta
useHead({
  title: () => `${t('nav.services')} - K.M Construction`,
  meta: [
    { name: 'description', content: () => `Профессиональные строительные услуги на Кипре от K.M Construction. Полный спектр услуг: от строительства до ремонта.` }
  ]
})

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: t('nav.home'), to: '/' },
  { title: t('nav.services') }
])
</script>
