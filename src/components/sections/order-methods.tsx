import Link from "next/link";
import { ChannelLogos } from "@/components/shared/channel-logos";
import { TitledSection } from "@/components/shared/titled-section";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { OrderCard, type OrderCardProps } from "./order-card";
import { revealItem } from "@/lib/reveal";

export type OrderMethod = Pick<OrderCardProps, "icon" | "title" | "text" | "badge"> & {
  logos?: boolean;
  cta:
    | { kind: "link"; label: string; href: string; variant: "brand" | "outline-ink" }
    | { kind: "whatsapp"; label: string; message: string };
};

type OrderMethodsProps = {
  id: string;
  eyebrow: string;
  title: string;
  cards: readonly OrderMethod[];
  doodles?: React.ComponentProps<typeof TitledSection>["doodles"];
};

function MethodAction({ cta }: { cta: OrderMethod["cta"] }) {
  if (cta.kind === "whatsapp") {
    return (
      <WhatsAppButton hideIcon variant="outline-ink" message={cta.message} className="h-9 px-5">
        {cta.label}
      </WhatsAppButton>
    );
  }
  return (
    <Button asChild variant={cta.variant} size="cta" className="h-9 px-5">
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  );
}

export function OrderMethods({ id, eyebrow, title, cards, doodles }: OrderMethodsProps) {
  return (
    <TitledSection id={id} eyebrow={eyebrow} title={title} doodles={doodles} className="bg-cream-soft" titleClassName="md:text-[34px] lg:text-[40px]">
      <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {cards.map((card, index) => (
          <li key={card.title} {...revealItem} className={index === 0 ? "md:col-span-2 lg:col-span-1" : undefined}>
            <OrderCard
              icon={card.icon}
              title={card.title}
              text={card.text}
              badge={card.badge}
              extra={card.logos ? <ChannelLogos /> : undefined}
              action={<MethodAction cta={card.cta} />}
              className="lg:min-h-[312px]"
            />
          </li>
        ))}
      </ul>
    </TitledSection>
  );
}
