# Changing Democracies Client

Next.js 14 App Router project for the Changing Democracies EU cultural heritage platform. Displays video narratives, a free-browsing film library, a scroll documentary, and an admin area (photobooth, posters, stories, events).

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (also runs next-sitemap)
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

Always run `npm run typecheck` after changes. There are no test suites.

## Project Structure

```
app/
  [lang]/            # Public pages — locale prefix (en, nl, hr, etc.)
    context/         # TranslationContext (global language + dictionary)
    free-browsing/   # Film library page
    narratives/      # Narrative paths page
  admin/             # Admin pages (auth-gated via Supabase)
  api/               # API routes: downloadImage, sendImage, posters
  components/        # All React components
    films/           # Film list, player, filters, FilmsContext
    narratives/      # Narratives list, player, view, NarrativesContext
    navigation/      # Nav bar, drawer, animated links
    shared/          # BioSidePanel, UnifiedVideoPlayer, StructuredData
    admin/           # Admin: videos, posters, events, photobooth, stories
    ui/              # shadcn/ui primitives (button, dialog, select, etc.)
    scrollDocumentary/
    landing/
types/               # Shared TypeScript types
  api.ts             # ClientFragment, FragmentsResponse, TagCategory, etc.
  videosAndFilms.ts  # NarrationPath, NarrationFragment, FilmData, etc.
  database.ts        # Supabase database types
utils/
  cdApi.ts           # Server-only API client (re-exports types from types/api.ts)
  env.ts             # Zod-validated environment variables
  i18n/              # Language utilities, getLocalizedField, useLanguage hook
  films-methods.ts   # Film URL builders
  posters-methods.ts # Bunny storage poster operations
  admin/             # Bunny stream admin methods
supabase/
  clients/           # Supabase client factories (server, client, api, etc.)
  middleware.ts      # Supabase session middleware
```

## Path Aliases (tsconfig)

| Alias              | Maps to                  |
|--------------------|--------------------------|
| `@/components/*`   | `app/components/*`       |
| `@/types/*`        | `types/*`                |
| `@/utils/*`        | `utils/*`                |
| `@/ui/*`           | `app/components/ui/*`    |
| `@/translation/*`  | `app/[lang]/context/*`   |
| `@/supabase/*`     | `supabase/*`             |
| `@/auth/*`         | `app/auth/*`             |

## Conventions

### Context Pattern

Every context follows one pattern:

```typescript
// XxxContext.tsx exports:
export function XxxProvider({ children, ... }) { ... }
export function useXxxContext() { ... }

// XxxContext.tsx does NOT export the raw createContext object.
```

Consumers use `<XxxProvider>` and `useXxxContext()`. Never import a raw context object.

### Exports

Named export at the point of definition. No forward exports before definitions, no `export default` on components.

```typescript
// Good
export const MyComponent: FC<Props> = ({ ... }) => { ... };

// Bad
export { MyComponent };
const MyComponent = ...;
```

### Types

- **No `any`** — use proper types or `unknown` for truly untyped data.
- API types live in `types/api.ts`. Client components import from `@/types/api`, not from `cdApi.ts` (which has `import "server-only"`).
- `cdApi.ts` re-exports types for server-side code.

### Environment Variables

Validated via Zod in `utils/env.ts`:
- `serverEnv()` — server-only vars (`BACKEND_API_URL`, `BUNNY_*`, `RESEND_API_KEY`, etc.)
- `clientEnv()` — `NEXT_PUBLIC_*` vars (Supabase, Bunny pull zones, library ID)

Never use `process.env.X!` (non-null assertion). Use `serverEnv().X` or `clientEnv().X`.

### Localization

- Language codes are lowercase: `"en"`, `"nl"`, `"hr"` (type: `CDLanguages`)
- API data uses uppercase language codes: `"EN"`, `"NL"`
- Use `getLocalizedField(items, languageCode, fieldName)` from `utils/i18n/getLocalizedField.ts` for lookups with EN fallback

### API Routes

- `downloadImage` and `sendImage` routes validate URLs against an allowlist (`b-cdn.net`, `bunnycdn.com`, `changingdemocracies.eu`)
- Request bodies are validated with Zod schemas
- No axios — use native `fetch` everywhere

### Styling

- Tailwind CSS with custom colors defined in tailwind config (`black_bg`, `yellow_secondary`, `purple_mains`, `green_accent`, etc.)
- Radix UI Themes for layout primitives (`Box`, `Flex`)
- shadcn/ui components in `app/components/ui/`

## Key Dependencies

- **next** ^14.2 — App Router
- **@supabase/ssr** — Auth + database
- **zod** — Schema validation
- **hls.js** — Video streaming
- **framer-motion** — Animations
- **react-hook-form** + **@hookform/resolvers** — Admin forms
- **resend** — Transactional email (poster delivery)
- **date-fns** — Date formatting
- **swr** — Client-side data fetching (admin)
