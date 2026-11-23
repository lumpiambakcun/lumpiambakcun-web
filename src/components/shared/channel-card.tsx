import Image from "next/image";
import { cn } from "@/lib/utils";

type ChannelCardProps = {
  href?: string;
  name: string;
  description: string;
  logo: { src: string; alt: string; width: number; height: number };
  className?: string;
};

export function ChannelCard({ href, name, description, logo, className }: ChannelCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-4 rounded-panel border border-border bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:px-[26px] md:py-[22px]",
        className,
      )}
    >
      <span className="flex h-[52px] shrink-0 items-center justify-center" style={{ width: logo.width }}>
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="max-h-full max-w-full rounded-xl object-contain" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-heading text-xl leading-[1.12] font-bold text-ink transition-colors group-hover:text-brand">{name}</span>
        <span className="text-[13px] leading-[1.28] text-ink">{description}</span>
      </span>
    </a>
  );
}
