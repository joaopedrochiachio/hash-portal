import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProjectPage } from './pages/ProjectPage'
import { NotFound } from './pages/NotFound'
import { findProject } from './content/projects'
import { site } from './content/site'
import { usePathname } from './lib/router'
import { useReveal } from './lib/motion'

function route(path: string) {
  const clean = path.replace(/\/+$/, '') || '/'
  if (clean === '/') return { page: <Home />, title: `${site.name} · ${site.tagline}` }
  const m = clean.match(/^\/projetos\/([a-z0-9-]+)$/)
  if (m) {
    const p = findProject(m[1])
    if (p) return { page: <ProjectPage slug={m[1]} />, title: `${p.name} · Hash` }
  }
  return { page: <NotFound />, title: 'Página não encontrada · Hash' }
}

export default function App() {
  const path = usePathname()
  const { page, title } = route(path)

  useEffect(() => {
    document.title = title
  }, [title])

  // Ao trocar de página: vai para a âncora (se houver) ou para o topo.
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    const el = hash ? document.getElementById(decodeURIComponent(hash)) : null
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [path])

  useReveal(path)

  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Nav />
      {page}
      <Footer />
    </>
  )
}
