<script setup lang="ts">
/** Two-way arrow between diagram nodes. Points down on mobile; `vertical` keeps it pointing down on desktop too. */
defineProps<{ vertical?: boolean }>()
</script>

<template>
  <div
    class="flex items-center justify-center gap-3 py-2"
    :class="{ 'lg:flex-col lg:gap-1 lg:py-0': !vertical }"
  >
    <svg
      class="size-5 rotate-90 text-accent"
      :class="{ 'lg:rotate-0': !vertical }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9h16m-4-4 4 4-4 4M20 15H4m4 4-4-4 4-4" />
    </svg>
    <p class="font-mono text-[0.6875rem] leading-tight text-muted" :class="{ 'lg:text-center': !vertical }">
      <slot />
    </p>
  </div>
</template>
