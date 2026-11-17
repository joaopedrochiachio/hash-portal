import { useEffect, useState } from 'react'
import { usePathname } from '../lib/router'
import { Link } from './Link'
import { HashMark } from './HashMark'

const items = [
  { href: '/#quem-somos', label: 'Quem somos' },
  { href: '/#ecossistema', label: 'Ecossistema' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#lab', label: 'Lab' },
]

export function Nav() {
  const path = usePathname()
  // O menu fica aberto só na página em que foi aberto: trocar de rota o fecha.
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === path
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenAt(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${scrolled || open ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__bar container">
        <Link href="/" className="nav__brand" aria-label="Hash, página inicial">
          <HashMark size={30} />
          <span>hash</span>
        </Link>

        <nav className="nav__links" aria-label="Principal">
          {items.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpenAt(open ? null : path)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav id="menu-mobile" className="nav__sheet" aria-label="Menu" hidden={!open}>
        {items.map((i) => (
          <Link key={i.href} href={i.href} onClick={() => setOpenAt(null)}>
            {i.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
