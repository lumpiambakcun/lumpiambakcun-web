import { createClient } from "@supabase/supabase-js";
import { sanitizeArticleHtml } from "../src/lib/sanitize-article";
import { seedArticles } from "./seed/articles-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi di .env");
  process.exit(1);
}

const force = process.argv.includes("--force");
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
const DAY_MS = 24 * 60 * 60 * 1000;

const rows = seedArticles.map(({ daysAgo, body, ...article }) => {
  const publishedAt = new Date(Date.now() - daysAgo * DAY_MS).toISOString();
  return { ...article, body: sanitizeArticleHtml(body), status: "published", published_at: publishedAt, updated_at: publishedAt };
});

const { data, error } = await supabase.from("articles").upsert(rows, { onConflict: "slug", ignoreDuplicates: !force }).select("slug");
if (error) {
  console.error(`Seed gagal: ${error.message}`);
  process.exit(1);
}

console.log(`${data.length} dari ${rows.length} artikel ditulis${force ? " (--force: menimpa yang ada)" : ""}.`);
