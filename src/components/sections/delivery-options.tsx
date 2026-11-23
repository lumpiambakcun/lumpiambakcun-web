import { ChannelLogos } from "@/components/shared/channel-logos";
import { TitledSection } from "@/components/shared/titled-section";
import { OrderCard, type OrderCardProps } from "./order-card";
import { revealItem } from "@/lib/reveal";

export type DeliveryOption = Pick<OrderCardProps, "icon" | "title" | "text"> & { logos?: boolean };

type DeliveryOptionsProps = {
  id: string;
  eyebrow: string;
  title: string;
  cards: readonly DeliveryOption[];
  doodles?: React.ComponentProps<typeof TitledSection>["doodles"];
};

export function DeliveryOptions({ id, eyebrow, title, cards, doodles }: DeliveryOptionsProps) {
  return (
    <TitledSection id={id} eyebrow={eyebrow} title={title} doodles={doodles} className="bg-cream-soft" titleClassName="md:text-[40px]">
      <ul className="grid gap-3 md:grid-cols-2 lg:gap-5">
        {cards.map((card) => (
          <li key={card.title} {...revealItem}>
            <OrderCard
              icon={card.icon}
              title={card.title}
              text={card.text}
              extra={card.logos ? <ChannelLogos height={44} /> : undefined}
              className="lg:min-h-[263px]"
            />
          </li>
        ))}
      </ul>
    </TitledSection>
  );
}
