<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { about, sections } from '@/data/content'
</script>

<template>
  <section id="about" aria-labelledby="about-title" class="border-t border-line">
    <div class="container-content py-20 sm:py-28">
      <SectionHeading id="about-title" :index="3" eyebrow="About" v-bind="sections.about" />

      <div class="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div v-reveal class="max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed text-pretty text-muted">
          <p v-for="(paragraph, i) in about.paragraphs" :key="i" :class="{ 'text-fg': i === 0 }">{{ paragraph }}</p>
        </div>

        <dl v-reveal class="h-fit divide-y divide-line rounded-lg border border-line bg-surface">
          <div v-for="fact in about.facts" :key="fact.label" class="flex flex-col gap-1 px-5 py-4">
            <dt class="eyebrow">{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
