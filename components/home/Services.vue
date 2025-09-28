<template>
  <div class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-primary mb-4">{{ $t('home.services.title') }}</h2>
        <p class="max-w-3xl mx-auto text-gray-600">{{ $t('home.services.subtitle') }}</p>
      </div>

      <!-- Layout for Mobile and MD screens -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:hidden">
        <div 
          v-for="service in services" 
          :key="`mobile-${service.name}`"
          class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full"
        >
          <div class="relative h-48">
            <img :src="service.image" :alt="$t(service.name)" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 class="text-xl font-bold text-white text-center px-4">{{ $t(service.name) }}</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-gray-600 mb-6 flex-grow">{{ $t(service.description) }}</p>
            <NuxtLink 
              :to="localePath(service.link)" 
              class="mt-auto self-center bg-dark text-white font-bold py-2 px-6 rounded-md hover:bg-primary transition-colors duration-300"
            >
              {{ $t('home.services.read_more') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Layout for LG screens and up -->
      <div v-if="services.length > 0" class="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Prominent Card -->
        <div class="lg:col-span-2 lg:row-span-2 bg-white rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-xl flex flex-col md:flex-row group overflow-hidden h-full">
          <img :src="services[0].image" :alt="$t(services[0].name)" class="w-full md:w-1/2 h-64 md:h-full object-cover" />
          <div class="p-8 flex flex-col">
            <h3 class="text-2xl font-bold text-dark mb-3">{{ $t(services[0].name) }}</h3>
            <p class="text-gray-600 mb-4 text-left">{{ $t(services[0].description) }}</p>
            
            <ul v-if="services[0].subServices" class="space-y-2 text-sm text-gray-600 mb-6 text-left grid grid-cols-1 gap-x-4 flex-grow">
              <li v-for="sub in services[0].subServices" :key="sub" class="flex items-start">
                <svg class="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span>{{ $t(sub) }}</span>
              </li>
            </ul>

            <NuxtLink :to="localePath(services[0].link)" class="mt-auto self-center bg-dark text-white font-bold py-2 px-6 rounded-md hover:bg-primary transition-colors duration-300">
              {{ $t('home.services.read_more') }}
            </NuxtLink>
          </div>
        </div>

        <!-- Standard Cards -->
        <div 
          v-for="service in services.slice(1)" 
          :key="service.name" 
          class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-full"
        >
          <div class="relative h-48">
            <img :src="service.image" :alt="$t(service.name)" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 class="text-xl font-bold text-white text-center px-4">{{ $t(service.name) }}</h3>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <p class="text-gray-600 mb-6 flex-grow">{{ $t(service.description) }}</p>
            <NuxtLink 
              :to="localePath(service.link)" 
              class="mt-auto self-center bg-dark text-white font-bold py-2 px-6 rounded-md hover:bg-primary transition-colors duration-300"
            >
              {{ $t('home.services.read_more') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const services = [
  { 
    name: 'services.new_construction', 
    description: 'home.services.descriptions.new_construction', 
    link: '/services/new-construction',
    image: 'https://syktyvdin-r11.gosweb.gosuslugi.ru/netcat_files/36/40/pgs.jpg',
    subServices: [
        'services.sub.design',
        'services.sub.excavation',
        'services.sub.foundation',
        'services.sub.reinforced_concrete',
        'services.sub.wall_construction',
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
    image: 'https://i.pinimg.com/736x/dd/fe/7e/ddfe7e6bb9130bf6b54a8b1cbf0c5a4b.jpg'
  },
  { 
    name: 'services.facade_works', 
    description: 'home.services.descriptions.facade_works', 
    link: '/services/facade-works',
    image: 'https://remont-tat.ru/_ld/1/96194585.webp'
  },
  { 
    name: 'services.floor_sanding', 
    description: 'home.services.descriptions.floor_sanding', 
    link: '/services/floor-sanding',
    image: 'https://avatars.mds.yandex.net/get-ydo/11374192/2a000001958588df6143d1f7971bda5ba947/diploma'
  },
  { 
    name: 'services.concrete_injection', 
    description: 'home.services.descriptions.concrete_injection', 
    link: '/services/concrete-injection',
    image: 'https://i.pinimg.com/originals/1b/0d/eb/1b0debc6f527ad28c517646152396761.jpg'
  }
]
</script> 