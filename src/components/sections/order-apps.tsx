import type { ComponentProps } from "react";
import { ChannelCard } from "@/components/shared/channel-card";
import type { DoodleSpec } from "@/components/shared/doodle";
import { TitledSection } from "@/components/shared/titled-section";

type OrderAppsProps = {
  eyebrow: string;
  title: string;
  channels: readonly ComponentProps<typeof ChannelCard>[];
  doodles?: readonly DoodleSpec[];
};

export function OrderApps({ eyebrow, title, channels, doodles }: OrderAppsProps) {
  return (
    <TitledSection
      id="aplikasi"
      eyebrow={eyebrow}
      title={title}
      doodles={doodles}
      className="bg-cream-soft md:pb-10"
      contentClassName="md:gap-3 lg:gap-7"
    >
      <ul className="grid gap-3 lg:grid-cols-3 lg:gap-5">
        {channels.map((channel) => (
          <li key={channel.name} className="flex">
            <ChannelCard {...channel} className="w-full" />
          </li>
        ))}
      </ul>
    </TitledSection>
  );
}
