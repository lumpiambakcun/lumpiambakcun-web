import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-site px-3 md:px-8 lg:px-10 xl:px-[75px]",
        className,
      )}
      {...props}
    />
  );
}
