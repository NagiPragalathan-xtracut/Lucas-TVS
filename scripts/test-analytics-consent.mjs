import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/analytics.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText

const scripts = []
const cookies = new Map([['_ga', 'old-value'], ['_gid', 'old-value']])
const document = {
  title: 'Lucas TVS Software',
  head: { appendChild: (script) => scripts.push(script.src) },
  createElement: () => ({}),
  get cookie() { return [...cookies].map(([name, value]) => `${name}=${value}`).join('; ') },
  set cookie(value) {
    const [name, rest] = value.split('=')
    if (rest.startsWith(';')) cookies.delete(name)
    else cookies.set(name, rest.split(';')[0])
  },
}
const window = { location: { hostname: 'software.lucas-tvs.com', href: 'https://software.lucas-tvs.com/' } }
const exports = {}
vm.runInNewContext(compiled, { window, document, exports, Date })

exports.setAnalyticsEnabled(false)
assert.equal(scripts.length, 0, 'no optional scripts before consent')
assert.equal(cookies.has('_ga'), false, 'old GA cookie removed without consent')

exports.setAnalyticsEnabled(true)
assert.deepEqual(scripts, [
  'https://www.googletagmanager.com/gtm.js?id=GTM-TRS8MDV8',
  'https://www.googletagmanager.com/gtag/js?id=G-NRM9VL9YXQ',
  'https://www.clarity.ms/tag/z7t3ml7tfm',
])
assert.equal(window['ga-disable-G-NRM9VL9YXQ'], false)
const beforeView = window.dataLayer.length
exports.trackPageView('/')
assert.equal(window.dataLayer.length, beforeView + 1, 'page view sent with consent')

exports.setAnalyticsEnabled(false)
assert.equal(window['ga-disable-G-NRM9VL9YXQ'], true)
assert.equal(window.clarity.q.at(-1)[0], 'consent', 'Clarity consent withdrawn')
assert.equal(window.clarity.q.at(-1)[1], false)
const afterRevoke = window.dataLayer.length
exports.trackPageView('/contact')
exports.trackEvent('generate_lead')
assert.equal(window.dataLayer.length, afterRevoke, 'no GA events after revocation')

exports.setAnalyticsEnabled(true)
assert.equal(scripts.length, 3, 'scripts loaded only once')
assert.equal(window.clarity.q.at(-1)[0], 'consentv2', 'Clarity consent restored')
console.log('Analytics consent checks passed')
