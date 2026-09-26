<script setup lang="ts">
/** Pseudocode or config excerpt. Focusable so keyboard users can scroll it sideways. */
defineProps<{ label: string; code: string }>()
</script>

<template>
  <figure class="min-w-0">
    <figcaption class="eyebrow">{{ label }}</figcaption>
    <pre
      tabindex="0"
      :aria-label="label"
      class="mt-2 overflow-x-auto rounded-md border border-line bg-bg p-4 font-mono text-[0.8125rem] leading-relaxed"
    ><code>{{ code }}</code></pre>
  </figure>
</template>
