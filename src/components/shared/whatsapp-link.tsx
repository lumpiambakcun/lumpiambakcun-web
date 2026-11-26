"use client";

import { useWhatsappUrl } from "@/components/providers/site-contact-provider";

type WhatsAppLinkProps = Omit<React.ComponentProps<"a">, "href"> & { message?: string };

export function WhatsAppLink({ message, ...props }: WhatsAppLinkProps) {
  return <a href={useWhatsappUrl(message)} target="_blank" rel="noopener noreferrer" {...props} />;
}
