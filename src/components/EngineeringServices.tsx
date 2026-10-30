import {
  Boxes,
  Cpu,
  CircuitBoard,
  Code2,
  ShieldCheck,
  Gauge,
  BrainCircuit,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react'
import { Button, ChevronPill, Eyebrow } from './primitives'
import { ScrollConvergeGroup, ScrollConvergeItem } from '@/components/ui/scroll-converge'
import { cx } from '../lib/cx'
import { rndFeature } from '../lib/assets'

const CAPABILITIES: { title: string; blurb: string; icon: LucideIcon }[] = [
  {
    title: 'Product Engineering',
    blurb: 'Concept to deployment and lifecycle management.',
    icon: Boxes,
  },
  {
    title: 'Embedded Systems',
    blurb: 'Intelligent embedded platforms for connected products.',
    icon: Cpu,
  },
  {
    title: 'Electronics Engineering',
    blurb: 'Hardware for next-generation products.',
    icon: CircuitBoard,
  },
  {
    title: 'Software Engineering',
    blurb: 'Scalable software platforms and applications.',
    icon: Code2,
  },
  {
    title: 'Functional Safety & Cybersecurity',
    blurb: 'ISO 26262 · IEC 61508 · ISO 21434 — safe & secure by design.',
    icon: ShieldCheck,
  },
  {
    title: 'Electronics & Controls',
    blurb: 'Motor control, power electronics, HW-SW co-development.',
    icon: Gauge,
  },
  {
    title: 'Digital Engineering',
    blurb: 'AI/ML, IIoT, cloud & edge, predictive maintenance.',
    icon: BrainCircuit,
  },
  {
    title: 'Verification & Testing',
    blurb: 'MIL/SIL/HIL, automation, compliance & certification.',
    icon: ClipboardCheck,
  },
]

/** Home2-only: expanded 8-service version of ResearchDevelopment with a sticky feature card. */
export function EngineeringServices() {
  return (
    <section
      id="quality"
      className="relative bg-gradient-to-b from-white to-[#eee] pt-12 pb-16 lg:pt-[110px] lg:pb-24"
    >
      <div className="shell relative">
        <header className="gap-12 lg:flex lg:items-start lg:justify-between">
          <div className="lg:max-w-[590px]">
            <Eyebrow className="!text-[18px]">Engineering Services</Eyebrow>
            <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
              Capabilities That Drive Innovation.
            </h2>
          </div>

          <div className="mt-6 lg:mt-2 lg:max-w-[660px] lg:flex-1">
            <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
              Horizontal — across all three sectors. From concept to
              deployment, our engineering services span embedded systems,
              electronics, software, safety, and validation.
            </p>
            <Button className="mt-6">Explore More</Button>
          </div>
        </header>

        <div className="mt-12 gap-[21px] lg:mt-[64px] lg:flex lg:items-start">
          {/* Capability cards ---------------------------------------- */}
          <ScrollConvergeGroup
            as="ul"
            spread={0}
            lift={26}
            className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-[21px]"
          >
            {CAPABILITIES.map((item, i) => (
              <ScrollConvergeItem
                as="li"
                key={item.title}
                index={i}
                className={cx(i % 2 === 1 && 'lg:translate-y-[49px]')}
              >
                <article className="group relative flex h-full min-h-[274px] flex-col rounded-[19.75px] border border-[#d8d8d8] bg-white p-[17px] transition-all duration-300 hover:-translate-y-1.5 hover:border-lime hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)]">
                  <span className="grid h-[63px] w-[64px] place-items-center rounded-[5px] border border-[#f0f0f0] bg-lime-tint transition-colors duration-300 group-hover:border-lime group-hover:bg-lime">
                    <item.icon
                      aria-hidden
                      strokeWidth={1.6}
                      className="h-[30px] w-[30px] text-ink transition-colors duration-300 group-hover:text-white"
                    />
                  </span>

                  <h3 className="mt-[20px] font-display text-[18px] leading-[1.2] font-medium text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[290px] font-body text-[14px] leading-[1.5] text-body">
                    {item.blurb}
                  </p>

                  <ChevronPill
                    className="mt-auto ml-auto !h-[36px] !w-[73px] self-end shadow-[0_2.9px_2.9px_0_rgba(211,211,211,0.25),inset_0_0_2.9px_0_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:translate-x-1"
                    iconClassName="h-[18px] w-[18px]"
                    label={`Read more about ${item.title}`}
                  />
                </article>
              </ScrollConvergeItem>
            ))}
          </ScrollConvergeGroup>

          {/* Feature card — sticks in view while the taller list scrolls past */}
          <article className="relative mt-8 aspect-[507/615] overflow-hidden rounded-[18px] lg:sticky lg:top-24 lg:mt-0 lg:w-[507px] lg:shrink-0 lg:self-start">
            <img
              src={rndFeature}
              alt="Engineer monitoring an automated motor assembly cell"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.74] to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 lg:p-[16px]">
              {/* Plain link, not a titled card — a 3rd "Engineering Services"
                  label here duplicated the eyebrow and heading above. */}
              <a
                href="#"
                className="flex items-center justify-between gap-4 rounded-full border border-white bg-black/[0.22] py-[3px] pr-[3px] pl-[37px] backdrop-blur-sm transition-colors hover:bg-black/40"
              >
                <span className="font-sans text-[18px] text-white lg:text-[21px]">
                  Explore Engineering Services
                </span>
                <ChevronPill
                  className="!h-[50px] !w-[102px] !bg-white shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)]"
                  iconClassName="h-[26px] w-[26px]"
                  label="Explore Engineering Services"
                />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
