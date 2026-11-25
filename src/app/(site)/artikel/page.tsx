import { ArtikelEmpty } from "@/components/sections/artikel-empty";
import { PageShell } from "@/components/shared/page-shell";
import { artikelPage } from "@/content/artikel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/artikel");

export default function ArtikelPage() {
  return (
    <PageShell crumbs={artikelPage.crumbs} title={artikelPage.heading}>
      <ArtikelEmpty {...artikelPage.empty} />
    </PageShell>
  );
}
