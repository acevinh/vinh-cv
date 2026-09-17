# vinh-cv

Personal CV landing page — **[vinhvan.netlify.app](https://vinhvan.netlify.app)**

React 18 + TypeScript + Vite. No UI framework, no animation library, no PDF library, no analytics,
no cookies. The whole page is hand-built against a written design contract.

## Design

The direction is **Midnight Aurora**: a single dark pane of glass held up against a slow aurora.
The full spec lives in [DESIGN.md](DESIGN.md) and is binding — tokens, the glass recipe, the motion
language, the performance budget and the accessibility floor.

Four decisions do most of the work:

| | |
| --- | --- |
| **Film grain over everything** | A fixed `feTurbulence` overlay at 3.5% opacity. This is the single detail that stops a glass-and-gradient page reading as generated. |
| **One accent colour, four uses** | `--accent` appears on the primary CTA, the "now" dot on the timeline, focus rings, and the copy-confirmation. Anywhere else is a bug. |
| **Asymmetric layout** | Never three equal cards in a row. Skill groups have uneven counts and are laid out that way on purpose. |
| **Real optical glass edges** | A specular top rim plus an inner bottom shadow, not `background: rgba(255,255,255,.1)`. |

## Notable implementation details

**The aurora is CSS only.** Four blurred radial-gradient blobs animating `transform` on 44–72s
staggered cycles. No canvas, no `requestAnimationFrame`, no WebGL — it costs ~0% CPU when idle and
freezes under `prefers-reduced-motion` while staying visible.

**"Download PDF" is `window.print()`.** [print.css](src/styles/print.css) turns the site into a
clean two-page A4 CV: glass flattened, aurora and chrome hidden, case studies force-expanded
regardless of UI state, links rendered as `text (url)`, and `break-inside: avoid` on every timeline
node. The output has selectable text and weighs nothing, which no JavaScript PDF library manages.

**Copy lives in one typed module.** [src/content.ts](src/content.ts) holds every string in English
and Vietnamese as `{ en, vi }` pairs. Components read through `t(value, lang)`; none of them
contain user-facing text. The language switch is a state change, not a route.

**Every `localStorage` access is wrapped.** Theme and language preferences persist, but the page
renders correctly in a private window, with site data blocked, or wherever the accessor throws.

**Only `transform` and `opacity` are animated** — with one exception, the
`grid-template-rows: 0fr → 1fr` technique used to expand case studies, which is the one height
animation that does not trigger layout.

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # -> dist/
pnpm typecheck
pnpm lint
```

## Structure

```
src/
  content.ts          every string, EN + VI, typed
  App.tsx             composition root
  components/         one .tsx + one .css per section
  hooks/              theme · lang · reveal · specular · copy · persistent state
  styles/
    tokens.css        colour, type, space, radius, motion — dark and light
    base.css          reset, layout, the glass recipe, grain, shared primitives
    print.css         the A4 résumé
DESIGN.md             the binding design contract
CONTENT.md            the source of truth the content module was written from
```

## Deployment

Netlify, building from `main`. Config and security headers in [netlify.toml](netlify.toml).
