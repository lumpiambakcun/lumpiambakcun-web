import Image from "next/image";
import Link from "next/link";
import type { HeaderSettings } from "@/lib/site-settings-schema";
import { cn } from "@/lib/utils";

export function BrandLogo({ brand, className, priority }: { brand: HeaderSettings["brand"]; className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${brand.name}, ke beranda`} className={cn("flex items-center gap-1.5 rounded-btn", className)}>
      <Image
        src={brand.logoUrl}
        alt=""
        width={59}
        height={55}
        priority={priority}
        className="h-[54.8px] w-[59px] shrink-0 object-contain"
      />
      <span className="flex flex-col gap-px">
        <span className="font-heading text-[22px] leading-[0.9] font-bold whitespace-nowrap text-brand">{brand.name}</span>
        <span className="text-xs leading-[0.9] whitespace-nowrap text-ink">{brand.tagline}</span>
      </span>
    </Link>
  );
}
