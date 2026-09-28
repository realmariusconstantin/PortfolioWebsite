<script setup lang="ts">
import { computed, inject } from 'vue'
import AppIcon from './AppIcon.vue'
import BrowserFrame from './BrowserFrame.vue'
import ResponsiveImage from './ResponsiveImage.vue'
import { romishImage } from '@/data/content'
import { hasImage, lightboxKey } from '@/composables/useImageSlots'

/**
 * One screenshot slot from `romishImages` in content.ts.
 * - Image exported: responsive AVIF/WebP with its size reserved, click to enlarge
 *   (when the page provides a lightbox).
 * - Image missing, dev: a dashed placeholder at the slot's aspect ratio saying what to capture.
 * - Image missing, production: a "Screenshot coming soon" placeholder at the same size, never a broken image.
 */
const props = withDefaults(
  defineProps<{
    id: string
    sizes?: string
    eager?: boolean
    /** URL shown in the browser chrome. */
    url?: string
    caption?: boolean
    frameClass?: string
  }>(),
  { caption: true },
)

const slot = computed(() => romishImage(props.id))
const ready = computed(() => hasImage(props.id))
const dev = import.meta.env.DEV
const openLightbox = inject(lightboxKey, undefined)

function zoom() {
  if (slot.value) openLightbox?.({ image: slot.value.id, alt: slot.value.alt, caption: slot.value.caption })
}
</script>

<template>
  <figure v-if="slot && ready" class="min-w-0" :class="{ 'mx-auto w-full': slot.maxWidth }" :style="{ maxWidth: slot.maxWidth }">
    <component
      :is="openLightbox ? 'button' : 'div'"
      :type="openLightbox ? 'button' : undefined"
      class="group relative block w-full text-left"
      :class="{ 'cursor-zoom-in': openLightbox }"
      @click="zoom"
    >
      <!-- Accessible name = this text + the image's alt, so it contains everything visible -->
      <span v-if="openLightbox" class="sr-only">Enlarge screenshot: </span>
      <BrowserFrame v-if="slot.browser" :url="url" :class="frameClass">
        <ResponsiveImage :image="slot.id" :alt="slot.alt" :sizes="sizes" :eager="eager" />
      </BrowserFrame>
      <div v-else class="overflow-hidden rounded-md" :class="frameClass">
        <ResponsiveImage :image="slot.id" :alt="slot.alt" :sizes="sizes" :eager="eager" />
      </div>
      <span
        v-if="openLightbox"
        class="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      >
        <AppIcon name="zoom" :size="14" /> Enlarge
      </span>
    </component>
    <figcaption v-if="caption" class="mt-3 text-sm leading-relaxed text-muted">{{ slot.caption }}</figcaption>
  </figure>

  <figure v-else-if="slot && dev" class="min-w-0" :class="{ 'mx-auto w-full': slot.maxWidth }" :style="{ maxWidth: slot.maxWidth }">
    <div
      class="flex flex-col justify-center gap-2 rounded-md border-2 border-dashed border-amber-500/60 bg-amber-500/5 p-4 font-mono text-xs leading-relaxed text-amber-700 sm:p-6 dark:text-amber-300"
      :class="frameClass"
      :style="{ aspectRatio: slot.aspect }"
    >
      <p class="text-sm font-semibold">Screenshot needed: assets-src/{{ slot.file }}</p>
      <p>{{ slot.capture }}</p>
      <p>Recommended size: {{ slot.size }}. Then run <code>npm run images</code>.</p>
    </div>
    <figcaption v-if="caption" class="mt-3 text-sm leading-relaxed text-muted">{{ slot.caption }}</figcaption>
  </figure>

  <figure v-else-if="slot" class="min-w-0" :class="{ 'mx-auto w-full': slot.maxWidth }" :style="{ maxWidth: slot.maxWidth }">
    <div
      class="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-line-strong bg-surface-2 p-4 text-center"
      :class="frameClass"
      :style="{ aspectRatio: slot.aspect }"
    >
      <p class="text-sm font-medium">Screenshot coming soon</p>
      <p class="font-mono text-xs text-muted">{{ slot.label }}</p>
    </div>
    <figcaption v-if="caption" class="mt-3 text-sm leading-relaxed text-muted">{{ slot.caption }}</figcaption>
  </figure>
</template>
