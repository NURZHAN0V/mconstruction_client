<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumbs -->
    <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />

    <div v-if="service" class="container mx-auto px-4 py-8">
      <!-- Service Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-primary mb-6">{{ $t(service.title) }}</h1>
        <p class="text-xl text-gray-600 max-w-4xl mx-auto">{{ $t(service.description) }}</p>
      </div>

      <!-- Gallery Section -->
      <div v-if="service.images && service.images.length > 0" class="mb-12">
        <CommonGallery :images="service.images" />
      </div>

      <!-- Service Details -->
      <div class="grid lg:grid-cols-3 gap-12 mb-12">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-dark mb-6">{{ $t('service.details_title') }}</h2>
            <div class="prose prose-lg max-w-none">
              <p class="text-gray-600 leading-relaxed mb-6">{{ $t(service.fullDescription) }}</p>
              
              <!-- Service Features -->
              <div v-if="service.subServices" class="mb-8">
                <h3 class="text-xl font-semibold text-dark mb-4">{{ $t('service.features_title') }}</h3>
                <ul class="space-y-3">
                  <li v-for="subService in service.subServices" :key="subService" class="flex items-start">
                    <Icon name="ri:checkbox-circle-fill" class="w-5 h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span class="text-gray-600">{{ $t(subService) }}</span>
                  </li>
                </ul>
              </div>

              <!-- Benefits -->
              <div v-if="service.benefits" class="mb-8">
                <h3 class="text-xl font-semibold text-dark mb-4">{{ $t('service.benefits_title') }}</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div v-for="benefit in service.benefits" :key="benefit" class="flex items-start">
                    <Icon name="ri:check-double-line" class="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span class="text-gray-600">{{ $t(benefit) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-dark mb-6">{{ $t('service.info_title') }}</h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center py-3 border-b border-gray-200">
                <span class="font-semibold text-gray-700">{{ $t('service.category') }}:</span>
                <span class="text-gray-600">{{ $t(service.categoryName) }}</span>
              </div>
              
              <div class="flex justify-between items-center py-3 border-b border-gray-200">
                <span class="font-semibold text-gray-700">{{ $t('service.duration') }}:</span>
                <span class="text-gray-600">{{ service.duration }}</span>
              </div>
              
              <div class="flex justify-between items-center py-3 border-b border-gray-200">
                <span class="font-semibold text-gray-700">{{ $t('service.warranty') }}:</span>
                <span class="text-gray-600">{{ service.warranty }}</span>
              </div>
            </div>

            <!-- Technologies Used -->
            <div v-if="service.technologies" class="mt-6">
              <h4 class="font-semibold text-gray-700 mb-3">{{ $t('service.technologies_title') }}</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in service.technologies"
                  :key="tech"
                  class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {{ $t(tech) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-primary mb-6">{{ $t('service.cta_title') }}</h2>
        <p class="text-lg text-gray-600 mb-8">{{ $t('service.cta_subtitle') }}</p>
        <CommonActionButtons :show-portfolio-button="false" :show-services-button="true" />
      </div>

      <!-- Related Services -->
      <div v-if="relatedServices.length > 0" class="mb-12">
        <h2 class="text-2xl font-bold text-primary mb-8 text-center">{{ $t('service.related_title') }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="relatedService in relatedServices"
            :key="relatedService.slug"
            class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            <div class="relative h-48 overflow-hidden">
              <NuxtImg 
                :src="relatedService.image" 
                :alt="$t(relatedService.title)"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-dark mb-2">{{ $t(relatedService.title) }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ $t(relatedService.description) }}</p>
              <NuxtLink 
                :to="localePath(`/services/${relatedService.slug}`)" 
                class="inline-flex items-center text-primary font-bold hover:text-blue-600 transition-colors"
              >
                {{ $t('portfolio.read_more') }}
                <Icon name="ri:arrow-right-line" class="ml-1" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 404 State -->
    <div v-else class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('service.not_found_title') }}</h1>
      <p class="text-xl text-gray-600 mb-8">{{ $t('service.not_found_message') }}</p>
      <NuxtLink 
        :to="localePath('/services')" 
        class="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-blue-600 transition-colors"
      >
        {{ $t('service.back_to_services') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const slug = route.params.slug as string

// Services data with detailed information
const servicesData = {
  'floor-sanding': {
    title: 'services.floor_sanding',
    description: 'home.services.descriptions.floor_sanding',
    fullDescription: 'service.descriptions.floor_sanding_full',
    categoryName: 'services.floor_sanding',
    duration: '1-3 недели',
    warranty: '2 года',
    images: [
      { src: '/images/services/floor-sanding.webp', alt: 'Шлифовка пола - натуральный камень' },
      { src: '/images/services/floor-sanding.webp', alt: 'Шлифовка бетонного пола' },
      { src: '/images/services/floor-sanding.webp', alt: 'Полировка мраморного пола' }
    ],
    subServices: [
      'services.sub.natural_stone',
      'services.sub.concrete_floor',
    ],
    benefits: [
      'service.benefits.floor_restoration',
      'service.benefits.modern_equipment',
      'service.benefits.quality_guarantee',
      'service.benefits.quick_completion'
    ],
    technologies: [
      'service.tech.diamond_grinding',
      'service.tech.polishing_pads',
      'service.tech.protective_sealers'
    ]
  },
  'concrete-injection': {
    title: 'services.concrete_injection',
    description: 'home.services.descriptions.concrete_injection',
    fullDescription: 'service.descriptions.concrete_injection_full',
    categoryName: 'services.concrete_injection',
    duration: '1-2 недели',
    warranty: '5 лет',
    images: [
      { src: '/images/services/concrete-injection.webp', alt: 'Инъекция бетона - трещины' },
      { src: '/images/services/concrete-injection.webp', alt: 'Инъекционная гидроизоляция' },
      { src: '/images/services/concrete-injection.webp', alt: 'Восстановление конструкций' }
    ],
    subServices: [
      'services.sub.injection_waterproofing',
      'services.sub.crack_injection',
      'services.sub.cold_joint_injection',
      'services.sub.concreting_joints',
      'services.sub.construction_joint_injection',
      'services.sub.entry_injection',
      'services.sub.masonry_injection',
    ],
    benefits: [
      'service.benefits.structural_strengthening',
      'service.benefits.waterproofing',
      'service.benefits.minimal_disruption',
      'service.benefits.long_term_durability'
    ],
    technologies: [
      'service.tech.injection_materials',
      'service.tech.pressure_injection',
      'service.tech.specialized_equipment'
    ]
  },
  'new-construction': {
    title: 'services.new_construction',
    description: 'home.services.descriptions.new_construction',
    fullDescription: 'service.descriptions.new_construction_full',
    categoryName: 'services.new_construction',
    duration: '3-12 месяцев',
    warranty: '10 лет',
    images: [
      { src: '/images/services/new_construction.webp', alt: 'Строительство новых объектов' },
      { src: '/images/services/new_construction.webp', alt: 'Фундаментные работы' },
      { src: '/images/services/new_construction.webp', alt: 'Возведение стен' }
    ],
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
    ],
    benefits: [
      'service.benefits.full_service',
      'service.benefits.quality_materials',
      'service.benefits.project_management',
      'service.benefits.regulatory_compliance'
    ],
    technologies: [
      'service.tech.modern_construction',
      'service.tech.quality_control',
      'service.tech.project_management'
    ]
  },
  'comprehensive-renovation': {
    title: 'services.comprehensive_renovation',
    description: 'home.services.descriptions.comprehensive_renovation',
    fullDescription: 'service.descriptions.comprehensive_renovation_full',
    categoryName: 'services.comprehensive_renovation',
    duration: '2-8 недель',
    warranty: '3 года',
    images: [
      { src: '/images/services/comprehensive-renovation.webp', alt: 'Комплексный ремонт' },
      { src: '/images/services/comprehensive-renovation.webp', alt: 'Обновление интерьера' },
      { src: '/images/services/comprehensive-renovation.webp', alt: 'Современные решения' }
    ],
    subServices: [
      'services.sub.concrete_reinforcement',
      'services.sub.floor_dismantling',
      'services.sub.screed_flooring',
      'services.sub.wall_cladding',
      'services.sub.door_installation',
      'services.sub.hydro_thermal_insulation_reno',
      'services.sub.utility_replacement',
    ],
    benefits: [
      'service.benefits.complete_renovation',
      'service.benefits.modern_technology',
      'service.benefits.energy_efficiency',
      'service.benefits.aesthetic_improvement'
    ],
    technologies: [
      'service.tech.modern_materials',
      'service.tech.energy_solutions',
      'service.tech.quality_finishing'
    ]
  },
  'facade-works': {
    title: 'services.facade_works',
    description: 'home.services.descriptions.facade_works',
    fullDescription: 'service.descriptions.facade_works_full',
    categoryName: 'services.facade_works',
    duration: '2-6 недель',
    warranty: '5 лет',
    images: [
      { src: '/images/services/facade-works.webp', alt: 'Фасадные работы' },
      { src: '/images/services/facade-works.webp', alt: 'Реставрация фасада' },
      { src: '/images/services/facade-works.webp', alt: 'Декоративная отделка' }
    ],
    subServices: [
      'services.sub.facade_restoration',
      'services.sub.painting',
      'services.sub.cladding',
      'services.sub.facade_insulation',
      'services.sub.decorative_finishing',
      'services.sub.roof_installation',
    ],
    benefits: [
      'service.benefits.weather_protection',
      'service.benefits.thermal_insulation',
      'service.benefits.aesthetic_enhancement',
      'service.benefits.long_term_protection'
    ],
    technologies: [
      'service.tech.weather_resistant_materials',
      'service.tech.thermal_insulation',
      'service.tech.decorative_finishes'
    ]
  }
}

// Helper function to get service title for meta
function getServiceTitle(slug: string): string {
  const service = servicesData[slug as keyof typeof servicesData]
  return service ? t(service.title) : t('nav.services')
}

const service = computed(() => servicesData[slug as keyof typeof servicesData])

// Meta
useHead({
  title: () => `${getServiceTitle(slug)} - K.M Construction`,
  meta: [
    { name: 'description', content: () => service.value ? t(service.value.description) : '' }
  ]
})

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: t('breadcrumbs.home'), to: localePath('/') },
  { title: t('nav.services'), to: localePath('/services') },
  { title: service.value ? t(service.value.title) : t('nav.services') }
])

// Related services (other services)
const relatedServices = computed(() => {
  if (!service.value) return []
  
  return Object.entries(servicesData)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, data]) => ({
      slug: key,
      title: data.title,
      description: data.description,
      image: data.images[0]?.src || '/images/placeholder.webp'
    }))
})
</script> 