/**
 * Post-build: give every known route its own HTML file with its own head.
 *
 * The site is a client-rendered SPA, so the built dist/index.html carries
 * one generic <title> and description — which is all that crawlers and
 * link-preview bots (LinkedIn, Slack, WhatsApp…) ever see, since most of
 * them don't run JS. This script fixes that without SSR: for each route
 * in src/lib/seo.ts it writes dist/<route>.html (and <route>/index.html), a copy of
 * index.html whose `<!-- seo:start -->…<!-- seo:end -->` block is swapped
 * for that route's title, description, canonical, robots, Open Graph and
 * Twitter tags. The body is untouched — React still renders the page.
 *
 * It also writes:
 *   - dist/sitemap.xml — every indexable route (noindexed ones left out),
 *   - dist/404.html — the SPA shell, noindexed. With no catch-all rewrite
 *     in vercel.json, Vercel serves it with a real 404 status for any path
 *     that has no file, and React Router then renders NotFoundPage.
 *
 * seo.ts is TypeScript and pulls in the data files (which import images),
 * so plain `node` can't import it. Vite can: a throwaway middleware-mode
 * server loads it through the same plugin pipeline as the app, which keeps
 * one source of truth for the table. No port is opened.
 *
 * Run after `vite build` (see the `build` script in package.json).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const vite = await createServer({
  root,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, ws: false },
  optimizeDeps: { noDiscovery: true, include: [] },
})
let seo
try {
  seo = await vite.ssrLoadModule('/src/lib/seo.ts')
} finally {
  await vite.close()
}
const { ROUTE_META, SITE_URL, SITE_NAME, OG_IMAGE, ORGANIZATION_JSONLD, fullTitle, sitemapPaths } = seo

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/
if (!BLOCK.test(template)) {
  throw new Error('prerender-head: dist/index.html has no <!-- seo:start --> … <!-- seo:end --> block')
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** The head block for one page. `url` is omitted for the 404 page. */
function headBlock({ title, description, url, noindex, jsonLd }) {
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
  ]
  if (noindex) tags.push('<meta name="robots" content="noindex" />')
  if (url) tags.push(`<link rel="canonical" href="${esc(url)}" />`)
  tags.push(
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
  )
  if (url) tags.push(`<meta property="og:url" content="${esc(url)}" />`)
  tags.push(
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
  )
  // JSON-LD is data, not script: CSP doesn't block it and nothing runs it.
  // `<` is escaped so no value can close the tag early.
  if (jsonLd) {
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
    )
  }
  return tags.join('\n    ')
}

const render = (head) => template.replace(BLOCK, head)

async function write(rel, html) {
  const file = path.join(dist, rel)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, html)
}

const routes = Object.entries(ROUTE_META)
for (const [route, meta] of routes) {
  const url = SITE_URL + (route === '/' ? '/' : route)
  const html = render(
    headBlock({
      title: fullTitle(meta),
      description: meta.description,
      url,
      noindex: meta.noindex,
      jsonLd: route === '/' ? ORGANIZATION_JSONLD : undefined,
    }),
  )
  if (route === '/') {
    await write('index.html', html)
  } else {
    // Two copies, same bytes. `about.html` is what Vercel serves for
    // /about under `cleanUrls` (its documented mapping, and it 308s
    // /about.html → /about); `about/index.html` covers /about/ and any
    // host that resolves directory indexes instead.
    await write(`${route.slice(1)}.html`, html)
    await write(path.join(route, 'index.html'), html)
  }
}

await write(
  '404.html',
  render(
    headBlock({
      title: `Page not found — ${SITE_NAME}`,
      description: ROUTE_META['/'].description,
      noindex: true,
    }),
  ),
)

const urls = sitemapPaths()
  .map((p) => `  <url><loc>${esc(SITE_URL + (p === '/' ? '/' : p))}</loc></url>`)
  .join('\n')
await write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

console.log(
  `prerender-head: ${routes.length} routes, 404.html, sitemap.xml (${sitemapPaths().length} URLs)`,
)
