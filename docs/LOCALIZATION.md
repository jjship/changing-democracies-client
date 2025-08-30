# Changing Democracies - Localization System

This document explains how localization works in the Changing Democracies project and provides guidelines for maintaining and extending it.

## Overview

The application supports multiple languages using Next.js's app router internationalization pattern with URL path prefixes (`/en/`, `/fr/`, etc.). The system uses a modern cookie-only approach for language persistence, eliminating localStorage complexity and ensuring consistent behavior across client and server.

## Supported Languages

The application currently supports 13 languages:

- Catalan (ca)
- Croatian (hr)
- Czech (cs)
- Dutch (nl)
- English (en) - Default
- French (fr)
- German (de)
- Greek (el)
- Lithuanian (lt)
- Polish (pl)
- Portuguese (pt)
- Romanian (ro)
- Spanish (es)

## System Architecture Status

✅ **Modern Architecture**: The localization system has been fully refactored to use a centralized `LanguageService` approach.

✅ **Migration Complete**: All navigation components now use `LanguageService` directly for route operations.

⚠️ **Deprecated**: The `routeUtils.ts` file exists as a backward-compatibility wrapper and should not be used in new code.

## Key Components

### 1. Language Service (Centralized Management)

- **Location**: `utils/i18n/languageService.ts`
- **Purpose**: Centralized language management service that works in both client and server contexts.
- **Key features**:
  - `LanguageService.getCurrentLanguage(params)` - Detects language with priority: URL → Cookie → Browser → Default
  - `LanguageService.normalizeLanguage(lang)` - Ensures consistent lowercase format
  - `LanguageService.toDisplayFormat(lang)` - Converts to uppercase display format
  - `LanguageService.getLocalizedRoute(path, language)` - Creates localized route paths
  - `LanguageService.updateRouteLanguage(currentPath, currentLang, newLang)` - Updates language in existing paths
  - Cookie-only storage (no localStorage dependency)
  - Source tracking for debugging language detection

### 2. Modern Language Hooks

- **Location**: `utils/i18n/useLanguage.ts`
- **Purpose**: Provides React hooks for language management in components.
- **Key hooks**:
  - `useLanguage()` - For components working with lowercase language codes
  - `useDisplayLanguage()` - For components expecting uppercase format ("EN", "FR")
  - Built-in validation and available language filtering

### 3. Server-Side Language Utils

- **Location**: `utils/i18n/serverLanguageUtils.ts`
- **Purpose**: Server-side utilities for accessing language from cookies.
- **Key functions**:
  - `getServerLanguage()` - Access language in Server Components
  - `getLanguageFromHeaders(headers)` - Access language in API routes

### 4. Route Utilities (Deprecated)

- **Location**: `utils/i18n/routeUtils.ts`
- **Status**: **⚠️ DEPRECATED - Use LanguageService instead**
- **Purpose**: Legacy wrapper for route utilities - now delegates to LanguageService.
- **Migration**: All functions now available directly on LanguageService:
  - `getLocalizedRoute()` → `LanguageService.getLocalizedRoute()`
  - `updateRouteLanguage()` → `LanguageService.updateRouteLanguage()`
  - `getCurrentLanguage()` → `LanguageService.getCurrentLanguage()`

### 5. Translation Context

- **Location**: `app/[lang]/context/TranslationContext.tsx`
- **Purpose**: React context providing translations and language switching.
- **Key features**:
  - `useTranslation()` hook - Access to dictionary and language switching
  - `setLanguage()` - Navigation-based language switching (middleware handles cookies)
  - Integration with LanguageService for consistent language detection

### 6. Language Storage

The language preference is stored via:

- **Primary**: Browser cookies via Next.js middleware (`NEXT_LOCALE` cookie)
- **No localStorage**: Eliminated for better SSR compatibility and consistency

## Middleware

The application uses Next.js middleware (`middleware.ts`) to:

1. **Language Detection**: Detect user's preferred language from headers
2. **Route Redirection**: Ensure all routes have a language prefix
3. **Cookie Management**: Automatically set and maintain the `NEXT_LOCALE` cookie (30-day expiration)
4. **Server-Client Consistency**: Keep language preference synchronized across SSR and client-side

## Best Practices

### 1. Use the LanguageService for Language Operations

```typescript
// Good - Modern approach
import { LanguageService } from "@/utils/i18n/languageService";

const { language, source } = LanguageService.getCurrentLanguage(params);
const normalized = LanguageService.normalizeLanguage("EN"); // returns 'en'
const display = LanguageService.toDisplayFormat("en"); // returns 'EN'
const localizedRoute = LanguageService.getLocalizedRoute("/about", "en"); // returns '/en/about'

// Avoid - Deprecated functions from routeUtils
const currentLang = getCurrentLanguage(params);
const route = getLocalizedRoute("/about", "en");
```

### 2. Use Modern Hooks for Component State

```typescript
// For lowercase language codes
import { useLanguage } from "@/utils/i18n/useLanguage";
const { language, setLanguage, displayLanguage } = useLanguage({
  availableLanguages: ["en", "fr", "de"],
});

// For uppercase display format
import { useDisplayLanguage } from "@/utils/i18n/useLanguage";
const { selectedLanguage, setSelectedLanguage } = useDisplayLanguage({
  availableLanguages: ["en", "fr", "de"],
});
```

### 3. Server-Side Language Access

```typescript
// In Server Components
import { getServerLanguage } from "@/utils/i18n/serverLanguageUtils";
const serverLanguage = getServerLanguage();

// In API routes
import { getLanguageFromHeaders } from "@/utils/i18n/serverLanguageUtils";
const apiLanguage = getLanguageFromHeaders(request.headers);
```

### 4. Use LanguageService for Route Operations

```typescript
// Good - Modern approach using LanguageService
import { LanguageService } from "@/utils/i18n/languageService";
const localizedPath = LanguageService.getLocalizedRoute("/about", currentLang);
const homeRoute = LanguageService.getLocalizedRoute("/", currentLang);
const updatedRoute = LanguageService.updateRouteLanguage(
  currentPath,
  "en",
  "fr",
);

// Avoid - Deprecated routeUtils imports
import { getLocalizedRoute } from "@/utils/i18n/routeUtils";
const localizedPath = getLocalizedRoute("/about", currentLang);

// Avoid - Manual path construction
const localizedPath = `/${currentLang}/about`;
```

### 5. Use TranslationContext for UI Text and Language Switching

```typescript
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

const { dictionary, language, setLanguage } = useTranslation();

// Access translations
return <h1>{dictionary.home.title}</h1>;

// Switch language (middleware handles cookie persistence)
setLanguage("fr");
```

## Cookie-Only Architecture Benefits

1. **Server-Side Compatibility**: Cookies available during SSR and API calls
2. **Automatic Synchronization**: Next.js middleware handles cookie management
3. **Simplified Logic**: No manual localStorage management needed
4. **Better Performance**: Reduced client-side storage overhead
5. **Consistent Behavior**: Same language detection on client and server

## Language Detection Priority

The system detects language in this order:

1. **URL Parameters** (highest priority) - `/en/about`
2. **NEXT_LOCALE Cookie** - Set by middleware, 30-day persistence
3. **Browser Language** - From `navigator.language`
4. **Default Language** - English (en) as fallback

## Adding New Languages

1. **Add language to definition**:

   ```typescript
   // In utils/i18n/languages.ts
   const languagesData = [
     // ... existing languages
     { name: "Italian", code: "it" },
   ] as const;
   ```

2. **Create dictionary file**:

   ```typescript
   // Create app/[lang]/dictionaries/it.json
   {
     "home": {
       "title": "Titolo",
       // ... all translation keys
     }
   }
   ```

3. **Update dictionary loader**:
   ```typescript
   // In app/[lang]/dictionaries.ts
   const dictionaries = {
     // ... existing
     it: () =>
       import("./dictionaries/it.json").then((module) => module.default),
   };
   ```

## Migration from Legacy System

**Status**: ✅ **Migration Complete** - All navigation components now use LanguageService directly.

The `routeUtils.ts` file now exists as a deprecated wrapper for backward compatibility. All new code should use `LanguageService` directly.

### Replace Deprecated Functions

```typescript
// OLD - Deprecated routeUtils imports
import {
  getCurrentLanguage,
  getLocalizedRoute,
  updateRouteLanguage,
} from "@/utils/i18n/routeUtils";
const currentLang = getCurrentLanguage(params);
const localizedPath = getLocalizedRoute("/about", currentLang);
const updatedPath = updateRouteLanguage(currentPath, "en", "fr");

// NEW - Recommended LanguageService approach
import { LanguageService } from "@/utils/i18n/languageService";
const { language: currentLang } = LanguageService.getCurrentLanguage(params);
const localizedPath = LanguageService.getLocalizedRoute("/about", currentLang);
const updatedPath = LanguageService.updateRouteLanguage(
  currentPath,
  "en",
  "fr",
);
```

### Remove localStorage Dependencies

```typescript
// OLD - Manual localStorage management
const storedLanguage = localStorage.getItem("changing-democracies-language");
localStorage.setItem("changing-democracies-language", "en");

// NEW - Cookie-only (handled automatically by middleware)
// No manual storage management needed
```

## Google Analytics Integration

For Google Analytics integration, add the tracking script to the localized layout:

```typescript
// In app/[lang]/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children, params: { lang } }) {
  return (
    <html lang={lang}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-13VS8XS26Q"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-13VS8XS26Q');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Troubleshooting

### Common Issues

- **Missing translations**: Ensure all keys exist in all dictionary files
- **Language detection problems**: Check browser dev tools for `NEXT_LOCALE` cookie
- **Navigation issues**: Use route utility functions instead of manual path construction
- **Server-client mismatch**: Verify middleware configuration in `middleware.ts`

### Debugging Language Detection

```typescript
import { LanguageService } from "@/utils/i18n/languageService";

// Get detailed language detection info
const { language, source } = LanguageService.getCurrentLanguage(params);
console.log(`Detected language: ${language} from source: ${source}`);
```

### Checking Cookie State

```typescript
// Client-side cookie inspection
const cookieLanguage = LanguageService.getCookieLanguage();
console.log("Cookie language:", cookieLanguage);

// Server-side cookie access
import { getServerLanguage } from "@/utils/i18n/serverLanguageUtils";
const serverLanguage = getServerLanguage();
```

## Performance Considerations

1. **Static Generation**: Language routes are statically generated at build time
2. **Cookie Optimization**: 30-day cookie expiration reduces server requests
3. **Middleware Efficiency**: Pattern matching excludes static assets
4. **Bundle Splitting**: Dictionary files are dynamically imported per language

## Security Notes

- Language codes are validated against the allowed `locales` array
- Cookie `sameSite: 'lax'` setting prevents CSRF attacks
- No sensitive data stored in language preferences

## Future Cleanup

### Optional: Complete routeUtils Removal

The `routeUtils.ts` file can be completely removed in the future since all functions are now available in `LanguageService`. Before removal:

1. **Verify no external dependencies**: Check if any external packages or uncommitted code still imports from `routeUtils`
2. **Update any remaining references**: Search codebase for any missed imports
3. **Remove the file**: Delete `utils/i18n/routeUtils.ts`

### Recommended: Update External Documentation

Update any external documentation, README files, or developer guides that might reference the old `routeUtils` approach.

Current state: ✅ All core navigation components migrated to `LanguageService`
