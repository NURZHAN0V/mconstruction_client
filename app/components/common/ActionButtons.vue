<template>
  <div class="action-buttons flex flex-col sm:flex-row gap-4" :class="justifyClass">
    <!-- Contact Button -->
    <a 
      v-if="showCallButton"
      href="tel:+35799900778" 
      :class="getButtonClasses('primary')"
      aria-label="Call us"
    >
      <Icon name="ri:phone-fill" class="w-5 h-5" />
      <span>{{ $t('action_buttons.call') }}</span>
    </a>

    <!-- Email Button -->
    <a 
      v-if="showEmailButton"
      href="mailto:office@k-m-construction.com" 
      :class="getButtonClasses('secondary')"
      aria-label="Email us"
    >
      <Icon name="ri:mail-fill" class="w-5 h-5" />
      <span>{{ $t('action_buttons.email') }}</span>
    </a>

    <!-- Back to Portfolio Button -->
    <NuxtLink 
      v-if="showPortfolioButton"
      :to="localePath('/portfolio')" 
      :class="getButtonClasses(isOnlyPortfolioButton ? 'primary' : 'secondary', !isOnlyPortfolioButton)"
    >
      <Icon name="ri:arrow-left-line" class="w-5 h-5" />
      <span>{{ $t('action_buttons.back_to_portfolio') }}</span>
    </NuxtLink>

    <!-- Back to Services Button -->
    <NuxtLink 
      v-if="showServicesButton"
      :to="localePath('/services')" 
      :class="getButtonClasses(isOnlyServicesButton ? 'primary' : 'secondary', !isOnlyServicesButton)"
    >
      <Icon name="ri:arrow-left-line" class="w-5 h-5" />
      <span>{{ $t('action_buttons.back_to_services') }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const localePath = useLocalePath()

const props = defineProps<{
  showPortfolioButton?: boolean
  showServicesButton?: boolean
  showCallButton?: boolean
  showEmailButton?: boolean
  transparent?: boolean
  justify?: 'start' | 'center' | 'end'
}>()

const showPortfolioButton = computed(() => props.showPortfolioButton ?? false)
const showServicesButton = computed(() => props.showServicesButton ?? false)
const showCallButton = computed(() => props.showCallButton ?? false)
const showEmailButton = computed(() => props.showEmailButton ?? false)

const isOnlyPortfolioButton = computed(() => {
  return showPortfolioButton.value && !showCallButton.value && !showEmailButton.value && !showServicesButton.value
})

const isOnlyServicesButton = computed(() => {
  return showServicesButton.value && !showCallButton.value && !showEmailButton.value && !showPortfolioButton.value
})

const justifyClass = computed(() => {
  switch (props.justify) {
    case 'start':
      return 'justify-start'
    case 'end':
      return 'justify-end'
    default:
      return 'justify-center'
  }
})

const getButtonClasses = (
  variant: 'primary' | 'secondary', 
  isBackLink: boolean = false
) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-bold py-3 px-8 
    rounded-lg shadow-lg transform transition-all duration-300 ease-in-out 
    hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 
    focus-visible:ring-offset-2 focus-visible:ring-primary backdrop-blur-sm
  `

  let variantClasses = ''

  if (variant === 'primary') {
    if (props.transparent) {
      variantClasses = 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15'
    } else {
      variantClasses = 'bg-primary text-white hover:bg-primary/90'
    }
  } else { // secondary
    if (props.transparent || isBackLink) {
      variantClasses = 'bg-secondary/10 border border-secondary/20 text-secondary hover:bg-secondary/15'
    } else {
      variantClasses = 'bg-secondary text-white hover:bg-secondary/90'
    }
  }

  return `${baseClasses} ${variantClasses}`
}
</script>
