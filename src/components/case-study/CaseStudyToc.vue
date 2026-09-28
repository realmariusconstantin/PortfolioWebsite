<script setup lang="ts">
import { computed, ref } from 'vue'
import { activeSection } from '@/composables/useScrollSpy'

export interface TocItem {
  id: string
  label: string
  children?: { id: string; label: string }[]
}

/**
 * "On this page", numbered like the section headings (01, 02, ...).
 * Desktop: a sticky list in the left column with the current section highlighted.
 * Phones: a sticky bar under the header that expands into the same list.
 */
const props = defineProps<{ items: TocItem[]; title: string; mode: 'desktop' | 'mobile' }>()

const open = ref(false)
const current = computed(() => props.items.findIndex((i) => i.id === activeSection.value))
const number = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <nav v-if="mode === 'desktop'" :aria-label="title" class="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6">
    <p class="eyebrow">{{ title }}</p>
    <ol class="mt-4 space-y-1 border-l border-line text-sm">
      <li v-for="(item, i) in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="-ml-px flex gap-2.5 border-l py-1.5 pl-4 transition-colors"
          :class="
            activeSection === item.id
              ? 'border-accent font-medium text-fg'
              : 'border-transparent text-muted hover:border-line-strong hover:text-fg'
          "
          :aria-current="activeSection === item.id ? 'location' : undefined"
        >
          <span class="font-mono text-xs leading-5 text-accent">{{ number(i) }}</span>
          <span>{{ item.label }}</span>
        </a>
        <ol v-if="item.children" class="mb-1 space-y-0.5">
          <li v-for="child in item.children" :key="child.id">
            <a :href="`#${child.id}`" class="block py-1 pl-12 text-[0.8125rem] text-muted transition-colors hover:text-fg">
              {{ child.label }}
            </a>
          </li>
        </ol>
      </li>
    </ol>
  </nav>

  <details
    v-else
    class="-mx-4 border-y border-line bg-bg/95 backdrop-blur-md sm:-mx-6"
    :open="open"
    @toggle="open = ($event.target as HTMLDetailsElement).open"
  >
    <summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm sm:px-6">
      <span class="min-w-0 truncate">
        <span class="eyebrow">{{ title }}</span>
        <span v-if="current >= 0" class="ml-2 font-medium">
          <span class="font-mono text-xs text-accent">{{ number(current) }}</span> {{ items[current]!.label }}
        </span>
      </span>
      <svg
        class="size-4 shrink-0 text-muted transition-transform"
        :class="{ 'rotate-180': open }"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <nav :aria-label="title" class="max-h-[60dvh] overflow-y-auto px-4 pb-4 sm:px-6">
      <ol class="space-y-0.5 text-[0.9375rem]">
        <li v-for="(item, i) in items" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="flex gap-3 rounded-sm py-2"
            :class="activeSection === item.id ? 'font-medium text-fg' : 'text-muted'"
            @click="open = false"
          >
            <span class="font-mono text-xs leading-6 text-accent">{{ number(i) }}</span>
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ol>
    </nav>
  </details>
</template>
