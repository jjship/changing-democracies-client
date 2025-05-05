function getBaseUrl() {
  switch (process.env.VERCEL_ENV) {
    case "production":
      return "https://www.changingdemocracies.eu";
    case "development":
      return "http://localhost:3000";
    case "preview":
      return `https://${process.env.VERCEL_URL}`;
    default:
      return "https://www.changingdemocracies.eu/";
  }
}

export const baseUrl = getBaseUrl();
