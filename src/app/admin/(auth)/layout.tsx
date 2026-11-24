import type { Viewport } from "next";

export const viewport: Viewport = { interactiveWidget: "resizes-content" };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col bg-cream px-4 py-8">
      <div className="my-auto">{children}</div>
    </main>
  );
}
