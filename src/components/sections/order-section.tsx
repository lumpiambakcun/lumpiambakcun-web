import type { DoodleSpec } from "@/components/shared/doodle";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { doodleLayout } from "@/content/doodles";
import { WhatsAppCard, type WhatsAppCardProps } from "./whatsapp-card";

type OrderSectionProps = {
  eyebrow: string;
  title: string;
  steps?: readonly string[];
  text?: string;
  card: WhatsAppCardProps;
  id?: string;
  doodles?: readonly DoodleSpec[];
};

export function OrderSection({ eyebrow, title, steps, text, card, id = "cara-pesan", doodles = doodleLayout.order }: OrderSectionProps) {
  return (
    <Section doodles={doodles} id={id} aria-labelledby={`${id}-judul`} className="bg-white py-6 md:pt-11 md:pb-12 lg:py-11">
      <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,580px)_minmax(0,662px)] lg:justify-between lg:gap-12">
        <div className="flex flex-col gap-4">
          <SectionHeading
            id={`${id}-judul`}
            eyebrow={eyebrow}
            title={title}
            align="left"
            className="gap-2"
            titleClassName="text-[30px] md:text-4xl lg:text-[46px]"
          />
          {text && <p className="text-base leading-[1.32] text-ink/65">{text}</p>}
          {steps && (
            <ol className="mt-1 flex flex-col gap-3.5">
              {steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3 text-base leading-[1.3] text-ink">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-highlight font-heading text-sm leading-none font-bold text-brand"
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
        <WhatsAppCard {...card} />
      </div>
    </Section>
  );
}
