import { useState, useEffect, useRef } from "react";

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  const mobileSet = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    // Listen to resize/orientation event
    const handleMatchChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Update state based on breakpoint
    if (!mobileSet.current) {
      setIsMobile(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleMatchChange);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMatchChange);
      mobileSet.current = true;
    }
  }, [breakpoint]);

  return isMobile;
}
