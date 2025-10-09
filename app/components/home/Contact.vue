<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-4">{{ $t('contacts.title') }}</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">{{ $t('contacts.subtitle') }}</p>
      </div>
      
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Contact Info & Map -->
        <div class="lg:col-span-1 space-y-8">
          <!-- Contact Details -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-start mb-6">
              <div class="bg-primary/10 p-3 rounded-full mr-4">
                <Icon name="ri:phone-fill" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.phone_title') }}</h3>
                <a href="tel:+35799900778" class="text-gray-700 hover:text-primary transition-colors">+357 99-900-778</a>
              </div>
            </div>
            <div class="flex items-start mb-6">
              <div class="bg-primary/10 p-3 rounded-full mr-4">
                <Icon name="ri:mail-fill" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.email_title') }}</h3>
                <a href="mailto:office@k-m-construction.com" class="text-gray-700 hover:text-primary transition-colors">office@k-m-construction.com</a>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-primary/10 p-3 rounded-full mr-4">
                <Icon name="ri:map-pin-2-fill" class="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 class="font-bold text-lg text-dark">{{ $t('contacts.address_title') }}</h3>
                <p class="text-gray-700">{{ $t('contacts.address_value') }}</p>
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
                <input type="text" id="name" v-model="form.name" required class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" :class="{'border-red-500': errors.name}">
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label for="email" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.email') }} <span class="text-red-500">*</span></label>
                <input type="email" id="email" v-model="form.email" required class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" :class="{'border-red-500': errors.email}">
                 <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
              </div>
            </div>
            <div class="mb-6">
              <label for="message" class="block text-gray-700 font-bold mb-2">{{ $t('contacts.form.message') }} <span class="text-red-500">*</span></label>
              <textarea id="message" v-model="form.message" required rows="6" class="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" :class="{'border-red-500': errors.message}"></textarea>
              <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
            </div>
            <button 
              type="submit" 
              class="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-400"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>{{ $t('contacts.form.submit') }}</span>
            </button>
            <p v-if="submissionStatus === 'success'" class="text-green-600 mt-4 text-center">Thank you for your message!</p>
            <p v-if="submissionStatus === 'error'" class="text-red-600 mt-4 text-center">Something went wrong. Please try again.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  message: ''
})
const errors = ref({
  name: '',
  email: '',
  message: ''
})
const isSubmitting = ref(false)
const submissionStatus = ref<'success' | 'error' | null>(null)

const validateForm = () => {
  errors.value = { name: '', email: '', message: '' }
  let isValid = true
  if (!form.value.name) {
    errors.value.name = 'Name is required'
    isValid = false
  }
  if (!form.value.email) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Email is invalid'
    isValid = false
  }
  if (!form.value.message) {
    errors.value.message = 'Message is required'
    isValid = false
  }
  return isValid
}

async function submitForm() {
  submissionStatus.value = null
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', form.value)
    submissionStatus.value = 'success'
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    submissionStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submissionStatus.value = null
    }, 5000)
  }
}
</script> 