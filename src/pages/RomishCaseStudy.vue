<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { hasImage, lightboxKey, showsSlot } from '@/composables/useImageSlots'
import AppIcon from '@/components/AppIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import ImageLightbox from '@/components/ImageLightbox.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import RomishMark from '@/components/RomishMark.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import TechChip from '@/components/TechChip.vue'
import ArchitectureDiagram from '@/components/case-study/ArchitectureDiagram.vue'
import BackToTop from '@/components/case-study/BackToTop.vue'
import BrandBoard from '@/components/case-study/BrandBoard.vue'
import CaseStudyToc, { type TocItem } from '@/components/case-study/CaseStudyToc.vue'
import DataTable from '@/components/case-study/DataTable.vue'
import DeepDiveBlock from '@/components/case-study/DeepDiveBlock.vue'
import JourneyTimeline from '@/components/case-study/JourneyTimeline.vue'
import { countWords, featuredProject, person, projects, romishCaseStudy as cs, site } from '@/data/content'

const dev = import.meta.env.DEV
const url = `${site.url}/projects/romish`

// The share image is cropped from the landing screenshot by `npm run images`; until that exists, use the old one
const og = hasImage(cs.hero.image)
  ? { image: cs.seo.ogImage, alt: cs.seo.ogImageAlt }
  : { image: cs.seo.ogFallback, alt: cs.seo.ogFallbackAlt }

useSeo({
  title: cs.seo.title,
  description: cs.seo.description,
  path: '/projects/romish',
  type: 'article',
  image: og.image,
  imageAlt: og.alt,
  jsonLd: {
    '@type': 'CreativeWork',
    name: `${cs.hero.title} case study`,
    headline: cs.seo.title,
    description: cs.seo.description,
    url,
    image: new URL(og.image, site.url).href,
    inLanguage: 'en',
    author: { '@type': 'Person', name: person.name, url: site.url },
    keywords: cs.hero.stack.join(', '),
    about: {
      '@type': 'SoftwareApplication',
      name: cs.hero.title,
      description: cs.hero.tagline,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Web',
      url: featuredProject.links[0]?.href,
      author: { '@type': 'Person', name: person.name },
    },
  },
})

// Screenshots anywhere on the page open in one shared lightbox
const lightbox = ref<InstanceType<typeof ImageLightbox>>()
provide(lightboxKey, (shot) => lightbox.value?.open(shot))

// Lessons only ship once confirmed (set `confirmed: false` on a lesson to hide it); dev shows them all
const lessons = cs.lessons.items.filter((l) => l.confirmed || dev)

// Section numbers on the page and in the TOC both come from this order
const toc: TocItem[] = [
  { id: cs.tldr.id, label: cs.tldr.nav },
  { id: cs.problem.id, label: cs.problem.nav },
  { id: cs.journey.id, label: cs.journey.nav },
  {
    id: cs.deepDives.id,
    label: cs.deepDives.nav,
    children: cs.deepDives.items.map((d) => ({ id: d.id, label: d.title })),
  },
  { id: cs.architecture.id, label: cs.architecture.nav },
  { id: cs.failure.id, label: cs.failure.nav },
  { id: cs.platform.id, label: cs.platform.nav },
  { id: cs.brand.id, label: cs.brand.nav },
  { id: cs.testing.id, label: cs.testing.nav },
  ...(lessons.length ? [{ id: cs.lessons.id, label: cs.lessons.nav }] : []),
  { id: cs.status.id, label: cs.status.nav },
]
useScrollSpy(toc.map((t) => t.id))

// Only count what this build renders (unconfirmed lessons are hidden in production)
const readingMinutes = Math.max(1, Math.round(countWords({ ...cs, lessons: { ...cs.lessons, items: lessons } }) / 220))
const sectionNumber = (id: string) => toc.findIndex((t) => t.id === id) + 1
const nextProject = projects.find((p) => !p.draft)
const beforeAfter = [
  { id: cs.brand.beforeAfter.before, label: cs.brand.beforeAfter.labels.before },
  { id: cs.brand.beforeAfter.after, label: cs.brand.beforeAfter.labels.after },
]
</script>

<template>
  <article class="romish pb-8">
    <!-- Hero -->
    <header id="top" class="container-content pt-10 sm:pt-16">
      <RouterLink
        :to="{ path: '/', hash: '#work' }"
        class="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
      >
        <AppIcon name="arrow-left" :size="16" />
        All projects
      </RouterLink>

      <p class="mt-10 flex flex-wrap items-center gap-x-3 eyebrow">
        <span class="text-accent">{{ cs.hero.eyebrow }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ readingMinutes }} {{ cs.toc.readingTime }}</span>
      </p>
      <h1 class="mt-3 flex items-center gap-4 text-display font-semibold">
        <RomishMark size="0.9em" decorative />
        {{ cs.hero.title }}
      </h1>
      <p class="mt-5 max-w-3xl text-lg leading-relaxed text-pretty sm:text-xl">{{ cs.hero.tagline }}</p>

      <dl class="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-6 sm:grid-cols-3 lg:grid-cols-5">
        <div v-for="item in cs.hero.meta" :key="item.label">
          <dt class="eyebrow">{{ item.label }}</dt>
          <dd class="mt-1.5 text-[0.9375rem] text-pretty">
            {{ item.value }}
          </dd>
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
            <RouterLink
              :to="cs.hero.walkthrough.href"
              class="inline-flex items-center gap-1 text-accent hover:text-accent-hover"
            >
              {{ cs.hero.walkthrough.label }} <AppIcon name="arrow-right" :size="14" />
            </RouterLink>
            <span class="inline-flex items-center gap-1.5 text-sm text-muted">
              <AppIcon name="lock" :size="13" /> {{ cs.hero.walkthrough.note }}
            </span>
          </dd>
        </div>
      </dl>

      <ul class="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
        <TechChip v-for="tech in cs.hero.stack" :key="tech">{{ tech }}</TechChip>
      </ul>

      <!-- LCP image, loaded eagerly -->
      <ImageSlot
        v-if="showsSlot(cs.hero.image)"
        :id="cs.hero.image"
        class="mt-12"
        :url="cs.hero.browserUrl"
        frame-class="romish-dark"
        eager
      />
    </header>

    <!-- At a glance -->
    <section aria-labelledby="glance-title" class="container-content mt-16">
      <h2 id="glance-title" class="eyebrow">{{ cs.glance.title }}</h2>
      <ul v-reveal class="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <li v-for="stat in cs.glance.stats" :key="stat.value" class="rounded-lg border border-line bg-surface p-5 sm:p-6">
          <p class="font-mono text-4xl font-semibold tracking-tight text-accent sm:text-5xl">{{ stat.value }}</p>
          <p class="mt-3 text-sm leading-relaxed text-pretty text-muted">{{ stat.label }}</p>
        </li>
      </ul>
    </section>

    <div class="container-content mt-16 lg:mt-24 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-14">
      <aside class="hidden lg:block">
        <CaseStudyToc :items="toc" :title="cs.toc.title" mode="desktop" />
      </aside>

      <div class="min-w-0">
        <div class="sticky top-16 z-30 lg:hidden">
          <CaseStudyToc :items="toc" :title="cs.toc.title" mode="mobile" />
        </div>

        <!-- 01 TL;DR -->
        <section :id="cs.tldr.id" aria-labelledby="tldr-title" class="scroll-mt-24 pt-12 lg:pt-0">
          <SectionHeading
            id="tldr-title"
            :index="sectionNumber(cs.tldr.id)"
            :eyebrow="cs.tldr.eyebrow"
            :title="cs.tldr.title"
            :takeaway="cs.tldr.takeaway"
          />
          <ul class="grid gap-3 sm:grid-cols-2">
            <li
              v-for="(point, i) in cs.tldr.points"
              :key="point.lead"
              v-reveal
              class="rounded-lg border border-line bg-surface p-5"
              :class="{ 'sm:col-span-2': i === 0 }"
            >
              <p class="font-semibold">{{ point.lead }}</p>
              <p class="mt-1.5 text-[0.9375rem] leading-relaxed text-pretty text-muted">{{ point.body }}</p>
            </li>
          </ul>
        </section>

        <!-- 02 Problem -->
        <section :id="cs.problem.id" aria-labelledby="problem-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="problem-title"
            :index="sectionNumber(cs.problem.id)"
            :eyebrow="cs.problem.eyebrow"
            :title="cs.problem.title"
            :takeaway="cs.problem.takeaway"
            :intro="cs.problem.body"
          />
          <ul class="grid gap-3 md:grid-cols-3">
            <li v-for="(item, i) in cs.problem.hard" :key="item.title" v-reveal class="rounded-lg border border-line p-5">
              <p class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</p>
              <h3 class="mt-2 font-semibold">{{ item.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-pretty text-muted">{{ item.body }}</p>
            </li>
          </ul>
        </section>

        <!-- 03 Player journey -->
        <section :id="cs.journey.id" aria-labelledby="journey-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="journey-title"
            :index="sectionNumber(cs.journey.id)"
            :eyebrow="cs.journey.eyebrow"
            :title="cs.journey.title"
            :takeaway="cs.journey.takeaway"
            :intro="cs.journey.intro"
          />
          <div v-reveal class="rounded-lg border border-line bg-surface p-5 sm:p-8">
            <JourneyTimeline :phases="cs.journey.phases" />
          </div>

          <ol class="mt-16 space-y-16 lg:space-y-20">
            <li
              v-for="(phase, i) in cs.journey.phases"
              :id="`phase-${phase.id}`"
              :key="phase.id"
              class="grid scroll-mt-28 items-center gap-6 lg:gap-10"
              :class="{ 'lg:grid-cols-2': showsSlot(phase.image) }"
            >
              <div v-reveal :class="{ 'lg:order-2': i % 2 === 1 }">
                <p class="flex items-center gap-3 font-mono text-xs">
                  <span class="text-accent">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span class="text-muted">{{ phase.clock }}</span>
                </p>
                <h3 class="mt-2 text-2xl font-semibold tracking-tight">{{ phase.label }}</h3>
                <ul class="mt-4 space-y-2.5">
                  <li v-for="point in phase.points" :key="point" class="flex gap-2.5 text-[0.9375rem] leading-relaxed">
                    <AppIcon name="check" :size="16" class="mt-1 text-accent" />
                    <span class="text-pretty">{{ point }}</span>
                  </li>
                </ul>
              </div>
              <ImageSlot
                v-if="showsSlot(phase.image)"
                :id="phase.image"
                v-reveal
                sizes="(min-width: 1100px) 400px, 100vw"
              />
            </li>
          </ol>

          <ImageSlot
            v-if="showsSlot(cs.journey.mobileImage)"
            :id="cs.journey.mobileImage"
            v-reveal
            class="mt-16"
            sizes="(min-width: 1100px) 860px, 100vw"
          />
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 04 Engineering deep dives -->
        <section :id="cs.deepDives.id" aria-labelledby="deep-dives-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="deep-dives-title"
            :index="sectionNumber(cs.deepDives.id)"
            :eyebrow="cs.deepDives.eyebrow"
            :title="cs.deepDives.title"
            :takeaway="cs.deepDives.takeaway"
          />
          <div class="space-y-6">
            <DeepDiveBlock
              v-for="(dive, i) in cs.deepDives.items"
              :key="dive.id"
              :dive="dive"
              :index="i"
              :labels="cs.deepDives.labels"
            />
          </div>
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 05 Architecture -->
        <section :id="cs.architecture.id" aria-labelledby="architecture-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="architecture-title"
            :index="sectionNumber(cs.architecture.id)"
            :eyebrow="cs.architecture.eyebrow"
            :title="cs.architecture.title"
            :takeaway="cs.architecture.takeaway"
            :intro="cs.architecture.intro"
          />
          <ArchitectureDiagram v-reveal />
          <div v-reveal class="mt-10">
            <h3 class="text-xl font-semibold tracking-tight">{{ cs.architecture.state.title }}</h3>
            <p class="mt-2 max-w-2xl leading-relaxed text-pretty text-muted">{{ cs.architecture.state.rule }}</p>
            <DataTable class="mt-5" :table="cs.architecture.state.table" />
          </div>
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 06 Handling failure -->
        <section :id="cs.failure.id" aria-labelledby="failure-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="failure-title"
            :index="sectionNumber(cs.failure.id)"
            :eyebrow="cs.failure.eyebrow"
            :title="cs.failure.title"
            :takeaway="cs.failure.takeaway"
          />
          <div v-reveal class="sm:rounded-lg sm:border sm:border-line sm:bg-surface sm:px-8 sm:py-4">
            <DataTable :table="cs.failure.table" />
          </div>
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 07 Beyond the match -->
        <section :id="cs.platform.id" aria-labelledby="platform-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="platform-title"
            :index="sectionNumber(cs.platform.id)"
            :eyebrow="cs.platform.eyebrow"
            :title="cs.platform.title"
            :takeaway="cs.platform.takeaway"
          />
          <ul class="grid gap-4 md:grid-cols-3">
            <li v-for="card in cs.platform.cards" :key="card.title" v-reveal class="rounded-lg border border-line bg-surface p-5">
              <h3 class="font-semibold">{{ card.title }}</h3>
              <ul class="mt-3 space-y-2.5">
                <li v-for="point in card.points" :key="point" class="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span class="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <span class="text-pretty">{{ point }}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            <template v-for="card in cs.platform.cards" :key="card.title">
              <ImageSlot v-if="showsSlot(card.image)" :id="card.image!" v-reveal sizes="(min-width: 768px) 430px, 100vw" />
            </template>
          </div>
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 08 Brand and design -->
        <section :id="cs.brand.id" aria-labelledby="brand-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="brand-title"
            :index="sectionNumber(cs.brand.id)"
            :eyebrow="cs.brand.eyebrow"
            :title="cs.brand.title"
            :takeaway="cs.brand.takeaway"
          />
          <div v-reveal class="max-w-2xl space-y-4 leading-relaxed text-pretty text-muted">
            <p v-for="paragraph in cs.brand.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </div>

          <ImageSlot
            v-if="showsSlot(cs.brand.exploration)"
            :id="cs.brand.exploration"
            v-reveal
            class="mt-12"
            sizes="(min-width: 1100px) 860px, 100vw"
          />

          <BrandBoard v-reveal class="mt-12" />

          <div v-reveal class="mt-10">
            <h3 class="text-lg font-semibold">{{ cs.brand.beforeAfter.title }}</h3>
            <figure class="mt-4">
              <div class="grid gap-6 sm:grid-cols-2 sm:gap-4">
                <div v-for="side in beforeAfter" :key="side.id" class="min-w-0">
                  <p class="mb-2 eyebrow">{{ side.label }}</p>
                  <ImageSlot
                    v-if="showsSlot(side.id)"
                    :id="side.id"
                    :caption="false"
                    sizes="(min-width: 1100px) 420px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
              <figcaption class="mt-3 text-sm leading-relaxed text-muted">{{ cs.brand.beforeAfter.caption }}</figcaption>
            </figure>
          </div>
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 09 Testing and tooling -->
        <section :id="cs.testing.id" aria-labelledby="testing-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="testing-title"
            :index="sectionNumber(cs.testing.id)"
            :eyebrow="cs.testing.eyebrow"
            :title="cs.testing.title"
            :takeaway="cs.testing.takeaway"
          />
          <dl class="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <div v-for="item in cs.testing.items" :key="item.title" v-reveal>
              <dt class="font-semibold">{{ item.title }}</dt>
              <dd class="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-muted">{{ item.body }}</dd>
            </div>
          </dl>
          <ImageSlot
            v-if="showsSlot(cs.testing.image)"
            :id="cs.testing.image"
            v-reveal
            class="mt-12"
            sizes="(min-width: 1100px) 860px, 100vw"
          />
          <BackToTop :label="cs.toc.backToTop" />
        </section>

        <!-- 10 Lessons learned: only confirmed lessons ship -->
        <section
          v-if="lessons.length"
          :id="cs.lessons.id"
          aria-labelledby="lessons-title"
          class="scroll-mt-24 pt-24"
        >
          <SectionHeading
            id="lessons-title"
            :index="sectionNumber(cs.lessons.id)"
            :eyebrow="cs.lessons.eyebrow"
            :title="cs.lessons.title"
            :takeaway="cs.lessons.takeaway"
          />
          <ol class="space-y-4">
            <li v-for="(lesson, i) in lessons" :key="lesson.title" v-reveal class="rounded-lg border border-line p-5 sm:p-6">
              <p class="font-mono text-xs text-accent">{{ String(i + 1).padStart(2, '0') }}</p>
              <h3 class="mt-2 text-lg font-semibold">{{ lesson.title }}</h3>
              <p class="mt-2 leading-relaxed text-pretty text-muted">{{ lesson.body }}</p>
            </li>
          </ol>
        </section>

        <!-- 11 Status -->
        <section :id="cs.status.id" aria-labelledby="status-title" class="scroll-mt-24 pt-24">
          <SectionHeading
            id="status-title"
            :index="sectionNumber(cs.status.id)"
            :eyebrow="cs.status.eyebrow"
            :title="cs.status.title"
            :takeaway="cs.status.takeaway"
          />
          <p v-reveal class="max-w-2xl leading-relaxed text-pretty text-muted">{{ cs.status.body }}</p>
          <ul v-reveal class="mt-5 grid gap-3 sm:grid-cols-2">
            <li
              v-for="item in cs.status.next"
              :key="item"
              class="flex items-start gap-3 rounded-lg border border-line bg-surface p-4 text-[0.9375rem] leading-relaxed"
            >
              <AppIcon name="arrow-right" :size="16" class="mt-1 text-accent" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- CTA + project navigation -->
    <section aria-labelledby="cta-title" class="container-content mt-24">
      <div v-reveal class="rounded-lg border border-line bg-surface p-8 sm:p-12">
        <h2 id="cta-title" class="text-h2 font-semibold">{{ cs.cta.title }}</h2>
        <p class="mt-4 max-w-xl leading-relaxed text-pretty text-muted">{{ cs.cta.body }}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton href="/#contact" variant="brand">
            {{ cs.cta.contact }}
            <AppIcon name="arrow-right" :size="16" />
          </BaseButton>
          <BaseButton :href="site.resume" external>
            <AppIcon name="file" :size="16" />
            {{ cs.cta.resume }}
          </BaseButton>
        </div>
      </div>

      <nav aria-label="Projects" class="mt-8 grid gap-4 sm:grid-cols-2">
        <RouterLink
          :to="{ path: '/', hash: '#work' }"
          class="group rounded-lg border border-line p-5 transition-colors hover:border-line-strong"
        >
          <span class="eyebrow">Previous</span>
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
