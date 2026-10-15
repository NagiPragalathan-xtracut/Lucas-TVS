# Lucas-TVS — marketing site     
    
Implementation of the Figma design   
[`lucas-TVS` → node `190:74`](https://www.figma.com/design/UjQxqsK3d9TNprVmkDoH3g/lucas-TVS?node-id=190-74&m=dev)
(a 1280 × 13787 desktop frame) as a responsive React page.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · Lenis.

Component and style paths follow the shadcn defaults in `components.json`:
UI primitives live in `src/components/ui`, shared helpers in `src/lib`, and the
`@/*` alias maps to `src/` (configured in both the tsconfigs and
`vite.config.ts`). Keeping generated components in `components/ui` is what lets
`npx shadcn@latest add <component>` drop files in without colliding with
hand-written app components, so new registry components land there.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Structure

| Path | What's in it |
| --- | --- |
| `src/App.tsx` | Section order for the page |
| `src/components/*.tsx` | One component per design section |
| `src/components/primitives.tsx` | Button, Eyebrow, ChevronPill, Marquee |
| `src/components/ui/` | shadcn components + the scroll animation |
| `src/index.css` | Design tokens (`@theme`), base styles, `shell` utilities |
| `src/lib/assets.ts` | Named re-exports of every image, keyed to its role |
| `src/lib/utils.ts` | shadcn `cn()` helper |
| `src/lib/useVideoScrub.ts`, `useHasFinePointer.ts` | Hero video-scrub hooks |
| `src/assets/` | Images exported from Figma, plus the hero clip |
| `scripts/optimize-assets.mjs` | Re-run after a fresh Figma export |

Sections, in page order: `SiteHeader`, `Hero`, `WhoWeAre`, `Industries`,
`SolutionShowcase`, `ResearchDevelopment`, `GlobalPresence`, `Awards`,
`WhyChooseUs`, `MarqueeBand`, `Sustainability`, `Careers`, `Insights`,
`SiteFooter`.

## Design tokens

The Figma file defines no variables, so its raw hexes are lifted once into the
`@theme` block in `src/index.css` and referenced by name everywhere else:
`lime` `#b3e718` (primary), `green` `#22c55e`, `ink` `#2b2b2b`,
`body` `#454545`, `line` `#dbdbdb`. Type stacks are `display` (Instrument
Sans), `body` (Poppins), `sans` (Inter), `plex` (IBM Plex Sans) and `mono`
(IBM Plex Mono), all loaded from Google Fonts in `index.html`.

Two page gutters are in use, both matching the Figma frame: `.shell`
(48px, the common case) and `.shell-wide` (12px, for the campus photo, awards
plate and footer, which run nearly edge to edge).

## Layout notes

The Figma frame is fixed-width with every layer absolutely positioned. This is
a responsive rebuild: each section uses normal flow with flex/grid, matches the
design at 1280px, and reflows down to 390px. A few places worth knowing about:

- **Who we are** — the exported photo carries a transparent notch in its
  top-left corner that the intro copy is meant to sit in. At `lg` the copy is
  absolutely placed into that notch; below `lg` it runs in flow and the image
  is cropped from the bottom so the notch never shows.
- **Why choose us** — the feature card's export is a flat mock of the whole
  row with its caption baked in, so Figma's crop percentages are carried over
  verbatim to isolate the first card.
- **Tilted lime band** — Figma has a single static headline overflowing the
  left edge of the plate. It is built here as a repeating marquee, which is
  what that composition reads as and what holds up at other widths.
- **Carousels** — the industries pager, solution tabs and award cards are
  presentational; the tabs track selection state but do not swap content, and
  the pager is not wired to a slider.

## Motion

Scrolling is smoothed by [Lenis](https://lenis.darkroom.engineering), mounted
once as `<ReactLenis root>` in `src/App.tsx`. Remove that wrapper to fall back
to native scrolling — nothing else depends on it.

`src/components/ui/scroll-converge.tsx` adapts the converge effect from
`text-scroll-animation.tsx` for use in normal-height sections. The reference
component drives its animation from a 210vh block; these wrappers instead map
progress to the element entering the viewport. Pair them:

```tsx
<ScrollConvergeGroup as="ul" spread={55} lift={30} className="grid grid-cols-4">
  {items.map((item, i) => (
    <ScrollConvergeItem as="li" key={item.id} index={i}>
      …
    </ScrollConvergeItem>
  ))}
</ScrollConvergeGroup>
```

`spread` is the horizontal px the outermost items start from, `lift` the
vertical. Use `spread={0}` for grids and horizontal scrollers, where a sideways
offset would fight the columns or the scroll width.

Applied to four card groups: industries, R&D capabilities, awards, and the
sustainability metrics. Headings are deliberately left un-animated — splitting
them into per-character `inline-block` spans drops kerning and widens each line
by roughly 1%, enough to re-wrap headings that sit flush against their
container.

Everything is skipped under `prefers-reduced-motion`, and the settled page is
pixel-identical to the build that predates the animation.

### Hero video scrub

The hero backdrop is a pointer-scrubbed clip of a robotic arm, ported from the
standalone reference build at `../TVS Hero section/src/Hero.tsx`. On a fine
pointer (mouse/trackpad), moving left/right scrubs `currentTime` instead of
the video autoplaying; on touch, where there's no hover position to scrub
from, it autoplays muted and loops instead.

- `src/lib/useVideoScrub.ts` — the scrub hook (`useVideoScrub`) and a
  `playWhenReady` helper that starts playback as soon as a video has enough
  data, retrying on `canplay` if the first attempt is rejected for not being
  ready (the common case right after mount).
- `src/lib/useHasFinePointer.ts` — `(hover: hover) and (pointer: fine)`,
  reactive to input-device changes (e.g. a 2-in-1 switching to a stylus).
- `.hero-video` in `src/index.css` — fills its section edge-to-edge at
  every viewport width (`object-fit: cover`), the same trade-off the static
  hero image made before this video replaced it: a wide monitor crops
  top/bottom rather than showing bars. Two earlier attempts kept the video at
  its native 16:9 and filled the leftover space instead — first with a
  blurred, scaled-up copy of the clip (its lighting vignette turned into a
  visible dark band once blown up), then with a flat colour (still a visible
  bar, and on nearly every normal desktop monitor, not just ultra-wide ones).

`prefers-reduced-motion` disables both the scrub and the touch autoplay,
leaving the poster frame (`heroBackdrop`) static — same convention as the
card-converge effect above.


## Assets

`src/assets` holds the images exported from `get_design_context`, downscaled to
roughly twice their largest rendered size and re-encoded to WebP by
`scripts/optimize-assets.mjs` — 42 MB of source PNGs down to 1.7 MB. Filenames
keep their original Figma layer names so a fresh export can be diffed against
them; `src/lib/assets.ts` maps each one to a role-based name.

`design-refs/` holds the original source imagery that predates this build; it
is not referenced by the app.
 
