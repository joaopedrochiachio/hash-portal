import { hasPage, type Project } from '../content/projects'
import { Link } from './Link'
import { HashMark } from './HashMark'
import { Arrow, StatusPill } from './ui'

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const linked = hasPage(project)
  const body = (
    <>
      <div className="pcard__top">
        <HashMark chip={project.chip} size={56} className="pcard__mark" />
        <StatusPill status={project.status} />
      </div>
      {index !== undefined && <p className="mono-num">{String(index + 1).padStart(2, '0')}</p>}
      <h3 className="pcard__title">{project.name}</h3>
      <p className="pcard__summary">{project.summary}</p>
      <div className="pcard__foot">
        <span className="mono-label">{project.footnote ?? project.tag}</span>
        {linked && (
          <span className="pcard__go" aria-hidden="true">
            <Arrow />
          </span>
        )}
      </div>
    </>
  )

  return linked ? (
    <Link href={`/projetos/${project.slug}`} className="card pcard pcard--link" data-reveal>
      {body}
    </Link>
  ) : (
    <article className="card pcard pcard--lab" data-reveal>
      {body}
    </article>
  )
}
