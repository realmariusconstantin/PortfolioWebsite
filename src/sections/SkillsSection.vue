<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import TechChip from '@/components/TechChip.vue'
import { sections, skills } from '@/data/content'
</script>

<template>
  <section id="skills" aria-labelledby="skills-title" class="border-t border-line">
    <div class="container-content py-20 sm:py-28">
      <SectionHeading id="skills-title" :index="2" eyebrow="Skills" v-bind="sections.skills" />

      <dl v-reveal class="divide-y divide-line border-y border-line">
        <div
          v-for="group in skills"
          :key="group.group"
          class="grid gap-3 py-5 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-8"
        >
          <dt class="text-sm font-medium">{{ group.group }}</dt>
          <dd>
            <ul class="flex flex-wrap gap-2">
              <TechChip v-for="item in group.items" :key="item" class="text-[0.8125rem]! text-fg!">{{ item }}</TechChip>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
