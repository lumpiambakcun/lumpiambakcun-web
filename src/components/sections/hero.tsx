import { Button } from "@/components/ui/button";
import { doodleLayout } from "@/content/doodles";
import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/components/shared/rating-stars";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { HeroHeadline } from "./hero-headline";
import { PriceSticker } from "./price-sticker";

export type HeroProps = {
  label: string;
  titleTop: string;
  titleAccent: string;
  ribbon: { price: string; note: string };
  body: string;
  whatsappLabel: string;
  whatsappMessage: string;
  menuLabel: string;
  rating: { value: number; count: number; source: string };
  sticker: { prefix: string; price: string; suffix: string };
  image: { src: string; alt: string };
};

export function Hero({
  label,
  titleTop,
  titleAccent,
  ribbon,
  body,
  whatsappLabel,
  whatsappMessage,
  menuLabel,
  rating,
  sticker,
  image,
}: HeroProps) {
  return (
    <Section doodles={doodleLayout.hero}
      aria-label="Pengantar"
      className="bg-highlight py-6 md:py-10 lg:min-h-[620px] lg:py-0"
      containerClassName="flex flex-col gap-4 md:flex-row md:items-center lg:min-h-[620px]"
    >

      <div className="pointer-events-none relative order-first mx-auto aspect-[745/464] w-full max-w-[420px] md:absolute md:top-[58px] md:-right-8 md:order-none md:mx-0 md:w-[clamp(399px,52vw,560px)] md:max-w-none lg:top-[45px] lg:-right-[2px] lg:w-[min(40vw,745px)] xl:w-[min(52vw,745px)]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 745px, (min-width: 768px) 420px, 100vw"
          className="object-contain"
        />
        <PriceSticker
          {...sticker}
          className="absolute top-[58.4%] left-[9.3%] md:top-[60.24%] md:left-[8%] lg:top-[62.86%] lg:left-[13.27%]"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-3 md:w-[350px] md:gap-2.5 lg:w-[min(640px,56vw)] lg:gap-3.5">
        <p className="w-fit rounded-btn border-[1.5px] border-brand bg-white px-4 py-[7px] text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">
          {label}
        </p>
        <HeroHeadline top={titleTop} accent={titleAccent} ribbonPrice={ribbon.price} ribbonNote={ribbon.note} />
        <p className="max-w-[540px] text-sm leading-[1.32] text-ink lg:text-base">{body}</p>
        <div className="flex flex-col gap-2.5 md:flex-row md:flex-wrap lg:gap-3">
          <WhatsAppButton message={whatsappMessage} variant="brand" size="cta" className="w-full md:h-10 md:w-auto md:px-4 md:text-xs lg:h-11.5 lg:px-6 lg:text-sm">
            {whatsappLabel}
          </WhatsAppButton>
          <Button asChild variant="outline-brand" size="cta" className="w-full md:h-10 md:w-auto md:px-4 md:text-xs lg:h-11.5 lg:px-6 lg:text-sm">
            <Link href="/menu">{menuLabel}</Link>
          </Button>
        </div>
        <p className="flex items-center gap-2 text-[13px] leading-[1.3] font-extrabold text-ink">
          <RatingStars value={Math.round(rating.value)} starClassName="size-4" />
          <span>
            {rating.value} dari {rating.count} ulasan {rating.source}
          </span>
        </p>
      </div>
    </Section>
  );
}
