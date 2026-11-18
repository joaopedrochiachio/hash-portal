import { lazy, Suspense } from 'react'
import { findProject, models, projectsByKind, type Project } from '../content/projects'
import { site, waitlistHref, type TeamMember } from '../content/site'
import { HashMark } from '../components/HashMark'
import { ModelCard, ProjectCard } from '../components/ProjectCard'
import { Arrow, SectionHeader, StatusPill } from '../components/ui'
import { Link } from '../components/Link'

const Logo3D = lazy(() => import('../components/Logo3D'))

export function Home() {
  const eco = projectsByKind('ecossistema')
  const featured = eco.find((p) => p.featured) ?? eco[0]
  const others = eco.filter((p) => p !== featured)

  return (
    <main id="conteudo">
      <Hero />

      <section className="section container" aria-labelledby="quem-somos">
        <SectionHeader
          id="quem-somos"
          index="01"
          label="Quem somos"
          title="Simples por fora. Inteligente por dentro."
          aside="Frases curtas e nenhum jargão. A tecnologia aparece no resultado, não no discurso."
        />
        <p className="manifesto" data-reveal>
          A Hash é onde a gente junta tudo o que constrói. Cada produto resolve uma dor real de alguém,{' '}
          <span className="muted">com a IA fazendo o trabalho pesado e a pessoa no controle da decisão.</span>
        </p>

        <div className="grid grid--3 values">
          <Value title="Simples." text="Se precisa explicar demais, ainda não está pronto." />
          <Value title="Útil." text="Cada recurso resolve uma dor real de alguém." />
          <Value title="Com IA." text="A IA faz o trabalho pesado. A pessoa decide." />
        </div>

        <div className="grid grid--2 team">
          {site.team.map((m) => (
            <Member key={m.name} member={m} />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="ecossistema">
        <SectionHeader
          id="ecossistema"
          index="02"
          label="Ecossistema"
          title="O que vem por aí"
          aside="Um símbolo, vários produtos. Todos usam o mesmo # em cerâmica; só a cor do chip muda."
        />
        {featured && <Featured project={featured} />}
        <div className="grid grid--2">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="projetos">
        <SectionHeader
          id="projetos"
          index="03"
          label="Projetos de referência"
          title="O que já está no ar"
          aside="Projetos que a gente construiu e que você pode abrir agora. Toque em Visitar para ir direto ao site."
        />
        <div className="grid grid--2 grid--lg-3">
          {projectsByKind('referencia').map((p) => (
            <ProjectCard key={p.slug} project={p} wide={p.featured} />
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="modelos">
        <SectionHeader
          id="modelos"
          index="04"
          label="Modelos"
          title="O que a gente sabe fazer"
          aside="Cada modelo tem um exemplo real, feito por nós e já no ar."
        />
        <div className="grid grid--2">
          {models.map((m) => {
            const example = findProject(m.example)
            return example ? <ModelCard key={m.name} name={m.name} text={m.text} example={example} /> : null
          })}
        </div>
      </section>
    </main>
  )
}

function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="mono-label mono-label--live">
          <span className="live-dot" aria-hidden="true" /> Hub de produtos com IA
        </p>
        <h1 id="hero-title">
          Produtos onde
          <br />
          <span className="muted">a IA faz o trabalho.</span>
        </h1>
        <p className="hero__lede">
          A Hash é o ecossistema de produtos digitais criado por João Pedro e Leo. Simples por fora, inteligente por
          dentro.
        </p>
        <div className="hero__ctas">
          <Link href="/#projetos" className="btn btn--primary">
            Ver projetos
          </Link>
          <Link href="/#ecossistema" className="btn btn--ghost">
            Conhecer o ecossistema
          </Link>
        </div>
      </div>
      <div className="hero__visual">
        <Suspense
          fallback={
            <div className="logo3d logo3d--static">
              <HashMark size="100%" label="Símbolo da Hash" />
            </div>
          }
        >
          <Logo3D />
        </Suspense>
        <p className="hero__caption mono-label">hash · hub</p>
      </div>
    </section>
  )
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <article className="card value" data-reveal>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function Member({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
  return (
    <article className="card member" data-reveal>
      {member.photo ? (
        <img className="member__photo" src={member.photo} alt={`Foto de ${member.name}`} width="72" height="72" loading="lazy" />
      ) : (
        <span className="member__photo member__photo--mono" aria-hidden="true">
          {initials}
        </span>
      )}
      <div>
        <h3>{member.name}</h3>
        <p className="mono-label">{member.role}</p>
        {member.links.length > 0 && (
          <ul className="member__links">
            {member.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

function Featured({ project }: { project: Project }) {
  return (
    <article className="card card--titanium featured" data-reveal aria-labelledby="featured-title">
      <div className="featured__copy">
        <div className="featured__meta">
          <p className="mono-label mono-label--on-dark">01 · {project.footnote ?? 'Destaque'}</p>
          <StatusPill status={project.status} />
        </div>
        <h3 id="featured-title" className="featured__title">
          {project.name}
        </h3>
        <p className="featured__summary">{project.summary}</p>
        {project.highlights && (
          <ul className="featured__list">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        <div className="featured__ctas">
          <a className="btn btn--primary" href={waitlistHref()}>
            Entrar na lista de espera
          </a>
          <Link href={`/projetos/${project.slug}`} className="btn btn--ghost-dark">
            Saiba mais <Arrow />
          </Link>
        </div>
      </div>

      <div className="featured__visual" aria-hidden="true">
        <div className="reel">
          <div className="reel__glow" style={{ background: project.chip }} />
          <HashMark chip={project.chip} size={88} className="reel__mark" />
          <div className="reel__bars">
            <span />
            <span />
            <span />
          </div>
          <span className="reel__ratio mono-label">9:16 · Reels</span>
        </div>
      </div>
    </article>
  )
}
