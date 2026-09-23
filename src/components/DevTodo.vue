<script setup lang="ts">
/** Shows a TODO from content.ts as a dashed placeholder in dev. Renders nothing in production builds. */
withDefaults(defineProps<{ text: string; as?: string }>(), { as: 'p' })
const dev = import.meta.env.DEV
</script>

<template>
  <component
    :is="as"
    v-if="dev"
    class="rounded-md border border-dashed border-amber-500/60 bg-amber-500/5 px-3 py-2 font-mono text-xs text-amber-700 dark:text-amber-300"
  >
    {{ text }}
  </component>
</template>
