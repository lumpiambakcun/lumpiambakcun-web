import Image from "next/image";
import { cn } from "@/lib/utils";

type MapLinkProps = {
  href: string;
  label: string;
  image: { src: string; alt: string };
  sizes: string;
  className?: string;
};

export function MapLink({ href, label, image, sizes, className }: MapLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: ${image.alt}`}
      className={cn("group relative block w-full overflow-hidden rounded-card border-[6px] border-white", className)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </a>
  );
}
