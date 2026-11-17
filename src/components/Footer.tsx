import { site } from '../content/site'
import { Link } from './Link'
import { HashMark } from './HashMark'

const YEAR = new Date().getFullYear()

export function Footer() {
  const social = site.social.filter((s) => s.url)
  return (
    <footer className="footer">
      <div className="container">
        <section className="closing card card--titanium" aria-labelledby="closing-title" data-reveal>
          <h2 id="closing-title" className="closing__title">
            Produtos onde
            <br />
            <span className="muted-dark">a IA faz o trabalho.</span>
          </h2>
          <HashMark tone="titanium" size={72} className="closing__mark" />
        </section>

        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="nav__brand" aria-label="Hash, página inicial">
              <HashMark size={30} />
              <span>hash</span>
            </Link>
            <p>Simples por fora. Inteligente por dentro.</p>
          </div>

          <div>
            <p className="mono-label">Contato</p>
            <ul className="footer__list">
              {site.contactEmail ? (
                <li>
                  <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                </li>
              ) : (
                <li>
                  <Link href="/#ecossistema">Lista de espera do Hash Videos</Link>
                </li>
              )}
            </ul>
          </div>

          {social.length > 0 && (
            <div>
              <p className="mono-label">Redes</p>
              <ul className="footer__list">
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="footer__legal">
          <span className="mono-label">© {YEAR} Hash</span>
          <span className="mono-label">Feito por João Pedro &amp; Leo</span>
        </div>
      </div>
    </footer>
  )
}
