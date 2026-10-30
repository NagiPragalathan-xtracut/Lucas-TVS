import { Marquee } from './primitives'
import {
  awardsBackdrop,
  awardGreatPlaceToWork,
  awardDeming,
  awardAcma,
} from '../lib/assets'

const AWARDS = [
  {
    label: 'Workplace',
    title: 'Great Place to Work® Certified',
    logo: awardGreatPlaceToWork,
    alt: 'Great Place to Work certification badge',
  },
  {
    label: 'Deming Prize',
    title: 'Great Place to Work® Certified',
    logo: awardDeming,
    alt: 'Deming Prize medal',
  },
  {
    label: 'ACMA Awards',
    title: 'Great Place to Work® Certified',
    logo: awardAcma,
    alt: 'ACMA Awards emblem',
  },
]

export function Awards() {
  return (
    <section className="relative overflow-hidden pb-16 lg:pb-24">
      <img
        src={awardsBackdrop}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.34] to-black/[0.35]" />

      <div className="shell relative pt-12 pb-8 lg:pt-[124px] lg:pb-[52px]">
        <p className="badge-glow inline-flex items-center rounded-[33px] border border-[#fdfdfd] bg-[rgba(201,201,201,0.75)] px-9 py-2 font-sans text-[16px] font-medium text-white backdrop-blur-sm lg:text-[18px]">
          Awards &amp; Recognition
        </p>

        <h2 className="mt-6 max-w-[633px] font-display text-[32px] leading-[1.15] font-medium text-white sm:text-[42px] lg:mt-[44px] lg:text-[57px]">
          Recognized Excellence. Trusted Worldwide.
        </h2>

        <Marquee speed="slow" className="mt-10 lg:mt-[94px]">
          {AWARDS.map((award, i) => (
            <article
              key={`${award.label}-${i}`}
              className="mr-[38px] w-[280px] shrink-0 rounded-[14px] bg-black/[0.18] p-4 backdrop-blur-[2px] sm:w-[321px]"
            >
              <span className="grid h-[110px] w-[113px] place-items-center rounded-[4px] border-[0.5px] border-lime bg-white">
                <img
                  src={award.logo}
                  alt={award.alt}
                  className="h-[96px] w-[96px] rounded-[4px] object-cover"
                />
              </span>

              <hr className="mt-[22px] w-[280px] max-w-full border-0 border-t border-white/40" />

              <p className="mt-3 font-body text-[14px] leading-[1.3] font-medium text-lime-light">
                {award.label}
              </p>
              <h3 className="mt-1 font-body text-[15px] leading-[1.35] text-white">
                {award.title}
              </h3>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
