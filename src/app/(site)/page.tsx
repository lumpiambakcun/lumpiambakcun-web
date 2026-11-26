import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { MenuSection } from "@/components/sections/menu-section";
import { OrderBanner } from "@/components/sections/order-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { buildFeatures, buildOrderBanner, faq, hero, menu, testimonials } from "@/content/beranda";
import { listActiveFaqs } from "@/lib/faqs";
import { listQuickOrder } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { getContact, getFooter } from "@/lib/site-settings";
import { faqJsonLd, localBusinessJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata("/", `Lumpia Semarang Khas Legendaris | ${siteConfig.name}`);

export default async function BerandaPage() {
  const [faqItems, products, contact, footer] = await Promise.all([listActiveFaqs(), listQuickOrder(), getContact(), getFooter()]);
  return (
    <>
      <JsonLd data={localBusinessJsonLd(contact, footer.social)} />
      {faqItems.length > 0 && <JsonLd data={faqJsonLd(faqItems)} />}
      <Hero {...hero} />
      <Features {...buildFeatures(contact)} />
      <MenuSection {...menu} products={products} />
      <Testimonials {...testimonials} />
      <OrderBanner {...buildOrderBanner(contact)} />
      <Faq {...faq} items={faqItems} />
    </>
  );
}
