import Image from "next/image";
import { orderChannels } from "@/config/site";
import { cn } from "@/lib/utils";

const widthByChannel: Record<string, number> = { gofood: 1, grabfood: 4 / 3, shopeefood: 1 };

export function ChannelLogos({ height = 36, className }: { height?: number; className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)} aria-label="Aplikasi pesan antar">
      {orderChannels.map((channel) => (
        <li key={channel.id} className="flex items-center justify-center" style={{ height, width: height * (widthByChannel[channel.id] ?? 1) }}>
          <Image
            src={channel.icon.src}
            alt={channel.label}
            width={channel.icon.width * 4}
            height={channel.icon.height * 4}
            className="max-h-full max-w-full rounded-[10px] object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
