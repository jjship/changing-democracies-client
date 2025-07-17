import { CDLanguages } from "@/utils/i18n/languages";

interface StructuredDataProps {
  type: "organization" | "website" | "article" | "event";
  lang: CDLanguages;
  data?: any;
}

export function StructuredData({ type, lang, data }: StructuredDataProps) {
  const baseUrl = process.env.SITE_URL || "https://www.changingdemocracies.eu";

  const getStructuredData = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Changing Democracies",
          url: baseUrl,
          logo: `${baseUrl}/logo_light_no_bg.svg`,
          description:
            "Changing Democracies explores unknown stories about recent democratic transitions in Europe to grasp what's needed for democracy to fulfil its promises for everyone.",
          sameAs: [
            "https://twitter.com/changingdemocracies",
            "https://www.linkedin.com/company/changing-democracies",
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "EU",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "info@changingdemocracies.eu",
          },
        };

      case "website":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Changing Democracies",
          url: baseUrl,
          description: "Exploring democratic transitions in Europe",
          inLanguage: lang,
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/${lang}/free-browsing`,
            "query-input": "required name=search_term_string",
          },
        };

      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data?.title || "Changing Democracies",
          description:
            data?.description || "Exploring democratic transitions in Europe",
          author: {
            "@type": "Organization",
            name: "Changing Democracies",
          },
          publisher: {
            "@type": "Organization",
            name: "Changing Democracies",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo_light_no_bg.svg`,
            },
          },
          datePublished: data?.publishedTime || new Date().toISOString(),
          dateModified: data?.modifiedTime || new Date().toISOString(),
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/${lang}${data?.path || ""}`,
          },
        };

      case "event":
        return {
          "@context": "https://schema.org",
          "@type": "Event",
          name: data?.title || "Changing Democracies Event",
          description:
            data?.description ||
            "Event related to democratic transitions in Europe",
          startDate: data?.startDate,
          endDate: data?.endDate,
          location: {
            "@type": "Place",
            name: data?.location?.name || "Europe",
            address: {
              "@type": "PostalAddress",
              addressCountry: "EU",
            },
          },
          organizer: {
            "@type": "Organization",
            name: "Changing Democracies",
          },
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
