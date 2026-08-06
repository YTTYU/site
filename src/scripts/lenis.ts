import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap/core';

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function initLenis() {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);

  tickerFn = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis() {
  if (tickerFn) gsap.ticker.remove(tickerFn);
  lenis?.destroy();
  lenis = null;
  tickerFn = null;
}

export function getLenis() {
  return lenis;
}

let anchorNavBound = false;

/**
 * Astro's <ClientRouter/> intercepts same-page "#hash" link clicks as a
 * transition navigation and drops the hash in the process (the whole page
 * silently resets to scroll 0 instead of jumping to the section). Claim
 * these clicks in the capture phase — before ClientRouter's own bubble-phase
 * listener sees them — and scroll to the target ourselves.
 */
export function initAnchorNav() {
  if (anchorNavBound) return;
  anchorNavBound = true;

  document.addEventListener(
    'click',
    (e) => {
      const link = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute('href') ?? '';
      if (hash.length < 2) return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      e.preventDefault();
      e.stopPropagation();

      const offset = -76; // matches --nav-h fixed header height
      if (lenis) {
        lenis.scrollTo(target, { offset });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      history.pushState(null, '', hash);
    },
    true
  );
}

document.addEventListener('astro:before-swap', destroyLenis);


