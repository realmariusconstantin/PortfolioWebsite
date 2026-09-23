<script setup lang="ts">
defineProps<{ id: string; index: number; eyebrow: string; title: string; intro?: string }>()
</script>

<template>
  <header v-reveal class="mb-10 max-w-2xl sm:mb-12">
    <p class="eyebrow">
      <span class="text-accent">{{ String(index).padStart(2, '0') }}</span> / {{ eyebrow }}
    </p>
    <h2 :id="id" class="mt-3 text-h2 font-semibold">{{ title }}</h2>
    <p v-if="intro" class="mt-4 leading-relaxed text-pretty text-muted">{{ intro }}</p>
  </header>
</template>
