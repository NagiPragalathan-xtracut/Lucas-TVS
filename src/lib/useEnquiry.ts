import { useState, type FormEvent } from 'react'

/**
 * The Google Apps Script web app that appends each enquiry to the client's
 * enquiries sheet (scripts/google-sheets/enquiries.gs). Not a secret: it
 * ships in the bundle either way, and the script can only append rows.
 */
export const ENQUIRY_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyaNeMjHAIbYu3UdurFC5E-SjlXaQ-Rm50EDFhfEFxrOGypuU2WKD44dhzvqkoJDxBioA/exec'

export type EnquiryStatus = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Submit handler and status for an enquiry form. Every named field in the
 * form is sent as-is, plus which form it came from (`source`) and the page
 * URL. The form is cleared once the sheet confirms the row was written;
 * `onSent` is for clearing any controlled fields `form.reset()` can't.
 *
 * Posted as urlencoded so the browser sends it without a CORS preflight,
 * which Apps Script does not answer; its JSON reply is readable after the
 * redirect to googleusercontent.com.
 */
export function useEnquiry(source: string, onSent?: () => void) {
  const [status, setStatus] = useState<EnquiryStatus>('idle')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget

    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    body.append('source', source)
    body.append('page', window.location.href)

    setStatus('sending')
    try {
      const res = await fetch(ENQUIRY_ENDPOINT, { method: 'POST', body })
      const reply = (await res.json()) as { ok?: boolean }
      if (!res.ok || !reply.ok) throw new Error('Enquiry not saved')
      form.reset()
      onSent?.()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return { status, setStatus, onSubmit }
}
