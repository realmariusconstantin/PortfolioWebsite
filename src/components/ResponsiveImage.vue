<script setup lang="ts">
import { computed } from 'vue'
import { imageMeta } from '@/data/images.generated'
import type { ImageKey } from '@/data/content'

/** <picture> with AVIF + WebP sources produced by scripts/optimize-images.mjs. */
const props = withDefaults(
  defineProps<{ image: ImageKey; alt: string; sizes?: string; eager?: boolean }>(),
  { sizes: '(min-width: 1100px) 1036px, 100vw', eager: false },
)

const meta = computed(() => imageMeta[props.image])
const srcset = (ext: string) => meta.value.widths.map((w) => `/images/${props.image}-${w}.${ext} ${w}w`).join(', ')
const fallback = computed(() => `/images/${props.image}-${meta.value.widths.at(-1)}.webp`)
</script>

<template>
  <picture>
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes" />
    <img
      :src="fallback"
      :srcset="srcset('webp')"
      :sizes="sizes"
      :alt="alt"
      :width="meta.width"
      :height="meta.height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      decoding="async"
      class="block h-auto w-full"
    />
  </picture>
</template>
