import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Doodle, type DoodleSpec } from "./doodle";

type SectionProps = React.ComponentProps<"section"> & {
  containerClassName?: string;
  doodles?: readonly DoodleSpec[];
};

export function Section({ className, containerClassName, doodles, children, ...props }: SectionProps) {
  return (
    <section className={cn("relative overflow-hidden", className)} {...props}>
      {doodles && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto max-w-site">
          {doodles.map((doodle) => (
            <Doodle key={`${doodle.name}-${doodle.position.lg?.join("-") ?? doodle.position.base?.join("-")}`} {...doodle} />
          ))}
        </div>
      )}
      <Container className={cn("relative", containerClassName)}>{children}</Container>
    </section>
  );
}
