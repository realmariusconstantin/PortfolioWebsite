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

/**
 * Serves the Vercel functions in api/ from `npm run dev`, so the contact form works locally.
 * (Outside Vercel the contact function validates but doesn't send.)
 */
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const hasBody = req.method !== 'GET' && req.method !== 'HEAD'
        const request = new Request(`http://localhost${req.originalUrl ?? req.url}`, {
          method: req.method,
          headers: req.headers as Record<string, string>,
          body: hasBody ? Buffer.concat(chunks) : undefined,
        })
        const { default: handler } = await server.ssrLoadModule('/api/contact.ts')
        const response: Response = await handler.fetch(request)
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(Buffer.from(await response.arrayBuffer()))
      })
    },
  }
}

export default defineConfig({
  plugins: [stripContentTodos(), devApi(), vue(), tailwindcss()],
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
