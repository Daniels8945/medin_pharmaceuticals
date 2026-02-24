import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Wraps any page in a fade-in transition.
 * Re-triggers every time the route changes.
 */
function PageTransition({ children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reset to hidden then immediately fade in
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        willChange: "opacity, transform",
        minHeight: "100%",
      }}
    >
      {children}
    </div>
  );
}

export default PageTransition;
