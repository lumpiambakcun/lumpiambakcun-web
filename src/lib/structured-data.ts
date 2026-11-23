import { businessConfig, siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${businessConfig.phoneIntl}`,
    image: absoluteUrl("/images/hero/piring-lumpia.webp"),
    servesCuisine: "Lumpia Semarang",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${businessConfig.address.street}, ${businessConfig.address.district}`,
      addressLocality: businessConfig.address.city,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessConfig.geo.latitude,
      longitude: businessConfig.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: businessConfig.hours.opens.replace(".", ":"),
      closes: businessConfig.hours.closes.replace(".", ":"),
    },
    hasMap: businessConfig.mapsUrl,
    sameAs: [businessConfig.instagramUrl],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: businessConfig.rating.value,
      reviewCount: businessConfig.rating.count,
    },
  };
}

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function productJsonLd(product: { name: string; description: string; image: string; url: string; price?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    url: absoluteUrl(product.url),
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.price && {
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        price: product.price.replace(/\D/g, ""),
        availability: "https://schema.org/InStock",
        url: absoluteUrl(product.url),
      },
    }),
  };
}

export function breadcrumbJsonLd(items: readonly { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
