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
 * - `lab`: experimentos (seção Lab)
 */
export type ProjectKind = 'ecossistema' | 'referencia' | 'lab'

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
  links?: ProjectLink[]
  images?: ProjectImage[]
  /** Rodapé do card em mono, ex.: "Base: Vídeos Molinare". */
  footnote?: string
  /** Destaque na seção (apenas um por seção). */
  featured?: boolean
  /** Mostra o botão "Entrar na lista de espera". */
  waitlist?: boolean
  /** Cria a página /projetos/[slug]. Padrão: true, exceto no Lab. */
  hasPage?: boolean
}

export const statusLabel: Record<ProjectStatus, string> = {
  ideia: 'Ideia',
  'em-construcao': 'Em construção',
  beta: 'Beta',
  lancado: 'Lançado',
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
  lab: '#8E8E93',
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
    links: [{ label: 'Abrir WalletAI', url: 'https://wallet-app-neon-ten.vercel.app' }],
  },
  {
    slug: 'devworld',
    name: 'DevWorld',
    tag: '#devworld',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.devworld,
    // TODO: descrição do DevWorld
    summary: 'Detalhes do projeto em breve.',
    description: ['Detalhes do projeto em breve.'],
  },
  {
    slug: 'vitality-ai',
    name: 'Vitality AI',
    tag: '#vitality',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.vitality,
    // TODO: descrição do Vitality AI
    summary: 'Detalhes do projeto em breve.',
    description: ['Detalhes do projeto em breve.'],
  },
  {
    slug: 'nasa-space-apps',
    name: 'NASA Space Apps',
    tag: '#hackathon',
    kind: 'referencia',
    status: 'lancado',
    chip: chips.nasa,
    // TODO: descrição do projeto do hackathon
    summary: 'Projeto feito no hackathon NASA Space Apps.',
    description: ['Projeto desenvolvido durante o hackathon NASA Space Apps. Detalhes em breve.'],
  },

  // ─── Lab (placeholders) ─────────────────────────────────────
  {
    slug: 'experimento-01',
    name: 'Experimento 01',
    tag: '#lab',
    kind: 'lab',
    status: 'ideia',
    chip: chips.lab,
    summary: 'Um protótipo novo está a caminho.',
    description: [],
  },
  {
    slug: 'experimento-02',
    name: 'Experimento 02',
    tag: '#lab',
    kind: 'lab',
    status: 'ideia',
    chip: chips.lab,
    summary: 'Um protótipo novo está a caminho.',
    description: [],
  },
  {
    slug: 'experimento-03',
    name: 'Experimento 03',
    tag: '#lab',
    kind: 'lab',
    status: 'ideia',
    chip: chips.lab,
    summary: 'Um protótipo novo está a caminho.',
    description: [],
  },
]

export const hasPage = (p: Project) => p.hasPage ?? p.kind !== 'lab'

export const projectsByKind = (kind: ProjectKind) => projects.filter((p) => p.kind === kind)

export const findProject = (slug: string) => projects.find((p) => p.slug === slug && hasPage(p))
