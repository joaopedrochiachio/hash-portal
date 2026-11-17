import { useEffect } from 'react'
import { HashMark } from '../components/HashMark'
import { Link } from '../components/Link'

export function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada · Hash'
  }, [])
  return (
    <main id="conteudo" className="notfound container">
      <HashMark chip="#8E8E93" size={96} />
      <p className="mono-label">Erro 404</p>
      <h1>Essa página não existe.</h1>
      <Link href="/" className="btn btn--primary">
        Voltar ao início
      </Link>
    </main>
  )
}
