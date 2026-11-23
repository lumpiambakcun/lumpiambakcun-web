import Image from "next/image";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { cn } from "@/lib/utils";

export type WhatsAppCardProps = {
  kicker: string;
  title: string;
  durationLabel: string;
  durations: readonly { value: string; label: string; highlight?: boolean }[];
  eventLabel: string;
  eventText: string;
  ctaLabel: string;
  ctaMessage: string;
};

export function WhatsAppCard({
  kicker,
  title,
  durationLabel,
  durations,
  eventLabel,
  eventText,
  ctaLabel,
  ctaMessage,
}: WhatsAppCardProps) {
  return (
    <div className="relative isolate flex flex-col gap-5 overflow-hidden rounded-card bg-brand px-[38px] py-8">
      <Image
        src="/images/doodles/doodle-02.webp"
        alt=""
        aria-hidden="true"
        width={320}
        height={223}
        sizes="320px"
        className="pointer-events-none absolute top-[170px] left-[130px] -z-10 max-w-none origin-top-left rotate-8 object-contain opacity-20 select-none md:left-[300px]"
        style={{ width: 320, height: 223 }}
      />
      <div className="flex flex-col gap-5 pr-14 md:pr-[72px] lg:pr-28">
        <p className="w-fit origin-top-left rotate-4 font-script text-[32px] leading-[1.2] text-highlight">{kicker}</p>
        <h3 className="text-2xl leading-none font-bold text-white md:text-[46px]">{title}</h3>
      </div>
      <span
        aria-hidden="true"
        className="absolute top-[26px] right-7 flex size-11 origin-top-left rotate-10 items-center justify-center rounded-full bg-highlight text-brand md:right-6 md:size-[52px] lg:top-[31px] lg:right-[30px] lg:size-[88px]"
      >
        <WhatsAppIcon className="size-[22px] md:size-[26px] lg:size-11" />
      </span>

      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-highlight uppercase">
            {durationLabel}
          </p>
          <ul className="grid grid-cols-3 gap-2.5">
            {durations.map((item) => (
              <li
                key={item.value}
                className={cn(
                  "flex flex-col rounded-btn border-[1.2px] px-3.5 py-[9px]",
                  item.highlight
                    ? "border-highlight bg-highlight text-brand"
                    : "border-white/30 bg-white/12 text-white",
                )}
              >
                <span
                  className={cn(
                    "font-heading text-[15px] leading-[1.12] font-bold md:text-[22px]",
                    !item.highlight && "text-highlight",
                  )}
                >
                  {item.value}
                </span>
                <span className="text-xs leading-[1.28] whitespace-nowrap">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-highlight uppercase">
            {eventLabel}
          </p>
          <p className="text-sm leading-[1.28] text-white">{eventText}</p>
        </div>
      </div>

      <WhatsAppButton
        message={ctaMessage}
        variant="accent"
        size="cta"
        className="h-[60px] w-full gap-2.5 text-[17px] tracking-normal normal-case [&_svg]:size-[22px]"
      >
        {ctaLabel}
      </WhatsAppButton>
    </div>
  );
}
