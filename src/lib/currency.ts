export function parseRupiah(value: string) {
  return Number(value.replace(/\D/g, ""));
}

export function formatRupiah(amount: number) {
  return `Rp${amount.toLocaleString("id-ID")}`;
}
