import { useNarrativesContext } from "@/components/narratives/NarrativesContext";
import { useMemo } from "react";
import { getLocalizedField } from "@/utils/i18n/getLocalizedField";
import { BioSidePanel } from "@/components/shared/BioSidePanel";

export const NarrativesBioSidePanel = () => {
  const {
    currentPath,
    currentIndex,
    setShowSidePanel,
    showSidePanel,
    selectedLanguage,
  } = useNarrativesContext();

  const currentFragment = currentPath?.fragments[currentIndex];

  const currentBio = useMemo(() => {
    if (!currentFragment) return undefined;
    return getLocalizedField(currentFragment.bios, selectedLanguage, "bio");
  }, [currentFragment, selectedLanguage]);

  const currentCountryName = useMemo(() => {
    if (!currentFragment) return undefined;
    return getLocalizedField(currentFragment.country.names, selectedLanguage, "name");
  }, [currentFragment, selectedLanguage]);

  return (
    <BioSidePanel
      isOpen={showSidePanel}
      onClose={() => setShowSidePanel(false)}
      personName={currentFragment?.person}
      countryName={currentCountryName}
      bio={currentBio}
    />
  );
};
