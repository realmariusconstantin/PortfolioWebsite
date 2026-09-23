<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggle"
  >
    <AppIcon :name="isDark ? 'sun' : 'moon'" />
  </button>
</template>
