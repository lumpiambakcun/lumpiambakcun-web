import type { VariantProps } from "class-variance-authority";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button, type buttonVariants } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type WhatsAppButtonProps = Omit<React.ComponentProps<"a">, "href"> &
  VariantProps<typeof buttonVariants> & {
    message?: string;
    hideIcon?: boolean;
  };

export function WhatsAppButton({
  message,
  variant = "brand",
  size = "cta",
  hideIcon,
  className,
  children,
  ...props
}: WhatsAppButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" {...props}>
        {!hideIcon && <WhatsAppIcon className={cn("size-5 shrink-0")} />}
        {children}
      </a>
    </Button>
  );
}
