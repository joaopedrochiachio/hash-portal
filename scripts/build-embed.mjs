// Gera um único HTML autocontido (JS, CSS e fontes embutidos) para visualização
// fora da Vercel, por exemplo como Artifact no claude.ai. Uso: node scripts/build-embed.mjs <saida.html>
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'

execSync('npx vite build --mode embed', { stdio: 'inherit' })
const dir = 'dist-embed/assets'
const files = readdirSync(dir)
const js = files.filter((f) => f.endsWith('.js')).map((f) => readFileSync(`${dir}/${f}`, 'utf8'))
const css = files.filter((f) => f.endsWith('.css')).map((f) => readFileSync(`${dir}/${f}`, 'utf8'))
if (js.length !== 1) throw new Error(`esperava 1 arquivo JS, achei ${js.length}`)

const html = `<title>Portal Hash</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Hash é o hub de produtos digitais com IA criado por João Pedro e Leo.">
<style>${css.join('\n')}</style>
<div id="root"></div>
<script type="module">${js[0].replace(/<\/script/gi, '<\\/script')}</script>
`
const out = process.argv[2] ?? 'dist-embed/hash-portal.html'
writeFileSync(out, html)
console.log(`ok: ${out} (${(html.length / 1024).toFixed(0)} KB)`)
