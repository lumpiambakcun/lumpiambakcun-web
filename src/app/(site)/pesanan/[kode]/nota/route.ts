import { renderOrderNota } from "@/lib/order-nota";

export async function GET(_request: Request, { params }: { params: Promise<{ kode: string }> }) {
  const { kode } = await params;
  const image = await renderOrderNota(kode);
  if (!image) return new Response(null, { status: 404 });

  image.headers.set("Content-Disposition", `attachment; filename="nota-${kode}.png"`);
  return image;
}
