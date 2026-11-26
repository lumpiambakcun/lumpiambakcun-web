import { CircleCheck, Info, Truck } from "lucide-react";
import { Container } from "@/components/shared/container";
import type { HeaderSettings } from "@/lib/site-settings-schema";

type TopBarMessage = HeaderSettings["topBar"][number];

const icons = { truck: Truck, check: CircleCheck, info: Info };
const item = "inline-flex items-center gap-1.5";

function Messages({ messages, divider }: { messages: readonly TopBarMessage[]; divider?: React.ReactNode }) {
  return messages.map(({ icon, text }, index) => {
    const Icon = icons[icon];
    return (
      <span key={`${icon}-${text}`} className="contents">
        {index > 0 && divider}
        <span className={item}>
          <Icon aria-hidden="true" className="size-[15px] shrink-0" />
          {text}
        </span>
      </span>
    );
  });
}

export function TopBar({ messages }: { messages: readonly TopBarMessage[] }) {
  const active = messages.filter((message) => message.active);
  if (active.length === 0) return null;
  return (
    <div className="bg-brand text-cream">
      <div className="overflow-hidden py-2.5 text-xs leading-[1.4] font-semibold whitespace-nowrap md:hidden">
        <div className="flex w-max items-center gap-10 pr-10 [animation:marquee_28s_linear_infinite] motion-reduce:w-full motion-reduce:flex-col motion-reduce:gap-1 motion-reduce:pr-0 motion-reduce:whitespace-normal motion-reduce:[animation:none]">
          <Messages messages={active} />
          <span aria-hidden="true" className="contents motion-reduce:hidden">
            <Messages messages={active} />
          </span>
        </div>
      </div>

      <Container className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2.5 text-center text-[13px] leading-[1.4] font-semibold md:flex">
        <Messages
          messages={active}
          divider={
            <span aria-hidden="true" className="opacity-40">
              |
            </span>
          }
        />
      </Container>
    </div>
  );
}
