"use client";

import { ArrowRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useRef } from "react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { BrandLogo } from "@/components/layout/brand-logo";
import { HeaderRow } from "@/components/layout/header-row";
import { MenuToggle } from "@/components/layout/menu-toggle";
import { TopBar } from "@/components/layout/top-bar";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { businessConfig, navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const content = useRef<HTMLDivElement>(null);
  const topBar = useRef<HTMLDivElement>(null);

  const handleOpenChange = useCallback((open: boolean) => {
    if (open && topBar.current) topBar.current.hidden = !((document.querySelector("header")?.getBoundingClientRect().top ?? 0) > 1);
  }, []);
  const handleOpenAutoFocus = useCallback((event: Event) => {
    event.preventDefault();
    content.current?.focus();
  }, []);

  return (
    <Sheet modal={false} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <MenuToggle className={className} />
      </SheetTrigger>
      <SheetContent
        ref={content}
        side="top"
        showCloseButton={false}
        onOpenAutoFocus={handleOpenAutoFocus}
        className="h-dvh max-h-dvh gap-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white p-0 shadow-none data-[side=top]:h-dvh data-[side=top]:border-b-0 data-[side=top]:data-open:slide-in-from-top-0 data-[side=top]:data-closed:slide-out-to-top-0 data-open:animate-none! data-closed:animate-none! motion-reduce:transition-none"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigasi utama, tombol pesan, dan kontak.</SheetDescription>

        <div ref={topBar} hidden>
          <TopBar />
        </div>
        <HeaderRow>
          <BrandLogo />
          <div className="flex items-center justify-end gap-2.5">
            <SheetClose asChild>
              <MenuToggle open />
            </SheetClose>
          </div>
        </HeaderRow>

        <div className="flex min-h-0 flex-1 flex-col motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-top-3 motion-safe:duration-300">
        <nav aria-label="Menu utama" className="border-t border-border px-5 pt-2 md:px-8">
          <ul>
            {navLinks.map((link) => {
              const active = link.href === pathname;
              return (
                <li key={link.href} className="border-b border-border last:border-b-0">
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center justify-between gap-3 rounded-md py-4"
                    >
                      <span
                        className={cn(
                          "font-heading text-[22px] leading-[1.12] font-bold text-ink transition-colors group-hover:text-brand",
                          active && "text-brand",
                        )}
                      >
                        {link.label}
                      </span>
                      <span className="flex size-8 items-center justify-center rounded-full bg-highlight transition-colors group-hover:bg-highlight-hover">
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 text-ink transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                          strokeWidth={2}
                        />
                      </span>
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-2.5 px-5 pt-3 pb-5 md:px-8">
          <SheetClose asChild>
            <WhatsAppButton message="Halo Mbak Cun, saya mau pesan lumpia." className="h-11 w-full">
              Pesan via WhatsApp
            </WhatsAppButton>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="outline-ink" size="cta" className="h-11 w-full">
              <Link href="/menu">Lihat Menu</Link>
            </Button>
          </SheetClose>
        </div>

        <div className="mt-auto flex flex-col gap-3 bg-cream px-5 pt-5 pb-7 md:px-8">
          <p className="text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">Hubungi kami</p>
          <ContactRow icon={Phone} href={`tel:+${businessConfig.phoneIntl}`}>
            {businessConfig.phoneDisplay}
          </ContactRow>
          <ContactRow icon={MapPin} href={businessConfig.mapsUrl} external>
            {businessConfig.address.fullLine}
          </ContactRow>
          <ContactRow icon={InstagramIcon} href={businessConfig.instagramUrl} external>
            @lumpiambakcun
          </ContactRow>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ContactRow = memo(function ContactRow({
  icon: Icon,
  href,
  external,
  children,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex items-start gap-2.5 rounded-sm text-[13px] leading-[1.28] text-ink transition-colors hover:text-brand"
    >
      <Icon aria-hidden="true" className="mt-px size-[18px] shrink-0 text-brand" />
      <span>{children}</span>
    </a>
  );
});
