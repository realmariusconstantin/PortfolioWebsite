<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BaseButton from '@/components/BaseButton.vue'
import AppIcon from '@/components/AppIcon.vue'

useHead({ title: 'Page not found | Marius Constantin', meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <div class="container-content flex min-h-[60vh] flex-col items-start justify-center py-24">
    <p class="eyebrow">404</p>
    <h1 class="mt-3 text-h2 font-semibold">This page doesn't exist.</h1>
    <p class="mt-4 text-muted">The link may be old, or the address has a typo.</p>
    <BaseButton href="/" variant="primary" class="mt-8">
      <AppIcon name="arrow-left" :size="16" />
      Back to the homepage
    </BaseButton>
  </div>
</template>
