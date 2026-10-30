"use client";

import React, { useEffect, useId, useMemo, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppLink } from "@/components/AppLink";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

const DESKTOP_WIDTH = 1200;
const TABLET_MIN_WIDTH = 768;

/**
 * Ceiling on the card's share of the viewport. `factor` only shrinks the
 * layout below DESKTOP_WIDTH, so a card sized for a wide design would sit
 * at full size on a 1280px laptop — where the orbit parks it right of centre
 * and the section's `overflow-hidden` would cut its right edge off. The cap
 * is applied to width and height together, so the aspect ratio holds, and it
 * only binds for cards large relative to the viewport (the default 205-240px
 * card never reaches it).
 */
const MAX_CARD_VW = 34;

const DEPTH_MIN = -1;
const DEPTH_MAX = 1;
const Z_INDEX_MIN = 1;

gsap.registerPlugin(ScrollTrigger);

function wrapProgress(value: number) {
  let wrappedValue = value % 1;

  if (wrappedValue < 0) {
    wrappedValue += 1;
  }

  return wrappedValue;
}

function getCircularPosition(
  progress: number,
  radiusX: number,
  radiusY: number,
  angleOffset = 0
) {
  const angle = progress * Math.PI * 2 + angleOffset;

  return {
    angle,
    x: Math.sin(angle) * radiusX,
    y: Math.cos(angle) * radiusY,
    verticalDepth: Math.cos(angle),
    horizontalDepth: Math.sin(angle),
  };
}

function getStrength(value: number) {
  return gsap.utils.clamp(
    0,
    1,
    gsap.utils.mapRange(DEPTH_MIN, DEPTH_MAX, 0, 1, value)
  );
}

function shapeFocus(strength: number, start = 0.42, power = 2.8) {
  const normalized = gsap.utils.clamp(0, 1, (strength - start) / (1 - start));
  return Math.pow(normalized, power);
}

export interface CircularSplitRollItem {
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  alt?: string;
  /** Skip the caption drawn over/under the image — use when the image already bakes its own title & description in. */
  hideCaption?: boolean;
  /** Makes the card a link — a route ("/industries/automotive") or a URL. Items without one render exactly as before. */
  href?: string;
}

/**
 * Wraps a card in a link when its item has an `href`; otherwise returns the
 * card untouched, so consumers that pass no links get the same markup they
 * always did.
 *
 * `focusable={false}` is for the animated copy of the cards, which sits in
 * an `aria-hidden` subtree: a link there must stay out of the tab order.
 * Keyboard and screen-reader users reach the same pages through the grid
 * copy below it, which is what assistive tech reads at every width.
 */
function CardLink({
  href,
  label,
  className,
  focusable = true,
  children,
}: {
  href?: string;
  label?: string;
  className: string;
  focusable?: boolean;
  children: ReactNode;
}) {
  if (!href) return <>{children}</>;
  return (
    <AppLink href={href} aria-label={label} tabIndex={focusable ? undefined : -1} className={className}>
      {children}
    </AppLink>
  );
}

interface CircularSplitRollCompProps {
  items: CircularSplitRollItem[];
  className?: string;
  /** Optional background override. Falls back to the theme `bg-background`. */
  background?: string;
  /** Optional title color override. Falls back to the theme `text-foreground`. */
  titleColor?: string;
  /** CSS height of the pinned viewport (and the section's min-height). Defaults to a full screen. */
  viewportHeight?: string;
  /** Content pinned above the two columns for the whole scroll — stays on screen the entire time, unlike a heading placed outside this component. */
  header?: ReactNode;
  sectionHeight?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
  titleSize?: string;
  /** CSS width of the title/description text column. Must be a fixed unit (px/rem), not %. */
  textWidth?: string;
  pinSpacing?: boolean;
  scrub?: number;
  textCenterScale?: number;
  textSideScale?: number;
  textCenterOpacity?: number;
  textSideOpacity?: number;
  imageCenterScale?: number;
  imageSideScale?: number;
  imageCenterOpacity?: number;
  imageSideOpacity?: number;
  textFocusStart?: number;
  textFocusPower?: number;
  imageFocusStart?: number;
  imageFocusPower?: number;
  /** Angle (radians) on the circle where a title comes into focus. */
  leftAngleOffset?: number;
  /** Angle (radians) on the circle where an image comes into focus. */
  rightAngleOffset?: number;
  /** Which item sits on the focus arc, in item-fractions. 0.5 = between two, 0 = on one. */
  focusPhase?: number;
  /** How much of a full revolution the pinned scroll covers. Defaults to 1 —
   *  a complete turn, which lands the last item back on the one that was in
   *  focus when the section pinned, so the final stretch of scroll repeats a
   *  frame the visitor has already seen.
   *
   *  Set it to `(items - 1) / items` to stop on the LAST item instead: with
   *  three items that is 2/3, giving item3 -> item1 -> item2 and releasing
   *  the pin there, with no wrap back. Any fraction works; values above 1
   *  spin through the set more than once. */
  rotationTurns?: number;
  /** Max z-index applied to the focused title / image (depth stacking). */
  leftDepthMax?: number;
  rightDepthMax?: number;
  /** Column horizontal offset: translateX(calc(<columnSpreadVw>vw - <columnOffsetPx>px)). */
  columnSpreadVw?: number;
  columnOffsetPx?: number;
  gridImageClassName?: string;
  gridCardClassName?: string;
  gridTitleClassName?: string;
  /**
   * Layout of the static fallback grid shown below 1025px (and under
   * reduced motion). "grid" (default) is the original square-card grid —
   * 3 across, 2 on a phone. "stack" (24 Oct, Home3) is one card per row on
   * a phone and three across from md: landscape photo cards with the title,
   * line and an arrow laid over a bottom scrim.
   */
  gridLayout?: "grid" | "stack";
  /** Extra classes for the chevron badge on each image card — the badge and
   *  its glyph share `currentColor`, so `hover:`/`group-hover:` utilities
   *  here recolour both. */
  cardIconClassName?: string;
  /** Draws a decorative orbit ring (dotted outer circle, segmented gradient
   *  arcs and a dot per item) behind the left text column, brightening the
   *  dot for whichever item is currently in focus. Off by default. */
  showOrbitRing?: boolean;
  orbitRingSize?: number;
  orbitRingRadius?: number;
  orbitDotRadius?: number;
  /** Slides the whole ring (arcs + dots) horizontally from the text column's
   *  orbit centre. That centre sits well left of the viewport edge, so
   *  without an offset the ring renders off-screen and its focused dot
   *  stops short of the title. Design-space px, scaled by the same factor
   *  as the radii. */
  orbitRingOffsetX?: number;
  orbitColorFrom?: string;
  orbitColorTo?: string;
}

function CircularSplitRollComp({
  items,
  className = "",
  background,
  titleColor,
  viewportHeight = "100vh",
  header,
  sectionHeight = 260,

  leftRadiusX = 220,
  leftRadiusY = 220,
  rightRadiusX = 400,
  rightRadiusY = 400,

  imageCardWidth = 190,
  imageCardHeight = 210,
  titleSize = "clamp(32px, 3.6vw, 64px)",
  textWidth = "26rem",

  pinSpacing = true,
  scrub = 1.2,

  textCenterScale = 1,
  textSideScale = 0.68,
  textCenterOpacity = 1,
  textSideOpacity = 0.18,

  imageCenterScale = 1,
  imageSideScale = 0.58,
  imageCenterOpacity = 1,
  imageSideOpacity = 0.14,

  textFocusStart = 0.42,
  textFocusPower = 2.6,
  imageFocusStart = 0.45,
  imageFocusPower = 3.2,

  leftAngleOffset = Math.PI,
  rightAngleOffset = 0,
  focusPhase = 0.5,
  rotationTurns = 1,
  leftDepthMax = 30,
  rightDepthMax = 40,
  columnSpreadVw = 5,
  columnOffsetPx = 500,

  gridImageClassName = "",
  gridCardClassName = "",
  gridTitleClassName = "",
  gridLayout = "grid",
  cardIconClassName = "",

  showOrbitRing = false,
  orbitRingSize = 320,
  orbitRingRadius = 130,
  orbitDotRadius = 150,
  orbitRingOffsetX = 0,
  orbitColorFrom = "#1d7a32",
  orbitColorTo = "#238f38",
}: CircularSplitRollCompProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  // SVG ids are document-global, so two instances on one page would otherwise
  // share (and fight over) the same gradient.
  const orbitGradientId = `orbit-ring-${useId().replace(/:/g, "")}`;

  const safeItems = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id ?? index,
      title: item.title ?? `Item ${index + 1}`,
      description: item.description ?? "",
      image: item.image ?? "",
      alt: item.alt ?? item.title ?? `Item ${index + 1}`,
      hideCaption: item.hideCaption ?? false,
      href: item.href,
    }));
  }, [items]);

  useEffect(() => {
    if (!rootRef.current || !stickyRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const leftNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__left-item"
        ) as HTMLElement[];
        const rightNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__right-item"
        ) as HTMLElement[];
        const ringDotNodes = gsap.utils.toArray(
          ".circular-scroll-showcase__ring-dot"
        ) as HTMLElement[];

        const total = safeItems.length;

        if (!total) return;

        gsap.set([...leftNodes, ...rightNodes], { opacity: 1 });

        const render = (scrollProgress: number) => {
          progressRef.current = scrollProgress;

          const width =
            typeof window !== "undefined" ? window.innerWidth : DESKTOP_WIDTH;

          let factor = 1;

          if (width < DESKTOP_WIDTH && width >= TABLET_MIN_WIDTH) {
            factor = width / DESKTOP_WIDTH;
          }

          const leftRadiusScaledX = leftRadiusX * factor;
          const leftRadiusScaledY = leftRadiusY * factor;
          const rightRadiusScaledX = rightRadiusX * factor;
          const rightRadiusScaledY = rightRadiusY * factor;

          if (rootRef.current) {
            const cardRatio = imageCardHeight / imageCardWidth;

            rootRef.current.style.setProperty(
              "--css-card-width",
              `min(${imageCardWidth * factor}px, ${MAX_CARD_VW}vw)`
            );

            rootRef.current.style.setProperty(
              "--css-card-height",
              `min(${imageCardHeight * factor}px, ${MAX_CARD_VW * cardRatio}vw)`
            );

            // Scaled here rather than baked into the class so the ring keeps
            // the same relationship to the titles as they shrink on narrower
            // desktops.
            rootRef.current.style.setProperty(
              "--css-orbit-offset-x",
              `${orbitRingOffsetX * factor}px`
            );
          }

          // How far around the circle this scroll position has carried us.
          // `rotationTurns` of 1 is a full revolution over the pinned range
          // (the original behaviour); a smaller fraction stops the carousel
          // short of returning to its first frame.
          const spin = scrollProgress * rotationTurns;

          leftNodes.forEach((node, index) => {
            const localProgress = wrapProgress(index / total - spin + focusPhase / total);

            const position = getCircularPosition(
              localProgress,
              leftRadiusScaledX,
              leftRadiusScaledY,
              leftAngleOffset
            );

            const rawStrength = getStrength(position.horizontalDepth);
            const focusStrength = shapeFocus(
              rawStrength,
              textFocusStart,
              textFocusPower
            );

            const scale = gsap.utils.interpolate(
              textSideScale,
              textCenterScale,
              focusStrength
            );

            const opacity = gsap.utils.interpolate(
              textSideOpacity,
              textCenterOpacity,
              focusStrength
            );

            const zIndex = Math.round(
              gsap.utils.interpolate(Z_INDEX_MIN, leftDepthMax, focusStrength)
            );

            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale,
              opacity,
              zIndex,
              transformOrigin: "50% 50%",
            });

            const ringDot = ringDotNodes[index];
            if (ringDot) {
              // Same angle/progress as the title itself, just traced at the
              // ring's own (smaller) radius — so the dot always orbits to
              // sit right next to whichever title is currently in focus,
              // instead of parking at a fixed spot on the ring.
              const ringRadiusScaled = orbitDotRadius * factor;
              const ringPosition = getCircularPosition(
                localProgress,
                ringRadiusScaled,
                ringRadiusScaled,
                leftAngleOffset
              );

              gsap.set(ringDot, {
                xPercent: -50,
                yPercent: -50,
                x: ringPosition.x,
                y: ringPosition.y,
                scale: gsap.utils.interpolate(0.55, 1, focusStrength),
                opacity: gsap.utils.interpolate(0.4, 1, focusStrength),
                filter: `drop-shadow(0 0 ${gsap.utils.interpolate(0, 10, focusStrength)}px rgba(29,122,50,${gsap.utils.interpolate(0, 0.85, focusStrength)}))`,
              });
            }
          });

          rightNodes.forEach((node, index) => {
            const localProgress = wrapProgress(index / total - spin + focusPhase / total);

            const position = getCircularPosition(
              localProgress,
              rightRadiusScaledX,
              rightRadiusScaledY,
              rightAngleOffset
            );

            const rawStrength = getStrength(-position.horizontalDepth);
            const focusStrength = shapeFocus(
              rawStrength,
              imageFocusStart,
              imageFocusPower
            );

            const scale = gsap.utils.interpolate(
              imageSideScale,
              imageCenterScale,
              focusStrength
            );

            const opacity = gsap.utils.interpolate(
              imageSideOpacity,
              imageCenterOpacity,
              focusStrength
            );

            const zIndex = Math.round(
              gsap.utils.interpolate(Z_INDEX_MIN, rightDepthMax, focusStrength)
            );

            gsap.set(node, {
              x: position.x,
              y: position.y,
              scale,
              opacity,
              zIndex,
              transformOrigin: "50% 50%",
            });
          });
        };

        render(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: `+=${sectionHeight * safeItems.length}%`,
          pin: stickyRef.current,
          scrub,
          pinSpacing,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            render(self.progress);
          },
        });

        const onResize = () => {
          render(progressRef.current);
          scrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          scrollTrigger.kill();
        };
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [
    safeItems,
    scrub,
    pinSpacing,
    sectionHeight,
    leftRadiusX,
    leftRadiusY,
    rightRadiusX,
    rightRadiusY,
    imageCardWidth,
    imageCardHeight,
    textCenterScale,
    textSideScale,
    textCenterOpacity,
    textSideOpacity,
    imageCenterScale,
    imageSideScale,
    imageCenterOpacity,
    imageSideOpacity,
    textFocusStart,
    textFocusPower,
    imageFocusStart,
    imageFocusPower,
    leftAngleOffset,
    rightAngleOffset,
    focusPhase,
    rotationTurns,
    leftDepthMax,
    rightDepthMax,
    orbitDotRadius,
    orbitRingOffsetX,
  ]);

  return (
    <section
      ref={rootRef}
      className={`relative w-full overflow-clip ${background ? "" : "bg-background"} ${titleColor ? "" : "text-foreground"} ${className}`}
      style={{
        "--css-title-size": titleSize,
        "--css-card-width": `min(${imageCardWidth}px, ${MAX_CARD_VW}vw)`,
        "--css-card-height": `min(${imageCardHeight}px, ${(MAX_CARD_VW * imageCardHeight) / imageCardWidth}vw)`,
        minHeight: viewportHeight,
        ...(background ? { background } : null),
        ...(titleColor ? { color: titleColor } : null),
      } as React.CSSProperties & Record<string, string | number>}
    >
      <div
        ref={stickyRef}
        style={{ height: viewportHeight }}
        className={`relative flex w-full flex-col overflow-hidden ${reducedMotion ? "hidden" : "max-[1025px]:hidden"}`}
      >
        {header && <div className="relative z-10 shrink-0">{header}</div>}

        <div aria-hidden="true" className="relative w-full flex-1 overflow-hidden">
        <div className="relative mx-auto flex h-full w-full">
          <div
            className="relative flex h-full w-[40vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnSpreadVw}vw - ${columnOffsetPx}px))` }}
          >
            <div className="relative h-[92%]">
              {showOrbitRing && safeItems.length > 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2"
                  style={{
                    width: orbitRingSize,
                    height: orbitRingSize,
                    transform:
                      "translate(calc(-50% + var(--css-orbit-offset-x, 0px)), -50%)",
                  }}
                >
                  <svg
                    viewBox={`0 0 ${orbitRingSize} ${orbitRingSize}`}
                    className="absolute inset-0 h-full w-full"
                  >
                    <circle
                      cx={orbitRingSize / 2}
                      cy={orbitRingSize / 2}
                      r={orbitDotRadius}
                      fill="none"
                      stroke="rgba(35,143,56,0.35)"
                      strokeWidth={1.5}
                      strokeDasharray="1 7"
                    />
                    {/* One unbroken circle rather than an arc per item. The
                        segmented version left a gap between every sector —
                        with three items that was three 16deg breaks, so the
                        ring never read as a closed loop. The from/to colours
                        now run as a gradient around the stroke instead of
                        stepping once per segment, which also drops the seam
                        where two arcs of slightly different colour met. */}
                    <defs>
                      <linearGradient
                        id={orbitGradientId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={orbitColorFrom} />
                        <stop offset="100%" stopColor={orbitColorTo} />
                      </linearGradient>
                    </defs>
                    <circle
                      cx={orbitRingSize / 2}
                      cy={orbitRingSize / 2}
                      r={orbitRingRadius}
                      fill="none"
                      stroke={`url(#${orbitGradientId})`}
                      strokeWidth={3}
                    />
                  </svg>

                  {safeItems.map((item) => {
                    return (
                      <span
                        key={item.id}
                        className="circular-scroll-showcase__ring-dot pointer-events-none absolute left-1/2 top-1/2 grid place-items-center rounded-full bg-white opacity-0 will-change-[transform,opacity]"
                        style={{
                          width: 26,
                          height: 26,
                          boxShadow: "0 0 0 4px rgba(255,255,255,0.9)",
                        }}
                      >
                        <span
                          className="block rounded-full"
                          style={{ width: 12, height: 12, backgroundColor: orbitColorFrom }}
                        />
                      </span>
                    );
                  })}
                </div>
              )}

              {safeItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__left-item pointer-events-none absolute left-1/2 top-1/2 origin-center text-center opacity-0 will-change-[transform,opacity]"
                  style={{ width: textWidth }}
                >
                  <h3 className="whitespace-nowrap text-(length:--css-title-size,clamp(28px,3vw,56px)) font-medium leading-none tracking-[-0.04em]">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative flex h-full w-[40vw] items-center justify-center"
            style={{ transform: `translateX(calc(${columnOffsetPx}px - ${columnSpreadVw}vw))` }}
          >
            <div className="relative h-[92%]">
              {safeItems.map((item) => (
                <div
                  key={item.id}
                  className="circular-scroll-showcase__right-item absolute left-1/2 top-1/2 ml-[calc(var(--css-card-width,210px)*-0.5)] mt-[calc(var(--css-card-height,210px)*-0.5)] h-(--css-card-height,210px) w-(--css-card-width,210px) origin-center opacity-0 will-change-[transform,opacity]"
                >
                  <CardLink href={item.href} focusable={false} className="block h-full w-full">
                  <div className="group relative h-full w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_30px_60px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.16)]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="pointer-events-none block h-full w-full select-none object-cover absolute inset-0"
                      draggable="false"
                      loading="lazy"
                      decoding="async"
                    />

                    {/* The chevron inherits `currentColor`, so a consumer can
                        recolour badge and glyph together through
                        `cardIconClassName` without reaching into the svg. */}
                    <span
                      className={`absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-md transition-colors duration-300 ${cardIconClassName}`}
                    >
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M6 3l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    {/* Caption type scales with the card rather than being
                        pinned to 13/11px, so a larger card doesn't end up
                        with a caption that reads as a footnote. The clamp
                        floors bottom out at the previous fixed sizes, so the
                        default 205-240px card is unchanged. */}
                    {!item.hideCaption && (
                      <div className="absolute inset-x-2 bottom-2 rounded-[10px] bg-black/25 px-3 py-2.5 backdrop-blur-md">
                        <h4 className="text-[clamp(13px,calc(var(--css-card-width,210px)*0.032),20px)] leading-[1.2] font-medium text-white">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="mt-1 text-[clamp(11px,calc(var(--css-card-width,210px)*0.023),15px)] leading-[1.35] text-white/80">
                            {item.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  </CardLink>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {header && (
        // The pinned copy above lives inside a `max-[1025px]:hidden` (or, with
        // reduced motion, fully `hidden`) block, so it disappears exactly
        // where this plain copy needs to take over — never both at once.
        <div className={reducedMotion ? "block" : "hidden max-[1025px]:block"}>{header}</div>
      )}

      <div className={`w-full px-5 py-10 max-md:px-4 max-md:py-8 ${reducedMotion ? "block" : "sr-only max-[1025px]:not-sr-only max-[1025px]:block max-[1025px]:px-5 max-[1025px]:py-10 max-md:px-4 max-md:py-8"}`}>
        {gridLayout === "stack" ? (
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {safeItems.map((item) => (
            <article key={item.id} className={`w-full ${gridCardClassName}`}>
              <CardLink
                href={item.href}
                label={item.title}
                className="group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#238f38]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#1b1d1b] shadow-[0_14px_32px_rgba(0,0,0,0.18)] md:aspect-[4/5]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  {!item.hideCaption && (
                    <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 sm:p-5">
                      <div className="min-w-0 grow">
                        <h3 className={`font-display text-[22px] leading-[1.15] font-semibold tracking-[-0.01em] text-white ${gridTitleClassName}`}>
                          {item.title}
                        </h3>
                        {item.description ? (
                          <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-[1.45] text-white/80">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      {item.href ? (
                        <span
                          aria-hidden
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime text-white transition-transform duration-300 group-hover:translate-x-0.5"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                            <path d="M7 17 17 7M8 7h9v9" />
                          </svg>
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </CardLink>
            </article>
          ))}
        </div>
        ) : (
        <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-5 max-md:grid-cols-2 max-md:gap-4">
          {safeItems.map((item) => (
            <article
              key={item.id}
              className={`w-full ${gridCardClassName}`}
            >
              <CardLink
                href={item.href}
                label={item.title}
                className="block rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#238f38] max-md:rounded-[14px]"
              >
              <div
                className={`relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#f5f2eb] shadow-[0_18px_38px_rgba(0,0,0,0.28)] max-md:rounded-[14px] ${gridImageClassName}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="block h-full w-full object-cover absolute inset-0"
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {!item.hideCaption && (
                <>
                  <h3
                    className={`mt-3 text-center text-[clamp(18px,4vw,30px)] font-medium leading-none tracking-[-0.04em] text-foreground max-md:mt-2 max-md:text-[clamp(16px,5vw,24px)] ${gridTitleClassName}`}
                  >
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 text-center text-[14px] leading-[1.5] opacity-70">
                      {item.description}
                    </p>
                  ) : null}
                </>
              )}
              </CardLink>
            </article>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

export interface CircularSplitRollProps
  extends Omit<
    CircularSplitRollCompProps,
    "leftRadiusX" | "leftRadiusY" | "rightRadiusX" | "rightRadiusY" | "imageCardWidth" | "imageCardHeight"
  > {
  /** Sets all four arc radii at once (leftRadiusX/Y, rightRadiusX/Y). */
  radius?: number;
  /** Sets both card dimensions at once (imageCardWidth/Height). */
  cardSize?: number;
  leftRadiusX?: number;
  leftRadiusY?: number;
  rightRadiusX?: number;
  rightRadiusY?: number;
  imageCardWidth?: number;
  imageCardHeight?: number;
}

export default function CircularSplitRoll({
  items,
  radius = 500,
  cardSize = 205,
  sectionHeight = 100,
  leftRadiusX,
  leftRadiusY,
  rightRadiusX,
  rightRadiusY,
  imageCardWidth,
  imageCardHeight,
  ...rest
}: CircularSplitRollProps) {
  return (
    <CircularSplitRollComp
      items={items}
      sectionHeight={sectionHeight}
      leftRadiusX={leftRadiusX ?? radius}
      leftRadiusY={leftRadiusY ?? radius}
      rightRadiusX={rightRadiusX ?? radius}
      rightRadiusY={rightRadiusY ?? radius}
      imageCardWidth={imageCardWidth ?? cardSize}
      imageCardHeight={imageCardHeight ?? cardSize}
      {...rest}
    />
  );
}
