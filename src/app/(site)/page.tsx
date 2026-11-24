import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { MenuSection } from "@/components/sections/menu-section";
import { OrderSection } from "@/components/sections/order-section";
import { PriceCatalog } from "@/components/sections/price-catalog";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { catalog, faq, features, hero, location, menu, order, testimonials } from "@/content/beranda";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/", `Lumpia Khas Semarang, Rebungnya Nggak Bau | ${siteConfig.name}`);

export default function BerandaPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(faq.items)} />
      <Hero {...hero} />
      <PriceCatalog {...catalog} />
      <Features {...features} />
      <MenuSection {...menu} />
      <OrderSection {...order} />
      <Testimonials {...testimonials} />
      <Faq {...faq} />
      <Location {...location} />
    </>
  );
}
