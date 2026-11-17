import { useEffect, useRef } from 'react'
import { ChipLayer, GlyphLayer, TileLayer } from './HashMark'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Símbolo em 3D com CSS (sem three.js): três camadas em profundidades
 * diferentes que giram levemente com o mouse e com o scroll.
 * Carregado sob demanda pelo Hero.
 */
export default function Logo3D({ chip = '#0088FF' }: { chip?: string }) {
  const rigRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rig = rigRef.current
    if (!rig || prefersReducedMotion()) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let pointer = false
    let raf = 0
    let visible = true
    const start = performance.now()

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      pointer = true
      target.y = (e.clientX / window.innerWidth - 0.5) * 28
      target.x = -(e.clientY / window.innerHeight - 0.5) * 22
    }

    const tick = (now: number) => {
      const scroll = Math.min(window.scrollY / window.innerHeight, 1)
      // Sem mouse (iPhone): flutuação lenta e suave.
      const t = (now - start) / 1000
      const idleX = pointer ? 0 : Math.sin(t * 0.7) * 5
      const idleY = pointer ? 0 : Math.sin(t * 0.5 + 1) * 9
      const tx = target.x + idleX + scroll * 24
      const ty = target.y + idleY - scroll * 10
      current.x += (tx - current.x) * 0.08
      current.y += (ty - current.y) * 0.08
      rig.style.transform = `rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg)`
      if (visible) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(tick)
    })
    io.observe(rig)
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <div className="logo3d" role="img" aria-label="Símbolo da Hash: um # em relevo com um chip azul no centro">
      <div className="logo3d__rig" ref={rigRef}>
        <div className="logo3d__shadow" />
        <div className="logo3d__layer logo3d__tile">
          <TileLayer />
        </div>
        <div className="logo3d__layer logo3d__chip">
          <ChipLayer color={chip} />
        </div>
        <div className="logo3d__layer logo3d__glyph">
          <GlyphLayer />
        </div>
      </div>
    </div>
  )
}
