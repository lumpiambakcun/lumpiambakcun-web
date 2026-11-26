"use client";

import { createContext, useContext } from "react";
import { whatsappUrl } from "@/lib/whatsapp";

const PhoneContext = createContext<string | null>(null);

export function SiteContactProvider({ phoneIntl, children }: { phoneIntl: string; children: React.ReactNode }) {
  return <PhoneContext value={phoneIntl}>{children}</PhoneContext>;
}

export function useWhatsappUrl(message?: string) {
  const phoneIntl = useContext(PhoneContext);
  if (!phoneIntl) throw new Error("useWhatsappUrl harus dipakai di dalam SiteContactProvider.");
  return whatsappUrl(phoneIntl, message);
}
