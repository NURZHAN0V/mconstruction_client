<template>
  <div class="bg-gray-50 text-gray-800">
    <!-- Hero Section -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          {{ $t('portfolio.title') }}
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          {{ $t('portfolio.subtitle') }}
        </p>
      </div>
    </header>

    <!-- Portfolio Gallery -->
    <main class="py-16 sm:py-24">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="project in portfolioProjects" 
            :key="project.id"
            class="group relative block bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-primary/30"
          >
            <NuxtImg 
              :src="project.image" 
              :alt="$t(project.title)" 
              class="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-70 group-hover:opacity-50"
              loading="lazy"
            />
            <NuxtLink :to="localePath(project.link)" class="relative p-6 h-full flex flex-col justify-end min-h-[400px]">
              <div class="transform transition-all duration-300">
                <h3 class="text-2xl font-bold text-white mb-2">{{ $t(project.title) }}</h3>
                <p class="text-gray-200 mb-4 line-clamp-2">{{ $t(project.description) }}</p>
                <span class="inline-flex items-center font-semibold text-white group-hover:text-primary transition-colors duration-300">
                  {{ $t('portfolio.read_more') }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>

    <!-- Call to Action Section -->
    <HomeCTA />

    <!-- Contact Section -->
    <section id="contacts" class="py-16 sm:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ $t('contacts.title') }}</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">{{ $t('contacts.subtitle') }}</p>
        </div>

        <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
          <!-- Contact Info -->
          <div class="lg:col-span-5">
            <div class="bg-gray-50 p-8 rounded-lg h-full flex flex-col justify-center">
              <div class="flex items-start mb-6">
                <div class="bg-primary/10 p-3 rounded-full mr-4 shrink-0">
                  <Icon name="ri:map-pin-2-line" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900">{{ $t('contacts.address_title') }}</h3>
                  <p class="text-gray-700">{{ $t('contacts.address_value') }}</p>
                </div>
              </div>
              <div class="flex items-start mb-6">
                <div class="bg-primary/10 p-3 rounded-full mr-4 shrink-0">
                  <Icon name="ri:phone-line" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900">{{ $t('contacts.phone_title') }}</h3>
                  <a href="tel:+35799900778" class="text-gray-700 hover:text-primary transition-colors">+357 99-900-778</a>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-primary/10 p-3 rounded-full mr-4 shrink-0">
                  <Icon name="ri:mail-line" class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="font-bold text-lg text-gray-900">{{ $t('contacts.email_title') }}</h3>
                  <a href="mailto:office@k-m-construction.com" class="text-gray-700 hover:text-primary transition-colors">office@k-m-construction.com</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="lg:col-span-7">
            <form @submit.prevent="submitForm" class="bg-gray-50 p-8 rounded-lg">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="name" class="block text-gray-700 font-semibold mb-2">{{ $t('contacts.form.name') }} <span class="text-red-500">*</span></label>
                  <input type="text" id="name" v-model="form.name" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm">
                </div>
                <div>
                  <label for="email" class="block text-gray-700 font-semibold mb-2">{{ $t('contacts.form.email') }} <span class="text-red-500">*</span></label>
                  <input type="email" id="email" v-model="form.email" required class="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm">
                </div>
              </div>
              <div class="mb-6">
                <label for="message" class="block text-gray-700 font-semibold mb-2">{{ $t('contacts.form.message') }} <span class="text-red-500">*</span></label>
                <textarea id="message" v-model="form.message" required rows="5" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"></textarea>
              </div>
              <button type="submit" class="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {{ $t('contacts.form.submit') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

// Meta
useHead({
  title: 'Портфолио - K.M Construction',
  meta: [
    { name: 'description', content: 'Посмотрите наши проекты строительства и реконструкции' }
  ]
})

// Portfolio projects data
const { t } = useI18n()

// Breadcrumbs
const breadcrumbs = computed(() => [
  { title: t('nav.home'), to: '/' },
  { title: t('nav.portfolio') }
])

const portfolioProjects = [
  {
    id: 1,
    title: 'portfolio.extension_construction',
    description: 'portfolio.descriptions.extension_construction',
    image: '/images/portfolio/extension-construction/1.webp',
    link: '/portfolio/extension-construction'
  },
  {
    id: 2,
    title: 'portfolio.monolithic_works',
    description: 'portfolio.descriptions.monolithic_works',
    image: '/images/portfolio/monolithic-works/1.webp',
    link: '/portfolio/monolithic-works'
  },
  {
    id: 3,
    title: 'portfolio.roof_repair',
    description: 'portfolio.descriptions.roof_repair',
    image: '/images/portfolio/roof-repair/1.webp',
    link: '/portfolio/roof-repair'
  },
  {
    id: 4,
    title: 'portfolio.floor_sanding',
    description: 'portfolio.descriptions.floor_sanding',
    image: '/images/portfolio/floor-sanding/photo_6028334436908648615_y.webp',
    link: '/portfolio/floor-sanding'
  },
  {
    id: 5,
    title: 'portfolio.troodos_house',
    description: 'portfolio.descriptions.troodos_house',
    image: '/images/portfolio/troodos-house-construction/photo_6008277321888422211_y.webp',
    link: '/portfolio/troodos-house-construction'
  }
]

// Contact form
const form = ref({
  name: '',
  email: '',
  message: ''
})


// Form submission
function submitForm() {
  // Handle form submission
  console.log('Form submitted:', form.value)
  alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.')
  form.value = { name: '', email: '', message: '' }
}


onMounted(() => {
  // Preload images for better performance
  portfolioProjects.forEach(project => {
    const img = new Image()
    img.src = project.image
    img.loading = 'lazy'
  })
})
</script> 