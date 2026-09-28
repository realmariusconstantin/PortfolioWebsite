import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  {
    path: '/projects/romish',
    name: 'romish',
    component: () => import('./pages/RomishCaseStudy.vue'),
  },
  { path: '/404', name: 'not-found', component: () => import('./pages/NotFound.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('./pages/NotFound.vue') },
]
