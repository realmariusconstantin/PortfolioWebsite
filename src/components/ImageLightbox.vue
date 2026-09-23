<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import ResponsiveImage from './ResponsiveImage.vue'
import type { Screenshot } from '@/data/content'

/** Full-screen image viewer built on the native <dialog>, which handles focus trapping and Escape. */
const dialog = ref<HTMLDialogElement>()
const current = ref<Screenshot | null>(null)

function open(shot: Screenshot) {
  current.value = shot
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
function onClick(event: MouseEvent) {
  // Clicking the backdrop (the dialog element itself, outside the figure) closes it.
  if (event.target === dialog.value) close()
}

defineExpose({ open })
</script>

<template>
  <dialog
    ref="dialog"
    aria-label="Screenshot viewer"
    class="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none place-items-center bg-transparent p-4 backdrop:bg-black/85 backdrop:backdrop-blur-sm open:grid sm:p-10"
    @click="onClick"
    @close="current = null"
  >
    <!-- Width is capped by both the viewport width and height so the whole image always fits -->
    <figure v-if="current" class="relative w-[min(100%,1400px,calc((100dvh-9rem)*1.9))]">
      <button
        type="button"
        class="absolute -top-2 right-0 z-10 inline-flex size-10 -translate-y-full items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white"
        aria-label="Close screenshot"
        @click="close"
      >
        <AppIcon name="x" :size="22" />
      </button>
      <div class="overflow-hidden rounded-md border border-white/10">
        <ResponsiveImage :image="current.image" :alt="current.alt" sizes="100vw" eager />
      </div>
      <figcaption class="mt-3 text-center text-sm text-white/80">{{ current.alt }}</figcaption>
    </figure>
  </dialog>
</template>
