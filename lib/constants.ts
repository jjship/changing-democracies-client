function getBaseUrl() {
  switch (process.env.VERCEL_ENV) {
    case "development":
      return "http://localhost:3000";
    case "production" || "preview":
      return `https://${process.env.VERCEL_URL}`;
    default:
      return "http://localhost:3000";
  }
}

export const baseUrl = getBaseUrl();
