import Image from "next/image";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { revealItem } from "@/lib/reveal";

type OrderBannerProps = {
  title: string;
  highlight: string;
  text: string;
  tags: readonly string[];
  ctaLabel: string;
  ctaMessage: string;
};

export function OrderBanner({ title, highlight, text, tags, ctaLabel, ctaMessage }: OrderBannerProps) {
  return (
    <Section aria-labelledby="pesan-judul" className="bg-white py-24 lg:py-28">
      <div
        {...revealItem}
        className="relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl bg-brand-deep px-6 py-10 md:px-12 md:py-12 xl:flex-row xl:items-center xl:justify-between xl:gap-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/brand/pattern.webp')] bg-cover bg-center opacity-[0.035]"
        />
        <div className="flex min-w-0 flex-col gap-3.5">
          <h2
            id="pesan-judul"
            className="max-w-[760px] text-[26px] leading-[1.15] font-bold text-white md:text-[34px] lg:text-[38px]"
          >
            {title}
            <br />
            <span className="text-highlight">{highlight}</span>
          </h2>
          <p className="max-w-[520px] text-base leading-[1.45] text-cream/85">{text}</p>
          <ul className="flex flex-wrap gap-2.5 pt-1.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex min-h-8 items-center rounded-full bg-white/10 px-3.5 text-[13px] font-semibold text-cream"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-6 xl:w-[300px]">
          <Image
            src="/images/brand/logo-wordmark-white.webp"
            alt="Lumpia Mbak Cun sejak 1998"
            width={600}
            height={378}
            sizes="220px"
            className="hidden h-auto w-[220px] xl:block"
          />
          <WhatsAppButton variant="accent" message={ctaMessage} className="h-14 w-full rounded-full px-8 text-base">
            {ctaLabel}
          </WhatsAppButton>
        </div>
      </div>
    </Section>
  );
}
