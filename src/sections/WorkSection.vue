<script setup lang="ts">
import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import BrowserFrame from '@/components/BrowserFrame.vue'
import ResponsiveImage from '@/components/ResponsiveImage.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TechChip from '@/components/TechChip.vue'
import { featuredProject as romish, moreOnGithub, person, projects, sections } from '@/data/content'

const published = projects.filter((p) => !p.draft)
</script>

<template>
  <section id="work" aria-labelledby="work-title" class="container-content py-20 sm:py-28">
    <SectionHeading id="work-title" :index="1" eyebrow="Work" v-bind="sections.work" />

    <!-- Featured: Romish -->
    <article v-reveal class="overflow-hidden rounded-lg border border-line bg-surface" aria-labelledby="romish-title">
      <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:p-10">
        <div>
          <p class="flex flex-wrap items-center gap-x-3 gap-y-1 eyebrow">
            <span class="text-accent">Featured project</span>
            <span aria-hidden="true">·</span>
            <span>{{ romish.status }}</span>
          </p>
          <h3 id="romish-title" class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{{ romish.title }}</h3>
          <p class="mt-3 text-lg leading-relaxed text-pretty">{{ romish.summary }}</p>

          <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            <TechChip v-for="tech in romish.stack" :key="tech">{{ tech }}</TechChip>
          </ul>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BaseButton :href="romish.caseStudy!" variant="primary">
              Read the case study
              <AppIcon name="arrow-right" :size="16" />
            </BaseButton>
            <BaseButton v-for="link in romish.links" :key="link.href" :href="link.href" :external="link.external">
              {{ link.label }}
              <AppIcon name="arrow-up-right" :size="16" />
            </BaseButton>
          </div>
          <p v-if="romish.repoNote" class="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
            <AppIcon name="lock" :size="14" />
            <a href="#contact" class="underline decoration-line-strong underline-offset-4 hover:text-fg">
              {{ romish.repoNote }}
            </a>
          </p>
        </div>

        <div>
          <h4 class="eyebrow">What it does</h4>
          <ul class="mt-4 space-y-4">
            <li v-for="outcome in romish.outcomes" :key="outcome" class="flex gap-3 leading-relaxed">
              <AppIcon name="check" :size="18" class="mt-0.5 text-accent" />
              <span class="text-pretty">{{ outcome }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="px-3 sm:px-8 lg:px-10">
        <BrowserFrame url="romish.org" class="rounded-b-none border-b-0">
          <ResponsiveImage :image="romish.image!.image" :alt="romish.image!.alt" />
        </BrowserFrame>
      </div>
    </article>

    <!-- Other projects -->
    <h3 v-reveal class="mt-16 eyebrow">More projects</h3>
    <ul class="mt-6 grid gap-4 md:grid-cols-2">
      <li
        v-for="project in published"
        :key="project.slug"
        v-reveal
        class="flex flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong"
      >
        <h4 class="text-lg font-semibold tracking-tight">{{ project.title }}</h4>
        <p class="mt-2 grow leading-relaxed text-pretty text-muted">{{ project.summary }}</p>
        <ul class="mt-5 flex flex-wrap gap-1.5" :aria-label="`${project.title} tech stack`">
          <TechChip v-for="tech in project.stack" :key="tech">{{ tech }}</TechChip>
        </ul>
        <div v-if="project.links.length" class="mt-5 flex flex-wrap gap-4 border-t border-line pt-4">
          <a
            v-for="link in project.links"
            :key="link.href"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            {{ link.label }}
            <AppIcon name="arrow-up-right" :size="14" />
            <span v-if="link.external" class="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </li>

      <li v-reveal class="flex flex-col justify-between rounded-lg border border-dashed border-line-strong p-6">
        <div>
          <h4 class="text-lg font-semibold tracking-tight">{{ moreOnGithub.title }}</h4>
          <p class="mt-2 leading-relaxed text-muted">{{ moreOnGithub.body }}</p>
        </div>
        <a
          :href="person.github"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
        >
          <AppIcon name="github" :size="16" />
          {{ person.github.replace('https://', '') }}
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </li>
    </ul>
  </section>
</template>
