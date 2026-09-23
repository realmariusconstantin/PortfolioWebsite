<script setup lang="ts">
import HeroSection from '@/sections/HeroSection.vue'
import WorkSection from '@/sections/WorkSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
import { nav, person, site, skills } from '@/data/content'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: site.title,
  description: site.description,
  path: '/',
  type: 'profile',
  imageAlt: `${person.name}, ${person.role}`,
  jsonLd: {
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    url: site.url,
    email: `mailto:${person.email}`,
    sameAs: [person.github, person.linkedin],
    address: { '@type': 'PostalAddress', addressCountry: 'IE' },
    knowsLanguage: person.languages,
    knowsAbout: skills.flatMap((g) => g.items),
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Technological University of the Shannon' },
  },
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
