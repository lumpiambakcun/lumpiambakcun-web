"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveArticleAction } from "@/app/admin/(panel)/artikel/actions";
import { ActiveBadge } from "@/components/admin/active-badge";
import { FormMessage } from "@/components/admin/dialog-form";
import { GooglePreview } from "@/components/admin/google-preview";
import { PhotoDropzone } from "@/components/admin/photo-dropzone";
import { adminCardClass, adminCardPad } from "@/components/admin/styles";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArticleRow } from "@/lib/articles";
import type { CmsState } from "@/lib/cms";
import { slugify } from "@/lib/slug";
import { cn } from "@/lib/utils";

// CKEditor memakai API browser: dimuat hanya di klien agar prerender statis tidak gagal.
const ArticleEditor = dynamic(() => import("@/components/admin/article-editor").then((module) => module.ArticleEditor), {
  ssr: false,
  loading: () => <Skeleton aria-label="Memuat editor" className="h-[60vh] rounded-none" />,
});

const EXCERPT_MAX = 160;
const EXCERPT_NEAR = 140;

type Status = ArticleRow["status"];

const clock = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Asia/Jakarta" });

export function ArticleForm({ article }: { article?: ArticleRow }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();
  const [pendingStatus, setPendingStatus] = useState<Status | null>(null);
  const [savedStatus, setSavedStatus] = useState<Status>(article?.status ?? "draft");
  const [savedAt, setSavedAt] = useState("");
  const [dirty, setDirty] = useState(false);
  const [title, setTitle] = useState(article?.title ?? "");
  const [slugDraft, setSlugDraft] = useState<string | null>(null);
  const [slugEditing, setSlugEditing] = useState(false);
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [altOpen, setAltOpen] = useState(Boolean(article?.cover_alt));
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});
  const markDirty = useCallback(() => setDirty(true), []);

  const slug = article ? article.slug : (slugDraft ?? slugify(title));
  const published = savedStatus === "published";

  useLayoutEffect(() => {
    const element = titleRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [title]);

  const save = useCallback(
    (status: Status) => {
      if (!formRef.current) return;
      const data = new FormData(formRef.current);
      data.set("status", status);
      setPendingStatus(status);
      startTransition(async () => {
        const result = await saveArticleAction(data);
        setPendingStatus(null);
        if (!result.ok) return setState(result);
        setState({});
        setDirty(false);
        if (!article) {
          toast.success("Artikel disimpan.");
          return router.push("/admin/artikel");
        }
        setSavedStatus(status);
        setSavedAt(clock.format(new Date()));
        toast.success(status === "published" ? "Artikel diterbitkan." : "Artikel disimpan sebagai draf.");
      });
    },
    [article, router],
  );

  const saveRef = useRef(save);
  const statusRef = useRef(savedStatus);
  useEffect(() => {
    saveRef.current = save;
    statusRef.current = savedStatus;
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveRef.current(statusRef.current);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const excerptTone = excerpt.length >= EXCERPT_MAX ? "font-semibold text-brand" : excerpt.length >= EXCERPT_NEAR ? "font-semibold text-ink" : "text-ink-muted";

  return (
    <form
      ref={formRef}
      noValidate
      onChange={markDirty}
      onSubmit={(event) => {
        event.preventDefault();
        save(savedStatus);
      }}
      className="flex flex-col gap-4"
    >
      {article && <input type="hidden" name="id" value={article.id} />}

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
          <nav aria-label="Navigasi halaman" className="flex items-center gap-2 text-sm">
            <Link
              href="/admin/artikel"
              onClick={(event) => {
                if (dirty && !window.confirm("Perubahan belum disimpan. Tinggalkan halaman ini?")) event.preventDefault();
              }}
              className="rounded-sm text-ink-muted underline-offset-2 hover:text-ink hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Artikel
            </Link>
            <span aria-hidden="true" className="text-ink-muted">
              /
            </span>
            <h1 className="font-heading text-xl leading-[1.2] font-bold text-ink">{article ? "Edit artikel" : "Tulis artikel"}</h1>
          </nav>
          <ActiveBadge active={published} activeLabel="Terbit" inactiveLabel="Draf" />
          <span role="status" className="min-w-0 truncate text-xs text-ink-muted">
            {savedAt ? `Tersimpan ${savedAt.replace(".", ":")}` : dirty ? "Belum disimpan" : ""}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {published ? (
            <>
              <Button type="button" variant="ghost" disabled={pending} loading={pendingStatus === "draft"} onClick={() => save("draft")} className="h-10 px-3 sm:px-4">
                Kembalikan ke draf
              </Button>
              <Button type="button" disabled={pending} loading={pendingStatus === "published"} onClick={() => save("published")} className="h-10 px-4 sm:px-5">
                Perbarui
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" disabled={pending} loading={pendingStatus === "draft"} onClick={() => save("draft")} className="h-10 bg-white px-3 sm:px-4">
                Simpan draf
              </Button>
              <Button type="button" disabled={pending} loading={pendingStatus === "published"} onClick={() => save("published")} className="h-10 px-4 sm:px-5">
                Terbitkan
              </Button>
            </>
          )}
        </div>
      </div>
      <FormMessage>{state.message}</FormMessage>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className={cn("flex min-w-0 flex-col", adminCardClass)}>
          <div className="flex flex-col gap-2 p-5 md:p-6">
            <textarea
              ref={titleRef}
              name="title"
              aria-label="Judul artikel"
              value={title}
              rows={1}
              maxLength={120}
              placeholder="Judul artikel"
              autoComplete="off"
              onChange={(event) => setTitle(event.target.value.replace(/\n/g, " "))}
              onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}
              className="w-full resize-none overflow-hidden bg-transparent font-heading text-[32px] leading-[1.15] font-bold text-ink outline-none placeholder:text-muted-foreground/50 md:text-4xl"
              {...invalid("title")}
            />
            {errors.title && (
              <p id="title-error" role="alert" className="text-xs leading-[1.28] text-brand">
                {errors.title}
              </p>
            )}
            <input type="hidden" name="slug" value={slug} />
            {slugEditing && !article ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-ink-muted">/artikel/</span>
                <Input
                  aria-label="Slug alamat artikel"
                  value={slug}
                  maxLength={80}
                  autoComplete="off"
                  onChange={(event) => {
                    setSlugDraft(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-"));
                    markDirty();
                  }}
                  className="h-8 min-w-0 flex-1 rounded-md border-border bg-white px-2 font-mono text-xs"
                  {...invalid("slug")}
                />
                <button type="button" onClick={() => setSlugEditing(false)} className="text-xs font-semibold text-brand underline-offset-2 hover:underline">
                  selesai
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-xs leading-[1.3]">
                <span className="min-w-0 truncate font-mono text-ink-muted">{`/artikel/${slug || "…"}`}</span>
                {!article && (
                  <button type="button" onClick={() => setSlugEditing(true)} className="shrink-0 font-semibold text-brand underline-offset-2 hover:underline">
                    ubah
                  </button>
                )}
              </p>
            )}
            {errors.slug && (
              <p id="slug-error" role="alert" className="text-xs leading-[1.28] text-brand">
                {errors.slug}
              </p>
            )}
          </div>
          <ArticleEditor name="body" defaultValue={article?.body} error={errors.body} onChange={markDirty} />
        </div>

        <aside aria-label="Pengaturan artikel" className={cn("flex flex-col gap-5 lg:sticky lg:top-0", adminCardClass, adminCardPad)}>
          <h2 className="font-heading text-base leading-[1.2] font-bold text-ink">Pengaturan</h2>
          <PhotoDropzone
            id="cover"
            name="cover"
            label="Foto sampul"
            initialSrc={article?.cover_url ?? undefined}
            error={errors.cover}
            boxClassName="aspect-video w-full"
            sizes="320px"
            onFileChange={markDirty}
          />
          {altOpen ? (
            <FormField id="cover_alt" label="Teks alt foto" error={errors.cover_alt} tone="admin">
              <Input id="cover_alt" name="cover_alt" defaultValue={article?.cover_alt} maxLength={120} autoComplete="off" autoFocus={!article?.cover_alt} className={fieldControlClass} {...invalid("cover_alt")} />
            </FormField>
          ) : (
            <>
              <input type="hidden" name="cover_alt" value="" />
              <button type="button" onClick={() => setAltOpen(true)} className="-mt-3 w-fit text-xs font-semibold text-brand underline-offset-2 hover:underline">
                + Teks alt
              </button>
            </>
          )}
          <FormField
            id="excerpt"
            label="Ringkasan"
            error={errors.excerpt}
            tone="admin"
            labelAction={<span className={cn("text-xs tabular-nums", excerptTone)}>{`${excerpt.length}/${EXCERPT_MAX}`}</span>}
          >
            <textarea
              id="excerpt"
              name="excerpt"
              value={excerpt}
              maxLength={EXCERPT_MAX}
              rows={3}
              onChange={(event) => setExcerpt(event.target.value)}
              className={`${fieldTextareaClass} resize-y`}
              {...invalid("excerpt")}
            />
          </FormField>
          <GooglePreview slug={slug} title={title} excerpt={excerpt} />
        </aside>
      </div>
    </form>
  );
}
