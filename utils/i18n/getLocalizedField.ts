/**
 * Find a localized value from an array of `{ languageCode, [field] }` objects.
 * Falls back to English ("EN") when the requested language is not available.
 *
 * @example
 * const title = getLocalizedField(path.titles, selectedLanguage, "title");
 * const bio   = getLocalizedField(fragment.bios, selectedLanguage, "bio");
 */
export function getLocalizedField<
  T extends { languageCode: string },
  K extends keyof T,
>(items: T[], languageCode: string | undefined, field: K): T[K] | undefined {
  return (
    items.find((item) => item.languageCode === languageCode)?.[field] ??
    items.find((item) => item.languageCode === "EN")?.[field]
  );
}
