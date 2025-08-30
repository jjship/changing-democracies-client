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

## Key Components

### 1. Language Service (Centralized Management)

- **Location**: `utils/i18n/languageService.ts`
- **Purpose**: Centralized language management service that works in both client and server contexts.
- **Key features**:
  - `LanguageService.getCurrentLanguage(params)` - Detects language with priority: URL → Cookie → Browser → Default
  - `LanguageService.normalizeLanguage(lang)` - Ensures consistent lowercase format
  - `LanguageService.toDisplayFormat(lang)` - Converts to uppercase display format
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

### 4. Route Utilities

- **Location**: `utils/i18n/routeUtils.ts`
- **Purpose**: Utilities for working with localized routes.
- **Key functions**:
  - `getLocalizedRoute(path, language)` - Creates a localized route path
  - `updateRouteLanguage(currentPath, currentLang, newLang)` - Updates language in existing path
  - Legacy functions marked as deprecated (use LanguageService instead)

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

// Avoid - Deprecated functions
const currentLang = getCurrentLanguage(params);
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

### 4. Always Use Route Utilities for Navigation

```typescript
// Good
import { getLocalizedRoute } from "@/utils/i18n/routeUtils";
const localizedPath = getLocalizedRoute("/about", currentLang);
const homeRoute = getLocalizedRoute("/", currentLang);

// Avoid manual path construction
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

If you encounter deprecated functions, update them as follows:

### Replace Deprecated Functions

```typescript
// OLD - Deprecated
import { getCurrentLanguage } from "@/utils/i18n/routeUtils";
const currentLang = getCurrentLanguage(params);

// NEW - Recommended
import { LanguageService } from "@/utils/i18n/languageService";
const { language: currentLang } = LanguageService.getCurrentLanguage(params);
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

For the Google Analytics snippet you mentioned, add it to the localized layout:

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
