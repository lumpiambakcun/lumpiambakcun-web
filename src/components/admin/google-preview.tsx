import { siteConfig } from "@/config/site";

type GooglePreviewProps = {
  slug: string;
  title: string;
  excerpt: string;
};

export function GooglePreview({ slug, title, excerpt }: GooglePreviewProps) {
  const host = siteConfig.url.replace(/^https?:\/\//, "");

  return (
    <figure aria-label="Pratinjau hasil pencarian Google" className="flex flex-col gap-1.5">
      <figcaption className="text-[13px] leading-[1.2] font-semibold text-ink">Pratinjau Google</figcaption>
      <div className="flex flex-col gap-0.5 rounded-md border border-border bg-white p-3">
        <p className="truncate text-xs leading-[1.3] text-serp-url">{`${host} › artikel › ${slug || "…"}`}</p>
        <p className="line-clamp-2 text-[15px] leading-[1.3] font-medium text-serp-title">{`${title || "Judul artikel"} | ${siteConfig.name}`}</p>
        <p className="line-clamp-3 text-xs leading-[1.45] text-serp-desc">{excerpt.slice(0, 160) || "Ringkasan artikel akan tampil di sini."}</p>
      </div>
    </figure>
  );
}
