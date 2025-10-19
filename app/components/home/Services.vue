<template>
  <section class="py-16 md:py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">{{ $t('home.services.title') }}</h2>
        <p class="max-w-3xl mx-auto text-gray-600 text-lg">{{ $t('home.services.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div 
          v-for="service in services" 
          :key="service.name" 
          class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-primary/30 flex flex-col group"
        >
          <div class="relative h-56 overflow-hidden">
            <NuxtImg 
              :src="service.image" 
              :alt="$t(service.name)" 
              class="w-full h-full object-cover transition-all duration-300" 
              loading="lazy" 
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-bold text-white">{{ $t(service.name) }}</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-gray-600 mb-6 flex-grow line-clamp-3">{{ $t(service.description) }}</p>
            <NuxtLink 
              :to="localePath(service.link)" 
              class="inline-flex items-center justify-center gap-2 font-bold py-2.5 px-5 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group w-full"
            >
              {{ $t('home.services.read_more') }}
              <Icon name="ri:arrow-right-line" class="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- View All Services Button -->
      <div class="text-center mt-12">
        <NuxtLink 
          :to="localePath('/services')" 
          class="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-lg bg-secondary text-white shadow-lg hover:bg-secondary/90 hover:shadow-xl active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary transition-all duration-300"
        >
          {{ $t('home.services.view_all') }}
          <Icon name="ri:arrow-right-line" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const services = [
  { 
    name: 'services.new_construction', 
    description: 'home.services.descriptions.new_construction', 
    link: '/services/new-construction',
    image: '/images/services/new_construction/photo_6028334436908648604_y.webp'
  },
  { 
    name: 'services.comprehensive_renovation', 
    description: 'home.services.descriptions.comprehensive_renovation', 
    link: '/services/comprehensive-renovation',
    image: '/images/services/comprehensive-renovation/photo_6028334436908648610_y.webp'
  },
  { 
    name: 'services.facade_works', 
    description: 'home.services.descriptions.facade_works', 
    link: '/services/facade-works',
    image: '/images/services/facade-works/photo_6028424944754478134_y.webp'
  },
  { 
    name: 'services.floor_sanding', 
    description: 'home.services.descriptions.floor_sanding', 
    link: '/services/floor-sanding',
    image: '/images/services/floor-sanding/photo_6028334436908648615_y.webp'
  },
  { 
    name: 'services.concrete_injection', 
    description: 'home.services.descriptions.concrete_injection', 
    link: '/services/concrete-injection',
    image: '/images/services/concrete-injection/photo_6028334436908648619_y.webp'
  }
]
</script> 