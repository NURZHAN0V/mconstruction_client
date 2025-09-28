<template>
  <div class="container mx-auto px-4 py-12">
    <div v-if="service">
      <h1 class="text-4xl font-bold text-primary mb-4">{{ $t(service.title) }}</h1>
      <p class="text-lg mb-8">{{ $t(service.description) }}</p>
      
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-2xl font-bold mb-4">{{ $t('services.sub_services_title') }}</h2>
          <ul class="list-disc list-inside">
            <li v-for="subService in service.subServices" :key="subService">{{ $t(subService) }}</li>
          </ul>
        </div>
        <div v-if="service.image">
          <img :src="service.image" :alt="$t(service.title)" class="rounded-lg shadow-lg">
        </div>
      </div>
    </div>
    <div v-else>
      <p>Service not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const servicesData = {
  'new-construction': {
    title: 'services.new_construction',
    description: 'home.services.descriptions.new_construction',
    image: '/images/services/new-construction.jpg',
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
    ]
  },
   'comprehensive-renovation': {
    title: 'services.comprehensive_renovation',
    description: 'home.services.descriptions.comprehensive_renovation',
    image: '/images/services/renovation.jpg',
    subServices: [
        'services.sub.concrete_reinforcement',
        'services.sub.floor_dismantling',
        'services.sub.screed_flooring',
        'services.sub.wall_cladding',
        'services.sub.door_installation',
        'services.sub.hydro_thermal_insulation_reno',
        'services.sub.utility_replacement',
    ]
  },
  'facade-works': {
    title: 'services.facade_works',
    description: 'home.services.descriptions.facade_works',
    image: '/images/services/facade.jpg',
    subServices: [
        'services.sub.facade_restoration',
        'services.sub.painting',
        'services.sub.cladding',
        'services.sub.facade_insulation',
        'services.sub.decorative_finishing',
        'services.sub.roof_installation',
    ]
  },
    'floor-sanding': {
    title: 'services.floor_sanding',
    description: 'home.services.descriptions.floor_sanding',
    image: '/images/services/floor-sanding.jpg',
    subServices: [
        'services.sub.natural_stone',
        'services.sub.concrete_floor',
    ]
  },
  'concrete-injection': {
    title: 'services.concrete_injection',
    description: 'home.services.descriptions.concrete_injection',
    image: '/images/services/concrete-injection.jpg',
    subServices: [
        'services.sub.injection_waterproofing',
        'services.sub.crack_injection',
        'services.sub.cold_joint_injection',
        'services.sub.concreting_joints',
        'services.sub.construction_joint_injection',
        'services.sub.entry_injection',
        'services.sub.masonry_injection',
    ]
  },
  'monolithic-works': {
    title: 'services.monolithic_works',
    description: 'home.services.descriptions.monolithic_works',
    image: '/images/services/monolithic.jpg',
    subServices: [
        'services.sub.monolithic_construction',
        'services.sub.concrete_pouring',
        'services.sub.reinforcement_concreting',
        'services.sub.monolithic_floors',
        'services.sub.monolithic_walls',
        'services.sub.stairs_retaining_walls',
    ]
  },
};


const service = computed(() => servicesData[slug as keyof typeof servicesData]);

</script> 