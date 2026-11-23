import Image from "next/image";
import Link from "next/link";
import type { DoodleSpec } from "@/components/shared/doodle";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

type NotFoundHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  doodles?: readonly DoodleSpec[];
};

const digit = "font-heading text-[110px] leading-[0.98] font-bold text-brand md:text-[150px] lg:text-[200px]";

export function NotFoundHero({ eyebrow, title, text, image, primary, secondary, doodles }: NotFoundHeroProps) {
  return (
    <Section
      doodles={doodles}
      aria-labelledby="galat-judul"
      className="bg-cream pt-6 pb-8 md:pt-12 md:pb-14 lg:pt-[72px] lg:pb-20"
      containerClassName="flex flex-col items-center gap-3 text-center md:gap-3.5"
    >
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className={digit}>4</span>
        <Image src={image.src} alt="" width={240} height={153} priority className="h-auto w-[140px] md:w-[190px] lg:w-[240px]" />
        <span className={digit}>4</span>
      </div>
      <p className="text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">{eyebrow}</p>
      <h1 id="galat-judul" className="font-heading text-[28px] leading-none font-bold text-ink text-balance md:text-[38px] lg:text-[44px]">
        {title}
      </h1>
      <p className="max-w-[560px] text-base leading-[1.32] text-ink lg:text-[17px]">{text}</p>
      <div className="mt-5 flex w-full flex-col items-center gap-3 md:mt-[22px] md:w-auto md:flex-row">
        <Button asChild variant="brand" size="cta" className="h-11 w-full px-7 md:w-auto">
          <Link href={primary.href}>{primary.label}</Link>
        </Button>
        <Button asChild variant="outline-ink" size="cta" className="h-11 w-full px-7 md:w-auto">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      </div>
    </Section>
  );
}
