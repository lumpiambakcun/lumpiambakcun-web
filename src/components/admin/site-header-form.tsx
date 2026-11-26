"use client";

import { saveHeaderAction } from "@/app/admin/(panel)/header/actions";
import { ChoiceChips } from "@/components/admin/choice-chips";
import { EditableList } from "@/components/admin/editable-list";
import { IconPicker, topBarIconMap } from "@/components/admin/icon-picker";
import { LinkFields, LinkPill } from "@/components/admin/link-fields";
import { PhotoDropzone } from "@/components/admin/photo-dropzone";
import { errorIndexes, SettingsForm, TextSetting, type SettingsBlock } from "@/components/admin/settings-form";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { HeaderSettings } from "@/lib/site-settings-schema";

type TopBarItem = HeaderSettings["topBar"][number];
type NavItem = HeaderSettings["nav"][number];
type ExtraCta = HeaderSettings["extraCtas"][number];

const styleOptions = [
  { value: "primary", label: "Isi" },
  { value: "outline", label: "Garis" },
];

const blocks: readonly SettingsBlock<HeaderSettings>[] = [
  {
    id: "merek",
    title: "Merek",
    description: "Logo, nama, dan tagline di header. Nama untuk SEO dan nota tidak ikut berubah.",
    render: ({ values, baseline, update, errors, markFile }) => (
      <div className="flex items-start gap-5">
        <PhotoDropzone id="logo" name="logo" label="Logo" initialSrc={baseline.brand.logoUrl} error={errors.logo} onFileChange={markFile} boxClassName="size-14 rounded-full" sizes="56px" className="shrink-0" hideLabel compact />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <TextSetting id="brand-name" label="Nama brand" maxLength={40} value={values.brand.name} onChange={(name) => update((current) => ({ ...current, brand: { ...current.brand, name } }))} error={errors["brand.name"]} />
          <TextSetting id="brand-tagline" label="Tagline" maxLength={60} value={values.brand.tagline} onChange={(tagline) => update((current) => ({ ...current, brand: { ...current.brand, tagline } }))} error={errors["brand.tagline"]} />
        </div>
      </div>
    ),
  },
  {
    id: "bar-atas",
    title: "Bar atas",
    description: "Pesan berjalan di bar merah paling atas. Pesan yang dimatikan tidak tampil.",
    render: ({ baseline, update, errors }) => (
      <EditableList<TopBarItem>
        defaultItems={baseline.topBar}
        onChange={(topBar) => update((current) => ({ ...current, topBar }))}
        createItem={() => ({ icon: "info", text: "", active: true })}
        itemLabel={(item, index) => item.text || `Pesan ${index + 1}`}
        addLabel="Tambah pesan"
        max={6}
        error={errors.topBar}
        errorIndexes={errorIndexes(errors, "topBar")}
        emptyText="Belum ada pesan. Bar atas disembunyikan."
        rowSwitch={{ label: "Tampilkan", checked: (item) => item.active, patch: (active) => ({ active }) }}
        renderSummary={(item) => {
          const { Icon } = topBarIconMap[item.icon];
          return (
            <>
              <Icon className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
              <span className={cn("truncate text-sm", item.active ? "text-ink" : "text-ink-muted line-through")}>{item.text || "Pesan kosong"}</span>
            </>
          );
        }}
        renderEditor={(item, patch, index) => (
          <FormField id={`topBar-${index}-text`} label="Teks pesan" error={errors[`topBar.${index}.text`]} tone="admin">
            <div className="flex gap-2">
              <IconPicker value={item.icon} onChange={(icon) => patch({ icon })} />
              <Input
                id={`topBar-${index}-text`}
                value={item.text}
                maxLength={140}
                autoComplete="off"
                autoFocus={item.text === ""}
                onChange={(event) => patch({ text: event.target.value })}
                className={fieldControlClass}
                aria-invalid={errors[`topBar.${index}.text`] ? true : undefined}
                aria-describedby={errors[`topBar.${index}.text`] ? `topBar-${index}-text-error` : undefined}
              />
            </div>
          </FormField>
        )}
      />
    ),
  },
  {
    id: "menu",
    title: "Menu",
    description: "Tautan di header desktop dan menu layar kecil. Seret untuk mengubah urutan.",
    render: ({ baseline, update, errors }) => (
      <EditableList<NavItem>
        defaultItems={baseline.nav}
        onChange={(nav) => update((current) => ({ ...current, nav }))}
        createItem={() => ({ label: "", kind: "internal", value: "/" })}
        itemLabel={(item, index) => item.label || `Menu ${index + 1}`}
        addLabel="Tambah menu"
        max={8}
        error={errors.nav}
        errorIndexes={errorIndexes(errors, "nav")}
        emptyText="Belum ada menu."
        renderSummary={(item) => (
          <>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.label || "Tanpa nama"}</span>
            <LinkPill link={item} />
          </>
        )}
        renderEditor={(item, patch, index) => <LinkFields path={`nav.${index}`} value={item} onChange={patch} errors={errors} />}
      />
    ),
  },
  {
    id: "whatsapp",
    title: "Tombol WhatsApp",
    description: "Tombol utama di header. Nomor tujuan diatur di halaman Footer.",
    render: ({ values, update, errors }) => (
      <>
        <TextSetting id="cta-label" label="Teks tombol" maxLength={30} value={values.cta.label} onChange={(label) => update((current) => ({ ...current, cta: { ...current.cta, label } }))} error={errors["cta.label"]} />
        <TextSetting id="cta-message" label="Pesan awal WhatsApp" rows={2} maxLength={200} value={values.cta.message} onChange={(message) => update((current) => ({ ...current, cta: { ...current.cta, message } }))} error={errors["cta.message"]} />
      </>
    ),
  },
  {
    id: "tombol-tambahan",
    title: "Tombol tambahan",
    description: "Selalu tampil di menu layar kecil; di header desktop hanya bila saklar menyala.",
    render: ({ baseline, update, errors }) => (
      <EditableList<ExtraCta>
        defaultItems={baseline.extraCtas}
        onChange={(extraCtas) => update((current) => ({ ...current, extraCtas }))}
        createItem={() => ({ link: { label: "", kind: "internal", value: "/" }, style: "outline", showInHeader: false })}
        itemLabel={(item, index) => item.link.label || `Tombol ${index + 1}`}
        addLabel="Tambah tombol"
        max={3}
        error={errors.extraCtas}
        errorIndexes={errorIndexes(errors, "extraCtas")}
        emptyText="Belum ada tombol tambahan."
        renderSummary={(item) => (
          <>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.link.label || "Tanpa nama"}</span>
            <LinkPill link={item.link} />
          </>
        )}
        renderEditor={(item, patch, index) => (
          <div className="flex flex-col gap-4">
            <LinkFields path={`extraCtas.${index}.link`} value={item.link} onChange={(link) => patch({ link: { ...item.link, ...link } })} errors={errors} />
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <ChoiceChips label="Gaya tombol" value={item.style} onChange={(style) => patch({ style: style as ExtraCta["style"] })} options={styleOptions} className="w-auto" />
              <label className="flex items-center gap-2 text-sm text-ink">
                <Switch checked={item.showInHeader} onCheckedChange={(showInHeader) => patch({ showInHeader })} />
                Tampil juga di desktop
              </label>
            </div>
          </div>
        )}
      />
    ),
  },
];

export function SiteHeaderForm({ initial }: { initial: HeaderSettings }) {
  return <SettingsForm initial={initial} action={saveHeaderAction} blocks={blocks} />;
}
