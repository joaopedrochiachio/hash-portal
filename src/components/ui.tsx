import type { ReactNode } from 'react'
import { statusLabel, type ProjectStatus } from '../content/projects'

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span className={`status status--${status}`}>
      <span className="status__dot" aria-hidden="true" />
      {statusLabel[status]}
    </span>
  )
}

interface SectionHeaderProps {
  index: string
  label: string
  title: ReactNode
  aside?: ReactNode
  id?: string
}

export function SectionHeader({ index, label, title, aside, id }: SectionHeaderProps) {
  return (
    <header className="section-head" data-reveal>
      <div>
        <p className="mono-label">
          <span className="mono-label__index">{index}</span> · {label}
        </p>
        <h2 id={id}>{title}</h2>
      </div>
      {aside && <p className="section-head__aside">{aside}</p>}
    </header>
  )
}

export function Arrow({ external = false }: { external?: boolean }) {
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      {external ? (
        <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}
