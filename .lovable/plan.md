# Dentassiste — Refresh estético completo

Vou reconstruir o site `dentassiste-site-completo.jsx` no projeto Lovable, mantendo 100% da funcionalidade (formulário multi-passo, lógica de preços, páginas legais, gate profissional) mas substituindo todo o styling por um design system moderno baseado em Tailwind + tokens semânticos HSL.

## Design system novo

**Paleta (HSL, em `index.css`)**
- `--background`: off-white quente `40 25% 98%`
- `--foreground`: navy profundo `215 45% 12%`
- `--primary` (navy): `215 50% 18%` + foreground claro
- `--accent` (teal sofisticado): `174 65% 38%` + variantes glow / soft
- `--warm` (champanhe/areia, CTAs secundários e badges): `35 55% 75%`
- `--muted`, `--border`, `--destructive` ajustados para o novo navy
- Dark mode coerente (não prioridade, mas tokens preparados)
- Gradientes como tokens: `--gradient-hero` (navy→navy-deep), `--gradient-accent` (teal→teal-dark)
- Sombras como tokens: `--shadow-card`, `--shadow-glow-teal`

**Tipografia**
- `Inter` (UI/body) + `Fraunces` (H1/hero) carregadas via Google Fonts no `index.html`
- Escala: hero 56–72px desktop, títulos secção 36–44px, letter-spacing -0.02em nos grandes
- Remover totalmente o `Georgia, serif` herdado

**Componentes shadcn customizados via variants**
- `Button`: variantes `hero` (teal sólido com glow), `outline-light`, `ghost-nav`
- `Card`: 1px border + `shadow-card`, hover `translateY(-2px)`
- Radius unificado: `--radius: 0.75rem` (12px)

## Componentes a criar

```
src/components/dentassiste/
  Navbar.tsx
  ProfessionalGate.tsx
  Hero.tsx                 ← com imagem gerada (turbina macro, fundo escuro)
  ServicesSection.tsx      ← lucide icons (Settings2, Wrench, Truck, FileText, Search, ShieldCheck, Stethoscope)
  PricingSection.tsx
  BrandsSection.tsx        ← faixa horizontal de "logos" tipográficos com tratamento uniforme
  ContactBar.tsx
  Footer.tsx
  TrustStrip.tsx           ← novo: badges (12 meses garantia · 200+ clínicas · Recolha incluída)
  form/
    FormModal.tsx
    ProgressStepper.tsx    ← stepper visual horizontal com linha de progresso
    InstrumentCard.tsx
    ServiceCard.tsx
    BrandChip.tsx
    Chips.tsx
    PriceSummary.tsx       ← sticky em desktop, sempre visível
    Field.tsx
  legal/
    LegalLayout.tsx
    PrivacidadePage.tsx
    TermosPage.tsx
    AvisoLegalPage.tsx
    CookiesPage.tsx
```

## Melhorias estéticas-chave aplicadas

1. **Zero inline styles** — tudo via classes Tailwind + tokens semânticos
2. **Emojis → ícones lucide-react** monocromáticos teal em todos os cards de serviço, equipamento e contacto
3. **Hero redesenhado**: H1 grande em Fraunces, sub-headline, dois CTAs (primário teal com glow + secundário outline), badges de confiança em linha, imagem gerada de turbina dental (macro, dramática) à direita em desktop
4. **Bordas 1px + ring no estado selected** (em vez de border-shift de 2px que causa layout jump)
5. **Hierarquia de fundos a 3 níveis**: `bg-background` / `bg-muted` / `bg-primary` (secção navy de confiança)
6. **Padding vertical generoso** nas secções (`py-24` desktop, `py-16` mobile)
7. **Faixa de marcas** uniformizada: chips monocromáticos cinza com hover teal subtil
8. **Stepper do formulário** redesenhado: círculos numerados ligados por linha de progresso animada, labels por baixo
9. **PriceSummary sticky** em desktop dentro do modal (lado direito) para o utilizador ver sempre o total enquanto preenche
10. **Microinterações**: fade-in on scroll nas secções (CSS `animate-fade-in` com `IntersectionObserver` ou simples `animation-delay`), hover lift nos cards
11. **ProfessionalGate** com backdrop-blur mais forte, card com gradient header e CTA glow
12. **Footer** com tipografia mais leve, links com hover teal

## Imagens a gerar
- Hero: turbina dental em macro, fundo navy escuro, iluminação dramática lateral, foco em precisão/engenharia (paisagem 16:9)
- Opcional secção serviços: técnico em bancada com equipamento (não essencial — posso decidir só após o hero)

## Estrutura de rotas

```
/                       → site principal (gate + landing + modal de formulário)
/privacidade
/termos
/aviso-legal
/cookies
```

Substituir conteúdo de `src/pages/Index.tsx`, adicionar 4 páginas legais e registá-las em `App.tsx`.

## Detalhes técnicos

- `tailwind.config.ts`: estender `colors` com `accent.teal`, `accent.teal-dark`, `accent.teal-soft`, `warm`, `surface`; adicionar `fontFamily.display` (Fraunces) e `fontFamily.sans` (Inter); keyframes `fade-in`, `fade-in-up`, `glow-pulse`
- `index.css`: tokens HSL, gradientes, sombras, classes utilitárias `.text-balance`, `.animate-fade-in-up`
- Toda a lógica de negócio (`getInstPrice`, `calcTotal`, `newInstrument`, listas `EQUIPMENT_TYPES`, `TURBINE_BRANDS`, etc.) é portada tal-qual para `src/lib/dentassiste-data.ts`
- Estado do `FormModal` mantém-se em `useState` local; sem backend nesta fase (submit faz `setSubmitted(true)` como no original)
- `lucide-react` já está instalado no template

## O que **não** muda
- Lógica de preços e descontos
- Textos legais (RGPD, termos, aviso, cookies)
- Estrutura do formulário multi-passo e validações
- Conteúdo informativo (descrições de serviços, sintomas, marcas)

## Fora de âmbito (para iterar depois)
- Backend / envio real do pedido por email (Lovable Cloud + edge function)
- Dark mode visível ao utilizador
- Logos SVG reais das marcas (KaVo, NSK, etc.) — uso tratamento tipográfico uniformizado por agora
- i18n
