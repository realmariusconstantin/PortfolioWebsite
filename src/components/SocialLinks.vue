<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { person } from '@/data/content'

const links = [
  { label: 'GitHub', href: person.github, icon: 'github' },
  { label: 'LinkedIn', href: person.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${person.email}`, icon: 'mail' },
] as const
</script>

<template>
  <ul class="flex items-center gap-1">
    <li v-for="link in links" :key="link.label">
      <a
        :href="link.href"
        :target="link.icon === 'mail' ? undefined : '_blank'"
        :rel="link.icon === 'mail' ? undefined : 'noopener noreferrer'"
        class="inline-flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
        :aria-label="link.label"
      >
        <AppIcon :name="link.icon" :size="19" />
      </a>
    </li>
  </ul>
</template>
