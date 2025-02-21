import { useState, useEffect } from "react";

interface UseLanguageSelectionProps {
  initialLanguageLabel: string;
  availableLanguageLabels: string[];
}

export function useLanguageSelection({
  initialLanguageLabel,
  availableLanguageLabels,
}: UseLanguageSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const initialLabel = availableLanguageLabels.includes(initialLanguageLabel)
      ? initialLanguageLabel
      : "EN";
    setSelectedLanguage(initialLabel);
  }, [initialLanguageLabel, availableLanguageLabels]);

  return {
    selectedLanguage,
    availableLanguages: availableLanguageLabels,
    setSelectedLanguage,
  };
}
