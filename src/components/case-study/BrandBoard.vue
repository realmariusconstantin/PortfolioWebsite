<script setup lang="ts">
import RomishMark from '@/components/RomishMark.vue'
import { romishCaseStudy } from '@/data/content'

/**
 * Live brand specimens for the Romish case study: the mark at three sizes, the palette and the type.
 * Everything here is real DOM text, so it reads for screen readers and search.
 */
const { mark, palette, type } = romishCaseStudy.brand

const fontClass: Record<string, string> = {
  display: 'font-romish-display text-4xl tracking-wide sm:text-5xl',
  sans: 'font-sans text-2xl font-medium sm:text-3xl',
  mono: 'font-mono text-2xl sm:text-3xl',
}
</script>

<template>
  <div class="grid gap-10">
    <div>
      <h3 class="text-lg font-semibold">{{ mark.title }}</h3>
      <div class="romish-dark mt-4 flex flex-wrap items-end gap-x-14 gap-y-8 rounded-lg border border-line bg-bg px-8 py-10 sm:px-12">
        <RomishMark :size="128" ring-color="#EDEBE6" />
        <figure v-for="px in mark.sizes" :key="px" class="flex flex-col items-center gap-3">
          <RomishMark :size="px" ring-color="#EDEBE6" />
          <figcaption class="font-mono text-xs text-muted">{{ px }}px</figcaption>
        </figure>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-semibold">{{ palette.title }}</h3>
      <ul class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <li
          v-for="swatch in palette.swatches"
          :key="swatch.hex"
          class="flex aspect-4/3 flex-col justify-end rounded-md border border-line p-3 lg:aspect-3/4"
          :style="{ backgroundColor: swatch.hex, color: swatch.on }"
        >
          <span class="text-sm font-medium">{{ swatch.name }}</span>
          <span class="font-mono text-xs">{{ swatch.hex }}</span>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="text-lg font-semibold">{{ type.title }}</h3>
      <ul class="romish-dark mt-4 divide-y divide-line rounded-lg border border-line bg-bg">
        <li v-for="sample in type.samples" :key="sample.font" class="px-6 py-6 sm:px-8">
          <p :class="fontClass[sample.font]" class="leading-tight">{{ sample.text }}</p>
          <p class="mt-2 font-mono text-xs text-muted">{{ sample.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* Unbounded 600, subset to the letters of "ROMISH" (1 KB). Declared only here, so it never loads outside this page. */
@font-face {
  font-family: 'Unbounded';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/unbounded-600-romish.woff2') format('woff2');
  unicode-range: U+48-49, U+4D, U+4F, U+52-53;
}
.font-romish-display {
  font-family: 'Unbounded', var(--font-sans);
  font-weight: 600;
}
</style>
