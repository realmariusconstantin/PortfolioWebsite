import type { Directive } from 'vue'

let observer: IntersectionObserver | undefined

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        (entry.target as HTMLElement).dataset.revealed = ''
        observer!.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  )
  return observer
}

/** Fades an element up the first time it scrolls into view. Styles live in main.css. */
export const reveal: Directive<HTMLElement> = {
  getSSRProps: () => ({ 'data-reveal': '' }),
  mounted(el) {
    el.setAttribute('data-reveal', '')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
