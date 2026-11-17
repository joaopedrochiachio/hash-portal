/**
 * Configuração geral do site. Campos vazios ('') simplesmente não aparecem.
 */

export interface TeamMember {
  name: string
  role: string
  /** Caminho em /public. Sem foto, exibimos o monograma. */
  photo?: string
  links: { label: string; url: string }[]
}

export const site = {
  name: 'Hash',
  tagline: 'Produtos onde a IA faz o trabalho.',
  description:
    'Hash é o hub de produtos digitais com IA criado por João Pedro e Leo. Simples por fora, inteligente por dentro.',

  // TODO: e-mail de contato da Hash
  contactEmail: '',
  // TODO: formulário da lista de espera (Tally, Google Forms...). Vazio = abre um e-mail.
  waitlistUrl: '',

  // TODO: preencher as redes. Links vazios não são exibidos.
  social: [
    { label: 'Instagram', url: '' },
    { label: 'GitHub', url: '' },
    { label: 'LinkedIn', url: '' },
  ],

  team: [
    // TODO: foto (ex.: '/time/joao-pedro.webp'), função e links
    { name: 'João Pedro', role: 'Cofundador', links: [] },
    { name: 'Leo', role: 'Cofundador', links: [] },
  ] satisfies TeamMember[] as TeamMember[],
}

export const waitlistHref = () => {
  if (site.waitlistUrl) return site.waitlistUrl
  const subject = encodeURIComponent('Lista de espera · Hash Videos')
  return `mailto:${site.contactEmail}?subject=${subject}`
}
