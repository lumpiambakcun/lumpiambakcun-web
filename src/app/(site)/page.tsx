import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu-section";
import { OrderBanner } from "@/components/sections/order-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { faq, features, hero, menu, orderBanner, testimonials } from "@/content/beranda";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/", `Lumpia Semarang Khas Legendaris | ${siteConfig.name}`);

export default function BerandaPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd(faq.items)} />
      <Hero {...hero} />
      <Features {...features} />
      <MenuSection {...menu} />
      <Testimonials {...testimonials} />
      <OrderBanner {...orderBanner} />
      <Faq {...faq} />
    </>
  );
}
