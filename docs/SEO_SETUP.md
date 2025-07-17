# SEO Setup Documentation

This document outlines the SEO implementation for the Changing Democracies website.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Site URL for production
SITE_URL=https://www.changingdemocracies.eu

# Google Search Console verification
GOOGLE_SITE_VERIFICATION=your_verification_code_here

# For development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Implementation Overview

### 1. Robots.txt

- Located at `/public/robots.txt`
- Blocks indexing of admin routes (`/admin/`, `/login/`, `/password-reset/`)
- Blocks indexing of API routes and private functionality
- Allows indexing of all public routes across all languages
- References sitemap location

### 2. Sitemap Generation

- Uses `next-sitemap` package
- Automatically generates sitemap after build
- Includes all public routes across all 13 supported languages
- Excludes admin and private routes
- Configurable priorities and change frequencies

### 3. Meta Tags

- Enhanced metadata in root layout
- Page-specific SEO configurations
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URLs for all pages
- Language alternates for internationalization

### 4. Structured Data

- JSON-LD structured data for better search understanding
- Organization schema for the project
- Website schema with search functionality
- Article schema for content pages
- Event schema for events

### 5. No-Index Implementation

- Admin routes are marked with `noindex, nofollow`
- Login and password reset pages are excluded from search
- API routes are blocked from indexing

## Supported Languages

The SEO implementation supports all 13 languages:

- English (en)
- French (fr)
- German (de)
- Spanish (es)
- Catalan (ca)
- Czech (cs)
- Greek (el)
- Croatian (hr)
- Lithuanian (lt)
- Dutch (nl)
- Polish (pl)
- Portuguese (pt)
- Romanian (ro)

## Public Routes (Indexed)

The following routes are indexed for all languages:

- `/` (homepage)
- `/scroll-documentary`
- `/narratives`
- `/free-browsing`
- `/project`
- `/team`
- `/events`
- `/contact`
- `/educational-resources`
- `/research-publication`
- `/travelling-workshop`

## Blocked Routes (Not Indexed)

The following routes are blocked from indexing:

- `/admin/*`
- `/login/*`
- `/password-reset/*`
- `/api/*`
- `/photobooth/*`
- `/_next/*`
- `/supabase/*`

## Build Process

The sitemap is automatically generated after each build:

```bash
npm run build
# This will also run: next-sitemap
```

## Google Search Console Setup

1. Add your site to Google Search Console
2. Get the verification code and add it to `GOOGLE_SITE_VERIFICATION`
3. Submit your sitemap: `https://www.changingdemocracies.eu/sitemap.xml`
4. Monitor indexing status and search performance

## Testing

To test the SEO implementation:

1. Build the project: `npm run build`
2. Check that `public/sitemap.xml` is generated
3. Verify `public/robots.txt` is accessible
4. Test meta tags using browser dev tools
5. Validate structured data using Google's Rich Results Test

## Maintenance

- Update page-specific SEO configurations in `utils/seo.ts`
- Monitor search console for indexing issues
- Update sitemap configuration if new routes are added
- Review and update meta descriptions periodically
