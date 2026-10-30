import { Marquee } from './primitives'
import {
  worldMap,
  flagNp,
  flagTr,
  flagSi,
  flagJp,
  flagZa,
  flagIt,
  flagVn,
  flagUs,
  flagTh,
  flagLk,
  flagBd,
  flagCn,
} from '../lib/assets'

const STATS = [
  { value: '50+', label: 'Global markets served' },
  { value: '7', label: 'Manufacturing plants' },
  { value: '40M+', label: 'Products shipped annually' },
]

const MARKETS = [
  { name: 'Nepal', flag: flagNp },
  { name: 'Turkey', flag: flagTr },
  { name: 'Slovenia', flag: flagSi },
  { name: 'Japan', flag: flagJp },
  { name: 'Africa', flag: flagZa },
  { name: 'Italy', flag: flagIt },
  { name: 'Vietnam', flag: flagVn },
  { name: 'USA', flag: flagUs },
  { name: 'Thailand', flag: flagTh },
  { name: 'Sri Lanka', flag: flagLk },
  { name: 'Bangladesh', flag: flagBd },
  { name: 'China', flag: flagCn },
]

export function GlobalPresence() {
  return (
    <section id="global" className="relative overflow-hidden pt-10 pb-16 lg:pt-[108px] lg:pb-24">
      <p
        aria-hidden
        className="watermark pointer-events-none absolute inset-x-0 top-6 text-center font-display text-[8vw] leading-none font-bold whitespace-nowrap select-none lg:top-10 lg:text-[100px]"
      >
        Global Presence
      </p>

      <div className="shell relative">
        <header className="mx-auto max-w-[921px] text-center">
          <h2 className="font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[36px] lg:text-[45px]">
            Engineering Mobility for a Global Market
          </h2>
          <p className="mt-5 font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            From India to international markets, Lucas-TVS delivers automotive
            and mobility solutions that support global OEMs across diverse
            applications.
          </p>
        </header>

        <dl className="mt-10 flex flex-wrap items-end justify-center gap-y-8 lg:mt-[80px] lg:gap-x-[72px]">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={
                'flex-1 basis-[240px] px-4 text-center ' +
                (i > 0 ? 'lg:border-l lg:border-line' : '')
              }
            >
              <dt className="font-plex text-[34px] leading-none font-semibold tracking-[-1.6px] text-lime-light lg:text-[45.7px]">
                {stat.value}
              </dt>
              <dd className="mt-4 font-body text-[13px] leading-[1.27] tracking-[1.38px] text-black uppercase lg:text-[15px]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <img
          src={worldMap}
          alt="World map highlighting the markets Lucas-TVS supplies"
          className="mx-auto mt-10 w-full max-w-[1004px] lg:mt-[80px]"
        />
      </div>

      {/* Market flags -------------------------------------------------- */}
      <div className="shell mt-[-40px] lg:mt-[-100px]">
        <div className="relative rounded-[26px] border border-[#e2e2e2] bg-white/75 py-7 backdrop-blur-md">
          <Marquee>
            {MARKETS.map((market) => (
              <div
                key={market.name}
                className="flex w-[132px] shrink-0 flex-col items-center gap-3"
              >
                <img
                  src={market.flag}
                  alt=""
                  className="h-[40px] w-[60px] object-contain"
                />
                <span className="font-body text-[15px] text-black">
                  {market.name}
                </span>
              </div>
            ))}
          </Marquee>

          {/* Feathered edges, mirroring the mask on the Figma band. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 rounded-l-[26px] bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 rounded-r-[26px] bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  )
}
