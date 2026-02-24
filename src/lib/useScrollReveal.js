import { useEffect } from "react";

/**
 * Attaches IntersectionObserver to all elements with
 * data-reveal attribute and triggers reveal animations.
 * Uses the snap-container as the scroll root so reveals
 * fire correctly when sections snap into view.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Wait a tick so snap-container is mounted
    const init = () => {
      const container = document.querySelector(".snap-container");
      const elements = document.querySelectorAll("[data-reveal]");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: container || null,
          threshold: 0.1,
          rootMargin: "0px 0px -20px 0px",
        }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };

    const cleanup = init();
    return cleanup;
  }, []);
}
