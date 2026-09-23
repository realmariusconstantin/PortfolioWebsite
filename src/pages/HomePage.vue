<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HeroSection from '@/sections/HeroSection.vue'
import WorkSection from '@/sections/WorkSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
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
  <WorkSection />
  <SkillsSection />
  <AboutSection />
  <ExperienceSection />
  <ContactSection />
</template>
