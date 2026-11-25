import { CircleCheck, Truck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { businessConfig } from "@/config/site";

const item = "inline-flex items-center gap-1.5";

function Messages({ divider }: { divider?: React.ReactNode }) {
  return (
    <>
      <span className={item}>
        <Truck aria-hidden="true" className="size-[15px] shrink-0" />
        Pesan hari ini sebelum 14.00 – Dikirim hari yang sama di area Semarang
      </span>
      {divider}
      <span className={item}>
        <CircleCheck aria-hidden="true" className="size-[15px] shrink-0" />
        Terjamin Halal oleh BPJPH No. {businessConfig.halalNumber}
      </span>
    </>
  );
}

export function TopBar() {
  return (
    <div className="bg-brand text-cream">
      <div className="overflow-hidden py-2.5 text-xs leading-[1.4] font-semibold whitespace-nowrap md:hidden">
        <div className="flex w-max items-center gap-10 pr-10 [animation:marquee_28s_linear_infinite] motion-reduce:w-full motion-reduce:flex-col motion-reduce:gap-1 motion-reduce:pr-0 motion-reduce:whitespace-normal motion-reduce:[animation:none]">
          <Messages />
          <span aria-hidden="true" className="contents motion-reduce:hidden">
            <Messages />
          </span>
        </div>
      </div>

      <Container className="hidden flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2.5 text-center text-[13px] leading-[1.4] font-semibold md:flex">
        <Messages
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
