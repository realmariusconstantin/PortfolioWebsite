import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Id of the home page section currently in view, read by the header to highlight its link. */
export const activeSection = ref<string | null>(null)

/** Call from the page that owns the sections. Watches the middle band of the viewport. */
export function useScrollSpy(ids: readonly string[]) {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection.value = entry.target.id
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    activeSection.value = null
  })
}
