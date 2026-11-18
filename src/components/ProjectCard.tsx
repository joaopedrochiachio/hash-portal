import type { Project } from '../content/projects'
import { Link } from './Link'
import { HashMark } from './HashMark'
import { Arrow, StatusPill } from './ui'

/**
 * O card inteiro leva à página do projeto (link "esticado" no título).
 * Quando o projeto está no ar, um botão próprio leva direto ao site.
 */
export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <article className={`card pcard ${wide ? 'pcard--wide' : ''}`} data-reveal>
      <div className="pcard__top">
        <HashMark chip={project.chip} size={56} className="pcard__mark" />
        <StatusPill status={project.status} />
      </div>
      <h3 className="pcard__title">
        <Link href={`/projetos/${project.slug}`} className="pcard__link">
          {project.name}
        </Link>
      </h3>
      <p className="pcard__summary">{project.summary}</p>
      <div className="pcard__foot">
        <span className="mono-label">{project.footnote ?? project.tag}</span>
        <div className="pcard__actions">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="pcard__live"
              aria-label={`Visitar ${project.name} (abre em nova aba)`}
            >
              Visitar <Arrow external />
            </a>
          )}
          <span className="pcard__go" aria-hidden="true">
            <Arrow />
          </span>
        </div>
      </div>
    </article>
  )
}

/** Card de modelo: um tipo de entrega com o exemplo real no ar. */
export function ModelCard({ name, text, example }: { name: string; text: string; example: Project }) {
  const href = example.live ?? example.links?.[0]?.url
  return (
    <article className="card model" data-reveal>
      <p className="mono-label">Modelo</p>
      <h3 className="model__title">{name}</h3>
      <p className="model__text">{text}</p>
      <div className="model__example">
        <HashMark chip={example.chip} size={36} />
        <div className="model__example-name">
          <span className="mono-label">Exemplo</span>
          <Link href={`/projetos/${example.slug}`}>{example.name}</Link>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="pcard__live"
            aria-label={`Abrir ${example.name} (abre em nova aba)`}
          >
            {example.live ? 'Ver no ar' : (example.links?.[0]?.label ?? 'Ver')} <Arrow external />
          </a>
        )}
      </div>
    </article>
  )
}
