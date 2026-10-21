import type { ReactNode } from 'react'
import { COMPANY } from '../../lib/routes'
import { IconPin } from './design'

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[11px] bg-white text-ink lg:h-12 lg:w-12">
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <dt className="font-mono text-[10px] tracking-[0.12em] text-green-deep uppercase lg:text-[11px]">
          {label}
        </dt>
        <dd className="mt-1 font-body text-[14px] leading-[1.55] text-ink lg:text-[15px]">
          {children}
        </dd>
      </div>
    </div>
  )
}

/** Compact contact panel shared by the homepage and inner-page footers. */
export function FooterContactCard() {
  return (
    <dl className="rounded-[22px] bg-lime-tint p-5 lg:w-[520px] lg:shrink-0 lg:p-6">
      <ContactRow icon={<IconPin />} label="Address">
        <address className="not-italic">
          {COMPANY.addressName}, {COMPANY.addressLines.join(' ')}
        </address>
      </ContactRow>
    </dl>
  )
}
