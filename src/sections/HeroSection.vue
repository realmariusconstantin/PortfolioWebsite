<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import SocialLinks from '@/components/SocialLinks.vue'
import { featuredProject, hero, person } from '@/data/content'
</script>

<template>
  <section aria-labelledby="hero-title" class="relative isolate overflow-hidden">
    <!-- Faint grid, pure CSS, masked so it fades out toward the edges -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--c-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--c-line)_1px,transparent_1px)] bg-size-[56px_56px] opacity-50 mask-[radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
    />

    <div class="container-content grid items-end gap-12 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1fr_300px]">
      <div>
        <p class="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span class="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {{ person.availability }}
        </p>

        <h1 id="hero-title" class="mt-6 text-display font-semibold">
          {{ person.name }}
          <span class="block text-muted">{{ person.role }}</span>
        </h1>

        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
          {{ hero.headline }}
        </p>
        <p class="mt-4 max-w-2xl leading-relaxed text-pretty text-muted">
          {{ hero.intro }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton :href="hero.primaryCta.href" variant="primary">
            {{ hero.primaryCta.label }}
            <AppIcon name="arrow-right" :size="16" />
          </BaseButton>
          <BaseButton :href="hero.secondaryCta.href">{{ hero.secondaryCta.label }}</BaseButton>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
          <SocialLinks class="-ml-2.5" />
          <p class="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
            <AppIcon name="pin" :size="14" />
            {{ person.location }}
          </p>
        </div>
      </div>

      <!-- Desktop only: points straight at the flagship project -->
      <article
        class="group relative hidden rounded-lg border border-line bg-surface p-5 transition-colors hover:border-line-strong lg:block"
      >
        <div class="flex items-center gap-3">
          <img src="/images/romish-helmet-96.webp" alt="" width="40" height="40" class="size-10 rounded-md bg-surface-2" />
          <div>
            <p class="eyebrow">Now building</p>
            <h2 class="font-semibold">{{ featuredProject.title }}</h2>
          </div>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-muted">{{ featuredProject.summary }}</p>
        <p class="mt-4 font-mono text-xs text-muted">{{ featuredProject.status }} · {{ featuredProject.timeline }}</p>
        <RouterLink
          :to="featuredProject.caseStudy!"
          class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent after:absolute after:inset-0 after:rounded-lg"
        >
          Read the case study
          <AppIcon name="arrow-right" :size="14" class="transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </article>
    </div>
  </section>
</template>
