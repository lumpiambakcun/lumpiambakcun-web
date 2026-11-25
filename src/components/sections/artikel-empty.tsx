import Link from "next/link";
import { Button } from "@/components/ui/button";

type ArtikelEmptyProps = {
  title: string;
  body: string;
  cta: { label: string; href: string };
};

export function ArtikelEmpty({ title, body, cta }: ArtikelEmptyProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-card border border-cream-line bg-white p-6 md:p-10">
      <h2 className="font-heading text-2xl leading-tight font-bold text-ink md:text-[28px]">{title}</h2>
      <p className="max-w-[560px] text-[15px] leading-[1.6] text-ink-muted">{body}</p>
      <Button asChild variant="brand" size="cta">
        <Link href={cta.href}>{cta.label}</Link>
      </Button>
    </div>
  );
}
