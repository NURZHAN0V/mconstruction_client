<template>
  <header class="bg-light shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- Top bar -->
      <div class="hidden md:flex justify-between items-center py-2 text-sm text-dark border-b">
        <div class="flex items-center space-x-4">
          <a href="tel:+35799900778" class="flex items-center space-x-1 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+357 99-900-778</span>
          </a>
          <a href="mailto:office@k-m-construction.com" class="flex items-center space-x-1 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>office@k-m-construction.com</span>
          </a>
        </div>
        <div class="flex items-center space-x-2">
          <a href="#" class="hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" class="hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-2.8 2.1c-1.2 1.1-2.8 2.3-4.4 2.3s-2.8-1.1-2.8-2.3c0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4s-1.6-1.2-1.6-2.8c0-1.6 2.1-4.2 4.2-4.2s4.2 2.5 4.2 2.5-1.2-2.3-2.8-2.3c-1.6 0-2.8 1.1-2.8 2.3 0 1.2 1.6 2.5 1.6 2.5s-1.6 1.4-2.8 1.4c-1.2 0-2.8-1.4-2.8-1.4S4 8.5 4 6.9c0-1.6 2.1-4.2 4.2-4.2s4.2 2.5 4.2 2.5-1.2-2.3-2.8-2.3C8.1 3.1 7 4.2 7 5.5c0 1.2 1.6 2.5 1.6 2.5S7 9.4 5.4 9.4c-1.2 0-2.8-1.4-2.8-1.4S.5 12.1.5 14c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 17.5.5 19.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3C4.1 23.1 3 22 3 20.7c0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 22.5.5 24c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 26.5.5 28.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 30.5.5 32.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 34.5.5 36.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 38.5.5 40.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 42.5.5 44.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5-1.6 2.3-2.8 2.3c-1.6 0-2.8-1.1-2.8-2.3 0-1.2 1.6-2.5 1.6-2.5s-1.6-1.4-2.8-1.4c-1.2 0-2.8 1.4-2.8 1.4S.5 46.5.5 48.1c0 1.6 2.1 4.2 4.2 4.2s4.2-2.5 4.2-2.5L22 4z"/></svg></a>
          <a href="#" class="hover:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
        </div>
      </div>

      <!-- Main navigation -->
      <div class="flex justify-between items-center py-4">
        <NuxtLink :to="localePath('/')" class="text-2xl font-bold text-dark">
          K.M.Construction
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors">{{ $t('nav.home') }}</NuxtLink>
          
          <div class="relative" ref="servicesMenuRef">
            <button @click="toggleMenu('services')" @mouseover="openMenu('services')" aria-haspopup="true" :aria-expanded="menuState.services" class="flex items-center hover:text-primary transition-colors">
              {{ $t('nav.services') }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-1 transition-transform" :class="{ 'rotate-180': menuState.services }"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <transition name="fade">
              <div v-if="menuState.services" @mouseleave="closeMenu('services')" class="absolute z-10 mt-2 w-48 bg-light rounded-md shadow-lg">
                <NuxtLink v-for="service in services" :key="service.slug" :to="localePath(`/services/${service.slug}`)" class="block px-4 py-2 text-sm text-dark hover:bg-gray-100">{{ $t(service.name) }}</NuxtLink>
              </div>
            </transition>
          </div>

          <div class="relative" ref="portfolioMenuRef">
            <button @click="toggleMenu('portfolio')" @mouseover="openMenu('portfolio')" aria-haspopup="true" :aria-expanded="menuState.portfolio" class="flex items-center hover:text-primary transition-colors">
              {{ $t('nav.portfolio') }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-1 transition-transform" :class="{ 'rotate-180': menuState.portfolio }"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <transition name="fade">
              <div v-if="menuState.portfolio" @mouseleave="closeMenu('portfolio')" class="absolute z-10 mt-2 w-48 bg-light rounded-md shadow-lg">
                  <NuxtLink v-for="item in portfolio" :key="item.slug" :to="localePath(`/portfolio/${item.slug}`)" class="block px-4 py-2 text-sm text-dark hover:bg-gray-100">{{ $t(item.name) }}</NuxtLink>
              </div>
            </transition>
          </div>
          <NuxtLink :to="localePath('/contacts')" class="hover:text-primary transition-colors">{{ $t('nav.contacts') }}</NuxtLink>
        </nav>

        <div class="flex items-center space-x-4">
            <div class="relative" ref="langMenuRef">
                <button @click="toggleMenu('lang')" aria-haspopup="true" :aria-expanded="menuState.lang" class="flex items-center border px-2 py-1 rounded-md">
                    {{ currentLocale?.name }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ml-1 transition-transform" :class="{ 'rotate-180': menuState.lang }"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <transition name="fade">
                   <div v-if="menuState.lang" class="absolute z-10 mt-2 right-0 w-32 bg-light rounded-md shadow-lg">
                      <button v-for="lang in availableLocales" :key="lang.code" @click="changeLocale(lang.code)" class="block w-full text-left px-4 py-2 text-sm text-dark hover:bg-gray-100">
                          {{ lang.name }}
                      </button>
                  </div>
                </transition>
            </div>
            <!-- Mobile Menu Button -->
            <button @click="toggleMenu('mobile')" class="md:hidden" aria-label="Toggle menu" :aria-expanded="menuState.mobile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="menuState.mobile" class="md:hidden bg-light border-t">
          <NuxtLink :to="localePath('/')" class="block px-4 py-2 hover:bg-gray-100" @click="closeMenu('mobile')">{{ $t('nav.home') }}</NuxtLink>
          <div class="px-4 py-2">
              <h3 class="font-bold mb-2">{{ $t('nav.services') }}</h3>
              <NuxtLink v-for="service in services" :key="service.slug" :to="localePath(`/services/${service.slug}`)" class="block pl-4 py-1 hover:bg-gray-100" @click="closeMenu('mobile')">{{ $t(service.name) }}</NuxtLink>
          </div>
          <div class="px-4 py-2">
              <h3 class="font-bold mb-2">{{ $t('nav.portfolio') }}</h3>
              <NuxtLink v-for="item in portfolio" :key="item.slug" :to="localePath(`/portfolio/${item.slug}`)" class="block pl-4 py-1 hover:bg-gray-100" @click="closeMenu('mobile')">{{ $t(item.name) }}</NuxtLink>
          </div>
          <NuxtLink :to="localePath('/contacts')" class="block px-4 py-2 hover:bg-gray-100" @click="closeMenu('mobile')">{{ $t('nav.contacts') }}</NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const menuState = reactive({
  services: false,
  portfolio: false,
  lang: false,
  mobile: false,
})

const servicesMenuRef = ref<HTMLElement | null>(null);
const portfolioMenuRef = ref<HTMLElement | null>(null);
const langMenuRef = ref<HTMLElement | null>(null);

const toggleMenu = (menu: keyof typeof menuState) => {
  menuState[menu] = !menuState[menu]
}

const openMenu = (menu: keyof typeof menuState) => {
  if (window.innerWidth >= 768) { // md breakpoint
    menuState[menu] = true
  }
}

const closeMenu = (menu: keyof typeof menuState) => {
  menuState[menu] = false
}

let handleClickOutside: ((event: MouseEvent) => void) | null = null

onMounted(() => {
  handleClickOutside = (event: MouseEvent) => {
    if (servicesMenuRef.value && !servicesMenuRef.value.contains(event.target as Node)) {
      closeMenu('services');
    }
    if (portfolioMenuRef.value && !portfolioMenuRef.value.contains(event.target as Node)) {
      closeMenu('portfolio');
    }
    if (langMenuRef.value && !langMenuRef.value.contains(event.target as Node)) {
      closeMenu('lang');
    }
  }
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  if (handleClickOutside) {
    document.removeEventListener('click', handleClickOutside);
    handleClickOutside = null;
  }
});


const services = [
  { name: 'services.floor_sanding', slug: 'floor-sanding' },
  { name: 'services.concrete_injection', slug: 'concrete-injection' },
  { name: 'services.new_construction', slug: 'new-construction' },
  { name: 'services.comprehensive_renovation', slug: 'comprehensive-renovation' },
  { name: 'services.facade_works', slug: 'facade-works' },
  { name: 'services.monolithic_works', slug: 'monolithic-works' },
]

const portfolio = [
    { name: 'portfolio.floor_sanding', slug: 'floor-sanding' },
    { name: 'portfolio.monolithic_works', slug: 'monolithic-works' },
    { name: 'portfolio.extension_construction', slug: 'extension-construction' },
    { name: 'portfolio.roof_repair', slug: 'roof-repair' },
]

const currentLocale = computed(() => locales.value.find(l => l.code === locale.value))
const availableLocales = computed(() => locales.value.filter(l => l.code !== locale.value))

const changeLocale = (code: string) => {
  setLocale(code as 'en' | 'ru')
  closeMenu('lang')
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style> 