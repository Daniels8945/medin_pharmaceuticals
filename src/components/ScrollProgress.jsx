import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [navHeight, setNavHeight] = useState(65);

  useEffect(() => {
    // Measure header height and keep it updated via ResizeObserver
    const header = document.querySelector("header");
    if (header) {
      setNavHeight(header.offsetHeight);
      const ro = new ResizeObserver(() => setNavHeight(header.offsetHeight));
      ro.observe(header);
      return () => ro.disconnect();
    }
  }, []);

  useEffect(() => {
    let container = document.querySelector(".snap-container");

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const total = scrollHeight - clientHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };

    // If container isn't mounted yet, retry after a frame
    if (!container) {
      const raf = requestAnimationFrame(() => {
        container = document.querySelector(".snap-container");
        if (container) {
          container.addEventListener("scroll", onScroll, { passive: true });
        }
      });
      return () => cancelAnimationFrame(raf);
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: `${navHeight}px`,
        left: 0,
        height: "3px",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #22c55e 0%, #86efac 50%, #22c55e 100%)",
        boxShadow: "0 0 10px 2px #22c55e77",
        zIndex: 49,
        transition: "width 0.12s linear, top 0.2s ease",
        pointerEvents: "none",
      }}
    />
  );
}

export default ScrollProgress;