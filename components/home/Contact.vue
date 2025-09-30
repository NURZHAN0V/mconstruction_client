<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-primary mb-4">{{ $t('contacts.title') }}</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">{{ $t('contacts.subtitle') }}</p>
      </div>
      
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info & Map -->
        <div class="lg:col-span-1 space-y-8">
          <!-- Contact Details -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-start mb-6">
              <div class="bg-primary/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.phone_title') }}</h3>
                <a href="tel:+35799900778" class="text-gray-700 hover:text-primary transition-colors">+357 99-900-778</a>
              </div>
            </div>
            <div class="flex items-start mb-6">
              <div class="bg-primary/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.email_title') }}</h3>
                <a href="mailto:office@k-m-construction.com" class="text-gray-700 hover:text-primary transition-colors">office@k-m-construction.com</a>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-primary/10 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.address_title') }}</h3>
                <p class="text-gray-700">Менелау Какоянни 16. Ероскипу, Пафос 8201</p>
              </div>
            </div>
          </div>
          <!-- Map -->
          <div class="h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.0000000000005!2d32.449162!3d34.75500000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e70f6a3b9d5c3d%3A0x6b4f7e8b6f2f9e4e!2sMenelaiou%20Kakoianni%2016%2C%20Yeroskipou%208201%2C%20Cyprus!5e0!3m2!1sen!2s!4v1622000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-md">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label for="name" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.name') }} <span class="text-red-500">*</span></label>
                <input type="text" id="name" v-model="form.name" required class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow">
              </div>
              <div>
                <label for="email" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.email') }} <span class="text-red-500">*</span></label>
                <input type="email" id="email" v-model="form.email" required class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow">
              </div>
            </div>
            <div class="mb-6">
              <label for="message" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.message') }} <span class="text-red-500">*</span></label>
              <textarea id="message" v-model="form.message" required rows="6" class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"></textarea>
            </div>
            <button type="submit" class="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300">
              {{ $t('contacts.form.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  message: ''
})

function submitForm() {
  // Handle form submission
  console.log('Form submitted:', form.value)
  alert('Thank you for your message!')
  form.value = { name: '', email: '', message: '' }
}
</script> 