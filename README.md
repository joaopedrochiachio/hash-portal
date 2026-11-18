# Portal Hash (v1)

Site institucional da Hash: o hub de produtos digitais com IA criado por João Pedro e Leo.
Vite + React + TypeScript, estático, mobile first, sem backend.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ (inclui um HTML por projeto com meta tags próprias)
npm run lint
```

## Deploy

- **GitHub Pages** (no ar): cada push na `main` publica em https://joaopedrochiachio.github.io/hash-portal/
  pelo workflow `.github/workflows/pages.yml`. O build usa `BASE_PATH=/hash-portal/`.
- **Vercel** (opcional): funciona sem configuração extra (`vercel.json`), com o site na raiz do domínio.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Projetos (ecossistema e referência) e Modelos | `src/content/projects.ts` |
| Equipe, e-mail, lista de espera, redes | `src/content/site.ts` |
| Cores, tipografia, espaçamentos | `src/styles.css` (tokens no topo) |
| Símbolo # | `src/components/HashMark.tsx` (estático) e `Logo3D.tsx` (3D) |

**Novo projeto** = um objeto novo em `projects.ts`. A home, o card e a página
`/projetos/[slug]` aparecem sozinhos. Preencha `live` com o endereço no ar para ganhar o botão "Visitar". Imagens vão em `public/` e entram no campo `images` (com `alt`).

## Decisões

- **Tipografia:** Inter Variable (eixo óptico vira "Inter Display" em tamanhos grandes) + JetBrains Mono, servidas localmente.
- **3D:** CSS 3D puro (três camadas com profundidade), sem three.js. Carregado sob demanda e desligado com `prefers-reduced-motion`.
- **Azul:** `#0088FF` é o acento da marca. Botões usam `#0071E3` e texto azul usa `#0066CC` para atingir contraste AA.
- **Rotas:** roteador mínimo próprio (History API). O build gera `dist/projetos/[slug]/index.html` para cada projeto e `404.html`.
- **URL do site** (canonical/OG): `SITE_URL` ou, na Vercel, `VERCEL_PROJECT_PRODUCTION_URL`.
- `public/og.png` e os ícones PNG foram gerados a partir de `scripts/og.html` e `public/favicon.svg`.

## Pendências de conteúdo (TODO)

- Descrição do DevWorld (texto do Leo).
- Link e descrição do Vitality AI.
- Link público do Azimuth (NASA Space Apps), se houver.
- Fotos, funções e links de João Pedro e Leo.
- E-mail de contato, link da lista de espera e redes sociais.
