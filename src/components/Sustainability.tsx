import { ScrollConvergeGroup, ScrollConvergeItem } from '@/components/ui/scroll-converge'
import { Eyebrow } from './primitives'
import { windFarm } from '../lib/assets'

const METRICS = [
  {
    value: '40%',
    title: 'Lower Emissions',
    blurb:
      'Our technologies support OEMs in reducing energy consumption and carbon emissions.',
  },
  {
    value: '100%',
    title: 'Renewable Energy',
    blurb:
      'Driving more sustainable manufacturing through increased adoption of renewable energy.',
  },
]

export function Sustainability() {
  return (
    <section className="shell pb-16 lg:pb-24">
      <div className="overflow-hidden rounded-[26px] border border-[#dedede] bg-lime/[0.14]">
        <div className="gap-8 p-4 lg:flex lg:items-stretch lg:p-[16px]">
          <img
            src={windFarm}
            alt="Wind turbines above a winding mountain road at sunset"
            className="h-[240px] w-full rounded-[26px] object-cover sm:h-[320px] lg:h-auto lg:w-[507px] lg:shrink-0"
          />

          <div className="pt-8 pb-4 lg:py-[54px] lg:pr-[38px]">
            <Eyebrow tone="green">Sustainable Mobility</Eyebrow>
            <h2 className="mt-3 max-w-[567px] font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
              Engineering a Cleaner, Smarter and Sustainable Future
            </h2>
            <p className="mt-5 max-w-[609px] font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
              We combine innovative engineering, efficient technologies and
              responsible practices to develop mobility solutions that reduce
              environmental impact and create long-term value for people and the
              planet.
            </p>

            <ScrollConvergeGroup
              spread={26}
              lift={18}
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-[35px] lg:max-w-[606px]"
            >
              {METRICS.map((metric, i) => (
                <ScrollConvergeItem
                  key={metric.title}
                  index={i}
                  className="rounded-[11px] border border-line-strong bg-white p-[21px]"
                >
                  <dt className="font-body text-[40px] leading-none text-lime-light lg:text-[46.7px]">
                    {metric.value}
                  </dt>
                  <dd>
                    <p className="mt-4 font-display text-[20px] leading-none font-medium text-ink">
                      {metric.title}
                    </p>
                    <p className="mt-3 max-w-[244px] font-body text-[14px] leading-[1.5] text-body">
                      {metric.blurb}
                    </p>
                  </dd>
                </ScrollConvergeItem>
              ))}
            </ScrollConvergeGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
