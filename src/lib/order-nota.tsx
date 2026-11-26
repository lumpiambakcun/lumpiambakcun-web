import { ImageResponse } from "next/og";
import { brandColors, siteConfig } from "@/config/site";
import { orderStages, orderStatusInfo } from "@/content/checkout";
import { formatRupiah } from "@/lib/currency";
import { formatPickupTime, maskPhone } from "@/lib/format";
import { ogFonts, ogSize } from "@/lib/og";
import { getOrderByCode, isOrderCode, syncOrderStatus } from "@/lib/orders";
import { getContact } from "@/lib/site-settings";

const PAPER_WIDTH = 1120;
const TEETH = PAPER_WIDTH / 20;
const muted = "rgba(10, 10, 10, 0.62)";
const dashed = "2px dashed rgba(10, 10, 10, 0.25)";

const tornEdge = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${PAPER_WIDTH}" height="16" viewBox="0 0 ${PAPER_WIDTH} 16"><path fill="#ffffff" d="M0 0H${PAPER_WIDTH}${Array.from(
    { length: TEETH },
    (_, i) => `L${PAPER_WIDTH - 10 - i * 20} 16L${PAPER_WIDTH - 20 - i * 20} 0`,
  ).join("")}Z"/></svg>`,
)}`;

export async function renderOrderNota(code: string) {
  if (!isOrderCode(code)) return null;
  const found = await getOrderByCode(code);
  if (!found) return null;

  const [order, fonts, contact] = await Promise.all([syncOrderStatus(found), ogFonts, getContact()]);
  if (order.status !== "paid") return null;
  const info = orderStatusInfo[order.status];
  const stage = orderStages[order.status];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 30,
          background: brandColors.cream,
          color: brandColors.ink,
          fontFamily: "Kido",
        }}
      >
        <div
          style={{
            width: PAPER_WIDTH,
            height: 560,
            display: "flex",
            background: "#ffffff",
            padding: "34px 48px 28px",
          }}
        >
          <div style={{ width: 520, display: "flex", flexDirection: "column", paddingRight: 36 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: muted }}>Nomor pesanan</div>
              <div
                style={{
                  display: "flex",
                  border: `4px solid ${brandColors.brand}`,
                  padding: 4,
                  transform: "rotate(-3deg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    border: `3px solid ${brandColors.brand}`,
                    padding: "4px 18px",
                    fontSize: 38,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: brandColors.brand,
                    textTransform: "uppercase",
                  }}
                >
                  {info.label}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 6, fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: 1 }}>{order.code}</div>
            {stage && <div style={{ display: "flex", marginTop: 22, fontSize: 24, fontWeight: 500, color: muted }}>{stage}</div>}
            <div style={{ display: "flex", marginTop: 14, fontSize: 28, fontWeight: 500, lineHeight: 1.35 }}>{info.description}</div>
            {stage && (
              <div style={{ display: "flex", marginTop: 16, fontSize: 26, fontWeight: 500, lineHeight: 1.35 }}>
                {`Ambil ${formatPickupTime(order.pickup_at)} di ${contact.fullLine}.`}
              </div>
            )}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: dashed, paddingLeft: 36 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 32, fontWeight: 700, lineHeight: 1.15 }}>{`${order.product_name} ${order.variant}`}</div>
                <div style={{ display: "flex", marginTop: 6, fontSize: 24, fontWeight: 500, color: muted }}>
                  {`${order.quantity} ${order.unit} × ${formatRupiah(order.unit_price)}`}
                </div>
              </div>
              <div style={{ display: "flex", fontSize: 30, fontWeight: 500 }}>{formatRupiah(order.total)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, paddingTop: 18, borderTop: dashed, fontSize: 26, fontWeight: 500 }}>
              <div style={{ display: "flex" }}>Subtotal</div>
              <div style={{ display: "flex" }}>{formatRupiah(order.total)}</div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 18,
                paddingTop: 18,
                borderTop: dashed,
              }}
            >
              <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Total</div>
              <div style={{ display: "flex", fontSize: 60, fontWeight: 700, lineHeight: 1 }}>{formatRupiah(order.total)}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, fontSize: 24, fontWeight: 500, color: muted }}>
              <div style={{ display: "flex" }}>Atas nama</div>
              <div style={{ display: "flex", color: brandColors.ink }}>{`${order.customer_name.split(" ")[0]} (${maskPhone(order.customer_phone)})`}</div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: dashed, fontSize: 24, fontWeight: 700, color: brandColors.brand }}>
              <div style={{ display: "flex" }}>{siteConfig.name}</div>
              <div style={{ display: "flex" }}>{contact.phoneDisplay}</div>
            </div>
          </div>
        </div>
        <img src={tornEdge} alt="" width={PAPER_WIDTH} height={16} />
      </div>
    ),
    { ...ogSize, fonts, headers: { "Cache-Control": "no-store" } },
  );
}
