# Changing Democracies - Localization System

This document explains how localization works in the Changing Democracies project and provides guidelines for maintaining and extending it.

## Overview

The application supports multiple languages using Next.js's app router internationalization pattern with URL path prefixes (`/en/`, `/fr/`, etc.). The system has been designed to be consistent, maintainable, and user-friendly.

## Key Components

### 1. Language Definition and Detection

- **Location**: `utils/i18n/languages.ts`
- **Purpose**: Defines available languages and provides helper functions for language detection.
- **Key exports**:
  - `CDLanguages` - Type for valid language codes
  - `DEFAULT_CD_LANG` - Default language (en)
  - `locales` - Array of supported language codes
  - `getInitialLanguage()` - Utility to determine initial language based on browser settings and localStorage

### 2. Route Utilities

- **Location**: `utils/i18n/routeUtils.ts`
- **Purpose**: Provides utilities for working with localized routes.
- **Key functions**:
  - `getCurrentLanguage(params)` - Gets current language from URL params or localStorage
  - `getLocalizedRoute(path, language)` - Creates a localized route path
  - `updateRouteLanguage(currentPath, currentLang, newLang)` - Updates language in an existing path

### 3. Translation Context

- **Location**: `app/[lang]/context/TranslationContext.tsx`
- **Purpose**: React context that provides translations and language switching functionality.
- **Key features**:
  - `useTranslation()` hook - Access to dictionary and language switching
  - `setLanguage()` - Function to change the language with proper navigation

### 4. Language Storage

The language preference is stored in:

- `localStorage` with key `changing-democracies-language`
- Browser cookies via Next.js middleware (`NEXT_LOCALE` cookie)

## Best Practices

1. **Always use utility functions for language operations**:

   ```typescript
   // Good
   const currentLang = getCurrentLanguage(params);
   const localizedPath = getLocalizedRoute("/about", currentLang);

   // Avoid
   const currentLang = params?.lang || "en";
   const localizedPath = `/${currentLang}/about`;
   ```

2. **Remember to localize homepage links**:

   ```typescript
   // Good
   const homeRoute = getLocalizedRoute("/", currentLang);
   <Link href={homeRoute}>Home</Link>

   // Avoid - this will cause a redirect but is less efficient
   <Link href="/">Home</Link>
   ```

3. **Use the TranslationContext for UI text**:

   ```typescript
   // Access translations
   const { dictionary } = useTranslation();
   return <h1>{dictionary.home.title}</h1>;
   ```

4. **For navigation with language prefixes, use utility functions**:

   ```typescript
   // Good
   const localizedRoute = getLocalizedRoute(route, currentLang);
   router.push(localizedRoute);

   // Avoid manually constructing paths
   ```

5. **For language switching, use the context's setLanguage function**:

   ```typescript
   const { setLanguage } = useTranslation();

   // Switch language
   setLanguage("fr");
   ```

## Middleware

The application uses Next.js middleware (`middleware.ts`) to:

1. Detect the user's preferred language
2. Ensure all routes have a language prefix
3. Maintain consistency between client and server via cookies

## Adding New Languages

1. Add the language code to `languagesData` in `utils/i18n/languages.ts`
2. Create a new dictionary file in `app/[lang]/dictionaries/`
3. Add translations for all keys matching the structure of existing dictionaries

## Troubleshooting

- **Missing translations**: Check that all keys exist in all dictionary files
- **Navigation issues**: Ensure you're using the utility functions for route construction
- **Language detection problems**: Check both localStorage and cookies for conflicting values
