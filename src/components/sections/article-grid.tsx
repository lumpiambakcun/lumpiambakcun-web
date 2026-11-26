import { ArticleCard } from "@/components/sections/article-card";
import type { ArticleSummary } from "@/lib/articles";

export function ArticleGrid({ articles }: { articles: readonly ArticleSummary[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} priority={index < 3} />
      ))}
    </div>
  );
}
