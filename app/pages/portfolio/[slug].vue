<template>
  <div class="bg-white text-gray-800">
    <div v-if="project" class="container mx-auto px-4 py-12 sm:py-16">
      <!-- Header -->
      <header class="mb-12">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">{{ project.title }}</h1>
            <p class="text-lg text-gray-600 max-w-3xl">{{ project.description }}</p>
          </div>
          <CommonActionButtons 
            show-call-button
            show-email-button
            show-portfolio-button 
            :transparent="true"
            justify="end"
          />
        </div>
      </header>

      <!-- Main Content -->
      <main>
        <!-- Gallery -->
        <div class="max-w-6xl mx-auto">
          <div v-if="project.images && project.images.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              v-for="(image, index) in project.images" 
              :key="index"
              class="relative group cursor-pointer overflow-hidden rounded-lg aspect-w-1 aspect-h-1"
              @click="openFullscreen(index)"
            >
              <NuxtImg 
                :src="image.src" 
                :alt="image.alt"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                sizes="sm:50vw lg:40vw"
              />
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="ri:zoom-in-line" class="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- 404 State -->
    <div v-else class="container mx-auto px-4 py-20 text-center">
      <div class="max-w-md mx-auto">
        <Icon name="ri:error-warning-line" class="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('project.not_found_title') }}</h1>
        <p class="text-xl text-gray-600 mb-8">{{ $t('project.not_found_message') }}</p>
        <CommonActionButtons show-portfolio-button />
      </div>
    </div>

    <!-- Fullscreen Modal -->
    <div 
      v-if="isFullscreen" 
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity duration-300"
      @click="closeFullscreen"
      :class="isFullscreen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- Close Button -->
        <button 
          @click.stop="closeFullscreen"
          class="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          aria-label="Close fullscreen view"
        >
          <Icon name="ri:close-line" class="w-6 h-6" />
        </button>

        <!-- Fullscreen Image -->
        <div class="relative max-w-[90vw] max-h-[90vh]" @click.stop>
          <transition name="fade" mode="out-in">
            <NuxtImg 
              :key="currentFullscreenImage"
              :src="currentFullscreenImage" 
              :alt="currentFullscreenAlt"
              class="object-contain"
              style="max-width: 100%; max-height: 100%;"
            />
          </transition>
        </div>
          
        <!-- Navigation Arrows -->
        <template v-if="project && project.images && project.images.length > 1">
          <button 
            @click.stop="previousFullscreenImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <Icon name="ri:arrow-left-s-line" class="w-8 h-8" />
          </button>
          
          <button 
            @click.stop="nextFullscreenImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <Icon name="ri:arrow-right-s-line" class="w-8 h-8" />
          </button>
        </template>

        <!-- Image Counter -->
        <div v-if="project && project.images && project.images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {{ currentFullscreenIndex + 1 }} / {{ project.images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

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
        src: '/images/portfolio/floor-sanding/photo_6028334436908648615_y.webp',
        alt: 'Шлифовка пола - натуральный камень',
        thumbnail: '/images/portfolio/floor-sanding/photo_6028334436908648615_y.webp'
      },
      {
        src: '/images/portfolio/floor-sanding/6048585302198568951-819x1024.webp',
        alt: 'Шлифовка бетонного пола',
        thumbnail: '/images/portfolio/floor-sanding/6048585302198568951-819x1024.webp'
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
        src: '/images/portfolio/monolithic-works/1.webp',
        alt: 'Монолитные бетонные работы',
        thumbnail: '/images/portfolio/monolithic-works/1.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/2.webp',
        alt: 'Заливка бетона',
        thumbnail: '/images/portfolio/monolithic-works/2.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/3.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/3.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/4.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/4.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/5.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/5.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/6.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/6.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/7.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/7.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/8.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/8.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/9.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/9.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/10.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/10.webp'
      },
      {
        src: '/images/portfolio/monolithic-works/11.webp',
        alt: 'Армирование конструкции',
        thumbnail: '/images/portfolio/monolithic-works/11.webp'
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
        src: '/images/portfolio/extension-construction/1.webp',
        alt: 'Строительство пристройки к дому',
        thumbnail: '/images/portfolio/extension-construction/1.webp'
      },
      {
        src: '/images/portfolio/extension-construction/2.webp',
        alt: 'Фундаментные работы',
        thumbnail: '/images/portfolio/extension-construction/2.webp'
      },
      {
        src: '/images/portfolio/extension-construction/3.webp',
        alt: 'Возведение стен',
        thumbnail: '/images/portfolio/extension-construction/3.webp'
      },
      {
        src: '/images/portfolio/extension-construction/4.webp',
        alt: 'Возведение стен',
        thumbnail: '/images/portfolio/extension-construction/4.webp'
      },
      {
        src: '/images/portfolio/extension-construction/5.webp',
        alt: 'Возведение стен',
        thumbnail: '/images/portfolio/extension-construction/5.webp'
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
        src: '/images/portfolio/roof-repair/1.webp',
        alt: 'Ремонт кровли здания',
        thumbnail: '/images/portfolio/roof-repair/1.webp'
      },
      {
        src: '/images/portfolio/roof-repair/2.webp',
        alt: 'Гидроизоляция кровли',
        thumbnail: '/images/portfolio/roof-repair/2.webp'
      },
      {
        src: '/images/portfolio/roof-repair/3.webp',
        alt: 'Установка новых материалов',
        thumbnail: '/images/portfolio/roof-repair/3.webp'
      },
      {
        src: '/images/portfolio/roof-repair/4.webp',
        alt: 'Установка новых материалов',
        thumbnail: '/images/portfolio/roof-repair/4.webp'
      },
      {
        src: '/images/portfolio/roof-repair/5.webp',
        alt: 'Установка новых материалов',
        thumbnail: '/images/portfolio/roof-repair/5.webp'
      },
      {
        src: '/images/portfolio/roof-repair/6.webp',
        alt: 'Установка новых материалов',
        thumbnail: '/images/portfolio/roof-repair/6.webp'
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
  },
  'troodos-house-construction': {
    title: 'portfolio.troodos_house',
    description: 'portfolio.descriptions.troodos_house',
    fullDescription: 'project.descriptions.troodos_house_full',
    categoryName: 'portfolio.troodos_house',
    year: '2024',
    location: 'Тродос, Кипр',
    duration: '6-8 месяцев',
    images: [
      {
        src: '/images/portfolio/troodos-house-construction/photo_6008277321888422211_y.webp',
        alt: 'Сборка дома в Тродосе - фундамент и каркас',
        thumbnail: '/images/portfolio/troodos-house-construction/photo_6008277321888422211_y.webp'
      },
      {
        src: '/images/portfolio/troodos-house-construction/photo_6008277321888422212_y.webp',
        alt: 'Строительство дома в горах',
        thumbnail: '/images/portfolio/troodos-house-construction/photo_6008277321888422212_y.webp'
      },
      {
        src: '/images/portfolio/troodos-house-construction/photo_6008277321888422213_y.webp',
        alt: 'Возведение стен и перекрытий',
        thumbnail: '/images/portfolio/troodos-house-construction/photo_6008277321888422213_y.webp'
      },
      {
        src: '/images/portfolio/troodos-house-construction/photo_6008277321888422214_y.webp',
        alt: 'Этапы строительства дома',
        thumbnail: '/images/portfolio/troodos-house-construction/photo_6008277321888422214_y.webp'
      }
    ],
    features: [
      'project.features.foundation_work',
      'project.features.reinforced_concrete',
      'project.features.modern_design',
      'project.features.energy_efficiency'
    ],
    technologies: [
      'project.tech.reinforced_concrete',
      'project.tech.thermal_insulation',
      'project.tech.modern_materials'
    ]
  }
}

// Helper function to get project title for meta
function getProjectTitle(slug: string): string {
  const projectDataUntranslated = portfolioData[slug as keyof typeof portfolioData]
  return projectDataUntranslated ? t(projectDataUntranslated.title) : 'Проект'
}

// Meta
useHead({
  title: () => `Портфолио - ${getProjectTitle(slug as string)} - K.M Construction`,
  meta: [
    { name: 'description', content: () => `Посмотрите наш проект ${getProjectTitle(slug as string)} - профессиональные услуги строительства на Кипре` }
  ]
})

const project = computed(() => {
  const proj = portfolioData[slug as keyof typeof portfolioData];
  if (!proj) return null;
  
  return {
    ...proj,
    title: t(proj.title),
    description: t(proj.description),
  };
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: t('nav.home'), to: '/' },
  { title: t('nav.portfolio'), to: '/portfolio' },
  { title: project.value ? project.value.title : 'Проект' }
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
    if (!isFullscreen.value) return
    if (event.key === 'ArrowLeft') {
      previousFullscreenImage()
    } else if (event.key === 'ArrowRight') {
      nextFullscreenImage()
    } else if (event.key === 'Escape') {
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
  if (isFullscreen.value) {
    document.body.style.overflow = 'auto'
  }
})
</script> 