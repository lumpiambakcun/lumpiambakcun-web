import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getFooter } from "@/lib/site-settings";

export async function OrganizationJsonLd() {
  const { social } = await getFooter();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${siteConfig.url}/#organization`,
            name: siteConfig.name,
            url: siteConfig.url,
            logo: absoluteUrl("/icons/icon-512.png"),
            sameAs: social.map(({ url }) => url),
          },
          {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`,
            name: siteConfig.name,
            url: siteConfig.url,
            inLanguage: siteConfig.language,
            publisher: { "@id": `${siteConfig.url}/#organization` },
          },
        ],
      }}
    />
  );
}
