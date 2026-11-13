import { useSyncExternalStore } from "react";

// Keep in sync with the `mobile` screen in tailwind.config.ts
const MOBILE_QUERY = "(max-width: 864px), (max-height: 500px)";

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

const getSnapshot = (): boolean | null =>
  window.matchMedia(MOBILE_QUERY).matches;

const getServerSnapshot = (): boolean | null => null;

/** null until hydrated, so callers can avoid rendering the wrong layout first */
export const useIsMobileLayout = (): boolean | null =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
