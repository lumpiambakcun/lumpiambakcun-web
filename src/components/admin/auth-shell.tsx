import { BrandLogo } from "@/components/layout/brand-logo";
import { getHeader } from "@/lib/site-settings";

type AuthShellProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export async function AuthShell({ title, description, children }: AuthShellProps) {
  const { brand } = await getHeader();
  return (
    <section className="mx-auto flex w-full max-w-[450px] flex-col gap-6">
      <BrandLogo brand={brand} className="mx-auto" priority />
      <div className="flex flex-col gap-1.5 text-center">
        <h1 className="font-heading text-[28px] leading-[1.1] font-bold text-ink">{title}</h1>
        {description && <p className="text-sm leading-[1.4] text-ink-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
