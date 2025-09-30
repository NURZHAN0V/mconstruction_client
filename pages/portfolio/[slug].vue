<template>
  <div class="min-h-screen bg-white">
    <!-- Breadcrumbs -->
    <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />

    <div v-if="project" class="container mx-auto px-4 py-8">
      <!-- Project Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t(project.title) }}</h1>
        
        <!-- Main Title and CTA Button -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 class="text-5xl font-bold text-primary mb-4 lg:mb-0">{{ $t(project.title) }}</h2>
          <a 
            href="tel:+35799900778" 
            class="bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 inline-flex items-center justify-center gap-2 self-start lg:self-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            {{ $t('action_buttons.call') }}
          </a>
        </div>
        
        <p class="text-lg text-gray-600">{{ $t(project.description) }}</p>
      </div>

      <!-- Gallery Section -->
      <div v-if="project.images && project.images.length > 0" class="mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            v-for="(image, index) in project.images" 
            :key="index"
            class="relative group cursor-pointer overflow-hidden rounded-lg"
            @click="openFullscreen(index)"
          >
            <NuxtImg 
              :src="image.src" 
              :alt="image.alt"
              class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
              {{ $t(project.title) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 404 State -->
    <div v-else class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('project.not_found_title') }}</h1>
      <p class="text-xl text-gray-600 mb-8">{{ $t('project.not_found_message') }}</p>
      <NuxtLink 
        :to="localePath('/portfolio')" 
        class="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-blue-600 transition-colors"
      >
        {{ $t('project.back_to_portfolio') }}
      </NuxtLink>
    </div>

    <!-- Fullscreen Modal -->
    <div 
      v-if="isFullscreen" 
      class="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      @click="closeFullscreen"
    >
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <!-- Close Button -->
        <button 
          @click="closeFullscreen"
          class="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Fullscreen Image -->
        <div class="relative max-w-full max-h-full" @click.stop>
          <NuxtImg 
            :src="currentFullscreenImage" 
            :alt="currentFullscreenAlt"
            class="max-w-full max-h-full object-contain"
            loading="lazy"
          />
          
          <!-- Navigation Arrows in Fullscreen -->
          <button 
            v-if="project && project.images && project.images.length > 1"
            @click="previousFullscreenImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            v-if="project && project.images && project.images.length > 1"
            @click="nextFullscreenImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image Counter in Fullscreen -->
          <div v-if="project && project.images && project.images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-lg">
            {{ currentFullscreenIndex + 1 }} / {{ project.images.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const slug = route.params.slug

// Project data with detailed information
const portfolioData = {
  'floor-sanding': {
    title: 'portfolio.floor_sanding',
    description: 'portfolio.descriptions.floor_sanding',
    fullDescription: 'project.descriptions.floor_sanding_full',
    categoryName: 'portfolio.floor_sanding',
    year: '2024',
    location: 'Пафос, Кипр',
    duration: '2-3 недели',
    images: [
      {
        src: '/images/portfolio/floor-sanding/6048585302198568950-819x1024.webp',
        alt: 'Шлифовка пола - натуральный камень',
        thumbnail: '/images/portfolio/floor-sanding/6048585302198568950-819x1024.webp'
      },
      {
        src: '/images/portfolio/floor-sanding/6048585302198568951-819x1024.webp',
        alt: 'Шлифовка бетонного пола',
        thumbnail: '/images/portfolio/floor-sanding/6048585302198568951-819x1024.webp'
      },
      {
        src: '/images/portfolio/floor-sanding/6048585302198568952-819x1024.webp',
        alt: 'Полировка мраморного пола',
        thumbnail: '/images/portfolio/floor-sanding/6048585302198568952-819x1024.webp'
      }
    ],
    features: [
      'project.features.natural_stone_sanding',
      'project.features.concrete_floor_sanding',
      'project.features.polishing_finishing',
      'project.features.protective_coating'
    ],
    technologies: [
      'project.tech.diamond_grinding',
      'project.tech.polishing_pads',
      'project.tech.protective_sealers'
    ]
  },
  'monolithic-works': {
    title: 'portfolio.monolithic_works',
    description: 'portfolio.descriptions.monolithic_works',
    fullDescription: 'project.descriptions.monolithic_works_full',
    categoryName: 'portfolio.monolithic_works',
    year: '2024',
    location: 'Лимассол, Кипр',
    duration: '4-6 недель',
    images: [
      {
        src: 'https://placehold.net/800x600/6c757d/ffffff?text=Monolithic+Works',
        alt: 'Монолитные бетонные работы',
        thumbnail: 'https://placehold.net/300x300/6c757d/ffffff?text=Monolithic+Works'
      },
      {
        src: 'https://placehold.net/800x600',
        alt: 'Заливка бетона',
        thumbnail: 'https://placehold.net/300x300'
      },
      {
        src: 'https://placehold.net/800x600',
        alt: 'Армирование конструкции',
        thumbnail: 'https://placehold.net/300x300'
      }
    ],
    features: [
      'project.features.reinforced_concrete',
      'project.features.formwork_installation',
      'project.features.concrete_pouring',
      'project.features.quality_control'
    ],
    technologies: [
      'project.tech.modern_formwork',
      'project.tech.concrete_pumping',
      'project.tech.reinforcement_steel'
    ]
  },
  'extension-construction': {
    title: 'portfolio.extension_construction',
    description: 'portfolio.descriptions.extension_construction',
    fullDescription: 'project.descriptions.extension_construction_full',
    categoryName: 'portfolio.extension_construction',
    year: '2023',
    location: 'Никосия, Кипр',
    duration: '8-12 недель',
    images: [
      {
        src: 'https://placehold.net/800x600/007bff/ffffff?text=Extension+Construction',
        alt: 'Строительство пристройки к дому',
        thumbnail: 'https://placehold.net/300x300/007bff/ffffff?text=Extension+Construction'
      },
      {
        src: 'https://placehold.net/800x600',
        alt: 'Фундаментные работы',
        thumbnail: 'https://placehold.net/300x300'
      },
      {
        src: 'https://placehold.net/800x600',
        alt: 'Возведение стен',
        thumbnail: 'https://placehold.net/300x300'
      }
    ],
    features: [
      'project.features.foundation_work',
      'project.features.structural_engineering',
      'project.features.modern_design',
      'project.features.energy_efficiency'
    ],
    technologies: [
      'project.tech.reinforced_concrete',
      'project.tech.thermal_insulation',
      'project.tech.modern_materials'
    ]
  },
  'roof-repair': {
    title: 'portfolio.roof_repair',
    description: 'portfolio.descriptions.roof_repair',
    fullDescription: 'project.descriptions.roof_repair_full',
    categoryName: 'portfolio.roof_repair',
    year: '2023',
    location: 'Ларнака, Кипр',
    duration: '3-5 недель',
    images: [
      {
        src: 'https://placehold.net/800x600/28a745/ffffff?text=Roof+Repair',
        alt: 'Ремонт кровли здания',
        thumbnail: 'https://placehold.net/300x300/28a745/ffffff?text=Roof+Repair'
      },
      {
        src: 'https://placehold.net/800x600',
        alt: 'Гидроизоляция кровли',
        thumbnail: 'https://placehold.net/300x300'
      },
      {
        src: 'https://placehold.net/800x600',
        alt: 'Установка новых материалов',
        thumbnail: 'https://placehold.net/300x300'
      }
    ],
    features: [
      'project.features.waterproofing',
      'project.features.structural_repair',
      'project.features.historic_preservation',
      'project.features.modern_materials'
    ],
    technologies: [
      'project.tech.waterproof_membranes',
      'project.tech.modern_roofing',
      'project.tech.insulation_materials'
    ]
  }
}

// Helper function to get project title for meta
function getProjectTitle(slug: string): string {
  const project = portfolioData[slug as keyof typeof portfolioData]
  return project ? t(project.title) : 'Проект'
}

// Meta
useHead({
  title: () => `Портфолио - ${getProjectTitle(slug as string)} - K.M Construction`,
  meta: [
    { name: 'description', content: () => `Посмотрите наш проект ${getProjectTitle(slug as string)} - профессиональные услуги строительства на Кипре` }
  ]
})

const project = computed(() => portfolioData[slug as keyof typeof portfolioData])

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: t('nav.home'), to: '/' },
  { title: t('nav.portfolio'), to: '/portfolio' },
  { title: project.value ? t(project.value.title) : 'Проект' }
])

// Fullscreen modal state
const isFullscreen = ref(false)
const currentFullscreenIndex = ref(0)

const currentFullscreenImage = computed(() => {
  if (!project.value || !project.value.images) return ''
  return project.value.images[currentFullscreenIndex.value]?.src || ''
})

const currentFullscreenAlt = computed(() => {
  if (!project.value || !project.value.images) return ''
  return project.value.images[currentFullscreenIndex.value]?.alt || ''
})

const openFullscreen = (index: number) => {
  currentFullscreenIndex.value = index
  isFullscreen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullscreen = () => {
  isFullscreen.value = false
  document.body.style.overflow = 'auto'
}

const nextFullscreenImage = () => {
  if (!project.value || !project.value.images) return
  if (currentFullscreenIndex.value < project.value.images.length - 1) {
    currentFullscreenIndex.value++
  } else {
    currentFullscreenIndex.value = 0
  }
}

const previousFullscreenImage = () => {
  if (!project.value || !project.value.images) return
  if (currentFullscreenIndex.value > 0) {
    currentFullscreenIndex.value--
  } else {
    currentFullscreenIndex.value = project.value.images.length - 1
  }
}

// Keyboard navigation
let handleKeydown: ((event: KeyboardEvent) => void) | null = null

onMounted(() => {
  handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      previousFullscreenImage()
    } else if (event.key === 'ArrowRight') {
      nextFullscreenImage()
    } else if (event.key === 'Escape' && isFullscreen.value) {
      closeFullscreen()
    }
  }
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (handleKeydown) {
    document.removeEventListener('keydown', handleKeydown)
    handleKeydown = null
  }
  // Restore body overflow when component is unmounted
  document.body.style.overflow = 'auto'
})
</script> 