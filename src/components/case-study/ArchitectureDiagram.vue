<script setup lang="ts">
import DiagramLink from './DiagramLink.vue'
import { romishCaseStudy } from '@/data/content'

/** Romish system overview. Plain HTML so it reflows: horizontal on desktop, vertical on mobile. */
const d = romishCaseStudy.architecture.diagram
const columns = 'lg:grid-cols-[1fr_minmax(140px,auto)_1fr_minmax(120px,auto)_1fr]'
</script>

<template>
  <figure class="rounded-lg border border-line bg-surface p-5 sm:p-8">
    <div class="grid items-center gap-2 lg:gap-3" :class="columns">
      <div class="rounded-md border border-line-strong bg-bg p-4">
        <p class="eyebrow">{{ d.client.kind }}</p>
        <p class="mt-1 font-semibold">{{ d.client.name }}</p>
        <p class="mt-1 font-mono text-xs text-muted">{{ d.client.detail }}</p>
      </div>

      <DiagramLink>
        <template v-for="(label, i) in d.clientToApi" :key="label"><br v-if="i" />{{ label }}</template>
      </DiagramLink>

      <div class="rounded-md border border-accent/60 bg-accent-soft/40 p-4">
        <p class="eyebrow">{{ d.api.kind }}</p>
        <p class="mt-1 font-semibold">{{ d.api.name }}</p>
        <p class="mt-1 font-mono text-xs text-muted">{{ d.api.detail }}</p>
        <ul class="mt-3 flex flex-wrap gap-1.5 font-mono text-[0.6875rem] text-muted">
          <li v-for="tag in d.api.tags" :key="tag" class="rounded-sm border border-line px-1.5 py-0.5">{{ tag }}</li>
        </ul>
      </div>

      <DiagramLink>{{ d.apiToDb.join(', ') }}</DiagramLink>

      <div class="rounded-md border border-line-strong bg-bg p-4">
        <p class="eyebrow">{{ d.db.kind }}</p>
        <p class="mt-1 font-semibold">{{ d.db.name }}</p>
        <p class="mt-1 font-mono text-xs text-muted">{{ d.db.detail }}</p>
      </div>
    </div>

    <!-- Identity providers sit under the API column on desktop -->
    <div class="grid lg:gap-3" :class="columns">
      <div class="lg:col-start-3">
        <DiagramLink vertical>{{ d.apiToIdentity }}</DiagramLink>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="p in d.identity" :key="p.name" class="rounded-md border border-line-strong bg-bg p-3">
            <p class="text-sm font-semibold">{{ p.name }}</p>
            <p class="font-mono text-[0.6875rem] text-muted">{{ p.detail }}</p>
          </div>
        </div>
      </div>
    </div>

    <figcaption class="mt-6 text-sm leading-relaxed text-muted">
      <slot />
    </figcaption>
  </figure>
</template>
