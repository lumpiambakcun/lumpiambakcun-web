const pickupFormat = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Jakarta",
});

export function formatPickupTime(iso: string) {
  return `${pickupFormat.format(new Date(iso)).replace(/\./g, ":").replace(" pukul ", ", ")} WIB`;
}

export function maskPhone(phone: string) {
  return `+${phone.slice(0, 5)}••••${phone.slice(-3)}`;
}

export const wibDate = (date: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta" }).format(date);

const dayFormat = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });

export const formatDay = (iso: string) => dayFormat.format(new Date(iso));
