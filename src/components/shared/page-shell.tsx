import { Breadcrumb, type Crumb } from "@/components/shared/breadcrumb";
import { Section } from "@/components/shared/section";

type PageShellProps = {
  crumbs: readonly Crumb[];
  title: string;
  doodles?: React.ComponentProps<typeof Section>["doodles"];
  children: React.ReactNode;
};

export function PageShell({ crumbs, title, doodles, children }: PageShellProps) {
  return (
    <Section doodles={doodles} aria-labelledby="halaman-judul" className="bg-cream pt-2 pb-6 md:pt-3 md:pb-12 lg:pt-[22px] lg:pb-16">
      <Breadcrumb items={crumbs} className="relative" />
      <h1 id="halaman-judul" className="relative mt-3.5 mb-3 text-[32px] leading-none font-bold text-ink md:mt-[18px] md:mb-4 md:text-[40px] lg:mb-5 lg:text-[44px]">
        {title}
      </h1>
      <div className="relative">{children}</div>
    </Section>
  );
}
