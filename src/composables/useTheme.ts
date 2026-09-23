import { onMounted, ref } from 'vue'

const isDark = ref(true)

/** Theme state shared across components. The initial class is set by the inline script in index.html. */
export function useTheme() {
  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    try {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  }

  return { isDark, toggle }
}
