<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Breadcrumbs -->
    <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />

    <!-- Hero Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 text-primary">{{ $t('nav.services') }}</h1>
          <p class="text-xl md:text-2xl text-gray-600 leading-relaxed">
            {{ $t('home.services.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          <div 
            v-for="service in services" 
            :key="service.slug"
            class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-primary/30 group"
          >
            <div class="relative h-64 md:h-80 overflow-hidden">
              <NuxtImg 
                :src="service.image" 
                :alt="$t(service.title)"
                class="w-full h-full object-cover transition-all duration-300"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-black/75"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t(service.title) }}</h3>
                <p class="text-blue-100 line-clamp-2">{{ $t(service.description) }}</p>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in service.tags" :key="tag" class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {{ $t(tag) }}
                </span>
              </div>
              <NuxtLink 
                :to="localePath(`/services/${service.slug}`)" 
                class="inline-flex items-center justify-center gap-2 font-bold py-2.5 px-5 rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-all duration-300 group"
              >
                {{ $t('home.services.read_more') }}
                <Icon name="ri:arrow-right-line" class="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
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
          <div v-for="item in whyChooseUsItems" :key="item.title" class="text-center">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon :name="item.icon" class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-bold text-dark mb-2">{{ $t(item.title) }}</h3>
            <p class="text-gray-600">{{ $t(item.description) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6 text-primary">{{ $t('home.cta.title') }}</h2>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{{ $t('home.cta.subtitle') }}</p>
          <CommonActionButtons :show-portfolio-button="false" :show-services-button="false" :transparent="true" />
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
    { name: 'description', content: () => t('home.services.subtitle') }
  ]
})

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: t('breadcrumbs.home'), to: localePath('/') },
  { title: t('nav.services') }
])

const services = [
  {
    slug: 'new-construction',
    title: 'services.new_construction',
    description: 'home.services.descriptions.new_construction',
    image: '/images/services/new_construction/photo_6028334436908648604_y.webp',
    tags: ['services.sub.design', 'services.sub.foundation', 'services.sub.finishing_works']
  },
  {
    slug: 'comprehensive-renovation',
    title: 'services.comprehensive_renovation',
    description: 'home.services.descriptions.comprehensive_renovation',
    image: '/images/services/comprehensive-renovation/photo_6028334436908648610_y.webp',
    tags: ['services.sub.concrete_reinforcement', 'services.sub.wall_cladding', 'services.sub.utility_replacement']
  },
  {
    slug: 'facade-works',
    title: 'services.facade_works',
    description: 'home.services.descriptions.facade_works',
    image: '/images/services/facade-works/photo_6028424944754478134_y.webp',
    tags: ['services.sub.facade_restoration', 'services.sub.facade_insulation', 'services.sub.decorative_finishing']
  },
  {
    slug: 'floor-sanding',
    title: 'services.floor_sanding',
    description: 'home.services.descriptions.floor_sanding',
    image: '/images/services/floor-sanding/photo_6028334436908648615_y.webp',
    tags: ['services.sub.natural_stone', 'services.sub.concrete_floor']
  },
  {
    slug: 'concrete-injection',
    title: 'services.concrete_injection',
    description: 'home.services.descriptions.concrete_injection',
    image: '/images/services/concrete-injection/photo_6028334436908648619_y.webp',
    tags: ['services.sub.injection_waterproofing', 'services.sub.crack_injection', 'services.sub.masonry_injection']
  }
]

const whyChooseUsItems = [
  {
    icon: 'ri:medal-line',
    title: 'home.why_choose_us.quality.title',
    description: 'home.why_choose_us.quality.description'
  },
  {
    icon: 'ri:timer-flash-line',
    title: 'home.why_choose_us.speed.title',
    description: 'home.why_choose_us.speed.description'
  },
  {
    icon: 'ri:shield-star-line',
    title: 'home.why_choose_us.guarantee.title',
    description: 'home.why_choose_us.guarantee.description'
  },
  {
    icon: 'ri:group-line',
    title: 'home.why_choose_us.experience.title',
    description: 'home.why_choose_us.experience.description'
  }
]
</script>
