import {
  Lightbulb,
  Cpu,
  Settings,
  SquareCheck,
  Rocket,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import { approachBackdrop } from '../lib/assets'

const STEPS: { no: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    no: '01',
    title: 'Concept',
    description: 'Requirements & feasibility',
    icon: Lightbulb,
  },
  {
    no: '02',
    title: 'Architecture',
    description: 'System & software',
    icon: Cpu,
  },
  {
    no: '03',
    title: 'Development',
    description: 'Embedded, electronics, software',
    icon: Settings,
  },
  {
    no: '04',
    title: 'Validation',
    description: 'MIL/SIL/HIL, functional safety',
    icon: SquareCheck,
  },
  {
    no: '05',
    title: 'Deployment',
    description: 'Integration & release',
    icon: Rocket,
  },
  {
    no: '06',
    title: 'Lifecycle Support',
    description: 'Sustaining, updates, OTA',
    icon: RefreshCw,
  },
]

/**
 * Home2-only. The six lifecycle stages are now a ScrollStack — each stage
 * pins and the next slides over it as you scroll the section, instead of
 * sitting in a static row. ScrollStack runs in container-scroll mode (its
 * own nested scroller) rather than window mode, so it never has to fight
 * the app-wide <ReactLenis root> for the page scroll.
 */
export function OurApproach() {
  return (
    <section className="px-5 pt-[134px] pb-[150px] lg:pt-[198px] lg:pb-[198px]">
      {/* `overflow-clip`, not `overflow-hidden`: it rounds off the backdrop
          exactly the same way but doesn't create a scrollport, so the
          sticky copy column below still works. */}
      <div className="relative overflow-clip rounded-[24px]">
        <img
          src={approachBackdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left"
        />

        <div className="relative grid gap-10 px-5 pt-[110px] pb-[110px] sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:px-12 lg:pt-[126px] lg:pb-[134px]">
          {/* Copy — holds its place while the stack plays through. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-sans text-[13px] font-semibold tracking-[3px] text-white/85 uppercase lg:text-[14px]">
              Our Engineering Approach
            </p>
            <h2 className="mt-3 max-w-[640px] font-display text-[30px] leading-[1.15] font-medium text-white sm:text-[38px] lg:text-[44px]">
              From Concept To <span className="text-lime-light">Lifecycle.</span>
            </h2>
            <p className="mt-4 max-w-[620px] font-body text-[14px] leading-[1.5] text-white/75 lg:text-[16px]">
              A comprehensive engineering journey that transforms ideas into
              intelligent, real-world solutions and keeps them evolving for a
              smarter tomorrow.
            </p>
          </div>

          {/* Stacked stages ----------------------------------------- */}
          <div className="mt-2 lg:mt-0">
            <ScrollStack
              useWindowScroll
              itemDistance={90}
              itemStackDistance={22}
              itemScale={0.02}
              baseScale={0.9}
              stackPosition="30%"
              scaleEndPosition="14%"
              blurAmount={0.6}
            >
              {STEPS.map((step) => (
                <ScrollStackItem
                  key={step.title}
                  itemClassName="group flex h-[136px] items-center gap-4 rounded-[22px] border border-white/12 bg-black/80 px-5 shadow-[0_0_0_1px_rgba(29,122,50,0.16),0_18px_44px_rgba(0,0,0,0.55),0_0_34px_rgba(29,122,50,0.10)] backdrop-blur-md sm:h-[150px] sm:gap-6 sm:px-7 lg:h-[160px] lg:gap-7 lg:px-8"
                >
                  {/* Ring, not a filled chip: the reference reads as a hollow
                      lime outline with the glow spilling both ways, so the
                      glow is split into an outer drop and an inner inset. */}
                  <span className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full border-2 border-lime shadow-[0_0_18px_rgba(29,122,50,0.45),inset_0_0_16px_rgba(29,122,50,0.18)] transition-transform duration-300 group-hover:scale-105 sm:h-[72px] sm:w-[72px] lg:h-[78px] lg:w-[78px]">
                    <step.icon
                      aria-hidden
                      strokeWidth={1.75}
                      className="h-[26px] w-[26px] text-lime-light sm:h-[30px] sm:w-[30px] lg:h-[32px] lg:w-[32px]"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[22px] leading-[1.1] font-semibold text-white sm:text-[26px] lg:text-[30px]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-body text-[13px] leading-[1.35] text-white/65 sm:text-[15px] lg:text-[16px]">
                      {step.description}
                    </p>
                  </div>

                  <span aria-hidden className="h-[52px] w-px shrink-0 bg-white/20 lg:h-[62px]" />

                  {/* IBM Plex Mono keeps the slashed zero the reference shows. */}
                  <span className="shrink-0 font-mono text-[30px] leading-none font-bold text-lime-light sm:text-[38px] lg:text-[44px]">
                    {step.no}
                  </span>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </div>
    </section>
  )
}
