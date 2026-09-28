<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'

/** Link back to the case study hero (`#top`), placed at the end of long sections. */
defineProps<{ label: string }>()
</script>

<template>
  <p class="mt-10">
    <a href="#top" class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
      <AppIcon name="arrow-up" :size="14" />
      {{ label }}
    </a>
  </p>
</template>
