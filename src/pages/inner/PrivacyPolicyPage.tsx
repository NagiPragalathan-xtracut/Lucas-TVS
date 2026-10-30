import type { ReactNode } from 'react'
import { PageShell } from '../../components/site/PageShell'
import { usePrivacyConsent } from '../../components/site/PrivacyConsent'
import { Band, DarkHero } from '../../components/site/blocks'
import { COOKIE_TYPES } from '../../data/cookieTypes'
import { approachBackdrop } from '../../lib/assets'

type PolicySection = {
  /** Omitted where the source has no heading of its own. */
  heading?: string
  intro: string
  items?: { term: string; body: string }[]
}

/**
 * The policy text, verbatim from the client's current page
 * (lucas-tvs.com/privacy-policy, last updated 31-03-2026). Wording,
 * spelling and order are theirs; change it only with a new version from
 * the client, and update LAST_UPDATED with it.
 */
const SECTIONS: PolicySection[] = [
  {
    heading: 'Privacy Settings',
    intro:
      'At Lucas TVS Ltd, a leading manufacturer of motor vehicle parts, we are deeply committed to respecting and protecting your privacy. This page allows you to manage your privacy settings and control how we collect, use, and share your personal information.',
  },
  {
    heading: 'Personal Data Collection',
    intro: 'We collect a range of personal data to enhance your experience with our services:',
    items: [
      {
        term: 'Contact Information',
        body: 'This includes your name, email address, phone number, and physical address. We collect this information when you interact with our website, make inquiries, or place orders.',
      },
      {
        term: 'Browsing and Search History',
        body: 'We track your interactions with our website, including the pages you visit and the searches you perform, to improve our services and provide you with a more personalised experience.',
      },
      {
        term: 'Cookie Data',
        body: 'We use cookies to collect data about your preferences and online behaviour. Cookies help us remember your preferences and understand how you use our site, enabling us to enhance your user experience.',
      },
    ],
  },
  {
    heading: 'Cookie Settings',
    intro: 'You have control over the types of cookies that are stored on your device:',
    // Shared with the cookie preferences panel (data/cookieTypes.ts).
    items: [COOKIE_TYPES.necessary, COOKIE_TYPES.performance, COOKIE_TYPES.targeting],
  },
  {
    heading: 'Data Sharing Settings',
    intro: 'We may share your personal data with specific third parties to enhance our services:',
    items: [
      {
        term: 'Share Data with Third-Party Partners',
        body: 'We share your data with selected third-party partners for marketing and analytics purposes. These partners help us better understand our customer base and improve our marketing strategies.',
      },
      {
        term: 'Share Data with Lucas TVS Affiliates',
        body: 'Your data may be shared with our affiliated companies to improve our products and services. This enables us to offer you a more cohesive and tailored experience across our affiliated entities.',
      },
      {
        term: 'Share Data with Authorised Dealers',
        body: 'To fulfil orders and provide customer support, we may share your data with authorised dealers. These dealers assist in delivering products and handling any post-purchase inquiries you may have.',
      },
    ],
  },
  {
    heading: 'Communication Settings',
    intro: 'You have the option to manage how we communicate with you:',
    items: [
      {
        term: 'Receive Marketing Emails',
        body: 'We periodically send out marketing emails that include news, offers, and updates about our products and services. You can choose to unsubscribe from these emails at any time.',
      },
      {
        term: 'Receive Promotional Messages',
        body: 'In addition to emails, we may send promotional messages via SMS or other channels. These messages also include news, offers, and updates. You can opt out of receiving these messages if you prefer.',
      },
    ],
  },
  {
    heading: 'Data Protection Settings',
    intro: 'We take data protection seriously and employ several measures to safeguard your information:',
    items: [
      {
        term: 'Data Encryption',
        body: 'We use advanced encryption technologies to protect your personal data from unauthorised access. This ensures that your data is kept safe and secure during transmission and storage.',
      },
      {
        term: 'Data Retention',
        body: 'We retain your data for a period of 5 years. This allows us to provide you with better services and fulfil any legal obligations. After this period, your data will be securely deleted or anonymized.',
      },
    ],
  },
  {
    heading: 'Your Rights',
    intro: 'We respect your rights regarding your personal data. You have the following options:',
    items: [
      {
        term: 'Access Your Data',
        body: 'You can request access to the personal data we hold about you at any time.',
      },
      {
        term: 'Rectify Your Data',
        body: 'If you believe any of your personal data is incorrect or incomplete, you can request corrections.',
      },
      {
        term: 'Delete Your Data',
        body: 'You can request the deletion of your personal data from our systems. We will comply with your request unless we are required to retain the data for legal or operational reasons.',
      },
      {
        term: 'Object to Data Processing',
        body: 'You have the right to object to how we process your data, particularly if it involves direct marketing or profiling activities.',
      },
    ],
  },
  {
    heading: 'Additional Settings',
    intro: 'We offer additional privacy-related settings to enhance your control:',
    items: [
      {
        term: 'Do Not Track (DNT)',
        body: 'We respect and honour DNT signals from your web browser, ensuring that your online activities are not tracked when you have enabled this feature.',
      },
      {
        term: 'Google Analytics',
        body: 'We use Google Analytics to gain insights into how users interact with our website. This helps us improve our website’s functionality and user experience. You can opt-out of Google Analytics tracking by adjusting your browser settings or using Google’s opt-out tools.',
      },
    ],
  },
  {
    intro: 'Please note that this Privacy Policy does not apply in the following circumstances:',
    items: [
      {
        term: 'Third-party sites',
        body: 'The page may include links or references to websites, services or materials that are not controlled by us. This Privacy Policy does not apply to such third-party sites, which are subject to their own privacy notices.',
      },
      {
        term: 'Existing customers and users',
        body: 'In some cases, we may access or use your information on behalf of your organization who is our customer. In such cases, we will treat your information as prescribed in the respective agreements between us and your organization, rather than as described in this Privacy Policy. Please reach out to your organization for more information or if you would like to exercise any of your data subject rights in connection with our use of your information.',
      },
    ],
  },
  {
    intro:
      'By adjusting your privacy settings on this page, you are exercising your rights and taking control of your personal information. At Lucas TVS, your privacy is a priority, and we are committed to ensuring that your data is handled with the utmost care and transparency.',
  },
]

// The policy's own contact details, which differ from the R&D centre's
// in COMPANY (lib/routes.ts).
const TOLL_FREE = '1800-425-8979'
const PRIVACY_EMAIL = 'oe@lucastvs.co.in'
const LAST_UPDATED = '31-03-2026'

const H2 = 'font-display text-[22px] leading-[1.25] font-semibold text-ink lg:text-[26px]'
const TEXT = 'font-body text-[16px] leading-[1.7] text-body'

/**
 * Privacy Policy (/privacy-policy, the same path as the client's current
 * site, so existing links keep working). Not drawn in the reference; built
 * from its blocks like Search and the 404: the short dark hero, then the
 * text column of the Insights articles.
 *
 * Under Cookie Settings, "Privacy choices" opens the cookie preferences
 * panel (PrivacyConsent.tsx), so the page's "manage your privacy
 * settings" has somewhere to act.
 */
export default function PrivacyPolicyPage() {
  const { openPrivacyChoices } = usePrivacyConsent()

  return (
    <PageShell title="Privacy Policy">
      <DarkHero
        image={approachBackdrop}
        heightClass="min-h-[480px] lg:min-h-[520px]"
        crumbs={[{ label: 'Privacy Policy' }]}
        title="Privacy"
        accent="Policy."
        intro={`Last updated ${LAST_UPDATED}`}
      />

      <Band>
        <article className="mx-auto flex max-w-[760px] flex-col gap-10 lg:gap-12">
          {SECTIONS.map((section, i) => (
            <PolicyBlock key={i} heading={section.heading}>
              <p className={TEXT}>{section.intro}</p>
              {section.items && (
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item.term} className="flex gap-3">
                      <span aria-hidden className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-green-deep" />
                      <p className={TEXT}>
                        <strong className="font-semibold text-ink">{item.term}:</strong> {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              {section.heading === 'Cookie Settings' && (
                <button
                  type="button"
                  onClick={openPrivacyChoices}
                  className="self-start rounded-full border border-green-deep px-5 py-2 font-body text-[14px] font-medium text-green-deep transition-colors hover:bg-lime-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep"
                >
                  Privacy choices
                </button>
              )}
            </PolicyBlock>
          ))}

          <PolicyBlock heading="Contact Us">
            <p className={TEXT}>
              If you have any questions or concerns about our privacy settings, please contact us at:
            </p>
            <dl className="flex flex-col gap-2 rounded-[16px] bg-lime-tint p-5 font-body text-[16px] leading-[1.6] text-ink">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold">Toll Free Number:</dt>
                <dd>
                  <a href={`tel:${TOLL_FREE.replace(/-/g, '')}`} className="transition-colors hover:text-green-deep">
                    {TOLL_FREE}
                  </a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold">E mail:</dt>
                <dd>
                  <a href={`mailto:${PRIVACY_EMAIL}`} className="break-all transition-colors hover:text-green-deep">
                    {PRIVACY_EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </PolicyBlock>

          <PolicyBlock heading="Last Updated">
            <p className={TEXT}>
              This privacy settings page was last updated on {LAST_UPDATED}. We may update it from time
              to time, so please check back regularly.
            </p>
          </PolicyBlock>
        </article>
      </Band>
    </PageShell>
  )
}

function PolicyBlock({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      {heading && <h2 className={H2}>{heading}</h2>}
      {children}
    </section>
  )
}
