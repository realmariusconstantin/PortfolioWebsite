<script setup lang="ts">
/** Minimal browser chrome around a screenshot. */
defineProps<{ url?: string }>()
</script>

<template>
  <div class="overflow-hidden rounded-md border border-line bg-surface-2">
    <div class="flex h-8 items-center gap-3 border-b border-line px-3" aria-hidden="true">
      <div class="flex gap-1.5">
        <span class="size-2.5 rounded-full bg-line-strong" />
        <span class="size-2.5 rounded-full bg-line-strong" />
        <span class="size-2.5 rounded-full bg-line-strong" />
      </div>
      <span v-if="url" class="truncate font-mono text-[0.6875rem] text-muted">{{ url }}</span>
    </div>
    <slot />
  </div>
</template>
