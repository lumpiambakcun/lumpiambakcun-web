import { ArticleGrid } from "@/components/sections/article-grid";
import { ArtikelEmpty } from "@/components/sections/artikel-empty";
import { PageShell } from "@/components/shared/page-shell";
import { artikelPage } from "@/content/artikel";
import { listPublishedArticles } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/artikel");

export default async function ArtikelPage() {
  const articles = await listPublishedArticles();
  return (
    <PageShell crumbs={artikelPage.crumbs} title={artikelPage.heading}>
      {articles.length > 0 ? <ArticleGrid articles={articles} /> : <ArtikelEmpty {...artikelPage.empty} />}
    </PageShell>
  );
}
