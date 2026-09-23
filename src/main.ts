import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './styles/main.css'
import App from './App.vue'
import { routes } from './router'
import { reveal } from './directives/reveal'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      return { top: 0 }
    },
  },
  ({ app }) => {
    app.directive('reveal', reveal)
  },
)
