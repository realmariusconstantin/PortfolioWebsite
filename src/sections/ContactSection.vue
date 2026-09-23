<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import AppIcon from '@/components/AppIcon.vue'
import ContactForm from '@/components/ContactForm.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { contact, person, sections } from '@/data/content'

const { copy, copied } = useClipboard({ source: person.email, legacy: true, copiedDuring: 2000 })

const handle = (url: string) => url.replace(/\/$/, '').split('/').pop()
const profiles = [
  { label: 'LinkedIn', href: person.linkedin, icon: 'linkedin', handle: handle(person.linkedin) },
  { label: 'GitHub', href: person.github, icon: 'github', handle: handle(person.github) },
] as const
</script>

<template>
  <section id="contact" aria-labelledby="contact-title" class="border-t border-line">
    <div class="container-content py-20 sm:py-28">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="contact-title" :index="5" eyebrow="Contact" v-bind="sections.contact" />
          <p v-reveal class="-mt-4 max-w-md leading-relaxed text-pretty text-muted">{{ contact.body }}</p>

          <ul v-reveal class="mt-8 divide-y divide-line rounded-lg border border-line bg-surface">
            <li class="flex items-center gap-3 px-4 py-3">
              <AppIcon name="mail" :size="18" class="text-muted" />
              <a :href="`mailto:${person.email}`" class="min-w-0 grow truncate hover:text-accent">{{ person.email }}</a>
              <button
                type="button"
                class="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 text-xs font-medium text-muted transition-colors hover:text-fg"
                @click="copy()"
              >
                <AppIcon :name="copied ? 'check' : 'copy'" :size="14" :class="{ 'text-accent': copied }" />
                <span>{{ copied ? 'Copied' : 'Copy' }}</span>
                <span class="sr-only">email address</span>
              </button>
              <span class="sr-only" aria-live="polite">{{ copied ? 'Email address copied to clipboard' : '' }}</span>
            </li>
            <li v-for="profile in profiles" :key="profile.label">
              <a
                :href="profile.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-3 px-4 py-3 hover:text-accent"
              >
                <AppIcon :name="profile.icon" :size="18" class="text-muted group-hover:text-accent" />
                <span class="grow">
                  {{ profile.label }}
                  <span class="ml-1 hidden font-mono text-xs text-muted sm:inline">/{{ profile.handle }}</span>
                </span>
                <AppIcon name="arrow-up-right" :size="16" class="text-muted" />
                <span class="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <div v-reveal>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
</template>
