import Image from "next/image";
import Link from "next/link";
import { businessConfig, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, ke beranda`}
      className={cn("flex items-center gap-1.5 rounded-btn", className)}
    >
      <Image
        src="/images/brand/emblem.webp"
        alt=""
        width={59}
        height={55}
        priority={priority}
        className="h-[54.8px] w-[59px] shrink-0"
      />
      <span className="flex flex-col gap-px">
        <span className="font-heading text-[22px] leading-[0.9] font-bold whitespace-nowrap text-brand">
          {siteConfig.name}
        </span>
        <span className="text-xs leading-[0.9] whitespace-nowrap text-ink">{businessConfig.tagline}</span>
      </span>
    </Link>
  );
}
