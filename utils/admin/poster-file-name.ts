const POSTER_FILE_NAME_RE = /^poster_[A-Za-z0-9-]+_[A-Za-z0-9 _-]+\.jpe?g$/;
const MAX_POSTER_FILE_NAME_LENGTH = 100;

/**
 * Poster object names look like "poster_<id>_<LOCATION>.jpeg". Nothing else
 * may be interpolated into a Bunny storage path (no "/", no "..", no query).
 */
export function isPosterFileName(name: unknown): name is string {
  return (
    typeof name === "string" &&
    name.length <= MAX_POSTER_FILE_NAME_LENGTH &&
    POSTER_FILE_NAME_RE.test(name)
  );
}

export function posterPublicUrl(pullZone: string, fileName: string): string {
  return `https://${pullZone}.b-cdn.net/posters/${encodeURIComponent(fileName)}`;
}

/**
 * Accepts only this project's storage pull zone + "/posters/<valid name>".
 * Returns a normalised URL plus the decoded file name, or null.
 */
export function parsePosterUrl(
  input: string,
  pullZone: string,
): { url: string; fileName: string } | null {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" || url.hostname !== `${pullZone}.b-cdn.net`) {
    return null;
  }

  const match = url.pathname.match(/^\/posters\/([^/]+)$/);
  if (!match) return null;

  let fileName: string;
  try {
    fileName = decodeURIComponent(match[1]);
  } catch {
    return null;
  }

  if (!isPosterFileName(fileName)) return null;

  return { url: posterPublicUrl(pullZone, fileName), fileName };
}
