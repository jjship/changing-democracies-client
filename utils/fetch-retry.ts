import "server-only";

export default async function fetchWithRetry({
  url,
  options,
  retries = 3,
  delay = 1000,
}: {
  url: string;
  options: Record<string, unknown>;
  retries?: number;
  delay?: number;
}) {
  const info = { url, method: options.method };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        console.log({ res });
        const errorBody = await res.json();
        console.error(
          { req: info, errorBody },
          `Fetch failed with status: ${res.status}`,
        );
        throw new Error(`Fetch failed with status: ${res.status}`, {
          cause: info,
        });
      }

      return res;
    } catch (err) {
      if (attempt < retries) {
        console.warn(`Retrying fetch.`, info);

        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(`Max retries reached. Fetch failed.`, {
          ...info,
          err,
        });

        throw err;
      }
    }
  }
}
