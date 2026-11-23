import { businessConfig } from "@/config/site";

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${businessConfig.phoneIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
