<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import CodeSnippet from './CodeSnippet.vue'
import DataTable from './DataTable.vue'
import { showsSlot } from '@/composables/useImageSlots'
import type { DeepDive } from '@/data/content'

/** One engineering deep dive: takeaway first, then the problem, what I built, and why it holds up. */
defineProps<{ dive: DeepDive; index: number; labels: { problem: string; did: string; robust: string } }>()
</script>

<template>
  <article
    :id="dive.id"
    :aria-labelledby="`${dive.id}-title`"
    class="scroll-mt-24 rounded-lg border border-line bg-surface p-5 sm:p-8"
  >
    <p class="font-mono text-xs text-accent">{{ String.fromCharCode(97 + index) }}.</p>
    <h3 :id="`${dive.id}-title`" class="mt-1 text-2xl font-semibold tracking-tight">{{ dive.title }}</h3>
    <p class="mt-3 text-lg leading-relaxed font-medium text-pretty">{{ dive.takeaway }}</p>

    <h4 class="mt-8 eyebrow">{{ labels.problem }}</h4>
    <p class="mt-2 max-w-3xl leading-relaxed text-pretty text-muted">{{ dive.problem }}</p>

    <div class="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div>
        <h4 class="eyebrow">{{ labels.did }}</h4>
        <ul class="mt-3 space-y-3">
          <li v-for="item in dive.did" :key="item" class="flex gap-3 text-[0.9375rem] leading-relaxed">
            <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span class="text-pretty">{{ item }}</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 class="eyebrow">{{ labels.robust }}</h4>
        <ul class="mt-3 space-y-3">
          <li v-for="item in dive.robust" :key="item" class="flex gap-3 text-[0.9375rem] leading-relaxed">
            <AppIcon name="check" :size="16" class="mt-1 text-accent" />
            <span class="text-pretty">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <CodeSnippet v-if="dive.snippet" class="mt-8" v-bind="dive.snippet" />
    <DataTable v-if="dive.table" class="mt-8" :table="dive.table" show-caption />
    <ImageSlot v-if="showsSlot(dive.image)" :id="dive.image!" class="mt-8" sizes="(min-width: 1100px) 800px, 100vw" />
  </article>
</template>
