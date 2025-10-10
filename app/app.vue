<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <CommonBackToTop />
  <CommonCallButton @open-modal="isCallModalOpen = true" />
  <CommonCallModal :is-open="isCallModalOpen" @close="isCallModalOpen = false" />
</template>

<script setup lang="ts">
const isCallModalOpen = ref(false)

// Яндекс.Метрика
useHead({
  script: [
    {
      innerHTML: `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104327829', 'ym');
        
        ym(104327829, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
      `,
      type: 'text/javascript',
      tagPosition: 'bodyClose'
    }
  ],
  noscript: [
    {
      innerHTML: '<div><img src="https://mc.yandex.ru/watch/104327829" style="position:absolute; left:-9999px;" alt="" /></div>'
    }
  ]
})
</script>
