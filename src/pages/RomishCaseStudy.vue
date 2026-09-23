<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import BrowserFrame from '@/components/BrowserFrame.vue'
import DevTodo from '@/components/DevTodo.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import ResponsiveImage from '@/components/ResponsiveImage.vue'
import TechChip from '@/components/TechChip.vue'
import ArchitectureDiagram from '@/components/case-study/ArchitectureDiagram.vue'
import { featuredProject, isTodo, projects, romishCaseStudy as cs, site, type Screenshot } from '@/data/content'

useHead({
  title: cs.seo.title,
  meta: [{ name: 'description', content: cs.seo.description }],
})

const lightbox = ref<InstanceType<typeof ImageLightbox>>()
const zoom = (shot: Screenshot) => lightbox.value?.open(shot)

const hasChallenges = computed(() => cs.challenges.items.some((item) => !isTodo(item)))
const dev = import.meta.env.DEV
const nextProject = projects.find((p) => !p.draft)
</script>

<template>
  <article class="pb-8">
    <!-- Header -->
    <header class="container-content pt-10 sm:pt-16">
      <RouterLink
        :to="{ path: '/', hash: '#work' }"
        class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
      >
        <AppIcon name="arrow-left" :size="16" />
        All projects
      </RouterLink>

      <p class="mt-10 eyebrow"><span class="text-accent">Case study</span></p>
      <h1 class="mt-3 text-display font-semibold">{{ cs.title }}</h1>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">{{ cs.tagline }}</p>

      <dl class="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 sm:grid-cols-4">
        <div v-for="item in cs.meta" :key="item.label">
          <dt class="eyebrow">{{ item.label }}</dt>
          <dd class="mt-1.5 text-[0.9375rem]">{{ item.value }}</dd>
        </div>
        <div class="col-span-2 sm:col-span-1">
          <dt class="eyebrow">Links</dt>
          <dd class="mt-1.5 flex flex-col gap-1 text-[0.9375rem]">
            <a
              v-for="link in featuredProject.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-accent hover:text-accent-hover"
            >
              {{ link.label }} <AppIcon name="arrow-up-right" :size="14" />
              <span class="sr-only">(opens in a new tab)</span>
            </a>
            <span class="inline-flex items-center gap-1.5 text-sm text-muted">
              <AppIcon name="lock" :size="13" /> {{ featuredProject.repoNote }}
            </span>
          </dd>
        </div>
      </dl>

      <ul class="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
        <TechChip v-for="tech in featuredProject.stack" :key="tech">{{ tech }}</TechChip>
      </ul>
    </header>

    <!-- Hero screenshot (LCP image, loaded eagerly) -->
    <div class="container-content mt-12">
      <button
        type="button"
        class="group relative block w-full cursor-zoom-in text-left"
        :aria-label="`Enlarge screenshot: ${cs.heroImage.alt}`"
        @click="zoom(cs.heroImage)"
      >
        <BrowserFrame url="romish.org">
          <ResponsiveImage :image="cs.heroImage.image" :alt="cs.heroImage.alt" eager />
        </BrowserFrame>
      </button>
    </div>

    <!-- Problem -->
    <section aria-labelledby="problem" class="container-content mt-24 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-16">
      <h2 id="problem" v-reveal class="text-2xl font-semibold tracking-tight">{{ cs.problem.title }}</h2>
      <div v-reveal class="max-w-2xl space-y-4 text-[1.0625rem] leading-relaxed text-pretty text-muted">
        <p v-for="p in cs.problem.paragraphs" :key="p">{{ p }}</p>
      </div>
    </section>

    <!-- Solution -->
    <section aria-labelledby="solution" class="container-content mt-20 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-16">
      <h2 id="solution" v-reveal class="text-2xl font-semibold tracking-tight">{{ cs.solution.title }}</h2>
      <div>
        <p v-reveal class="max-w-2xl text-[1.0625rem] leading-relaxed text-muted">{{ cs.solution.intro }}</p>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2">
          <li
            v-for="(pillar, i) in cs.solution.pillars"
            :key="pillar.title"
            v-reveal
            class="rounded-lg border border-line bg-surface p-5"
          >
            <p class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</p>
            <h3 class="mt-2 font-semibold">{{ pillar.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ pillar.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Feature walkthrough -->
    <section aria-labelledby="walkthrough" class="mt-24 border-t border-line pt-20">
      <div class="container-content">
        <p class="eyebrow">{{ cs.walkthrough.eyebrow }}</p>
        <h2 id="walkthrough" class="mt-3 text-h2 font-semibold">{{ cs.walkthrough.title }}</h2>

        <ol class="mt-14 space-y-20 lg:space-y-28">
          <li
            v-for="(feature, i) in cs.features"
            :key="feature.id"
            class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div v-reveal :class="{ 'lg:order-2': i % 2 === 1 }">
              <p class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</p>
              <h3 class="mt-2 text-2xl font-semibold tracking-tight">{{ feature.title }}</h3>
              <p class="mt-4 leading-relaxed text-pretty text-muted">{{ feature.body }}</p>
              <ul class="mt-5 space-y-2.5">
                <template v-for="point in feature.points" :key="point">
                  <DevTodo v-if="isTodo(point)" as="li" :text="point" />
                  <li v-else class="flex gap-2.5 text-[0.9375rem] leading-relaxed">
                    <AppIcon name="check" :size="16" class="mt-1 text-accent" />
                    <span>{{ point }}</span>
                  </li>
                </template>
              </ul>
            </div>
            <button
              v-reveal
              type="button"
              class="group relative block w-full cursor-zoom-in text-left"
              :aria-label="`Enlarge screenshot: ${feature.image.alt}`"
              @click="zoom(feature.image)"
            >
              <BrowserFrame>
                <ResponsiveImage
                  :image="feature.image.image"
                  :alt="feature.image.alt"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </BrowserFrame>
              <span
                class="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2.5 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <AppIcon name="zoom" :size="14" /> Enlarge
              </span>
            </button>
          </li>
        </ol>
      </div>
    </section>

    <!-- Technical highlights -->
    <section aria-labelledby="technical" class="mt-24 border-t border-line pt-20">
      <div class="container-content">
        <p class="eyebrow">{{ cs.technical.eyebrow }}</p>
        <h2 id="technical" class="mt-3 text-h2 font-semibold">{{ cs.technical.title }}</h2>

        <div class="mt-12">
          <h3 class="text-xl font-semibold tracking-tight">{{ cs.architecture.title }}</h3>
          <div v-reveal class="mt-5">
            <ArchitectureDiagram>{{ cs.architecture.intro }}</ArchitectureDiagram>
          </div>
          <div class="mt-3 space-y-2">
            <template v-for="note in cs.architecture.notes" :key="note">
              <DevTodo v-if="isTodo(note)" :text="note" />
              <p v-else class="text-sm text-muted">{{ note }}</p>
            </template>
          </div>
        </div>

        <div class="mt-12 grid gap-4 lg:grid-cols-2">
          <div v-reveal class="min-w-0 rounded-lg border border-line bg-surface p-6">
            <h3 class="text-xl font-semibold tracking-tight">{{ cs.auth.title }}</h3>
            <ol class="mt-5 space-y-4">
              <template v-for="(step, i) in cs.auth.steps" :key="step">
                <DevTodo v-if="isTodo(step)" as="li" :text="step" />
                <li v-else class="flex gap-3 text-[0.9375rem] leading-relaxed text-muted">
                  <span
                    class="flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-fg"
                    aria-hidden="true"
                  >
                    {{ i + 1 }}
                  </span>
                  <span>{{ step }}</span>
                </li>
              </template>
            </ol>
          </div>

          <div class="grid min-w-0 gap-4">
            <div v-reveal class="min-w-0 rounded-lg border border-line bg-surface p-6">
              <h3 class="text-xl font-semibold tracking-tight">{{ cs.realtime.title }}</h3>
              <div class="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-muted">
                <template v-for="p in cs.realtime.paragraphs" :key="p">
                  <DevTodo v-if="isTodo(p)" :text="p" />
                  <p v-else>{{ p }}</p>
                </template>
              </div>
            </div>

            <div v-reveal class="min-w-0 rounded-lg border border-line bg-surface p-6">
              <h3 class="text-xl font-semibold tracking-tight">{{ cs.elo.title }}</h3>
              <p v-for="p in cs.elo.paragraphs" :key="p" class="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {{ p }}
              </p>
              <pre
                class="mt-4 overflow-x-auto rounded-md border border-line bg-bg p-4 font-mono text-[0.8125rem] leading-relaxed"
              ><code>{{ cs.elo.formula.expected }}
{{ cs.elo.formula.update }}</code></pre>
              <p class="mt-3 text-sm leading-relaxed text-muted">{{ cs.elo.formula.legend }}</p>
              <div class="mt-3 space-y-2">
                <template v-for="note in cs.elo.notes" :key="note">
                  <DevTodo v-if="isTodo(note)" :text="note" />
                  <p v-else class="text-sm text-muted">{{ note }}</p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Challenges: hidden in production until real entries are written -->
    <section
      v-if="hasChallenges || dev"
      aria-labelledby="challenges"
      class="container-content mt-24 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-16"
    >
      <h2 id="challenges" class="text-2xl font-semibold tracking-tight">{{ cs.challenges.title }}</h2>
      <ul class="max-w-2xl space-y-4">
        <template v-for="item in cs.challenges.items" :key="item">
          <DevTodo v-if="isTodo(item)" as="li" :text="item" />
          <li v-else class="leading-relaxed text-muted">{{ item }}</li>
        </template>
      </ul>
    </section>

    <!-- CTA + project navigation -->
    <section aria-labelledby="cta" class="container-content mt-24">
      <div v-reveal class="rounded-lg border border-line bg-surface p-8 sm:p-12">
        <h2 id="cta" class="text-h2 font-semibold">{{ cs.cta.title }}</h2>
        <p class="mt-4 max-w-xl leading-relaxed text-pretty text-muted">{{ cs.cta.body }}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton href="/#contact" variant="primary">
            Get in touch
            <AppIcon name="arrow-right" :size="16" />
          </BaseButton>
          <BaseButton :href="site.resume" external>
            <AppIcon name="file" :size="16" />
            View resume
          </BaseButton>
        </div>
      </div>

      <nav aria-label="Projects" class="mt-8 grid gap-4 sm:grid-cols-2">
        <RouterLink
          :to="{ path: '/', hash: '#work' }"
          class="group rounded-lg border border-line p-5 transition-colors hover:border-line-strong"
        >
          <span class="eyebrow">Back</span>
          <span class="mt-1 flex items-center gap-2 font-medium">
            <AppIcon name="arrow-left" :size="16" class="transition-transform group-hover:-translate-x-0.5" />
            All projects
          </span>
        </RouterLink>
        <a
          v-if="nextProject?.links[0]"
          :href="nextProject.caseStudy ?? nextProject.links[0].href"
          :target="nextProject.caseStudy ? undefined : '_blank'"
          :rel="nextProject.caseStudy ? undefined : 'noopener noreferrer'"
          class="group rounded-lg border border-line p-5 text-right transition-colors hover:border-line-strong"
        >
          <span class="eyebrow">Next project</span>
          <span class="mt-1 flex items-center justify-end gap-2 font-medium">
            {{ nextProject.title }}
            <AppIcon name="arrow-right" :size="16" class="transition-transform group-hover:translate-x-0.5" />
          </span>
          <span v-if="!nextProject.caseStudy" class="sr-only">(opens GitHub in a new tab)</span>
        </a>
      </nav>
    </section>

    <ImageLightbox ref="lightbox" />
  </article>
</template>
