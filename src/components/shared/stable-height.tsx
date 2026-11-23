import { cn } from "@/lib/utils";

type StableHeightProps = {
  children: React.ReactNode;
  reserve: React.ReactNode;
  className?: string;
};

export function StableHeight({ children, reserve, className }: StableHeightProps) {
  return (
    <div className={cn("grid", className)}>
      <div className="col-start-1 row-start-1">{children}</div>
      <div aria-hidden="true" inert className="pointer-events-none invisible col-start-1 row-start-1 select-none">
        {reserve}
      </div>
    </div>
  );
}
