<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HeroSection from '@/sections/HeroSection.vue'
import { nav, site } from '@/data/content'
import { useScrollSpy } from '@/composables/useScrollSpy'

useHead({
  title: site.title,
  meta: [{ name: 'description', content: site.description }],
})
useScrollSpy(nav.map((n) => n.id))
</script>

<template>
  <HeroSection />
  <!-- Stage 3: work, skills, about, experience and contact sections -->
</template>
