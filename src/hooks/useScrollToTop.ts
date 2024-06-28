// hooks/useScrollToTop.ts
import { useState, useEffect, useRef } from "react";

const useScrollToTop = () => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      setIsScrollButtonVisible(!entry.isIntersecting);
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0,
    });

    if (topRef.current) {
      observerRef.current.observe(topRef.current);
    }

    return () => {
      if (observerRef.current && topRef.current) {
        observerRef.current.unobserve(topRef.current);
      }
    };
  }, []);

  return { isScrollButtonVisible, topRef };
};

export default useScrollToTop;
