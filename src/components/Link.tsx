import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { currentPath, isMemoryRouter, navigate, scrollToHash, withBase } from '../lib/router'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Link interno: navega sem recarregar; âncoras na mesma página usam o scroll nativo. */
export function Link({ href, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (!href.startsWith('/')) return
    const url = new URL(href, 'http://local')
    if (url.pathname === currentPath() && url.hash) {
      // Âncora na mesma página: scroll nativo, ou manual no modo em memória.
      if (isMemoryRouter) {
        e.preventDefault()
        scrollToHash(url.hash)
      }
      return
    }
    e.preventDefault()
    navigate(url.pathname + url.hash)
  }
  return <a href={withBase(href)} onClick={handle} {...rest} />
}
