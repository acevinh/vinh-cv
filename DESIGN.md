# Midnight Aurora — design contract

Binding spec for every contributor. If something is not in here, ask; do not invent a second
system. The goal is a page that looks **art-directed**, not generated: one light source, one accent
colour, one motion idea, and a lot of restraint.

## 0. The concept in one line

A single dark pane of glass held up against a slow aurora. The aurora moves. Almost nothing else does.

The failure mode to avoid: "purple-blue gradient + rounded card + glow" — the default look of every
AI-generated landing page. We beat it with four specific things:
1. **Film grain** over everything (kills the plastic gradient look — this matters most).
2. **One** accent colour, used in at most four places on the whole page.
3. Asymmetric layout — never three equal cards in a row.
4. Real optical glass edges (specular top rim + inner shadow), not `background: rgba(255,255,255,.1)`.

---

## 1. Colour tokens

Declare on `:root`. Dark is the default; light overrides under `:root[data-theme="light"]`.

### Dark (default)
```
--bg-void        #05070E     page background, behind the aurora
--bg-deep        #0A0E1A     section wash
--aurora-1       #2A2C96     brand violet-blue   (blob A)
--aurora-2       #0F7A80     mint-teal           (blob B)
--aurora-3       #4A2FB0     brand violet        (blob C, the dominant)
--aurora-4       #13806F     mint                (blob D, smallest)

--glass-fill-hi  rgba(255,255,255,0.055)   light direction only, NOT the fill
--glass-fill-lo  rgba(255,255,255,0.012)
--glass-scrim    rgba(5,7,14,0.44)         the contrast lever — see §4
--glass-rim      rgba(255,255,255,0.30)    specular top edge
--glass-rim-lo   rgba(255,255,255,0.06)    bottom inner edge
--glass-hair     rgba(255,255,255,0.12)    1px hairline border
--glass-blur     10px                      frost; 28px erased the backdrop
--glass-sat      1.9                       so a pane carries hue, not grey

--text-1         #E9EBF2     headings, primary
--text-2         #A8B0C2     body, secondary — also small copy ON glass
--text-3         #99A0B2     captions, tertiary — see "the contrast bar" below
--nav-ink        #C9CFDD     nav controls ONLY — they read against the pill
--accent         #71E8D8     THE accent — the product logo's own mint
--accent-ink     #062320     text on accent (11.3:1)

--aurora-veil    0.26        page colour washed back over the blobs
```

### The contrast bar is the composited backdrop, not the token background

This was got wrong once and is worth stating plainly. `--text-3` is not decoration: it carries every
timeline date, the hero eyebrow, the fact labels and the section indices, all at 13px, so it has to
clear WCAG AA as body text. The first pass tuned it against `--bg-void` — but nobody reads against
`--bg-void`. The aurora sits behind the text and lifts the local backdrop to as much as
`rgb(185,195,218)` in light and `rgb(6,76,96)` in dark. Measured against those real pixels, tokens
that "passed" were sitting at 3.0–3.5:1, and 51 text runs across the page were under AA.

Two things fix it together, and neither is sufficient alone:
1. **`--aurora-veil`** — a static layer of the page colour over the blobs, which compresses the
   backdrop range while keeping the hue. It helps both themes, because in each one the text and the
   drift run in opposite directions.
2. **Tokens tuned against the veiled composite**, with headroom above 4.5:1 — the blobs drift on
   44–72s cycles, so a value that only just passes at one instant fails at another.

When you change a colour token or the aurora's strength, re-measure by sampling rendered pixels
behind real text at several scroll depths. A full-page screenshot will not do it: `position: fixed`
layers are painted once at the top of such a capture, so the aurora silently under-reports.

### Light (`:root[data-theme="light"]`)
```
--bg-void        #EFF1F6
--bg-deep        #F6F7FA
--aurora-*       same hues; blob opacity 0.38, veil 0.26
--glass-fill-hi  rgba(255,255,255,0.34)
--glass-fill-lo  rgba(255,255,255,0.12)
--glass-scrim    rgba(249,250,252,0.50)    same lever, opposite polarity
--glass-rim      rgba(255,255,255,0.95)
--glass-hair     rgba(9,14,28,0.14)
--glass-sat      1.45
--text-1         #0D1220
--text-2         #3A4356
--text-3         #434957
--nav-ink        #454E61
--accent         #0F7A6E     the same mint, taken down until white clears AA
--accent-ink     #FFFFFF     white on it = 5.2:1; measured, not assumed
```

**Light mode is not "dark mode with the colours flipped".** The first pass ran the aurora at 0.18
behind glass filled at 0.78 white, and the concept simply did not survive: the aurora was invisible
and the cards were white boxes on a white page. Both halves had to move at once — the aurora needs
enough strength to read, *and* the glass has to be thin enough to actually modulate what is behind
it, which is the entire point of the material. If you dim one, dim the other.

### The accent budget — hard rule
`--accent` is the product logo's mint, and appears in **at most four** places on the page:
1. The primary CTA (Contact).
2. The "now" dot on the experience timeline.
3. Focus rings (`:focus-visible`).
4. The success state of a copy button.

Anywhere else, it is a bug. Headings are never green. Borders are never green.

---

## 2. Type

Google Fonts, loaded with `display=swap` and preconnect. Three faces, each with a job:

| Role | Face | Weights | Where |
| --- | --- | --- | --- |
| Display | **Manrope** | 800, 700 | Hero name, section headings |
| Body / UI | **Inter** | 400, 500, 600 | Paragraphs, labels, buttons |
| Mono | **JetBrains Mono** | 500 | Dates, tech chips, metrics, file paths |

The mono is what gives the page a developer identity — use it for every date and every tech name.

### Scale (fluid)
```
--fs-display  clamp(2.75rem, 7vw, 5.5rem)   w800  tracking -0.035em  lh 0.95
--fs-h2       clamp(1.75rem, 3.6vw, 2.75rem) w700 tracking -0.02em   lh 1.1
--fs-h3       1.25rem                        w700 tracking -0.01em   lh 1.3
--fs-body     1.0625rem                      w400 lh 1.65
--fs-small    0.875rem                       w400 lh 1.55
--fs-mono     0.8125rem                      w500 tracking 0.02em
```
Max measure for body copy: **68ch**. Never full-bleed paragraphs.

---

## 3. Space, radius, elevation

```
--s-1 4   --s-2 8   --s-3 12  --s-4 16  --s-5 24
--s-6 32  --s-7 48  --s-8 64  --s-9 96  --s-10 128

--r-sm 10px  --r-md 16px  --r-lg 24px  --r-xl 32px  --r-pill 999px
```
Section vertical rhythm: `--s-10` desktop, `--s-8` mobile. Page gutter: 24px mobile, 5vw desktop,
content max-width 1120px.

---

## 4. The glass recipe — use this exact one

```css
.glass {
  position: relative;
  border-radius: var(--r-lg);
  background:
    linear-gradient(160deg,                  /* light direction only */
      var(--glass-fill-hi) 0%,
      var(--glass-fill-lo) 42%,
      var(--glass-fill-lo) 100%),
    var(--glass-scrim);                      /* the contrast lever */
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat));
  border: 1px solid var(--glass-hair);
  box-shadow:
    inset 0 1px 0 0 var(--glass-rim),        /* specular top edge — do NOT omit */
    inset 0 -1px 0 0 var(--glass-rim-lo),
    inset 0 -14px 20px -18px var(--glass-rim), /* floor bounce — the thickness */
    var(--glass-shadow);
}
```

### Why this is not the original recipe (rewritten 2026-09-17)

The first version was `rgba(255,255,255,0.10)` over `blur(28px)`, and both halves were measurably
wrong. Keep this reasoning — it is the difference between glass and a grey box:

1. **28px of frost does not soften a backdrop, it erases it.** Everything behind every pane
   collapsed to one flat wash, so the material had nothing left to modulate and the page read as
   lifeless. `blur` is now **10px**. Note for anyone adding real refraction later: past roughly 10px
   the frost destroys the displacement too, so this ceiling is not arbitrary.
2. **A white fill can only push a backdrop toward white.** On a dark page that is the wrong
   direction, so the recipe had *no lever for contrast at all* — measured, it sat at 1.88:1 whatever
   you did to it. The only remaining lever was `--aurora-veil`, applied to the **whole page**, which
   is why the aurora had to be dimmed everywhere just to keep text on panes legible. That is the
   real reason the page looked washed out.
3. `--glass-scrim` fixes it: a flat wash of the page colour, **per pane**, whose polarity follows
   the *text* rather than the theme's mood — dark in dark, light in light. Each pane now buys its
   own contrast, so the veil dropped 0.40 → 0.26 and the aurora is saturated everywhere a pane is
   not.

**Measured, software rasterisation, 8 panes:** the old `blur(28px)` recipe ran at 55fps; a real
displacement-refraction material at `blur(4px)` runs at 59fps. Frost is the expensive part, not the
optics. Full-page SVG refraction was evaluated and **deliberately not shipped** — on this page's
soft, low-frequency aurora the bend is real but invisible (it needs hard edges behind it to read),
and it costs ~150 lines of canvas-map JS plus a Safari UA probe on a page with two dependencies.
The lab that proves this lives outside the repo; re-derive it before reversing the decision.

Two required refinements:

**a) Pointer specular.** On hover, a soft highlight follows the cursor. Update two CSS custom
properties from a `pointermove` listener that is throttled through `requestAnimationFrame`:
```css
.glass::after {
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background: radial-gradient(420px circle at var(--mx,50%) var(--my,50%),
              rgba(255,255,255,0.09), transparent 42%);
  opacity:0; transition: opacity 240ms var(--ease);
}
.glass:hover::after { opacity:1; }
```
Never write to `style.left/top` — only custom properties, and only inside rAF.

**b) Grain.** One fixed full-viewport overlay, `pointer-events:none`, `z-index:1`, opacity `0.035`
dark / `0.022` light, using an inline SVG `feTurbulence` data-URI as a repeating background. This is
the single highest-value detail on the page. Do not skip it.

---

## 5. The aurora engine — CSS only, no canvas

Four absolutely-positioned divs inside a `position:fixed; inset:0; z-index:0` container.
Each is a radial-gradient blob, `opacity` 0.5–0.7, sized 45–70vmax.

**No `filter: blur()`.** The first build used `blur(90px)`, which is free on a GPU and ruinous
without one: measured 134 ms mean frame / 277 ms worst / ~7 fps under software rendering, while
disabling only that filter restored a locked 60 fps. `backdrop-filter` and the grain both measured
free, so the blur was the entire scroll cost. Softness now comes from six-stop radial gradients
(92% → 66% → 38% → 16% → 5% → transparent), which look near-identical, cost nothing to composite,
and leave real darkness between blobs instead of one undifferentiated wash.

Animate **only** `transform: translate3d(...) scale(...)` and nothing else. Durations 44s–72s,
`ease-in-out`, `infinite alternate`, staggered negative `animation-delay` so they never sync.
Set `will-change: transform` on the blobs and nothing else on the page.

Non-negotiable:
- No `requestAnimationFrame` loop, no canvas, no WebGL. This must cost ~0% CPU when idle.
- Never animate `filter`, `opacity`, `width`, `top`, or `background-position`.
- Under `@media (prefers-reduced-motion: reduce)` the blobs freeze (`animation: none`) but stay
  visible — the page still looks designed, it just stops moving.

---

## 6. Motion language — "settle"

One curve for everything: `--ease: cubic-bezier(0.22, 1, 0.36, 1)`.

| Kind | Duration |
| --- | --- |
| Micro (hover, press, toggle knob) | 180–240ms |
| Entrance (card, chip) | 420ms |
| Section reveal on scroll | 640ms, 60ms stagger between children |
| Theme crossfade | 600ms |

Rules: nothing bounces, nothing spins, nothing slides more than 16px on entrance. Reveal = opacity
0→1 plus `translateY(16px)→0`, fired by `IntersectionObserver` with `rootMargin: "0px 0px -12% 0px"`,
unobserved after firing. Under reduced-motion, everything is simply visible at rest.

---

## 7. Sections, in order

1. **Hero** — name (display), role line, one-sentence positioning, three actions
   (Contact = accent, Résumé PDF = glass, GitHub = glass), a quiet scroll hint.
   Asymmetric: text block sits left of centre; never centre everything.
2. **About** — one short paragraph (≤68ch) plus a small facts grid (based in, working since,
   languages, open to).
3. **Experience** — vertical timeline, four nodes, newest first. The current node carries the only
   green dot on the page, breathing on a 3s cycle. Dates in mono.
4. **Skills** — grouped: Backend · Frontend · Data & Infra · AI & Tooling. Mono chips.
   Group sizes deliberately uneven.
5. **Projects** — case-study cards that expand in place: Problem → Approach → Result. Two cards,
   different widths. Subtle 3D tilt on pointer, max 6°.
6. **Working with AI** — a distinct section. This is a differentiator, not a skill chip.
7. **Certifications** — verifiable credentials with outbound links.
8. **Contact** — copy-to-clipboard email, GitHub link. No form, no backend.
9. **Footer** — minimal.

---

## 8. Controls (all client-side, no backend)

| Control | Behaviour |
| --- | --- |
| Theme toggle | iOS-style pill knob. Writes `data-theme` on `<html>`, persists to `localStorage` **inside try/catch**, defaults to `prefers-color-scheme`. |
| EN / VI switch | Swaps every string from one dictionary object. Sets `<html lang>`. Persists, also in try/catch. |
| Copy email | Clipboard API with a `document.execCommand` fallback. The button itself is the confirmation: it morphs to a check and its label swaps for 1.6s. No separate floating toast — a toast next to a button that has already changed is redundant, and it would be the only transient overlay on the page. Sighted confirmation therefore rides on the button; screen-reader confirmation rides on a `role="status" aria-live="polite"` region that is rendered empty from first paint (a live region injected together with its content is often not announced). |
| Résumé PDF | `window.print()` against a dedicated print stylesheet. No PDF library. |

---

## 9. Print stylesheet — a real deliverable, not an afterthought

`@media print` must produce a clean two-page A4 CV:
- Aurora, grain, glass, shadows, nav, toggles, scroll hints: `display:none`.
- Pure black on white, backgrounds off, `print-color-adjust: exact` only where truly needed.
- All project/case-study content force-expanded regardless of UI state.
- Links rendered as `text (url)` via `a[href]::after`.
- `page-break-inside: avoid` on every timeline node and project card.

Judge it by printing to PDF and reading it — if it looks like a screenshot of a website, it is wrong.

---

## 10. Performance budget — enforced in test

| Metric | Budget |
| --- | --- |
| JS, gzipped | < 90 KB |
| CSS, gzipped | < 24 KB |
| Largest Contentful Paint (throttled) | < 1.5 s |
| Cumulative Layout Shift | < 0.02 |
| Idle CPU after load | ~0 % |
| Animation | 60 fps, no long task > 50 ms during scroll |

No web font blocks first paint. No layout-triggering property is ever animated. Images are sized in
the markup so nothing shifts.

---

## 11. Accessibility floor

Contrast AA for all text in both themes. Every control reachable by keyboard with a visible
`:focus-visible` ring in `--accent`. Toggles are real `<button>` elements with `aria-pressed`.

**JavaScript.** This is a client-rendered React page, so the interactive version needs scripting.
Prerendering was considered and rejected: theme and language are restored from `localStorage`
during the first render, so a prerendered tree and the client tree disagree, and resolving that
either reintroduces a flash of the wrong language or adds a build layer worth more than the
benefit. Link-preview bots read the meta tags, which are static, and search crawlers execute JS.
What remains — scripting disabled, a text-mode browser, a crawler that does not run JS — is covered
by a `<noscript>` block in `index.html` carrying the CV as plain semantic markup: name, role, the
full experience timeline, education, skills, projects, certifications and contact. Keep that block
in step with `content.ts` when the CV changes.
