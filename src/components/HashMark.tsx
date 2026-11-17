import { useId } from 'react'
import { shade } from '../lib/color'

/**
 * Símbolo da Hash: um "#" em relevo cerâmico dentro de um squircle,
 * com um chip colorido na célula central. Desenhado em viewBox 100×100
 * e dividido em camadas para a versão 3D reaproveitar as mesmas peças.
 */

export type Tone = 'ceramic' | 'titanium' | 'blue'

const HASH_TRANSFORM = 'translate(50 50) skewX(-9) translate(-50 -50)'
const BARS = [
  { x: 31, y: 19, w: 11, h: 62 },
  { x: 58, y: 19, w: 11, h: 62 },
  { x: 19, y: 31, w: 62, h: 11 },
  { x: 19, y: 58, w: 62, h: 11 },
]

const TILES: Record<Tone, { top: string; bottom: string; edge: string; rim: string }> = {
  ceramic: { top: '#FFFFFF', bottom: '#E9E9EE', edge: 'rgba(0,0,0,.07)', rim: 'rgba(255,255,255,1)' },
  titanium: { top: '#2C2C31', bottom: '#141416', edge: 'rgba(0,0,0,.6)', rim: 'rgba(255,255,255,.14)' },
  blue: { top: '#2E9DFF', bottom: '#0072E5', edge: 'rgba(0,40,110,.25)', rim: 'rgba(255,255,255,.35)' },
}

export function TileLayer({ tone = 'ceramic' }: { tone?: Tone }) {
  const id = useId()
  const t = TILES[tone]
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.top} />
          <stop offset="1" stopColor={t.bottom} />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="98" height="98" rx="25" fill={`url(#${id}t)`} stroke={t.edge} strokeWidth=".6" />
      <rect x="2.2" y="2.2" width="95.6" height="95.6" rx="24" fill="none" stroke={t.rim} strokeWidth=".9" opacity=".9" />
    </svg>
  )
}

export function ChipLayer({ color }: { color: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(color, 0.22)} />
          <stop offset="1" stopColor={shade(color, -0.12)} />
        </linearGradient>
      </defs>
      <g transform={HASH_TRANSFORM}>
        <rect x="43.5" y="43.5" width="13" height="13" rx="2.4" fill={`url(#${id}c)`} />
        <rect x="44.6" y="44.4" width="10.8" height="4.6" rx="1.6" fill="#fff" opacity=".28" />
      </g>
    </svg>
  )
}

export function GlyphLayer({ shadow = true }: { shadow?: boolean }) {
  const id = useId()
  const bars = (fill: string, dy = 0) =>
    BARS.map((b, i) => <rect key={i} x={b.x} y={b.y + dy} width={b.w} height={b.h} rx="3.6" fill={fill} />)
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" overflow="visible">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="19" x2="0" y2="81" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6E6EC" />
        </linearGradient>
        {shadow && (
          <filter id={`${id}s`} x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.4" floodColor="#000" floodOpacity=".2" />
          </filter>
        )}
      </defs>
      <g transform={HASH_TRANSFORM} filter={shadow ? `url(#${id}s)` : undefined}>
        {/* parede lateral (espessura do relevo) */}
        <g>{bars('#BDBDC6', 2.2)}</g>
        {/* face superior */}
        <g>{bars(`url(#${id}g)`)}</g>
      </g>
    </svg>
  )
}

interface HashMarkProps {
  chip?: string
  tone?: Tone
  size?: number | string
  className?: string
  /** Texto acessível. Sem label, o símbolo é decorativo. */
  label?: string
}

/** Símbolo estático (todas as camadas empilhadas). */
export function HashMark({ chip = '#0088FF', tone = 'ceramic', size = 40, className, label }: HashMarkProps) {
  return (
    <span
      className={`hashmark hashmark--${tone} ${className ?? ''}`}
      style={{ width: size, height: size }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <TileLayer tone={tone} />
      <ChipLayer color={chip} />
      <GlyphLayer />
    </span>
  )
}
