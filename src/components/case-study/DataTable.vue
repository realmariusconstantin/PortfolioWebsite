<script setup lang="ts">
import type { Table } from '@/data/content'

/**
 * A table from content.ts. From `sm` up it's a real <table>; on phones each row
 * becomes a card with the column names as labels, so nothing scrolls sideways.
 */
defineProps<{ table: Table; showCaption?: boolean }>()
</script>

<template>
  <div>
    <table class="hidden w-full border-collapse text-left text-[0.9375rem] sm:table">
      <caption :class="showCaption ? 'mb-3 text-left text-sm text-muted' : 'sr-only'">{{ table.caption }}</caption>
      <thead>
        <tr class="border-b border-line-strong">
          <th v-for="h in table.head" :key="h" scope="col" class="py-3 pr-6 align-bottom eyebrow font-normal last:pr-0">
            {{ h }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.rows" :key="row[0]" class="border-b border-line last:border-b-0">
          <component
            :is="i === 0 ? 'th' : 'td'"
            v-for="(cell, i) in row"
            :key="i"
            :scope="i === 0 ? 'row' : undefined"
            class="py-3.5 pr-6 align-top leading-relaxed last:pr-0"
            :class="i === 0 ? 'font-medium' : 'text-muted'"
          >
            {{ cell }}
          </component>
        </tr>
      </tbody>
    </table>

    <!-- Phones: one card per row -->
    <div class="sm:hidden">
      <p v-if="showCaption" class="mb-3 text-sm text-muted">{{ table.caption }}</p>
      <ul class="space-y-3" :aria-label="table.caption">
        <li v-for="row in table.rows" :key="row[0]" class="rounded-md border border-line bg-bg p-4">
          <p class="font-medium">{{ row[0] }}</p>
          <dl class="mt-2 space-y-2 text-sm">
            <div v-for="(cell, i) in row.slice(1)" :key="i">
              <dt class="eyebrow">{{ table.head[i + 1] }}</dt>
              <dd class="mt-0.5 leading-relaxed text-muted">{{ cell }}</dd>
            </div>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>
