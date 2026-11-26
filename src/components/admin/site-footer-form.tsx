"use client";

import { saveFooterAction } from "@/app/admin/(panel)/footer/actions";
import { EditableList } from "@/components/admin/editable-list";
import { LinkFields, LinkPill } from "@/components/admin/link-fields";
import { PhotoDropzone } from "@/components/admin/photo-dropzone";
import { errorIndexes, SettingsForm, TextSetting, type SettingsBlock } from "@/components/admin/settings-form";
import { SocialIcon } from "@/components/icons/social-icon";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Input } from "@/components/ui/input";
import { socialLabels, socialPlatforms, type FooterSettings, type SiteLink, type SocialPlatform } from "@/lib/site-settings-schema";

type Column = FooterSettings["columns"][number];
type Social = FooterSettings["social"][number];
type Contact = FooterSettings["contact"];

// Lintang dan bujur diketik sebagai teks; skema server yang mengubahnya jadi angka.
type FooterValues = Omit<FooterSettings, "contact"> & { contact: Omit<Contact, "geo"> & { geo: { lat: string; lng: string } } };

const platformOptions = socialPlatforms.map((value) => ({ value, label: socialLabels[value] }));

const blocks: readonly SettingsBlock<FooterValues>[] = [
  {
    id: "merek",
    title: "Merek",
    description: "Logo dan teks di kolom kiri footer. Nama dan tagline diatur di halaman Header.",
    render: ({ values, baseline, update, errors, markFile }) => (
      <div className="flex items-start gap-5">
        <PhotoDropzone id="logo" name="logo" label="Logo footer" initialSrc={baseline.logoUrl} error={errors.logo} onFileChange={markFile} boxClassName="size-14 rounded-full" sizes="56px" className="shrink-0" hideLabel compact />
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <TextSetting id="description" label="Deskripsi" rows={3} maxLength={200} value={values.description} onChange={(description) => update((current) => ({ ...current, description }))} error={errors.description} />
          <TextSetting id="copyright" label="Teks hak cipta" maxLength={120} value={values.copyright} onChange={(copyright) => update((current) => ({ ...current, copyright }))} error={errors.copyright} />
        </div>
      </div>
    ),
  },
  {
    id: "kolom",
    title: "Kolom tautan",
    description: "Maksimal 3 kolom. Buka kolom untuk mengatur judul dan tautannya.",
    render: ({ baseline, update, errors }) => (
      <EditableList<Column>
        defaultItems={baseline.columns}
        onChange={(columns) => update((current) => ({ ...current, columns }))}
        createItem={() => ({ title: "", links: [] })}
        itemLabel={(item, index) => item.title || `Kolom ${index + 1}`}
        addLabel="Tambah kolom"
        max={3}
        error={errors.columns}
        errorIndexes={errorIndexes(errors, "columns")}
        emptyText="Belum ada kolom."
        renderSummary={(item) => (
          <>
            <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.title || "Tanpa judul"}</span>
            <span className="shrink-0 text-xs text-ink-muted">{`${item.links.length} tautan`}</span>
          </>
        )}
        renderEditor={(column, patchColumn, columnIndex) => (
          <div className="flex flex-col gap-4">
            <TextSetting id={`columns-${columnIndex}-title`} label="Judul kolom" maxLength={30} value={column.title} onChange={(title) => patchColumn({ title })} error={errors[`columns.${columnIndex}.title`]} />
            <EditableList<SiteLink>
              defaultItems={column.links}
              onChange={(links) => patchColumn({ links })}
              createItem={() => ({ label: "", kind: "internal", value: "/" })}
              itemLabel={(item, index) => item.label || `Tautan ${index + 1}`}
              addLabel="Tambah tautan"
              max={10}
              error={errors[`columns.${columnIndex}.links`]}
              errorIndexes={errorIndexes(errors, `columns.${columnIndex}.links`)}
              emptyText="Kolom ini belum punya tautan."
              renderSummary={(item) => (
                <>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink">{item.label || "Tanpa nama"}</span>
                  <LinkPill link={item} />
                </>
              )}
              renderEditor={(link, patch, index) => <LinkFields path={`columns.${columnIndex}.links.${index}`} value={link} onChange={patch} errors={errors} />}
            />
          </div>
        )}
      />
    ),
  },
  {
    id: "kontak",
    title: "Kontak",
    description: "Dipakai di footer, halaman Lokasi, nota, checkout, data SEO, dan semua tombol WhatsApp.",
    render: ({ values, update, errors }) => {
      const patchContact = (next: Partial<FooterValues["contact"]>) => update((current) => ({ ...current, contact: { ...current.contact, ...next } }));
      const patchHours = (next: Partial<Contact["hours"]>) => update((current) => ({ ...current, contact: { ...current.contact, hours: { ...current.contact.hours, ...next } } }));
      const { contact } = values;

      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextSetting id="phoneDisplay" label="Nomor tampilan" maxLength={30} placeholder="0857-1364-4140" value={contact.phoneDisplay} onChange={(phoneDisplay) => patchContact({ phoneDisplay })} error={errors["contact.phoneDisplay"]} />
          <TextSetting id="phoneIntl" label="Nomor WhatsApp (format 62)" inputMode="numeric" maxLength={16} placeholder="6285713644140" value={contact.phoneIntl} onChange={(phoneIntl) => patchContact({ phoneIntl })} error={errors["contact.phoneIntl"]} />
          <TextSetting id="opens" label="Jam buka" maxLength={5} placeholder="09.00" value={contact.hours.opens} onChange={(opens) => patchHours({ opens })} error={errors["contact.hours.opens"]} />
          <TextSetting id="closes" label="Jam tutup" maxLength={5} placeholder="20.30" value={contact.hours.closes} onChange={(closes) => patchHours({ closes })} error={errors["contact.hours.closes"]} />
        </div>
      );
    },
  },
  {
    id: "alamat",
    title: "Alamat",
    description: "Alamat lengkap tampil di footer; jalan, kecamatan, dan kota dipakai di nota dan data SEO.",
    render: ({ values, update, errors }) => {
      const patchContact = (next: Partial<FooterValues["contact"]>) => update((current) => ({ ...current, contact: { ...current.contact, ...next } }));
      const patchAddress = (next: Partial<Contact["address"]>) => update((current) => ({ ...current, contact: { ...current.contact, address: { ...current.contact.address, ...next } } }));
      const patchGeo = (next: Partial<FooterValues["contact"]["geo"]>) => update((current) => ({ ...current, contact: { ...current.contact, geo: { ...current.contact.geo, ...next } } }));
      const { contact } = values;

      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextSetting id="street" label="Jalan" maxLength={100} value={contact.address.street} onChange={(street) => patchAddress({ street })} error={errors["contact.address.street"]} />
          <TextSetting id="district" label="Kelurahan, kecamatan" maxLength={80} value={contact.address.district} onChange={(district) => patchAddress({ district })} error={errors["contact.address.district"]} />
          <TextSetting id="city" label="Kota" maxLength={60} value={contact.address.city} onChange={(city) => patchAddress({ city })} error={errors["contact.address.city"]} />
          <TextSetting id="mapsUrl" label="Tautan Google Maps" maxLength={300} placeholder="https://maps.app.goo.gl/..." value={contact.mapsUrl} onChange={(mapsUrl) => patchContact({ mapsUrl })} error={errors["contact.mapsUrl"]} />
          <TextSetting id="postalLine" label="Alamat lengkap (tampil di footer)" rows={2} maxLength={200} value={contact.address.postalLine} onChange={(postalLine) => patchAddress({ postalLine })} error={errors["contact.address.postalLine"]} className="sm:col-span-2" />
          <TextSetting id="lat" label="Lintang (untuk SEO)" inputMode="decimal" maxLength={20} value={contact.geo.lat} onChange={(lat) => patchGeo({ lat })} error={errors["contact.geo.lat"]} />
          <TextSetting id="lng" label="Bujur (untuk SEO)" inputMode="decimal" maxLength={20} value={contact.geo.lng} onChange={(lng) => patchGeo({ lng })} error={errors["contact.geo.lng"]} />
        </div>
      );
    },
  },
  {
    id: "sosial",
    title: "Media sosial",
    description: "Tampil sebagai tombol di footer dan masuk data SEO.",
    render: ({ baseline, update, errors }) => (
      <EditableList<Social>
        defaultItems={baseline.social}
        onChange={(social) => update((current) => ({ ...current, social }))}
        createItem={() => ({ platform: "instagram", url: "" })}
        itemLabel={(item) => socialLabels[item.platform]}
        addLabel="Tambah media sosial"
        max={8}
        error={errors.social}
        errorIndexes={errorIndexes(errors, "social")}
        emptyText="Belum ada media sosial."
        renderSummary={(item) => (
          <>
            <SocialIcon platform={item.platform} className="size-4 shrink-0 text-ink-muted" />
            <span className="shrink-0 text-sm text-ink">{socialLabels[item.platform]}</span>
            <span className="min-w-0 flex-1 truncate text-right font-mono text-xs text-ink-muted">{item.url || "…"}</span>
          </>
        )}
        renderEditor={(item, patch, index) => (
          <div className="grid gap-4 sm:grid-cols-[12rem_minmax(0,1fr)]">
            <FormField id={`social-${index}-platform`} label="Platform" error={errors[`social.${index}.platform`]} tone="admin">
              <SelectField id={`social-${index}-platform`} name={`social-${index}-platform`} options={platformOptions} value={item.platform} onValueChange={(platform) => patch({ platform: platform as SocialPlatform })} />
            </FormField>
            <FormField id={`social-${index}-url`} label="URL profil" error={errors[`social.${index}.url`]} tone="admin">
              <Input
                id={`social-${index}-url`}
                value={item.url}
                maxLength={300}
                autoComplete="off"
                placeholder="https://..."
                onChange={(event) => patch({ url: event.target.value })}
                className={fieldControlClass}
                aria-invalid={errors[`social.${index}.url`] ? true : undefined}
                aria-describedby={errors[`social.${index}.url`] ? `social-${index}-url-error` : undefined}
              />
            </FormField>
          </div>
        )}
      />
    ),
  },
  {
    id: "halal",
    title: "Sertifikat halal",
    description: "Nomor tampil di footer, bar atas (bila ditulis di pesan), dan kartu keunggulan.",
    render: ({ values, update, errors }) => (
      <TextSetting id="halal" label="Nomor halal BPJPH" maxLength={40} value={values.halal.number} onChange={(number) => update((current) => ({ ...current, halal: { number } }))} error={errors["halal.number"]} className="sm:max-w-sm" />
    ),
  },
];

export function SiteFooterForm({ initial }: { initial: FooterSettings }) {
  const values: FooterValues = { ...initial, contact: { ...initial.contact, geo: { lat: String(initial.contact.geo.lat), lng: String(initial.contact.geo.lng) } } };
  return <SettingsForm initial={values} action={saveFooterAction} blocks={blocks} />;
}
