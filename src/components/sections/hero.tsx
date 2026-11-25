import { Button } from "@/components/ui/button";
import { doodleLayout } from "@/content/doodles";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/shared/section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export type HeroProps = {
  label: string;
  titleTop: string;
  titleAccent: string;
  body: string;
  whatsappLabel: string;
  whatsappMessage: string;
  menuLabel: string;
  image: { src: string; alt: string };
};

const heroButton = "h-16 w-full rounded-full px-10 text-base sm:w-auto";

export function Hero({
  label,
  titleTop,
  titleAccent,
  body,
  whatsappLabel,
  whatsappMessage,
  menuLabel,
  image,
}: HeroProps) {
  const accentWords = titleAccent.split(" ");
  const accentLast = accentWords.pop();
  const accentLead = accentWords.join(" ");

  return (
    <Section
      doodles={doodleLayout.hero}
      aria-label="Pengantar"
      className="bg-cream py-14 lg:h-[calc(100svh-7.3rem)] lg:min-h-[480px] lg:py-0"
      containerClassName="grid items-center gap-8 lg:h-full lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10"
    >
      <div className="relative z-10 flex flex-col items-start gap-5 lg:gap-6">
        <p className="w-fit rounded-btn border-[1.5px] border-brand bg-white px-4 py-[7px] text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">
          {label}
        </p>
        <h1 className="text-[40px] leading-[1.06] font-bold text-ink md:text-[48px] lg:text-[46px] xl:text-[58px]">
          <span className="block">{titleTop}</span>
          <span className="block">
            {accentLead}{" "}
            <span className="text-brand underline decoration-highlight decoration-wavy decoration-[3px] underline-offset-[10px] lg:decoration-4">
              {accentLast}
            </span>
          </span>
        </h1>
        <p className="max-w-[520px] text-base leading-[1.5] text-ink md:text-lg">{body}</p>
        <div className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
          <WhatsAppButton message={whatsappMessage} variant="brand" size="cta" className={heroButton}>
            {whatsappLabel}
          </WhatsAppButton>
          <Button asChild variant="outline-brand" size="cta" className={heroButton}>
            <Link href="/#menu">{menuLabel}</Link>
          </Button>
        </div>
      </div>

      <div className="pointer-events-none relative order-first mx-auto aspect-[745/464] w-full max-w-[540px] lg:order-none lg:max-w-none lg:origin-left lg:scale-[1.22]">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 aspect-square w-[66%] -translate-x-1/2 -translate-y-[48%] rounded-full bg-cream-line bg-[url('/images/brand/pattern-krem.webp')] bg-cover bg-center"
        />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 460px"
          className="object-contain"
        />
      </div>
    </Section>
  );
}
