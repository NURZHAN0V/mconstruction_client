<template>
  <header ref="headerRef" class="bg-white/75 backdrop-blur-lg shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- Top bar -->
      <div class="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-200">
        <div class="flex items-center space-x-6">
          <a href="tel:+35799900778" class="flex items-center space-x-2 hover:text-blue-600 transition-colors">
            <Icon name="ri:phone-fill" class="w-4 h-4" />
            <span>+357 99-900-778</span>
          </a>
          <a href="mailto:office@k-m-construction.com" class="flex items-center space-x-2 hover:text-blue-600 transition-colors">
            <Icon name="ri:mail-fill" class="w-4 h-4" />
            <span>office@k-m-construction.com</span>
          </a>
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
            <Icon name="ri:facebook-fill" class="w-5 h-5" />
          </a>
          <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Instagram">
            <Icon name="ri:instagram-line" class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Main navigation -->
      <div class="flex justify-between items-center py-4">
        <NuxtLink :to="localePath('/')" class="text-2xl font-bold text-gray-800">
          <span class="hidden sm:inline">K.M.Construction</span>
          <span class="sm:hidden">K.M.C.</span>
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center space-x-8">
          <template v-for="navItem in navigation" :key="navItem.name">
            <div v-if="navItem.children" 
                 class="relative" 
                 @mouseenter="openMenu(navItem.name)" 
                 @mouseleave="closeMenu(navItem.name)">
              <button class="flex items-center hover:text-blue-600 transition-colors pointer-events-none">
                {{ $t(navItem.name) }}
                <Icon name="ri:arrow-down-s-line" class="w-5 h-5 ml-1 transition-transform" :class="{ 'rotate-180': isMenuOpen(navItem.name) }" />
              </button>
              <transition name="fade">
                <div v-if="isMenuOpen(navItem.name)" class="absolute z-10 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <NuxtLink v-for="child in navItem.children" :key="child.slug" :to="localePath(`${navItem.path}/${child.slug}`)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="closeMenu(navItem.name)">
                    {{ $t(child.name) }}
                  </NuxtLink>
                </div>
              </transition>
            </div>
            <NuxtLink v-else :to="localePath(navItem.path)" class="hover:text-blue-600 transition-colors">
              {{ $t(navItem.name) }}
            </NuxtLink>
          </template>
        </nav>

        <div class="flex items-center space-x-4">
            <div class="relative" 
                 @mouseenter="openMenu('lang')"
                 @mouseleave="closeMenu('lang')">
                <button class="flex items-center border border-gray-300 px-3 py-1.5 rounded-md hover:border-blue-600 transition-colors pointer-events-none">
                    <Icon :name="currentLocale?.icon || 'ri:global-line'" class="w-5 h-5" />
                    <span class="mx-2 text-sm font-medium">{{ currentLocale?.name || 'EN' }}</span>
                    <Icon name="ri:arrow-down-s-line" class="w-5 h-5 transition-transform" :class="{ 'rotate-180': isMenuOpen('lang') }" />
                </button>
                <transition name="fade">
                   <div v-if="isMenuOpen('lang')" class="absolute z-10 right-0 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <button v-for="lang in availableLocales" :key="lang.code" @click="changeLocale(lang.code)" class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Icon :name="lang.icon" class="w-5 h-5 mr-2" />
                          {{ lang.name }}
                      </button>
                  </div>
                </transition>
            </div>
            <!-- Mobile Menu Button -->
            <button @click="toggleMenu('mobile')" class="md:hidden" :aria-label="$t('nav.toggle')" :aria-expanded="isMenuOpen('mobile')">
                <Icon :name="isMenuOpen('mobile') ? 'ri:close-line' : 'ri:menu-line'" class="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div v-if="isMenuOpen('mobile')" class="md:hidden bg-white border-t border-gray-200 fixed left-0 right-0 w-full shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto z-40">
          <nav class="flex flex-col p-4 space-y-4">
            <!-- Main navigation links -->
            <div>
              <template v-for="navItem in navigation" :key="navItem.name">
                <div v-if="navItem.children">
                  <h3 class="font-semibold mb-2 px-2 text-gray-800">{{ $t(navItem.name) }}</h3>
                  <NuxtLink v-for="child in navItem.children" :key="child.slug" :to="localePath(`${navItem.path}/${child.slug}`)" class="block pl-4 pr-2 py-2 rounded-md hover:bg-gray-100" @click="closeMenu('mobile')">
                    {{ $t(child.name) }}
                  </NuxtLink>
                </div>
                <NuxtLink v-else :to="localePath(navItem.path)" class="block px-2 py-2 rounded-md hover:bg-gray-100" @click="closeMenu('mobile')">
                  {{ $t(navItem.name) }}
                </NuxtLink>
              </template>
            </div>

            <hr>

            <!-- Language switcher -->
            <div>
              <h3 class="font-semibold mb-2 px-2 text-gray-800">{{ $t('nav.language') }}</h3>
              <button v-for="lang in typedLocales" :key="lang.code" @click="changeLocale(lang.code)" 
                      class="flex items-center w-full text-left px-2 py-2 rounded-md"
                      :class="[locale === lang.code ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100']">
                  <Icon :name="lang.icon" class="w-5 h-5 mr-2" />
                  {{ lang.name }}
              </button>
            </div>

            <hr>

            <!-- Top bar info -->
            <div class="px-2 space-y-3 text-sm">
                <a href="tel:+35799900778" class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Icon name="ri:phone-fill" class="w-4 h-4" />
                  <span>+357 99-900-778</span>
                </a>
                <a href="mailto:office@k-m-construction.com" class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Icon name="ri:mail-fill" class="w-4 h-4" />
                  <span>office@k-m-construction.com</span>
                </a>
                <div class="flex items-center space-x-4 pt-2">
                  <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
                    <Icon name="ri:facebook-fill" class="w-5 h-5" />
                  </a>
                  <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Instagram">
                    <Icon name="ri:instagram-line" class="w-5 h-5" />
                  </a>
                </div>
            </div>
          </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const openMenus = ref<Record<string, boolean>>({});
const headerRef = ref<HTMLElement | null>(null);

const isMenuOpen = (menu: string) => !!openMenus.value[menu];

const openMenu = (menu: string) => {
  openMenus.value[menu] = true;
};

const toggleMenu = (menu: string) => {
  openMenus.value[menu] = !openMenus.value[menu];
};

const closeMenu = (menu: string) => {
  openMenus.value[menu] = false;
};

const closeAllMenus = () => {
  openMenus.value = {};
};

const handleClickOutside = (event: MouseEvent) => {
  if (headerRef.value && !headerRef.value.contains(event.target as Node)) {
    closeAllMenus();
  }
};

// Блокировка скролла body при открытом мобильном меню
watch(() => openMenus.value['mobile'], (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

// Закрытие мобильного меню при изменении размера окна
const handleResize = () => {
  if (window.innerWidth >= 768) {
    closeMenu('mobile')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  // Восстанавливаем скролл при размонтировании
  if (process.client) {
    document.body.style.overflow = ''
  }
});

const navigation = [
  { name: 'nav.home', path: '/' },
  { 
    name: 'nav.services',
    path: '/services',
    children: [
      { name: 'services.floor_sanding', slug: 'floor-sanding' },
      { name: 'services.concrete_injection', slug: 'concrete-injection' },
      { name: 'services.new_construction', slug: 'new-construction' },
      { name: 'services.comprehensive_renovation', slug: 'comprehensive-renovation' },
      { name: 'services.facade_works', slug: 'facade-works' },
    ]
  },
  { 
    name: 'nav.portfolio',
    path: '/portfolio',
    children: [
      { name: 'portfolio.floor_sanding', slug: 'floor-sanding' },
      { name: 'portfolio.monolithic_works', slug: 'monolithic-works' },
      { name: 'portfolio.extension_construction', slug: 'extension-construction' },
      { name: 'portfolio.roof_repair', slug: 'roof-repair' },
    ]
  },
  { name: 'nav.contacts', path: '/contacts' },
];

interface LocaleObject {
  code: string;
  name: string;
  file?: string;
  icon: string;
}

const typedLocales = computed(() => (locales.value as any[]).map(l => ({
  code: l.code,
  name: l.name,
  icon: l.code === 'ru' ? 'emojione-v1:flag-for-russia' : 'emojione-v1:flag-for-united-kingdom'
})) as LocaleObject[]);

const currentLocale = computed(() => typedLocales.value.find(l => l.code === locale.value));
const availableLocales = computed(() => typedLocales.value.filter(l => l.code !== locale.value));

const changeLocale = (code: string) => {
  setLocale(code as 'en' | 'ru');
  closeMenu('lang');
  closeMenu('mobile');
};

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