<script setup lang="ts">
import SocialLinks from './SocialLinks.vue'
import { person } from '@/data/content'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div class="container-content flex flex-col-reverse items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
      <p class="text-sm text-muted">
        &copy; {{ year }} {{ person.name }}. Built with Vue, TypeScript and Tailwind CSS.
      </p>
      <SocialLinks />
    </div>
  </footer>
</template>
