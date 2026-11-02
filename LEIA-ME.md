# Fênix 3D — Catálogo

Site de catálogo com carrinho de orçamento que envia o pedido pronto para o WhatsApp (61) 9 9248-6925.

## Rodar no seu computador
```bash
npm install
npm run dev        # abre em http://localhost:3000
```

## Publicar na Vercel
```bash
npm i -g vercel
vercel --prod      # responda "fenix3d" como nome do projeto
```
Depois, em Vercel → Settings → Environment Variables, crie
`NEXT_PUBLIC_SITE_URL` com o endereço final (ex.: https://fenix3d.vercel.app) e publique de novo.

## Onde editar
- **Todos os textos, WhatsApp, Instagram e a lista de peças:** `data/content.json`
- **Fotos das peças:** `public/produtos/<slug>.webp` (mesmo nome do `slug` no content.json)
- **Adicionar uma peça:** coloque a foto em `public/produtos/` e copie um bloco em `products`
  trocando `slug`, `name`, `category`, `description`, `image`, `width`, `height`.
  Use `"featured": true` para ela aparecer nos Destaques e no anel 3D do topo.
- **Categorias:** herois, geek, fantasia, animais, articulados, decoracao, esculturas, gamer.
- **Cores e tamanhos oferecidos:** `product.colors` e `product.sizes` no content.json.
