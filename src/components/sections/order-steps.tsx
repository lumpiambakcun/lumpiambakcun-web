import { TitledSection } from "@/components/shared/titled-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepCard, type StepCardProps } from "./step-card";

export type OrderStepsTab = { id: string; label: string; items: readonly StepCardProps[] };

type OrderStepsProps = {
  id: string;
  eyebrow: string;
  title: string;
  tabs: readonly OrderStepsTab[];
  doodles?: React.ComponentProps<typeof TitledSection>["doodles"];
};

export function OrderSteps({ id, eyebrow, title, tabs, doodles }: OrderStepsProps) {
  return (
    <TitledSection id={id} eyebrow={eyebrow} title={title} doodles={doodles} className="bg-white" titleClassName="md:text-[34px] lg:text-[40px]">
      <Tabs defaultValue={tabs[0].id} className="items-stretch gap-3 md:gap-5 lg:gap-7">
        <TabsList variant="chips" aria-label="Cara memesan" className="self-center">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="grid">
          {tabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              forceMount
              className="col-start-1 row-start-1 transition-[opacity,visibility,translate] duration-300 data-[state=inactive]:invisible data-[state=inactive]:block data-[state=inactive]:translate-y-1.5 data-[state=inactive]:opacity-0 motion-reduce:transition-none"
            >
              <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {tab.items.map((item, index) => (
                  <StepCard key={item.title} {...item} number={index + 1} />
                ))}
              </ol>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </TitledSection>
  );
}
