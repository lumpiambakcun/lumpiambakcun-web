import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  cover_alt: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleSummary = Pick<ArticleRow, "slug" | "title" | "excerpt" | "cover_url" | "cover_alt" | "published_at" | "updated_at">;

export const ARTICLES_TAG = "articles";

const summaryColumns = "slug, title, excerpt, cover_url, cover_alt, published_at, updated_at";

export async function listPublishedArticles() {
  "use cache";
  cacheTag(ARTICLES_TAG);
  cacheLife("max");
  const { data, error } = await createAdminClient()
    .from("articles")
    .select(summaryColumns)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error(`listPublishedArticles: ${error.message}`);
  return data as ArticleSummary[];
}

export async function getPublishedArticle(slug: string) {
  "use cache";
  cacheTag(ARTICLES_TAG);
  cacheLife("max");
  const { data, error } = await createAdminClient().from("articles").select("*").eq("slug", slug).eq("status", "published").maybeSingle<ArticleRow>();
  if (error) throw new Error(`getPublishedArticle: ${error.message}`);
  return data;
}
