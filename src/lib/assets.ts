/**
 * Every image in this file was exported from the Figma source
 * ("lucas-TVS", node 190:74) and committed under src/assets.
 * Names here describe the role in the page; the filenames keep the
 * original Figma layer names so a re-export can be diffed against them.
 */

// Brand ---------------------------------------------------------------
import logoLucasTvs from '../assets/image32.webp'
import logoLucasTvsFooter from '../assets/image33.webp'
// India Nippon Electricals (INEL), supplied 30 Sep as navy on a solid black
// rectangle with no transparency. The black was lifted off (each pixel read as
// navy ink at some opacity over black) so it can sit on the white and grey
// cards; the mark itself is unchanged. Navy — for light backgrounds only.
import logoInel from '../assets/Logos/inel-logo.png'

// Hero ----------------------------------------------------------------
// Poster frame shown before the clip loads, and as the static fallback
// when scroll-scrub motion is skipped (prefers-reduced-motion).
import heroBackdrop from '../assets/hero-backdrop.webp'
import heroArmMotion from '../assets/hero-arm-motion.mp4'

// Hero — 3-domain diagonal slider (Home2 and Home3) ---------------------
import heroSlideAutomotive from '../assets/Hero/slide1.mp4'
import heroSlideIndustrial from '../assets/Hero/slide2.mp4'
import heroSlideDefenceAerospace from '../assets/Hero/slide3.mp4'

// Hero — Home3's re-shot Industrial and Defence clips, per the 16 Sep
// review. Industrial drops the manufacturing / assembly animation for IoT
// connectivity, and Defence drops the space and satellite imagery (there is
// no space capability today) for land, water and sea. Automotive was
// explicitly kept as it stands, so there is no `h3slide1` — Home3 goes on
// using `heroSlideAutomotive` above.
//
// Separate exports rather than repointing the three above, because Home2
// still runs the original set and must not move.
import heroSlideIndustrialHome3 from '../assets/Hero/h3slide2.mp4'
// 30 Sep: Defence replaced — armoured vehicles and troops on a harbour
// apron at dusk, a transport aircraft overhead, warships alongside. H.264
// 1920x1080 at 24fps like the others, 3.5 MB. It is a 4-second clip where
// the old one ran 8, so it loops once inside the hero's 5-second slide.
// New filename rather than overwriting h3slide3.mp4, so no stale cached copy.
import heroSlideDefenceAerospaceHome3 from '../assets/Hero/h3-defence.mp4'

// Focus areas — one backdrop per tab (Home2 only) ----------------------
import focusElectrification from '../assets/Tabs/tab1.png'
import focusSoftwareDefined from '../assets/Tabs/tab2.png'
import focusAutomation from '../assets/Tabs/tab3.png'
import focusMissionCritical from '../assets/Tabs/tab4.png'
import focusAiDigital from '../assets/Tabs/tab5.png'

// Focus areas — product shots for the hotspot tiles, four per tab in the
// order they appear in the column. All transparent PNGs, so they sit
// straight on the lime tile. Folder names carry the client's numbering
// (image 37-56 run tab 1 -> tab 5); the export names below say what each
// one actually is.
import productInverter from '../assets/Tabs/tab1 img/image 37.png'
import productTractionMotor from '../assets/Tabs/tab1 img/image 38.png'
import productBms from '../assets/Tabs/tab1 img/image 39.png'
import productVcu from '../assets/Tabs/tab1 img/image 40.png'

import productVehicleComputingUnit from '../assets/Tabs/tab2 img/image 41.png'
import productDomainController from '../assets/Tabs/tab2 img/image 42.png'
import productCloudIntegration from '../assets/Tabs/tab2 img/image 43.png'
import productCybersecurity from '../assets/Tabs/tab2 img/image 44.png'

import productIndustrialRobotics from '../assets/Tabs/tab3 img/image 45.png'
import productMachineVision from '../assets/Tabs/tab3 img/image 46.png'
import productAgvAmr from '../assets/Tabs/tab3 img/image 47.png'
import productSmartFactory from '../assets/Tabs/tab3 img/image 48.png'

import productRuggedCompute from '../assets/Tabs/tab4 img/image 49.png'
import productDefenceAvionics from '../assets/Tabs/tab4 img/image 50.png'
import productSurveillanceComms from '../assets/Tabs/tab4 img/image 51.png'
import productSafetyCriticalControl from '../assets/Tabs/tab4 img/image 52.png'

import productCloudEngineering from '../assets/Tabs/tab 5 img/image 53.png'
import productDataPlatforms from '../assets/Tabs/tab 5 img/image 54.png'
import productAiMl from '../assets/Tabs/tab 5 img/image 55.png'
import productDigitalEngineering from '../assets/Tabs/tab 5 img/image 56.png'

// Customer logos (marquee under the hero) ------------------------------
import logoZf from '../assets/zf-logo-std-blue3-cc1.svg'
import logoUltraviolette from '../assets/group1.svg'
import logoRiver from '../assets/blueriverlogo1.svg'
import logoRehlko from '../assets/group2.svg'
import logoRoyalEnfield from '../assets/group3.svg'
import logoHeroMotoCorp from '../assets/group4.svg'
import logoBajaj from '../assets/layer1.svg'
import logoTvsMotor from '../assets/tvs-motors-seeklogo1.svg'
import logoGenerac from '../assets/generac-power-systems-logo1.webp'
import logoPiaggio from '../assets/group6.svg'
import logoGreavesCotton from '../assets/greaves-cotton287098336212081.webp'
import logoPolaris from '../assets/group7.svg'
import logoLombardini from '../assets/lombardini1.webp'

// Who we are ----------------------------------------------------------
import facilityAerial from '../assets/rectangle5.webp'
// Home3 only. Replaces the aerial campus shot above, which the 16 Sep
// review ruled out along with all other plant and factory imagery — the
// division sells software and services, and hardware photography sends the
// wrong signal. Same 1.756 aspect and the same transparent notch across the
// top-left corner, so it drops into the existing layout unchanged.
// `facilityAerial` stays exactly as it is for Home, NewHome and Home2.
//
// 24 Sep: relit version supplied, same scene on a pale mint ground instead
// of near-black. Pixel-identical geometry — 1257x716, and the transparent
// notch measures 601x269 in both — so it is a straight swap with no layout
// change. New filename rather than an overwrite of abtimg.webp: replacing
// artwork in place leaves the old copy cached under the unchanged URL,
// which is exactly what went wrong on the Solutions cards.
//
// 30 Sep: replaced again — e-motor, controllers and a board in front of an
// engineering building, with a vehicle HUD, and a tank and aircraft in the
// distance, so all three sectors are in frame. Same 1257x716 and the same
// 601x269 notch; new filename for the same caching reason.
//
// 13 Oct: replaced again — the same e-motor, controllers and HUD, now with
// a scooter, car, truck, loader, tank and military tanker lined up in front
// of the mountains. Same 1257x716 and notch; new filename again.
import aboutEngineering from '../assets/about-mobility-sectors.webp'

// Hero strategic-investment card (13 Oct). The BAT mark is the supplied 88px
// tile; the flag map is an outline traced to SVG and filled with the flag
// stripes, so it stays crisp at any size.
import logoBat from '../assets/logo-bat.webp'
import germanyFlagMap from '../assets/germany-flag-map.svg'

// About page "Who we are" (13 Oct): the full-frame version of the
// homepage About composite, without the corner notch. 1600px wide.
import aboutWhoWeAre from '../assets/about-who-we-are.webp'

// Group-company marks for the About page ecosystem grid (14 Oct), cropped
// from the client's group slide — low-resolution stand-ins (about 2x their
// display size) until the companies' own logo files are supplied.
import logoLucasIndianService from '../assets/logo-lucas-indian-service.webp'
import logoDelphiTvs from '../assets/logo-delphi-tvs.webp'
import logoIndeon from '../assets/logo-indeon.webp'

// Products delivered through the engineering service offerings (14 Oct),
// cropped from the client's product sheet and set on 640x480 plates of
// each photo's own background.
import svcBms from '../assets/ServiceProducts/bms.webp'
import svcDcDc from '../assets/ServiceProducts/dc-dc-converter.webp'
import svcObc from '../assets/ServiceProducts/onboard-charger.webp'
import svcInverter from '../assets/ServiceProducts/traction-inverter.webp'
import svcMotorController from '../assets/ServiceProducts/integrated-motor-controller.webp'
import svcVcu from '../assets/ServiceProducts/vehicle-control-unit.webp'

// Defence & Aerospace › "Defence Electronics" solution photo (14 Oct).
import defenceElectronics from '../assets/defence-electronics.webp'
// …and "Digital Defence Technologies" (14 Oct).
import defenceDigital from '../assets/defence-digital.webp'
// Automotive › "Connectivity & Digital Solutions" (15 Oct).
import automotiveConnectivity from '../assets/automotive-connectivity.webp'

// Home3 solutions CTA background (14 Oct): transparent EV on the right,
// pale waves on the left where the copy sits.
import solutionsCtaBg from '../assets/solutions-cta-bg.webp'

// Home3 hero slide-card thumbnails (14 Oct), cropped from the client's
// slider reference and exported at 240x180 (2x their 120x90 slot).
import heroThumbEmbeddedSoftware from '../assets/HeroSlides/embedded-software.webp'
import heroThumbPowerElectronics from '../assets/HeroSlides/power-electronics.webp'
import heroThumbDigitalElectronics from '../assets/HeroSlides/digital-electronics.webp'
import heroThumbProductDevelopment from '../assets/HeroSlides/product-development.webp'
import heroThumbEngineeringServices from '../assets/HeroSlides/engineering-services.webp'
// …and their full-bleed backdrops (15 Oct), supplied by the client.
import heroBgEmbeddedSoftware from '../assets/HeroSlides/bg-embedded-software.webp'
import heroBgPowerElectronics from '../assets/HeroSlides/bg-power-electronics.webp'
import heroBgDigitalElectronics from '../assets/HeroSlides/bg-digital-electronics.webp'
import heroBgProductDevelopment from '../assets/HeroSlides/bg-product-development.webp'
import heroBgEngineeringServices from '../assets/HeroSlides/bg-engineering-services.webp'
// Looping backdrop clips (15 Oct, supplied) — added one slide at a time;
// a slide without one keeps its still above.
import heroVideoEmbeddedSoftware from '../assets/HeroSlides/embedded-software.mp4'
import heroVideoPowerElectronics from '../assets/HeroSlides/power-electronics.mp4'
import heroVideoEngineeringServices from '../assets/HeroSlides/engineering-services.mp4'
import heroVideoDigitalElectronics from '../assets/HeroSlides/digital-electronics.mp4'
import heroVideoProductDevelopment from '../assets/HeroSlides/product-development.mp4'

// Focus-area grid — Home3's bento section under Engineering Services.
// Artwork only: each file is the illustration cropped out of the client's
// 19 Sep reference, with the baked-in headings left behind so the card
// titles can be live, editable markup instead of pixels.
import focusGridElectrification from '../assets/FocusGrid/electrification.webp'
import focusGridElectrification2 from '../assets/FocusGrid/electrification2.webp'
import industrialBessEnergy from '../assets/Industrial/bess-energy-management-v2.webp'
import focusGridSoftwareDefined from '../assets/FocusGrid/software-defined.webp'
import focusGridAutomation from '../assets/FocusGrid/automation.webp'
// 30 Sep: the all-terrain vehicle shot replaced with a supplied main battle
// tank on a shoreline, a warship and a drone beyond. Resized from 1536 to
// 1000 wide (the card shows ~405px); new filename so no stale cached copy.
import focusGridMissionCritical from '../assets/FocusGrid/mission-critical-tank.webp'
import focusGridAiDigital from '../assets/FocusGrid/ai-digital.webp'

// Solutions finder — Home3's 4-tab "What are you looking for?" section.
// Artwork only, cropped out of the client's 22 Sep reference screens: the
// headings, badges, category labels and the globe's sector legend were all
// left behind so they can be live markup rather than pixels.
// Products: the client's 22 Sep full-resolution cutaway, which superseded
// the low-resolution crop taken from the reference screen.
import solutionsBgVehicle from '../assets/Solutions/bg-vehicle.webp'
// Engineering Services has its own backdrop again (supplied 22 Sep): the
// exploded assemblies, board, car body, plant and aircraft together say
// "across all three sectors" in a way the vehicle alone did not.
import solutionsBgServices from '../assets/Solutions/bg-engineering-stack.webp'
import solutionsBgTechnologies from '../assets/Solutions/bg-silicon-stack.webp'
import solutionsBgIndustry from '../assets/Solutions/bg-connected-globe.webp'
// 30 Sep: pale mint waves behind the Solutions finder's panel, all four tabs.
import solutionsPanelWaves from '../assets/Solutions/bg-waves.webp'

// Contact — "Other ways to reach us" (1 Oct). The photograph half of each
// card, cropped from the client's reference: the baked-in headings, copy
// and links were left behind so the card text stays live.
import reachEngineering from '../assets/Contact/reach-engineering.webp'
import reachCareers from '../assets/Contact/reach-careers.webp'
import reachMedia from '../assets/Contact/reach-media.webp'

import productAcGenerator from '../assets/Solutions/Products/ac-generator.webp'
import productIsgController from '../assets/Solutions/Products/isg-controller.webp'
import productIgnitionCoils from '../assets/Solutions/Products/ignition-coils.webp'
import productInverterShot from '../assets/Solutions/Products/inverter.webp'
import productTractionMotorShot from '../assets/Solutions/Products/traction-motor.webp'
import productBmsShot from '../assets/Solutions/Products/bms.webp'
import productReductionGear from '../assets/Solutions/Products/reduction-gear.webp'
import productBatteryCooling from '../assets/Solutions/Products/battery-cooling.webp'

import techElectrification from '../assets/Solutions/tech-electrification.webp'
import techSoftwareDefined from '../assets/Solutions/tech-software-defined.webp'
import techAutomation from '../assets/Solutions/tech-automation.webp'
import techMissionCritical from '../assets/Solutions/tech-mission-critical.webp'
import techAiDigital from '../assets/Solutions/tech-ai-digital.webp'

import programmeElectrifiedPowertrain from '../assets/Solutions/prog-electrified-powertrain.webp'
import programmeVehicleControlUnits from '../assets/Solutions/prog-vehicle-control-units.webp'
import programmeValidationHomologation from '../assets/Solutions/prog-validation-homologation.webp'

// Industries we serve --------------------------------------------------
import industryTwoThreeWheeler from '../assets/rectangle13.webp'
import industryPassenger from '../assets/rectangle8.webp'
import industryCommercial from '../assets/rectangle12.webp'
import industryIndustrial from '../assets/rectangle14.webp'

// Industries we serve — three sectors -----------------------------------
import sectorAutomotive from '../assets/1sectors.png'
import sectorIndustrial from '../assets/2sectors.png'
import sectorDefenceAerospace from '../assets/3sectors.png'

// Header mega menu — the same three sector photographs as 800px WebP
// thumbnails (~50 KB each, against ~2.3 MB for the PNGs above), since the
// menu sits in the header of every page.
import menuSectorAutomotive from '../assets/Menu/menu-sector-automotive.webp'
import menuSectorIndustrial from '../assets/Menu/menu-sector-industrial.webp'
import menuSectorDefenceAerospace from '../assets/Menu/menu-sector-defence-aerospace.webp'

// Solution showcase (drones) ------------------------------------------
import solutionShowcase from '../assets/background.webp'
import tabEv from '../assets/chat-gpt-image-aug62026084046-pm1.webp'
import tabEnvironment from '../assets/chat-gpt-image-aug62026084425-pm1.webp'
import tabAutomotive from '../assets/chat-gpt-image-aug62026084659-pm1.webp'
import tabIndustrial from '../assets/chat-gpt-image-aug62026085012-pm1.webp'
import tabConsumer from '../assets/chat-gpt-image-aug62026085929-pm1.webp'

// Focus areas — Electrification & Powertrain (Home2 only) --------------
import focusAreasElectrificationPowertrain from '../assets/focus-areas-electrification-powertrain.png'

// Our Engineering Approach (Home2 only) ---------------------------------
import approachBackdrop from '../assets/Group 1000002316.png'

// One Integrated Engineering Stack (Home2 only) -------------------------
// `software.png` is the original flat artwork (text baked in); the section
// is now built from live markup over this backdrop instead.
import integratedStack from '../assets/software.png'
import integratedStackBackdrop from '../assets/Background (5).png'

// Research & development ----------------------------------------------
import rndFeature from '../assets/rectangle23.webp'
import iconProductEngineering from '../assets/chat-gpt-image-aug62026104324-pm1.webp'
import iconPrototype from '../assets/chat-gpt-image-aug62026104328-pm1.webp'
import iconSmartManufacturing from '../assets/chat-gpt-image-aug62026104333-pm1.webp'
import iconFutureTech from '../assets/chat-gpt-image-aug62026104336-pm1.webp'

// Global presence ------------------------------------------------------
import worldMap from '../assets/background1.webp'
import flagNp from '../assets/flag-np.svg'
import flagTr from '../assets/flag-tr.svg'
import flagSi from '../assets/flag-si.svg'
import flagJp from '../assets/flag-jp.svg'
import flagZa from '../assets/flag-za.svg'
import flagIt from '../assets/flag-it.svg'
import flagVn from '../assets/flag-vn.svg'
import flagUs from '../assets/flag-us.svg'
import flagTh from '../assets/flag-th.svg'
import flagLk from '../assets/flag-lk.svg'
import flagBd from '../assets/flag-bd.svg'
import flagCn from '../assets/flag-cn.svg'

// Awards ---------------------------------------------------------------
import awardsBackdrop from '../assets/rectangle9986.webp'
import awardGreatPlaceToWork from '../assets/image34.webp'
import awardDeming from '../assets/image35.webp'
import awardAcma from '../assets/image36.webp'

// Why choose us --------------------------------------------------------
import whyFeature from '../assets/WhyChoose/why-lifecycle-v2.webp'
import whyQualityFirst from '../assets/WhyChoose/why-domain-expertise-v2.webp'
import whyEngineeringExcellence from '../assets/WhyChoose/why-product-engineering-v2.webp'
import whyGlobalPerspective from '../assets/WhyChoose/why-hardware-software-v2.webp'
import whySustainableMobility from '../assets/WhyChoose/why-future-ready-v2.webp'

// Sustainability & careers --------------------------------------------
import windFarm from '../assets/rectangle10002.webp'
import careersBackdrop from '../assets/rectangle10006.webp'
// Home3 only. The 22 Sep reference replaces the full-bleed campus photo
// with a split layout, so this is the right-hand scene cropped out of it:
// the engineer and her holographic HUD, clear of the reference's own copy
// on the left and its PEOPLE / IDEAS block on the right, both of which are
// live markup in the component.
import careersScene from '../assets/Careers/careers-scene.webp'
// Careers — "Why join us" cards (1 Oct), cropped from the client's
// reference. The arrow, icon tile and title baked into each were painted
// out of the crop; the page draws live ones back in the same places.
import whyImpact from '../assets/Careers/why-impact.webp'
import whyExperts from '../assets/Careers/why-experts.webp'
import whyCareer from '../assets/Careers/why-career.webp'
import whyTomorrow from '../assets/Careers/why-tomorrow.webp'

// Insights -------------------------------------------------------------
import insightFeature from '../assets/rectangle23.webp'
import insightTruck from '../assets/rectangle27.webp'
import insightCar from '../assets/rectangle28.webp'

export {
  logoLucasTvs,
  logoLucasTvsFooter,
  logoInel,
  heroBackdrop,
  heroArmMotion,
  heroSlideAutomotive,
  heroSlideIndustrial,
  heroSlideDefenceAerospace,
  heroSlideIndustrialHome3,
  heroSlideDefenceAerospaceHome3,
  focusElectrification,
  focusSoftwareDefined,
  focusAutomation,
  focusMissionCritical,
  focusAiDigital,
  productInverter,
  productTractionMotor,
  productBms,
  productVcu,
  productVehicleComputingUnit,
  productDomainController,
  productCloudIntegration,
  productCybersecurity,
  productIndustrialRobotics,
  productMachineVision,
  productAgvAmr,
  productSmartFactory,
  productRuggedCompute,
  productDefenceAvionics,
  productSurveillanceComms,
  productSafetyCriticalControl,
  productCloudEngineering,
  productDataPlatforms,
  productAiMl,
  productDigitalEngineering,
  logoZf,
  logoUltraviolette,
  logoRiver,
  logoRehlko,
  logoRoyalEnfield,
  logoHeroMotoCorp,
  logoBajaj,
  logoTvsMotor,
  logoGenerac,
  logoPiaggio,
  logoGreavesCotton,
  logoPolaris,
  logoLombardini,
  facilityAerial,
  aboutEngineering,
  logoBat,
  germanyFlagMap,
  aboutWhoWeAre,
  logoLucasIndianService,
  logoDelphiTvs,
  logoIndeon,
  svcBms,
  svcDcDc,
  svcObc,
  svcInverter,
  svcMotorController,
  svcVcu,
  defenceElectronics,
  defenceDigital,
  automotiveConnectivity,
  solutionsCtaBg,
  heroThumbEmbeddedSoftware,
  heroThumbPowerElectronics,
  heroThumbDigitalElectronics,
  heroThumbProductDevelopment,
  heroThumbEngineeringServices,
  heroBgEmbeddedSoftware,
  heroBgPowerElectronics,
  heroBgDigitalElectronics,
  heroBgProductDevelopment,
  heroBgEngineeringServices,
  heroVideoEmbeddedSoftware,
  heroVideoPowerElectronics,
  heroVideoEngineeringServices,
  heroVideoDigitalElectronics,
  heroVideoProductDevelopment,
  focusGridElectrification,
  focusGridElectrification2,
  industrialBessEnergy,
  focusGridSoftwareDefined,
  focusGridAutomation,
  focusGridMissionCritical,
  focusGridAiDigital,
  solutionsBgVehicle,
  solutionsBgServices,
  solutionsBgTechnologies,
  solutionsBgIndustry,
  solutionsPanelWaves,
  reachEngineering,
  reachCareers,
  reachMedia,
  productAcGenerator,
  productIsgController,
  productIgnitionCoils,
  productInverterShot,
  productTractionMotorShot,
  productBmsShot,
  productReductionGear,
  productBatteryCooling,
  techElectrification,
  techSoftwareDefined,
  techAutomation,
  techMissionCritical,
  techAiDigital,
  programmeElectrifiedPowertrain,
  programmeVehicleControlUnits,
  programmeValidationHomologation,
  industryTwoThreeWheeler,
  industryPassenger,
  industryCommercial,
  industryIndustrial,
  sectorAutomotive,
  sectorIndustrial,
  sectorDefenceAerospace,
  menuSectorAutomotive,
  menuSectorIndustrial,
  menuSectorDefenceAerospace,
  solutionShowcase,
  tabEv,
  tabEnvironment,
  tabAutomotive,
  tabIndustrial,
  tabConsumer,
  focusAreasElectrificationPowertrain,
  approachBackdrop,
  integratedStack,
  integratedStackBackdrop,
  rndFeature,
  iconProductEngineering,
  iconPrototype,
  iconSmartManufacturing,
  iconFutureTech,
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
  awardsBackdrop,
  awardGreatPlaceToWork,
  awardDeming,
  awardAcma,
  whyFeature,
  whyQualityFirst,
  whyEngineeringExcellence,
  whyGlobalPerspective,
  whySustainableMobility,
  windFarm,
  careersBackdrop,
  careersScene,
  whyImpact,
  whyExperts,
  whyCareer,
  whyTomorrow,
  insightFeature,
  insightTruck,
  insightCar,
}
