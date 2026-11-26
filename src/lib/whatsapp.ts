export function whatsappUrl(phoneIntl: string, message?: string) {
  const base = `https://wa.me/${phoneIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
