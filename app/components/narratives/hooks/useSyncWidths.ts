import { useCallback, useEffect, RefObject } from "react";

export const useSyncWidths = (
  sourceRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
) => {
  const syncWidths = useCallback(() => {
    if (sourceRef.current && targetRef.current) {
      const sourceWidth = sourceRef.current.offsetWidth;
      targetRef.current.style.width = `${sourceWidth}px`;
    }
  }, [sourceRef, targetRef]);

  useEffect(() => {
    syncWidths();

    const resizeObserver = new ResizeObserver(() => {
      window.requestAnimationFrame(syncWidths);
    });

    if (sourceRef.current) {
      resizeObserver.observe(sourceRef.current);
    }

    window.addEventListener("resize", syncWidths);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncWidths);
    };
  }, [syncWidths, sourceRef]);
};

