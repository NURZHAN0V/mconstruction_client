<template>
  <!-- Шапка: липкая, с размытием фона -->
  <header ref="headerRef" class="bg-white/75 backdrop-blur-lg shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <!-- Верхняя полоса: телефон, email, соцсети (только десктоп) -->
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
          <a href="https://www.facebook.com/share/15f93imTYv/?mibextid=wwXIfr" target="_blank" class="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Facebook">
            <Icon name="ri:facebook-fill" class="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/construction_kmc?igsh=MnhmMGJiZ3JlZmc5&utm_source=qr" target="_blank" class="text-gray-500 hover:text-blue-600 transition-colors" aria-label="Instagram">
            <Icon name="ri:instagram-line" class="w-5 h-5" />
          </a>
        </div>
      </div>

      <!-- Основная навигация: логотип и меню -->
      <div class="flex justify-between items-center py-4">
        <NuxtLink :to="localePath('/')" class="text-2xl font-bold text-gray-800">
          <span class="hidden sm:inline">K.M.Construction</span>
          <span class="sm:hidden">K.M.C.</span>
        </NuxtLink>

        <!-- Десктоп-меню: пункты с выпадающими подменю по hover -->
        <nav class="hidden md:flex items-center space-x-8">
          <template v-for="navItem in navigation" :key="navItem.name">
            <!-- Пункт с дочерними страницами (услуги, портфолио) -->
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
            <!-- Обычная ссылка без подменю -->
            <NuxtLink v-else :to="localePath(navItem.path)" class="hover:text-blue-600 transition-colors">
              {{ $t(navItem.name) }}
            </NuxtLink>
          </template>
        </nav>

        <!-- Переключатель языка и кнопка мобильного меню -->
        <div class="flex items-center space-x-4">
            <!-- Выпадающий список языков (десктоп): клик, клавиатура, ARIA -->
            <div class="relative LangDropdown">
              <button
                type="button"
                ref="langTriggerRef"
                class="LangDropdown__trigger"
                role="combobox"
                :aria-label="$t('nav.language')"
                :aria-expanded="isMenuOpen('lang')"
                aria-haspopup="listbox"
                @click="toggleMenu('lang')"
                @keydown.down.prevent="openLangAndFocusFirst()"
                @keydown.enter.space.prevent="toggleMenu('lang')"
              >
                <Icon :name="currentLocale?.icon || 'ri:global-line'" class="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span class="LangDropdown__triggerLabel">{{ currentLocale?.name || 'EN' }}</span>
                <Icon name="ri:arrow-down-s-line" class="w-5 h-5 flex-shrink-0 transition-transform LangDropdown__chevron" :class="{ 'LangDropdown__chevron_open': isMenuOpen('lang') }" aria-hidden="true" />
              </button>
              <Transition name="lang-dropdown">
                <div
                  v-if="isMenuOpen('lang')"
                  ref="langListRef"
                  role="listbox"
                  :aria-label="$t('nav.language')"
                  class="LangDropdown__list"
                  tabindex="-1"
                  @keydown="handleLangListKeydown"
                >
                  <button
                    v-for="(lang, index) in typedLocales"
                    :key="lang.code"
                    type="button"
                    role="option"
                    :aria-selected="locale === lang.code"
                    :data-lang-index="index"
                    :data-lang-code="lang.code"
                    class="LangDropdown__option"
                    :class="{ 'LangDropdown__option_active': locale === lang.code }"
                    @click="changeLocale(lang.code)"
                  >
                    <Icon :name="lang.icon" class="LangDropdown__optionIcon" aria-hidden="true" />
                    <span>{{ lang.name }}</span>
                    <Icon v-if="locale === lang.code" name="ri:check-line" class="LangDropdown__optionCheck" aria-hidden="true" />
                  </button>
                </div>
              </Transition>
            </div>
            <!-- Кнопка мобильного меню -->
            <button @click="toggleMenu('mobile')" class="md:hidden" :aria-label="$t('nav.toggle')" :aria-expanded="isMenuOpen('mobile')">
                <Icon :name="isMenuOpen('mobile') ? 'ri:close-line' : 'ri:menu-line'" class="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>

    <!-- Мобильное меню: полноэкранная панель с навигацией и контактами -->
    <transition name="slide-fade">
      <div v-if="isMenuOpen('mobile')" class="md:hidden bg-white border-t border-gray-200 fixed left-0 right-0 w-full shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto z-40">
          <nav class="flex flex-col p-4 space-y-4">
            <!-- Ссылки навигации -->
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

            <!-- Переключатель языка (мобильный): те же опции и активное состояние, что в десктопе -->
            <div class="LangMobile" role="group" :aria-label="$t('nav.language')">
              <h3 class="LangMobile__title">{{ $t('nav.language') }}</h3>
              <div class="LangMobile__list" role="listbox" :aria-label="$t('nav.language')">
                <button
                  v-for="lang in typedLocales"
                  :key="lang.code"
                  type="button"
                  role="option"
                  :aria-selected="locale === lang.code"
                  class="LangMobile__option"
                  :class="{ 'LangMobile__option_active': locale === lang.code }"
                  @click="changeLocale(lang.code)"
                >
                  <Icon :name="lang.icon" class="LangMobile__optionIcon" aria-hidden="true" />
                  <span>{{ lang.name }}</span>
                  <Icon v-if="locale === lang.code" name="ri:check-line" class="LangMobile__optionCheck" aria-hidden="true" />
                </button>
              </div>
            </div>

            <hr>

            <!-- Контакты и соцсети (дублирование верхней полосы для мобильных) -->
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
                  <a href="https://www.facebook.com/share/15f93imTYv/?mibextid=wwXIfr" class="text-gray-500 hover:text-blue-600 transition-colors" target="_blank" aria-label="Facebook">
                    <Icon name="ri:facebook-fill" class="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/construction_kmc?igsh=MnhmMGJiZ3JlZmc5&utm_source=qr" class="text-gray-500 hover:text-blue-600 transition-colors" target="_blank" aria-label="Instagram">
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
// i18n и локальные пути для ссылок
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

// Состояние открытых выпадающих меню (по ключу: 'lang', 'mobile', имя пункта навигации)
const openMenus = ref<Record<string, boolean>>({});
const headerRef = ref<HTMLElement | null>(null);
const langTriggerRef = ref<HTMLButtonElement | null>(null);
const langListRef = ref<HTMLDivElement | null>(null);

const isMenuOpen = (menu: string) => !!openMenus.value[menu];

const openMenu = (menu: string) => {
  openMenus.value[menu] = true;
};

const toggleMenu = (menu: string) => {
  const next = !openMenus.value[menu];
  openMenus.value[menu] = next;
  if (menu === 'lang') {
    if (next) {
      nextTick(() => focusFirstLangOption());
    } else {
      langTriggerRef.value?.focus();
    }
  }
};

const closeMenu = (menu: string) => {
  if (menu === 'lang') {
    langTriggerRef.value?.focus();
  }
  openMenus.value[menu] = false;
};

// Фокус на первый пункт списка языков (для клавиатурной навигации)
function focusFirstLangOption() {
  const first = langListRef.value?.querySelector<HTMLElement>('[role="option"]');
  if (first) {
    first.focus();
  }
}

// Открыть список языков и перенести фокус на первый пункт (клавиатура: стрелка вниз с триггера)
function openLangAndFocusFirst() {
  openMenu('lang');
  nextTick(() => focusFirstLangOption());
}

// Клавиатурная навигация в списке языков: Escape закрывает, стрелки переключают, Enter выбирает
function handleLangListKeydown(e: KeyboardEvent) {
  const list = langListRef.value;
  if (!list) return;
  const options = Array.from(list.querySelectorAll<HTMLElement>('[role="option"]'));
  const currentIndex = options.findIndex(el => el === document.activeElement);

  if (e.key === 'Escape') {
    closeMenu('lang');
    langTriggerRef.value?.focus();
    e.preventDefault();
    return;
  }
  if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
    options[currentIndex + 1]?.focus();
    e.preventDefault();
    return;
  }
  if (e.key === 'ArrowUp' && currentIndex > 0) {
    options[currentIndex - 1]?.focus();
    e.preventDefault();
    return;
  }
  if (e.key === 'Home') {
    options[0]?.focus();
    e.preventDefault();
    return;
  }
  if (e.key === 'End') {
    options[options.length - 1]?.focus();
    e.preventDefault();
    return;
  }
  if (e.key === 'Enter' || e.key === ' ') {
    const target = e.target as HTMLElement;
    if (target.getAttribute('role') === 'option') {
      const code = target.getAttribute('data-lang-code');
      if (code) {
        changeLocale(code);
        e.preventDefault();
      }
    }
  }
}

const closeAllMenus = () => {
  openMenus.value = {};
};

// Закрытие всех выпадающих меню при клике вне шапки
const handleClickOutside = (event: MouseEvent) => {
  if (headerRef.value && !headerRef.value.contains(event.target as Node)) {
    closeAllMenus();
  }
};

// Блокировка скролла body при открытом мобильном меню
watch(() => openMenus.value['mobile'], (isOpen) => {
  if (import.meta.client) {
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

// Подписка на клик вне шапки и ресайз окна
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
  // Восстанавливаем скролл при размонтировании
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
});

// Структура навигации: пункты без children — обычные ссылки, с children — выпадающее подменю
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
      { name: 'portfolio.troodos_house', slug: 'troodos-house-construction' },
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

// Локали с иконками флагов для переключателя
const typedLocales = computed(() => (locales.value as any[]).map(l => ({
  code: l.code,
  name: l.name,
  icon: l.code === 'ru' ? 'emojione-v1:flag-for-russia' : 'emojione-v1:flag-for-united-kingdom'
})) as LocaleObject[]);

const currentLocale = computed(() => typedLocales.value.find(l => l.code === locale.value));

const changeLocale = (code: string) => {
  setLocale(code as 'en' | 'ru');
  closeMenu('lang');
  closeMenu('mobile');
};

</script>

<style scoped>
/* Переключатель языка: кнопка и выпадающий список */
.LangDropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fff;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
}
.LangDropdown__trigger:hover {
  border-color: var(--tw-primary, #007bff);
  color: var(--tw-primary, #007bff);
}
.LangDropdown__trigger:focus-visible {
  outline: 2px solid var(--tw-primary, #007bff);
  outline-offset: 2px;
}
.LangDropdown__triggerLabel {
  margin: 0 0.25rem;
}
.LangDropdown__chevron {
  transition: transform 0.2s ease;
}
.LangDropdown__chevron_open {
  transform: rotate(180deg);
}
.LangDropdown__list {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  min-width: 10rem;
  padding: 0.25rem;
  background: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border: 1px solid #e5e7eb;
  outline: none;
}
.LangDropdown__option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-size: 0.875rem;
  color: #374151;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.LangDropdown__option:hover {
  background: #f3f4f6;
  color: #111827;
}
.LangDropdown__option:focus-visible {
  outline: 2px solid var(--tw-primary, #007bff);
  outline-offset: -2px;
}
.LangDropdown__option_active {
  background: rgba(0, 123, 255, 0.1);
  color: var(--tw-primary, #007bff);
  font-weight: 500;
}
.LangDropdown__optionIcon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}
.LangDropdown__optionCheck {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  flex-shrink: 0;
  color: var(--tw-primary, #007bff);
}

/* Анимация выпадающего списка языков */
.lang-dropdown-enter-active,
.lang-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.lang-dropdown-enter-from,
.lang-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Переключатель языка в мобильном меню */
.LangMobile__title {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  padding: 0 0.5rem;
  color: #1f2937;
}
.LangMobile__list {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.LangMobile__option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.5rem;
  text-align: left;
  font-size: 0.875rem;
  color: #374151;
  background: transparent;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.LangMobile__option:hover {
  background: #f3f4f6;
}
.LangMobile__option:focus-visible {
  outline: 2px solid var(--tw-primary, #007bff);
  outline-offset: 2px;
}
.LangMobile__option_active {
  background: rgba(0, 123, 255, 0.1);
  color: var(--tw-primary, #007bff);
  font-weight: 500;
}
.LangMobile__optionIcon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}
.LangMobile__optionCheck {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: auto;
  flex-shrink: 0;
  color: var(--tw-primary, #007bff);
}

/* Анимация появления/скрытия выпадающих меню (подменю навигации) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимация выезда мобильного меню сверху */
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