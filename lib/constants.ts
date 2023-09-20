function getBaseUrl() {
  switch (process.env.VERCEL_ENV) {
    case "development":
      return "http://localhost:3000";
    case "production" || "preview":
      return `https://${process.env.VERCEL_URL}`;
    default:
      return "https://www.changingdemocracies.eu/";
  }
}

export const baseUrl = getBaseUrl();
