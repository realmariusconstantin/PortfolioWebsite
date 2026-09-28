<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/** Link styled as a button. Internal paths use RouterLink, everything else a plain <a>. */
const props = withDefaults(
  defineProps<{
    href: string
    /** `brand` is the Romish amber button; it needs the `.romish` scope from main.css. */
    variant?: 'primary' | 'secondary' | 'ghost' | 'brand'
    size?: 'sm' | 'md'
    external?: boolean
  }>(),
  { variant: 'secondary', size: 'md', external: false },
)

const isRoute = computed(() => props.href.startsWith('/') && !props.external && !/\.\w+$/.test(props.href))

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-150',
  props.size === 'sm' ? 'h-8 px-3 text-sm' : 'h-11 px-5 text-[0.9375rem]',
  {
    primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
    secondary: 'border border-line-strong bg-surface text-fg hover:border-muted',
    ghost: 'text-muted hover:text-fg',
    brand: 'bg-(--c-brand) text-(--c-brand-fg) hover:bg-(--c-brand-hover)',
  }[props.variant],
])
</script>

<template>
  <RouterLink v-if="isRoute" :to="props.href" :class="classes"><slot /></RouterLink>
  <a
    v-else
    :href="props.href"
    :class="classes"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <span v-if="props.external" class="sr-only">(opens in a new tab)</span>
  </a>
</template>
