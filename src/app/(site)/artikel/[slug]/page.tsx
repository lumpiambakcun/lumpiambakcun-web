import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/sections/article-body";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBand } from "@/components/shared/cta-band";
import { PageShell } from "@/components/shared/page-shell";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/config/site";
import { artikelCta, artikelPage } from "@/content/artikel";
import { getPublishedArticle, listPublishedArticles } from "@/lib/articles";
import { formatDay } from "@/lib/format";
import { shareMetadata } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

export const instant = false;

export async function generateStaticParams() {
  const articles = await listPublishedArticles();
  return articles.length > 0 ? articles.map(({ slug }) => ({ slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/artikel/[slug]">): Promise<Metadata> {
  const article = await getPublishedArticle((await params).slug);
  if (!article) return {};
  const url = `/artikel/${article.slug}`;
  const image = article.cover_url ? { url: article.cover_url, alt: article.cover_alt || article.title } : null;
  const share = shareMetadata(`${article.title} | ${siteConfig.name}`, article.excerpt, url, image);
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    ...share,
    openGraph: { ...share.openGraph, type: "article" },
  };
}

export default async function ArticlePage({ params }: PageProps<"/artikel/[slug]">) {
  const article = await getPublishedArticle((await params).slug);
  if (!article) notFound();

  const url = `/artikel/${article.slug}`;
  const crumbs = [...artikelPage.crumbs, { label: article.title, href: url }];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url,
          image: article.cover_url,
          publishedAt: article.published_at,
          modifiedAt: article.updated_at,
        })}
      />
      <PageShell crumbs={crumbs} title={article.title} className="pt-5 md:pt-6 lg:pt-8">
        {article.published_at && (
          <time dateTime={article.published_at} className="-mt-1.5 block text-sm text-ink-muted md:-mt-2 lg:-mt-3">
            {formatDay(article.published_at)}
          </time>
        )}
        {article.cover_url && (
          <div className="relative mx-auto mt-4 aspect-video max-w-2xl overflow-hidden rounded-card bg-white md:mt-5">
            <Image src={article.cover_url} alt={article.cover_alt} fill priority sizes="(min-width: 672px) 672px, 100vw" className="object-cover" />
          </div>
        )}
        <ArticleBody html={article.body} />
      </PageShell>
      <CtaBand title={artikelCta.title} text={artikelCta.text}>
        <WhatsAppButton variant="accent" message={artikelCta.message} className="h-11 px-7">
          {artikelCta.button}
        </WhatsAppButton>
      </CtaBand>
    </>
  );
}
