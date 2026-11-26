import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { StableHeight } from "@/components/shared/stable-height";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { revealItem } from "@/lib/reveal";

export type FaqItem = { question: string; answer: string };

type FaqListProps = {
  items: readonly FaqItem[];
  className?: string;
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
};

type FaqProps = {
  eyebrow?: string;
  title: string;
  items: readonly FaqItem[];
};

export function Faq({ eyebrow, title, items }: FaqProps) {
  if (items.length === 0) return null;
  const tallestIndex = items.reduce((best, item, index) => (item.answer.length > items[best].answer.length ? index : best), 0);

  return (
    <Section doodles={doodleLayout.faq} id="faq" aria-labelledby="faq-judul" className="bg-cream py-24 lg:pt-28 lg:pb-28">

      <SectionHeading id="faq-judul" eyebrow={eyebrow} title={title} />
      <div {...revealItem}>
        <StableHeight
          className="relative mx-auto mt-5 max-w-[760px]"
          reserve={<FaqList items={items} value={`faq-${tallestIndex}`} className="**:data-[slot=accordion-content]:animate-none" />}
        >
          <FaqList items={items} collapsible defaultValue="faq-0" />
        </StableHeight>
      </div>
    </Section>
  );
}

function FaqList({ items, className, ...props }: FaqListProps) {
  return (
    <Accordion type="single" className={cn("flex flex-col gap-2.5 rounded-none border-0 bg-transparent", className)} {...props}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`faq-${index}`}
          className="rounded-card border-[1.5px] border-cream-line bg-white transition-colors last:border-b-[1.5px] hover:border-brand hover:bg-cream-soft data-open:border-brand has-[:focus-visible]:shadow-[0_0_0_3px_var(--highlight)] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ink"
        >
          <AccordionTrigger className="items-center px-[22px] py-4 focus-visible:shadow-none focus-visible:outline-none text-[15px] leading-[1.3] font-extrabold text-ink hover:no-underline **:data-[slot=accordion-trigger-icon]:text-brand">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-[22px] pb-[18px] text-[14.5px] leading-[1.32] text-ink">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
