import { ChevronDoubleRight } from './primitives'
import { ScrollConvergeGroup, ScrollConvergeItem } from '@/components/ui/scroll-converge'
import { cx } from '../lib/cx'
import {
  industryTwoThreeWheeler,
  industryPassenger,
  industryCommercial,
  industryIndustrial,
} from '../lib/assets'

const INDUSTRIES = [
  {
    title: 'Two & Three-Wheelers',
    blurb: 'High-volume platforms tuned for efficiency and cost.',
    image: industryTwoThreeWheeler,
    alt: 'Electric three-wheeler auto-rickshaw on a city street',
  },
  {
    title: 'Passenger Vehicles',
    blurb: 'Full-featured control and safety architectures.',
    image: industryPassenger,
    alt: 'Passenger car on an urban road',
  },
  {
    title: 'Commercial & Off-Highway',
    blurb: 'Durability-first design for heavy-duty cycles.',
    image: industryCommercial,
    alt: 'Heavy-duty commercial truck at dusk',
  },
  {
    title: 'Industrial Power Systems',
    blurb: 'Stationary and industrial power conversion.',
    image: industryIndustrial,
    alt: 'Wind turbines beside industrial battery storage containers',
  },
]

export function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden py-16 lg:py-24">
      {/* Oversized watermark behind the heading. */}
      <p
        aria-hidden
        className="watermark pointer-events-none absolute inset-x-0 top-6 text-center font-display text-[8vw] leading-none font-bold whitespace-nowrap uppercase select-none lg:top-2 lg:text-[100px]"
      >
        Industries we serve
      </p>

      <div className="shell relative">
        <header className="mx-auto max-w-[973px] text-center">
          <h2 className="font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[36px] lg:text-[45px]">
            Built for How Each Segment Actually Operates.
          </h2>
          <p className="mx-auto mt-5 max-w-[955px] font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            From urban mobility to heavy-duty operations, our solutions are
            engineered to deliver performance, reliability, and efficiency
            across every application.
          </p>
        </header>

        <ScrollConvergeGroup
          as="ul"
          spread={55}
          lift={30}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[130px] lg:grid-cols-4 lg:gap-[25px]"
        >
          {INDUSTRIES.map((item, i) => (
            <ScrollConvergeItem
              as="li"
              key={item.title}
              index={i}
              /* Alternating stagger matches the Figma layout at lg and up. */
              className={cx('relative', i % 2 === 1 && 'lg:-translate-y-[77px]')}
            >
              <article className="relative aspect-[289/354] overflow-hidden rounded-[21.5px]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <span className="absolute top-6 right-6 grid h-9 w-9 place-items-center rounded-full bg-lime shadow-[0_2.9px_2.9px_0_rgba(211,211,211,0.25),inset_0_0_2.9px_0_rgba(0,0,0,0.25)]">
                  <ChevronDoubleRight className="h-[11px] w-[11px] text-ink" />
                </span>

                <div className="absolute inset-x-[7px] bottom-[8px] rounded-[13px] bg-black/[0.18] px-[11px] py-[14px] backdrop-blur-[2px]">
                  <h3 className="font-body text-[16px] leading-[1.2] font-medium text-white lg:text-[17px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 font-body text-[13px] leading-[1.45] text-white/85">
                    {item.blurb}
                  </p>
                </div>
              </article>
            </ScrollConvergeItem>
          ))}
        </ScrollConvergeGroup>

        {/* Pager ------------------------------------------------------- */}
        <div className="mt-12 flex justify-center lg:mt-[70px]">
          <div className="flex items-center gap-2 rounded-[10px] bg-line-soft p-[3px]">
            <button
              type="button"
              className="flex items-center gap-2 rounded-[7px] px-6 py-3 font-sans text-[16px] font-medium text-ink-slate transition-colors hover:bg-white/70"
            >
              <ChevronDoubleRight className="h-[13px] w-[13px] rotate-180 opacity-55" />
              Prev
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-[7px] bg-lime px-8 py-3 font-sans text-[16px] font-medium text-white"
            >
              Next
              <ChevronDoubleRight className="h-[13px] w-[13px]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
