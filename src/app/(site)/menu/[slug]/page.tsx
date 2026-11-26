import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/sections/product-actions";
import { ProductDetail } from "@/components/sections/product-detail";
import { RelatedProducts } from "@/components/sections/related-products";
import { JsonLd } from "@/components/seo/json-ld";
import { businessConfig, siteConfig } from "@/config/site";
import { doodleLayout } from "@/content/doodles";
import { getDetails, getGallery } from "@/content/menu";
import { getProduct, getRelated, getVariants, listProducts } from "@/lib/products";
import { shareMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/structured-data";

export const instant = false;

export async function generateStaticParams() {
  return (await listProducts()).map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps<"/menu/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  const { card } = product;
  const title = `${card.name} ${card.variant}`;
  const description = `${getDetails(product).description} ${card.price ? `${card.price} ${card.unit}. ` : ""}Pesan lewat WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: card.href },
    ...shareMetadata(`${title} | ${siteConfig.name}`, description, card.href, null),
  };
}

export default async function MenuDetailPage({ params }: PageProps<"/menu/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const { card } = product;
  const details = getDetails(product);
  const label = `${card.name} ${card.variant}`;
  const crumbs = [
    { label: "Beranda", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: card.name, href: card.href },
  ];

  return (
    <>
      <JsonLd
        data={productJsonLd({ name: label, description: details.description, image: card.image.src, url: card.href, price: card.price })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ProductDetail
        crumbs={crumbs}
        name={card.name}
        gallery={getGallery(product)}
        rating={businessConfig.rating}
        variantsLabel="Pilihan"
        variants={(await getVariants(product.category)).map((item) => ({
          href: item.card.href,
          label: item.card.variant,
          active: item.id === product.id,
        }))}
        price={card.price}
        unit={card.unit}
        priceFallback="Tanya harga via WhatsApp"
        description={details.description}
        highlights={details.highlights}
        doodles={doodleLayout.menuPage}
        actions={
          <ProductActions
            productId={product.id}
            pcs={product.pack.pcs}
            purchasable={Boolean(card.price)}
            itemLabel={card.price ? `${label} (isi ${product.pack.pcs})` : label}
            askMessage={`Halo Mbak Cun, saya mau tanya tentang ${label}.`}
          />
        }
      />
      <RelatedProducts eyebrow="Coba juga" title="Menu lainnya" products={await getRelated(product.id)} doodles={doodleLayout.menu} />
    </>
  );
}
