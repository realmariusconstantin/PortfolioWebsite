<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main id="main" tabindex="-1" class="outline-none">
    <RouterView />
  </main>
  <SiteFooter />
</template>
