import { useFilmsContext } from "./FilmsContext";
import { useMemo } from "react";
import { BioSidePanel } from "@/components/public/BioSidePanel";

const FilmBioSidePanel = () => {
  const {
    nowPlaying,
    fragments,
    showSidePanel,
    setShowSidePanel,
  } = useFilmsContext();

  const currentFragment = useMemo(() => {
    return fragments?.find((fragment) => fragment.id === nowPlaying);
  }, [fragments, nowPlaying]);

  return (
    <BioSidePanel
      isOpen={showSidePanel}
      onClose={() => setShowSidePanel(false)}
      personName={currentFragment?.person?.name}
      countryName={currentFragment?.person?.country?.name}
      bio={currentFragment?.person?.bio}
    />
  );
};

export default FilmBioSidePanel;
