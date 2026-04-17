import { useEffect } from "react";

/**
 * Attaches IntersectionObserver to all elements with
 * data-reveal attribute and triggers reveal animations.
 * Uses the viewport (root: null) so reveals fire correctly
 * with normal window scrolling.
 */
export function useScrollReveal() {
  useEffect(() => {
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
        root: null,        // viewport
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
