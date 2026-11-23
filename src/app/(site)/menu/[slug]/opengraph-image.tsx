import { ImageResponse } from "next/og";
import { brandColors, businessConfig, siteConfig } from "@/config/site";
import { getProduct, menuCategories, menuProducts } from "@/content/menu";
import { ogAsset, ogContentType, ogFonts, ogSize } from "@/lib/og";

export const alt = siteConfig.name;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return menuProducts.map(({ id }) => ({ slug: id }));
}

const emblemAsset = ogAsset("emblem.png");
const photoAssets = Object.fromEntries(menuCategories.map(({ id }) => [id, ogAsset(`menu-${id}.jpg`)]));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return new Response(null, { status: 404 });

  const { card } = product;
  const [emblem, photo, fonts] = await Promise.all([emblemAsset, photoAssets[product.category], ogFonts]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: brandColors.cream,
          color: brandColors.ink,
          fontFamily: "Kido",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 50,
            width: 530,
            height: 530,
            borderRadius: 265,
            background: brandColors.highlight,
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          width={440}
          height={440}
          style={{
            position: "absolute",
            top: 95,
            right: 95,
            width: 440,
            height: 440,
            borderRadius: 220,
            border: "12px solid #ffffff",
            objectFit: "cover",
          }}
        />
        {card.discount && (
          <div
            style={{
              position: "absolute",
              top: 70,
              right: 70,
              display: "flex",
              background: brandColors.ink,
              color: "#ffffff",
              borderRadius: 999,
              padding: "12px 26px",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {card.discount}
          </div>
        )}
        <div style={{ position: "absolute", left: 64, top: 52, display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emblem} alt="" width={96} height={88} />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: brandColors.brand }}>{siteConfig.name}</div>
        </div>
        <div style={{ position: "absolute", left: 64, top: 184, width: 560, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: brandColors.highlight,
              borderRadius: 999,
              padding: "8px 24px",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {card.variant}
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 76, fontWeight: 700, lineHeight: 1 }}>{card.name}</div>
          <div style={{ display: "flex", alignItems: "baseline", marginTop: 14, gap: 12, color: brandColors.brand }}>
            <div style={{ display: "flex", fontSize: card.price ? 80 : 48, fontWeight: 700, lineHeight: 1 }}>
              {card.price ?? "Tanya via WhatsApp"}
            </div>
            {card.price && <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: brandColors.ink }}>{card.unit}</div>}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 48,
            display: "flex",
            background: brandColors.brand,
            color: brandColors.highlight,
            borderRadius: 999,
            padding: "16px 32px",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {`Pesan lewat WhatsApp ${businessConfig.phoneDisplay}`}
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
