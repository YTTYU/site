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

document.addEventListener('astro:before-swap', destroyLenis);
