import { Breadcrumb, type Crumb } from "@/components/shared/breadcrumb";
import { cn } from "@/lib/utils";
import { Section } from "@/components/shared/section";

type PageShellProps = {
  crumbs: readonly Crumb[];
  title: string;
  hideTitle?: boolean;
  className?: string;
  doodles?: React.ComponentProps<typeof Section>["doodles"];
  children: React.ReactNode;
};

export function PageShell({ crumbs, title, hideTitle, className, doodles, children }: PageShellProps) {
  return (
    <Section doodles={doodles} aria-labelledby="halaman-judul" className={cn("bg-cream pt-2 pb-6 md:pt-3 md:pb-12 lg:pt-[22px] lg:pb-16", className)}>
      <Breadcrumb items={crumbs} className="relative" />
      <h1
        id="halaman-judul"
        className={
          hideTitle
            ? "sr-only"
            : "relative mt-3.5 mb-3 text-[32px] leading-none font-bold text-ink md:mt-[18px] md:mb-4 md:text-[40px] lg:mb-5 lg:text-[44px]"
        }
      >
        {title}
      </h1>
      <div className={hideTitle ? "relative mt-3.5 md:mt-[18px]" : "relative"}>{children}</div>
    </Section>
  );
}
