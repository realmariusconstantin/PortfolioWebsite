<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { onKeyStroke, useWindowScroll } from '@vueuse/core'
import AppIcon from './AppIcon.vue'
import BaseButton from './BaseButton.vue'
import ThemeToggle from './ThemeToggle.vue'
import { nav, person, site } from '@/data/content'
import { activeSection } from '@/composables/useScrollSpy'

const route = useRoute()
const { y } = useWindowScroll()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()

watch(() => route.fullPath, () => (menuOpen.value = false))
onKeyStroke('Escape', () => {
  if (!menuOpen.value) return
  menuOpen.value = false
  nextTick(() => menuButton.value?.focus())
})

const linkTo = (id: string) => ({ path: '/', hash: `#${id}` })
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200"
    :class="y > 8 || menuOpen ? 'border-line bg-bg/85' : 'border-transparent bg-bg/0'"
  >
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-fg"
    >
      Skip to content
    </a>

    <div class="container-content flex h-16 items-center justify-between gap-4">
      <RouterLink
        to="/"
        class="font-mono text-base font-semibold tracking-tight"
        :aria-label="`${person.name}, home`"
      >
        {{ person.initials }}<span class="text-accent">.</span>
      </RouterLink>

      <nav aria-label="Primary" class="hidden md:block">
        <ul class="flex items-center gap-1">
          <li v-for="item in nav" :key="item.id">
            <RouterLink
              :to="linkTo(item.id)"
              class="rounded-md px-3 py-2 text-sm transition-colors hover:text-fg"
              :class="activeSection === item.id ? 'text-fg' : 'text-muted'"
              :aria-current="activeSection === item.id ? 'location' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <BaseButton :href="site.resume" external variant="secondary" size="sm">
          <AppIcon name="file" :size="15" />
          Resume
        </BaseButton>
        <button
          ref="menuButton"
          type="button"
          class="inline-flex size-9 items-center justify-center rounded-md text-fg hover:bg-surface-2 md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'x' : 'menu'" :size="20" />
        </button>
      </div>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-menu"
      aria-label="Mobile"
      class="absolute inset-x-0 top-full border-y border-line bg-bg md:hidden"
    >
      <ul class="container-content flex flex-col py-3">
        <li v-for="item in nav" :key="item.id">
          <RouterLink
            :to="linkTo(item.id)"
            class="flex h-12 items-center text-base"
            :class="activeSection === item.id ? 'text-fg' : 'text-muted'"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
