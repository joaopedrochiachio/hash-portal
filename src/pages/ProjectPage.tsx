import { findProject, hasPage, projects } from '../content/projects'
import { waitlistHref } from '../content/site'
import { HashMark } from '../components/HashMark'
import { ProjectCard } from '../components/ProjectCard'
import { Arrow, StatusPill } from '../components/ui'
import { Link } from '../components/Link'
import { NotFound } from './NotFound'

export function ProjectPage({ slug }: { slug: string }) {
  const project = findProject(slug)
  if (!project) return <NotFound />

  const related = projects.filter((p) => p.kind === project.kind && p.slug !== project.slug && hasPage(p)).slice(0, 3)
  const cta = project.waitlist ? waitlistHref() : undefined

  return (
    <main id="conteudo" className="project container">
      <Link href={project.kind === 'ecossistema' ? '/#ecossistema' : '/#projetos'} className="back">
        <span className="back__arrow">
          <Arrow />
        </span>
        Voltar
      </Link>

      <header className="project__head">
        <HashMark chip={project.chip} size={112} className="project__mark" label={`Símbolo do ${project.name}`} />
        <div className="project__meta">
          <span className="mono-label">{project.tag}</span>
          <StatusPill status={project.status} />
        </div>
        <h1>{project.name}</h1>
        <p className="project__summary">{project.summary}</p>

        {(project.links?.length || cta) && (
          <div className="hero__ctas">
            {project.links?.map((l, i) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i === 0 ? 'btn--primary' : 'btn--ghost'}`}
              >
                {l.label} <Arrow external />
              </a>
            ))}
            {cta && (
              <a href={cta} className="btn btn--primary">
                Entrar na lista de espera
              </a>
            )}
          </div>
        )}
      </header>

      <section className="project__body card" aria-label="Sobre o projeto">
        <div className="project__text">
          {project.description.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {project.highlights && (
          <ul className="project__highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
      </section>

      {project.images && project.images.length > 0 && (
        <section className="project__gallery" aria-label="Imagens">
          {project.images.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              className="card"
            />
          ))}
        </section>
      )}

      {related.length > 0 && (
        <section className="section section--tight" aria-labelledby="outros">
          <p className="mono-label">Veja também</p>
          <h2 id="outros" className="related__title">
            Outros projetos
          </h2>
          <div className="grid grid--3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
