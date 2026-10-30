import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react'
import { useLenis } from 'lenis/react'
import { SiteHeaderHome2 } from '../components/SiteHeaderHome2'
import { HeroHome2 } from '../components/HeroHome2'
import { WhoWeAre } from '../components/WhoWeAre'
import { IndustriesAnimatedHome2 } from '../components/IndustriesAnimatedHome2'
import { FocusAreas } from '../components/FocusAreas'
import { EngineeringServices } from '../components/EngineeringServices'
import { OurApproach } from '../components/OurApproach'
import { IntegratedEngineeringStack } from '../components/IntegratedEngineeringStack'
import { WhyChooseUsHome2 } from '../components/WhyChooseUsHome2'
import { MarqueeBand } from '../components/MarqueeBand'
import { SustainabilityHome2 } from '../components/SustainabilityHome2'
import { Careers } from '../components/Careers'
import { InsightsHome2 } from '../components/InsightsHome2'
import { SiteFooterHome2 } from '../components/SiteFooterHome2'

const WORD_STAGGER_MS = 55

/**
 * Wraps every word of `heading` in its own span so they can be revealed in
 * sequence. Recurses so inline markup survives — the headings here colour
 * their last phrase with `<span class="text-lime-light">`, and that wrapper (and
 * its class) has to stay intact around the words it holds.
 *
 * Returns the word spans in document order. Whitespace between words is
 * left as plain text nodes, so wrapping and spacing are unchanged.
 */
function wrapWords(heading: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = []

  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? ''
        if (!text.trim()) continue

        const fragment = document.createDocumentFragment()
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(part))
            continue
          }
          const word = document.createElement('span')
          word.className = 'heading-blur-word'
          word.textContent = part
          fragment.appendChild(word)
          words.push(word)
        }
        child.parentNode?.replaceChild(fragment, child)
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child)
      }
    }
  }

  walk(heading)
  return words
}

/**
 * Word-by-word blur-in for every heading on the page.
 *
 * Driven from here rather than from each component because most of these
 * sections (WhoWeAre, EngineeringServices, Careers, ...) are shared with
 * Home and NewHome, which keep their original static headings. One pass
 * over the subtree gives Home2 the effect without editing any of them.
 */
function useHeadingBlurIn(scope: RefObject<HTMLDivElement | null>) {
  const headingsRef = useRef<HTMLElement[]>([])
  const pendingRef = useRef(0)

  // Layout effect, not a plain effect: the words are hidden the moment they
  // are wrapped, so doing this after paint would flash the full heading
  // first and then blank it.
  useLayoutEffect(() => {
    const root = scope.current
    if (!root) return

    const headings = Array.from(root.querySelectorAll<HTMLElement>('h1, h2'))
    if (!headings.length) return

    const originals = headings.map((heading) => heading.innerHTML)

    for (const heading of headings) {
      const words = wrapWords(heading)
      if (!words.length) continue
      words.forEach((word, i) => {
        word.style.setProperty('--word-delay', `${i * WORD_STAGGER_MS}ms`)
      })
      heading.classList.add('heading-blur')
    }

    headingsRef.current = headings
    pendingRef.current = headings.length

    return () => {
      headingsRef.current = []
      // Put the original markup back, so nothing is left hidden and a
      // re-mount re-wraps from clean text rather than nesting spans.
      headings.forEach((heading, i) => {
        heading.classList.remove('heading-blur', 'is-visible')
        heading.innerHTML = originals[i]
      })
    }
  }, [scope])

  const check = useCallback(() => {
    if (pendingRef.current <= 0) return
    const trigger = window.innerHeight * 0.88
    for (const heading of headingsRef.current) {
      if (heading.classList.contains('is-visible')) continue
      const rect = heading.getBoundingClientRect()
      if (rect.top < trigger && rect.bottom > 0) {
        heading.classList.add('is-visible')
        pendingRef.current -= 1
      }
    }
  }, [])

  // The app wraps everything in <ReactLenis root>, so Lenis drives the
  // scroll; its callback fires per frame through the whole eased movement,
  // which keeps the reveal in step with the momentum rather than with raw
  // scrollTop jumps.
  useLenis(check)

  // A rect test rather than IntersectionObserver, and window events on top
  // of the Lenis callback, because the failure mode here is severe: a
  // heading that never gets revealed is a blank section, not a missed
  // animation. Two independent signals plus the mount-time call means no
  // single one of them has to be working.
  useLayoutEffect(() => {
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [check])
}

export default function Home2() {
  const contentRef = useRef<HTMLDivElement>(null)
  useHeadingBlurIn(contentRef)

  return (
    <div ref={contentRef} className="relative">
      <SiteHeaderHome2 />
      <main>
        <HeroHome2 />
        {/* Everything below the hero rides over it. The hero is `sticky
            top-0 z-0`, so it stays pinned while this block scrolls up and
            covers it — hence the opaque background here, without which the
            pinned video would show through the gaps between sections. */}
        <div className="relative z-10 bg-white">
          {/* Padding lives here, not in WhoWeAre — that component is shared
              with Home and NewHome, which keep their original spacing. */}
          <div className="pt-[100px]">
            <WhoWeAre />
          </div>
          <IndustriesAnimatedHome2 />
          <FocusAreas />
          <EngineeringServices />
          <OurApproach />
          <IntegratedEngineeringStack />
          <WhyChooseUsHome2 />
          <MarqueeBand />
          <SustainabilityHome2 />
          <Careers />
          <InsightsHome2 />
        </div>
      </main>
      {/* Also above the pinned hero — it's a sibling of <main>, so without
          its own layer it would share the z-0 band with the hero. */}
      <div className="relative z-10">
        <SiteFooterHome2 />
      </div>
    </div>
  )
}
