# Language System Migration Guide

This document outlines the migration from the old duplicated language selection system to the new simplified cookie-only system.

## Overview

The old system had multiple duplications and inconsistencies:

- Multiple language detection functions
- Inconsistent localStorage usage
- Redundant language selection hooks
- Multiple language storage mechanisms
- Inconsistent language format handling

The new system provides:

- Single source of truth for language detection
- Cookie-only storage (NEXT_LOCALE)
- Unified language hooks
- Clear separation of concerns
- Consistent language format handling
- Server-side compatibility

## Key Benefits of Cookie-Only Approach

1. **Server-Side Compatibility**: Cookies are available during SSR and API calls
2. **Automatic Synchronization**: Next.js middleware handles cookie setting
3. **Simplified Logic**: No need to manage localStorage manually
4. **Better Performance**: No client-side storage management overhead
5. **Consistent Behavior**: Same language detection on client and server
6. **Client/Server Separation**: Clear distinction between client and server utilities

## New Architecture

### 1. Simplified LanguageService (`utils/i18n/languageService.ts`)

Client-side service that uses cookies:

```typescript
import { LanguageService } from "@/utils/i18n/languageService";

// Get current language with source information
const { language, source } = LanguageService.getCurrentLanguage(params);

// Get language from cookie (client-side only)
const cookieLanguage = LanguageService.getCookieLanguage();

// Normalize language codes
const normalized = LanguageService.normalizeLanguage("EN"); // returns 'en'

// Convert to display format
const display = LanguageService.toDisplayFormat("en"); // returns 'EN'
```

### 2. Server Language Utils (`utils/i18n/serverLanguageUtils.ts`)

Server-side utilities for accessing cookies:

```typescript
import {
  getServerLanguage,
  getLanguageFromHeaders,
} from "@/utils/i18n/serverLanguageUtils";

// In Server Components
const serverLanguage = getServerLanguage();

// In API routes
const apiLanguage = getLanguageFromHeaders(request.headers);
```

### 3. Simplified Language Hook (`utils/i18n/useLanguage.ts`)

Replaces the old `useLanguageSelection` hook:

```typescript
import { useLanguage, useDisplayLanguage } from "@/utils/i18n/useLanguage";

// For components that work with lowercase language codes
const { language, setLanguage, displayLanguage } = useLanguage({
  availableLanguages: ["en", "fr", "de"],
});

// For components that work with uppercase display format
const { selectedLanguage, setSelectedLanguage } = useDisplayLanguage({
  availableLanguages: ["en", "fr", "de"],
});
```

### 4. Updated TranslationContext

The TranslationContext now uses the simplified service:

```typescript
import { useTranslation } from "@/app/[lang]/context/TranslationContext";

const { language, setLanguage, dictionary } = useTranslation();
```

## Migration Steps

### Step 1: Remove localStorage Dependencies

**Before:**

```typescript
const storedLanguage = localStorage.getItem("changing-democracies-language");
localStorage.setItem("changing-democracies-language", "en");
```

**After:**

```typescript
// No manual localStorage management needed
// Cookies are handled automatically by Next.js middleware
```

### Step 2: Replace Language Detection Functions

**Before:**

```typescript
import { getCurrentLanguage } from "@/utils/i18n/routeUtils";
const currentLang = getCurrentLanguage(params);
```

**After:**

```typescript
import { LanguageService } from "@/utils/i18n/languageService";
const { language: currentLang } = LanguageService.getCurrentLanguage(params);
```

### Step 3: Replace useLanguageSelection Hook

**Before:**

```typescript
import { useLanguageSelection } from "@/components/scrollDocumentary/useLanguageSelection";
const { selectedLanguage, setSelectedLanguage } = useLanguageSelection({
  initialLanguageLabel: "EN",
  availableLanguageLabels: ["EN", "FR", "DE"],
});
```

**After:**

```typescript
import { useDisplayLanguage } from "@/utils/i18n/useLanguage";
const { selectedLanguage, setSelectedLanguage } = useDisplayLanguage({
  availableLanguages: ["en", "fr", "de"],
});
```

### Step 4: Update Language Format Handling

**Before:**

```typescript
// Inconsistent format handling
const lang = "EN"; // uppercase
const normalized = lang.toLowerCase(); // manual conversion
```

**After:**

```typescript
import { LanguageService } from "@/utils/i18n/languageService";
const normalized = LanguageService.normalizeLanguage("EN"); // returns 'en'
const display = LanguageService.toDisplayFormat("en"); // returns 'EN'
```

### Step 5: Server-Side Language Access

**For Server Components:**

```typescript
import { getServerLanguage } from "@/utils/i18n/serverLanguageUtils";
const serverLanguage = getServerLanguage();
```

**For API Routes:**

```typescript
import { getLanguageFromHeaders } from "@/utils/i18n/serverLanguageUtils";
const apiLanguage = getLanguageFromHeaders(request.headers);
```

## Deprecated Functions

The following functions are deprecated and will be removed in a future version:

- `getCurrentLanguage()` in `utils/i18n/routeUtils.ts`
- `getBrowserLanguage()` in `utils/i18n/routeUtils.ts`
- `getInitialLanguage()` in `utils/i18n/languages.ts`
- `useLanguageSelection()` in `components/scrollDocumentary/useLanguageSelection.ts` (removed)
- All localStorage-based language management

## Benefits of the New System

1. **Single Source of Truth**: All language logic is centralized in `LanguageService`
2. **Server-Side Compatible**: Cookies work in SSR and API routes
3. **Automatic Management**: Next.js middleware handles cookie persistence
4. **Simplified Logic**: No manual localStorage management
5. **Better Performance**: Reduced client-side overhead
6. **Consistent Behavior**: Same language detection everywhere
7. **Clear Separation**: Client and server utilities are separate

## How Cookies Work

The system uses the `NEXT_LOCALE` cookie which is automatically managed by Next.js middleware:

1. **Initial Visit**: Middleware detects browser language and sets cookie
2. **Language Change**: Navigation updates URL, middleware updates cookie
3. **Subsequent Visits**: Cookie provides consistent language preference
4. **Server-Side**: Cookie available in API routes and SSR

## Testing the Migration

After migrating, test the following scenarios:

1. **Language Detection**: Verify that language is detected correctly from URL, cookie, and browser settings
2. **Language Switching**: Ensure language changes persist across page reloads
3. **Navigation**: Check that all navigation links use the correct language prefix
4. **Server-Side**: Verify that API calls receive the correct language preference
5. **Cookie Persistence**: Test that language preference persists across browser sessions

## Rollback Plan

If issues arise, you can temporarily revert to the old system by:

1. Keeping the old functions as deprecated wrappers
2. Gradually migrating components back
3. Using feature flags to control which system is active

## Support

For questions or issues with the migration, refer to:

- The `LanguageService` class documentation
- The `useLanguage` hook examples
- The existing `TranslationContext` usage patterns
- Next.js middleware documentation for cookie handling
