import { useState } from 'react'
import { cx } from '../lib/cx'
import {
  solutionShowcase,
  tabEv,
  tabEnvironment,
  tabAutomotive,
  tabIndustrial,
  tabConsumer,
} from '../lib/assets'

const TABS = [
  { id: 'ev', label: 'EV Solution', icon: tabEv },
  { id: 'environment', label: 'Environment Solution', icon: tabEnvironment },
  { id: 'automotive', label: 'Automotive Solutions', icon: tabAutomotive },
  { id: 'industrial', label: 'Industrial Automation', icon: tabIndustrial },
  { id: 'consumer', label: 'Consumer & Home Solutions', icon: tabConsumer },
]

export function SolutionShowcase() {
  const [active, setActive] = useState('environment')

  return (
    <section id="capabilities" className="shell-wide pb-16 lg:pb-24">
      <div className="relative overflow-hidden rounded-[24px]">
        {/*
          The export is a flat composite that carries its own light margin.
          Figma hides that by bleeding the image past the frame; the scale
          here does the same without needing negative offsets.
        */}
        <img
          src={solutionShowcase}
          alt="Agricultural drone spraying a field of crops, alongside the motor range that powers it"
          className="h-[440px] w-full scale-[1.03] object-cover object-center sm:h-auto"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent sm:from-black/55 sm:via-black/5" />

        {/* Copy is placed on the same percentage grid Figma uses. */}
        <div className="absolute inset-x-0 top-0 flex h-full flex-col justify-center p-6 sm:top-[23%] sm:h-auto sm:block sm:w-[52%] sm:justify-start sm:px-[4.3%] sm:py-0">
          <p className="font-sans text-[14px] leading-[1.25] font-medium text-lime-light lg:text-[16px]">
            Environment Solution
          </p>
          <h2 className="mt-3 font-display text-[28px] leading-[1.1] font-medium whitespace-nowrap text-white sm:text-[36px] lg:mt-[14px] lg:text-[45px]">
            Drones-Powered Farming
          </h2>
          <p className="mt-3 max-w-[503px] font-body text-[14px] leading-[1.5] text-white/90 lg:mt-[18px] lg:text-[16px]">
            From advanced automotive electronics and embedded software to EV
            powertrain technologies and industrial automation,
          </p>
        </div>
      </div>

      {/* Solution tabs -------------------------------------------------- */}
      <div className="-mt-[15px] px-0">
        <ul className="relative z-10 flex snap-x snap-mandatory items-stretch justify-between gap-1 overflow-x-auto rounded-[14px] bg-white p-[3px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <li key={tab.id} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={active === tab.id}
                className={cx(
                  'flex h-full items-center gap-3 rounded-[10px] px-4 py-3 whitespace-nowrap transition-colors lg:px-6',
                  active === tab.id
                    ? 'bg-lime'
                    : 'bg-transparent hover:bg-line-soft',
                )}
              >
                <img
                  src={tab.icon}
                  alt=""
                  className="h-[28px] w-[28px] shrink-0 object-contain lg:h-[34px] lg:w-[34px]"
                />
                <span className="font-sans text-[14px] leading-[1.25] font-medium text-black lg:text-[16px]">
                  {tab.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
