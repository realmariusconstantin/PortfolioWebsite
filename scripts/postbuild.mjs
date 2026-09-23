// Vercel serves /404.html for unknown paths; vite-ssg writes the 404 route to 404/index.html.
import { copyFile } from 'node:fs/promises'

await copyFile('dist/404/index.html', 'dist/404.html')
console.log('postbuild: wrote dist/404.html')
