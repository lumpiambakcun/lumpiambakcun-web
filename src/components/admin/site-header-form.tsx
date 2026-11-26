"use client";

import { useState } from "react";
import { saveHeaderAction } from "@/app/admin/(panel)/header/actions";
import { LinkFields } from "@/components/admin/link-fields";
import { PhotoField } from "@/components/admin/photo-field";
import { RepeatableList } from "@/components/admin/repeatable-list";
import { SettingsCard, SettingsForm } from "@/components/admin/settings-form";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Input } from "@/components/ui/input";
import type { HeaderSettings } from "@/lib/site-settings-schema";

type TopBarItem = HeaderSettings["topBar"][number];
type ExtraCta = HeaderSettings["extraCtas"][number];

const iconOptions = [
  { value: "truck", label: "Truk (pengiriman)" },
  { value: "check", label: "Centang (jaminan)" },
  { value: "info", label: "Info" },
];

const styleOptions = [
  { value: "primary", label: "Merah (utama)" },
  { value: "outline", label: "Garis (sekunder)" },
];

const checkboxClass = "size-4 rounded border-border accent-brand";

export function SiteHeaderForm({ initial }: { initial: HeaderSettings }) {
  const [settings, setSettings] = useState(initial);
  const patch = (next: Partial<HeaderSettings>) => setSettings((current) => ({ ...current, ...next }));
  const invalid = (errors: Record<string, string>, path: string) => (errors[path] ? { "aria-invalid": true as const, "aria-describedby": `${path.replaceAll(".", "-")}-error` } : {});

  return (
    <SettingsForm action={saveHeaderAction} payload={settings}>
      {(errors) => (
        <>
          <SettingsCard title="Merek" description="Logo, nama, dan tagline di header. Nama untuk SEO dan nota tidak ikut berubah.">
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <PhotoField id="logo" name="logo" label="Logo" initialSrc={initial.brand.logoUrl} error={errors.logo} hint="JPG, PNG, atau WebP, maksimal 2 MB. Kosongkan untuk tetap memakai logo sekarang." />
              <FormField id="brand-name" label="Nama brand" error={errors["brand.name"]} tone="admin">
                <Input
                  id="brand-name"
                  value={settings.brand.name}
                  maxLength={40}
                  autoComplete="off"
                  onChange={(event) => patch({ brand: { ...settings.brand, name: event.target.value } })}
                  className={fieldControlClass}
                  {...invalid(errors, "brand.name")}
                />
              </FormField>
              <FormField id="brand-tagline" label="Tagline" error={errors["brand.tagline"]} tone="admin">
                <Input
                  id="brand-tagline"
                  value={settings.brand.tagline}
                  maxLength={60}
                  autoComplete="off"
                  onChange={(event) => patch({ brand: { ...settings.brand, tagline: event.target.value } })}
                  className={fieldControlClass}
                  {...invalid(errors, "brand.tagline")}
                />
              </FormField>
            </div>
          </SettingsCard>

          <SettingsCard title="Bar atas" description="Pesan berjalan di bar merah paling atas. Pesan yang dinonaktifkan tidak tampil.">
            <RepeatableList<TopBarItem>
              defaultItems={initial.topBar}
              onChange={(topBar) => patch({ topBar })}
              createItem={() => ({ icon: "info", text: "", active: true })}
              itemLabel={(index) => `Pesan ${index + 1}`}
              addLabel="Tambah pesan"
              max={6}
              error={errors.topBar}
              emptyText="Belum ada pesan. Bar atas disembunyikan."
              renderItem={(item, update, index) => (
                <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
                  <FormField id={`topBar-${index}-icon`} label="Ikon" error={errors[`topBar.${index}.icon`]} tone="admin">
                    <SelectField id={`topBar-${index}-icon`} name={`topBar-${index}-icon`} options={iconOptions} value={item.icon} onValueChange={(icon) => update({ icon: icon as TopBarItem["icon"] })} />
                  </FormField>
                  <label className="flex items-center gap-2 self-end pb-3 text-sm text-ink">
                    <input type="checkbox" className={checkboxClass} checked={item.active} onChange={(event) => update({ active: event.target.checked })} />
                    Tampilkan pesan ini
                  </label>
                  <FormField id={`topBar-${index}-text`} label="Teks pesan" error={errors[`topBar.${index}.text`]} tone="admin" className="sm:col-span-2">
                    <Input
                      id={`topBar-${index}-text`}
                      value={item.text}
                      maxLength={140}
                      autoComplete="off"
                      onChange={(event) => update({ text: event.target.value })}
                      className={fieldControlClass}
                      {...invalid(errors, `topBar.${index}.text`)}
                    />
                  </FormField>
                </div>
              )}
            />
          </SettingsCard>

          <SettingsCard title="Menu navigasi" description="Tautan di header (desktop) dan menu layar kecil.">
            <RepeatableList<HeaderSettings["nav"][number]>
              defaultItems={initial.nav}
              onChange={(nav) => patch({ nav })}
              createItem={() => ({ label: "", kind: "internal", value: "/" })}
              itemLabel={(index) => `Menu ${index + 1}`}
              addLabel="Tambah menu"
              max={8}
              error={errors.nav}
              emptyText="Belum ada menu."
              renderItem={(item, update, index) => <LinkFields path={`nav.${index}`} value={item} onChange={update} errors={errors} />}
            />
          </SettingsCard>

          <SettingsCard title="Tombol WhatsApp" description="Tombol utama di header dan menu layar kecil. Tautan dibuat dari nomor WhatsApp di halaman Footer.">
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <FormField id="cta-label" label="Teks tombol" error={errors["cta.label"]} tone="admin">
                <Input
                  id="cta-label"
                  value={settings.cta.label}
                  maxLength={30}
                  autoComplete="off"
                  onChange={(event) => patch({ cta: { ...settings.cta, label: event.target.value } })}
                  className={fieldControlClass}
                  {...invalid(errors, "cta.label")}
                />
              </FormField>
              <FormField id="cta-message" label="Pesan awal WhatsApp" error={errors["cta.message"]} tone="admin" className="sm:col-span-2">
                <textarea
                  id="cta-message"
                  value={settings.cta.message}
                  rows={2}
                  maxLength={200}
                  onChange={(event) => patch({ cta: { ...settings.cta, message: event.target.value } })}
                  className={fieldTextareaClass}
                  {...invalid(errors, "cta.message")}
                />
              </FormField>
            </div>
          </SettingsCard>

          <SettingsCard title="Tombol tambahan" description="Tombol selain WhatsApp. Selalu tampil di menu layar kecil; di header desktop hanya bila dicentang.">
            <RepeatableList<ExtraCta>
              defaultItems={initial.extraCtas}
              onChange={(extraCtas) => patch({ extraCtas })}
              createItem={() => ({ link: { label: "", kind: "internal", value: "/" }, style: "outline", showInHeader: false })}
              itemLabel={(index) => `Tombol ${index + 1}`}
              addLabel="Tambah tombol"
              max={3}
              error={errors.extraCtas}
              emptyText="Belum ada tombol tambahan."
              renderItem={(item, update, index) => (
                <div className="flex flex-col gap-3">
                  <LinkFields path={`extraCtas.${index}.link`} value={item.link} onChange={(link) => update({ link: { ...item.link, ...link } })} errors={errors} />
                  <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
                    <FormField id={`extraCtas-${index}-style`} label="Gaya tombol" error={errors[`extraCtas.${index}.style`]} tone="admin">
                      <SelectField id={`extraCtas-${index}-style`} name={`extraCtas-${index}-style`} options={styleOptions} value={item.style} onValueChange={(style) => update({ style: style as ExtraCta["style"] })} />
                    </FormField>
                    <label className="flex items-center gap-2 self-end pb-3 text-sm text-ink">
                      <input type="checkbox" className={checkboxClass} checked={item.showInHeader} onChange={(event) => update({ showInHeader: event.target.checked })} />
                      Tampilkan juga di header desktop
                    </label>
                  </div>
                </div>
              )}
            />
          </SettingsCard>
        </>
      )}
    </SettingsForm>
  );
}
