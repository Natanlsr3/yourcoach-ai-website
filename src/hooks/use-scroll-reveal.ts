import { useEffect, useRef } from "react";

/**
 * Observes a container and reveals children matching `selector`
 * with a fade-in + translateY(0) transition when they enter the viewport.
 *
 * Each child should start with opacity: 0 and transform: translateY(20px).
 */
export function useScrollReveal(
  selector: string,
  options: { threshold?: number; once?: boolean } = {},
) {
  const ref = useRef<HTMLElement | null>(null);
  const { threshold = 0.15, once = true } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (prefersReduced) {
              el.style.opacity = "1";
              el.style.transform = "none";
              el.style.transition = "none";
            } else {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }
            if (once) observer.unobserve(el);
          }
        });
      },
      { threshold },
    );

    container.querySelectorAll(selector).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, threshold, once]);

  return ref;
}
