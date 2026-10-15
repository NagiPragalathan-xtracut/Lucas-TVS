import type { ComponentType } from 'react'
import {
  IconBoard,
  IconBolt,
  IconCar,
  IconChip,
  IconCode,
  IconCube,
  IconFactory,
  IconGauge,
  IconLink,
  IconNetwork,
  IconShieldCheck,
  IconTarget,
  IconTrend,
} from '../components/site/design'
import {
  automotiveConnectivity,
  defenceDigital,
  defenceElectronics,
  focusAutomation,
  heroSlideAutomotive,
  heroSlideIndustrialHome3,
  heroSlideDefenceAerospaceHome3,
  focusGridAiDigital,
  focusGridAutomation,
  focusGridElectrification,
  focusGridElectrification2,
  focusGridMissionCritical,
  focusGridSoftwareDefined,
  focusMissionCritical,
  focusSoftwareDefined,
  sectorAutomotive,
  sectorDefenceAerospace,
  sectorIndustrial,
  solutionsBgServices,
  solutionsBgTechnologies,
  solutionsBgVehicle,
} from '../lib/assets'
import { ROUTES } from '../lib/routes'
import type { Sector } from './products'

type Icon = ComponentType

export type IndustrySolution = {
  title: string
  description: string
  items: string[]
  icon: Icon
  image?: string
  /** What the reference's slot asks for — shown if the image is missing. */
  imageLabel: string
}

export type Industry = {
  slug: string
  label: string
  to: string
  sector: Sector
  /** Hero headline, split where the reference turns it lime. */
  title: string
  accent: string
  intro: string
  heroImage: string
  /** Looping banner clip — the same one this sector runs in the homepage
   *  hero (13 Oct). `heroImage` stays as its poster and as the fallback
   *  under reduced motion. */
  heroVideo?: string
  heroPosition?: string
  /** The reference artboard heights for this hero, as literal classes. */
  heroHeight: string
  /** Line under the name on the sector cards elsewhere on the site. */
  cardBody: string
  cardImage: string
  cardImageLabel: string
  opportunity: { statement: string; points: string[] }
  focusAreas: { title: string; body: string; icon: Icon }[]
  solutionsEyebrow: string
  solutions: IndustrySolution[]
  products: { eyebrow: string; title: string; body: string }
}

/**
 * The three industry pages, transcribed from the Automotive, Industrial
 * and Defence & Aerospace artboards of the 29 Sep reference. Every
 * headline, paragraph, focus area, solution and capability tag is the
 * reference's wording.
 *
 * Solution photography: where an approved image shows the thing the
 * reference's slot asks for, it is used; where nothing matches, the slot
 * keeps the reference's own labelled placeholder.
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: 'automotive',
    label: 'Automotive',
    to: ROUTES.automotive,
    sector: 'Automotive',
    // 14 Oct copy. Was "Engineering the Future of / Mobility." over
    // "Helping OEMs, Tier-1s, EV startups and mobility innovators bring
    // differentiated products to market faster."
    title: 'Electrification &',
    accent: 'Powertrain Systems',
    intro:
      'Engineering high-performance electric powertrain solutions for 2/3/4 Wheelers, Passenger, Commercial, Off-highway, and Specialty vehicles.',
    heroImage: focusSoftwareDefined,
    heroVideo: heroSlideAutomotive,
    heroHeight: 'min-h-[664px] lg:min-h-[655px]',
    cardBody:
      'Accelerating the transition to connected, electric, autonomous, and software-defined mobility.',
    cardImage: sectorAutomotive,
    cardImageLabel: 'Image: vehicle on highway',
    opportunity: {
      statement:
        'Electrification, connectivity, autonomy and software-defined vehicles are reshaping the automotive industry.',
      points: [
        'Sustainability targets and rising customer expectations are compressing development cycles for every OEM and supplier.',
        'We bring hardware, software and validation together so teams can launch new platforms with less risk and more speed.',
        'From 2-wheelers to off-highway vehicles, our engineering scales across segments and programmes.',
      ],
    },
    focusAreas: [
      { title: 'Software Defined Vehicles', body: 'Scalable software platforms for future mobility.', icon: IconCar },
      { title: 'Electrification & E-Mobility', body: 'Advanced EV systems, controls and power electronics.', icon: IconBolt },
      { title: 'Connected Mobility', body: 'Telematics, diagnostics and cloud-enabled ecosystems.', icon: IconLink },
      { title: 'Vehicle Electronics & Controls', body: 'Intelligent vehicle architectures and control systems.', icon: IconChip },
    ],
    solutionsEyebrow: 'Automotive solutions',
    solutions: [
      {
        title: 'Electrification & Powertrain Systems',
        description:
          'High-performance electric powertrains for 2/3/4-wheelers, passenger, commercial, off-highway and specialty vehicles.',
        items: ['Motors & Motor Controllers', 'Traction Inverters', 'Battery Management Systems', 'DC-DC Converters', 'Charging Systems', 'Energy Management'],
        icon: IconBolt,
        image: focusGridElectrification,
        imageLabel: 'Image: e-motor & inverter',
      },
      {
        title: 'Software Defined Vehicle Platforms',
        description:
          'Helping OEMs move from hardware-centric architectures to software-defined mobility platforms.',
        items: ['Vehicle Software Platforms', 'AUTOSAR', 'Middleware', 'OTA Architecture', 'Vehicle Functions'],
        icon: IconCode,
        image: focusGridSoftwareDefined,
        imageLabel: 'Image: SDV cockpit / software stack',
      },
      {
        title: 'Vehicle Controls & Body Electronics',
        description:
          'Intelligent control systems that improve performance, reliability, safety and user experience.',
        items: ['VCU Development', 'BCU Development', 'Diagnostics', 'Gateway Development', 'Power Distribution'],
        icon: IconGauge,
        image: solutionsBgVehicle,
        imageLabel: 'Image: control units on bench',
      },
      {
        title: 'Connectivity & Digital Solutions',
        description:
          'Connected ecosystems that enhance vehicle intelligence and customer engagement.',
        items: ['Connectivity', 'Telematics', 'Fleet Management', 'Remote Diagnostics', 'Predictive Analytics'],
        icon: IconLink,
        image: automotiveConnectivity,
        imageLabel:
          'Connected vehicles on a highway exchanging signals with a cell tower, the cloud and a satellite, beside a logistics hub and offices',
      },
    ],
    products: {
      eyebrow: 'Products & platforms',
      title: 'Automotive',
      body: 'Leveraging the broader Lucas TVS ecosystem and product portfolio.',
    },
  },

  {
    slug: 'industrial',
    label: 'Industrial',
    to: ROUTES.industrial,
    sector: 'Industrial',
    title: 'Engineering Smarter Factories &',
    accent: 'Connected Operations.',
    intro: 'Helping industrial OEMs and manufacturers accelerate digital transformation.',
    heroImage: focusAutomation,
    heroVideo: heroSlideIndustrialHome3,
    heroHeight: 'min-h-[679px] lg:min-h-[720px]',
    cardBody:
      'Enabling intelligent manufacturing, automation, digitalization, and connected industrial ecosystems.',
    cardImage: sectorIndustrial,
    cardImageLabel: 'Image: smart factory robot',
    opportunity: {
      statement:
        'Industry 5.0, smart manufacturing and connected assets are redefining how factories operate.',
      points: [
        'Manufacturers need real-time visibility, higher uptime and more efficient energy use — without disrupting production.',
        'We combine automation, controls engineering, IIoT and AI-driven analytics into solutions that fit existing plants.',
        'The result: connected operations that are more productive, predictable and sustainable.',
      ],
    },
    focusAreas: [
      { title: 'Digital Factory', body: 'Industry 4.0 solutions that digitise production end to end.', icon: IconFactory },
      { title: 'Connected Assets', body: 'Real-time visibility across equipment and operations.', icon: IconLink },
      { title: 'Motion & Energy', body: 'Efficient drives, controls and energy management.', icon: IconBolt },
      { title: 'AI-Driven Analytics', body: 'Turning machine data into decisions and uptime.', icon: IconNetwork },
    ],
    solutionsEyebrow: 'Industrial solutions',
    solutions: [
      {
        title: 'Smart Manufacturing',
        description:
          'Transforming production through intelligent automation and digital manufacturing technologies.',
        items: ['Manufacturing Automation', 'Digital Factory', 'Industry 4.0', 'Production Analytics', 'Process Optimization'],
        icon: IconFactory,
        image: focusGridAutomation,
        imageLabel: 'Image: automated production line',
      },
      {
        title: 'Motion & Energy Systems',
        description: 'Advanced technologies that improve efficiency, reliability and control.',
        items: ['Motor Control Systems', 'Drives & Controls', 'Energy Management', 'Power Electronics', 'Motion Controllers'],
        icon: IconGauge,
        image: focusGridElectrification2,
        imageLabel: 'Image: motor & drive assembly',
      },
      {
        title: 'IIoT & Connected Assets',
        description: 'Real-time visibility across equipment, assets and operations.',
        items: ['IIoT & Edge Computing', 'Equipment Connectivity', 'Asset Monitoring', 'Data Acquisition', 'Industrial Networking'],
        icon: IconLink,
        image: solutionsBgServices,
        imageLabel: 'Image: connected plant dashboard',
      },
      {
        title: 'Predictive Maintenance & Analytics',
        description: 'Better asset utilization with less unplanned downtime.',
        items: ['Condition Monitoring', 'AI-Based Analytics', 'Health Monitoring', 'Failure Prediction', 'Operational Intelligence'],
        icon: IconTrend,
        image: focusGridAiDigital,
        imageLabel: 'Image: engineer with tablet on shop floor',
      },
    ],
    products: {
      eyebrow: 'Products & platforms',
      title: 'Industrial',
      body: 'Hardware and platforms that connect, control and optimise operations.',
    },
  },

  {
    slug: 'defence-aerospace',
    label: 'Defence & Aerospace',
    to: ROUTES.defence,
    sector: 'Defence',
    title: 'Advanced Engineering for',
    accent: 'Mission-Critical Systems.',
    intro:
      'Supporting Defence OEMs, system integrators, DPSUs, DRDO laboratories and armed forces programmes.',
    heroImage: focusMissionCritical,
    heroVideo: heroSlideDefenceAerospaceHome3,
    heroHeight: 'min-h-[664px] lg:min-h-[720px]',
    cardBody:
      'Supporting mission-critical programs through advanced engineering, embedded systems, electronics, and digital technologies.',
    cardImage: sectorDefenceAerospace,
    cardImageLabel: 'Image: aircraft / radar',
    opportunity: {
      statement:
        'Modern defence programmes need reliable, secure and high-performance technology for increasingly complex operations.',
      points: [
        'We support modernization and localization programmes with engineering that meets demanding qualification standards.',
        'Our teams work across the lifecycle — from system architecture to integration, validation and sustainment.',
        'Rugged electronics, real-time software and digital technologies come together in one partner.',
      ],
    },
    focusAreas: [
      { title: 'Modernization & Localization', body: 'Upgrading platforms with indigenous engineering.', icon: IconTarget },
      { title: 'Mission Systems', body: 'Lifecycle support for platforms and subsystems.', icon: IconCube },
      { title: 'Rugged Electronics', body: 'Hardware built for demanding environments.', icon: IconShieldCheck },
      { title: 'Digital Defence', body: 'AI and analytics for situational awareness.', icon: IconNetwork },
    ],
    solutionsEyebrow: 'Defence solutions',
    solutions: [
      {
        title: 'Mission Systems Engineering',
        description: 'Supporting the complete lifecycle of mission-critical platforms and subsystems.',
        items: ['System Architecture', 'Requirements Engineering', 'Verification & Validation', 'Configuration Management', 'Integration Support'],
        icon: IconCube,
        image: focusGridMissionCritical,
        imageLabel: 'Image: mission system integration',
      },
      {
        title: 'Embedded & Real-Time Systems',
        description:
          'Software platforms with deterministic performance in mission-critical environments.',
        items: ['Embedded Software', 'RTOS Development', 'Middleware', 'BSP Development', 'Real-Time Applications'],
        icon: IconChip,
        image: solutionsBgTechnologies,
        imageLabel: 'Image: rugged embedded computer',
      },
      {
        title: 'Defence Electronics',
        description: 'Robust electronic subsystems for demanding operational environments.',
        items: ['Motors, Controllers & Inverters', 'Sensor Integration', 'Power Electronics', 'Embedded Processing', 'Rugged & Vehicle Electronics'],
        icon: IconBoard,
        image: defenceElectronics,
        imageLabel:
          'Rugged defence electronics — a ruggedised control unit, circuit board, cameras and military connectors, with an armoured vehicle behind',
      },
      {
        title: 'Digital Defence Technologies',
        description:
          'Modern digital technologies that improve situational awareness and effectiveness.',
        items: ['AI & Analytics', 'Digital Engineering', 'Predictive Technologies', 'Digital Transformation'],
        icon: IconNetwork,
        image: defenceDigital,
        imageLabel:
          'A defence command centre — rugged laptops showing maps and radar, a wall of situational-awareness displays, and a drone and radar vehicle outside',
      },
    ],
    products: {
      eyebrow: 'Our product range',
      title: 'Defence',
      body: 'Localized, rugged electronics for modernization programmes.',
    },
  },
]

export function industryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug)
}

/**
 * The strategic-investment band on the Automotive page. The reference now
 * settles the copy the earlier wireframe left as a choice between two
 * versions; this is its wording.
 */
export const BAT = {
  eyebrow: 'Strategic investment',
  title: 'Lucas-TVS invests in',
  accent: 'BAT, Germany.',
  paragraphs: [
    'Our strategic investment in Bavarian Automotive Technologies (BAT), Germany, strengthens our capabilities in electrification, software-defined vehicles, power electronics and system integration.',
    'Lucas TVS’s product development, manufacturing and supply-chain strength, combined with BAT’s engineering, validation and electrification expertise, delivers scalable solutions for global OEMs and Tier-1s.',
  ],
  tiles: [
    { title: 'E-Mobility', body: 'Powertrain & charging' },
    { title: 'Power Electronics', body: 'Inverters & converters' },
    { title: 'SDV', body: 'Vehicle software platforms' },
    { title: 'Integration', body: 'System-level validation' },
  ],
}
