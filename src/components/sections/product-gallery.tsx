"use client";

import Image from "next/image";
import { useState } from "react";
import { revealItem } from "@/lib/reveal";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: readonly { src: string; alt: string }[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const current = images[selected] ?? images[0];

  return (
    <div {...revealItem} className="flex flex-col gap-3.5 md:flex-row-reverse md:items-start md:gap-3 lg:flex-col lg:gap-3.5">
      <div className="relative aspect-[366/340] w-full overflow-hidden rounded-3xl md:aspect-auto md:h-96 md:flex-1 lg:aspect-[600/379] lg:h-auto lg:flex-none border-[1.5px] border-cream-line bg-white">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority={selected === 0}
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200"
        />
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-3 gap-3.5 md:w-24 md:shrink-0 md:grid-cols-1 md:gap-3 lg:w-auto lg:grid-cols-[repeat(3,112px)] lg:gap-3.5">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                aria-label={`Lihat foto ${index + 1}`}
                aria-current={index === selected ? "true" : undefined}
                onClick={() => setSelected(index)}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-[14px] border-2 bg-white transition-colors motion-reduce:transition-none",
                  index === selected ? "border-brand" : "border-transparent hover:border-brand/40",
                )}
              >
                <Image src={image.src} alt="" fill sizes="(min-width: 768px) 96px, 112px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
