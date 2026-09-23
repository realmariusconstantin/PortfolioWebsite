<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { isTodo, sections, timeline } from '@/data/content'
</script>

<template>
  <section id="experience" aria-labelledby="experience-title" class="border-t border-line">
    <div class="container-content py-20 sm:py-28">
      <SectionHeading id="experience-title" :index="4" eyebrow="Experience" v-bind="sections.experience" />

      <ol class="relative max-w-3xl border-l border-line">
        <li v-for="entry in timeline" :key="entry.title" v-reveal class="relative pb-12 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            class="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-bg bg-accent ring-1 ring-line"
          />
          <p class="flex flex-wrap gap-x-3 eyebrow">
            <span class="text-accent">{{ entry.kind }}</span>
            <span>{{ entry.period }}</span>
          </p>
          <h3 class="mt-2 text-lg font-semibold tracking-tight">{{ entry.title }}</h3>
          <p class="text-muted">
            {{ entry.org }}<template v-if="entry.location">, {{ entry.location }}</template>
          </p>
          <ul class="mt-4 space-y-2">
            <li
              v-for="point in entry.points.filter((p) => !isTodo(p))"
              :key="point"
              class="relative pl-4 leading-relaxed text-pretty text-muted before:absolute before:top-[0.7em] before:left-0 before:size-1 before:rounded-full before:bg-line-strong"
            >
              {{ point }}
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
