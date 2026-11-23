import { MenuBrowser } from "@/components/sections/menu-browser";
import { CtaBand } from "@/components/shared/cta-band";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { doodleLayout } from "@/content/doodles";
import { menuCategories, menuPage, menuProducts } from "@/content/menu";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/menu");

export default function MenuPage() {
  return (
    <>
      <Section doodles={doodleLayout.menuPage} aria-labelledby="menu-judul" className="bg-cream pt-6 pb-6 md:py-9 lg:pt-12 lg:pb-14">
        <h1 id="menu-judul" className="sr-only">
          {menuPage.heading}
        </h1>
        <MenuBrowser categories={menuCategories} products={menuProducts} chipsClassName="-mt-2 lg:mt-0" />
      </Section>
      <CtaBand title={menuPage.cta.title} text={menuPage.cta.text}>
        <WhatsAppButton variant="accent" message={menuPage.cta.message} className="h-11 px-7">
          {menuPage.cta.buttonLabel}
        </WhatsAppButton>
      </CtaBand>
    </>
  );
}
