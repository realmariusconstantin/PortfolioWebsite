<script setup lang="ts">
import { computed } from 'vue'

/**
 * The Romish mark, "the Ready ring". Never rotate it, keep it at 16px or larger,
 * and leave clear space of about a fifth of its height around it.
 * `size` is px, or any CSS length (e.g. "0.9em" to follow the text size).
 * Next to the word "Romish" pass `decorative`, so screen readers don't hear the name twice.
 */
const props = withDefaults(defineProps<{ size?: number | string; ringColor?: string; decorative?: boolean }>(), {
  size: 32,
  ringColor: 'currentColor',
  decorative: false,
})

const length = computed(() => (typeof props.size === 'number' ? `${Math.max(16, props.size)}px` : props.size))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="12 12 76 76"
    :width="length"
    :height="length"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : 'Romish'"
    :aria-hidden="decorative ? 'true' : undefined"
    focusable="false"
    class="shrink-0"
    style="min-width: 16px; min-height: 16px"
  >
    <path d="M81.13 28.2A38 38 0 1 1 71.8 18.87L62.62 31.98A22 22 0 1 0 68.02 37.38Z" :fill="ringColor" />
    <circle cx="50" cy="50" r="8" fill="#FFAA1F" />
  </svg>
</template>
