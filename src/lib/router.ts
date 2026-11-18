import { useSyncExternalStore } from 'react'

/**
 * Roteador mínimo baseado na History API (evita uma dependência inteira).
 * - Respeita o subcaminho do deploy (import.meta.env.BASE_URL, ex.: "/hash-portal/").
 *   As rotas do app são sempre escritas sem ele ("/projetos/walletai").
 * - Com VITE_MEMORY_ROUTER=1 (build de visualização embutida) a rota fica só
 *   em memória e a URL não muda.
 */

const MEMORY = import.meta.env.VITE_MEMORY_ROUTER === '1'
const BASE = MEMORY ? '/' : import.meta.env.BASE_URL.replace(/\/$/, '')
const memory = { path: '/', hash: '' }
const listeners = new Set<() => void>()

/** Rota do app → URL real (com o subcaminho). */
export const withBase = (to: string) => (to.startsWith('/') && BASE !== '/' ? BASE + to : to)

const stripBase = (path: string) =>
  BASE !== '/' && path.startsWith(BASE) ? path.slice(BASE.length) || '/' : path

const subscribe = (cb: () => void) => {
  if (MEMORY) {
    listeners.add(cb)
    return () => listeners.delete(cb)
  }
  window.addEventListener('popstate', cb)
  return () => window.removeEventListener('popstate', cb)
}

export const currentPath = () => (MEMORY ? memory.path : stripBase(window.location.pathname))
export const currentHash = () => (MEMORY ? memory.hash : window.location.hash)

export const usePathname = () => useSyncExternalStore(subscribe, currentPath, () => '/')

export function navigate(to: string) {
  if (MEMORY) {
    const url = new URL(to, 'http://local')
    memory.path = url.pathname
    memory.hash = url.hash
    listeners.forEach((l) => l())
    return
  }
  window.history.pushState(null, '', withBase(to))
  window.dispatchEvent(new PopStateEvent('popstate'))
}

/** Rola até uma âncora da página atual. */
export function scrollToHash(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.replace(/^#/, ''))) : null
  el?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return Boolean(el)
}

export const isMemoryRouter = MEMORY
