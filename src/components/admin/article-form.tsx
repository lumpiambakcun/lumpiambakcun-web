"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveArticleAction } from "@/app/admin/(panel)/artikel/actions";
import { FormMessage } from "@/components/admin/dialog-form";
import { ArticleEditor } from "@/components/admin/article-editor";
import { PhotoField } from "@/components/admin/photo-field";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ArticleRow } from "@/lib/articles";
import type { CmsState } from "@/lib/cms";
import { slugify } from "@/lib/slug";

const EXCERPT_MAX = 160;

const statusOptions = [
  { value: "draft", label: "Draf (belum tampil di situs)" },
  { value: "published", label: "Terbit (tampil di situs)" },
];

export function ArticleForm({ article }: { article?: ArticleRow }) {
  const router = useRouter();
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerptLength, setExcerptLength] = useState(article?.excerpt.length ?? 0);
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await saveArticleAction(data);
      if (!result.ok) return setState(result);
      toast.success(article ? "Artikel diperbarui." : "Artikel disimpan.");
      router.push("/admin/artikel");
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col rounded-md border border-border bg-card shadow-card">
      <div className="grid gap-x-4 gap-y-3.5 p-4 sm:grid-cols-2 md:p-5">
        {article && <input type="hidden" name="id" value={article.id} />}
        <FormField id="title" label="Judul" error={errors.title} tone="admin" className="sm:col-span-2">
          <Input
            id="title"
            name="title"
            defaultValue={article?.title}
            maxLength={120}
            autoComplete="off"
            onChange={(event) => !article && !slugEdited && setSlug(slugify(event.target.value))}
            className={fieldControlClass}
            {...invalid("title")}
          />
        </FormField>
        <FormField id="slug" label="Slug (alamat artikel)" error={errors.slug} tone="admin" className="sm:col-span-2">
          <Input
            id="slug"
            name="slug"
            value={slug}
            readOnly={Boolean(article)}
            maxLength={80}
            autoComplete="off"
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(slugify(event.target.value));
            }}
            className={`${fieldControlClass} font-mono read-only:bg-canvas read-only:text-ink-muted`}
            {...invalid("slug")}
          />
          <p className="text-xs text-ink-muted">
            {article ? "Tidak bisa diubah setelah dibuat agar tautan lama tetap berfungsi." : `Alamat: /artikel/${slug || "slug-artikel"}. Tidak bisa diubah setelah disimpan.`}
          </p>
        </FormField>
        <FormField id="excerpt" label="Ringkasan" error={errors.excerpt} tone="admin" className="sm:col-span-2">
          <textarea
            id="excerpt"
            name="excerpt"
            defaultValue={article?.excerpt}
            maxLength={EXCERPT_MAX}
            rows={2}
            onChange={(event) => setExcerptLength(event.target.value.length)}
            className={fieldTextareaClass}
            {...invalid("excerpt")}
          />
          <p className="text-xs text-ink-muted tabular-nums">{`${excerptLength}/${EXCERPT_MAX} karakter. Tampil di kartu artikel dan hasil pencarian Google.`}</p>
        </FormField>
        <PhotoField
          id="cover"
          name="cover"
          label="Foto sampul (opsional)"
          initialSrc={article?.cover_url ?? undefined}
          error={errors.cover}
          hint="JPG, PNG, atau WebP, maksimal 2 MB. Rasio lebar (16:9) paling pas."
        />
        <FormField id="cover_alt" label="Deskripsi foto sampul (opsional)" error={errors.cover_alt} tone="admin" className="sm:col-span-2">
          <Input id="cover_alt" name="cover_alt" defaultValue={article?.cover_alt} maxLength={120} autoComplete="off" className={fieldControlClass} {...invalid("cover_alt")} />
        </FormField>
        <ArticleEditor name="body" defaultValue={article?.body} error={errors.body} />
        <FormField id="status" label="Status" error={errors.status} tone="admin" className="sm:col-span-2 sm:max-w-80">
          <SelectField id="status" name="status" options={statusOptions} defaultValue={article?.status ?? "draft"} {...invalid("status")} />
        </FormField>
      </div>
      <div className="sticky bottom-0 z-10 flex flex-col gap-3 rounded-b-md border-t border-border bg-card px-4 py-3 md:px-5">
        <FormMessage>{state.message}</FormMessage>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button asChild variant="outline" className="h-10 px-4">
            <Link href="/admin/artikel">Batal</Link>
          </Button>
          <Button type="submit" loading={pending} className="h-10 px-5">
            Simpan artikel
          </Button>
        </div>
      </div>
    </form>
  );
}
