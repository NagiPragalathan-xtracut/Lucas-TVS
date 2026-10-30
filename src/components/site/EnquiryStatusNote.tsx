import { COMPANY } from '../../lib/routes'
import type { EnquiryStatus } from '../../lib/useEnquiry'

/**
 * The line under an enquiry form once it has been submitted: a thank-you
 * when the sheet confirmed the row, or — when it did not — a plain "not
 * sent" with the email address as a fallback. Nothing while idle/sending.
 */
export function EnquiryStatusNote({ status }: { status: EnquiryStatus }) {
  if (status === 'sent') {
    return (
      <p
        role="status"
        className="rounded-[12px] border-[1.5px] border-green-deep/30 bg-lime-tint px-4 py-3 font-body text-[13px] leading-[1.5] text-ink"
      >
        Thank you, your enquiry has been sent. Our team will get back to you shortly.
      </p>
    )
  }
  if (status === 'error') {
    return (
      <p
        role="alert"
        className="rounded-[12px] border-[1.5px] border-dashed border-line bg-surface-mute px-4 py-3 font-body text-[13px] leading-[1.5] text-body"
      >
        Sorry, your enquiry could not be sent. Please try again, or email us at{' '}
        <a href={`mailto:${COMPANY.email}`} className="font-medium text-green-ink underline underline-offset-2">
          {COMPANY.email}
        </a>
        .
      </p>
    )
  }
  return null
}
