import { cn } from "@/lib/utils";
import { revealItem } from "@/lib/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  id?: string;
  align?: "center" | "left";
  size?: "lg" | "md";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  id,
  align = "center",
  size = "lg",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      {...revealItem}
      className={cn(
        "flex flex-col gap-1",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "font-bold text-ink text-balance",
          size === "lg"
            ? "text-[30px] leading-[1.05] md:text-[34px] lg:text-[44px] lg:leading-none"
            : "text-[28px] leading-[1.08] md:text-[32px] lg:text-[40px]",
          titleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  );
}
