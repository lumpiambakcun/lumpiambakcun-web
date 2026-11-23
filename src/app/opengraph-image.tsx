import { ImageResponse } from "next/og";
import { brandColors, businessConfig, siteConfig } from "@/config/site";
import { hero } from "@/content/beranda";
import { ogAsset, ogContentType, ogFonts, ogSize } from "@/lib/og";

export const alt = `${siteConfig.name}: ${hero.label}`;
export const size = ogSize;
export const contentType = ogContentType;

const assets = Promise.all([ogAsset("emblem.png"), ogAsset("plate.png"), ogFonts]);

export default async function Image() {
  const [emblem, plate, fonts] = await assets;

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
            top: 40,
            right: 40,
            width: 560,
            height: 560,
            borderRadius: 280,
            background: brandColors.highlight,
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plate} alt="" width={640} height={407} style={{ position: "absolute", top: 118, right: 4 }} />
        <div style={{ position: "absolute", left: 64, top: 52, display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={emblem} alt="" width={96} height={88} />
          <div
            style={{
              display: "flex",
              background: brandColors.highlight,
              borderRadius: 999,
              padding: "10px 24px",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {hero.label}
          </div>
        </div>
        <div style={{ position: "absolute", left: 64, top: 176, width: 540, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.04 }}>{hero.titleTop}</div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, lineHeight: 1.04, color: brandColors.brand }}>
            {hero.titleAccent}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 48,
            display: "flex",
            alignItems: "center",
            background: brandColors.brand,
            color: brandColors.highlight,
            borderRadius: 999,
            padding: "16px 32px",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {`${hero.whatsappLabel} ${businessConfig.phoneDisplay}`}
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
