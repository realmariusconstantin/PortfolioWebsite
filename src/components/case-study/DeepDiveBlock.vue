<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import CodeSnippet from './CodeSnippet.vue'
import DataTable from './DataTable.vue'
import { showsSlot } from '@/composables/useImageSlots'
import type { DeepDive } from '@/data/content'

/**
 * One engineering deep dive. The takeaway and the problem stay visible for skimming;
 * the lists, table and code sit in <details> so readers open only what they want.
 */
defineProps<{
  dive: DeepDive
  index: number
  labels: { problem: string; did: string; robust: string; more: string }
}>()

const toggle =
  'flex cursor-pointer list-none items-center gap-2.5 rounded-md px-4 py-3 text-[0.9375rem] font-medium transition-colors select-none hover:bg-surface-2 sm:px-6 [&::-webkit-details-marker]:hidden'
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

    <div class="mt-8 space-y-3">
      <details class="group rounded-md border border-line">
        <summary :class="toggle">
          <AppIcon name="chevron-right" :size="16" class="text-accent transition-transform group-open:rotate-90" />
          {{ labels.more }}
        </summary>
        <div class="border-t border-line px-4 py-6 sm:px-6">
          <div class="grid gap-8 lg:grid-cols-2 lg:gap-10">
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
          <DataTable v-if="dive.table" class="mt-8" :table="dive.table" show-caption />
        </div>
      </details>

      <details v-if="dive.snippet" class="group rounded-md border border-line">
        <summary :class="toggle">
          <AppIcon name="chevron-right" :size="16" class="text-accent transition-transform group-open:rotate-90" />
          {{ dive.snippet.toggle }}
        </summary>
        <div class="border-t border-line p-4 sm:px-6 sm:py-5">
          <CodeSnippet :label="dive.snippet.label" :code="dive.snippet.code" />
        </div>
      </details>
    </div>

    <ImageSlot v-if="showsSlot(dive.image)" :id="dive.image!" class="mt-8" sizes="(min-width: 1100px) 800px, 100vw" />
  </article>
</template>

