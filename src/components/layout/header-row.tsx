import { Container } from "@/components/shared/container";

export function HeaderRow({ children }: { children: React.ReactNode }) {
  return (
    <Container className="grid grid-cols-[auto_1fr] items-center gap-2.5 py-1.5 md:gap-4 md:py-2.5 lg:grid-cols-[1fr_auto_1fr] lg:py-3">
      {children}
    </Container>
  );
}
