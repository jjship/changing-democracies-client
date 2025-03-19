import { useTranslation } from "@/app/[lang]/context/TranslationContext";
import { useEffect, useState } from "react";
import { getUppercaseLanguage } from "@/utils/i18n/constants";

/**
 * A hook that adapts the global lowercase language to uppercase format
 * for components that require uppercase language codes (like subtitles)
 */
export function useLanguageAdapter(availableLanguages: string[] = []) {
  const { language: globalLanguage, setLanguage: setGlobalLanguage } =
    useTranslation();

  // Convert global language to uppercase for local component use
  const [localLanguage, setLocalLanguage] = useState<string>(
    getUppercaseLanguage(globalLanguage),
  );

  // Keep local language in sync with global language
  useEffect(() => {
    const uppercaseGlobal = getUppercaseLanguage(globalLanguage);
    if (uppercaseGlobal !== localLanguage) {
      setLocalLanguage(uppercaseGlobal);
    }
  }, [globalLanguage, localLanguage]);

  // Function to update both local and global language
  const handleLanguageChange = (newLang: string | undefined) => {
    if (!newLang) return;

    // Update local state (uppercase)
    setLocalLanguage(getUppercaseLanguage(newLang));

    // Update global state (lowercase)
    setGlobalLanguage(newLang.toLowerCase() as any);
  };

  return {
    selectedLanguage: localLanguage,
    setSelectedLanguage: handleLanguageChange,
    availableLanguages: availableLanguages.map((lang) =>
      getUppercaseLanguage(lang),
    ),
  };
}
