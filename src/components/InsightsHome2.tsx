import { motion } from 'framer-motion'
import { Button, ChevronPill, Eyebrow } from './primitives'
import { insightFeature, insightTruck, insightCar } from '../lib/assets'

const ARTICLES = [
  {
    title: 'Software & Product Engineering division launched',
    blurb: 'Lucas-TVS launches its Software & Product Engineering division.',
    image: insightTruck,
    alt: 'Commercial truck on a highway at dusk',
  },
  {
    title: 'Defence modernization programs',
    blurb:
      'Supporting defence modernization & localization programs.',
    image: insightCar,
    alt: 'Passenger car parked on a tree-lined city street',
  },
]

/**
 * Home2-only replacement for `Insights`. Only the heading changes per the
 * Sep-11 content review — "…Future of Mobility" reads automotive-only, so
 * it's broadened to name all three sectors. Sub-line and the 3 stories
 * (BAT featured) are unchanged.
 */
export function InsightsHome2() {
  return (
    <section id="insights" className="shell pb-16 lg:pb-24">
      <header className="gap-12 lg:flex lg:items-start lg:justify-between">
        <div className="lg:max-w-[500px]">
          <Eyebrow>Insights &amp; Events</Eyebrow>
          <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
            Insights Across Mobility, Industry &amp; Defence
          </h2>
        </div>

        <div className="mt-6 lg:mt-0 lg:max-w-[625px] lg:flex-1">
          <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            Stay updated with the latest developments in engineering, software
            and defence technologies.
          </p>
          <Button className="mt-6">All insights</Button>
        </div>
      </header>

      <div className="mt-10 grid gap-6 lg:mt-[58px] lg:grid-cols-[572fr_585fr] lg:gap-[23px]">
        {/* Lead story ------------------------------------------------- */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative min-h-[420px] overflow-hidden rounded-[15px] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)] lg:min-h-[459px]"
        >
          <img
            src={insightFeature}
            alt="Engineer reviewing motor telemetry beside a robotic assembly cell"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <ChevronPill
            className="absolute top-[9px] right-[10px] !h-[52px] !w-[106px] !bg-white !text-ink transition-transform duration-300 group-hover:scale-110"
            iconClassName="h-[26px] w-[26px]"
            label="Read the lead story"
          />

          <div className="absolute inset-x-0 bottom-0 p-[10px]">
            <div className="rounded-[15px] p-[28px]">
              <h3 className="max-w-[512px] font-display text-[26px] leading-[1.15] font-medium text-white lg:text-[35px]">
                Lucas-TVS invests in BAT, Germany
              </h3>
              <p className="mt-4 max-w-[493px] font-body text-[15px] leading-[1.5] text-white lg:text-[16px]">
                Lucas-TVS invests in Bavarian Automotive Technologies (BAT),
                Germany — strengthening e-mobility and power electronics
                capabilities.
              </p>
            </div>
          </div>
        </motion.article>

        {/* Secondary stories ------------------------------------------ */}
        <div className="grid gap-6 lg:gap-[29px]">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex gap-4 rounded-[15px] border border-[#e0e0e0] bg-surface-mute p-[9px] transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:gap-[25px] lg:min-h-[215px]"
            >
              <div className="h-[120px] w-[110px] shrink-0 overflow-hidden rounded-[12px] sm:h-[197px] sm:w-[187px]">
                <img
                  src={article.image}
                  alt={article.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col py-1 sm:py-[7px]">
                <h3 className="font-display text-[18px] leading-[1.2] font-medium text-ink transition-colors duration-300 group-hover:text-green-deep lg:text-[22px]">
                  {article.title}
                </h3>
                <p className="mt-3 font-body text-[13px] leading-[1.5] text-body lg:text-[14px]">
                  {article.blurb}
                </p>

                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-3 pt-4 font-body text-[15px] text-body lg:text-[16px]"
                >
                  Read More
                  <ChevronPill
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    label={`Read more: ${article.title}`}
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
