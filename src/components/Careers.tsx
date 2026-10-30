import { Button } from './primitives'
import { careersBackdrop } from '../lib/assets'

export function Careers() {
  return (
    <section id="careers" className="shell pb-16 lg:pb-24">
      <div className="relative overflow-hidden rounded-[20px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${careersBackdrop})` }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative px-6 py-16 text-center lg:px-[116px] lg:py-[110px]">
          <p className="font-sans text-[16px] leading-[1.25] font-medium text-lime-light">
            Careers
          </p>

          <h2 className="mx-auto mt-6 max-w-[817px] font-display text-[28px] leading-[1.15] font-medium text-white sm:text-[34px] lg:text-[40px]">
            Solve hard engineering problems. Build what&rsquo;s next.
          </h2>

          <p className="mx-auto mt-4 max-w-[661px] font-body text-[15px] leading-[1.5] text-white lg:text-[16px]">
            Join a young software &amp; product-engineering division inside
            Lucas-TVS — electrification, SDV, embedded systems, defence
            electronics and AI.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-[17px] lg:mt-[44px]">
            <Button>View open roles</Button>
            <Button variant="outline">Life at Lucas-TVS</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
