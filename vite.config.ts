import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { hasPage, projects } from './src/content/projects.ts'
import { site } from './src/content/site.ts'

/**
 * URL pública usada em canonical/Open Graph.
 * Na Vercel vem de VERCEL_PROJECT_PRODUCTION_URL; pode ser forçada com SITE_URL.
 */
const SITE_URL = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:5173')
).replace(/\/$/, '')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const fill = (html: string, title: string, description: string, path: string) =>
  html
    .replaceAll('%PAGE_TITLE%', esc(title))
    .replaceAll('%PAGE_DESCRIPTION%', esc(description))
    .replaceAll('%PAGE_URL%', `${SITE_URL}${path}`)
    .replaceAll('%SITE_URL%', SITE_URL)

/**
 * Gera um HTML por projeto (dist/projetos/[slug]/index.html) com title,
 * description e Open Graph próprios, para links compartilhados e SEO.
 */
function projectPages(): Plugin {
  let template = ''
  let outDir = 'dist'
  return {
    name: 'hash:project-pages',
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir)
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        template = html
        return fill(html, `${site.name} · ${site.tagline}`, site.description, '/')
      },
    },
    closeBundle() {
      if (!template) return
      for (const p of projects.filter(hasPage)) {
        const dir = resolve(outDir, 'projetos', p.slug)
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), fill(template, `${p.name} · Hash`, p.summary, `/projetos/${p.slug}`))
      }
      // 404 com o mesmo app (a rota desconhecida mostra a página "não encontrada").
      writeFileSync(resolve(outDir, '404.html'), readFileSync(resolve(outDir, 'index.html')))
    },
  }
}

export default defineConfig({
  plugins: [react(), projectPages()],
})
