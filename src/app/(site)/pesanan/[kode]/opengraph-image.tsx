import { ogContentType, ogSize } from "@/lib/og";
import { renderOrderNota } from "@/lib/order-nota";
import { siteConfig } from "@/config/site";

export const alt = `Nota pesanan ${siteConfig.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ kode: string }> }) {
  const { kode } = await params;
  return (await renderOrderNota(kode)) ?? new Response(null, { status: 404 });
}
