import { z } from "zod";

/**
 * Server-side environment variables.
 * Only import this in server components, API routes, or server actions.
 */
const serverSchema = z.object({
  // API
  BACKEND_API_URL: z.string().url(),
  BACKEND_API_KEY: z.string().min(1),

  // Bunny Stream
  BUNNY_STREAM_API_KEY: z.string().min(1),
  BUNNY_STREAM_LIBRARY_ID: z.string().min(1),
  BUNNY_STREAM_COLLECTION_ID: z.string().min(1),
  BUNNY_SCROLL_DOC_COLLECTION_ID: z.string().min(1),
  BUNNY_STREAM_PULL_ZONE: z.string().min(1),

  // Bunny Storage
  BUNNY_STORAGE_API_KEY: z.string().min(1),
  BUNNY_STORAGE_NAME: z.string().min(1),
  BUNNY_STORAGE_PULL_ZONE_ID: z.string().min(1),
  BUNNY_ADMIN_API_KEY: z.string().min(1),

  // Resend
  RESEND_API_KEY: z.string().min(1),

  // Site
  SITE_URL: z.string().url().default("https://www.changingdemocracies.eu"),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
  VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),
  VERCEL_URL: z.string().optional(),
});

/**
 * Client-side environment variables (NEXT_PUBLIC_*).
 * Safe to import anywhere.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE: z
    .string()
    .min(1)
    .default("vz-cac74041-8b3"),
  NEXT_PUBLIC_STORAGE_PULL_ZONE: z.string().min(1),
  NEXT_PUBLIC_LIBRARY_ID: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  env: Record<string, string | undefined>,
  label: string,
): z.infer<T> {
  const result = schema.safeParse(env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Missing or invalid ${label} environment variables:\n${formatted}`);
  }
  return result.data;
}

/**
 * Validated server environment variables.
 * Lazily evaluated to avoid errors during build for pages that don't need all vars.
 */
let _serverEnv: ServerEnv | null = null;
export function serverEnv(): ServerEnv {
  if (!_serverEnv) {
    _serverEnv = validateEnv(serverSchema, process.env, "server");
  }
  return _serverEnv;
}

/**
 * Validated client environment variables.
 * Lazily evaluated so the validation runs at first access, not at import time.
 */
let _clientEnv: ClientEnv | null = null;
export function clientEnv(): ClientEnv {
  if (!_clientEnv) {
    // Each process.env.NEXT_PUBLIC_* must be referenced individually because
    // Next.js statically replaces these at build time — passing process.env
    // as a whole object does NOT get the replacements on the client side.
    _clientEnv = validateEnv(
      clientSchema,
      {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE:
          process.env.NEXT_PUBLIC_BUNNY_STREAM_PULL_ZONE,
        NEXT_PUBLIC_STORAGE_PULL_ZONE:
          process.env.NEXT_PUBLIC_STORAGE_PULL_ZONE,
        NEXT_PUBLIC_LIBRARY_ID: process.env.NEXT_PUBLIC_LIBRARY_ID,
      },
      "client",
    );
  }
  return _clientEnv;
}
