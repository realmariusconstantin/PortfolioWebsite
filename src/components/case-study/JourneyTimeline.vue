<script setup lang="ts">
/** The match flow as numbered steps: a horizontal track on desktop, a vertical one on phones. Each step links to its block below. */
defineProps<{ phases: readonly { id: string; label: string; clock: string }[] }>()
</script>

<template>
  <ol class="relative grid gap-0 lg:grid-cols-7 lg:gap-2">
    <li v-for="(phase, i) in phases" :key="phase.id" class="relative">
      <!-- connector: vertical on phones, horizontal on desktop -->
      <span
        v-if="i < phases.length - 1"
        aria-hidden="true"
        class="absolute top-9 bottom-0 left-[1.1875rem] w-px bg-line-strong lg:top-[1.1875rem] lg:right-[-0.5rem] lg:bottom-auto lg:left-10 lg:h-px lg:w-auto"
      />
      <a
        :href="`#phase-${phase.id}`"
        class="group relative flex items-start gap-4 rounded-md pb-6 lg:flex-col lg:gap-3 lg:pb-0"
      >
        <span
          class="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-surface font-mono text-sm text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg"
        >
          {{ i + 1 }}
        </span>
        <span class="pt-1.5 lg:pt-0">
          <span class="block text-[0.9375rem] leading-snug font-semibold">{{ phase.label }}</span>
          <span class="mt-0.5 block font-mono text-xs text-muted">{{ phase.clock }}</span>
        </span>
      </a>
    </li>
  </ol>
</template>
