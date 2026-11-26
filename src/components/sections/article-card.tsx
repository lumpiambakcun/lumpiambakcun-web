import Image from "next/image";
import Link from "next/link";
import type { ArticleSummary } from "@/lib/articles";
import { formatDay } from "@/lib/format";

export function ArticleCard({ article, priority }: { article: ArticleSummary; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-cream-line bg-white">
      <div className="relative aspect-video bg-white">
        {article.cover_url && (
          <Image
            src={article.cover_url}
            alt={article.cover_alt}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        {article.published_at && (
          <time dateTime={article.published_at} className="text-[13px] text-ink-muted">
            {formatDay(article.published_at)}
          </time>
        )}
        <h2 className="font-heading text-xl leading-tight font-bold text-ink">
          <Link href={`/artikel/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </h2>
        <p className="text-[15px] leading-[1.55] text-ink-muted">{article.excerpt}</p>
      </div>
    </article>
  );
}
