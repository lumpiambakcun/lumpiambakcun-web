import { Suspense } from "react";
import { ArrowDown } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TopBar } from "@/components/layout/top-bar";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#konten"
        className="sr-only z-50 flex items-center gap-2 rounded-full border-2 border-ink bg-highlight px-5 py-2.5 text-sm font-extrabold tracking-[0.04em] text-ink uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:whitespace-nowrap"
      >
        <ArrowDown aria-hidden="true" className="size-4" strokeWidth={2.5} />
        Lewati ke konten
      </a>
      <TopBar />
      <SiteHeader />
      <main id="konten" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <Suspense fallback={null}>
        <ScrollReveal />
      </Suspense>
    </>
  );
}
