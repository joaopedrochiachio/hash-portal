/**
 * Fonte única de conteúdo dos projetos.
 *
 * Para adicionar um projeto novo, basta acrescentar um objeto em `projects`.
 * Nenhum componente precisa ser alterado: a home, os cards e a página
 * /projetos/[slug] são gerados a partir deste arquivo.
 */

export type ProjectStatus = 'ideia' | 'em-construcao' | 'beta' | 'lancado'

/**
 * - `ecossistema`: próximos produtos da Hash (seção Ecossistema)
 * - `referencia`: projetos já feitos (seção Projetos de referência)
 */
export type ProjectKind = 'ecossistema' | 'referencia'

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectImage {
  /** Caminho em /public (ex.: "/projetos/walletai/tela-1.webp") ou URL. */
  src: string
  /** Texto alternativo obrigatório (acessibilidade). */
  alt: string
  width: number
  height: number
}

export interface Project {
  slug: string
  name: string
  /** Rótulo curto em mono, ex.: "#videos". */
  tag: string
  kind: ProjectKind
  status: ProjectStatus
  /** Cor do chip no centro do símbolo #. */
  chip: string
  /** Uma linha, usada nos cards. */
  summary: string
  /** Parágrafos da página do projeto. */
  description: string[]
  /** Pontos rápidos exibidos em lista na página do projeto. */
  highlights?: string[]
  /** Endereço do projeto no ar. Ganha destaque no card e na página. */
  live?: string
  /** Links extras (código, documentação...). */
  links?: ProjectLink[]
  images?: ProjectImage[]
  /** Rodapé do card em mono, ex.: "Base: Vídeos Molinare". */
  footnote?: string
  /** Destaque na seção (apenas um por seção). */
  featured?: boolean
  /** Mostra o botão "Entrar na lista de espera". */
  waitlist?: boolean
}

export const statusLabel: Record<ProjectStatus, string> = {
  ideia: 'Ideia',
  'em-construcao': 'Em construção',
  beta: 'Beta',
  lancado: 'No ar',
}

/** Cores dos chips da família Hash. */
export const chips = {
  hash: '#0088FF',
  videos: '#E8264D',
  life: '#F07A10',
  kit: '#5E5E64',
  wallet: '#21A947',
  devworld: '#B83AD6',
  nasa: '#0088FF',
  vitality: '#F07A10',
  refrinova: '#1597B8',
} as const

export const projects: Project[] = [
  // ─── Ecossistema ────────────────────────────────────────────
  {
    slug: 'hash-videos',
    name: 'Hash Videos',
    tag: '#videos',
    kind: 'ecossistema',
    status: 'em-construcao',
    chip: chips.videos,
    featured: true,
    waitlist: true,
    summary: 'Vídeos de anúncio feitos pela IA a partir de um tema e um contexto.',
    description: [
      'Você descreve o tema e o contexto do anúncio. A IA escreve o roteiro, escolhe as cenas e entrega o vídeo pronto para publicar.',
      'Começamos pelo formato Reels (9:16). Retrato e paisagem chegam em seguida.',
      'A base vem da geração de vídeos que já usamos com a Molinare, agora como produto próprio.',
    ],
    highlights: [
      'Tema + contexto → vídeo pronto',
      'Reels 9:16 primeiro',
      'Retrato e paisagem em seguida',
    ],
    footnote: 'Produto principal',
  },
  {
    slug: 'hash-life',
    name: 'Hash Life',
    tag: '#life',
    kind: 'ecossistema',
    status: 'ideia',
    chip: chips.life,
    summary: 'Um assistente pessoal que cuida da rotina por você.',
    description: [
      'Uma ideia em estudo: um assistente pessoal que organiza tarefas, lembretes e compromissos, com a IA fazendo o trabalho de bastidor.',
    ],
    footnote: 'Em estudo',
  },
  {
    slug: 'hash-kit',
    name: 'Hash Kit',
    tag: '#kit',
    kind: 'ecossistema',
    status: 'ideia',
    chip: chips.kit,
    summary: 'Template open source com a base que usamos nos produtos Hash.',
    description: [
      'O código compartilhado entre os produtos Hash, aberto para quem quiser começar um projeto com a mesma base.',
    ],
    footnote: 'Código compartilhado',
  },

  // ─── Projetos de referência ─────────────────────────────────
  {
    slug: 'walletai',
    name: 'WalletAI',
    tag: '#wallet',
    kind: 'referencia',
    status: 'beta',
    chip: chips.wallet,
    featured: true,
    summary: 'Assistente financeiro com IA.',
    description: [
      'O WalletAI organiza suas finanças com ajuda da IA. Foi dele que nasceu a linguagem visual da Hash: materiais claros, relevo suave e o chip no centro do símbolo.',
    ],
    footnote: 'App com IA',
    live: 'https://wallet-app-neon-ten.vercel.app',
  },
  {
    slug: 'devworld',
    name: 'DevWorld',
    tag: '#devworld',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.devworld,
    // TODO: descrição do DevWorld (texto do Leo)
    summary: 'Portal criado pelo Leo, já no ar.',
    description: ['Portal criado pelo Leo, já no ar. Entre e explore.'],
    footnote: 'Portal',
    live: 'https://devworldbr.vercel.app/explorar',
  },
  {
    slug: 'vitality-ai',
    name: 'Vitality AI',
    tag: '#vitality',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.vitality,
    // TODO: descrição e link do Vitality AI (preencher `live`)
    summary: 'Projeto com IA, já no ar.',
    description: ['Projeto com IA, já no ar. Detalhes em breve.'],
    footnote: 'Produto com IA',
  },
  {
    slug: 'azimuth',
    name: 'Azimuth',
    tag: '#nasa',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.nasa,
    summary: 'Mapa de Marte que mostra ao astronauta a rota mais segura e sempre o caminho de volta.',
    description: [
      'Feito no NASA Space Apps Challenge 2026, para o desafio Interplanetary Survival Guide: Martian Map.',
      'Um mapa em camadas da Cratera Jezero, montado com oito tipos de dados reais da NASA. O astronauta planeja a rota, caminha acompanhando oxigênio e radiação e, se algo der errado, entra no modo Resgate.',
      'A assistente Azimuth responde por texto e voz e continua funcionando mesmo sem conexão com a IA.',
      'Time: Leo, João Pedro e Maria Clara.',
    ],
    highlights: [
      'Marte em 3D interativo',
      'Planejar → Caminhar → Resgate',
      'Assistente com IA, por texto e voz',
      '8 tipos de dados da NASA',
    ],
    footnote: 'NASA Space Apps 2026',
    // TODO: link público do site, se houver (preencher `live`)
    links: [{ label: 'Ver código', url: 'https://github.com/leolvgomes/NSA-2026' }],
  },
  {
    slug: 'refrinova',
    name: 'Refrinova',
    tag: '#refrinova',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.refrinova,
    summary: 'Site institucional de uma empresa de engenharia térmica e refrigeração industrial.',
    description: [
      'Landing page e site institucional da Refrinova: serviços, cases, a empresa e contato direto pelo WhatsApp para pedir orçamento.',
      'Leve, rápido e responsivo, sem etapa de build, com animações de entrada e carrossel de projetos.',
    ],
    highlights: ['Landing page para cliente', 'Orçamento direto pelo WhatsApp', 'Carrossel de cases'],
    footnote: 'Landing page',
    live: 'https://refrinova.ind.br',
  },
]

/**
 * Modelos: os tipos de projeto que a gente entrega, cada um com um exemplo real no ar.
 * `example` aponta para o slug de um projeto acima.
 */
export interface Model {
  name: string
  text: string
  example: string
}

export const models: Model[] = [
  {
    name: 'Landing page',
    text: 'Um site rápido que apresenta a empresa e transforma visita em contato.',
    example: 'refrinova',
  },
  {
    name: 'App com IA',
    text: 'Um assistente que faz o trabalho chato: organiza, calcula e sugere.',
    example: 'walletai',
  },
  {
    name: 'Portal',
    text: 'Várias páginas, conteúdo para explorar e navegação que não se perde.',
    example: 'devworld',
  },
  {
    name: 'Experiência interativa',
    text: 'Dados difíceis viram algo que se usa com as mãos: 3D, mapa e assistente.',
    example: 'azimuth',
  },
]

export const projectsByKind = (kind: ProjectKind) => projects.filter((p) => p.kind === kind)

export const findProject = (slug: string) => projects.find((p) => p.slug === slug)
