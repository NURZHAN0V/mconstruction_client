<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-primary mb-4">{{ $t('home.services.title') }}</h2>
        <p class="max-w-3xl mx-auto text-gray-600">{{ $t('home.services.subtitle') }}</p>
      </div>

      <div v-if="services.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Prominent Card -->
        <div v-if="firstService" class="sm:col-span-2 lg:col-span-2 lg:row-span-2 bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col md:flex-row group">
          <NuxtImg :src="firstService.image" :alt="$t(firstService.name)" class="w-full md:w-1/2 h-64 md:h-full object-cover" loading="lazy" />
          <div class="p-8 flex flex-col flex-grow">
            <h3 class="text-2xl font-bold text-dark mb-3">{{ $t(firstService.name) }}</h3>
            <p class="text-gray-600 mb-4 text-left">{{ $t(firstService.description) }}</p>
            
            <ul v-if="firstService.subServices" class="space-y-2 text-sm text-gray-600 mb-6 text-left grid grid-cols-1 sm:grid-cols-2 gap-x-4 flex-grow">
              <li v-for="sub in firstService.subServices" :key="sub" class="flex items-start">
                <Icon name="ri:checkbox-circle-fill" class="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                <span>{{ $t(sub) }}</span>
              </li>
            </ul>

            <NuxtLink :to="localePath(firstService.link)" class="mt-auto self-center inline-flex items-center justify-center gap-2 font-bold py-2.5 px-5 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group">
              {{ $t('home.services.read_more') }}
              <Icon name="ri:arrow-right-line" class="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Standard Cards -->
        <div 
          v-for="service in services.slice(1)" 
          :key="service.name" 
          class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col"
        >
          <div class="relative h-48">
            <NuxtImg :src="service.image" :alt="$t(service.name)" class="w-full h-full object-cover" loading="lazy" />
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 class="text-xl font-bold text-white text-center px-4">{{ $t(service.name) }}</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-gray-600 mb-6 flex-grow">{{ $t(service.description) }}</p>
            <NuxtLink 
              :to="localePath(service.link)" 
              class="mt-auto self-center inline-flex items-center justify-center gap-2 font-bold py-2.5 px-5 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group"
            >
              {{ $t('home.services.read_more') }}
              <Icon name="ri:arrow-right-line" class="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
            </NuxtLink>
          </div>
        </div>
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
    image: '/images/services/new_construction.webp',
    subServices: [
        'services.sub.design',
        'services.sub.excavation',
        'services.sub.foundation',
        'services.sub.reinforced_concrete',
        'services.sub.finishing_works',
        'services.sub.roofing_works',
        'services.sub.pools',
        'services.sub.hydro_thermal_insulation',
        'services.sub.supervision_control',
    ]
  },
  { 
    name: 'services.comprehensive_renovation', 
    description: 'home.services.descriptions.comprehensive_renovation', 
    link: '/services/comprehensive-renovation',
    image: '/images/services/comprehensive-renovation.webp'
  },
  { 
    name: 'services.facade_works', 
    description: 'home.services.descriptions.facade_works', 
    link: '/services/facade-works',
    image: '/images/services/facade-works.webp'
  },
  { 
    name: 'services.floor_sanding', 
    description: 'home.services.descriptions.floor_sanding', 
    link: '/services/floor-sanding',
    image: '/images/services/floor-sanding.webp'
  },
  { 
    name: 'services.concrete_injection', 
    description: 'home.services.descriptions.concrete_injection', 
    link: '/services/concrete-injection',
    image: '/images/services/concrete-injection.webp'
  }
]

const firstService = computed(() => services[0])
</script> 