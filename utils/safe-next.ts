/**
 * Only a same-origin absolute path may be used as a post-login destination.
 * Anything else ("https://…", "//host", "/\host", header injection) falls back.
 */
export function safeNext(
  next: string | null | undefined,
  fallback: string = "/admin",
): string {
  if (!next) return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return fallback;
  }
  if (/[\r\n]/.test(next)) return fallback;
  return next;
}
