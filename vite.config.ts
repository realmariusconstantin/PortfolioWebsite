import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * Removes "TODO..." placeholder strings from src/data/content.ts in production builds,
 * so unfinished notes never ship in the JS bundle. Dev keeps them (shown as placeholders).
 */
function stripContentTodos(): Plugin {
  return {
    name: 'strip-content-todos',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!id.replaceAll('\\', '/').endsWith('/src/data/content.ts')) return
      return code
        .replace(/(:\s*)(['"])TODO.*?\2/g, "$1''") // property values -> ''
        .replace(/^\s*(['"])TODO.*?\1,?[ \t]*$/gm, '') // array items on their own line
        .replace(/,\s*(['"])TODO.*?\1(?=\s*\])/g, '') // trailing inline array items
    },
  }
}

export default defineConfig({
  plugins: [stripContentTodos(), vue(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    script: 'async',
    // Fonts are preloaded by hand in index.html (Latin sans only).
    beastiesOptions: { preloadFonts: false },
  },
})
