import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

type TitledSectionProps = Omit<React.ComponentProps<typeof Section>, "title" | "aria-labelledby"> & {
  id: string;
  eyebrow: string;
  title: string;
  titleClassName?: string;
  contentClassName?: string;
};

export function TitledSection({ id, eyebrow, title, titleClassName, contentClassName, className, children, ...props }: TitledSectionProps) {
  return (
    <Section aria-labelledby={`${id}-judul`} className={cn("py-6 md:py-9 lg:pt-14 lg:pb-16", className)} {...props}>
      <div className={cn("relative flex flex-col gap-3 md:gap-5 lg:gap-7", contentClassName)}>
        <SectionHeading
          id={`${id}-judul`}
          eyebrow={eyebrow}
          title={title}
          size="md"
          className="gap-1.5"
          titleClassName={cn("leading-none md:text-4xl", titleClassName)}
        />
        {children}
      </div>
    </Section>
  );
}
