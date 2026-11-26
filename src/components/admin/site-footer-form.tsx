"use client";

import { useState } from "react";
import { saveFooterAction } from "@/app/admin/(panel)/footer/actions";
import { LinkFields } from "@/components/admin/link-fields";
import { PhotoField } from "@/components/admin/photo-field";
import { RepeatableList } from "@/components/admin/repeatable-list";
import { SettingsCard, SettingsForm, TextSetting } from "@/components/admin/settings-form";
import { FormField } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Input } from "@/components/ui/input";
import { socialLabels, socialPlatforms, type FooterSettings, type SiteLink, type SocialPlatform } from "@/lib/site-settings-schema";
import { fieldControlClass } from "@/components/shared/form-field";

type Column = FooterSettings["columns"][number];
type Social = FooterSettings["social"][number];

const platformOptions = socialPlatforms.map((value) => ({ value, label: socialLabels[value] }));

export function SiteFooterForm({ initial }: { initial: FooterSettings }) {
  const [settings, setSettings] = useState(initial);
  const [geo, setGeo] = useState({ lat: String(initial.contact.geo.lat), lng: String(initial.contact.geo.lng) });
  const patch = (next: Partial<FooterSettings>) => setSettings((current) => ({ ...current, ...next }));
  const patchContact = (next: Partial<FooterSettings["contact"]>) => patch({ contact: { ...settings.contact, ...next } });
  const patchAddress = (next: Partial<FooterSettings["contact"]["address"]>) => patchContact({ address: { ...settings.contact.address, ...next } });
  const patchHours = (next: Partial<FooterSettings["contact"]["hours"]>) => patchContact({ hours: { ...settings.contact.hours, ...next } });
  const payload = { ...settings, contact: { ...settings.contact, geo } };

  return (
    <SettingsForm action={saveFooterAction} payload={payload}>
      {(errors) => (
        <>
          <SettingsCard title="Merek dan deskripsi" description="Logo dan teks di kolom kiri footer. Nama dan tagline diatur di halaman Header.">
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <PhotoField id="logo" name="logo" label="Logo footer" initialSrc={initial.logoUrl} error={errors.logo} hint="JPG, PNG, atau WebP, maksimal 2 MB. Kosongkan untuk tetap memakai logo sekarang." />
              <TextSetting id="description" label="Deskripsi" rows={3} maxLength={200} value={settings.description} onChange={(description) => patch({ description })} error={errors.description} className="sm:col-span-2" />
              <TextSetting id="copyright" label="Teks hak cipta" maxLength={120} value={settings.copyright} onChange={(copyright) => patch({ copyright })} error={errors.copyright} className="sm:col-span-2" />
            </div>
          </SettingsCard>

          <SettingsCard title="Kolom tautan" description="Maksimal 3 kolom. Tiap tautan bisa ke halaman situs, tautan luar, atau pesan WhatsApp.">
            <RepeatableList<Column>
              defaultItems={initial.columns}
              onChange={(columns) => patch({ columns })}
              createItem={() => ({ title: "", links: [] })}
              itemLabel={(index) => `Kolom ${index + 1}`}
              addLabel="Tambah kolom"
              max={3}
              error={errors.columns}
              emptyText="Belum ada kolom."
              renderItem={(column, updateColumn, columnIndex) => (
                <div className="flex flex-col gap-3">
                  <TextSetting id={`columns-${columnIndex}-title`} label="Judul kolom" maxLength={30} value={column.title} onChange={(title) => updateColumn({ title })} error={errors[`columns.${columnIndex}.title`]} />
                  <RepeatableList<SiteLink>
                    defaultItems={column.links}
                    onChange={(links) => updateColumn({ links })}
                    createItem={() => ({ label: "", kind: "internal", value: "/" })}
                    itemLabel={(index) => `Tautan ${index + 1}`}
                    addLabel="Tambah tautan"
                    max={10}
                    error={errors[`columns.${columnIndex}.links`]}
                    emptyText="Kolom ini belum punya tautan."
                    renderItem={(link, update, index) => <LinkFields path={`columns.${columnIndex}.links.${index}`} value={link} onChange={update} errors={errors} />}
                  />
                </div>
              )}
            />
          </SettingsCard>

          <SettingsCard title="Kontak" description="Dipakai di footer, halaman Lokasi, nota, checkout, data SEO, dan semua tombol WhatsApp.">
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <TextSetting id="phoneDisplay" label="Nomor tampilan" maxLength={30} placeholder="0857-1364-4140" value={settings.contact.phoneDisplay} onChange={(phoneDisplay) => patchContact({ phoneDisplay })} error={errors["contact.phoneDisplay"]} />
              <TextSetting id="phoneIntl" label="Nomor WhatsApp (format 62)" inputMode="numeric" maxLength={16} placeholder="6285713644140" value={settings.contact.phoneIntl} onChange={(phoneIntl) => patchContact({ phoneIntl })} error={errors["contact.phoneIntl"]} />
              <TextSetting id="street" label="Jalan" maxLength={100} value={settings.contact.address.street} onChange={(street) => patchAddress({ street })} error={errors["contact.address.street"]} />
              <TextSetting id="district" label="Kelurahan, kecamatan" maxLength={80} value={settings.contact.address.district} onChange={(district) => patchAddress({ district })} error={errors["contact.address.district"]} />
              <TextSetting id="city" label="Kota" maxLength={60} value={settings.contact.address.city} onChange={(city) => patchAddress({ city })} error={errors["contact.address.city"]} />
              <TextSetting id="mapsUrl" label="Tautan Google Maps" maxLength={300} placeholder="https://maps.app.goo.gl/..." value={settings.contact.mapsUrl} onChange={(mapsUrl) => patchContact({ mapsUrl })} error={errors["contact.mapsUrl"]} />
              <TextSetting id="postalLine" label="Alamat lengkap (tampil di footer)" rows={2} maxLength={200} value={settings.contact.address.postalLine} onChange={(postalLine) => patchAddress({ postalLine })} error={errors["contact.address.postalLine"]} className="sm:col-span-2" />
              <TextSetting id="opens" label="Jam buka" maxLength={5} placeholder="09.00" value={settings.contact.hours.opens} onChange={(opens) => patchHours({ opens })} error={errors["contact.hours.opens"]} />
              <TextSetting id="closes" label="Jam tutup" maxLength={5} placeholder="20.30" value={settings.contact.hours.closes} onChange={(closes) => patchHours({ closes })} error={errors["contact.hours.closes"]} />
              <TextSetting id="lat" label="Lintang (untuk SEO)" inputMode="decimal" maxLength={20} value={geo.lat} onChange={(lat) => setGeo({ ...geo, lat })} error={errors["contact.geo.lat"]} />
              <TextSetting id="lng" label="Bujur (untuk SEO)" inputMode="decimal" maxLength={20} value={geo.lng} onChange={(lng) => setGeo({ ...geo, lng })} error={errors["contact.geo.lng"]} />
            </div>
          </SettingsCard>

          <SettingsCard title="Media sosial" description="Tampil sebagai tombol di footer dan masuk data SEO. Tambah platform lain bila perlu.">
            <RepeatableList<Social>
              defaultItems={initial.social}
              onChange={(social) => patch({ social })}
              createItem={() => ({ platform: "instagram", url: "" })}
              itemLabel={(index) => `Media sosial ${index + 1}`}
              addLabel="Tambah media sosial"
              max={8}
              error={errors.social}
              emptyText="Belum ada media sosial."
              renderItem={(item, update, index) => (
                <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
                  <FormField id={`social-${index}-platform`} label="Platform" error={errors[`social.${index}.platform`]} tone="admin">
                    <SelectField id={`social-${index}-platform`} name={`social-${index}-platform`} options={platformOptions} value={item.platform} onValueChange={(platform) => update({ platform: platform as SocialPlatform })} />
                  </FormField>
                  <FormField id={`social-${index}-url`} label="URL profil" error={errors[`social.${index}.url`]} tone="admin">
                    <Input
                      id={`social-${index}-url`}
                      value={item.url}
                      maxLength={300}
                      autoComplete="off"
                      placeholder="https://..."
                      onChange={(event) => update({ url: event.target.value })}
                      className={fieldControlClass}
                      aria-invalid={errors[`social.${index}.url`] ? true : undefined}
                    />
                  </FormField>
                </div>
              )}
            />
          </SettingsCard>

          <SettingsCard title="Sertifikat halal" description="Nomor tampil di footer, bar atas (bila ditulis di pesan), dan kartu keunggulan.">
            <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
              <TextSetting id="halal" label="Nomor halal BPJPH" maxLength={40} value={settings.halal.number} onChange={(number) => patch({ halal: { number } })} error={errors["halal.number"]} />
            </div>
          </SettingsCard>
        </>
      )}
    </SettingsForm>
  );
}
