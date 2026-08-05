import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

// One shared context per page-load; every section pushes its ScrollTriggers/
// tweens into it via gsap.context so a single revert() on Astro page swap
// tears everything down cleanly (no leaked ScrollTriggers, no duplicate
// listeners when View Transitions re-run inline scripts).
let ctx: gsap.Context | null = null;

export function withGsapContext(scope: Document | Element, fn: (self: gsap.Context) => void) {
  ctx?.revert();
  ctx = gsap.context(fn, scope as Element);
  return ctx;
}

export function killGsapContext() {
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

document.addEventListener('astro:before-swap', killGsapContext);

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Batches every [data-reveal] element inside `root` into a staggered
 * fade/rise-in that fires once when it enters the viewport. Elements can
 * opt into a custom stagger group via [data-reveal-group="name"] and a
 * custom delay via [data-reveal-delay="0.1"].
 */
export function reveal(root: ParentNode = document) {
  if (reducedMotion()) {
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const groups = new Map<string, HTMLElement[]>();
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const key = el.dataset.revealGroup ?? el.closest('[data-section]')?.getAttribute('data-section') ?? 'default';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(el);
  });

  groups.forEach((els) => {
    ScrollTrigger.batch(els, {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.09,
          onComplete: () => batch.forEach((el) => el.classList.add('is-visible')),
        });
      },
    });
  });
}

/**
 * "Curtain" section transition: pins `outgoing` in place while `incoming`'s
 * own scroll motion carries it up over the pinned section, covering it.
 * Plain ScrollTrigger.create (not gsap.context) so it survives independently
 * of any section's own withGsapContext() calls; killGsapContext() on
 * astro:before-swap still tears it down via ScrollTrigger.getAll().
 */
export function curtainTransition(outgoing: Element, incoming: Element) {
  if (reducedMotion()) return null;
  return ScrollTrigger.create({
    trigger: incoming,
    start: 'top bottom',
    end: 'top top',
    pin: outgoing,
    pinSpacing: false,
  });
}

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin };
