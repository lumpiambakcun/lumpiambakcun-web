import { cn } from "@/lib/utils";
import { Container } from "./container";
import { revealItem } from "@/lib/reveal";

type CtaBandProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: string;
  text: string;
  children: React.ReactNode;
};

export function CtaBand({ title, text, children, className, ...props }: CtaBandProps) {
  return (
    <section className={cn("bg-brand", className)} {...props}>
      <Container {...revealItem} className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:gap-6 md:py-7 lg:py-10">
        <div className="flex flex-1 flex-col gap-1.5">
          <h2 className="font-heading text-[22px] leading-[1.08] font-bold text-white md:text-[26px] lg:text-[32px]">{title}</h2>
          <p className="text-base leading-[1.32] text-white/70">{text}</p>
        </div>
        <div className="flex *:w-full md:*:w-auto md:shrink-0">{children}</div>
      </Container>
    </section>
  );
}
